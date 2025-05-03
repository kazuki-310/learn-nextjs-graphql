'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/users', label: 'User' },
  { href: '/projects', label: 'Project' },
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r p-6 text-white">
      <h2 className="mb-6 text-2xl font-bold">
        <Link href="/" className="hover:text-gray-300">
          Home
        </Link>
      </h2>

      <NavMenu />
    </aside>
  );
}

export function NavMenu() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="space-y-6">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`hover:text-gray-300 ${isActive ? 'text-blue-600' : 'text-white'}`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
