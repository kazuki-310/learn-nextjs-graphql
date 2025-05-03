import { graphQLFetchSdk } from '@/lib/graphql';

export async function getProducts() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const res = await graphQLFetchSdk.getProducts(undefined, {
    tags: ['products'],
  });
  console.log('🚀 ~ getProducts ~ res:', res);

  console.log('Data fetch completed after 2 seconds.');

  return res.products;
}
