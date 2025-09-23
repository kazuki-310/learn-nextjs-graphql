import { gql } from 'graphql-tag';

export const GET_USER = gql`
query getUser($id: ID!) {
  user(id: $id) {
    id
    name
    email
    role
    createdAt
    updatedAt
  }
}
`;
