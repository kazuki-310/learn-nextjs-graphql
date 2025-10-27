'use client';

import { SimpleGrid, Card, Text } from '@chakra-ui/react';
import type { GetDashboardStatsQuery } from '@/lib/graphql/__generated__/index';

export function DashboardStats({ stats }: { stats: GetDashboardStatsQuery['dashboardStats'] }) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
      <Card.Root>
        <Card.Header>
          <Card.Title fontSize="sm" fontWeight="medium">
            総プロジェクト数
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Text fontSize="2xl" fontWeight="bold">
            {stats.totalProjects}
          </Text>
        </Card.Body>
      </Card.Root>

      <Card.Root>
        <Card.Header>
          <Card.Title fontSize="sm" fontWeight="medium">
            総ユーザー数
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Text fontSize="2xl" fontWeight="bold">
            {stats.totalUsers}
          </Text>
        </Card.Body>
      </Card.Root>

      <Card.Root>
        <Card.Header>
          <Card.Title fontSize="sm" fontWeight="medium">
            総売上
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Text fontSize="2xl" fontWeight="bold">
            ¥{stats.totalRevenue.toLocaleString()}
          </Text>
        </Card.Body>
      </Card.Root>

      <Card.Root>
        <Card.Header>
          <Card.Title fontSize="sm" fontWeight="medium">
            平均プロジェクト価格
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Text fontSize="2xl" fontWeight="bold">
            ¥{Math.round(stats.averageProjectPrice).toLocaleString()}
          </Text>
        </Card.Body>
      </Card.Root>

      <Card.Root>
        <Card.Header>
          <Card.Title fontSize="sm" fontWeight="medium">
            最高価格
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Text fontSize="2xl" fontWeight="bold">
            ¥{stats.maxProjectPrice.toLocaleString()}
          </Text>
        </Card.Body>
      </Card.Root>

      <Card.Root>
        <Card.Header>
          <Card.Title fontSize="sm" fontWeight="medium">
            今月の新規プロジェクト
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Text fontSize="2xl" fontWeight="bold">
            {stats.recentProjectsCount}
          </Text>
        </Card.Body>
      </Card.Root>
    </SimpleGrid>
  );
}
