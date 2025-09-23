import { gql } from 'graphql-tag';

export const DELETE_USER_MUTATION = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      name
      email
      role
      createdAt
      updatedAt
    }
  }
`;