import { gql } from 'graphql-tag';

export const UPDATE_PROJECT = gql`
mutation updateProject($id: ID!, $input: ProjectInput!) {
  updateProject(id: $id, input: $input) {
    id
    title
    description
    createdAt
    updatedAt
    price
  }
}
`;
