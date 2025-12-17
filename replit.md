# DistroMatch

## Overview

DistroMatch is a "Tinder for Linux Distros" web application that helps users find their perfect Linux distribution through a swipe-based discovery experience. Users swipe through desktop environment cards and answer preference questions, then receive personalized distro recommendations with witty roasts based on their choices.

The app features a cinematic, desktop-first UI with landscape-oriented cards, dynamic gradient backgrounds, and smooth Framer Motion animations. Content is presented in Turkish.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: React Query for server state, local useState for UI state
- **Animations**: Framer Motion for swipe gestures and transitions
- **Styling**: Tailwind CSS with custom design tokens in CSS variables
- **UI Components**: shadcn/ui (Radix UI primitives with custom styling)

### Component Structure
The app uses a card-stack interaction pattern:
- `DistroMatch` - Main orchestrator managing stages (DE selection → questions → results)
- `CardStack` / `DECard` / `QuestionCard` - Swipeable card components with gesture handling
- `ResultsScreen` - Displays scored distro recommendations with roast messages
- `DynamicBackground` - Reactive gradient background that changes with card colors

### Scoring System
Located in `client/src/lib/scoring.ts`:
- Calculates distro compatibility based on user preferences
- Considers: liked/disliked desktop environments, NVIDIA support, RAM requirements, gaming focus, privacy needs, rolling release preference
- Returns ranked list of distributions with match reasons

### Data Layer
- Static JSON data in `client/src/data/distros.json` for distro definitions
- TypeScript interfaces in `client/src/data/distros.ts` for type safety
- Roast templates in `client/src/data/roasts.ts` with conditional message selection

### Backend Architecture
- **Runtime**: Node.js with Express
- **Build Tool**: Vite for frontend, esbuild for server bundling
- **API Pattern**: RESTful routes prefixed with `/api`
- **Storage Interface**: Abstracted via `IStorage` interface (currently in-memory, database-ready)

### Database Schema
Configured with Drizzle ORM for PostgreSQL:
- `users` table with id, username, password fields
- Schema defined in `shared/schema.ts` with Zod validation via drizzle-zod
- Database URL expected via `DATABASE_URL` environment variable

## External Dependencies

### Core Services
- **PostgreSQL**: Database (requires DATABASE_URL environment variable)
- **Google Fonts**: Inter and Space Grotesk typefaces loaded via CDN

### Key NPM Packages
- `drizzle-orm` + `drizzle-kit`: Database ORM and migrations
- `@tanstack/react-query`: Async state management
- `framer-motion`: Animation library for swipe interactions
- `wouter`: Client-side routing
- `zod`: Runtime type validation
- `@radix-ui/*`: Accessible UI primitives
- `tailwindcss`: Utility-first CSS framework

### Development Tools
- `tsx`: TypeScript execution for development
- `vite`: Frontend build and HMR
- Replit-specific plugins for error overlay and dev tooling