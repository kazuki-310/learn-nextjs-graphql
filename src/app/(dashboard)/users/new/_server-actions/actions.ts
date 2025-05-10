'use server';

import { graphQLFetchSdk } from '@/lib/graphql';
import { UserInput } from '@/lib/graphql/__generated__/resolvers-types';
import { revalidateTag } from 'next/cache';

export async function createUser(data: UserInput) {
  try {
    const res = await graphQLFetchSdk.createUser({ input: data });

    revalidateTag('users');

    return res.createUser;
  } catch (error) {
    console.error('GraphQL error:', error);

    throw new Error('ユーザー作成に失敗しました');
  }
}
