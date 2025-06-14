import { getProjects } from '../_lib/fetchers';
import { ProjectTable } from '../_components/project-table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export async function ProjectList() {
  const projects = await getProjects();

  if (!projects || projects.length === 0) {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          プロジェクトが登録されていません。新規作成ボタンから最初のプロジェクトを作成してください。
        </AlertDescription>
      </Alert>
    );
  }

  return <ProjectTable projects={projects} />;
}
