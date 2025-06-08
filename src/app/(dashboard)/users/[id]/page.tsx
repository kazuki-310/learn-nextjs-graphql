import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, UserCheck, AlertTriangle } from 'lucide-react';
import { UserForm } from '../_components/user-form';
import { getUser } from './_server-actions/fetchers';
import { Spinner } from '@/components/shared/spinner';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="container mx-auto max-w-2xl space-y-8 p-6">
      <div className="flex items-center gap-4">
        <Link href="/users">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            戻る
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <UserCheck className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">ユーザー編集</h1>
            <p className="text-muted-foreground">ユーザー情報を更新します</p>
          </div>
        </div>
      </div>

      <Suspense fallback={<UserEditSkeleton />}>
        <UserDetailLoader userId={id} />
      </Suspense>
    </div>
  );
}

function UserEditSkeleton() {
  return (
    <Card className="gap-0 border-0 p-0 shadow-md">
      <CardHeader className="bg-muted/50 border-b p-6">
        <div className="flex items-center justify-center py-8">
          <Spinner />
        </div>
      </CardHeader>
    </Card>
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
        <CardTitle className="text-xl">ユーザー情報の編集</CardTitle>
        <CardDescription>
          {user.name} さんの情報を編集しています
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <UserForm user={user} />
      </CardContent>
    </Card>
  );
}
