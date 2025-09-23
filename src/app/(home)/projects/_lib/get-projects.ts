import { gql } from 'graphql-tag';

export const GET_PROJECTS = gql`
  query getProjects {
    projects {
      id
      title
      description
      createdAt
      updatedAt
      price
    }
  }
`;
