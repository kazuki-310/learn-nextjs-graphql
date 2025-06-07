import { Suspense } from 'react';
import { UserForm } from '../_components/user-form';
import { getUser } from './_server-actions/fetchers';
import { Spinner } from '@/components/shared/spinner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/utils/date-format';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">ユーザー編集</h1>

      <Suspense fallback={<Spinner />}>
        <UserDetailLoader userId={id} />
      </Suspense>
    </main>
  );
}

async function UserDetailLoader({ userId }: { userId: string }) {
  const user = await getUser(userId);

  if (!user) {
    return <div>ユーザーは存在しません</div>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* ユーザー情報表示 */}
      <Card>
        <CardHeader>
          <CardTitle>ユーザー情報</CardTitle>
          <CardDescription>現在のユーザー詳細情報</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">名前</label>
            <p className="text-sm">{user.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">メールアドレス</label>
            <p className="text-sm">{user.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">ロール</label>
            <p className="text-sm">{user.role}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">ステータス</label>
            <p className="text-sm">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {user.isActive ? 'アクティブ' : '非アクティブ'}
              </span>
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">最終ログイン</label>
            <p className="text-sm">{user.lastLoginAt ? formatDate(user.lastLoginAt) : '未ログイン'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">作成日</label>
            <p className="text-sm">{formatDate(user.createdAt)}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">更新日</label>
            <p className="text-sm">{formatDate(user.updatedAt)}</p>
          </div>
        </CardContent>
      </Card>

      {/* ユーザー編集フォーム */}
      <Card>
        <CardHeader>
          <CardTitle>ユーザー編集</CardTitle>
          <CardDescription>ユーザー情報を編集</CardDescription>
        </CardHeader>
        <CardContent>
          <UserForm user={user} />
        </CardContent>
      </Card>
    </div>
  );
}
