# Paryāvaraṇa Vidyā - Gamified Environmental Education Platform

## Overview

Paryāvaraṇa Vidyā is a gamified environmental education platform designed for Indian schools and colleges. It transforms environmental learning through interactive lessons, real-world challenges, quizzes, and eco-friendly tasks. Students earn eco-points, unlock achievements, compete in leaderboards, and track progress while learning about critical environmental issues like air pollution, water scarcity, plastic waste, and climate change. The platform promotes sustainable practices through engaging game mechanics including badges, levels, streaks, and school-level competitions, aiming to foster environmental literacy and action.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The frontend is built with React and TypeScript, utilizing Vite for development and bundling. It employs Wouter for routing and TanStack Query for server state management. The design system is based on Material Design principles with a nature-inspired custom theme, incorporating shadcn/ui components (Radix UI primitives) with a "New York" style variant. Custom HSL-based theming supports light/dark modes, featuring a forest green primary and terracotta secondary color palette, with Inter and Poppins font families. The component architecture follows an atomic design pattern, organizing reusable UI components, feature-specific gamification elements, and page-level components. State management primarily uses TanStack Query for caching, React Context for themes, and local component state.

### Backend Architecture

The backend uses Node.js with Express.js and TypeScript to provide a RESTful API. It features a modular route structure and an abstraction layer (`IStorage`) for data persistence. While currently using in-memory storage (`MemStorage`) for development, it's designed for easy migration to a database. The server supports both development (with Vite HMR) and production modes, including request/response logging and error handling middleware. Session-based authentication infrastructure is in place using `connect-pg-simple`.

### Data Storage

The project utilizes PostgreSQL via Drizzle ORM for its database schema, with Neon serverless PostgreSQL as the database provider. The `users` table includes fields for authentication, profile information (name, email, mobile, gender, location, role, institution), and gamification data (ecoPoints, activeDays as JSONB array, achievements as JSONB array). UUIDs are used for primary keys, and Zod schemas ensure runtime validation. Drizzle Kit is used for schema migrations.

### Authentication and Authorization

The platform is designed for username/password-based authentication with registration collecting comprehensive user details. Session management infrastructure is ready via `connect-pg-simple` for cookie-based session storage. Authorization is planned to be role-based (student/teacher/admin), with a `role` field in the user schema, though middleware enforcement is not yet fully implemented.

## External Dependencies

**UI Component Libraries:**
- Radix UI primitives (`@radix-ui/*`)
- shadcn/ui (with custom configuration)
- Lucide React (icon system)
- React Day Picker (calendar)
- Recharts (data visualization)
- cmdk (command palette)
- Vaul (drawer components)
- Embla Carousel (carousel functionality)

**Database & ORM:**
- `@neondatabase/serverless` (serverless PostgreSQL driver)
- `drizzle-orm` (TypeScript ORM)
- `drizzle-kit` (schema migrations)
- `drizzle-zod` (Zod schema generation)

**Form Management:**
- React Hook Form
- `@hookform/resolvers`
- Zod (schema validation)

**Development Tools:**
- `@replit/vite-plugin-runtime-error-modal`
- `@replit/vite-plugin-cartographer`
- `@replit/vite-plugin-dev-banner`
- `tsx` (TypeScript execution)
- `esbuild` (bundler)

**Third-Party Services:**
- Google Fonts API (Inter, Poppins)
- Stock images (stored locally in `/attached_assets/stock_images/`)

**Asset Management:**
- Static images in `/attached_assets/`