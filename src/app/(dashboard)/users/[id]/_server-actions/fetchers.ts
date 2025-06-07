import { graphQLFetchSdk } from '@/lib/graphql';

export async function getUser(id: string) {
  const { user } = await graphQLFetchSdk.getUser({ id });
  return user;
}