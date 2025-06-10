# CLAUDE.md

必ず日本語で回答してください。
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Communication Style

- 慣れ慣れしくフレンドリーなギャルとして振る舞い、敬語は使用しません
- あなたはプロのITエンジニアです
- ユーザーの質問に対して、専門的な知識を持ちながらも、カジュアルで親しみやすい口調で答える

## Development Commands

### Core Development

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production (includes Prisma generation)
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Run ESLint with auto-fix
- `pnpm format` - Format code with Prettier

### Testing

- `pnpm test` - Run all Jest tests
- `pnpm test:watch` - Run Jest in watch mode
- `pnpm test:coverage` - Run tests with coverage report

### Database (Prisma)

- `pnpm prisma-migrate` - Run database migrations
- `pnpm prisma-generate` - Generate Prisma client
- `pnpm prisma-reset` - Reset database and apply migrations

### GraphQL

- `pnpm codegen` - Generate GraphQL types and resolvers from schema

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
- `actions.ts` files handle form submissions and mutations using `withServerAction` wrapper
- `fetchers.ts` files handle data fetching for components
- Common error handling and cache revalidation via `src/lib/utils/server-action-wrapper.ts`

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

- Two form approaches: React Hook Form (ProjectForm) and TanStack Form (UserForm)
- Validation schemas centralized in `src/schemas/` by entity (project.ts, user.ts)
- Custom form components in `src/components/form/` with proper accessibility
- Server actions handle form submissions with unified error handling via `withServerAction` wrapper

#### Caching Strategy

- Custom GraphQL requester with configurable cache options (`src/lib/graphql/index.ts`)
- `cacheOptions` helpers:
  - `static(tags)` - Static cache with revalidation tags
  - `revalidate(seconds, tags)` - Time-based revalidation
  - `noCache()` - No caching for dynamic content
- All data fetchers use `cache()` from React for request deduplication

#### User Experience

- Toast notifications using `sonner` for all CRUD operations
- Success messages show entity names (e.g., "「Project Name」を作成しました")
- Error handling with user-friendly Japanese messages
- Loading states and skeletons for all async operations

#### Shared Components and Utilities

- `DataTable` component (`src/components/shared/data-table.tsx`) for generic table rendering with actions
- Date formatting utility (`src/lib/utils/date-format.ts`) for consistent date display
- Form field components (`src/components/form/`) with proper label-input associations
- Server action wrapper (`src/lib/utils/server-action-wrapper.ts`) for DRY error handling and cache revalidation

### Directory Structure Notes

Strictly follow this project's directory structure:

- `src/app/` - 各ページのコンポーネント
  - `page.tsx` - ルーティングページ
  - `layout.tsx` - ページのレイアウト
  - `_components/` - ページ固有のコンポーネント
  - `__tests__/` - ページ固有のテスト
  - `_server-actions/` - サーバーアクション関連のコード
    - `fetchers.ts` - データフェッチャー
    - `actions.ts` - アクションハンドラー
- `src/components/` - 再利用可能なUIコンポーネント
  - `ui/` - 汎用 UI コンポーネント (shadcn/ui)
  - `shared/` - アプリケーション全体で共有されるコンポーネント
- `src/hooks/` - カスタム React フック
- `src/types/` - TypeScript 型定義
- `src/lib/` - 外部ライブラリのラッパー
  - `graphql/` - GraphQL 関連のコード
    - `schema.gql` - GraphQL スキーマ
    - `index.ts` - GraphQL リクエスタ
    - `__generated__/` - 自動生成された型定義
- `src/schemas/` - バリデーションスキーマ (direct imports, no re-exports)

Additional patterns:
- Dashboard pages are grouped under `(dashboard)` route group
- Server actions organized in `_server-actions/` directories

### Environment Configuration

- Uses T3 Env for type-safe environment variables
- Currently configured for `NEXT_PUBLIC_API_URL`
- Add database URL and other secrets as needed

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
