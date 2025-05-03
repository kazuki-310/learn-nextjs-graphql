import { Resolvers } from '@/lib/graphql/__generated__/resolvers-types';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { readFileSync } from 'fs';
import { join } from 'path';

const typeDefs = readFileSync(join(process.cwd(), 'src/lib/graphql/schema.gql'), 'utf-8');

const productData = [
  {
    id: 'gid://shopify/Product/123456789',
    title: 'Gift Card',
    description: 'This is a sample gift card product for testing purposes.',
    createdAt: '2023-10-01T12:00:00Z',
    updatedAt: '2023-10-01T12:00:00Z',
    tags: ['gift', 'card'],
    price: 1000,
  },
  {
    id: 'gid://shopify/Product/987654321',
    title: 'サマーTシャツ',
    description: '涼しく快適な夏用Tシャツです。',
    createdAt: '2023-10-01T12:00:00Z',
    updatedAt: '2023-10-01T12:00:00Z',
    tags: ['夏', 'Tシャツ'],
    price: 2000,
  },
  {
    id: 'gid://shopify/Product/456789123',
    title: 'レザーウォレット',
    description: '上質な本革を使用した長財布です。',
    createdAt: '2023-10-01T12:00:00Z',
    updatedAt: '2023-10-01T12:00:00Z',
    tags: ['レザー', '財布'],
    price: 5000,
  },
];

const userData = [
  {
    id: 'usr_001',
    name: '佐藤太郎',
    email: 'taro.sato@example.com',
    role: 'admin',
    company: '株式会社テクノロジー',
    lastLogin: '2024-05-01T08:30:00Z',
  },
  {
    id: 'usr_002',
    name: '鈴木花子',
    email: 'hanako.suzuki@example.com',
    role: 'editor',
    company: 'デザインスタジオ',
    lastLogin: '2024-05-02T10:15:00Z',
  },
  {
    id: 'usr_003',
    name: '田中健太',
    email: 'kenta.tanaka@example.com',
    role: 'viewer',
    company: 'マーケティング企画',
    lastLogin: '2024-05-01T14:45:00Z',
  },
  {
    id: 'usr_004',
    name: '伊藤めぐみ',
    email: 'megumi.ito@example.com',
    role: 'editor',
    company: 'クリエイティブ株式会社',
    lastLogin: '2024-05-03T09:20:00Z',
  },
  {
    id: 'usr_005',
    name: '山田隆',
    email: 'takashi.yamada@example.com',
    role: 'admin',
    company: 'システム開発',
    lastLogin: '2024-05-02T16:05:00Z',
  },
  {
    id: 'usr_006',
    name: '中村さやか',
    email: 'sayaka.nakamura@example.com',
    role: 'viewer',
    company: 'データ分析チーム',
    lastLogin: '2024-05-03T11:30:00Z',
  },
];

const resolvers: Resolvers = {
  Query: {
    users() {
      return userData;
    },
    products() {
      return productData;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server);

export async function GET(request: Request) {
  return handler(request);
}

export async function POST(request: Request) {
  return handler(request);
}
