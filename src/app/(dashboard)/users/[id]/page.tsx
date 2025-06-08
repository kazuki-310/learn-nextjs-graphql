import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { UserForm } from '../_components/user-form';
import { UserEditSkeleton } from './_components/user-edit-skeleton';
import { getUser } from './_server-actions/fetchers';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="container mx-auto max-w-2xl space-y-8 p-6">
      <Suspense fallback={<UserEditSkeleton />}>
        <UserDetailLoader userId={id} />
      </Suspense>
    </div>
  );
}

async function UserDetailLoader({ userId }: { userId: string }) {
  const user = await getUser(userId);

  if (!user) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          指定されたユーザーが見つかりません。ユーザーが削除されているか、IDが正しくない可能性があります。
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="gap-0 border-0 p-0 shadow-md">
      <CardHeader className="bg-muted/50 border-b p-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">ユーザー編集</CardTitle>
            <CardDescription>{user.name} さんの情報を編集</CardDescription>
          </div>
          <Link href="/users">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              戻る
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <UserForm user={user} />
      </CardContent>
    </Card>
  );
}
