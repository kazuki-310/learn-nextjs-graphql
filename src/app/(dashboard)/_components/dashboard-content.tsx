import { getDashboardStats } from '../_server-actions/fetchers';
import { DashboardStats } from './dashboard-stats';

export async function DashboardContent() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8">
      <DashboardStats stats={stats} />
    </div>
  );
}
