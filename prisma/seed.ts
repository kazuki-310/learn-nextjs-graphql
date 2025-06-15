import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 シードデータの作成を開始します...')

  // パスワードをハッシュ化
  const hashedPassword = await bcrypt.hash('password123', 12)

  // ユーザーデータの作成
  const users = await Promise.all([
    prisma.users.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        name: '管理者',
        email: 'admin@example.com',
        password: hashedPassword,
        role: Role.admin,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      },
    }),
    prisma.users.upsert({
      where: { email: 'editor@example.com' },
      update: {},
      create: {
        name: 'エディター',
        email: 'editor@example.com',
        password: hashedPassword,
        role: Role.editor,
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b787?w=150',
      },
    }),
    prisma.users.upsert({
      where: { email: 'viewer@example.com' },
      update: {},
      create: {
        name: 'ビューア',
        email: 'viewer@example.com',
        password: hashedPassword,
        role: Role.viewer,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      },
    }),
  ])

  console.log(`✅ ${users.length}人のユーザーを作成しました`)

  // プロジェクトデータの作成
  const projects = await Promise.all([
    prisma.projects.upsert({
      where: { id: 'sample-project-1' },
      update: {},
      create: {
        id: 'sample-project-1',
        title: 'ECサイト開発プロジェクト',
        description: 'Next.jsとGraphQLを使用したモダンなECサイトの開発',
        price: 500000,
      },
    }),
    prisma.projects.upsert({
      where: { id: 'sample-project-2' },
      update: {},
      create: {
        id: 'sample-project-2',
        title: 'モバイルアプリUI/UX改善',
        description: 'React Nativeアプリのユーザビリティ向上とデザインシステム構築',
        price: 300000,
      },
    }),
    prisma.projects.upsert({
      where: { id: 'sample-project-3' },
      update: {},
      create: {
        id: 'sample-project-3',
        title: 'データ分析ダッシュボード',
        description: 'ビジネスメトリクス可視化のためのダッシュボード開発',
        price: 750000,
      },
    }),
    prisma.projects.upsert({
      where: { id: 'sample-project-4' },
      update: {},
      create: {
        id: 'sample-project-4',
        title: 'APIマイクロサービス構築',
        description: 'スケーラブルなマイクロサービスアーキテクチャの設計・実装',
        price: 1200000,
      },
    }),
    prisma.projects.upsert({
      where: { id: 'sample-project-5' },
      update: {},
      create: {
        id: 'sample-project-5',
        title: 'セキュリティ監査・改善',
        description: 'Webアプリケーションのセキュリティ診断と脆弱性対応',
        price: 400000,
      },
    }),
  ])

  console.log(`✅ ${projects.length}件のプロジェクトを作成しました`)

  console.log('🎉 シードデータの作成が完了しました！')
  console.log('\n📋 作成されたアカウント:')
  console.log('・管理者: admin@example.com / password123')
  console.log('・エディター: editor@example.com / password123')
  console.log('・ビューア: viewer@example.com / password123')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ シードデータの作成中にエラーが発生しました:', e)
    await prisma.$disconnect()
    process.exit(1)
  })