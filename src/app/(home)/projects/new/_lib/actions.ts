'use server';

import { revalidateTag } from 'next/cache';
import { TAGS } from '@/lib/constants';
import { graphQLFetchSdk } from '@/lib/graphql';
import { ProjectInput } from '@/lib/graphql/__generated__/resolvers-types';

export async function createProject(data: ProjectInput) {
  try {
    const res = await graphQLFetchSdk.createProject({ input: data });
    revalidateTag(TAGS.projects);
    return res.createProject;
  } catch (error) {
    throw error;
  }
}
