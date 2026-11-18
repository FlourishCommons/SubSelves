'use client';

import { useState, useEffect, useCallback } from 'react';
import type { PracticeSession, PracticeKind, JourneyPhase } from '@/lib/types';
import { practiceRepo, seedIfNeeded } from '@/lib/storage/db';

export function useSessions() {
  const [sessions, setSessions] = useState<PracticeSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        await seedIfNeeded();
        const data = await practiceRepo.getAll();
        if (mounted) {
          setSessions(data.sort((a, b) => b.completedAt.localeCompare(a.completedAt)));
        }
      } catch (e) {
        console.error('Failed to load practice sessions:', e);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const logSession = useCallback(async (input: Omit<PracticeSession, 'id' | 'completedAt'>): Promise<PracticeSession> => {
    const newSession: PracticeSession = {
      ...input,
      id: crypto.randomUUID(),
      completedAt: new Date().toISOString(),
    };
    await practiceRepo.put(newSession);
    setSessions(prev => [newSession, ...prev].sort((a, b) => b.completedAt.localeCompare(a.completedAt)));
    return newSession;
  }, []);

  const getByKind = useCallback((kind: PracticeKind) => sessions.filter(s => s.kind === kind), [sessions]);
  const getByPhase = useCallback((phase: JourneyPhase) => sessions.filter(s => s.phase === phase), [sessions]);
  const getByTargetPart = useCallback((partId: string) => sessions.filter(s => s.targetPartIds?.includes(partId)), [sessions]);

  return { sessions, logSession, getByKind, getByPhase, getByTargetPart, loading };
}