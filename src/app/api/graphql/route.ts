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
      const users = await prisma.users.findMany({
        orderBy: { createdAt: 'desc' },
      });

      return users.map((user) => ({
        ...user,
        role: user.role as Role,
      }));
    },
    async user(_, { id }) {
      const user = await prisma.users.findUnique({
        where: { id },
      });

      if (!user) {
        return null;
      }

      return {
        ...user,
        role: user.role as Role,
      };
    },
    async projects() {
      const projects = await prisma.projects.findMany({
        orderBy: { createdAt: 'desc' },
      });

      return projects;
    },
    async project(_, { id }) {
      const project = await prisma.projects.findUnique({
        where: { id },
      });

      return project;
    },
    async dashboardStats() {
      const [totalProjects, totalUsers, totalRevenue] = await Promise.all([
        prisma.projects.count(),
        prisma.users.count(),
        prisma.projects.aggregate({ _sum: { price: true } }),
      ]);

      return {
        totalProjects,
        totalUsers,
        totalRevenue: totalRevenue._sum.price || 0,
      };
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
    async updateProject(_, { id, input }) {
      const project = await prisma.projects.update({
        where: { id },
        data: {
          title: input.title,
          description: input.description,
          price: input.price,
        },
      });

      return project;
    },
    async deleteProject(_, { id }) {
      const project = await prisma.projects.delete({
        where: { id },
      });

      return project;
    },
    async createUser(_, { input }) {
      const user = await prisma.users.create({
        data: {
          name: input.name,
          email: input.email,
          role: input.role,
        },
      });

      return {
        ...user,
        role: user.role as Role,
      };
    },
    async updateUser(_, { id, input }) {
      const user = await prisma.users.update({
        where: { id },
        data: {
          name: input.name,
          email: input.email,
          role: input.role,
        },
      });

      return {
        ...user,
        role: user.role as Role,
      };
    },
    async deleteUser(_, { id }) {
      const user = await prisma.users.delete({
        where: { id },
      });

      return {
        ...user,
        role: user.role as Role,
      };
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