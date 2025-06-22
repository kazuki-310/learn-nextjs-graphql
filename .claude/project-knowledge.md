# プロジェクト知見集

## 重要な技術決定

### GraphQLスキーマ設計
- **スキーマファーストアプローチ**を採用
- `src/lib/graphql/schema.gql`で一元管理
- **理由**: 型生成の自動化、フロントエンドとバックエンドの契約明確化

### Container/Presentationalパターン
- **Container**（`_containers/`）: データフェッチとビジネスロジック
- **Presentational**（`_components/`）: UI表示とイベントハンドリング
- **メリット**: テスタビリティ向上、関心の分離、再利用性

### サーバーアクションパターン
- `_lib/actions.ts`でフォーム送信とミューテーション処理
- `withServerAction`ラッパーで共通エラーハンドリング
- **React Hook Form** + **Zod Resolver**の組み合わせ

## 避けるべきパターン

### パフォーマンスのアンチパターン
- ❌ **GraphQLクエリの深いネスト**: N+1問題発生
- ❌ **Prismaクエリの未最適化**: `include`の乱用
- ❌ **キャッシュなしのリピートクエリ**: パフォーマンス低下

### 設計のアンチパターン
- ❌ **コンポーネント内でのデータフェッチ**: Container/Presentationalの原則違反
- ❌ **型定義の重複**: GraphQL Code Generatorの恩恵を受けない
- ❌ **エラーハンドリングの不統一**: ユーザビリティ低下

## 重要なコマンド

### 型生成の自動化
```bash
# GraphQL型生成
pnpm codegen

# Prismaクライアント生成
pnpm prisma-generate

# 両方実行（型変更時必須）
pnpm codegen && pnpm prisma-generate
```