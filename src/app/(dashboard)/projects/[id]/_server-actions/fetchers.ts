import { graphQLFetchSdk } from '@/lib/graphql';

export async function getProject(projectId: string) {
  const res = await graphQLFetchSdk.getProject(
    {
      id: projectId,
    },
    {
      cache: 'no-store',
    },
  );

  return res.project;
}
