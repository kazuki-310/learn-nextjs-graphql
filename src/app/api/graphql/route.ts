import { Resolvers, Role } from '@/lib/graphql/__generated__/resolvers-types';
import { prisma } from '@/lib/prisma';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { readFileSync } from 'fs';
import { join } from 'path';
import { hashPassword } from '@/lib/password';
import { NextRequest } from 'next/server';
import { getCurrentUser } from '@/lib/auth';

const typeDefs = readFileSync(join(process.cwd(), 'src/lib/graphql/schema.gql'), 'utf-8');

interface GraphQLContext {
  userId?: string;
}

async function createContext(req: NextRequest): Promise<GraphQLContext> {
  const userIdFromHeader = req.headers.get('x-user-id');
  if (userIdFromHeader) {
    return { userId: userIdFromHeader };
  }

  try {
    const user = await getCurrentUser();
    return { userId: user?.id };
  } catch {
    return {};
  }
}

function requireAuthWithContext(context: GraphQLContext) {
  if (!context.userId) {
    throw new Error('認証が必要です');
  }
  return context.userId;
}

const resolvers: Resolvers = {
  Query: {
    async users(_, __, context: GraphQLContext) {
      requireAuthWithContext(context);

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
    async user(_, { id }, context: GraphQLContext) {
      requireAuthWithContext(context);

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
    async projects(_, __, context: GraphQLContext) {
      requireAuthWithContext(context);

      const projects = await prisma.projects.findMany({
        orderBy: { createdAt: 'desc' },
      });

      return projects;
    },
    async project(_, { id }, context: GraphQLContext) {
      requireAuthWithContext(context);

      const project = await prisma.projects.findUnique({
        where: { id },
      });

      return project;
    },
    async dashboardStats(_, __, context: GraphQLContext) {
      requireAuthWithContext(context);

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
    async createProject(_, { input }, context: GraphQLContext) {
      requireAuthWithContext(context);

      const project = await prisma.projects.create({
        data: {
          title: input.title,
          description: input.description,
          price: input.price ?? 0,
        },
      });

      return project;
    },
    async updateProject(_, { id, input }, context: GraphQLContext) {
      requireAuthWithContext(context);

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
    async deleteProject(_, { id }, context: GraphQLContext) {
      requireAuthWithContext(context);

      const project = await prisma.projects.delete({
        where: { id },
      });

      return project;
    },
    async createUser(_, { input }, context: GraphQLContext) {
      requireAuthWithContext(context);

      const hashedPassword = await hashPassword(input.password);

      const user = await prisma.users.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashedPassword,
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
    async updateUser(_, { id, input }, context: GraphQLContext) {
      requireAuthWithContext(context);

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
    async deleteUser(_, { id }, context: GraphQLContext) {
      requireAuthWithContext(context);

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

const server = new ApolloServer<GraphQLContext>({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async (req: NextRequest) => createContext(req),
});

export async function GET(request: Request) {
  return handler(request);
}

export async function POST(request: Request) {
  return handler(request);
}
