'use client';

import { useEffect, useSyncExternalStore, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';

const PUBLIC_PATHS = new Set(['/', '/login', '/register', '/donate', '/source-map']);

function subscribeToNothing(): () => void {
  return () => {};
}

function useMounted(): boolean {
  return useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false
  );
}

export function AuthLoading() {
  return (
    <main className="flex-1 p-6 flex items-center justify-center" aria-live="polite">
      <p className="text-ink/60">Loading…</p>
    </main>
  );
}

export function AuthGate({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const mounted = useMounted();
  const isPublic = PUBLIC_PATHS.has(pathname);

  useEffect(() => {
    if (!mounted || loading || isPublic || user) return;
    router.replace('/login');
  }, [mounted, loading, isPublic, user, router]);

  if (!mounted) {
    return <AuthLoading />;
  }

  if (isPublic) {
    return <>{children}</>;
  }

  if (loading || !user) {
    return <AuthLoading />;
  }

  return <>{children}</>;
}
