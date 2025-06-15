import { graphQLFetchSdk, cacheOptions } from '@/lib/graphql';
import { cache } from 'react';

export const runtime = 'edge';

export const getProjects = cache(async () => {
  try {
    const res = await graphQLFetchSdk.getProjects(undefined, cacheOptions.static(['projects']));

    return res.projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
});
