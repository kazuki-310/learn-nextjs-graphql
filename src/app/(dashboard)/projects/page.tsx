import { Suspense } from 'react';
import { ProjectList } from './project-list';

export default function Page() {
  return (
    <main>
      <div className="p-6">
        <h1 className="text-3xl font-bold">User List を表示します</h1>

        <Suspense fallback={<div>Loading...</div>}>
          <ProjectList />
        </Suspense>
      </div>
    </main>
  );
}
