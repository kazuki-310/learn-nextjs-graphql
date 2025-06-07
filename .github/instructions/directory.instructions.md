---
applyTo: '**'
---

## ディレクトリ構造

このプロジェクトでは以下のディレクトリ構造に従ってください

- src/
  - app/ - 各ページのコンポーネント
    - page.tsx - ルーティングページ
    - layout.tsx - ページのレイアウト
  - components/ - 再利用可能なUIコンポーネント
    - ui/ - 汎用 UI コンポーネント
    - shared/ - アプリケーション全体で共有されるコンポーネント
  - hooks/ - カスタム React フック
  - utils/ - ヘルパー関数
  - types/ - TypeScript 型定義
  - lib/ - 外部ライブラリのラッパー
