import { Suspense } from 'react';
import { Spinner } from '@/components/shared/spinner';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProjectList } from './_components/project-list';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">プロジェクト管理</h1>
        <Link href="/projects/new">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            新規作成
          </Button>
        </Link>
      </div>

      <Suspense fallback={<Spinner />}>
        <ProjectList />
      </Suspense>
    </div>
  );
}
