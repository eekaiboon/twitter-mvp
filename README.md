# Twitter MVP

A minimal viable product (MVP) version of Twitter demonstrating core social networking functionalities.

## Project Overview

This project implements a Twitter-like application with core features including authentication, tweeting, following, feed viewing, search, and user profiles. The implementation follows modern web development practices with a clear separation between frontend and backend services.

The project is split into two primary parts:
- `frontend/`: Next.js application with TypeScript, Tailwind CSS, and Apollo Client
- `backend/`: Nest.js application with TypeScript, GraphQL, and SQLite

Both parts use a shared GraphQL schema to enforce type safety and clean API design.

## Authentication Flow

The authentication system uses JWT tokens with the following flow:

1. **Login/Signup**: User submits credentials via GraphQL mutation
2. **Token Generation**: Backend validates credentials and generates JWT token containing user ID
3. **Token Storage**: Frontend stores the JWT in local storage or memory
4. **Request Authorization**: Frontend includes JWT in the Authorization header for subsequent requests
5. **Token Validation**: 
   - JwtStrategy extracts and decodes the token
   - User is looked up in database using ID from token
   - User object is attached to request context
6. **Route Protection**: JwtAuthGuard protects routes requiring authentication
7. **User Access**: CurrentUser decorator extracts authenticated user data from request

## Codebase Structure

### Frontend Structure
```
frontend/
├── app/                  # Next.js 13+ App Router
│   ├── auth/             # Authentication routes (login/signup)
│   ├── dashboard/        # Main dashboard route
│   ├── profile/          # User profile routes
│   │   └── [username]/   # Dynamic profile route
│   └── search/           # Search functionality
├── components/           # React components
│   ├── auth/             # Auth-related components
│   ├── tweets/           # Tweet-related components
│   ├── profile/          # Profile-related components
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and API clients
│   ├── auth-actions.ts   # Authentication actions
│   ├── graphql-client.ts # Apollo client setup
│   └── validation.ts     # Form validation logic
├── middleware.ts         # Next.js middleware for auth protection
└── types/                # TypeScript type definitions
```

### Backend Structure
```
backend/
├── src/
│   ├── modules/          # Feature modules
│   │   ├── auth/         # Authentication module
│   │   │   ├── dto/      # Data Transfer Objects
│   │   │   ├── guards/   # JWT Auth guards
│   │   │   └── strategies/ # Passport strategies
│   │   ├── users/        # Users module
│   │   │   ├── entities/ # User entity definitions
│   │   │   └── dto/      # User DTOs
│   │   └── tweets/       # Tweets module
│   ├── prisma/           # Database service
│   └── config/           # Configuration
├── prisma/               # Prisma schema and migrations
│   └── schema.prisma     # Database schema
└── test/                 # Testing directory
```

## Engineering Principles

### Always Test
- All new features must include appropriate tests
- Unit tests for business logic and services
- Integration tests for API endpoints
- End-to-end tests for critical user flows
- Aim for high test coverage, especially for core functionality
- Test both success cases and error handling scenarios

### Use Latest Libraries and Dependencies
- Keep all dependencies updated to the latest stable versions
- Regularly audit packages for security vulnerabilities using `npm audit`
- Subscribe to security advisories for critical dependencies
- Prefer well-maintained libraries with active communities
- Establish a regular update schedule (e.g., monthly dependency reviews)
- Automate dependency updates with tools like Dependabot or Renovate
- Test thoroughly after dependency updates to catch breaking changes
- Document intentional use of older versions when necessary

### Follow Idiomatic Best Practices

#### General
- Use TypeScript for static typing and better developer experience
- Follow consistent code style with ESLint and Prettier
- Write clean, maintainable, and self-documenting code
- Use meaningful variable and function names
- Keep functions small and focused on a single responsibility
- Document complex logic with clear comments

#### Frontend
- Use React hooks for state management and side effects
- Follow component composition patterns
- Implement responsive design with mobile-first approach
- Use Tailwind CSS utility classes consistently
- Implement proper loading states and error handling
- Follow Next.js best practices for routing and data fetching
- Use Apollo Client effectively for GraphQL operations

#### Backend
- Follow Nest.js module architecture
- Implement proper validation for all inputs
- Use Prisma as the ORM for database operations
- Follow REST/GraphQL best practices
- Implement proper authentication and authorization
- Handle errors gracefully with appropriate status codes
- Use environment variables for configuration

#### Database
- Use migrations for schema changes
- Implement proper indexing for performance
- Follow normalization principles for schema design
- Use transactions for operations that require atomicity

## Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or with pnpm
   pnpm install
   ```

3. Setup environment variables:
   - Rename `.env.example` to `.env` or create a new `.env` file
   - Configure database connection and JWT secret

4. Set up the database and run migrations:
   ```bash
   ./setup-db.sh
   # or
   npx prisma generate
   npx prisma db push
   ```

5. Start the development server:
   ```bash
   npm run start:dev
   # or
   pnpm run start:dev
   ```

The GraphQL API will be available at http://localhost:4000/graphql

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or with pnpm
   pnpm install
   ```

3. Set up environment variables:
   - Ensure `.env.local` exists with the correct GraphQL endpoint:
     ```
     NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
     ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   pnpm run dev
   ```

The frontend application will be available at http://localhost:3000

## Milestones

### Milestone 1: Auth System ✅
- User signup and login
- JWT authentication
- Protected routes

### Milestone 2: Tweeting
- Create and fetch tweets
- User profile tweets

### Milestone 3: Follow System
- Follow/unfollow users
- Follower and following counts

### Milestone 4: Feed
- Timeline of tweets from followed users
- Infinite scroll

### Milestone 5: Search
- Search tweets by text and hashtags
- Search results view

### Milestone 6: Profile Pages
- Public user profiles
- User info and tweets display