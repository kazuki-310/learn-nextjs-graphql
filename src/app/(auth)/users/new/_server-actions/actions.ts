'use server';

import { graphQLFetchSdk } from '@/lib/graphql';
import { CreateUserInput } from '@/lib/graphql/__generated__/resolvers-types';
import { withServerAction } from '@/lib/utils/server-action-wrapper';

export const createUser = withServerAction(
  async (data: CreateUserInput) => {
    const res = await graphQLFetchSdk.createUser({ input: data });
    return res.createUser;
  },
  {
    revalidateTag: 'users',
    errorMessage: 'ユーザー作成に失敗しました',
  }
);
