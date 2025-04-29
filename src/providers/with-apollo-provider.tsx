'use client';

import { ApolloProvider } from '@apollo/client';
import { client } from '../../apollo/client';

export function WithApolloProvider({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
