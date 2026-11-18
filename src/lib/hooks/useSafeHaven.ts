'use client';

import { useState, useEffect, useCallback } from 'react';
import type { SafeHaven } from '@/lib/types';
import { havenRepo, seedIfNeeded } from '@/lib/storage/db';

export function useSafeHaven() {
  const [haven, setHaven] = useState<SafeHaven | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        await seedIfNeeded();
        const data = await havenRepo.getAll();
        if (mounted && data.length > 0) {
          setHaven(data[0]);
        }
      } catch (e) {
        console.error('Failed to load safe haven:', e);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const saveHaven = useCallback(async (input: Omit<SafeHaven, 'id' | 'updatedAt'>): Promise<SafeHaven> => {
    const existing = haven;
    const newHaven: SafeHaven = {
      ...input,
      id: existing?.id ?? crypto.randomUUID(),
      updatedAt: new Date().toISOString(),
    };
    await havenRepo.put(newHaven);
    setHaven(newHaven);
    return newHaven;
  }, [haven]);

  return { haven, saveHaven, loading };
}