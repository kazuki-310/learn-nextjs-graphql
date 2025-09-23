'use server';

import { graphQLFetchSdk } from '@/lib/graphql';
import { ProjectInput } from '@/lib/graphql/__generated__/resolvers-types';
import { withServerAction } from '@/lib/utils/server-action-wrapper';

export const createProject = withServerAction(
  async (data: ProjectInput) => {
    const res = await graphQLFetchSdk.createProject({ input: data });
    return res.createProject;
  },
  {
    revalidateTag: 'projects',
    errorMessage: '商品の作成に失敗しました',
  }
);
