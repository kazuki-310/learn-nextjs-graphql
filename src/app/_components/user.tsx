'use client';

import { useQuery } from '@apollo/client';
import { gql } from '../../../apollo/__generated__/client';
import { User as UserType } from '../../../apollo/__generated__/client/graphql';

const ALL_USERS = gql(`query ALL_USERS {
  users {
    name
  }
}`);

export function User() {
  const { data, loading, error } = useQuery(ALL_USERS);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <ul>
        {data.users.map((user: UserType, i: number) => (
          <li key={i}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
