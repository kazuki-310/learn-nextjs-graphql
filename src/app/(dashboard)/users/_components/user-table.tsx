'use client';

import { DataTable, TableColumn } from '@/components/shared/data-table';
import { User } from '@/lib/graphql/__generated__';
import { formatDate } from '@/lib/utils/date-format';

export function UserTable({ users }: { users: User[] }) {
  const columns: TableColumn<User>[] = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { 
      key: 'createdAt', 
      label: 'Created At',
      render: (value) => formatDate(value)
    },
  ];

  return <DataTable data={users} columns={columns} className="p-6" />;
}
