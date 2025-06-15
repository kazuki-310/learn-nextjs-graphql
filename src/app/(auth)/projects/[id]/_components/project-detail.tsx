import { ProjectForm } from '../../_components/project-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { Project } from '@/lib/graphql/__generated__';

export function ProjectDetail({ project }: { project?: Project | null }) {
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
