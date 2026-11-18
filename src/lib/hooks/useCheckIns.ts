'use client';

import { useState, useEffect, useCallback } from 'react';
import type { CheckIn } from '@/lib/types';
import { checkInsRepo, seedIfNeeded } from '@/lib/storage/db';

export function useCheckIns() {
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        await seedIfNeeded();
        const data = await checkInsRepo.getAll();
        if (mounted) {
          setCheckIns(data.sort((a, b) => b.date.localeCompare(a.date)));
        }
      } catch (e) {
        console.error('Failed to load check-ins:', e);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const addCheckIn = useCallback(async (input: Omit<CheckIn, 'id'>): Promise<CheckIn> => {
    const newCheckIn: CheckIn = {
      ...input,
      id: crypto.randomUUID(),
    };
    await checkInsRepo.put(newCheckIn);
    setCheckIns(prev => [newCheckIn, ...prev].sort((a, b) => b.date.localeCompare(a.date)));
    return newCheckIn;
  }, []);

  return { checkIns, addCheckIn, loading };
}