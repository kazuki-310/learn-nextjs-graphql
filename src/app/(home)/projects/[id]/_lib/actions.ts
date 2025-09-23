'use server';

import { revalidateTag } from 'next/cache';
import { TAGS } from '@/lib/constants';
import { graphQLFetchSdk } from '@/lib/graphql';
import { ProjectInput } from '@/lib/graphql/__generated__/resolvers-types';

export async function updateProject(id: string, data: ProjectInput) {
  try {
    const res = await graphQLFetchSdk.updateProject({
      id,
      input: data,
    });
    revalidateTag(TAGS.projects);
    return res.updateProject;
  } catch (error) {
    throw error;
  }
}

export async function deleteProject(id: string) {
  try {
    const res = await graphQLFetchSdk.deleteProject({
      id,
    });
    revalidateTag(TAGS.projects);
    return res.deleteProject;
  } catch (error) {
    throw error;
  }
}
