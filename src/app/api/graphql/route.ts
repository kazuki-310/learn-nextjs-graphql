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
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role as Role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
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
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role as Role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
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
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const [totalProjects, totalUsers, totalRevenue, avgPrice, maxPrice, recentProjects] =
        await Promise.all([
          prisma.projects.count(),
          prisma.users.count(),
          prisma.projects.aggregate({ _sum: { price: true } }),
          prisma.projects.aggregate({ _avg: { price: true } }),
          prisma.projects.aggregate({ _max: { price: true } }),
          prisma.projects.count({
            where: { createdAt: { gte: thirtyDaysAgo } },
          }),
        ]);

      return {
        totalProjects,
        totalUsers,
        totalRevenue: totalRevenue._sum.price || 0,
        averageProjectPrice: avgPrice._avg.price || 0,
        maxProjectPrice: maxPrice._max.price || 0,
        recentProjectsCount: recentProjects,
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
          price: input.price ?? 0,
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
          password: input.password,
          role: input.role,
        },
      });

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role as Role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
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
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role as Role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    },
    async deleteUser(_, { id }) {
      const user = await prisma.users.delete({
        where: { id },
      });

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role as Role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
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
