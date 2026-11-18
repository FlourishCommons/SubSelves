'use client';

import { useState, useEffect, useCallback } from 'react';
import type { TrustTrial } from '@/lib/types';
import { trustTrialsRepo, seedIfNeeded } from '@/lib/storage/db';

export function useTrust() {
  const [trials, setTrials] = useState<TrustTrial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        await seedIfNeeded();
        const data = await trustTrialsRepo.getAll();
        if (mounted) {
          setTrials(data.sort((a, b) => b.startedAt.localeCompare(a.startedAt)));
        }
      } catch (e) {
        console.error('Failed to load trust trials:', e);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const startTrial = useCallback(async (input: Omit<TrustTrial, 'id' | 'startedAt'>): Promise<TrustTrial> => {
    const newTrial: TrustTrial = {
      ...input,
      id: crypto.randomUUID(),
      startedAt: new Date().toISOString(),
    };
    await trustTrialsRepo.put(newTrial);
    setTrials(prev => [newTrial, ...prev].sort((a, b) => b.startedAt.localeCompare(a.startedAt)));
    return newTrial;
  }, []);

  const endTrial = useCallback(async (id: string, feedback: { selfKeptSafe: boolean; partFeedback?: string }): Promise<void> => {
    const existing = trials.find(t => t.id === id);
    if (!existing) throw new Error('Trust trial not found');
    const updated: TrustTrial = {
      ...existing,
      endedAt: new Date().toISOString(),
      selfKeptSafe: feedback.selfKeptSafe,
      partFeedback: feedback.partFeedback,
    };
    await trustTrialsRepo.put(updated);
    setTrials(prev => prev.map(t => t.id === id ? updated : t));
  }, [trials]);

  const getByPart = useCallback((partId: string) => trials.filter(t => t.partId === partId), [trials]);

  return { trials, startTrial, endTrial, getByPart, loading };
}