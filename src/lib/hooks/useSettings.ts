'use client';

import { useState, useEffect, useCallback } from 'react';
import type { UserSettings } from '@/lib/types';
import { settingsRepo, seedIfNeeded } from '@/lib/storage/db';

export function useSettings() {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        await seedIfNeeded();
        const data = await settingsRepo.get('user');
        if (mounted) {
          setSettings(data ?? { id: 'user', onboardingComplete: false, spiritualityEnabled: false });
        }
      } catch (e) {
        console.error('Failed to load settings:', e);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const save = useCallback(async (patch: Partial<UserSettings>): Promise<void> => {
    const current = settings ?? { id: 'user', onboardingComplete: false, spiritualityEnabled: false };
    const updated = { ...current, ...patch, id: 'user' };
    await settingsRepo.put(updated);
    setSettings(updated);
  }, [settings]);

  return { settings, save, loading };
}