---
applyTo: '**'
---

## ディレクトリ構造

このプロジェクトでは以下のディレクトリ構造に従ってください

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
