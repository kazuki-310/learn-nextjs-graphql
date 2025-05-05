import { getUsers } from './_server-actions/fetchers';
import { UserTable } from './user-table';

export async function UserList() {
  const users = await getUsers();

  return (
    <div className="p-6">
      <UserTable users={users} />
    </div>
  );
}
