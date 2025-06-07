import { Suspense } from 'react';
import { UserForm } from '../_components/user-form';
import { getUser } from './_server-actions/fetchers';
import { Spinner } from '@/components/shared/spinner';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">ユーザー編集</h1>

      <Suspense fallback={<Spinner />}>
        <UserFormLoader userId={id} />
      </Suspense>
    </main>
  );
}

async function UserFormLoader({ userId }: { userId: string }) {
  const user = await getUser(userId);

  if (!user) {
    return <div>ユーザーは存在しません</div>;
  }

  return <UserForm user={user} />;
}
