'use client';

import { DataTable, TableColumn, TableAction, PaginationConfig, SortConfig } from '@/components/shared/data-table';
import { Project } from '@/lib/graphql/__generated__';
import { formatDate } from '@/lib/utils/date-format';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deleteProject } from '../[id]/_lib/actions';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface ProjectTableProps {
  projects: Project[];
  enablePagination?: boolean;
  totalItems?: number;
  pagination?: PaginationConfig;
  onPaginationChange?: (pagination: PaginationConfig) => void;
  enableServerSort?: boolean;
  sorting?: SortConfig[];
  onSortingChange?: (sorting: SortConfig[]) => void;
}

export function ProjectTable({ 
  projects, 
  enablePagination = false,
  totalItems = 0,
  pagination,
  onPaginationChange,
  enableServerSort = false,
  sorting,
  onSortingChange
}: ProjectTableProps) {
  const router = useRouter();

  const columns: TableColumn<Project>[] = [
    { key: 'title', label: 'Title', sortable: true, showCsvCheckbox: true },
    { key: 'description', label: 'Description', sortable: true, showCsvCheckbox: true },
    {
      key: 'price',
      label: 'Price',
      render: (value) => (value ? `${value} 円` : ''),
      sortable: true,
      showCsvCheckbox: true,
    },
    {
      key: 'createdAt',
      label: 'Created At',
      render: (value) => formatDate(value),
      sortable: true,
      showCsvCheckbox: true,
    },
    {
      key: 'updatedAt',
      label: 'Updated At',
      render: (value) => formatDate(value),
      sortable: true,
      showCsvCheckbox: true,
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

  return (
    <DataTable 
      data={projects} 
      columns={columns} 
      actions={actions} 
      enableCsvExport={true}
      csvFilename="projects.csv"
      enablePagination={enablePagination}
      totalItems={totalItems}
      pagination={pagination}
      onPaginationChange={onPaginationChange}
      enableServerSort={enableServerSort}
      sorting={sorting}
      onSortingChange={onSortingChange}
    />
  );
}
