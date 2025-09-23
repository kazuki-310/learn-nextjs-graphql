import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import ProjectTableSkeleton from './_components/project-table-skeleton';

import { ProjectListContainer } from './_containers/project-list-container';

export default async function Page() {
  return (
    <div className="container mx-auto space-y-8 p-6">
      <Card className="gap-0 border-0 p-0 shadow-md">
        <CardHeader className="bg-muted/50 border-b p-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">プロジェクト一覧</CardTitle>
              <CardDescription>登録されているプロジェクトの一覧を表示しています</CardDescription>
            </div>
            <Link href="/projects/new">
              <Button size="lg" className="shadow-lg transition-all hover:shadow-xl">
                <Plus className="mr-2 h-4 w-4" />
                新規プロジェクト作成
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent className="p-3">
          <Suspense fallback={<ProjectTableSkeleton />}>
            <ProjectListContainer />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
