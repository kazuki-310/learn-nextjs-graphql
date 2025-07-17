# アーキテクチャ概要

Next.js 15のApp Routerパターンを使用したフルスタックGraphQLアプリケーションです。

## 主要技術スタック

- **フロントエンド**: Next.js 15（React 19、TypeScript、Tailwind CSS）
- **バックエンド**: Next.js API routesと統合されたApollo Server
- **データベース**: PostgreSQL（Prisma ORM使用）
- **UI**: shadcn/uiコンポーネント（Radix UIプリミティブ）
- **フォーム**: React Hook Formとの統合
- **GraphQL**: スキーマファーストアプローチとコード生成

## 主要アーキテクチャパターン

### サーバーアクションパターン

アプリケーションはサーバーサイド操作に構造化されたアプローチを使用：

- `_lib/` ディレクトリにGraphQL操作とフェッチャーを格納
- 各操作は独自の `.gql` ファイルを持つ（例：`get-projects.gql`、`create-project.gql`）
- `actions.ts` ファイルは `withServerAction` ラッパーを使用してフォーム送信とミューテーションを処理
- `fetchers.ts` ファイルはコンポーネント用のデータフェッチを処理
- `src/lib/utils/server-action-wrapper.ts` による共通エラーハンドリングとキャッシュ再検証

### GraphQL統合

- `src/lib/graphql/schema.gql` でスキーマ定義
- Apollo Serverは `/api/graphql` ルートで実行
- GraphQL Code Generatorを使用してスキーマからTypeScript型を自動生成
- `src/lib/graphql/__generated__/` に生成された型

### データベースモデル

- 主要エンティティ：`Users` と `Projects`
- ユーザーには役割（admin、editor、viewer）
- プロジェクトにはタイトル、説明、価格、タイムスタンプ

### フォーム処理

- すべてのフォームでzodResolverによる検証とReact Hook Formを使用
- 各ページの `_lib/schemas.ts` でバリデーションスキーマをコロケーション管理
- 一貫したUIとアクセシビリティのためのshadcn/ui Formコンポーネント
- `withServerAction` ラッパーによる統一エラーハンドリングでサーバーアクションがフォーム送信を処理

### キャッシュ戦略

- 設定可能なキャッシュオプション付きカスタムGraphQLリクエスタ（`src/lib/graphql/index.ts`）
- `cacheOptions` ヘルパー：
  - `static(tags)` - 再検証タグ付き静的キャッシュ
  - `revalidate(seconds, tags)` - 時間ベース再検証
  - `noCache()` - 動的コンテンツ用キャッシュなし
- すべてのデータフェッチャーはリクエスト重複排除のためReactの `cache()` を使用

### ユーザーエクスペリエンス

- すべてのCRUD操作での `sonner` を使用したトースト通知
- エンティティ名を表示する成功メッセージ（例：「Project Name」を作成しました）
- ユーザーフレンドリーな日本語エラーメッセージ
- すべての非同期操作でのローディング状態とスケルトン

### Container/Presentationalパターン

- `_containers/` でデータフェッチを担当するContainerコンポーネント
- `_components/` で表示ロジックを担当するPresentationalコンポーネント
- Containerはデータフェッチのみに集中、Presentationalは表示とエラー状態処理に集中
- エラー状態（null/undefined）と空状態（空配列）を適切に区別して処理

### 共有コンポーネントとユーティリティ

- `DataTable` コンポーネント（`src/components/shared/data-table.tsx`）によるアクション付き汎用テーブルレンダリング
- 一貫した日付表示のための日付フォーマットユーティリティ（`src/lib/utils/date-format.ts`）
- 適切なラベル-入力関連付けのためのフォームフィールドコンポーネント（`src/components/form/`）
- DRYエラーハンドリングとキャッシュ再検証のためのサーバーアクションラッパー（`src/lib/utils/server-action-wrapper.ts`）

### 認証システム

- NextAuth v4を使用したセッション管理
- `/signin` と `/signup` ページで認証フロー
- `(auth)` ルートグループで認証が必要なページを保護
- サーバーサイドでのセッション確認とリダイレクト処理

## ディレクトリ構造ガイドライン

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

### 追加パターン
- 認証が必要なページは `(auth)` ルートグループ下に配置
- サーバーアクションは `_lib/` ディレクトリで整理
- バリデーションスキーマは各ページの `_lib/schemas.ts` でコロケーション管理

## 環境設定

- 型安全な環境変数にT3 Envを使用
- 現在 `NEXT_PUBLIC_API_URL` が設定済み
- 必要に応じてデータベースURLやその他のシークレットを追加