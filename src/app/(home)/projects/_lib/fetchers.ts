import { cacheOptions, graphQLFetchSdk } from '@/lib/graphql';
import { cache } from 'react';

export const runtime = 'edge';

export const getProjects = cache(async () => {
  const res = await graphQLFetchSdk.getProjects({}, cacheOptions.noCache());
  return res.projects;
});
