import { print } from 'graphql';

import { getSdk, Requester } from './__generated__';

const URL = process.env.NEXT_PUBLIC_API_URL as string;
const endpoint = `${URL}/api/graphql`;

type RequestOptions = {
  cache?: 'default' | 'no-store' | 'force-cache';
  revalidate?: false | number;
  tags?: string[];
};

const customGraphQLRequester: Requester<RequestOptions> = async (doc, variables, options?) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const revalidate = options?.revalidate ?? false;
  const tags = options?.tags ?? [];
  const cache = options?.cache ?? 'force-cache';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: print(doc),
        variables,
      }),
      cache,
      next: {
        revalidate,
        tags,
      },
    });

    if (!response.ok) {
      throw new Error(`GraphQL Error: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()).data;
    return data;
  } catch (error) {
    console.error('Error in GraphQL request:', error);
  }
};

export const graphQLFetchSdk = getSdk(customGraphQLRequester);
