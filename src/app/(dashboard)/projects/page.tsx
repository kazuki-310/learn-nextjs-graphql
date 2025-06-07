import { Suspense } from 'react';
import { Spinner } from '@/components/shared/spinner';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProjectList } from './_components/project-list';

export default function Page() {
  return (
    <main>
      <div className="p-6">
        <h1 className="mb-3 text-2xl font-bold">Project List</h1>

        <div className="px-6 text-end">
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
    </main>
  );
}
