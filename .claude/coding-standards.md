# コーディング規約

## 基本原則

- TypeScriptを使用し、型安全性を重視する
- Next.js 15のApp Routerパターンに準拠する
- GraphQLのコード生成を活用し、型安全なAPIアクセスを実現する
- ESLintとPrettierによる自動フォーマットを適用する

## ファイル・ディレクトリ構成

### 命名規則

- **ディレクトリ**: kebab-case（例: `user-profile`）
- **コンポーネントファイル**: kebab-case（例: `user-profile.tsx`）
- **hooks**: kebab-case、useプレフィックス（例: `use-user-data.ts`）
- **utility関数**: kebab-case（例: `format-date.ts`）
- **定数**: UPPER_SNAKE_CASE（例: `API_ENDPOINTS`）

### ディレクトリ構造

```
src/
├── app/              # Next.js App Router
├── components/       # 再利用可能なコンポーネント
├── graphql/          # GraphQL関連（schema、queries、mutations）
├── hooks/            # カスタムフック
├── lib/              # ユーティリティ関数、設定
├── types/            # TypeScript型定義
└── utils/            # 汎用的なヘルパー関数
```

## コンポーネント設計

### React コンポーネント

- 関数コンポーネントを使用
- TypeScriptのインターフェースでpropsを定義
- デフォルトエクスポートを使用

```typescript
type UserProfileProps = {
  userId: string;
  isEditable?: boolean;
};

export default function UserProfile({ userId, isEditable = false }: UserProfileProps) {
  // コンポーネントの実装
}
```

### フックの使用

- カスタムフックは`use`プレフィックスで命名
- 複数の状態やロジックを組み合わせる場合に使用
- 戻り値は配列またはオブジェクト形式

```typescript
export function useUserData(userId: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  return { user, loading, refetch };
}
```

## GraphQL規約

### クエリ・ミューテーション

- GraphQL Code Generatorを使用した型生成
- クエリとミューテーションは`graphql`ディレクトリで管理
- 操作名は明確で説明的に命名

```graphql
query GetUserProfile($userId: ID!) {
  user(id: $userId) {
    id
    name
    email
    profile {
      avatar
      bio
    }
  }
}
```

### Fragment使用

- 共通のフィールドセットはFragmentで定義
- 再利用性を高めるため積極的に使用

```graphql
fragment UserBasicInfo on User {
  id
  name
  email
}
```

## エラーハンドリング

- GraphQLのエラーレスポンスを適切に処理
- ユーザーフレンドリーなエラーメッセージを表示
- エラーの種類に応じた適切な処理を実装

## パフォーマンス

- Next.js 15のSSR/SSG機能を活用
- 適切なキャッシュ戦略を実装
- 必要に応じてReact.memoやuseMemoを使用

## テスト

- Jestを使用したユニットテスト
- React Testing Libraryを使用したコンポーネントテスト
- GraphQLのクエリ・ミューテーションのテスト

## コード品質

- ESLintルールに準拠
- Prettierによる自動フォーマット
- TypeScriptの厳密なルール設定を使用
- 未使用変数・インポートの除去
