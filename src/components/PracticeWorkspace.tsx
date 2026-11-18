'use client';

import { useState, useMemo } from 'react';
import { useParts } from '@/lib/hooks/useParts';
import { usePracticeProgress } from '@/lib/hooks/usePracticeProgress';
import type { PracticeKind, PracticeProgress } from '@/lib/types';
import { PracticePickerView } from '@/components/PracticePickerView';
import { SessionRunner } from '@/components/SessionRunner';

const allPracticeKinds: PracticeKind[] = [
  'goingInside',
  'dialogue',
  'selfEnergy',
  'unblending',
  'rescuing',
  'reassignment',
  'safeHaven',
  'teamwork',
];

export function PracticeWorkspace() {
  const { loading: partsLoading } = useParts();
  const { getProgress, clearProgress, loading: progressLoading } = usePracticeProgress();
  const [activeKind, setActiveKind] = useState<PracticeKind | null>(null);

  const progressMap = useMemo(() => {
    const map: Record<PracticeKind, PracticeProgress | undefined> = {} as Record<PracticeKind, PracticeProgress | undefined>;
    for (const kind of allPracticeKinds) {
      map[kind] = getProgress(kind);
    }
    return map;
  }, [getProgress]);

  const handleStart = (kind: PracticeKind) => {
    setActiveKind(kind);
  };

  const handleResume = (kind: PracticeKind) => {
    setActiveKind(kind);
  };

  const handleRestart = async (kind: PracticeKind) => {
    await clearProgress(kind);
    setActiveKind(kind);
  };

  const handleExit = () => {
    setActiveKind(null);
  };

  if (partsLoading || progressLoading) {
    return (
      <main className="flex-1 p-6 flex items-center justify-center">
        <div className="animate-pulse">Loading…</div>
      </main>
    );
  }

  return (
    <div className="flex-1 max-w-3xl mx-auto w-full">
      {activeKind ? (
        <SessionRunner kind={activeKind} onExit={handleExit} />
      ) : (
        <PracticePickerView
          practices={allPracticeKinds}
          progressMap={progressMap}
          onStart={handleStart}
          onResume={handleResume}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
