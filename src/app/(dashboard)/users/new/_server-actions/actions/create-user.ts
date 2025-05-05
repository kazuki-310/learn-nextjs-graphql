'use server';

import { graphQLFetchSdk } from '@/lib/graphql';
import { Role, UserInput } from '@/lib/graphql/__generated__/resolvers-types';
import { Role as PrismaRole } from '@prisma/client';
import { revalidateTag } from 'next/cache';

export const createUser = async (data: { name: string; email: string; role: PrismaRole }) => {
  try {
    const input: UserInput = {
      name: data.name,
      email: data.email,
      role: data.role as Role,
    };

    const res = await graphQLFetchSdk.createUser({ input });

    revalidateTag('users');

    return res.createUser;
  } catch (error) {
    console.error('GraphQL error:', error);
    throw new Error('ユーザー作成に失敗しました');
  }
};
