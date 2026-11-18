'use client';

import { useState, useEffect, useCallback } from 'react';
import type { JournalEntry } from '@/lib/types';
import { journalRepo, seedIfNeeded } from '@/lib/storage/db';

export function useJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        await seedIfNeeded();
        const data = await journalRepo.getAll();
        if (mounted) {
          setEntries(data.sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
        }
      } catch (e) {
        console.error('Failed to load journal entries:', e);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const addEntry = useCallback(async (input: Omit<JournalEntry, 'id' | 'createdAt'>): Promise<JournalEntry> => {
    const newEntry: JournalEntry = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    await journalRepo.put(newEntry);
    setEntries(prev => [newEntry, ...prev].sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
    return newEntry;
  }, []);

  const removeEntry = useCallback(async (id: string): Promise<void> => {
    await journalRepo.delete(id);
    setEntries(prev => prev.filter(e => e.id !== id));
  }, []);

  return { entries, addEntry, removeEntry, loading };
}