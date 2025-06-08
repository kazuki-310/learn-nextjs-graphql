import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserList } from './_components/user-list';
import { UserListSkeleton } from './_components/user-list-skeleton';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">ユーザー管理</h1>
        <Link href="/users/new">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            新規作成
          </Button>
        </Link>
      </div>

      <Suspense fallback={<UserListSkeleton />}>
        <UserList />
      </Suspense>
    </div>
  );
}
