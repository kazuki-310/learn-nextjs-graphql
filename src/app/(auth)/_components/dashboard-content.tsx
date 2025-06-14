import { Suspense } from 'react';
import { getDashboardStats } from '../_server-actions/fetchers';
import { DashboardStats } from './dashboard-stats';
import { DashboardChart } from './dashboard-chart';
import { DashboardStatsSkeleton } from './dashboard-stats-skeleton';
import { DashboardChartSkeleton } from './dashboard-chart-skeleton';
import { getProjects } from '../projects/_lib/fetchers';

export function DashboardContent() {
  return (
    <div className="space-y-6">
      <Suspense fallback={<DashboardStatsSkeleton />}>
        <StatsWrapper />
      </Suspense>

      <Suspense fallback={<DashboardChartSkeleton />}>
        <ChartWrapper />
      </Suspense>
    </div>
  );
}

async function StatsWrapper() {
  const stats = await getDashboardStats();
  return <DashboardStats stats={stats} />;
}

async function ChartWrapper() {
  const projects = await getProjects();
  return <DashboardChart projects={projects} />;
}
