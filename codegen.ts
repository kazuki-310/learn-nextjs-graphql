import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,

  schema: 'src/lib/graphql/schema.gql',
  documents: ['src/**/*.ts'],
  generates: {
    'src/lib/graphql/__generated__/resolvers-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
    },
    'src/lib/graphql/__generated__/index.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-generic-sdk'],
    },
  },
  ignoreNoDocuments: true,
};

export default config;
