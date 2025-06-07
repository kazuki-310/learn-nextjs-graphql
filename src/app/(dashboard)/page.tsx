import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/shared/spinner';
import { DashboardStats } from './_components/dashboard-stats';
import { getDashboardStats } from './_server-actions/fetchers';

async function DashboardContent() {
  const stats = await getDashboardStats();
  return <DashboardStats stats={stats} />;
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ダッシュボード</h1>
        <p className="text-muted-foreground">プロジェクトとユーザーの概要</p>
      </div>

      {/* 統計情報 */}
      <Suspense fallback={<Spinner />}>
        <DashboardContent />
      </Suspense>

      {/* 管理メニュー */}
      <div>
        <h2 className="text-xl font-semibold mb-4">管理メニュー</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Link href="/users">
            <Button size="lg" className="h-24 w-full flex-col space-y-2" variant="outline">
              <span className="text-xl">👥</span>
              <span>ユーザー管理</span>
            </Button>
          </Link>
          <Link href="/projects">
            <Button size="lg" className="h-24 w-full flex-col space-y-2" variant="outline">
              <span className="text-xl">📁</span>
              <span>プロジェクト管理</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}