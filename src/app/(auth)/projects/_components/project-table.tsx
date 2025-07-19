'use client';

import { DataTable, TableColumn, TableAction } from '@/components/shared/data-table';
import { Project } from '@/lib/graphql/__generated__';
import { formatDate } from '@/lib/utils/date-format';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deleteProject } from '../[id]/_lib/actions';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

type ProjectTableProps = {
  projects: Project[];
};

export function ProjectTable({ projects }: ProjectTableProps) {
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
      onClick: async (project) => {
        try {
          await deleteProject(project.id);
          toast.success(`「${project.title}」を削除しました`);
        } catch (error) {
          toast.error('削除に失敗しました');
        }
      },
      variant: 'destructive',
    },
  ];

  if (projects.length === 0) {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          プロジェクトが登録されていません。新規作成ボタンから最初のプロジェクトを作成してください。
        </AlertDescription>
      </Alert>
    );
  }

  return <DataTable data={projects} columns={columns} actions={actions} />;
}
