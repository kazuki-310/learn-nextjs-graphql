import { getUsers } from './_server-actions/fetchers';
import { UserTable } from './user-table';

export async function UserList() {
  const users = await getUsers();
  console.log('🚀 ~ UserList ~ users:', users[0].email);

  return (
    <div className="p-6">
      <UserTable users={users} />

      <TestUserList />
    </div>
  );
}

async function TestUserList() {
  const users = await getUsers();
  console.log('🚀 ~ TestUserList ~ users:', users[0].email);
  return <div className="p-6">test</div>;
}
