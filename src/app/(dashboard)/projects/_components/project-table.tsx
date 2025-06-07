'use client';

import { DataTable, TableColumn, TableAction } from '@/components/shared/data-table';
import { Project } from '@/lib/graphql/__generated__';
import { formatDate } from '@/lib/utils/date-format';
import { useRouter } from 'next/navigation';
import { deleteProject } from '../[id]/_server-actions/actions';

export function ProjectTable({ projects }: { projects: Project[] }) {
  const router = useRouter();

  const columns: TableColumn<Project>[] = [
    { key: 'title', label: 'Title' },
    { key: 'description', label: 'Description' },
    {
      key: 'price',
      label: 'Price',
      render: (value) => (value ? `${value} 円` : ''),
    },
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

  const actions: TableAction<Project>[] = [
    {
      label: '編集',
      onClick: (project) => router.push(`/projects/${project.id}`),
    },
    {
      label: '削除',
      onClick: (project) => deleteProject(project.id),
      variant: 'destructive',
    },
  ];

  return <DataTable data={projects} columns={columns} actions={actions} />;
}
