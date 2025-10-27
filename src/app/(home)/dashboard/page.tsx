import { Suspense } from 'react';
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { StatsContainer } from './_containers/stats-container';
import { DashboardStatsSkeleton } from './_components/dashboard-stats-skeleton';
import { DashboardChartSkeleton } from './_components/dashboard-chart-skeleton';
import { ChartContainer } from './_containers/chart-container';

export default async function DashboardPage() {
  return (
    <Container maxW="container.xl" py={6}>
      <VStack gap={8} align="stretch">
        <Box>
          <Heading as="h1" size="2xl" fontWeight="bold" mb={2}>
            ダッシュボード
          </Heading>
          <Text color="gray.600">プロジェクトとユーザーの概要</Text>
        </Box>

        <VStack gap={6} align="stretch">
          <Suspense fallback={<DashboardStatsSkeleton />}>
            <StatsContainer />
          </Suspense>

          <Suspense fallback={<DashboardChartSkeleton />}>
            <ChartContainer />
          </Suspense>
        </VStack>
      </VStack>
    </Container>
  );
}
