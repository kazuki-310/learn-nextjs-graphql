import { Resolvers, Role } from '@/lib/graphql/__generated__/resolvers-types';
import { prisma } from '@/lib/prisma';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { readFileSync } from 'fs';
import { join } from 'path';

const typeDefs = readFileSync(join(process.cwd(), 'src/lib/graphql/schema.gql'), 'utf-8');

const resolvers: Resolvers = {
  Query: {
    async users() {
      const prismaUsers = await prisma.users.findMany();

      return prismaUsers.map((user) => ({
        ...user,
        role: user.role as Role,
      }));
    },
    async projects() {
      return await prisma.projects.findMany();
    },
  },
  Mutation: {
    async createProject(_, { input }) {
      const project = await prisma.projects.create({
        data: {
          title: input.title,
          description: input.description,
          price: input.price ?? 0,
        },
      });

      return project;
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
