import { gql } from 'graphql-tag';

export const DELETE_PROJECT = gql`
mutation deleteProject($id: ID!) {
  deleteProject(id: $id) {
    id
    title
    description
    createdAt
    updatedAt
    price
  }
}
`;
