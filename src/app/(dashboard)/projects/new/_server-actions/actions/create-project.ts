'use server';

import { graphQLFetchSdk } from '@/lib/graphql';
import { ProjectInput } from '@/lib/graphql/__generated__/resolvers-types';
import { revalidateTag } from 'next/cache';

export const createProject = async (data: ProjectInput) => {
  try {
    const res = await graphQLFetchSdk.createProject({ input: data });

    revalidateTag('projects');

    return res.createProject;
  } catch (error) {
    console.error('GraphQL error:', error);
    throw new Error('商品の作成に失敗しました');
  }
};
