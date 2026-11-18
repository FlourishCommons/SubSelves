'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Part, PartGroup } from '@/lib/types';
import { partsRepo, seedIfNeeded } from '@/lib/storage/db';

export function useParts() {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        await seedIfNeeded();
        const data = await partsRepo.getAll();
        if (mounted) {
          setParts(data);
        }
      } catch (e) {
        console.error('Failed to load parts:', e);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const addPart = useCallback(async (input: Omit<Part, 'id' | 'createdAt'>): Promise<Part> => {
    const newPart: Part = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    await partsRepo.put(newPart);
    setParts(prev => [...prev, newPart]);
    return newPart;
  }, []);

  const updatePart = useCallback(async (id: string, patch: Partial<Part>): Promise<void> => {
    const existing = parts.find(p => p.id === id);
    if (!existing) throw new Error('Part not found');
    const updated = { ...existing, ...patch, updatedAt: new Date().toISOString() };
    await partsRepo.put(updated);
    setParts(prev => prev.map(p => p.id === id ? updated : p));
  }, [parts]);

  const removePart = useCallback(async (id: string): Promise<void> => {
    await partsRepo.delete(id);
    setParts(prev => prev.filter(p => p.id !== id));
  }, []);

  const getByGroup = useCallback((group: PartGroup) => parts.filter(p => p.group === group), [parts]);

  return { parts, addPart, updatePart, removePart, getByGroup, loading };
}