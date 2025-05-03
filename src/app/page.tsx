import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-8 text-3xl font-bold">Top Page</h1>

        <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
          <Link href="/users">Dashboard Page</Link>
        </Button>
      </div>
    </main>
  );
}
