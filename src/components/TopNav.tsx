'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';

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
              aria-label="InnerHarmony Home"
            >
              <Image
                src="/logo.png"
                alt="InnerHarmony"
                width={28}
                height={28}
                className="h-7 w-7 rounded-full object-cover"
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
                InnerHarmony
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
            {user && (
              <>
                <Link
                  href="/account"
                  className="max-w-32 truncate px-3 py-2 rounded-lg text-sm text-ink/65 hover:text-ink hover:bg-teal-tint/60 transition-colors"
                  aria-label="Account settings"
                >
                  {user.displayName}
                </Link>
                <button
                  type="button"
                  onClick={() => logout()}
                  className="px-3 py-2 rounded-lg text-sm text-ink/65 hover:text-ink hover:bg-teal-tint/60 transition-colors whitespace-nowrap"
                >
                  Log out
                </button>
                <Link
                  href="/settings"
                  className="flex items-center justify-center px-3 py-2 rounded-lg text-ink/65 hover:text-ink hover:bg-teal-tint/60 transition-colors whitespace-nowrap"
                  aria-label="Settings"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}