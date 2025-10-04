# Paryāvaraṇa Vidyā - Environmental Education Platform

## Overview
Paryāvaraṇa Vidyā is a gamified environmental education platform that empowers students and teachers through interactive learning experiences. The platform includes educational content, quizzes, games, and an AI chat assistant focused on environmental topics.

## Tech Stack
- **Frontend**: React + Vite + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL (Neon) with Drizzle ORM
- **Authentication**: Passport.js with local strategy
- **Session Management**: express-session with PostgreSQL store

## Project Structure
- `/client` - React frontend application
- `/server` - Express backend API
- `/shared` - Shared types and database schema
- `/attached_assets` - Static assets

## Key Features
- **Student Features**:
  - Interactive environmental education modules
  - Quiz system with eco-points rewards
  - Multiple educational games (waste sorting, carbon footprint, water conservation, etc.)
  - AI chat assistant for environmental questions
  - Eco clubs participation
  - Rewards redemption system
  - Personal dashboard with progress tracking

- **Teacher Features**:
  - Teacher dashboard for student management
  - Student progress monitoring
  - Class performance analytics

## Database Schema
- `users` - User accounts (students and teachers) with eco-points and achievements
- `teacher_students` - Relationship between teachers and their students

## Development

### Running the Project
The project uses a single command to start both frontend and backend:
```bash
npm run dev
```

This runs on port 5000 and serves both the Vite dev server and Express API.

### Database Migrations
Never write manual SQL migrations. Use Drizzle Kit to push schema changes:
```bash
npm run db:push
```

### Environment Variables
- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Session encryption secret
- `NODE_ENV` - Environment (development/production)

## Deployment Configuration
- **Type**: Autoscale (stateless web application)
- **Build**: `npm run build`
- **Start**: `npm run start`
- **Port**: 5000 (frontend and backend on same port)

## Architecture Notes
- The application uses a single server setup where Express serves both the API routes and the Vite frontend
- In development, Vite middleware is used for HMR
- In production, built static files are served from Express
- Vite is configured with `allowedHosts: true` to work with Replit's proxy
- Session data is persisted in PostgreSQL for reliability

## Replit Setup (Completed)
- PostgreSQL database created and configured
- Database schema pushed successfully
- Environment variables configured (DATABASE_URL, session secrets)
- Dependencies installed (including nanoid)
- Workflow configured to run on port 5000 with webview output
- Application running successfully at https://[repl-url]
