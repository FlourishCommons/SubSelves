'use client';

import { useState, useEffect, useCallback } from 'react';
import type { CouncilMeeting } from '@/lib/types';
import { councilsRepo, seedIfNeeded } from '@/lib/storage/db';

export function useCouncils() {
  const [meetings, setMeetings] = useState<CouncilMeeting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        await seedIfNeeded();
        const data = await councilsRepo.getAll();
        if (mounted) {
          setMeetings(data.sort((a, b) => b.date.localeCompare(a.date)));
        }
      } catch (e) {
        console.error('Failed to load council meetings:', e);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const addMeeting = useCallback(async (input: Omit<CouncilMeeting, 'id'>): Promise<CouncilMeeting> => {
    const newMeeting: CouncilMeeting = {
      ...input,
      id: crypto.randomUUID(),
    };
    await councilsRepo.put(newMeeting);
    setMeetings(prev => [newMeeting, ...prev].sort((a, b) => b.date.localeCompare(a.date)));
    return newMeeting;
  }, []);

  const updateMeeting = useCallback(async (id: string, patch: Partial<CouncilMeeting>): Promise<void> => {
    const existing = meetings.find(m => m.id === id);
    if (!existing) throw new Error('Council meeting not found');
    const updated = { ...existing, ...patch };
    await councilsRepo.put(updated);
    setMeetings(prev => prev.map(m => m.id === id ? updated : m));
  }, [meetings]);

  const removeMeeting = useCallback(async (id: string): Promise<void> => {
    await councilsRepo.delete(id);
    setMeetings(prev => prev.filter(m => m.id !== id));
  }, []);

  return { meetings, addMeeting, updateMeeting, removeMeeting, loading };
}