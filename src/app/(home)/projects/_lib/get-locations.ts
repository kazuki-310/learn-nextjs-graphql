import { gql } from 'graphql-tag';

export const GET_LOCATIONS = gql`
  query getLocations {
    locations {
      id
      name
    }
  }
`;