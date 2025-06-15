# マルチステージビルドでイメージサイズを最適化
FROM node:22-alpine AS base

# pnpmを有効化
RUN corepack enable pnpm

# 依存関係をインストールするステージ
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# package.jsonとpnpm-lock.yamlをコピー
COPY package.json pnpm-lock.yaml* ./

# 依存関係をインストール
RUN pnpm install --frozen-lockfile

# ビルドステージ
FROM base AS builder
WORKDIR /app

# 依存関係をコピー
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 環境変数ファイルをコピー
COPY .env ./
COPY .env.production ./

# Prismaクライアントを生成
RUN pnpm prisma-generate

# Next.jsアプリをビルド
RUN pnpm build

# 本番用ランナーステージ  
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# セキュリティ: 非rootユーザーを作成
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# publicディレクトリをコピー
COPY --from=builder /app/public ./public

# Next.jsの静的ファイルをコピー
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Prismaクライアントをコピー（pnpmの場合は@prisma/clientを使用）
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.pnpm/@prisma+client* ./node_modules/.pnpm/
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]