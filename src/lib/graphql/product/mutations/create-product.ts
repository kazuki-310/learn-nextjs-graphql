import { revalidateTag } from 'next/cache';
import { graphQLFetchSdk } from '../..';
import { ProductInput } from '../../__generated__/resolvers-types';

export const createProduct = async (data: ProductInput) => {
  const res = await graphQLFetchSdk.createProduct({ input: data });

  revalidateTag('products');
  return res.createProduct;
};
