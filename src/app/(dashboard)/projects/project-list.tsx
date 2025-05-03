import { getProjects } from './_server-actions/fetchers/get-projects';
import { ProjectTable } from './project-table';

export async function ProjectList() {
  const projects = await getProjects();

  return (
    <div className="p-6">
      <ProjectTable projects={projects} />
    </div>
  );
}
