'use client';

import { useState, useEffect, useCallback } from 'react';
import type { PartGroup } from '@/lib/types';
import { checkInsRepo, journalRepo, partsRepo, practiceRepo, seedIfNeeded } from '@/lib/storage/db';

export function useProgress() {
  const [streakDays, setStreakDays] = useState(0);
  const [totals, setTotals] = useState({ checkIns: 0, journals: 0, parts: 0, practices: 0 });
  const [mostActiveGroups, setMostActiveGroups] = useState<{ group: PartGroup; count: number }[]>([]);
  const [selfLedEpisodes, setSelfLedEpisodes] = useState(0);
  const [blendingFrequency, setBlendingFrequency] = useState<{ date: string; count: number }[]>([]);
  const [trustDeltas, setTrustDeltas] = useState<{ partId: string; partName: string; delta: number }[]>([]);
  const [phaseCompletion, setPhaseCompletion] = useState<{ phase: number; completed: boolean }[]>([]);
  const [loading, setLoading] = useState(true);

  const recalc = useCallback(async () => {
    try {
      await seedIfNeeded();
      const [checkIns, journals, parts, practices] = await Promise.all([
        checkInsRepo.getAll(),
        journalRepo.getAll(),
        partsRepo.getAll(),
        practiceRepo.getAll(),
      ]);

      setTotals({
        checkIns: checkIns.length,
        journals: journals.length,
        parts: parts.length,
        practices: practices.length,
      });

      // Calculate streak days from check-ins
      const sortedCheckIns = checkIns
        .map(ci => new Date(ci.date).toISOString().split('T')[0])
        .filter((v, i, a) => a.indexOf(v) === i)
        .sort()
        .reverse();

      let streak = 0;
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      
      if (sortedCheckIns[0] === today || sortedCheckIns[0] === yesterday) {
        streak = 1;
        for (let i = 1; i < sortedCheckIns.length; i++) {
          const expected = new Date(sortedCheckIns[i - 1]).getTime() - 86400000;
          const expectedStr = new Date(expected).toISOString().split('T')[0];
          if (sortedCheckIns[i] === expectedStr) streak++;
          else break;
        }
      }
      setStreakDays(streak);

      // Most active groups from parts
      const groupCounts: Record<PartGroup, number> = { manager: 0, guardian: 0, innerKid: 0, spiritual: 0 };
      parts.forEach(p => { groupCounts[p.group]++; });
      setMostActiveGroups(
        Object.entries(groupCounts)
          .map(([group, count]) => ({ group: group as PartGroup, count }))
          .sort((a, b) => b.count - a.count)
      );

      // Self-led episodes (from check-ins and practice sessions)
      const selfLedCheckIns = checkIns.filter(ci => ci.selfLed).length;
      const selfLedPractices = practices.filter(p => p.selfLed).length;
      setSelfLedEpisodes(selfLedCheckIns + selfLedPractices);

      // Blending frequency trend (last 14 days)
      const last14Days = [...Array(14)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().split('T')[0];
      }).reverse();
      
      const blendingByDate: Record<string, number> = {};
      last14Days.forEach(d => { blendingByDate[d] = 0; });
      checkIns.forEach(ci => {
        if (ci.blended && blendingByDate[ci.date] !== undefined) {
          blendingByDate[ci.date]++;
        }
      });
      setBlendingFrequency(Object.entries(blendingByDate).map(([date, count]) => ({ date, count })));

      // Trust deltas (simplified - compare current trustLevel to a baseline)
      // In a real implementation, you'd track history. Here we just show current levels.
      const trustData = parts
        .filter(p => p.trustLevel !== undefined)
        .map(p => ({ partId: p.id, partName: p.name, delta: (p.trustLevel ?? 0) - 2 })) // baseline 2
        .sort((a, b) => b.delta - a.delta);
      setTrustDeltas(trustData);

      // Phase completion (derived from practice sessions by phase)
      const phases = [1, 2, 3, 4, 5] as const;
      const phaseDone = phases.map(phase => ({
        phase,
        completed: practices.some(p => p.phase === phase),
      }));
      setPhaseCompletion(phaseDone);

    } catch (e) {
      console.error('Failed to calculate progress:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional data loading on mount
    recalc();
  }, [recalc]);

  return { 
    streakDays, 
    totals, 
    mostActiveGroups, 
    selfLedEpisodes, 
    blendingFrequency, 
    trustDeltas, 
    phaseCompletion, 
    loading, 
    recalc 
  };
}