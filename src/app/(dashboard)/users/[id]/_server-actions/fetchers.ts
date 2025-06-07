import { graphQLFetchSdk } from '@/lib/graphql';

export async function getUser(id: string) {
  try {
    const { user } = await graphQLFetchSdk.getUser(
      { id },
      {
        cache: 'no-store',
      },
    );
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}
