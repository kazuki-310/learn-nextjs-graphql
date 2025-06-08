import { Suspense } from 'react';
import { Spinner } from '@/components/shared/spinner';
import { DashboardStats } from './_components/dashboard-stats';
import { getDashboardStats } from './_server-actions/fetchers';

export const dynamic = 'force-dynamic';

async function DashboardContent() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8">
      <DashboardStats stats={stats} />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ダッシュボード</h1>
        <p className="text-muted-foreground">プロジェクトとユーザーの概要</p>
      </div>

      <Suspense fallback={<Spinner />}>
        <DashboardContent />
      </Suspense>
    </div>
  );
}
