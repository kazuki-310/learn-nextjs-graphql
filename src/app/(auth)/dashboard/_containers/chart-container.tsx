import { DashboardChart } from '../_components/dashboard-chart';
import { getProjects } from '../../projects/_lib/fetchers';

export async function ChartContainer() {
  const projects = await getProjects();
  return <DashboardChart projects={projects} />;
}
