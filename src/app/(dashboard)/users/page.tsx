import { Suspense } from 'react';
import { UserList } from './user-list';
import { TableSpinner } from '@/components/shared/spinner';
export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <main>
      <div className="p-6">
        <h1 className="text-3xl font-bold">User List を表示します</h1>

        <Suspense fallback={<TableSpinner />}>
          <UserList />
        </Suspense>
      </div>
    </main>
  );
}
