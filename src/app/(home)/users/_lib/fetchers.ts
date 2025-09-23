import { TAGS } from '@/lib/constants';
import { graphQLFetchSdk, cacheOptions } from '@/lib/graphql';
import { cache } from 'react';

export const runtime = 'edge';

export const getUsers = cache(async () => {
  const res = await graphQLFetchSdk.getUsers({}, cacheOptions.static([TAGS.users]));
  return res.users;
});
