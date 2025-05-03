import { Sidebar } from '@/components/shared/sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />

      <main className="p-6">{children}</main>
    </div>
  );
}
