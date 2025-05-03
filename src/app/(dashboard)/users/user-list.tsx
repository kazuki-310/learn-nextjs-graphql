import { getProjects } from '../projects/_server-actions/fetchers/get-projects';
import { UserTable } from './user-table';

export async function UserList() {
  const projects = await getProjects();

  return <UserTable projects={projects} />;
}
