import { cacheOptions, graphQLFetchSdk } from '@/lib/graphql';

export async function getUser(id: string) {
  const { user } = await graphQLFetchSdk.getUser({ id }, cacheOptions.noCache());
  return user;
}
