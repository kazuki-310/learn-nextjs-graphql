import { cache } from 'react';
import { TAGS } from '@/lib/constants';
import { graphQLFetchSdk, cacheOptions } from '@/lib/graphql';

export const runtime = 'edge';

export const getDashboardStats = cache(async () => {
  const res = await graphQLFetchSdk.getDashboardStats(
    {},
    cacheOptions.static([TAGS.users, TAGS.projects]),
  );
  return res.dashboardStats;
});
