'use server';

import { graphQLFetchSdk } from '@/lib/graphql';
import { UserInput } from '@/lib/graphql/__generated__/resolvers-types';
import { withServerAction } from '@/lib/utils/server-action-wrapper';

export const updateUser = withServerAction(
  async (id: string, data: UserInput) => {
    const res = await graphQLFetchSdk.updateUser({
      id,
      input: data,
    });
    return res.updateUser;
  },
  {
    revalidateTag: 'users',
    errorMessage: 'ユーザーの更新に失敗しました',
  }
);

export const deleteUser = withServerAction(
  async (id: string) => {
    const res = await graphQLFetchSdk.deleteUser({
      id,
    });
    return res.deleteUser;
  },
  {
    revalidateTag: 'users',
    errorMessage: 'ユーザーの削除に失敗しました',
  }
);