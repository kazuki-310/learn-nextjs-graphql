import { Suspense } from 'react';
import { ProjectList } from './project-list';
import { TableSpinner } from '@/components/shared/spinner';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <main>
      <div className="p-6">
        <h1 className="mb-3 text-2xl font-bold">Project List</h1>

        <div className="px-6 text-end">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/projects/new">新規作成</Link>
          </Button>
        </div>

        <Suspense fallback={<TableSpinner />}>
          <ProjectList />
        </Suspense>
      </div>
    </main>
  );
}
