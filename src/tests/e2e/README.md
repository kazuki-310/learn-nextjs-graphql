# E2E Tests

このディレクトリには、PlaywrightとTypeScriptを使用したエンドツーエンドテストが含まれています。

## 構成

```
src/tests/e2e/
├── user/                    # ユーザー関連のテスト
│   ├── screenshots/         # テスト実行時のスクリーンショット
│   ├── config.ts           # テスト設定
│   ├── helpers.ts          # テストヘルパー関数
│   ├── types.ts            # TypeScript型定義
│   └── user-crud.test.ts   # ユーザーCRUDテスト
└── README.md               # このファイル
```

## 前提条件

1. 開発サーバーが起動していること:
```bash
npm run dev
```

2. 必要な依存関係がインストールされていること:
```bash
npm install
```

## テスト実行

### すべてのE2Eテストを実行
```bash
npm run test:e2e
```

### ユーザーCRUDテストのみ実行
```bash
npm run test:e2e:user
```

## 機能

### ユーザーCRUDテスト
- ✅ **CREATE**: 新規ユーザー作成
- ✅ **READ**: ユーザーリスト表示確認
- ✅ **UPDATE**: ユーザー情報編集
- ✅ **DELETE**: ユーザー削除

### スクリーンショット
テスト実行時に自動的に各ステップのスクリーンショットが保存されます:
- `user/screenshots/` ディレクトリ内
- 失敗時は `test-failure.png` も保存

## 設定

`user/config.ts` でテスト設定をカスタマイズできます:
- ベースURL
- タイムアウト
- ブラウザの動作速度
- ヘッドレスモード
- スクリーンショット設定

## 新しいテストの追加

1. 適切なディレクトリを作成 (例: `project/`)
2. 必要なファイルを追加:
   - `config.ts` - 設定
   - `helpers.ts` - ヘルパー関数
   - `types.ts` - 型定義
   - `*.test.ts` - テストファイル
3. `package.json` にスクリプトを追加