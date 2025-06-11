import { DashboardContent } from './_components/dashboard-content';
import { requireAuth } from '@/lib/page-auth';

export default async function DashboardPage() {
  await requireAuth();

  return (
    <div className="container mx-auto space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ダッシュボード</h1>
        <p className="text-muted-foreground">プロジェクトとユーザーの概要</p>
      </div>

      <DashboardContent />
    </div>
  );
}
