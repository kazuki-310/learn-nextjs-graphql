import { getUsers } from '../_lib/fetchers';
import { UserTable } from '../_components/user-table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export async function UserList() {
  const users = await getUsers();

  if (!users || users.length === 0) {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          ユーザーが登録されていません。新規作成ボタンから最初のユーザーを作成してください。
        </AlertDescription>
      </Alert>
    );
  }

  return <UserTable users={users} />;
}