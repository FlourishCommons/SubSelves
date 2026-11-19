'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { UserMenu } from './UserMenu';

const navItems = [
  { href: '/', label: 'Dashboard' },
  { href: '/parts', label: 'Parts' },
  { href: '/parts/library', label: 'Library' },
  { href: '/practice', label: 'Practice' },
  { href: '/journal', label: 'Journal' },
  { href: '/learn', label: 'Learn' },
] as const;

function isActiveNavItem(href: string, pathname: string): boolean {
  if (href === '/') return pathname === '/';
  if (href === '/parts') {
    return (
      pathname === '/parts' ||
      (pathname.startsWith('/parts/') && !pathname.startsWith('/parts/library'))
    );
  }
  if (href === '/practice') {
    return pathname === '/practice' || pathname.startsWith('/practice/') || pathname === '/session';
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function TopNav() {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-ink/10 bg-ivory/95 backdrop-blur supports-[backdrop-filter]:bg-ivory/85" role="navigation" aria-label="Main navigation">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
              aria-label="SubSelves Home"
            >
              <Image
                src="/logo.png"
                alt="SubSelves"
                width={168}
                height={56}
                className="h-14 w-42 object-contain"
                priority
                unoptimized
              />
            </Link>
            {user ? (
              navItems.map(item => {
                const isActive = isActiveNavItem(item.href, pathname);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-sm transition-colors whitespace-nowrap ${
                      isActive
                        ? 'bg-teal-tint text-teal-deep font-medium'
                        : 'text-ink/65 hover:text-ink hover:bg-teal-tint/60'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              })
            ) : (
              <Link href="/" className="px-3 py-2 rounded-lg text-base font-semibold text-ink whitespace-nowrap">
                SubSelves
              </Link>
            )}
          </div>
          <div className="flex items-center gap-2 ml-2 flex-shrink-0">
            {!loading && !user && (
              <>
                <Link
                  href="/login"
                  className="px-3 py-2 rounded-lg text-sm text-ink/65 hover:text-ink hover:bg-teal-tint/60 transition-colors whitespace-nowrap"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="px-3 py-2 rounded-lg text-sm bg-teal text-ivory hover:bg-teal-deep transition-colors whitespace-nowrap"
                >
                  Create account
                </Link>
              </>
            )}
            {user ? (
              <UserMenu user={user} onLogout={logout} onClose={() => {}} />
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}