import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Users } from 'lucide-react';
import { UserList } from './_components/user-list';
import Loading from './loading';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <div className="container mx-auto space-y-8 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
              <Users className="text-primary h-5 w-5" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">ユーザー管理</h1>
              <p className="text-muted-foreground">システム内のユーザーを管理できます</p>
            </div>
          </div>
        </div>

        <Link href="/users/new">
          <Button size="lg" className="shadow-lg transition-all hover:shadow-xl">
            <Plus className="mr-2 h-4 w-4" />
            新規ユーザー作成
          </Button>
        </Link>
      </div>

      <Card className="gap-0 border-0 p-0 shadow-md">
        <CardHeader className="bg-muted/50 border-b p-6">
          <CardTitle className="text-xl">ユーザー一覧</CardTitle>
          <CardDescription>登録されているユーザーの一覧を表示しています</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Suspense fallback={<Loading />}>
            <UserList />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
