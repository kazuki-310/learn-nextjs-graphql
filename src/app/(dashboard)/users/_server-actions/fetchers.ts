import { graphQLFetchSdk } from '@/lib/graphql';
import { cache } from 'react';

export const getUsers = cache(async () => {
  try {
    const res = await graphQLFetchSdk.getUsers(undefined, {
      revalidate: false,
      tags: ['users'],
    });

    return res.users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
});
