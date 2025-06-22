# よく使用するパターン

## 開発ワークフロー

### プロジェクト起動

```bash
# 開発サーバー起動（Turbopack使用）
pnpm dev

# データベースマイグレーション + 開発サーバー起動
pnpm prisma-migrate && pnpm dev

# 型生成 + 開発サーバー起動
pnpm codegen && pnpm prisma-generate && pnpm dev
```

### ビルドと検証

```bash
# フル型チェック + ビルド
pnpm lint && pnpm build

# テスト実行 + カバレッジ
pnpm test:coverage

# 本番ビルド + 起動テスト
pnpm build && pnpm start
```

### データベース操作

```bash
# マイグレーション実行
pnpm prisma-migrate

# データベースリセット（開発環境のみ）
pnpm prisma-reset

# Prismaクライアント再生成
pnpm prisma-generate

# GraphQLスキーマから型生成
pnpm codegen
```

## コンポーネント実装パターン

### 新しいページの作成

```typescript
// 1. ページコンポーネント (src/app/example/page.tsx)
import { ExampleContainer } from './_containers/example-container'

export default function ExamplePage() {
  return <ExampleContainer />
}

// 2. コンテナコンポーネント (src/app/example/_containers/example-container.tsx)
import { fetchExampleData } from '../_lib/fetchers'
import { ExampleComponent } from '../_components/example-component'

export async function ExampleContainer() {
  const data = await fetchExampleData()
  return <ExampleComponent data={data} />
}

// 3. プレゼンテーショナルコンポーネント (src/app/example/_components/example-component.tsx)
type ExampleComponentProps = {
  data: ExampleData[]
}

export function ExampleComponent({ data }: ExampleComponentProps) {
  // UI実装
}
```

## トラブルシューティングパターン

### 型エラーの解決

```bash
# GraphQL型が更新されない場合
rm -rf src/lib/graphql/__generated__ && pnpm codegen

# Prisma型が更新されない場合
pnpm prisma-generate

# TypeScriptキャッシュクリア
rm -rf .next && pnpm dev
```

### ビルドエラーの解決

```bash
# 型チェックエラー
pnpm tsc --noEmit

# ESLintエラー
pnpm lint:fix
```

## テストパターン

### コンポーネントテスト

```typescript
// src/app/example/__tests__/example-component.test.tsx
import { render, screen } from '@testing-library/react'
import { ExampleComponent } from '../_components/example-component'

describe('ExampleComponent', () => {
  it('正常にレンダリングされる', () => {
    const mockData = [{ id: '1', title: 'Test' }]
    render(<ExampleComponent data={mockData} />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})

# テスト実行
pnpm test -- src/app/example/__tests__
```

### GraphQLリゾルバーテスト

```typescript
// src/lib/graphql/__tests__/resolvers.test.ts
import { testServer } from '../../test-utils/apollo-server';

describe('Example Resolver', () => {
  it('exampleクエリが正常に動作する', async () => {
    const result = await testServer.executeOperation({
      query: 'query GetExample($id: ID!) { example(id: $id) { id title } }',
      variables: { id: '1' },
    });
    expect(result.data?.example).toBeDefined();
  });
});
```
