# CLAUDE.md

必ず日本語で回答してください。
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production (includes Prisma generation)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier

### Database (Prisma)

- `npm run prisma-migrate` - Run database migrations
- `npm run prisma-generate` - Generate Prisma client
- `npm run prisma-reset` - Reset database and apply migrations

### GraphQL

- `npm run codegen` - Generate GraphQL types and resolvers from schema

## Architecture Overview

This is a Next.js 15 app using the App Router pattern with a full-stack GraphQL implementation.

### Core Technology Stack

- **Frontend**: Next.js 15 with React 19, TypeScript, Tailwind CSS
- **Backend**: Apollo Server integrated with Next.js API routes
- **Database**: PostgreSQL with Prisma ORM
- **UI**: shadcn/ui components with Radix UI primitives
- **Forms**: TanStack Form with React Hook Form integration
- **GraphQL**: Schema-first approach with code generation

### Key Architectural Patterns

#### Server Actions Pattern

The app uses a structured approach for server-side operations:

- `_server-actions/` directories contain GraphQL operations and fetchers
- Each operation has its own `.gql` file (e.g., `get-projects.gql`, `create-project.gql`)
- `actions.ts` files handle form submissions and mutations
- `fetchers.ts` files handle data fetching for components

#### GraphQL Integration

- Schema defined in `src/lib/graphql/schema.gql`
- Apollo Server runs at `/api/graphql` route
- TypeScript types auto-generated from schema using GraphQL Code Generator
- Generated types in `src/lib/graphql/__generated__/`

#### Database Models

- Two main entities: `Users` and `Projects`
- Users have roles (admin, editor, viewer)
- Projects have title, description, price, and timestamps

#### Form Handling

- Custom form components in `src/components/form/`
- Form validation and state management using TanStack Form
- Server actions handle form submissions with proper error handling

### Directory Structure Notes

- Pages use Next.js App Router with nested layouts
- Dashboard pages are grouped under `(dashboard)` route group
- UI components follow shadcn/ui conventions
- Shared components in `src/components/shared/`

### Environment Configuration

- Uses T3 Env for type-safe environment variables
- Currently configured for `NEXT_PUBLIC_API_URL`
- Add database URL and other secrets as needed
