'use client';

import { useCallback } from 'react';
import type { PracticeKind } from '@/lib/types';
import { getPractice } from '@/content/practice';
import { getPracticeSteps } from '@/content/practiceSteps';
import type { PracticeProgress } from '@/lib/types';

interface PracticePickerViewProps {
  practices: PracticeKind[];
  progressMap: Record<PracticeKind, PracticeProgress | undefined>;
  onStart: (kind: PracticeKind) => void;
  onResume: (kind: PracticeKind) => void;
  onRestart: (kind: PracticeKind) => void;
}

const practiceOrder: PracticeKind[] = [
  'goingInside',
  'dialogue',
  'selfEnergy',
  'unblending',
  'rescuing',
  'reassignment',
  'safeHaven',
  'teamwork',
];

export function PracticePickerView({
  practices: _practices,
  progressMap,
  onStart,
  onResume,
  onRestart,
}: PracticePickerViewProps) {
  // Use the defined order, filtering to only available practices
  const orderedPractices = practiceOrder.filter(k => _practices.includes(k));

  const handleStart = useCallback((kind: PracticeKind) => {
    onStart(kind);
  }, [onStart]);

  const handleResume = useCallback((kind: PracticeKind) => {
    onResume(kind);
  }, [onResume]);

  const handleRestart = useCallback((kind: PracticeKind) => {
    if (confirm('Start this practice over? Your current progress will be cleared.')) {
      onRestart(kind);
    }
  }, [onRestart]);

  return (
    <main className="flex-1 p-6 max-w-3xl mx-auto w-full space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">Practice Library</h1>
        <p className="text-ink/65">
          Guided practices for Self-leadership. Choose one to begin, select the parts involved, and move through it step by step. Your progress is saved automatically.
        </p>
      </header>

      <section aria-labelledby="practice-list-heading" className="space-y-4">
        <h2 id="practice-list-heading" className="text-lg font-semibold">Available Practices</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {orderedPractices.map(kind => {
            const practice = getPractice(kind);
            const progress = progressMap[kind];
            const steps = getPracticeSteps(kind);
            const totalSteps = steps.length;
            const currentStep = progress?.stepIndex ?? 0;
            const hasProgress = !!progress;

            return (
              <div
                key={kind}
                className={`p-6 rounded-xl border-2 text-left transition-all ${
                  hasProgress
                    ? 'border-teal bg-teal-tint '
                    : 'border-ink/10 hover:border-teal/40 bg-white '
                }`}
              >
                <h3 className="font-semibold text-lg">{practice.title}</h3>
                <p className="text-sm text-ink/60 mt-1">{practice.description}</p>
                <p className="text-xs text-ink/50 mt-2">
                  ~{Math.round(practice.suggestedDurationSec / 60)} min • {totalSteps} steps
                </p>
                <button
                  type="button"
                  onClick={() => (hasProgress ? handleResume(kind) : handleStart(kind))}
                  className="w-full px-4 py-2 mt-3 text-left font-medium rounded-lg bg-teal text-ivory hover:bg-teal-deep"
                >
                  {hasProgress ? 'Resume practice' : 'Start practice'}
                </button>
                {hasProgress && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-teal-deep font-medium">
                        Resume · Step {currentStep + 1} of {totalSteps}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={e => { e.stopPropagation(); handleRestart(kind); }}
                      className="text-sm text-teal-deep hover:underline"
                    >
                      Start over
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}