import { ProjectForm } from '../new/project-form';
import { getProject } from './_server-actions/fetchers';
import { Suspense } from 'react';
import { Spinner } from '@/components/shared/spinner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/utils/date-format';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">プロジェクト編集</h1>

      <Suspense fallback={<Spinner />}>
        <ProjectFormLoader projectId={id} />
      </Suspense>
    </main>
  );
}

async function ProjectFormLoader({ projectId }: { projectId: string }) {
  const project = await getProject(projectId);

  if (!project) {
    return <div>プロジェクトは存在しません</div>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* プロジェクト情報表示 */}
      <Card>
        <CardHeader>
          <CardTitle>プロジェクト情報</CardTitle>
          <CardDescription>現在のプロジェクト詳細情報</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">タイトル</label>
            <p className="text-sm">{project.title}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">説明</label>
            <p className="text-sm">{project.description || '説明なし'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">価格</label>
            <p className="text-sm">¥{project.price.toLocaleString()}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">作成日</label>
            <p className="text-sm">{formatDate(project.createdAt)}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">更新日</label>
            <p className="text-sm">{formatDate(project.updatedAt)}</p>
          </div>
        </CardContent>
      </Card>

      {/* プロジェクト編集フォーム */}
      <Card>
        <CardHeader>
          <CardTitle>プロジェクト編集</CardTitle>
          <CardDescription>プロジェクト情報を編集</CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectForm project={project} />
        </CardContent>
      </Card>
    </div>
  );
}
