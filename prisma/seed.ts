import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ユーザーデータを作成
  const users = await Promise.all([
    prisma.users.create({
      data: {
        name: '山田太郎',
        email: 'yamada@example.com',
        password: 'hashed_password_1',
        role: Role.admin,
        image: 'https://avatar.vercel.sh/yamada',
      },
    }),
    prisma.users.create({
      data: {
        name: '佐藤花子',
        email: 'sato@example.com',
        password: 'hashed_password_2',
        role: Role.editor,
        image: 'https://avatar.vercel.sh/sato',
      },
    }),
    prisma.users.create({
      data: {
        name: '鈴木一郎',
        email: 'suzuki@example.com',
        password: 'hashed_password_3',
        role: Role.viewer,
        image: 'https://avatar.vercel.sh/suzuki',
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} users`);

  // プロジェクトデータを作成
  const projects = await Promise.all([
    prisma.projects.create({
      data: {
        title: 'ECサイトリニューアル',
        description: '既存のECサイトを最新技術でリニューアル。UX改善とパフォーマンス向上を目指します。',
        price: 5000000,
      },
    }),
    prisma.projects.create({
      data: {
        title: '社内業務システム開発',
        description: '業務効率化のための社内システムを新規開発。',
        price: 3000000,
      },
    }),
    prisma.projects.create({
      data: {
        title: 'モバイルアプリ開発',
        description: 'iOS/Android対応のネイティブアプリ開発。',
        price: 8000000,
      },
    }),
    prisma.projects.create({
      data: {
        title: 'Webサイト制作',
        description: 'コーポレートサイトの制作。デザインからコーディングまで。',
        price: 1200000,
      },
    }),
    prisma.projects.create({
      data: {
        title: 'データ分析基盤構築',
        description: 'ビッグデータの収集・分析基盤の構築。',
        price: 6500000,
      },
    }),
    prisma.projects.create({
      data: {
        title: 'AIチャットボット導入',
        description: 'カスタマーサポート用AIチャットボットの導入。',
        price: 4500000,
      },
    }),
    prisma.projects.create({
      data: {
        title: 'セキュリティ診断',
        description: 'Webアプリケーションのセキュリティ診断と対策提案。',
        price: 800000,
      },
    }),
    prisma.projects.create({
      data: {
        title: 'クラウド移行支援',
        description: 'オンプレミスからクラウドへの移行支援。',
        price: 7000000,
      },
    }),
    prisma.projects.create({
      data: {
        title: 'マーケティングオートメーション',
        description: 'MAツールの導入と運用支援。',
        price: 2500000,
      },
    }),
    prisma.projects.create({
      data: {
        title: 'SaaS開発',
        description: 'B2B向けSaaSプロダクトの開発。',
        price: 15000000,
      },
    }),
  ]);

  console.log(`✅ Created ${projects.length} projects`);

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });