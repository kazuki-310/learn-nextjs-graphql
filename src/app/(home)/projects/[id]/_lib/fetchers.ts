import { cacheOptions, graphQLFetchSdk } from '@/lib/graphql';

export const runtime = 'edge';

export async function getProject(projectId: string) {
  const res = await graphQLFetchSdk.getProject(
    {
      id: projectId,
    },
    cacheOptions.noCache(),
  );
  return res.project;
}
