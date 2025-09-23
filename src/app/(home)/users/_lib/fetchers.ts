import { graphQLFetchSdk, cacheOptions } from '@/lib/graphql';
import { cache } from 'react';

export const runtime = 'edge';

export const getUsers = cache(async () => {
  try {
    const res = await graphQLFetchSdk.getUsers(undefined, cacheOptions.static(['users']));

    return res.users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
});
