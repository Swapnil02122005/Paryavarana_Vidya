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

  app.get("/api/challenges", requireAuth, async (req, res) => {
    try {
      const challenges = await storage.getChallenges();
      res.json(challenges);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/challenges/completions", requireAuth, async (req, res) => {
    try {
      const authReq = req as AuthRequest;
      const completions = await storage.getChallengeCompletions(authReq.user!.id);
      res.json(completions);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/challenges/complete", requireAuth, async (req, res) => {
    try {
      const authReq = req as AuthRequest;
      const { challengeId } = req.body;
      const completion = await storage.completeChallenge(authReq.user!.id, challengeId);
      res.json(completion);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/quizzes", requireAuth, async (req, res) => {
    try {
      const quizzes = await storage.getQuizzes();
      res.json(quizzes);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/quizzes/completions", requireAuth, async (req, res) => {
    try {
      const authReq = req as AuthRequest;
      const completions = await storage.getQuizCompletions(authReq.user!.id);
      res.json(completions);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/quizzes/complete", requireAuth, async (req, res) => {
    try {
      const authReq = req as AuthRequest;
      const { quizId, score, totalQuestions } = req.body;
      const completion = await storage.completeQuiz(authReq.user!.id, quizId, score, totalQuestions);
      res.json(completion);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/games", requireAuth, async (req, res) => {
    try {
      const games = await storage.getGames();
      res.json(games);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/games/completions", requireAuth, async (req, res) => {
    try {
      const authReq = req as AuthRequest;
      const completions = await storage.getGameCompletions(authReq.user!.id);
      res.json(completions);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/games/complete", requireAuth, async (req, res) => {
    try {
      const authReq = req as AuthRequest;
      const { gameId, score } = req.body;
      const completion = await storage.completeGame(authReq.user!.id, gameId, score);
      res.json(completion);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/games/completions/:gameId", requireAuth, async (req, res) => {
    try {
      const authReq = req as AuthRequest;
      const { gameId } = req.params;
      await storage.deleteGameCompletion(authReq.user!.id, gameId);
      res.json({ message: "Game completion removed successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/eco-clubs", requireAuth, async (req, res) => {
    try {
      const clubs = await storage.getEcoClubs();
      res.json(clubs);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/eco-clubs/my-clubs", requireAuth, async (req, res) => {
    try {
      const authReq = req as AuthRequest;
      const clubs = await storage.getUserClubs(authReq.user!.id);
      res.json(clubs);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/eco-clubs/join", requireAuth, async (req, res) => {
    try {
      const authReq = req as AuthRequest;
      const { clubId } = req.body;
      const member = await storage.joinClub(authReq.user!.id, clubId);
      res.json(member);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/eco-clubs/leave", requireAuth, async (req, res) => {
    try {
      const authReq = req as AuthRequest;
      const { clubId } = req.body;
      await storage.leaveClub(authReq.user!.id, clubId);
      res.json({ message: "Left club successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/issues", requireAuth, async (req, res) => {
    try {
      const issues = await storage.getIssues();
      res.json(issues);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/solutions", requireAuth, async (req, res) => {
    try {
      const { issueId } = req.query;
      const solutions = await storage.getSolutions(issueId as string | undefined);
      res.json(solutions);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as AuthRequest;
    if (!authReq.user || authReq.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    next();
  };

  app.post("/api/admin/authenticate", requireAuth, requireAdmin, async (req, res) => {
    try {
      const { table, id, authenticated } = req.body;
      await storage.authenticateItem(table, id, authenticated);
      res.json({ message: "Item authentication updated" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/teacher/games", requireAuth, requireTeacher, async (req, res) => {
    try {
      const authReq = req as AuthRequest;
      const game = await storage.createGame({ ...req.body, createdById: authReq.user!.id });
      res.status(201).json(game);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/teacher/challenges", requireAuth, requireTeacher, async (req, res) => {
    try {
      const challenge = await storage.createChallenge(req.body);
      res.status(201).json(challenge);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
