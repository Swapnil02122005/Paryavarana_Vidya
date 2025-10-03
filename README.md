# Paryāvaraṇa Vidyā - Environmental Education Platform

A gamified environmental education platform that empowers students and teachers through interactive learning experiences.

## Features

### For Students
- Interactive environmental education modules
- Quiz system with eco-points rewards
- Educational games (waste sorting, carbon footprint calculator, water conservation, etc.)
- AI chat assistant for environmental questions
- Eco clubs participation
- Rewards redemption system
- Personal dashboard with progress tracking

### For Teachers
- Teacher dashboard for student management
- Student progress monitoring
- Class performance analytics

## Tech Stack

- **Frontend**: React + Vite + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js with local strategy

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL database

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```
DATABASE_URL=your_postgresql_connection_string
SESSION_SECRET=your_session_secret
NODE_ENV=development
```

3. Push database schema:
```bash
npm run db:push
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Scripts

- `npm run dev` - Start development server (frontend + backend)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Push database schema changes
- `npm run check` - Type check TypeScript files

## Project Structure

```
├── client/          # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Application pages
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utility functions
├── server/          # Express backend
│   ├── index.ts     # Server entry point
│   ├── routes.ts    # API routes
│   └── vite.ts      # Vite dev server setup
├── shared/          # Shared code
│   └── schema.ts    # Database schema & types
└── attached_assets/ # Static assets
```

## Deployment

This application is configured for deployment on Replit with autoscale:

- Build command: `npm run build`
- Start command: `npm run start`
- Port: 5000

## License

MIT
