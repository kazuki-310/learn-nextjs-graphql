import { cacheOptions, graphQLFetchSdk } from '@/lib/graphql';

export async function getUser(id: string) {
  try {
    const { user } = await graphQLFetchSdk.getUser({ id }, cacheOptions.noCache());
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}
