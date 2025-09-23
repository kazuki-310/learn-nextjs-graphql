import { gql } from 'graphql-tag';

export const GET_DASHBOARD_STATS = gql`
query getDashboardStats {
  dashboardStats {
    totalProjects
    totalUsers
    totalRevenue
    averageProjectPrice
    maxProjectPrice
    recentProjectsCount
  }
}
`;
