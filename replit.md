# Paryāvaraṇa Vidyā - Gamified Environmental Education Platform

## Overview

Paryāvaraṇa Vidyā is a gamified environmental education platform designed for Indian schools and colleges. The platform transforms environmental learning through interactive lessons, real-world challenges, quizzes, and eco-friendly tasks. Students earn eco-points, unlock achievements, compete in leaderboards, and track their progress while learning about critical environmental issues like air pollution, water scarcity, plastic waste, and climate change. The platform promotes sustainable practices through engaging game mechanics including badges, levels, streaks, and school-level competitions.

## Replit Environment Setup (October 2025)

### GitHub Import Configuration
This project was successfully imported from GitHub and configured for the Replit environment:
- **Node.js**: v20.x configured and working
- **Dependencies**: All npm packages installed successfully
- **Workflow**: Configured to run `npm run dev` on port 5000 with webview output
- **Vite Configuration**: Already includes `allowedHosts: true` for Replit proxy compatibility
- **Asset Management**: Stock images mapped from generated_images to stock_images directory
- **TypeScript**: Storage interface fixed to properly initialize User objects with all required fields
- **Deployment**: Configured for autoscale deployment with build and start scripts

### Running the Application
- **Development**: `npm run dev` - Starts Express server with Vite HMR on port 5000
- **Production Build**: `npm run build` - Builds frontend with Vite and backend with esbuild
- **Production Server**: `npm run start` - Runs production server from dist/index.js
- **Type Checking**: `npm run check` - Runs TypeScript compiler in check mode

## Recent Changes (October 2025)

### Profile System Implementation
- **ProfileDialog Component**: Created a comprehensive profile dialog showing user information, active days calendar (LeetCode-style with 90-day grid), achievements showcase, and logout functionality
- **Active Days Tracking**: Displays user activity in a visual calendar grid showing streak information and daily engagement
- **Achievements Display**: Shows unlocked achievements with icons, descriptions, and unlock dates
- **User Information**: Displays name, email, mobile, location, institution, role, and eco points
- **Logout Functionality**: Integrated logout button that returns users to login page

### Enhanced AI Assistant
- **Comprehensive Knowledge Base**: Expanded AI responses to cover 18+ environmental topics including:
  - Air pollution and Delhi AQI issues
  - Plastic pollution and ocean impact
  - Climate change and global warming
  - Renewable energy (solar, wind, hydro)
  - Water scarcity and conservation
  - Deforestation and tree planting
  - Carbon footprint reduction
  - Composting and waste management
  - Biodiversity conservation
  - Electric vehicles and sustainable transport
  - Recycling practices
  - Energy conservation
  - Ozone layer protection
  - Current environmental issues in India
- **Contextual Responses**: AI provides detailed, actionable information specific to Indian environmental context
- **Sample Questions**: Added 6 curated sample questions covering key environmental topics

### Updated User Schema
- Extended user model to include:
  - Profile fields: name, email, mobile, gender, location, role, institution
  - Gamification fields: ecoPoints (integer), activeDays (JSONB array of dates), achievements (JSONB array of achievement objects)
  - Achievement type includes: id, title, description, icon, unlockedAt
  - Created timestamp tracking

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for client-side routing (lightweight React Router alternative)
- TanStack Query (React Query) for server state management and data fetching
- Tailwind CSS for utility-first styling with custom design system

**Design System:**
- Material Design principles with nature-inspired custom elements
- shadcn/ui component library (Radix UI primitives with custom styling)
- "New York" style variant from shadcn/ui
- Custom color palette with HSL-based theming supporting light/dark modes
- Forest green primary color (142 65% 45%), terracotta secondary (32 45% 55%)
- Inter font family for UI/body text, Poppins for display/headers
- Custom CSS variables for consistent elevation, borders, and hover states

**Component Architecture:**
- Atomic design pattern with reusable UI components in `/client/src/components/ui`
- Feature-specific components for gamification elements (BadgeDisplay, LeaderboardCard, ChallengeCard, etc.)
- Page-level components in `/client/src/pages`
- ThemeProvider for global theme management with localStorage persistence
- Route-based code splitting through dynamic imports

**State Management:**
- TanStack Query for API data caching and synchronization
- React Context for theme state
- Local component state with useState/useEffect hooks
- No global state management library needed due to query-based architecture

### Backend Architecture

**Technology Stack:**
- Node.js with Express.js for REST API server
- TypeScript for type safety across server code
- Drizzle ORM for database interactions
- Neon serverless PostgreSQL as the database provider
- WebSocket support through Neon's serverless driver

**API Design:**
- RESTful API structure with `/api` prefix for all endpoints
- Route registration through modular `/server/routes.ts`
- Storage abstraction layer (`IStorage` interface) allowing flexible data persistence
- Currently using in-memory storage (`MemStorage`) for user data
- Designed for easy migration to database-backed storage

**Server Configuration:**
- Development mode with Vite middleware integration for HMR
- Production mode serves static built assets
- Request/response logging middleware for API routes
- Error handling middleware with consistent JSON error responses
- Session-based authentication ready (connect-pg-simple for PostgreSQL sessions)

### Data Storage

**Database Schema (PostgreSQL via Drizzle):**
- `users` table with fields:
  - Authentication: id, username, password
  - Profile: name, email, mobile, gender, location, role, institution
  - Gamification: ecoPoints (integer), activeDays (JSONB array), achievements (JSONB array)
  - Timestamps: createdAt
- UUID-based primary keys using PostgreSQL's `gen_random_uuid()`
- JSONB fields for flexible achievement and activity tracking
- Zod schemas for runtime validation via drizzle-zod

**Database Provider:**
- Neon serverless PostgreSQL for production
- WebSocket-based connection pooling for serverless environments
- Drizzle Kit for schema migrations in `/migrations` directory
- Connection string configured via `DATABASE_URL` environment variable

**Current Implementation:**
- In-memory storage (`MemStorage` class) for development
- Map-based user storage with manual ID generation
- Storage interface (`IStorage`) defines contract for CRUD operations
- Easy migration path to database-backed storage via `drizzle-orm`

### Authentication and Authorization

**Authentication Approach:**
- Username/password-based authentication (not yet fully implemented)
- Registration form collects: name, mobile, email, gender, location, role, institution
- Session management infrastructure in place via `connect-pg-simple`
- Cookie-based session storage ready for PostgreSQL backing

**Authorization Model:**
- Role-based access intended (role field in user schema)
- Currently no middleware enforcement
- Frontend routing shows different content based on user state
- Designed for future implementation of student/teacher/admin roles

### External Dependencies

**UI Component Libraries:**
- Radix UI primitives (@radix-ui/*) for accessible, unstyled components
- shadcn/ui configuration for styled component variants
- Lucide React for icon system
- React Day Picker for calendar/date selection
- Recharts for data visualization (charts component included)
- cmdk for command palette functionality
- Vaul for drawer components
- Embla Carousel for carousel functionality

**Database & ORM:**
- @neondatabase/serverless - Serverless PostgreSQL driver with WebSocket support
- drizzle-orm - TypeScript ORM for type-safe database queries
- drizzle-kit - CLI tool for schema migrations
- drizzle-zod - Zod schema generation from Drizzle schemas

**Form Management:**
- React Hook Form for form state and validation
- @hookform/resolvers for integration with validation libraries
- Zod for schema validation

**Development Tools:**
- @replit/vite-plugin-runtime-error-modal - Runtime error overlay
- @replit/vite-plugin-cartographer - Code navigation (Replit-specific)
- @replit/vite-plugin-dev-banner - Development environment banner
- tsx - TypeScript execution for development server
- esbuild - Fast TypeScript/JavaScript bundler for production builds

**Third-Party Services:**
- Google Fonts API (Inter, Poppins font families)
- Stock images stored in `/attached_assets/stock_images/` directory
- No external APIs currently integrated for environmental data
- AI Chat feature present in UI but not connected to actual AI service

**Asset Management:**
- Static images in `/attached_assets/` directory
- Vite alias `@assets` for importing attached assets
- Images include environmental themes: air pollution, water scarcity, plastic waste, tree planting, solar energy, etc.