import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { GetDashboardStatsQuery } from '@/lib/graphql/__generated__/index';

export function DashboardStats({ stats }: { stats: GetDashboardStatsQuery['dashboardStats'] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">平均プロジェクト価格</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ¥{Math.round(stats.averageProjectPrice).toLocaleString()}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">最高価格</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">¥{stats.maxProjectPrice.toLocaleString()}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">今月の新規プロジェクト</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.recentProjectsCount}</div>
        </CardContent>
      </Card>
    </div>
  );
}
