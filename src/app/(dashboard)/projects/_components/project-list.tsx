import { getProjects } from '../_server-actions/fetchers';
import { ProjectTable } from './project-table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export async function ProjectList() {
  try {
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
  } catch (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          プロジェクトの読み込み中にエラーが発生しました。ページを再読み込みしてください。
        </AlertDescription>
      </Alert>
    );
  }
}
