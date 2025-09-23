import { Suspense } from 'react';
import { StatsContainer } from './_containers/stats-container';
import { DashboardStatsSkeleton } from './_components/dashboard-stats-skeleton';
import { DashboardChartSkeleton } from './_components/dashboard-chart-skeleton';
import { ChartContainer } from './_containers/chart-container';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  return (
    <div className="container mx-auto space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ダッシュボード</h1>
        <p className="text-muted-foreground">プロジェクトとユーザーの概要</p>
      </div>

      <div className="space-y-6">
        <Suspense fallback={<DashboardStatsSkeleton />}>
          <StatsContainer />
        </Suspense>

        <Suspense fallback={<DashboardChartSkeleton />}>
          <ChartContainer />
        </Suspense>
      </div>
    </div>
  );
}
