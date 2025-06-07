'use server';

import { graphQLFetchSdk } from '@/lib/graphql';
import { ProjectInput } from '@/lib/graphql/__generated__/resolvers-types';
import { withServerAction } from '@/lib/utils/server-action-wrapper';

export const updateProject = withServerAction(
  async (id: string, data: ProjectInput) => {
    const res = await graphQLFetchSdk.updateProject({
      id,
      input: data,
    });
    return res.updateProject;
  },
  {
    revalidateTag: 'projects',
    errorMessage: '商品の更新に失敗しました',
  }
);

export const deleteProject = withServerAction(
  async (id: string) => {
    const res = await graphQLFetchSdk.deleteProject({
      id,
    });
    return res.deleteProject;
  },
  {
    revalidateTag: 'projects',
    errorMessage: '商品の削除に失敗しました',
  }
);
