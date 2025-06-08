import { getUsers } from '../_server-actions/fetchers';
import { UserTable } from './user-table';

export async function UserList() {
  const users = await getUsers();

  return <UserTable users={users} />;
}
