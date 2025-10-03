import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email"),
  mobile: text("mobile"),
  gender: text("gender"),
  location: text("location"),
  role: text("role").notNull().default("student"),
  institution: text("institution"),
  ecoPoints: integer("eco_points").notNull().default(0),
  coins: integer("coins").notNull().default(0),
  activeDays: jsonb("active_days").$type<string[]>().notNull().default(sql`'[]'::jsonb`),
  achievements: jsonb("achievements").$type<Achievement[]>().notNull().default(sql`'[]'::jsonb`),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const teacherStudents = pgTable("teacher_students", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  teacherId: varchar("teacher_id").notNull().references(() => users.id),
  studentId: varchar("student_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => ({
  uniqueTeacherStudent: sql`UNIQUE (${table.teacherId}, ${table.studentId})`,
}));

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  email: true,
  mobile: true,
  gender: true,
  location: true,
  institution: true,
}).extend({
  role: z.enum(["student", "teacher"]).optional(),
});

export const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

export const updateUserSchema = createInsertSchema(users).pick({
  name: true,
  email: true,
  mobile: true,
  gender: true,
  location: true,
  institution: true,
}).partial();

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type LoginData = z.infer<typeof loginSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type TeacherStudent = typeof teacherStudents.$inferSelect;
