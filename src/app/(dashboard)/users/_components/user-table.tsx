'use client';

import { DataTable, TableColumn, TableAction } from '@/components/shared/data-table';
import { User } from '@/lib/graphql/__generated__';
import { formatDate } from '@/lib/utils/date-format';
import { useRouter } from 'next/navigation';
import { deleteUser } from '../[id]/_server-actions/actions';

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
      onClick: (user) => deleteUser(user.id),
      variant: 'destructive',
    },
  ];

  return <DataTable data={users} columns={columns} actions={actions} className="p-6" />;
}
