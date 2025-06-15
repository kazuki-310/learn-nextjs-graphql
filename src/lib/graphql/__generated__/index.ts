import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: Role;
};

export type DashboardStats = {
  __typename?: 'DashboardStats';
  averageProjectPrice: Scalars['Float']['output'];
  maxProjectPrice: Scalars['Int']['output'];
  recentProjectsCount: Scalars['Int']['output'];
  totalProjects: Scalars['Int']['output'];
  totalRevenue: Scalars['Int']['output'];
  totalUsers: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject: Project;
  createUser: User;
  deleteProject: Project;
  deleteUser: User;
  updateProject: Project;
  updateUser: User;
};


export type MutationCreateProjectArgs = {
  input: ProjectInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateProjectArgs = {
  id: Scalars['ID']['input'];
  input: ProjectInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UpdateUserInput;
};

export type Project = {
  __typename?: 'Project';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  price: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ProjectInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  dashboardStats: DashboardStats;
  project?: Maybe<Project>;
  projects: Array<Project>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryProjectArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export enum Role {
  Admin = 'admin',
  Editor = 'editor',
  Viewer = 'viewer'
}

export type UpdateUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  role: Role;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  role: Role;
  updatedAt: Scalars['DateTime']['output'];
};

export type GetDashboardStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDashboardStatsQuery = { __typename?: 'Query', dashboardStats: { __typename?: 'DashboardStats', totalProjects: number, totalUsers: number, totalRevenue: number, averageProjectPrice: number, maxProjectPrice: number, recentProjectsCount: number } };

export type GetProjectQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProjectQuery = { __typename?: 'Query', project?: { __typename?: 'Project', id: string, title: string, description?: string | null, createdAt: any, updatedAt: any, price: number } | null };

export type UpdateProjectMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: ProjectInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject: { __typename?: 'Project', id: string, title: string, description?: string | null, createdAt: any, updatedAt: any, price: number } };

export type DeleteProjectMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject: { __typename?: 'Project', id: string, title: string, description?: string | null, createdAt: any, updatedAt: any, price: number } };

export type GetProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: string, title: string, description?: string | null, createdAt: any, updatedAt: any, price: number }> };

export type CreateProjectMutationVariables = Exact<{
  input: ProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string, title: string, description?: string | null, createdAt: any, updatedAt: any, price: number } };

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, name: string, email: string, role: Role, createdAt: any, updatedAt: any } | null };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, name: string, email: string, role: Role, createdAt: any, updatedAt: any } };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'User', id: string, name: string, email: string, role: Role, createdAt: any, updatedAt: any } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, name: string, email: string, role: Role, createdAt: any, updatedAt: any }> };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, name: string, email: string, role: Role, createdAt: any, updatedAt: any } };


export const GetDashboardStatsDocument = gql`
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
export const GetProjectDocument = gql`
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
export const UpdateProjectDocument = gql`
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
export const DeleteProjectDocument = gql`
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
export const GetProjectsDocument = gql`
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
export const CreateProjectDocument = gql`
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
export const GetUserDocument = gql`
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
export const UpdateUserDocument = gql`
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
export const DeleteUserDocument = gql`
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
export const GetUsersDocument = gql`
    query getUsers {
  users {
    id
    name
    email
    role
    createdAt
    updatedAt
  }
}
    `;
export const CreateUserDocument = gql`
    mutation createUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    email
    role
    createdAt
    updatedAt
  }
}
    `;
export type Requester<C = {}> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C>(requester: Requester<C>) {
  return {
    getDashboardStats(variables?: GetDashboardStatsQueryVariables, options?: C): Promise<GetDashboardStatsQuery> {
      return requester<GetDashboardStatsQuery, GetDashboardStatsQueryVariables>(GetDashboardStatsDocument, variables, options) as Promise<GetDashboardStatsQuery>;
    },
    getProject(variables: GetProjectQueryVariables, options?: C): Promise<GetProjectQuery> {
      return requester<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, variables, options) as Promise<GetProjectQuery>;
    },
    updateProject(variables: UpdateProjectMutationVariables, options?: C): Promise<UpdateProjectMutation> {
      return requester<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, variables, options) as Promise<UpdateProjectMutation>;
    },
    deleteProject(variables: DeleteProjectMutationVariables, options?: C): Promise<DeleteProjectMutation> {
      return requester<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, variables, options) as Promise<DeleteProjectMutation>;
    },
    getProjects(variables?: GetProjectsQueryVariables, options?: C): Promise<GetProjectsQuery> {
      return requester<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, variables, options) as Promise<GetProjectsQuery>;
    },
    createProject(variables: CreateProjectMutationVariables, options?: C): Promise<CreateProjectMutation> {
      return requester<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, variables, options) as Promise<CreateProjectMutation>;
    },
    getUser(variables: GetUserQueryVariables, options?: C): Promise<GetUserQuery> {
      return requester<GetUserQuery, GetUserQueryVariables>(GetUserDocument, variables, options) as Promise<GetUserQuery>;
    },
    updateUser(variables: UpdateUserMutationVariables, options?: C): Promise<UpdateUserMutation> {
      return requester<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, variables, options) as Promise<UpdateUserMutation>;
    },
    deleteUser(variables: DeleteUserMutationVariables, options?: C): Promise<DeleteUserMutation> {
      return requester<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, variables, options) as Promise<DeleteUserMutation>;
    },
    getUsers(variables?: GetUsersQueryVariables, options?: C): Promise<GetUsersQuery> {
      return requester<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, variables, options) as Promise<GetUsersQuery>;
    },
    createUser(variables: CreateUserMutationVariables, options?: C): Promise<CreateUserMutation> {
      return requester<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, variables, options) as Promise<CreateUserMutation>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;