import { graphQLFetchSdk } from '@/lib/graphql';

export async function getUsers() {
  const res = await graphQLFetchSdk.getUsers(undefined, {
    revalidate: false,
    tags: ['users'],
  });

  return res.users;
}
