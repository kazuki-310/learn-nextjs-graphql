import { cache } from 'react';
import { graphQLFetchSdk } from '@/lib/graphql';

export const getDashboardStats = cache(async () => {
  try {
    const res = await graphQLFetchSdk.getDashboardStats(undefined, {
      revalidate: false,
      tags: ['users', 'projects'],
    });

    return res.dashboardStats;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
});

