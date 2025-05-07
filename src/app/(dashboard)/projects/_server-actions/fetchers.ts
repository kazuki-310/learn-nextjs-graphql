import { graphQLFetchSdk } from '@/lib/graphql';

export async function getProjects() {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const res = await graphQLFetchSdk.getProjects(undefined, {
    revalidate: false,
    tags: ['projects'],
  });

  return res.projects;
}
