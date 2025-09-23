'use server';

import { revalidateTag } from 'next/cache';
import { TAGS } from '@/lib/constants';
import { graphQLFetchSdk } from '@/lib/graphql';
import { CreateUserInput } from '@/lib/graphql/__generated__/resolvers-types';

export async function createUser(data: CreateUserInput) {
  try {
    const res = await graphQLFetchSdk.createUser({ input: data });
    revalidateTag(TAGS.users);
    return res.createUser;
  } catch (error) {
    throw error;
  }
}
