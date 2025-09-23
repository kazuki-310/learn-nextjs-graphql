import { DashboardStats } from '../_components/dashboard-stats';
import { getDashboardStats } from '../_lib/fetchers';

export async function StatsContainer() {
  const stats = await getDashboardStats();
  return <DashboardStats stats={stats} />;
}
