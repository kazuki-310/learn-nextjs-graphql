import { graphQLFetchSdk } from '@/lib/graphql';
import { ProductInput } from '@/lib/graphql/__generated__';
import { revalidateTag } from 'next/cache';

export const createProduct = async (data: ProductInput) => {
  const res = await graphQLFetchSdk.createProduct({ input: data });

  revalidateTag('products');
  return res.createProduct;
};
