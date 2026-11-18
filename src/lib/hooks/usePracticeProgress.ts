'use client';

import { useState, useEffect, useCallback } from 'react';
import type { PracticeProgress, PracticeKind } from '@/lib/types';
import { practiceProgressRepo, seedIfNeeded } from '@/lib/storage/db';

export function usePracticeProgress(): {
  progress: PracticeProgress[];
  getProgress(kind: PracticeKind): PracticeProgress | undefined;
  saveProgress(p: PracticeProgress): Promise<void>;
  clearProgress(kind: PracticeKind): Promise<void>;
  loading: boolean;
} {
  const [progress, setProgress] = useState<PracticeProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        await seedIfNeeded();
        const data = await practiceProgressRepo.getAll();
        if (mounted) {
          setProgress(data.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)));
        }
      } catch (e) {
        console.error('Failed to load practice progress:', e);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const getProgress = useCallback((kind: PracticeKind) => progress.find(p => p.id === kind), [progress]);

  const saveProgress = useCallback(async (p: PracticeProgress): Promise<void> => {
    await practiceProgressRepo.put(p);
    setProgress(prev => {
      const existing = prev.findIndex(item => item.id === p.id);
      if (existing >= 0) {
        const next = [...prev];
        next[existing] = p;
        return next.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
      }
      return [p, ...prev].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    });
  }, []);

  const clearProgress = useCallback(async (kind: PracticeKind): Promise<void> => {
    await practiceProgressRepo.delete(kind);
    setProgress(prev => prev.filter(p => p.id !== kind));
  }, []);

  return { progress, getProgress, saveProgress, clearProgress, loading };
}