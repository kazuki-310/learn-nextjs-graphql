import { gql } from 'graphql-tag';

export const typeDefs = gql`
  schema {
    query: Query
    mutation: Mutation
  }

  type User {
    name: String
  }

  type Product {
    id: ID!
    title: String!
    description: String
  }

  input ProductInput {
    title: String!
    description: String
  }

  type Query {
    users: [User]
    products: [Product]
  }

  type Mutation {
    createProduct(input: ProductInput!): Product!
  }
`;
