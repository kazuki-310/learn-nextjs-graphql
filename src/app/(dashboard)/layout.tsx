import { Sidebar } from '@/components/shared/sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="w-full p-6">{children}</main>
    </div>
  );
}
