import { getUsers } from '../_lib/fetchers';
import { UserTable } from '../_components/user-table';

export async function UserListContainer() {
  const users = await getUsers();

  return <UserTable users={users} />;
}
