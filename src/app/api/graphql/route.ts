import { Resolvers, Role, ProjectStatus, Priority, ActivityType } from '@/lib/graphql/__generated__/resolvers-types';
import { prisma } from '@/lib/prisma';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { readFileSync } from 'fs';
import { join } from 'path';

const typeDefs = readFileSync(join(process.cwd(), 'src/lib/graphql/schema.gql'), 'utf-8');

const resolvers: Resolvers = {
  Query: {
    async users() {
      const prismaUsers = await prisma.users.findMany({
        orderBy: { createdAt: 'desc' },
      });

      return prismaUsers.map((user) => ({
        ...user,
        role: user.role as Role,
        updatedAt: user.createdAt, // Fallback to createdAt
        isActive: true, // Default value
        lastLoginAt: null, // Default value
        projects: [],
        activities: [],
      }));
    },
    async user(_, { id }) {
      const prismaUser = await prisma.users.findUnique({
        where: { id },
      });

      if (!prismaUser) {
        return null;
      }

      return {
        ...prismaUser,
        role: prismaUser.role as Role,
        updatedAt: prismaUser.createdAt, // Fallback to createdAt
        isActive: true, // Default value
        lastLoginAt: null, // Default value
        projects: [],
        activities: [],
      };
    },
    async projects() {
      const projects = await prisma.projects.findMany({
        orderBy: { updatedAt: 'desc' },
      });

      return projects.map((project) => ({
        ...project,
        status: 'active' as ProjectStatus, // Default value
        priority: 'medium' as Priority, // Default value
        tags: [], // Default empty array
        progress: 0, // Default value
        category: null, // Default value
        startDate: null, // Default value
        endDate: null, // Default value
        completedAt: null, // Default value
        ownerId: null, // Default value
        owner: null,
        activities: [],
      }));
    },
    async project(_, { id }) {
      const project = await prisma.projects.findUnique({
        where: { id },
      });

      if (!project) {
        return null;
      }

      return {
        ...project,
        status: 'active' as ProjectStatus, // Default value
        priority: 'medium' as Priority, // Default value
        tags: [], // Default empty array
        progress: 0, // Default value
        category: null, // Default value
        startDate: null, // Default value
        endDate: null, // Default value
        completedAt: null, // Default value
        ownerId: null, // Default value
        owner: null,
        activities: [],
      };
    },
    async dashboardStats() {
      const [totalProjects, totalUsers, totalRevenue] = await Promise.all([
        prisma.projects.count(),
        prisma.users.count(),
        prisma.projects.aggregate({ _sum: { price: true } }),
      ]);

      return {
        totalProjects,
        activeProjects: Math.floor(totalProjects * 0.6), // Mock data
        completedProjects: Math.floor(totalProjects * 0.3), // Mock data
        totalUsers,
        activeUsers: Math.floor(totalUsers * 0.8), // Mock data
        totalRevenue: totalRevenue._sum.price || 0,
      };
    },
    async projectStatusCounts() {
      const total = await prisma.projects.count();
      return [
        { status: 'active' as ProjectStatus, count: Math.floor(total * 0.6) },
        { status: 'completed' as ProjectStatus, count: Math.floor(total * 0.3) },
        { status: 'draft' as ProjectStatus, count: Math.floor(total * 0.1) },
      ];
    },
    async monthlyRevenue() {
      // Mock data for now
      return [
        { month: '2024-01', revenue: 150000 },
        { month: '2024-02', revenue: 200000 },
        { month: '2024-03', revenue: 180000 },
        { month: '2024-04', revenue: 250000 },
        { month: '2024-05', revenue: 300000 },
        { month: '2024-06', revenue: 280000 },
      ];
    },
    async userProjectCounts() {
      const users = await prisma.users.findMany();
      return users.map((user) => ({
        user: {
          ...user,
          role: user.role as Role,
          updatedAt: user.createdAt, // Fallback to createdAt
          isActive: true, // Default value
          lastLoginAt: null, // Default value
          projects: [],
          activities: [],
        },
        projectCount: Math.floor(Math.random() * 5) + 1, // Mock data
      }));
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

      return {
        ...project,
        status: 'active' as ProjectStatus, // Default value
        priority: 'medium' as Priority, // Default value
        tags: [], // Default empty array
        progress: 0, // Default value
        category: null, // Default value
        startDate: null, // Default value
        endDate: null, // Default value
        completedAt: null, // Default value
        ownerId: null, // Default value
        owner: null,
        activities: [],
      };
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

      return {
        ...project,
        status: 'active' as ProjectStatus, // Default value
        priority: 'medium' as Priority, // Default value
        tags: [], // Default empty array
        progress: 0, // Default value
        category: null, // Default value
        startDate: null, // Default value
        endDate: null, // Default value
        completedAt: null, // Default value
        ownerId: null, // Default value
        owner: null,
        activities: [],
      };
    },
    async deleteProject(_, { id }) {
      const project = await prisma.projects.findUnique({
        where: { id },
      });

      if (!project) {
        throw new Error(`プロジェクトが見つかりません: ${id}`);
      }

      const deletedProject = await prisma.projects.delete({
        where: { id },
      });

      return {
        ...deletedProject,
        status: 'active' as ProjectStatus, // Default value
        priority: 'medium' as Priority, // Default value
        tags: [], // Default empty array
        progress: 0, // Default value
        category: null, // Default value
        startDate: null, // Default value
        endDate: null, // Default value
        completedAt: null, // Default value
        ownerId: null, // Default value
        owner: null,
        activities: [],
      };
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
        updatedAt: user.createdAt, // Fallback to createdAt
        isActive: true, // Default value
        lastLoginAt: null, // Default value
        projects: [],
        activities: [],
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
        updatedAt: user.createdAt, // Fallback to createdAt
        isActive: true, // Default value
        lastLoginAt: null, // Default value
        projects: [],
        activities: [],
      };
    },
    async deleteUser(_, { id }) {
      const user = await prisma.users.findUnique({
        where: { id },
      });

      if (!user) {
        throw new Error(`ユーザーが見つかりません: ${id}`);
      }

      const deletedUser = await prisma.users.delete({
        where: { id },
      });

      return {
        ...deletedUser,
        role: deletedUser.role as Role,
        updatedAt: deletedUser.createdAt, // Fallback to createdAt
        isActive: true, // Default value
        lastLoginAt: null, // Default value
        projects: [],
        activities: [],
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
