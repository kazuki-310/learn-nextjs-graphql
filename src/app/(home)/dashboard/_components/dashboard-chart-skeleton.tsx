import { Card, Skeleton } from '@chakra-ui/react';

export function DashboardChartSkeleton() {
  return (
    <Card.Root>
      <Card.Header>
        <Skeleton height="24px" width="192px" />
      </Card.Header>
      <Card.Body>
        <Skeleton height="300px" width="100%" />
      </Card.Body>
    </Card.Root>
  );
}