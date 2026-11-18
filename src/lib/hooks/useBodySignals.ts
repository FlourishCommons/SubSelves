'use client';

import { useState, useEffect, useCallback } from 'react';
import type { BodySignal } from '@/lib/types';
import { bodySignalsRepo, seedIfNeeded } from '@/lib/storage/db';

export function useBodySignals() {
  const [signals, setSignals] = useState<BodySignal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        await seedIfNeeded();
        const data = await bodySignalsRepo.getAll();
        if (mounted) {
          setSignals(data.sort((a, b) => b.date.localeCompare(a.date)));
        }
      } catch (e) {
        console.error('Failed to load body signals:', e);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const addSignal = useCallback(async (input: Omit<BodySignal, 'id'>): Promise<BodySignal> => {
    const newSignal: BodySignal = {
      ...input,
      id: crypto.randomUUID(),
    };
    await bodySignalsRepo.put(newSignal);
    setSignals(prev => [newSignal, ...prev].sort((a, b) => b.date.localeCompare(a.date)));
    return newSignal;
  }, []);

  const removeSignal = useCallback(async (id: string): Promise<void> => {
    await bodySignalsRepo.delete(id);
    setSignals(prev => prev.filter(s => s.id !== id));
  }, []);

  const getByPart = useCallback((partId: string) => signals.filter(s => s.partId === partId), [signals]);

  return { signals, addSignal, removeSignal, getByPart, loading };
}