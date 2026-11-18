'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';

export default function LoginPage() {
  const { login, user, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace('/');
    }
  }, [loading, user, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await login({ email, password });
      router.replace('/');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Unable to log in.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex-1 p-6 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-ink/65 mt-2">
            Log in to continue exploring your inner system.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border border-ink/10 p-6 space-y-5"
        >
          {error && (
            <div
              className="bg-apricot-tint border border-apricot/30 rounded-lg p-3"
              role="alert"
            >
              <p className="text-sm text-apricot-deep">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full px-4 py-2.5 bg-teal text-ivory rounded-lg hover:bg-teal-deep disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? 'Logging in…' : 'Log in'}
          </button>

          <p className="text-sm text-center text-ink/65">
            Need an account?{' '}
            <Link href="/register" className="text-teal-deep hover:underline font-medium">
              Create one
            </Link>
          </p>
        </form>

        <p className="text-xs text-center text-ink/60 mt-4">
          Accounts are stored only in this browser. Your password is hashed before it is saved.
        </p>
      </div>
    </main>
  );
}
