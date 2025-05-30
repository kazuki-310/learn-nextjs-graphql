import { graphQLFetchSdk } from '@/lib/graphql';
import { cache } from 'react';

export const getUsers = cache(async () => {
  const res = await graphQLFetchSdk.getUsers(undefined, {
    revalidate: false,
    tags: ['users'],
  });

  return res.users;
});
