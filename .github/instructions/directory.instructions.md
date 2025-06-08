---
applyTo: '**'
---

## ディレクトリ構造

このプロジェクトでは以下のディレクトリ構造に従ってください

- src/
  - app/ - 各ページのコンポーネント
    - page.tsx - ルーティングページ
    - layout.tsx - ページのレイアウト
    - \_components/ - ページ固有のコンポーネント
    - **tests**/ - ページ固有のテスト
    - \_server-actions/ - サーバーアクション関連のコード
      - fetchers.ts - データフェッチャー
      - actions.ts - アクションハンドラー
  - components/ - 再利用可能なUIコンポーネント
    - ui/ - 汎用 UI コンポーネント
    - shared/ - アプリケーション全体で共有されるコンポーネント
  - hooks/ - カスタム React フック
  - types/ - TypeScript 型定義
  - lib/ - 外部ライブラリのラッパー
  - graphql/ - GraphQL 関連のコード
    - schema.gql - GraphQL スキーマ
    - index.ts - GraphQL リクエスタ
    - **generated**/ - 自動生成された型定義
  - schemas/ - バリデーションスキーマ
