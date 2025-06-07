import { ProjectForm } from '../new/project-form';
import { getProject } from './_server-actions/fetchers';
import { Suspense } from 'react';
import { Spinner } from '@/components/shared/spinner';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">プロジェクト編集</h1>

      <Suspense fallback={<Spinner />}>
        <ProjectFormLoader projectId={id} />
      </Suspense>
    </main>
  );
}

async function ProjectFormLoader({ projectId }: { projectId: string }) {
  const project = await getProject(projectId);

  if (!project) {
    return <div>プロジェクトは存在しません</div>;
  }

  return <ProjectForm project={project} />;
}
