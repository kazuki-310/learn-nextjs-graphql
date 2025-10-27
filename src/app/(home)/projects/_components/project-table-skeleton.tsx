import { Table, Skeleton } from '@chakra-ui/react';

export default function ProjectTableSkeleton() {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>
            <Skeleton height="16px" width="64px" />
          </Table.ColumnHeader>
          <Table.ColumnHeader>
            <Skeleton height="16px" width="80px" />
          </Table.ColumnHeader>
          <Table.ColumnHeader>
            <Skeleton height="16px" width="48px" />
          </Table.ColumnHeader>
          <Table.ColumnHeader>
            <Skeleton height="16px" width="80px" />
          </Table.ColumnHeader>
          <Table.ColumnHeader>
            <Skeleton height="16px" width="80px" />
          </Table.ColumnHeader>
          <Table.ColumnHeader></Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Array.from({ length: 5 }).map((_, index) => (
          <Table.Row key={index}>
            <Table.Cell>
              <Skeleton height="16px" width="128px" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton height="16px" width="96px" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton height="16px" width="64px" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton height="16px" width="80px" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton height="16px" width="80px" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton height="16px" width="16px" />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
