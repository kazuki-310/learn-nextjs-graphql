'use server';

import { graphQLFetchSdk } from '@/lib/graphql';
import { ProjectInput } from '@/lib/graphql/__generated__/resolvers-types';
import { revalidateTag } from 'next/cache';

export const updateProject = async (id: string, data: ProjectInput) => {
  try {
    const res = await graphQLFetchSdk.updateProject({
      id,
      input: data,
    });

    revalidateTag('projects');

    return res.updateProject;
  } catch (error) {
    console.error('GraphQL error:', error);
    throw new Error('商品の更新に失敗しました');
  }
};
