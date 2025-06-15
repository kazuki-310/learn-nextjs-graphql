'use client';

import { DataTable, TableColumn, TableAction } from '@/components/shared/data-table';
import { User } from '@/lib/graphql/__generated__';
import { formatDate } from '@/lib/utils/date-format';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deleteUser } from '../[id]/_lib/actions';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export function UserTable({ users }: { users: User[] }) {
  const router = useRouter();

  const columns: TableColumn<User>[] = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    {
      key: 'createdAt',
      label: 'Created At',
      render: (value) => formatDate(value),
    },
    {
      key: 'updatedAt',
      label: 'Updated At',
      render: (value) => formatDate(value),
    },
  ];

  const actions: TableAction<User>[] = [
    {
      label: '編集',
      onClick: (user) => router.push(`/users/${user.id}`),
    },
    {
      label: '削除',
      onClick: async (user) => {
        try {
          await deleteUser(user.id);
          toast.success(`「${user.name}」を削除しました`);
        } catch (error) {
          toast.error('削除に失敗しました');
        }
      },
      variant: 'destructive',
    },
  ];

  if (users.length === 0) {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          ユーザーが登録されていません。新規作成ボタンから最初のユーザーを作成してください。
        </AlertDescription>
      </Alert>
    );
  }

  return <DataTable data={users} columns={columns} actions={actions} className="p-6" />;
}
