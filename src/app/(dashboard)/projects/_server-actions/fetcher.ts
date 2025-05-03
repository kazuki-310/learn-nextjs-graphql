import { graphQLFetchSdk } from '@/lib/graphql';

export async function getProducts() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const res = await graphQLFetchSdk.getProducts(undefined, {
    tags: ['products'],
  });

  console.log('Data fetch completed after 1 seconds.');

  return res.products;
}
