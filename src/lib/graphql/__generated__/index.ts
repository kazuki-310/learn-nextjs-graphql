import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createProduct: Product;
};


export type MutationCreateProductArgs = {
  input: ProductInput;
};

export type Product = {
  __typename?: 'Product';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  price?: Maybe<Scalars['Int']['output']>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ProductInput = {
  createdAt: Scalars['DateTime']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
  updatedAt: Scalars['DateTime']['input'];
};

export type Query = {
  __typename?: 'Query';
  products: Array<Product>;
  users: Array<User>;
};

export type User = {
  __typename?: 'User';
  company: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastLogin: Scalars['String']['output'];
  name: Scalars['String']['output'];
  role: Scalars['String']['output'];
};

export type CreateProductMutationVariables = Exact<{
  input: ProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', id: string, title: string, description?: string | null } };

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: string, title: string, description?: string | null, createdAt: any, updatedAt: any, tags?: Array<string> | null, price?: number | null }> };


export const CreateProductDocument = gql`
    mutation createProduct($input: ProductInput!) {
  createProduct(input: $input) {
    id
    title
    description
  }
}
    `;
export const GetProductsDocument = gql`
    query getProducts {
  products {
    id
    title
    description
    createdAt
    updatedAt
    tags
    price
  }
}
    `;
export type Requester<C = {}> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C>(requester: Requester<C>) {
  return {
    createProduct(variables: CreateProductMutationVariables, options?: C): Promise<CreateProductMutation> {
      return requester<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, variables, options) as Promise<CreateProductMutation>;
    },
    getProducts(variables?: GetProductsQueryVariables, options?: C): Promise<GetProductsQuery> {
      return requester<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, variables, options) as Promise<GetProductsQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;