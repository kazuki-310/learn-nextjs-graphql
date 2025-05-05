import { graphQLFetchSdk } from '@/lib/graphql';

export async function getUsers() {
  const res = await graphQLFetchSdk.getUsers(undefined, {
    tags: ['users'],
  });

  return res.users;
}
