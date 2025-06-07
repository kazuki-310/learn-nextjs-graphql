import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { GetDashboardStatsQuery } from '@/lib/graphql/__generated__/index';

type DashboardStatsFromQuery = GetDashboardStatsQuery['dashboardStats'];

export function DashboardStats({ stats }: { stats: DashboardStatsFromQuery }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">総プロジェクト数</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalProjects}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">総ユーザー数</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalUsers}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">総売上</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">¥{stats.totalRevenue.toLocaleString()}</div>
        </CardContent>
      </Card>
    </div>
  );
}