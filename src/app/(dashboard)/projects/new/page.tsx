import { ProjectForm } from '../_components/project-form';

export default function Page() {
  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">プロジェクト作成</h1>

      <ProjectForm />
    </main>
  );
}
