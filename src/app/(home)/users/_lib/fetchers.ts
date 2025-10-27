import { TAGS } from '@/lib/constants';
import { graphQLFetchSdk, cacheOptions } from '@/lib/graphql';
import { cache } from 'react';

export const getUsers = cache(async () => {
  const res = await graphQLFetchSdk.getUsers({}, cacheOptions.noCache());
  return res.users;
});
