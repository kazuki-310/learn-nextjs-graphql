'use server';

import { graphQLFetchSdk } from '@/lib/graphql';
import { ProjectInput } from '@/lib/graphql/__generated__/resolvers-types';
import { revalidateTag } from 'next/cache';

export async function updateProject(id: string, data: ProjectInput) {
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
}

export async function deleteProject(id: string) {
  try {
    const res = await graphQLFetchSdk.deleteProject({
      id,
    });

    revalidateTag('projects');

    return res.deleteProject;
  } catch (error) {
    console.error('GraphQL error:', error);
    throw new Error('商品の削除に失敗しました');
  }
}
