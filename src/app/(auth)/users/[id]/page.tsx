import { Suspense } from 'react';
import { UserDetail } from './_containers/user-detail';
import { UserEditSkeleton } from './_components/user-edit-skeleton';
import { requireAuth } from '@/lib/page-auth';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  await requireAuth();
  const { id } = await params;

  return (
    <div className="container mx-auto max-w-2xl space-y-8 p-6">
      <Suspense fallback={<UserEditSkeleton />}>
        <UserDetail userId={id} />
      </Suspense>
    </div>
  );
}
