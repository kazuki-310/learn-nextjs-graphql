'use server';

import { revalidateTag } from 'next/cache';
import { graphQLFetchSdk } from '@/lib/graphql';
import { UpdateUserInput } from '@/lib/graphql/__generated__/resolvers-types';

export async function updateUser(id: string, data: UpdateUserInput) {
  try {
    const res = await graphQLFetchSdk.updateUser({
      id,
      input: data,
    });
    revalidateTag('users');
    return res.updateUser;
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(id: string) {
  try {
    const res = await graphQLFetchSdk.deleteUser({
      id,
    });
    revalidateTag('users');
    return res.deleteUser;
  } catch (error) {
    throw error;
  }
}
