import { TAGS } from '@/lib/constants';
import { cacheOptions, graphQLFetchSdk } from '@/lib/graphql';
import { cache } from 'react';

export const getProjects = cache(async () => {
  const res = await graphQLFetchSdk.getProjects({}, cacheOptions.noCache());
  return res.projects;
});

export const fetchCategories = cache(async () => {
  const res = await graphQLFetchSdk.getCategories({}, cacheOptions.noCache());
  return res.categories;
});

export const fetchLocations = cache(async () => {
  const res = await graphQLFetchSdk.getLocations({}, cacheOptions.noCache());
  return res.locations;
});
