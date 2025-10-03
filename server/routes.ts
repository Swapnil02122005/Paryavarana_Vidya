import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, loginSchema, updateUserSchema, type User } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

export interface AuthRequest extends Request {
  user?: User;
}

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authReq = req as AuthRequest;
  if (!req.session.userId) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const user = await storage.getUser(req.session.userId);
  if (!user) {
    req.session.destroy(() => {});
    return res.status(401).json({ message: "User not found" });
  }

  authReq.user = user;
  next();
};

export const requireTeacher = async (req: Request, res: Response, next: NextFunction) => {
  const authReq = req as AuthRequest;
  if (!authReq.user || authReq.user.role !== "teacher") {
    return res.status(403).json({ message: "Teacher access required" });
  }
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/auth/register", async (req, res) => {
    try {
      const result = insertUserSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: fromZodError(result.error).message });
      }

      const existingUser = await storage.getUserByUsername(result.data.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const userData = {
        ...result.data,
        role: (result.data.role === "teacher" ? "teacher" : "student") as "student" | "teacher",
      };

      const user = await storage.createUser(userData);
      req.session.userId = user.id;

      const { password: _, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const result = loginSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: fromZodError(result.error).message });
      }

      const user = await storage.getUserByUsername(result.data.username);
      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      const isValid = await storage.verifyPassword(result.data.password, user.password);
      if (!isValid) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      req.session.userId = user.id;

      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/me", requireAuth, async (req, res) => {
    const authReq = req as AuthRequest;
    const { password: _, ...userWithoutPassword } = authReq.user!;
    res.json(userWithoutPassword);
  });

  app.patch("/api/user/profile", requireAuth, async (req, res) => {
    try {
      const authReq = req as AuthRequest;
      const result = updateUserSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: fromZodError(result.error).message });
      }

      const updatedUser = await storage.updateUser(authReq.user!.id, result.data);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const { password: _, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/teacher/students", requireAuth, requireTeacher, async (req, res) => {
    try {
      const authReq = req as AuthRequest;
      const students = await storage.getTeacherStudents(authReq.user!.id);
      
      const studentsWithoutPasswords = students.map(({ password: _, ...student }) => student);
      res.json(studentsWithoutPasswords);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/teacher/students", requireAuth, requireTeacher, async (req, res) => {
    try {
      const authReq = req as AuthRequest;
      const { studentUsername } = req.body;

      if (!studentUsername) {
        return res.status(400).json({ message: "Student username is required" });
      }

      const student = await storage.getUserByUsername(studentUsername);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      if (student.role !== "student") {
        return res.status(400).json({ message: "User is not a student" });
      }

      await storage.addStudentToTeacher(authReq.user!.id, student.id);
      res.status(201).json({ message: "Student added successfully" });
    } catch (error: any) {
      if (error.message?.includes("duplicate key")) {
        return res.status(400).json({ message: "Student already added" });
      }
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/teacher/students/:studentId", requireAuth, requireTeacher, async (req, res) => {
    try {
      const authReq = req as AuthRequest;
      const { studentId } = req.params;

      await storage.removeStudentFromTeacher(authReq.user!.id, studentId);
      res.json({ message: "Student removed successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
