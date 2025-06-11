'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, Users, FolderOpen } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { Button } from '../ui/button';

const navLinks = [
  { href: '/', label: 'ダッシュボード', icon: BarChart3 },
  { href: '/users', label: 'ユーザー', icon: Users },
  { href: '/projects', label: 'プロジェクト', icon: FolderOpen },
];

export function Sidebar() {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/signin' });
  };

  return (
    <aside className="flex min-w-64 flex-col border-r bg-gray-50 p-6">
      <div className="flex-1">
        <Link href="/" className="mb-8 block">
          <h2 className="text-xl font-bold text-gray-800 transition-colors hover:text-blue-600">
            Management Portal
          </h2>
        </Link>

        <NavMenu />
      </div>

      <div className="mt-4 border-t pt-4">
        <Button variant="outline" onClick={handleSignOut}>
          ログアウト
        </Button>
      </div>
    </aside>
  );
}

export function NavMenu() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="space-y-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-200 ${
                  isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
