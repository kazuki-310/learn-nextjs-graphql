'use client';

import { DataTable, TableColumn, TableAction } from '@/components/shared/data-table';
import { User } from '@/lib/graphql/__generated__';
import { formatDate } from '@/lib/utils/date-format';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deleteUser } from '../[id]/_lib/actions';
import { Alert } from '@chakra-ui/react';
import { AlertTriangle } from 'lucide-react';

export function UserTable({ users }: { users: User[] }) {
  const router = useRouter();

  const columns: TableColumn<User>[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    {
      key: 'createdAt',
      label: 'Created At',
      render: (value) => formatDate(value),
      sortable: true,
    },
    {
      key: 'updatedAt',
      label: 'Updated At',
      render: (value) => formatDate(value),
      sortable: true,
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
      <Alert.Root status="warning">
        <Alert.Indicator>
          <AlertTriangle size={16} />
        </Alert.Indicator>
        <Alert.Content>
          <Alert.Description>
            ユーザーが登録されていません。新規作成ボタンから最初のユーザーを作成してください。
          </Alert.Description>
        </Alert.Content>
      </Alert.Root>
    );
  }

  return <DataTable data={users} columns={columns} actions={actions} />;
}
