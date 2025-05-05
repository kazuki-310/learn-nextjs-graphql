import { getUsers } from './_server-actions/fetchers/get-users';
import { UserTable } from './user-table';

export async function UserList() {
  const users = await getUsers();
  console.log('🚀 ~ UserList ~ users:', users);

  return <UserTable users={users} />;
}
