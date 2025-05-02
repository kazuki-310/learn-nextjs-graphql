import { readFileSync } from 'fs';
import { join } from 'path';

import { Resolvers } from '@/lib/graphql/__generated__/resolvers-types';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';

const typeDefs = readFileSync(join(process.cwd(), 'src/lib/graphql/schema.gql'), 'utf-8');

const productData = [
  {
    id: 'gid://shopify/Product/123456789',
    title: 'Gift Card',
    description: 'This is a sample gift card product for testing purposes.',
  },
  {
    id: 'gid://shopify/Product/987654321',
    title: 'サマーTシャツ',
    description: '涼しく快適な夏用Tシャツです。',
  },
  {
    id: 'gid://shopify/Product/456789123',
    title: 'レザーウォレット',
    description: '上質な本革を使用した長財布です。',
  },
];

const resolvers: Resolvers = {
  Query: {
    users() {
      return [{ name: 'Nextjs' }, { name: 'Nuxtjs' }, { name: 'Sveltekit' }];
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

export const GET = (req: NextRequest) => handler(req);
export const POST = (req: NextRequest) => handler(req);
