import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { UserList } from './_containers/user-list';
import UserTableSkeleton from './_components/user-table-skeleton';
import { getCurrentUser } from '../dashboard/_lib/auth';

export default async function Page() {
  await getCurrentUser();

  return (
    <div className="container mx-auto space-y-8 p-6">
      <Card className="gap-0 border-0 p-0 shadow-md">
        <CardHeader className="bg-muted/50 border-b p-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">ユーザー一覧</CardTitle>
              <CardDescription>登録されているユーザーの一覧を表示しています</CardDescription>
            </div>
            <Link href="/users/new">
              <Button size="lg" className="shadow-lg transition-all hover:shadow-xl">
                <Plus className="mr-2 h-4 w-4" />
                新規ユーザー作成
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent className="p-3">
          <Suspense fallback={<UserTableSkeleton />}>
            <UserList />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
