'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import type { PublicUser } from '@/lib/types';

function formatCreatedAt(value: string): string {
  return new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function AccountPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main className="flex-1 p-6 flex items-center justify-center">
        <p className="text-ink/60">Loading account…</p>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return <AccountSettings key={user.id} user={user} />;
}

function AccountSettings({ user }: { user: PublicUser }) {
  const { updateUser, deleteUser } = useAuth();
  const router = useRouter();

  const [displayName, setDisplayName] = useState(user.displayName);
  const [email, setEmail] = useState(user.email);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteStep, setDeleteStep] = useState(0);
  const [deleting, setDeleting] = useState(false);

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);
    setSuccess(null);

    if (newPassword && newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    setSubmitting(true);

    try {
      await updateUser(user.id, {
        displayName,
        email,
        password: newPassword || undefined,
      });
      setNewPassword('');
      setConfirmPassword('');
      setSuccess('Account updated.');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Unable to update account.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    setError(null);
    setDeleting(true);

    try {
      await deleteUser(user.id);
      router.replace('/');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Unable to delete account.');
      setDeleting(false);
    }
  }

  return (
    <main className="flex-1 p-6 max-w-2xl mx-auto w-full space-y-8">
      <header>
        <h1 className="text-2xl font-bold">Account</h1>
        <p className="text-ink/65 mt-1">
          Manage the local account for this browser.
        </p>
      </header>

      {error && (
        <div className="bg-apricot-tint border border-apricot/30 rounded-xl p-4" role="alert">
          <p className="text-apricot-deep">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-sage-tint border border-sage/30 rounded-xl p-4" role="status">
          <p className="text-sage-deep">{success}</p>
        </div>
      )}

      <section className="bg-white rounded-xl border border-ink/10 p-6 space-y-6" aria-labelledby="account-details-heading">
        <h2 id="account-details-heading" className="text-lg font-semibold">Profile</h2>
        <p className="text-sm text-ink/60">
          Signed in as <span className="font-medium text-ink/75">{user.displayName}</span>
          {' '}since {formatCreatedAt(user.createdAt)}.
        </p>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label htmlFor="accountDisplayName" className="block text-sm font-medium mb-1">
              Display name
            </label>
            <input
              id="accountDisplayName"
              type="text"
              required
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
            />
          </div>

          <div>
            <label htmlFor="accountEmail" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="accountEmail"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                New password
              </label>
              <input
                id="newPassword"
                type="password"
                autoComplete="new-password"
                minLength={8}
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                placeholder="Leave blank to keep current"
                className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
              />
            </div>
            <div>
              <label htmlFor="confirmNewPassword" className="block text-sm font-medium mb-1">
                Confirm new password
              </label>
              <input
                id="confirmNewPassword"
                type="password"
                autoComplete="new-password"
                minLength={8}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Repeat new password"
                className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-teal text-ivory rounded-lg hover:bg-teal-deep disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? 'Saving…' : 'Save changes'}
          </button>
        </form>
      </section>

      <section className="bg-white rounded-xl border border-apricot/30 p-6 space-y-4" aria-labelledby="delete-account-heading">
        <h2 id="delete-account-heading" className="text-lg font-semibold text-apricot-deep">
          Delete account
        </h2>
        <p className="text-sm text-ink/65">
          This removes the account from this browser and signs you out. Your parts, check-ins,
          journal entries, and settings are not deleted.
        </p>

        {deleteStep === 0 && (
          <button
            type="button"
            onClick={() => setDeleteStep(1)}
            className="px-4 py-2 bg-apricot-deep text-ivory rounded-lg hover:bg-ink transition-colors"
          >
            Delete account
          </button>
        )}

        {deleteStep === 1 && (
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="px-4 py-2 bg-apricot-deep text-ivory rounded-lg hover:bg-ink disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {deleting ? 'Deleting…' : 'Confirm delete account'}
            </button>
            <button
              type="button"
              onClick={() => setDeleteStep(0)}
              disabled={deleting}
              className="px-4 py-2 border border-ink/15 rounded-lg hover:bg-teal-tint/60 disabled:opacity-60"
            >
              Cancel
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
