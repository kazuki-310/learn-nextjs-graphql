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

export type Activity = {
  __typename?: 'Activity';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['String']['output']>;
  type: ActivityType;
  user: User;
  userId: Scalars['String']['output'];
};

export enum ActivityType {
  Archived = 'archived',
  Assigned = 'assigned',
  Completed = 'completed',
  Created = 'created',
  Updated = 'updated'
}

export type DashboardStats = {
  __typename?: 'DashboardStats';
  activeProjects: Scalars['Int']['output'];
  activeUsers: Scalars['Int']['output'];
  completedProjects: Scalars['Int']['output'];
  totalProjects: Scalars['Int']['output'];
  totalRevenue: Scalars['Int']['output'];
  totalUsers: Scalars['Int']['output'];
};

export type MonthlyRevenue = {
  __typename?: 'MonthlyRevenue';
  month: Scalars['String']['output'];
  revenue: Scalars['Int']['output'];
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
  input: UserInput;
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
  input: UserInput;
};

export enum Priority {
  High = 'high',
  Low = 'low',
  Medium = 'medium',
  Urgent = 'urgent'
}

export type Project = {
  __typename?: 'Project';
  activities: Array<Activity>;
  category?: Maybe<Scalars['String']['output']>;
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  owner?: Maybe<User>;
  ownerId?: Maybe<Scalars['String']['output']>;
  price: Scalars['Int']['output'];
  priority: Priority;
  progress: Scalars['Int']['output'];
  startDate?: Maybe<Scalars['DateTime']['output']>;
  status: ProjectStatus;
  tags: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ProjectInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  ownerId?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  priority?: InputMaybe<Priority>;
  progress?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<ProjectStatus>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export enum ProjectStatus {
  Active = 'active',
  Archived = 'archived',
  Completed = 'completed',
  Draft = 'draft'
}

export type ProjectStatusCount = {
  __typename?: 'ProjectStatusCount';
  count: Scalars['Int']['output'];
  status: ProjectStatus;
};

export type Query = {
  __typename?: 'Query';
  dashboardStats: DashboardStats;
  monthlyRevenue: Array<MonthlyRevenue>;
  project?: Maybe<Project>;
  projectStatusCounts: Array<ProjectStatusCount>;
  projects: Array<Project>;
  user?: Maybe<User>;
  userProjectCounts: Array<UserProjectCount>;
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

export type User = {
  __typename?: 'User';
  activities: Array<Activity>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  lastLoginAt?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  projects: Array<Project>;
  role: Role;
  updatedAt: Scalars['DateTime']['output'];
};

export type UserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  role: Role;
};

export type UserProjectCount = {
  __typename?: 'UserProjectCount';
  projectCount: Scalars['Int']['output'];
  user: User;
};

export type DeleteProjectMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject: { __typename?: 'Project', id: string, title: string, description?: string | null, createdAt: any, updatedAt: any, price: number } };

export type GetProjectQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProjectQuery = { __typename?: 'Query', project?: { __typename?: 'Project', id: string, title: string, description?: string | null, createdAt: any, updatedAt: any, price: number } | null };

export type UpdateProjectMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: ProjectInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject: { __typename?: 'Project', id: string, title: string, description?: string | null, createdAt: any, updatedAt: any, price: number } };

export type GetProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: string, title: string, description?: string | null, createdAt: any, updatedAt: any, price: number }> };

export type CreateProjectMutationVariables = Exact<{
  input: ProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string, title: string, description?: string | null, createdAt: any, updatedAt: any, price: number } };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'User', id: string, name: string, email: string, role: Role, createdAt: any } };

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, name: string, email: string, role: Role, createdAt: any } | null };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, name: string, email: string, role: Role, createdAt: any } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, name: string, email: string, role: Role, createdAt: any }> };

export type CreateUserMutationVariables = Exact<{
  input: UserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, name: string, email: string, role: Role, createdAt: any } };


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
export const DeleteUserDocument = gql`
    mutation deleteUser($id: ID!) {
  deleteUser(id: $id) {
    id
    name
    email
    role
    createdAt
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
  }
}
    `;
export const UpdateUserDocument = gql`
    mutation updateUser($id: ID!, $input: UserInput!) {
  updateUser(id: $id, input: $input) {
    id
    name
    email
    role
    createdAt
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
  }
}
    `;
export const CreateUserDocument = gql`
    mutation createUser($input: UserInput!) {
  createUser(input: $input) {
    id
    name
    email
    role
    createdAt
  }
}
    `;
export type Requester<C = {}> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C>(requester: Requester<C>) {
  return {
    deleteProject(variables: DeleteProjectMutationVariables, options?: C): Promise<DeleteProjectMutation> {
      return requester<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, variables, options) as Promise<DeleteProjectMutation>;
    },
    getProject(variables: GetProjectQueryVariables, options?: C): Promise<GetProjectQuery> {
      return requester<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, variables, options) as Promise<GetProjectQuery>;
    },
    updateProject(variables: UpdateProjectMutationVariables, options?: C): Promise<UpdateProjectMutation> {
      return requester<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, variables, options) as Promise<UpdateProjectMutation>;
    },
    getProjects(variables?: GetProjectsQueryVariables, options?: C): Promise<GetProjectsQuery> {
      return requester<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, variables, options) as Promise<GetProjectsQuery>;
    },
    createProject(variables: CreateProjectMutationVariables, options?: C): Promise<CreateProjectMutation> {
      return requester<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, variables, options) as Promise<CreateProjectMutation>;
    },
    deleteUser(variables: DeleteUserMutationVariables, options?: C): Promise<DeleteUserMutation> {
      return requester<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, variables, options) as Promise<DeleteUserMutation>;
    },
    getUser(variables: GetUserQueryVariables, options?: C): Promise<GetUserQuery> {
      return requester<GetUserQuery, GetUserQueryVariables>(GetUserDocument, variables, options) as Promise<GetUserQuery>;
    },
    updateUser(variables: UpdateUserMutationVariables, options?: C): Promise<UpdateUserMutation> {
      return requester<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, variables, options) as Promise<UpdateUserMutation>;
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