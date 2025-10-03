import { type User, type InsertUser, type UpdateUser, type TeacherStudent, users, teacherStudents } from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq, and } from "drizzle-orm";
import bcrypt from "bcrypt";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

const SALT_ROUNDS = 10;

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, data: UpdateUser): Promise<User | undefined>;
  verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
  addStudentToTeacher(teacherId: string, studentId: string): Promise<TeacherStudent>;
  getTeacherStudents(teacherId: string): Promise<User[]>;
  removeStudentFromTeacher(teacherId: string, studentId: string): Promise<void>;
}

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const hashedPassword = await bcrypt.hash(insertUser.password, SALT_ROUNDS);
    const result = await db.insert(users).values({
      ...insertUser,
      password: hashedPassword,
    }).returning();
    return result[0];
  }

  async updateUser(id: string, data: UpdateUser): Promise<User | undefined> {
    const result = await db.update(users).set(data).where(eq(users.id, id)).returning();
    return result[0];
  }

  async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async addStudentToTeacher(teacherId: string, studentId: string): Promise<TeacherStudent> {
    const result = await db.insert(teacherStudents).values({
      teacherId,
      studentId,
    }).returning();
    return result[0];
  }

  async getTeacherStudents(teacherId: string): Promise<User[]> {
    const result = await db
      .select({
        id: users.id,
        username: users.username,
        password: users.password,
        name: users.name,
        email: users.email,
        mobile: users.mobile,
        gender: users.gender,
        location: users.location,
        role: users.role,
        institution: users.institution,
        ecoPoints: users.ecoPoints,
        coins: users.coins,
        activeDays: users.activeDays,
        achievements: users.achievements,
        createdAt: users.createdAt,
      })
      .from(teacherStudents)
      .innerJoin(users, eq(teacherStudents.studentId, users.id))
      .where(eq(teacherStudents.teacherId, teacherId));
    return result;
  }

  async removeStudentFromTeacher(teacherId: string, studentId: string): Promise<void> {
    await db.delete(teacherStudents).where(
      and(
        eq(teacherStudents.teacherId, teacherId),
        eq(teacherStudents.studentId, studentId)
      )
    );
  }
}

export const storage = new DbStorage();
