import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectForm } from '../_components/project-form';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';

export default async function Page() {
  await getCurrentUser();

  return (
    <div className="container mx-auto max-w-2xl space-y-8 p-6">
      <Card className="gap-0 border-0 p-0 shadow-md">
        <CardHeader className="bg-muted/50 border-b p-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">新規プロジェクト作成</CardTitle>
              <CardDescription>必要な情報を入力してプロジェクトを作成してください</CardDescription>
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
          <ProjectForm />
        </CardContent>
      </Card>
    </div>
  );
}
