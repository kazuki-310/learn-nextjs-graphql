import { cache } from 'react';
import { TAGS } from '@/lib/constants';
import { graphQLFetchSdk, cacheOptions } from '@/lib/graphql';

export const getDashboardStats = cache(async () => {
  const res = await graphQLFetchSdk.getDashboardStats({}, cacheOptions.noCache());
  return res.dashboardStats;
});
