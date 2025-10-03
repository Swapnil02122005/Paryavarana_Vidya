# MySQL Database Connection Guide for Paryāvaraṇa Vidyā

## Overview
This guide explains how to connect a MySQL database to your Paryāvaraṇa Vidyā application for dynamic data management. The application currently uses in-memory storage, but can be easily migrated to MySQL for persistent data storage.

## Prerequisites
- MySQL Server installed (v8.0 or higher recommended)
- Node.js and npm installed
- Basic knowledge of database concepts

## Step 1: Install MySQL Driver

Since this project uses Drizzle ORM, you'll need to install the MySQL connector:

```bash
npm install mysql2
# or
npm install @planetscale/database
```

## Step 2: Update Database Configuration

### Option A: Using mysql2 (Traditional MySQL)

1. Update `server/db.ts` to use MySQL instead of Neon:

```typescript
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

// Create MySQL connection pool
const poolConnection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'paryavarana_vidya',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const db = drizzle(poolConnection);
```

### Option B: Using PlanetScale (MySQL-compatible)

```typescript
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { Client } from '@planetscale/database';

const client = new Client({
  url: process.env.DATABASE_URL
});

export const db = drizzle(client);
```

## Step 3: Update Schema for MySQL

Update `shared/schema.ts` to use MySQL-compatible column types:

```typescript
import { sql } from "drizzle-orm";
import { mysqlTable, varchar, text, int, json, timestamp } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = mysqlTable("users", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email"),
  mobile: text("mobile"),
  gender: text("gender"),
  location: text("location"),
  role: text("role"),
  institution: text("institution"),
  ecoPoints: int("eco_points").notNull().default(0),
  coins: int("coins").notNull().default(0),
  activeDays: json("active_days").$type<string[]>().notNull().default([]),
  achievements: json("achievements").$type<Achievement[]>().notNull().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

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
  role: true,
  institution: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
```

## Step 4: Update Drizzle Configuration

Update `drizzle.config.ts`:

```typescript
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./shared/schema.ts",
  out: "./migrations",
  dialect: "mysql",
  dbCredentials: {
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "paryavarana_vidya",
  },
});
```

## Step 5: Set Environment Variables

Create/update your `.env` file:

```env
# MySQL Database Configuration
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password_here
MYSQL_DATABASE=paryavarana_vidya

# Alternative: Single connection string
DATABASE_URL=mysql://user:password@localhost:3306/paryavarana_vidya
```

## Step 6: Create Database

Connect to MySQL and create the database:

```sql
CREATE DATABASE paryavarana_vidya CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## Step 7: Run Database Migrations

Generate and push the schema to MySQL:

```bash
# Generate migration files
npm run db:generate

# Push schema to database
npm run db:push
```

Or if you prefer direct push without migration files:

```bash
npx drizzle-kit push:mysql
```

## Step 8: Update Storage Implementation

Update `server/storage.ts` to use database instead of in-memory storage:

```typescript
import { db } from "./db";
import { users, type User, type InsertUser } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser);
    const newUser = await this.getUserByUsername(insertUser.username);
    if (!newUser) throw new Error("Failed to create user");
    return newUser;
  }
}

export const storage = new DatabaseStorage();
```

## Step 9: Test the Connection

Create a test script `server/test-db.ts`:

```typescript
import { db } from "./db";
import { sql } from "drizzle-orm";

async function testConnection() {
  try {
    const result = await db.execute(sql`SELECT 1 as test`);
    console.log("✅ Database connection successful!");
    console.log("Test result:", result);
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
}

testConnection();
```

Run the test:

```bash
npx tsx server/test-db.ts
```

## Additional Tables (Optional)

You can extend the schema with additional tables for the application:

```typescript
// Eco-Clubs Table
export const ecoClubs = mysqlTable("eco_clubs", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  description: text("description"),
  creatorId: varchar("creator_id", { length: 36 }).notNull(),
  institutionId: varchar("institution_id", { length: 36 }),
  members: int("members").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Challenges Table
export const challenges = mysqlTable("challenges", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  points: int("points").notNull(),
  difficulty: varchar("difficulty", { length: 20 }).notNull(),
  category: varchar("category", { length: 50 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// User Progress Table
export const userProgress = mysqlTable("user_progress", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: varchar("user_id", { length: 36 }).notNull(),
  challengeId: varchar("challenge_id", { length: 36 }).notNull(),
  completed: int("completed").notNull().default(0),
  completedAt: timestamp("completed_at"),
});
```

## Troubleshooting

### Connection Errors

1. **Can't connect to MySQL server**
   - Verify MySQL is running: `sudo systemctl status mysql`
   - Check host and port are correct
   - Verify firewall allows connections

2. **Access denied for user**
   - Verify username and password
   - Grant privileges: `GRANT ALL PRIVILEGES ON paryavarana_vidya.* TO 'user'@'localhost';`

3. **Unknown database**
   - Create the database first: `CREATE DATABASE paryavarana_vidya;`

### Migration Errors

1. **Table already exists**
   - Drop and recreate: `DROP DATABASE paryavarana_vidya; CREATE DATABASE paryavarana_vidya;`
   - Or use `--force` flag: `npm run db:push --force`

2. **Column type mismatch**
   - Ensure schema matches MySQL data types
   - JSON fields require MySQL 5.7.8+

## Production Deployment

For production, consider:

1. **Use Connection Pooling**: Configured in Step 2
2. **Enable SSL**: Add `ssl: { rejectUnauthorized: true }` to config
3. **Use Environment Variables**: Never hardcode credentials
4. **Regular Backups**: `mysqldump -u root -p paryavarana_vidya > backup.sql`
5. **Monitor Performance**: Use MySQL slow query log
6. **Use Read Replicas**: For high-traffic applications

## Cloud MySQL Options

### AWS RDS MySQL
```env
MYSQL_HOST=mydb.xxxxxxxxxx.us-east-1.rds.amazonaws.com
MYSQL_USER=admin
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=paryavarana_vidya
```

### Google Cloud SQL
```env
MYSQL_HOST=/cloudsql/project-id:region:instance-name
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=paryavarana_vidya
```

### Azure Database for MySQL
```env
MYSQL_HOST=myserver.mysql.database.azure.com
MYSQL_USER=admin@myserver
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=paryavarana_vidya
```

## Next Steps

1. Implement user authentication with password hashing (bcrypt)
2. Add API routes for eco-clubs, challenges, and progress tracking
3. Implement real-time features using WebSockets
4. Add data validation and sanitization
5. Set up database indexing for better performance

## Support

For more information:
- Drizzle ORM Docs: https://orm.drizzle.team/docs/overview
- MySQL Docs: https://dev.mysql.com/doc/
- PlanetScale Docs: https://docs.planetscale.com/

---

**Note**: This application is currently configured for PostgreSQL (Neon). Following this guide will switch it to MySQL. Choose the database that best fits your requirements.
