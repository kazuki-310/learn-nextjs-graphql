import { graphQLFetchSdk } from '@/lib/graphql';
import { cache } from 'react';

export const getUsers = cache(async () => {
  const res = await graphQLFetchSdk.getUsers(undefined, {
    cache: 'force-cache',
    revalidate: false,
  });

  return res.users;
});
