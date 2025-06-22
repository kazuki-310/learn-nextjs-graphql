# プロジェクトコンテキスト

## 概要

- **プロジェクト名**: Learn Next.js GraphQL
- **技術スタック**: Next.js 15 + React 19 + TypeScript + GraphQL + PostgreSQL
- **目標**: Next.js 15とGraphQLを学習するためのフルスタックWebアプリケーション

## プロジェクトの目的

- Next.js 15のApp Routerパターンの習得
- GraphQLとApollo Serverの統合方法の学習
- Prisma ORMを使った型安全なデータベース操作の実践
- Container/Presentationalパターンの適用
- 認証システム（NextAuth v4）の実装

## 制約条件

- TypeScriptでの型安全性を最優先
- モダンブラウザのみサポート（IE11は対象外）
- レスポンシブデザイン（モバイルファースト）
- パフォーマンス重視（Lighthouse 90点以上）
- アクセシビリティ準拠（WCAG 2.1 AA）
- SEO対応（Next.js 15のメタデータAPI活用）

## 技術選定理由

### フロントエンド

- **Next.js 15**: App Routerによる最新のReactパターン、サーバーコンポーネント活用
- **React 19**: 最新のReactフィーチャー（use hook、concurrent rendering）
- **TypeScript**: 開発効率とコード品質向上のため
- **Tailwind CSS**: 迅速なUI開発とデザインシステムの統一
- **shadcn/ui**: アクセシブルで再利用可能なコンポーネント

### バックエンド

- **Apollo Server**: GraphQLの標準的な実装、型安全性重視
- **Prisma ORM**: データベース操作の型安全性とマイグレーション管理
- **PostgreSQL**: 本格的なRDBMSでの学習、JSON型サポート

### 開発ツール

- **Turbopack**: 高速な開発サーバー
- **ESLint + Prettier**: コード品質とフォーマットの統一
- **Jest + React Testing Library**: テスト駆動開発の実践
- **GraphQL Code Generator**: スキーマファーストでの型生成
