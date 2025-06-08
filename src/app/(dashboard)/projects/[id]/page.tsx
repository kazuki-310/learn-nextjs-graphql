import { ProjectForm } from '../_components/project-form';
import { getProject } from './_server-actions/fetchers';
import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, FolderEdit, AlertTriangle } from 'lucide-react';
import { ProjectEditSkeleton } from './_components/project-edit.skeleton';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="container mx-auto max-w-2xl space-y-8 p-6">
      <Suspense fallback={<ProjectEditSkeleton />}>
        <ProjectFormLoader projectId={id} />
      </Suspense>
    </div>
  );
}

async function ProjectFormLoader({ projectId }: { projectId: string }) {
  const project = await getProject(projectId);

  if (!project) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          指定されたプロジェクトが見つかりません。プロジェクトが削除されているか、IDが正しくない可能性があります。
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="gap-0 border-0 p-0 shadow-md">
      <CardHeader className="bg-muted/50 border-b p-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">プロジェクト編集</CardTitle>
            <CardDescription>{project.title} の情報を編集</CardDescription>
          </div>
          <Link href="/projects">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              戻る
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <ProjectForm project={project} />
      </CardContent>
    </Card>
  );
}
