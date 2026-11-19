'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import Image from 'next/image';
import { usersRepo } from '@/lib/storage/db';
import type { PublicUser, UserProfile, SharingSettings, User } from '@/lib/types';

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading: authLoading, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    displayName: '',
    bio: '',
    avatar: '',
    publicProfile: false,
    sharingSettings: {
      receiveSharesFrom: 'anyone' as 'anyone' | 'followers' | 'none',
      allowPublicLibrary: false,
      requireApproval: false,
    },
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        displayName: user.displayName,
        bio: (user as any).bio || '',
        avatar: (user as any).avatar || '',
        publicProfile: (user as any).publicProfile || false,
        sharingSettings: (user as any).sharingSettings || {
          receiveSharesFrom: 'anyone',
          allowPublicLibrary: false,
          requireApproval: false,
        },
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (name.startsWith('sharingSettings.')) {
      const key = name.replace('sharingSettings.', '');
      setFormData(prev => ({
        ...prev,
        sharingSettings: { ...prev.sharingSettings, [key]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    setError(null);
    setSuccess(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setError(null);
    try {
      const db = await (await import('@/lib/storage/db')).getDB();
      const tx = db.transaction('users', 'readwrite');
      const currentUser = await tx.store.get(user.id);
      if (!currentUser) throw new Error('User not found');
      const updatedUser: User = {
        ...currentUser,
        displayName: formData.displayName,
        bio: formData.bio,
        avatar: formData.avatar,
        publicProfile: formData.publicProfile,
        sharingSettings: formData.sharingSettings,
        updatedAt: new Date().toISOString(),
      };
      await tx.store.put(updatedUser);
      await tx.done;
      setSuccess('Profile saved successfully');
    } catch (err) {
      console.error(err);
      setError('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        displayName: user.displayName,
        bio: (user as any).bio || '',
        avatar: (user as any).avatar || '',
        publicProfile: (user as any).publicProfile || false,
        sharingSettings: (user as any).sharingSettings || {
          receiveSharesFrom: 'anyone',
          allowPublicLibrary: false,
          requireApproval: false,
        },
      });
    }
    setIsEditing(false);
    setError(null);
    setSuccess(null);
  };

  const initials = user?.displayName
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  if (authLoading) {
    return (
      <main className="flex-1 p-6 flex items-center justify-center">
        <div className="animate-pulse">Loading…</div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex-1 p-6 flex items-center justify-center">
        <p className="text-ink/60">Please log in to view your profile.</p>
      </main>
    );
  }

  return (
    <main className="flex-1 p-6 max-w-3xl mx-auto w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-ink">My Profile</h1>
          <p className="text-ink/60 mt-1">Manage your profile, sharing settings, and privacy preferences.</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-teal text-ivory rounded-lg hover:bg-teal-deep text-sm font-medium"
          >
            Edit Profile
          </button>
        )}
      </div>

      {error && <div className="mb-4 p-3 rounded-lg border border-apricot/30 bg-apricot-tint text-apricot-deep text-sm">{error}</div>}
      {success && <div className="mb-4 p-3 rounded-lg border border-teal/30 bg-teal-tint text-teal-deep text-sm">{success}</div>}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Avatar & Name */}
        <div className="bg-white rounded-xl border border-ink/10 p-6">
          <h2 className="text-lg font-semibold text-ink mb-4">Basic Info</h2>
          <div className="flex items-center gap-4 mb-6">
            {formData.avatar ? (
              <Image src={formData.avatar} alt="" width={96} height={96} className="h-24 w-24 rounded-full object-cover" />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-teal-tint text-2xl font-semibold text-teal-deep">
                {initials}
              </div>
            )}
            <div className="flex-1">
              <label htmlFor="displayName" className="block text-sm font-medium text-ink mb-1">Display Name</label>
              <input
                id="displayName"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal disabled:bg-ivory/50"
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label htmlFor="bio" className="block text-sm font-medium text-ink mb-1">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                disabled={!isEditing}
                rows={4}
                className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal disabled:bg-ivory/50"
                placeholder="Tell others about yourself..."
              />
            </div>
            <div>
              <label htmlFor="avatar" className="block text-sm font-medium text-ink mb-1">Avatar URL</label>
              <input
                id="avatar"
                name="avatar"
                type="url"
                value={formData.avatar}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal disabled:bg-ivory/50"
                placeholder="https://example.com/avatar.png"
              />
            </div>
          </div>
        </div>

        {/* Privacy & Sharing */}
        <div className="bg-white rounded-xl border border-ink/10 p-6">
          <h2 className="text-lg font-semibold text-ink mb-4">Privacy & Sharing</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="publicProfile"
                checked={formData.publicProfile}
                onChange={handleChange}
                disabled={!isEditing}
                className="h-4 w-4 rounded border-ink/15 text-teal focus:ring-2 focus:ring-teal/30"
              />
              <span className="text-ink">Public profile — allow others to find and view your profile</span>
            </label>
            <p className="text-sm text-ink/50 ml-6">When enabled, others can discover your profile and see your shared parts.</p>
          </div>

          <div className="border-t border-ink/10 pt-4 space-y-4">
            <h3 className="font-medium text-ink">Sharing Settings</h3>
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Who can share parts with you?</label>
              <div className="flex flex-wrap gap-3">
                {(['anyone', 'followers', 'none'] as const).map(opt => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="receiveSharesFrom"
                      value={opt}
                      checked={formData.sharingSettings.receiveSharesFrom === opt}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="h-4 w-4 text-teal border-ink/15 focus:ring-2 focus:ring-teal/30"
                    />
                    <span className="text-ink capitalize">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="allowPublicLibrary"
                checked={formData.sharingSettings.allowPublicLibrary}
                onChange={handleChange}
                disabled={!isEditing}
                className="h-4 w-4 rounded border-ink/15 text-teal focus:ring-2 focus:ring-teal/30"
              />
              <label className="text-sm text-ink cursor-pointer">
                Allow my shared parts to appear in the public community library
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="requireApproval"
                checked={formData.sharingSettings.requireApproval}
                onChange={handleChange}
                disabled={!isEditing}
                className="h-4 w-4 rounded border-ink/15 text-teal focus:ring-2 focus:ring-teal/30"
              />
              <label className="text-sm text-ink cursor-pointer">
                Require my approval before shared parts appear in my library
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          {!isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-teal text-ivory rounded-lg hover:bg-teal-deep text-sm font-medium"
            >
              Edit Profile
            </button>
          )}
          {isEditing && (
            <>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-ink/15 rounded-lg hover:bg-teal-tint/60 text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-teal text-ivory rounded-lg hover:bg-teal-deep disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
              >
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
            </>
          )}
        </div>
      </form>
    </main>
  );
}