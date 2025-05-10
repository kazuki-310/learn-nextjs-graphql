import { graphQLFetchSdk } from '@/lib/graphql';
import { cache } from 'react';

export const getProjects = cache(async () => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const res = await graphQLFetchSdk.getProjects(undefined, {
    revalidate: false,
    tags: ['projects'],
  });

  return res.projects;
});
