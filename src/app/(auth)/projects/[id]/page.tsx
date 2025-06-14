import { ProjectDetail } from './_containers/project-detail';
import { ProjectEditSkeleton } from '../_components/project-edit-skeleton';
import { Suspense } from 'react';
import { getCurrentUser } from '@/lib/auth';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  await getCurrentUser();

  const { id } = await params;

  return (
    <div className="container mx-auto max-w-2xl space-y-8 p-6">
      <Suspense fallback={<ProjectEditSkeleton />}>
        <ProjectDetail projectId={id} />
      </Suspense>
    </div>
  );
}
