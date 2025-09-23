import { Suspense } from 'react';
import { UserDetailContainer } from './_containers/user-detail-container';
import { UserEditSkeleton } from './_components/user-edit-skeleton';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="container mx-auto max-w-2xl space-y-8 p-6">
      <Suspense fallback={<UserEditSkeleton />}>
        <UserDetailContainer userId={id} />
      </Suspense>
    </div>
  );
}
