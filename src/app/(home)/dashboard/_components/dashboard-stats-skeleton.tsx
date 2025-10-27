import { SimpleGrid, Card, Skeleton } from '@chakra-ui/react';

export function DashboardStatsSkeleton() {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Card.Root key={index}>
          <Card.Header>
            <Skeleton height="16px" width="128px" />
          </Card.Header>
          <Card.Body>
            <Skeleton height="32px" width="96px" />
          </Card.Body>
        </Card.Root>
      ))}
    </SimpleGrid>
  );
}