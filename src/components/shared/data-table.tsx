'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EllipsisIcon } from 'lucide-react';
import { useTransition } from 'react';

export type TableColumn<T> = {
  key: keyof T | string;
  label: string;
  render?: (value: any, item: T) => React.ReactNode;
};

export type TableAction<T> = {
  label: string;
  onClick: (item: T) => void | Promise<unknown>;
  variant?: 'default' | 'destructive';
  href?: string;
};

type DataTableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
  actions?: TableAction<T>[];
  className?: string;
};

export function DataTable<T extends { id: string }>({
  data,
  columns,
  actions,
  className,
}: DataTableProps<T>) {
  const [isPending, startTransition] = useTransition();

  const handleAction = (action: TableAction<T>, item: T) => {
    if (action.onClick) {
      startTransition(async () => {
        try {
          await action.onClick(item);
        } catch (error) {
          console.error(error);
        }
      });
    }
  };

  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={String(column.key)}>{column.label}</TableHead>
          ))}
          {actions && actions.length > 0 && <TableHead></TableHead>}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            {columns.map((column) => (
              <TableCell key={String(column.key)}>
                {column.render
                  ? column.render(item[column.key as keyof T], item)
                  : String(item[column.key as keyof T] ?? '')}
              </TableCell>
            ))}
            {actions && actions.length > 0 && (
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisIcon width={16} height={16} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {actions.map((action, index) => (
                      <DropdownMenuItem
                        key={index}
                        className={
                          action.variant === 'destructive'
                            ? 'text-red-600 focus:text-red-600'
                            : ''
                        }
                        onClick={() => handleAction(action, item)}
                        disabled={isPending}
                      >
                        {action.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}