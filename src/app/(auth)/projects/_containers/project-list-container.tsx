import { getProjects } from '../_lib/fetchers';
import { ProjectTable } from '../_components/project-table';

export async function ProjectListContainer() {
  const projects = await getProjects();

  return <ProjectTable projects={projects} />;
}
