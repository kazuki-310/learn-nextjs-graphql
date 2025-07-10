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
import { EllipsisIcon, ArrowUpDown, Download, CheckSquare, Square } from 'lucide-react';
import { useTransition } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  Column,
  Row,
  Cell,
  VisibilityState,
} from '@tanstack/react-table';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export type TableColumn<T> = {
  key: keyof T | string;
  label: string;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
  sortable?: boolean;
  showCsvCheckbox?: boolean;
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
  enableCsvExport?: boolean;
  csvFilename?: string;
};

export function DataTable<T extends { id: string }>({
  data,
  columns,
  actions,
  className,
  enableCsvExport = false,
  csvFilename = 'data.csv',
}: DataTableProps<T>) {
  const [isPending, startTransition] = useTransition();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [csvColumns, setCsvColumns] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    columns.forEach((col) => {
      if (col.showCsvCheckbox) {
        initial[String(col.key)] = true;
      }
    });
    return initial;
  });

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

  const tableColumns: ColumnDef<T>[] = [
    ...columns.map((column) => ({
      id: String(column.key),
      accessorKey: column.key,
      header: ({ column: tableColumn }: { column: Column<T, unknown> }) => {
        return (
          <div className="flex items-center space-x-2">
            {column.showCsvCheckbox && (
              <Checkbox
                checked={csvColumns[String(column.key)] || false}
                onCheckedChange={(checked) => toggleCsvColumn(String(column.key), !!checked)}
              />
            )}
            {column.sortable ? (
              <Button
                variant="ghost"
                onClick={() => tableColumn.toggleSorting(tableColumn.getIsSorted() === 'asc')}
                className={column.showCsvCheckbox ? '-ml-2 h-8 px-2' : '-ml-4 h-8 px-2'}
              >
                {column.label}
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <span>{column.label}</span>
            )}
          </div>
        );
      },
      cell: ({ getValue, row }: { getValue: () => unknown; row: Row<T> }) => {
        const value = getValue();
        if (column.render) {
          return column.render(value as T[keyof T], row.original);
        }
        return String(value ?? '');
      },
      enableSorting: column.sortable ?? false,
    })),
    ...(actions && actions.length > 0
      ? [
          {
            id: 'actions',
            cell: ({ row }: { row: Row<T> }) => (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <EllipsisIcon width={16} height={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {actions.map((action, index) => (
                    <DropdownMenuItem
                      key={index}
                      className={
                        action.variant === 'destructive' ? 'text-red-600 focus:text-red-600' : ''
                      }
                      onClick={() => handleAction(action, row.original)}
                      disabled={isPending}
                    >
                      {action.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ),
          } as ColumnDef<T>,
        ]
      : []),
  ];

  const table = useReactTable({
    data,
    columns: tableColumns,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnVisibility,
    },
  });

  const generateCSV = () => {
    const selectedColumns = columns.filter(
      (col) => col.showCsvCheckbox && csvColumns[String(col.key)],
    );
    const headers = selectedColumns.map((col) => col.label);

    const csvContent = [
      headers.join(','),
      ...data.map((row) =>
        selectedColumns
          .map((column) => {
            const value = row[column.key as keyof T];

            if (column.render) {
              const rendered = column.render(value as T[keyof T], row);
              return `"${String(rendered).replace(/"/g, '""')}"`;
            }

            return `"${String(value ?? '').replace(/"/g, '""')}"`;
          })
          .join(','),
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', csvFilename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleAllCsvColumns = (selected: boolean) => {
    const newCsvColumns: Record<string, boolean> = {};
    columns.forEach((col) => {
      if (col.showCsvCheckbox) {
        newCsvColumns[String(col.key)] = selected;
      }
    });
    setCsvColumns(newCsvColumns);
  };

  const toggleCsvColumn = (columnKey: string, selected: boolean) => {
    setCsvColumns((prev) => ({
      ...prev,
      [columnKey]: selected,
    }));
  };

  return (
    <div className="space-y-4">
      {enableCsvExport && columns.some((col) => col.showCsvCheckbox) && (
        <div className="flex items-center gap-2">
          <Button onClick={() => toggleAllCsvColumns(true)} size="sm" variant="outline">
            <CheckSquare className="mr-2 h-4 w-4" />
            全選択
          </Button>

          <Button onClick={() => toggleAllCsvColumns(false)} size="sm" variant="outline">
            <Square className="mr-2 h-4 w-4" />
            全解除
          </Button>

          <Button onClick={generateCSV} size="sm" variant="outline">
            <Download className="mr-2 h-4 w-4" />
            CSV ダウンロード
          </Button>
        </div>
      )}

      <Table className={className}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={tableColumns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
