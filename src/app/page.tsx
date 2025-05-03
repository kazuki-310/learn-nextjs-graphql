import Link from 'next/link';

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-8 text-3xl font-bold">Top Page</h1>
        <Link href="/users">
          <button className="rounded bg-blue-500 px-6 py-3 text-2xl text-white hover:bg-blue-600">
            Dashboard Page
          </button>
        </Link>
      </div>
    </main>
  );
}
