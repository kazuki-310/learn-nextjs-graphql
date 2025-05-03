'use server';

import { graphQLFetchSdk } from '@/lib/graphql';
import { ProductInput } from '@/lib/graphql/__generated__';
import { revalidateTag } from 'next/cache';

export const createProduct = async (data: ProductInput) => {
  try {
    const res = await graphQLFetchSdk.createProduct({ input: data });

    revalidateTag('products');

    return res.createProduct;
  } catch (error) {
    console.error('GraphQL error:', error);
    throw new Error('商品の作成に失敗しました');
  }
};
