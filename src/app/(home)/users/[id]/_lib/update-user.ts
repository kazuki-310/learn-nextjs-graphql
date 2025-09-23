import { gql } from 'graphql-tag';

export const UPDATE_USER = gql`
mutation updateUser($id: ID!, $input: UpdateUserInput!) {
  updateUser(id: $id, input: $input) {
    id
    name
    email
    role
    createdAt
    updatedAt
  }
}
`;
