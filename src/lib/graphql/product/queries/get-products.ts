import { graphQLFetchSdk } from '../..';

export async function getProducts() {
  'use cache';
  console.log('Fetching products data...');
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const res = await graphQLFetchSdk.getProducts(undefined, {
    cache: 'force-cache',
    // revalidate: 3600,
    tags: ['products'],
  });

  console.log('Data fetch completed after 2 seconds.');

  return res;
}
