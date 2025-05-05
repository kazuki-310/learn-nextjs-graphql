import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-8 text-3xl font-bold">Top Page</h1>

        <Link href="/users">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Dashboard Page
          </Button>
        </Link>
      </div>
    </main>
  );
}
