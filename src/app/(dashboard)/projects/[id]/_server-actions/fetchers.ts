import { cacheOptions, graphQLFetchSdk } from '@/lib/graphql';

export async function getProject(projectId: string) {
  try {
    const res = await graphQLFetchSdk.getProject(
      {
        id: projectId,
      },
      cacheOptions.noCache(),
    );

    return res.project;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}
