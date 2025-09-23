import { gql } from 'graphql-tag';

export const CREATE_PROJECT = gql`
mutation createProject($input: ProjectInput!) {
  createProject(input: $input) {
    id
    title
    description
    createdAt
    updatedAt
    price
  }
}
`;
