import { print } from 'graphql';
import { getSdk, Requester } from './__generated__';

const URL = process.env.NEXT_PUBLIC_API_URL;
const endpoint = `${URL}/api/graphql`;

type RequestOptions = {
  revalidate: false | number;
  tags?: string[];
};

const customGraphQLRequester: Requester<RequestOptions> = async (doc, variables, options?) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const revalidate = options?.revalidate ?? 0;
  const tags = options?.tags ?? [];
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: print(doc),
        variables,
      }),
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
