# ECRデプロイ手順書

## 概要

このドキュメントは、Next.jsアプリケーションをAmazon ECR（Elastic Container Registry）にデプロイする手順を記載しています。

## 前提条件

- AWS CLIがインストール・設定済み
- Dockerがインストール済み
- 適切なAWS権限（ECR操作権限）を持つユーザー

## ステップ1: AWS環境の準備

### 1.1 AWS認証情報確認

```bash
# 現在の設定確認
aws configure list

# 接続先アカウント確認
aws sts get-caller-identity
```

### 1.2 sandboxプロファイル設定（必要に応じて）

```bash
# sandboxプロファイル設定
aws configure --profile sandbox

# sandbox環境に切り替え
export AWS_PROFILE=sandbox

# 切り替え確認
aws sts get-caller-identity
```

### 1.3 ECRリポジトリ作成

```bash
# ECRリポジトリ作成（初回のみ）
aws ecr create-repository --repository-name learn-nextjs-graphql --region ap-southeast-2

# 作成確認
aws ecr describe-repositories --repository-names learn-nextjs-graphql --region ap-southeast-2
```

## ステップ2: Dockerイメージのビルド

### 2.1 環境変数ファイルの準備

プロジェクトルートに以下のファイルが必要：

- `.env` - 共通環境変数（NEXTAUTH_SECRETなど）
- `.env.production` - 本番環境用設定

### 2.2 .dockerignoreの更新

```bash
# .dockerignoreから環境変数ファイルのコメントアウトを確認
# 以下の行がコメントアウトされていることを確認：
# .env                    # Dockerビルドで必要なのでコメントアウト
# .env.production         # Dockerビルドで必要なのでコメントアウト
```

### 2.3 Dockerイメージビルド

```bash
# Dockerイメージをビルド
docker build -t learn-nextjs-graphql .

# ビルド確認
docker images | grep learn-nextjs-graphql
```

### 2.4 ローカル動作テスト

```bash
# コンテナ起動
docker run -d -p 3000:3000 --name test-app learn-nextjs-graphql

# 動作確認
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000

# コンテナ停止・削除
docker stop test-app && docker rm test-app
```

## ステップ3: ECRへのデプロイ

### 3.1 ECRリポジトリURI取得

```bash
# リポジトリURI取得
aws ecr describe-repositories --repository-names learn-nextjs-graphql --region ap-southeast-2 --query 'repositories[0].repositoryUri' --output text
```

### 3.2 ECR認証

```bash
# ECRログイン（認証トークンは12時間有効）
aws ecr get-login-password --region ap-southeast-2 | docker login --username AWS --password-stdin [ACCOUNT-ID].dkr.ecr.ap-southeast-2.amazonaws.com
```

### 3.3 イメージタグ付け

```bash
# ECR用タグ付け
docker tag learn-nextjs-graphql:latest [ACCOUNT-ID].dkr.ecr.ap-southeast-2.amazonaws.com/learn-nextjs-graphql:latest

# タグ確認
docker images | grep learn-nextjs-graphql
```

### 3.4 ECRへプッシュ

```bash
# イメージプッシュ
docker push [ACCOUNT-ID].dkr.ecr.ap-southeast-2.amazonaws.com/learn-nextjs-graphql:latest
```

### 3.5 プッシュ確認

```bash
# ECRリポジトリ内のイメージ確認
aws ecr list-images --repository-name learn-nextjs-graphql --region ap-southeast-2

# 詳細確認
aws ecr describe-images --repository-name learn-nextjs-graphql --region ap-southeast-2 --image-ids imageTag=latest
```

## ワンライナーデプロイコマンド

### 完全デプロイ（初回）

```bash
# 環境変数設定
export AWS_PROFILE=sandbox
export ECR_REPOSITORY=learn-nextjs-graphql
export AWS_REGION=ap-southeast-2
export ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

# ECRリポジトリ作成（初回のみ）
aws ecr create-repository --repository-name $ECR_REPOSITORY --region $AWS_REGION

# ビルド・タグ付け・プッシュ
docker build -t $ECR_REPOSITORY . && \
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com && \
docker tag $ECR_REPOSITORY:latest $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:latest && \
docker push $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:latest
```

### 更新デプロイ（2回目以降）

```bash
# 環境変数設定
export AWS_PROFILE=sandbox
export ECR_REPOSITORY=learn-nextjs-graphql
export AWS_REGION=ap-southeast-2
export ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

# ビルド・タグ付け・プッシュ
docker build -t $ECR_REPOSITORY . && \
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com && \
docker tag $ECR_REPOSITORY:latest $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:latest && \
docker push $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:latest
```

## トラブルシューティング

### 1. ビルドエラー「NEXTAUTH_SECRET Required」

- `.env`ファイルが存在することを確認
- `.dockerignore`で`.env`がコメントアウトされていることを確認

### 2. プッシュエラー「access denied」

```bash
# 認証情報確認
aws sts get-caller-identity

# ECR再ログイン
aws ecr get-login-password --region ap-southeast-2 | docker login --username AWS --password-stdin [ACCOUNT-ID].dkr.ecr.ap-southeast-2.amazonaws.com
```

### 3. リポジトリが見つからない

```bash
# リポジトリ存在確認
aws ecr describe-repositories --region ap-southeast-2

# 必要に応じて作成
aws ecr create-repository --repository-name learn-nextjs-graphql --region ap-southeast-2
```

### 4. Prismaクライアントエラー

- Dockerfileの`COPY --from=builder`でPrismaクライアントパスが正しいことを確認
- pnpm使用時は`/app/node_modules/.pnpm/@prisma+client*`パスを使用

## 注意事項

1. **環境変数の分離**: `.env.local`は開発用、`.env.production`は本番用として使い分ける
2. **セキュリティ**: 認証情報をコードにハードコーディングしない
3. **認証トークン**: ECRの認証トークンは12時間で期限切れ
4. **リージョン**: すべてのコマンドで同じリージョンを使用する
5. **プロファイル**: 本番環境とsandbox環境を間違えないよう注意

## 関連ファイル

- `Dockerfile` - コンテナイメージ定義
- `.dockerignore` - Dockerビルド時の除外ファイル
- `.env` - 共通環境変数
- `.env.production` - 本番環境用環境変数
