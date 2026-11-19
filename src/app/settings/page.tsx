'use client';

import { useState } from 'react';
import { useSettings } from '@/lib/hooks/useSettings';
import { exportBackup, downloadBackup, validateBackup, importBackup, eraseAllData, getBackupSummary } from '@/lib/storage/backup';
import type { BackupData } from '@/lib/storage/backup';

export default function SettingsPage() {
  const { save, loading } = useSettings();
  const [displayName, setDisplayName] = useState('');
  const [spiritualityEnabled, setSpiritualityEnabled] = useState(false);
  const [importConfirm, setImportConfirm] = useState(false);
  const [pendingBackup, setPendingBackup] = useState<BackupData | null>(null);
  const [eraseConfirmStep, setEraseConfirmStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const handleDisplayNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    clearMessages();
    const value = e.target.value;
    setDisplayName(value);
    await save({ displayName: value || undefined });
    setSuccess('Display name updated');
  };

  const handleSpiritualityToggle = async () => {
    clearMessages();
    const newValue = !spiritualityEnabled;
    setSpiritualityEnabled(newValue);
    await save({ spiritualityEnabled: newValue });
    setSuccess(newValue ? 'Spirituality module enabled' : 'Spirituality module disabled');
  };

  const handleExport = async () => {
    clearMessages();
    try {
      const backup = await exportBackup();
      downloadBackup(backup);
      setSuccess('Backup downloaded successfully');
    } catch (err) {
      setError(`Export failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearMessages();
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (!validateBackup(json)) {
          setError('Invalid backup file: not an SubSelves backup or wrong version');
          return;
        }
        setPendingBackup(json);
        setImportConfirm(true);
      } catch {
        setError('Invalid backup file: could not parse JSON');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleImportConfirm = async () => {
    if (!pendingBackup) return;
    clearMessages();
    try {
      await importBackup(pendingBackup);
      setSuccess('Backup imported successfully. Reload the page to see changes.');
      setPendingBackup(null);
      setImportConfirm(false);
    } catch (err) {
      setError(`Import failed: ${err instanceof Error ? err.message : 'Unknown error'}. Your existing data was not modified.`);
    }
  };

  const handleImportCancel = () => {
    setPendingBackup(null);
    setImportConfirm(false);
  };

  const handleEraseClick = () => {
    clearMessages();
    if (eraseConfirmStep === 0) {
      setEraseConfirmStep(1);
    } else if (eraseConfirmStep === 1) {
      setEraseConfirmStep(2);
    }
  };

  const handleEraseConfirm = async () => {
    clearMessages();
    try {
      await eraseAllData();
      await save({ displayName: undefined, spiritualityEnabled: false });
      setSuccess('All data erased. The page will reload.');
      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      setError(`Erase failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setEraseConfirmStep(0);
    }
  };

  const handleEraseCancel = () => {
    setEraseConfirmStep(0);
  };

  if (loading) {
    return (
      <main className="flex-1 p-6 flex items-center justify-center">
        <div className="animate-pulse text-ink/60">Loading settings…</div>
      </main>
    );
  }

  return (
    <main className="flex-1 p-6 max-w-2xl mx-auto w-full space-y-8">
      <header>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-ink/65 mt-1">Manage your profile, preferences, and data</p>
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

      <section className="bg-white rounded-xl border border-ink/10 p-6 space-y-6" aria-labelledby="profile-heading">
        <h2 id="profile-heading" className="text-lg font-semibold">Profile</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium mb-1">Display Name</label>
            <input
              id="displayName"
              type="text"
              value={displayName}
              onChange={handleDisplayNameChange}
              className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
              placeholder="Your name (optional)"
            />
            <p className="text-xs text-ink/60 mt-1">Shown on the dashboard and in exports</p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-ink/10 p-6 space-y-6" aria-labelledby="preferences-heading">
        <h2 id="preferences-heading" className="text-lg font-semibold">Preferences</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="block font-medium">Spirituality Module</label>
              <p className="text-sm text-ink/60">Enable Guiding Presence parts and Safe Haven features</p>
            </div>
            <button
              role="switch"
              aria-checked={spiritualityEnabled}
              onClick={handleSpiritualityToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                spiritualityEnabled ? 'bg-teal' : 'bg-ink/10 '
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  spiritualityEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-ink/10 p-6 space-y-6" aria-labelledby="backup-heading">
        <h2 id="backup-heading" className="text-lg font-semibold">Backup & Restore</h2>
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              onClick={handleExport}
              className="px-4 py-3 border border-ink/10 rounded-lg hover:bg-teal-tint/60 text-left transition-colors"
            >
              <h3 className="font-medium">Export Backup</h3>
              <p className="text-sm text-ink/60 mt-1">Download all your data as a JSON file</p>
            </button>
            <div className="relative">
              <input
                type="file"
                accept="application/json"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="Import backup file"
              />
              <button
                className="w-full px-4 py-3 border border-ink/10 rounded-lg hover:bg-teal-tint/60 text-left transition-colors"
              >
                <h3 className="font-medium">Import Backup</h3>
                <p className="text-sm text-ink/60 mt-1">Restore from a previously exported JSON file</p>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-ink/10 p-6 space-y-6 border-apricot/30" aria-labelledby="danger-heading">
        <h2 id="danger-heading" className="text-lg font-semibold text-apricot-deep">Danger Zone</h2>
        <div className="space-y-4">
          <p className="text-sm text-ink/65">
            This action cannot be undone. It will permanently delete all parts, check-ins, journal entries, practice sessions, and settings.
          </p>
          {eraseConfirmStep === 0 && (
            <button
              onClick={handleEraseClick}
              className="px-4 py-2 bg-apricot-deep text-ivory rounded-lg hover:bg-ink transition-colors"
            >
              Erase All Data
            </button>
          )}
          {eraseConfirmStep === 1 && (
            <div className="flex gap-3">
              <button
                onClick={handleEraseClick}
                className="px-4 py-2 bg-apricot-deep text-ivory rounded-lg hover:bg-ink transition-colors"
              >
                I Understand — Confirm Erase
              </button>
              <button
                onClick={handleEraseCancel}
                className="px-4 py-2 border border-ink/15 rounded-lg hover:bg-teal-tint/60"
              >
                Cancel
              </button>
            </div>
          )}
          {eraseConfirmStep === 2 && (
            <div className="flex gap-3">
              <button
                onClick={handleEraseConfirm}
                className="px-4 py-2 bg-apricot-deep text-ivory rounded-lg hover:bg-ink transition-colors"
              >
                YES — Delete Everything
              </button>
              <button
                onClick={handleEraseCancel}
                className="px-4 py-2 border border-ink/15 rounded-lg hover:bg-teal-tint/60"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </section>

      {importConfirm && pendingBackup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" aria-labelledby="import-confirm-title">
          <div className="bg-white rounded-xl border border-ink/10 p-6 max-w-md w-full space-y-4">
            <h3 id="import-confirm-title" className="text-lg font-semibold">Confirm Import</h3>
            <pre className="whitespace-pre-wrap text-sm text-ink/75 bg-ivory p-4 rounded-lg max-h-60 overflow-auto">
              {getBackupSummary(pendingBackup)}
            </pre>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleImportCancel}
                className="px-4 py-2 border border-ink/15 rounded-lg hover:bg-teal-tint/60"
              >
                Cancel
              </button>
              <button
                onClick={handleImportConfirm}
                className="px-4 py-2 bg-teal text-ivory rounded-lg hover:bg-teal-deep"
              >
                Import
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}