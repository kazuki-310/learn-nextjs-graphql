import { TAGS } from '@/lib/constants';
import { cacheOptions, graphQLFetchSdk } from '@/lib/graphql';
import { cache } from 'react';

export const runtime = 'edge';

export const getProjects = cache(async () => {
  const res = await graphQLFetchSdk.getProjects({}, cacheOptions.static([TAGS.projects]));
  return res.projects;
});

export const fetchCategories = cache(async () => {
  const res = await graphQLFetchSdk.getCategories({}, cacheOptions.static());
  return res.categories;
});

export const fetchLocations = cache(async () => {
  const res = await graphQLFetchSdk.getLocations({}, cacheOptions.static());
  return res.locations;
});
