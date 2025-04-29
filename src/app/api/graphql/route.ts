import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Resolvers } from '../../../../apollo/__generated__/server/resolvers-types';

const typeDefs = readFileSync(join(process.cwd(), 'apollo/documents/schema.gql'), 'utf-8');

const resolvers: Resolvers = {
  Query: {
    users() {
      return [{ name: 'Nextjs' }, { name: 'Nuxtjs' }, { name: 'Sveltekit' }];
    },
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
