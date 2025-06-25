import { print } from 'graphql';

import { getSdk, Requester } from './__generated__';
import { env } from '@/env.mjs';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const URL = env.NEXT_PUBLIC_API_URL;
const endpoint = `${URL}/api/graphql`;

type RequestOptions = {
  cache?: RequestCache;
  revalidate?: false | number;
  tags?: string[];
};

export const cacheOptions = {
  static: (tags: string[]): RequestOptions => ({ revalidate: false, tags, cache: 'force-cache' }),
  revalidate: (seconds: number, tags: string[]): RequestOptions => ({
    revalidate: seconds,
    tags,
    cache: 'force-cache',
  }),
  noCache: (): RequestOptions => ({ cache: 'no-store' }),
};

const customGraphQLRequester: Requester<RequestOptions> = async (doc, variables, options?) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const session = await getServerSession(authOptions);
  if (session?.user?.id) {
    headers['x-user-id'] = session.user.id;
  }

  const revalidate = options?.revalidate;
  const tags = options?.tags ?? [];
  const cache = options?.cache;

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
      throw new Error(`GraphQL HTTP Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
      throw new Error(`GraphQL Error: ${result.errors.map((e: any) => e.message).join(', ')}`);
    }

    return result.data;
  } catch (error) {
    console.error('Error in GraphQL request:', error);
    throw error;
  }
};

export const graphQLFetchSdk = getSdk(customGraphQLRequester);
