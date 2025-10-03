import { type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      email: insertUser.email ?? null,
      mobile: insertUser.mobile ?? null,
      gender: insertUser.gender ?? null,
      location: insertUser.location ?? null,
      role: insertUser.role ?? null,
      institution: insertUser.institution ?? null,
      ecoPoints: 0,
      coins: 0,
      activeDays: [],
      achievements: [],
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();
