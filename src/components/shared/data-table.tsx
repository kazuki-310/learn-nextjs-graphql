'use client';

import { Table, MenuRoot, MenuTrigger, MenuContent, MenuItem, Button, Checkbox, HStack, Box } from '@chakra-ui/react';
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
  VisibilityState,
} from '@tanstack/react-table';
import { useState } from 'react';

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
  enableCsvExport?: boolean;
  csvFilename?: string;
};

export function DataTable<T extends { id: string }>({
  data,
  columns,
  actions,
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
          <HStack gap={2}>
            {column.showCsvCheckbox && (
              <Checkbox.Root
                checked={csvColumns[String(column.key)] || false}
                onCheckedChange={(details) => toggleCsvColumn(String(column.key), !!details.checked)}
              />
            )}
            {column.sortable ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => tableColumn.toggleSorting(tableColumn.getIsSorted() === 'asc')}
                px={2}
                h={8}
              >
                {column.label}
                <ArrowUpDown size={16} style={{ marginLeft: '8px' }} />
              </Button>
            ) : (
              <span>{column.label}</span>
            )}
          </HStack>
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
              <MenuRoot lazyMount={false}>
                <MenuTrigger asChild>
                  <Button variant="ghost" size="sm" p={0} h={8} w={8}>
                    <EllipsisIcon width={16} height={16} />
                  </Button>
                </MenuTrigger>
                <MenuContent>
                  {actions.map((action, index) => (
                    <MenuItem
                      key={index}
                      color={action.variant === 'destructive' ? 'red.600' : undefined}
                      value={action.label}
                      onClick={() => handleAction(action, row.original)}
                      disabled={isPending}
                    >
                      {action.label}
                    </MenuItem>
                  ))}
                </MenuContent>
              </MenuRoot>
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
    <Box>
      {enableCsvExport && columns.some((col) => col.showCsvCheckbox) && (
        <HStack gap={2} mb={4}>
          <Button onClick={() => toggleAllCsvColumns(true)} size="sm" variant="outline">
            <CheckSquare size={16} style={{ marginRight: '8px' }} />
            全選択
          </Button>

          <Button onClick={() => toggleAllCsvColumns(false)} size="sm" variant="outline">
            <Square size={16} style={{ marginRight: '8px' }} />
            全解除
          </Button>

          <Button onClick={generateCSV} size="sm" variant="outline">
            <Download size={16} style={{ marginRight: '8px' }} />
            CSV ダウンロード
          </Button>
        </HStack>
      )}

      <Table.Root>
        <Table.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.ColumnHeader key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          ))}
        </Table.Header>

        <Table.Body>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <Table.Row key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={tableColumns.length} textAlign="center" height="96px">
                No results.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
