import { Suspense } from 'react';
import { UserList } from './user-list';
import { env } from '@/env.mjs';

export const dynamic = 'force-dynamic';
export default function Page() {
  const test = env.NEXT_PUBLIC_API_URL;
  console.log('test', test);
  return (
    <main>
      <div className="p-6">
        <h1 className="text-3xl font-bold">User List を表示します</h1>

        <Suspense fallback={<div>Loading...</div>}>
          <UserList />
        </Suspense>
      </div>
    </main>
  );
}
