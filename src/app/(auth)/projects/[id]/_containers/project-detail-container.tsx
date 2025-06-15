import { ProjectDetail } from '../_components/project-detail';
import { getProject } from '../_lib/fetchers';

export async function ProjectDetailContainer({ projectId }: { projectId: string }) {
  const project = await getProject(projectId);

  return <ProjectDetail project={project} />;
}
