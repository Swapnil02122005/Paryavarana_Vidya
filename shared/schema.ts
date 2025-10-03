import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb, timestamp, boolean } from "drizzle-orm/pg-core";
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

export const games = pgTable("games", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  difficulty: text("difficulty").notNull(),
  points: integer("points").notNull().default(0),
  image: text("image"),
  authenticated: boolean("authenticated").notNull().default(false),
  createdById: varchar("created_by_id").references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const challenges = pgTable("challenges", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  difficulty: text("difficulty").notNull(),
  points: integer("points").notNull().default(0),
  duration: text("duration"),
  image: text("image"),
  authenticated: boolean("authenticated").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const quizzes = pgTable("quizzes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  difficulty: text("difficulty").notNull(),
  points: integer("points").notNull().default(0),
  questions: jsonb("questions").$type<QuizQuestion[]>().notNull().default(sql`'[]'::jsonb`),
  authenticated: boolean("authenticated").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const ecoClubs = pgTable("eco_clubs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  memberCount: integer("member_count").notNull().default(0),
  image: text("image"),
  authenticated: boolean("authenticated").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const issues = pgTable("issues", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  severity: text("severity").notNull(),
  location: text("location"),
  image: text("image"),
  status: text("status").notNull().default("open"),
  authenticated: boolean("authenticated").notNull().default(false),
  reportedById: varchar("reported_by_id").references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const solutions = pgTable("solutions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  issueId: varchar("issue_id").references(() => issues.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  impact: text("impact"),
  authenticated: boolean("authenticated").notNull().default(false),
  submittedById: varchar("submitted_by_id").references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const gameCompletions = pgTable("game_completions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  gameId: varchar("game_id").notNull().references(() => games.id),
  score: integer("score"),
  completed: boolean("completed").notNull().default(true),
  completedAt: timestamp("completed_at").notNull().defaultNow(),
});

export const challengeCompletions = pgTable("challenge_completions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  challengeId: varchar("challenge_id").notNull().references(() => challenges.id),
  completed: boolean("completed").notNull().default(true),
  completedAt: timestamp("completed_at").notNull().defaultNow(),
});

export const quizCompletions = pgTable("quiz_completions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  quizId: varchar("quiz_id").notNull().references(() => quizzes.id),
  score: integer("score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  completed: boolean("completed").notNull().default(true),
  completedAt: timestamp("completed_at").notNull().defaultNow(),
});

export const clubMembers = pgTable("club_members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  clubId: varchar("club_id").notNull().references(() => ecoClubs.id),
  joinedAt: timestamp("joined_at").notNull().defaultNow(),
});

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
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
  role: z.enum(["student", "teacher", "admin"]).optional(),
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

export const insertGameSchema = createInsertSchema(games).omit({
  id: true,
  createdAt: true,
  authenticated: true,
});

export const insertChallengeSchema = createInsertSchema(challenges).omit({
  id: true,
  createdAt: true,
  authenticated: true,
});

export const insertQuizSchema = createInsertSchema(quizzes).omit({
  id: true,
  createdAt: true,
  authenticated: true,
});

export const insertEcoClubSchema = createInsertSchema(ecoClubs).omit({
  id: true,
  createdAt: true,
  memberCount: true,
  authenticated: true,
});

export const insertIssueSchema = createInsertSchema(issues).omit({
  id: true,
  createdAt: true,
  status: true,
  authenticated: true,
});

export const insertSolutionSchema = createInsertSchema(solutions).omit({
  id: true,
  createdAt: true,
  authenticated: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type LoginData = z.infer<typeof loginSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type TeacherStudent = typeof teacherStudents.$inferSelect;
export type Game = typeof games.$inferSelect;
export type InsertGame = z.infer<typeof insertGameSchema>;
export type Challenge = typeof challenges.$inferSelect;
export type InsertChallenge = z.infer<typeof insertChallengeSchema>;
export type Quiz = typeof quizzes.$inferSelect;
export type InsertQuiz = z.infer<typeof insertQuizSchema>;
export type EcoClub = typeof ecoClubs.$inferSelect;
export type InsertEcoClub = z.infer<typeof insertEcoClubSchema>;
export type Issue = typeof issues.$inferSelect;
export type InsertIssue = z.infer<typeof insertIssueSchema>;
export type Solution = typeof solutions.$inferSelect;
export type InsertSolution = z.infer<typeof insertSolutionSchema>;
export type GameCompletion = typeof gameCompletions.$inferSelect;
export type ChallengeCompletion = typeof challengeCompletions.$inferSelect;
export type QuizCompletion = typeof quizCompletions.$inferSelect;
export type ClubMember = typeof clubMembers.$inferSelect;
