import { gql } from 'graphql-tag';

export const GET_PROJECT = gql`
query getProject($id: ID!) {
  project(id: $id) {
    id
    title
    description
    createdAt
    updatedAt
    price
  }
}
`;
