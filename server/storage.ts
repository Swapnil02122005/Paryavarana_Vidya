import { 
  type User, type InsertUser, type UpdateUser, type TeacherStudent,
  type Challenge, type InsertChallenge, type ChallengeCompletion,
  type Quiz, type InsertQuiz, type QuizCompletion,
  type Game, type InsertGame, type GameCompletion,
  type EcoClub, type InsertEcoClub, type ClubMember,
  type Issue, type InsertIssue, type Solution, type InsertSolution,
  users, teacherStudents, challenges, challengeCompletions,
  quizzes, quizCompletions, games, gameCompletions,
  ecoClubs, clubMembers, issues, solutions
} from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq, and, sql as sqlOperator } from "drizzle-orm";
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
  
  getChallenges(): Promise<Challenge[]>;
  createChallenge(challenge: InsertChallenge): Promise<Challenge>;
  getChallengeCompletions(userId: string): Promise<ChallengeCompletion[]>;
  completeChallenge(userId: string, challengeId: string): Promise<ChallengeCompletion>;
  
  getQuizzes(): Promise<Quiz[]>;
  createQuiz(quiz: InsertQuiz): Promise<Quiz>;
  getQuizCompletions(userId: string): Promise<QuizCompletion[]>;
  completeQuiz(userId: string, quizId: string, score: number, totalQuestions: number): Promise<QuizCompletion>;
  
  getGames(): Promise<Game[]>;
  createGame(game: InsertGame): Promise<Game>;
  getGameCompletions(userId: string): Promise<GameCompletion[]>;
  completeGame(userId: string, gameId: string, score?: number): Promise<GameCompletion>;
  deleteGameCompletion(userId: string, gameId: string): Promise<void>;
  
  getEcoClubs(): Promise<EcoClub[]>;
  createEcoClub(club: InsertEcoClub): Promise<EcoClub>;
  joinClub(userId: string, clubId: string): Promise<ClubMember>;
  leaveClub(userId: string, clubId: string): Promise<void>;
  getUserClubs(userId: string): Promise<EcoClub[]>;
  
  getIssues(): Promise<Issue[]>;
  createIssue(issue: InsertIssue): Promise<Issue>;
  getSolutions(issueId?: string): Promise<Solution[]>;
  createSolution(solution: InsertSolution): Promise<Solution>;
  
  authenticateItem(table: string, id: string, authenticated: boolean): Promise<void>;
  addEcoPoints(userId: string, points: number): Promise<void>;
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

  async getChallenges(): Promise<Challenge[]> {
    return await db.select().from(challenges).where(eq(challenges.authenticated, true));
  }

  async createChallenge(challenge: InsertChallenge): Promise<Challenge> {
    const result = await db.insert(challenges).values(challenge).returning();
    return result[0];
  }

  async getChallengeCompletions(userId: string): Promise<ChallengeCompletion[]> {
    return await db.select().from(challengeCompletions).where(eq(challengeCompletions.userId, userId));
  }

  async completeChallenge(userId: string, challengeId: string): Promise<ChallengeCompletion> {
    const challenge = await db.select().from(challenges).where(eq(challenges.id, challengeId)).limit(1);
    if (challenge[0]) {
      await this.addEcoPoints(userId, challenge[0].points);
    }
    const result = await db.insert(challengeCompletions).values({ userId, challengeId }).returning();
    return result[0];
  }

  async getQuizzes(): Promise<Quiz[]> {
    return await db.select().from(quizzes).where(eq(quizzes.authenticated, true));
  }

  async createQuiz(quiz: InsertQuiz): Promise<Quiz> {
    const result = await db.insert(quizzes).values(quiz).returning();
    return result[0];
  }

  async getQuizCompletions(userId: string): Promise<QuizCompletion[]> {
    return await db.select().from(quizCompletions).where(eq(quizCompletions.userId, userId));
  }

  async completeQuiz(userId: string, quizId: string, score: number, totalQuestions: number): Promise<QuizCompletion> {
    const quiz = await db.select().from(quizzes).where(eq(quizzes.id, quizId)).limit(1);
    if (quiz[0] && score === totalQuestions) {
      await this.addEcoPoints(userId, quiz[0].points);
    }
    const result = await db.insert(quizCompletions).values({ userId, quizId, score, totalQuestions }).returning();
    return result[0];
  }

  async getGames(): Promise<Game[]> {
    return await db.select().from(games).where(eq(games.authenticated, true));
  }

  async createGame(game: InsertGame): Promise<Game> {
    const result = await db.insert(games).values(game).returning();
    return result[0];
  }

  async getGameCompletions(userId: string): Promise<GameCompletion[]> {
    return await db.select().from(gameCompletions).where(eq(gameCompletions.userId, userId));
  }

  async completeGame(userId: string, gameId: string, score?: number): Promise<GameCompletion> {
    const game = await db.select().from(games).where(eq(games.id, gameId)).limit(1);
    if (game[0]) {
      await this.addEcoPoints(userId, game[0].points);
    }
    const result = await db.insert(gameCompletions).values({ userId, gameId, score }).returning();
    return result[0];
  }

  async deleteGameCompletion(userId: string, gameId: string): Promise<void> {
    await db.delete(gameCompletions).where(and(eq(gameCompletions.userId, userId), eq(gameCompletions.gameId, gameId)));
  }

  async getEcoClubs(): Promise<EcoClub[]> {
    return await db.select().from(ecoClubs).where(eq(ecoClubs.authenticated, true));
  }

  async createEcoClub(club: InsertEcoClub): Promise<EcoClub> {
    const result = await db.insert(ecoClubs).values(club).returning();
    return result[0];
  }

  async joinClub(userId: string, clubId: string): Promise<ClubMember> {
    const result = await db.insert(clubMembers).values({ userId, clubId }).returning();
    await db.execute(sqlOperator`UPDATE eco_clubs SET member_count = member_count + 1 WHERE id = ${clubId}`);
    return result[0];
  }

  async leaveClub(userId: string, clubId: string): Promise<void> {
    await db.delete(clubMembers).where(and(eq(clubMembers.userId, userId), eq(clubMembers.clubId, clubId)));
    await db.execute(sqlOperator`UPDATE eco_clubs SET member_count = member_count - 1 WHERE id = ${clubId}`);
  }

  async getUserClubs(userId: string): Promise<EcoClub[]> {
    const result = await db
      .select({
        id: ecoClubs.id,
        name: ecoClubs.name,
        description: ecoClubs.description,
        category: ecoClubs.category,
        memberCount: ecoClubs.memberCount,
        image: ecoClubs.image,
        authenticated: ecoClubs.authenticated,
        createdAt: ecoClubs.createdAt,
      })
      .from(clubMembers)
      .innerJoin(ecoClubs, eq(clubMembers.clubId, ecoClubs.id))
      .where(eq(clubMembers.userId, userId));
    return result;
  }

  async getIssues(): Promise<Issue[]> {
    return await db.select().from(issues).where(eq(issues.authenticated, true));
  }

  async createIssue(issue: InsertIssue): Promise<Issue> {
    const result = await db.insert(issues).values(issue).returning();
    return result[0];
  }

  async getSolutions(issueId?: string): Promise<Solution[]> {
    if (issueId) {
      return await db.select().from(solutions).where(and(eq(solutions.issueId, issueId), eq(solutions.authenticated, true)));
    }
    return await db.select().from(solutions).where(eq(solutions.authenticated, true));
  }

  async createSolution(solution: InsertSolution): Promise<Solution> {
    const result = await db.insert(solutions).values(solution).returning();
    return result[0];
  }

  async authenticateItem(table: string, id: string, authenticated: boolean): Promise<void> {
    const tableMap: Record<string, any> = {
      games, challenges, quizzes, ecoClubs, issues, solutions
    };
    const targetTable = tableMap[table];
    if (targetTable) {
      await db.update(targetTable).set({ authenticated }).where(eq(targetTable.id, id));
    }
  }

  async addEcoPoints(userId: string, points: number): Promise<void> {
    await db.execute(sqlOperator`UPDATE users SET eco_points = eco_points + ${points} WHERE id = ${userId}`);
  }
}

export const storage = new DbStorage();
