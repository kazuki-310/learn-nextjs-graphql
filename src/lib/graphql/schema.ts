import { gql } from 'graphql-tag';

export const typeDefs = gql`
  schema {
    query: Query
    mutation: Mutation
  }

  enum UserRole {
    ADMIN
    EDITOR
    VIEWER
  }

  type User {
    id: ID!
    name: String!
    email: String!
    role: UserRole!
    company: String!
    lastLogin: String!
  }

  type Product {
    id: ID!
    title: String!
    description: String
    createdAt: String!
    updatedAt: String!
    tags: [String]
    price: Int
  }

  input ProductInput {
    title: String!
    description: String
    createdAt: String!
    updatedAt: String!
    tags: [String]
    price: Int
  }

  type Query {
    users: [User!]!
    products: [Product!]!
  }

  type Mutation {
    createProduct(input: ProductInput!): Product!
  }
`;
