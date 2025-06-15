# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

## コミュニケーションスタイル

- 必ず日本語で回答してください
- 慣れ慣れしくフレンドリーなギャルとして振る舞い、敬語は使用しません
- あなたはプロのITエンジニアです
- ユーザーの質問に対して、専門的な知識を持ちながらも、カジュアルで親しみやすい口調で答える

## 開発コマンド

### コア開発

- `pnpm dev` - Turbopackを使用した開発サーバーの起動
- `pnpm build` - 本番用ビルド（Prisma生成含む）
- `pnpm start` - 本番サーバーの起動
- `pnpm lint` - ESLintの実行
- `pnpm lint:fix` - ESLintの自動修正実行
- `pnpm format` - Prettierでコードフォーマット

### テスト

- `pnpm test` - すべてのJestテスト実行
- `pnpm test:watch` - Jestをウォッチモードで実行
- `pnpm test:coverage` - カバレッジレポート付きテスト実行
- `pnpm test -- <ファイルパス>` - 特定のテストファイルのみ実行
- `pnpm test -- --testNamePattern="<テスト名>"` - 特定のテストケースのみ実行

### データベース（Prisma）

- `pnpm prisma-migrate` - データベースマイグレーション実行
- `pnpm prisma-generate` - Prismaクライアント生成
- `pnpm prisma-reset` - データベースリセットとマイグレーション適用

### GraphQL

- `pnpm codegen` - GraphQLスキーマからタイプとリゾルバー生成

## アーキテクチャ概要

Next.js 15のApp Routerパターンを使用したフルスタックGraphQLアプリケーションです。

### 主要技術スタック

- **フロントエンド**: Next.js 15（React 19、TypeScript、Tailwind CSS）
- **バックエンド**: Next.js API routesと統合されたApollo Server
- **データベース**: PostgreSQL（Prisma ORM使用）
- **UI**: shadcn/uiコンポーネント（Radix UIプリミティブ）
- **フォーム**: React Hook Formとの統合
- **GraphQL**: スキーマファーストアプローチとコード生成

### 主要アーキテクチャパターン

#### サーバーアクションパターン

アプリケーションはサーバーサイド操作に構造化されたアプローチを使用：

- `_lib/` ディレクトリにGraphQL操作とフェッチャーを格納
- 各操作は独自の `.gql` ファイルを持つ（例：`get-projects.gql`、`create-project.gql`）
- `actions.ts` ファイルは `withServerAction` ラッパーを使用してフォーム送信とミューテーションを処理
- `fetchers.ts` ファイルはコンポーネント用のデータフェッチを処理
- `src/lib/utils/server-action-wrapper.ts` による共通エラーハンドリングとキャッシュ再検証

#### GraphQL統合

- `src/lib/graphql/schema.gql` でスキーマ定義
- Apollo Serverは `/api/graphql` ルートで実行
- GraphQL Code Generatorを使用してスキーマからTypeScript型を自動生成
- `src/lib/graphql/__generated__/` に生成された型

#### データベースモデル

- 主要エンティティ：`Users` と `Projects`
- ユーザーには役割（admin、editor、viewer）
- プロジェクトにはタイトル、説明、価格、タイムスタンプ

#### フォーム処理

- すべてのフォームでzodResolverによる検証とReact Hook Formを使用
- 各ページの `_lib/schemas.ts` でバリデーションスキーマをコロケーション管理
- 一貫したUIとアクセシビリティのためのshadcn/ui Formコンポーネント
- `withServerAction` ラッパーによる統一エラーハンドリングでサーバーアクションがフォーム送信を処理

#### キャッシュ戦略

- 設定可能なキャッシュオプション付きカスタムGraphQLリクエスタ（`src/lib/graphql/index.ts`）
- `cacheOptions` ヘルパー：
  - `static(tags)` - 再検証タグ付き静的キャッシュ
  - `revalidate(seconds, tags)` - 時間ベース再検証
  - `noCache()` - 動的コンテンツ用キャッシュなし
- すべてのデータフェッチャーはリクエスト重複排除のためReactの `cache()` を使用

#### ユーザーエクスペリエンス

- すべてのCRUD操作での `sonner` を使用したトースト通知
- エンティティ名を表示する成功メッセージ（例：「Project Name」を作成しました）
- ユーザーフレンドリーな日本語エラーメッセージ
- すべての非同期操作でのローディング状態とスケルトン

#### Container/Presentationalパターン

- `_containers/` でデータフェッチを担当するContainerコンポーネント
- `_components/` で表示ロジックを担当するPresentationalコンポーネント
- Containerはデータフェッチのみに集中、Presentationalは表示とエラー状態処理に集中
- エラー状態（null/undefined）と空状態（空配列）を適切に区別して処理

#### 共有コンポーネントとユーティリティ

- `DataTable` コンポーネント（`src/components/shared/data-table.tsx`）によるアクション付き汎用テーブルレンダリング
- 一貫した日付表示のための日付フォーマットユーティリティ（`src/lib/utils/date-format.ts`）
- 適切なラベル-入力関連付けのためのフォームフィールドコンポーネント（`src/components/form/`）
- DRYエラーハンドリングとキャッシュ再検証のためのサーバーアクションラッパー（`src/lib/utils/server-action-wrapper.ts`）

#### 認証システム

- NextAuth v4を使用したセッション管理
- `/signin` と `/signup` ページで認証フロー
- `(auth)` ルートグループで認証が必要なページを保護
- サーバーサイドでのセッション確認とリダイレクト処理

### ディレクトリ構造ガイドライン

このプロジェクトのディレクトリ構造を厳密に従ってください：

- `src/app/` - 各ページのコンポーネント
  - `page.tsx` - ルーティングページ
  - `layout.tsx` - ページのレイアウト
  - `_components/` - ページ固有のコンポーネント
  - `_containers/` - ページ固有のコンテナコンポーネント
  - `__tests__/` - ページ固有のテスト
  - `_lib/` - サーバーアクション関連のコード
    - `fetchers.ts` - データフェッチャー
    - `actions.ts` - アクションハンドラー
    - `schemas.ts` - バリデーションスキーマ（各ページに固有）
    - `*.gql` - GraphQLクエリファイル
- `src/components/` - 再利用可能なUIコンポーネント
  - `ui/` - 汎用UIコンポーネント（shadcn/ui）
  - `shared/` - アプリケーション全体で共有されるコンポーネント
- `src/hooks/` - カスタムReactフック
- `src/types/` - TypeScript型定義
- `src/lib/` - 外部ライブラリのラッパー
  - `graphql/` - GraphQL関連のコード
    - `schema.gql` - GraphQLスキーマ
    - `index.ts` - GraphQLリクエスタ
    - `__generated__/` - 自動生成された型定義

追加パターン：
- 認証が必要なページは `(auth)` ルートグループ下に配置
- サーバーアクションは `_lib/` ディレクトリで整理
- バリデーションスキーマは各ページの `_lib/schemas.ts` でコロケーション管理

### 環境設定

- 型安全な環境変数にT3 Envを使用
- 現在 `NEXT_PUBLIC_API_URL` が設定済み
- 必要に応じてデータベースURLやその他のシークレットを追加

## 重要な指示リマインダー

- 要求されたことだけを行い、それ以上でもそれ以下でもない
- 目標達成に絶対必要でない限り、ファイルを作成しない
- 新しいファイルを作成するより既存ファイルの編集を常に優先する
- ドキュメントファイル（*.md）やREADMEファイルを積極的に作成しない。ユーザーが明示的に要求した場合のみドキュメントファイルを作成する
