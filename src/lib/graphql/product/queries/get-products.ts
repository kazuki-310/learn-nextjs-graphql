import { graphQLFetchSdk } from '../..';

export async function getProducts() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const res = await graphQLFetchSdk.getProducts(undefined, {
    tags: ['products'],
  });

  console.log('Data fetch completed after 2 seconds.');

  return res;
}
