import { Suspense } from 'react';
import { UserList } from './user-list';
import { Spinner } from '@/components/shared/spinner';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <main>
      <div className="p-6">
        <h1 className="mb-3 text-3xl font-bold">User List を表示します</h1>

        <div className="px-6 text-end">
          <Link href="/users/new">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              新規作成
            </Button>
          </Link>
        </div>

        <Suspense fallback={<Spinner />}>
          <UserList />
        </Suspense>
      </div>
    </main>
  );
}
