'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useParts } from '@/lib/hooks/useParts';
import { useJournal } from '@/lib/hooks/useJournal';
import { useSessions } from '@/lib/hooks/useSessions';
import { usePracticeProgress } from '@/lib/hooks/usePracticeProgress';
import { getPractice } from '@/content/practice';
import { getPracticeSteps } from '@/content/practiceSteps';
import type { PracticeKind, PracticeProgress } from '@/lib/types';
import { InstructionStepView } from './InstructionStepView';
import { ChoosePartStepView } from './ChoosePartStepView';
import { JournalStepView } from './JournalStepView';
import { ReflectionStepView } from './ReflectionStepView';
import { CompletionView } from './CompletionView';
import { PartsDrawer } from './PartsDrawer';

interface SessionRunnerProps {
  kind: PracticeKind;
  onExit: () => void;
}

export function SessionRunner({ kind, onExit }: SessionRunnerProps) {
  // Hooks
  const { parts, loading: partsLoading } = useParts();
  const { addEntry } = useJournal();
  const { logSession } = useSessions();
  const { progress: allProgress, saveProgress, clearProgress, loading: progressLoading } = usePracticeProgress();

  // Get current practice progress
  const progress = allProgress.find(p => p.id === kind);
  const steps = getPracticeSteps(kind);
  const practice = getPractice(kind);

  // State
  const [stepIndex, setStepIndex] = useState(progress?.stepIndex ?? 0);
  const [partSelections, setPartSelections] = useState<Record<string, string[]>>(progress?.partSelections ?? {});
  const [journalEntryIds, setJournalEntryIds] = useState<Record<string, string>>(progress?.journalEntryIds ?? {});
  const [reflection, setReflection] = useState(progress?.reflection ?? '');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [completed, setCompleted] = useState(false);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (startTimeRef.current === null) {
      startTimeRef.current = Date.now();
    }
  }, []);

  // Derived state
  const currentStep = steps[stepIndex];
  const isLastStep = stepIndex === steps.length - 1;
  const canGoBack = stepIndex > 0;
  const lastChosenPartId = Object.values(partSelections).flat().pop();

  const currentProgress: PracticeProgress = {
    id: kind,
    kind,
    stepIndex,
    partSelections,
    journalEntryIds,
    reflection,
    startedAt: progress?.startedAt ?? new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const hasActivity =
    stepIndex > 0 ||
    Object.keys(partSelections).length > 0 ||
    Object.keys(journalEntryIds).length > 0 ||
    reflection.length > 0;

  // Persist progress on changes — only once there is meaningful activity, so a
  // bare visit to /session doesn't create a misleading "in progress" record.
  useEffect(() => {
    if (progressLoading || !hasActivity) return;
    saveProgress({
      id: kind,
      kind,
      stepIndex,
      partSelections,
      journalEntryIds,
      reflection,
      startedAt: progress?.startedAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }, [
    kind,
    stepIndex,
    partSelections,
    journalEntryIds,
    reflection,
    progress?.startedAt,
    saveProgress,
    progressLoading,
    hasActivity,
  ]);

  // Handle journal entry save
  const handleSaveJournalEntry = useCallback(async (body: string) => {
    if (!currentStep || currentStep.type !== 'journal') return '';

    const entry = await addEntry({
      body,
      kind: currentStep.journalKind ?? 'reflection',
      prompt: currentStep.question,
      partId: currentStep.linkToPart ? lastChosenPartId : undefined,
    });

    setJournalEntryIds(prev => ({ ...prev, [currentStep.id]: entry.id }));
    return entry.id;
  }, [currentStep, addEntry, lastChosenPartId]);

  // Handle reflection change
  const handleReflectionChange = useCallback((text: string) => {
    setReflection(text);
  }, []);

  // Handle journal skip
  const handleSkipJournal = useCallback(() => {
    // Allow skipping - just go to next step without saving
    if (stepIndex < steps.length - 1) {
      setStepIndex(s => s + 1);
    } else {
      setCompleted(true);
    }
  }, [stepIndex, steps.length]);

  // Handle practice completion
  const handleComplete = useCallback(async () => {
    const startTime = startTimeRef.current ?? Date.now();
    startTimeRef.current = startTime;
    const durationSec = Math.round((Date.now() - startTime) / 1000);

    // Get unique part IDs from all selections
    const allPartIds = Array.from(new Set(Object.values(partSelections).flat()));

    // Get all journal entry IDs
    const allJournalEntryIds = Object.values(journalEntryIds);

    // Get phase from first step that has one
    const firstStepWithPhase = steps.find(s => s.phase);
    const phase = firstStepWithPhase?.phase;

    await logSession({
      kind,
      phase,
      technique: 'guided',
      targetPartIds: allPartIds.length > 0 ? allPartIds : undefined,
      journalEntryIds: allJournalEntryIds.length > 0 ? allJournalEntryIds : undefined,
      notes: reflection || undefined,
      durationSec,
    });

    await clearProgress(kind);
    setCompleted(true);
  }, [kind, partSelections, journalEntryIds, reflection, steps, logSession, clearProgress]);

  // Navigation
  const handleNext = useCallback(() => {
    if (isLastStep) {
      handleComplete();
    } else {
      setStepIndex(s => s + 1);
    }
  }, [isLastStep, handleComplete]);

  const handleBack = useCallback(() => {
    if (canGoBack) {
      setStepIndex(s => s - 1);
    }
  }, [canGoBack]);

  // Exit handler
  const handleExit = useCallback(async () => {
    if (!hasActivity) {
      // A peeked-at practice leaves no record behind.
      await clearProgress(kind);
      onExit();
      return;
    }
    setShowExitConfirm(true);
  }, [hasActivity, clearProgress, kind, onExit]);

  const handleConfirmExit = useCallback(() => {
    setShowExitConfirm(false);
    onExit();
  }, [onExit]);

  // Render current step
  const renderStep = () => {
    if (!currentStep) return null;

    switch (currentStep.type) {
      case 'instruction':
        return (
          <InstructionStepView
            step={currentStep}
            stepNumber={stepIndex + 1}
            totalSteps={steps.length}
            onNext={handleNext}
            onBack={handleBack}
            canGoBack={canGoBack}
            isLastStep={isLastStep}
          />
        );

      case 'choosePart':
        return (
          <ChoosePartStepView
            step={currentStep}
            stepNumber={stepIndex + 1}
            totalSteps={steps.length}
            onNext={handleNext}
            onBack={handleBack}
            canGoBack={canGoBack}
            isLastStep={isLastStep}
            parts={parts}
            selectedPartIds={partSelections[currentStep.id] || []}
            onSelectionChange={ids => setPartSelections(prev => ({ ...prev, [currentStep.id]: ids }))}
          />
        );

      case 'journal':
        return (
          <JournalStepView
            step={currentStep}
            stepNumber={stepIndex + 1}
            totalSteps={steps.length}
            onNext={handleNext}
            onBack={handleBack}
            canGoBack={canGoBack}
            isLastStep={isLastStep}
            parts={parts}
            lastChosenPartId={lastChosenPartId}
            journalEntryId={journalEntryIds[currentStep.id]}
            onSaveEntry={handleSaveJournalEntry}
            onSkip={handleSkipJournal}
          />
        );

      case 'reflection':
        return (
          <ReflectionStepView
            step={currentStep}
            stepNumber={stepIndex + 1}
            totalSteps={steps.length}
            onNext={handleNext}
            onBack={handleBack}
            canGoBack={canGoBack}
            isLastStep={isLastStep}
            progress={currentProgress}
            onReflectionChange={handleReflectionChange}
          />
        );

      default:
        return null;
    }
  };

  if (partsLoading || progressLoading) {
    return (
      <main className="flex-1 p-6 flex items-center justify-center">
        <div className="animate-pulse">Loading…</div>
      </main>
    );
  }

  if (completed) {
    const partsTouchedCount = new Set(Object.values(partSelections).flat()).size;
    const entriesSavedCount = Object.keys(journalEntryIds).length;

    return (
      <main className="flex-1 p-6 max-w-3xl mx-auto w-full">
        <CompletionView
          kind={kind}
          partsTouchedCount={partsTouchedCount}
          entriesSavedCount={entriesSavedCount}
          onBackToPicker={onExit}
        />
      </main>
    );
  }

  return (
    <main className="flex-1 p-6 max-w-3xl mx-auto w-full">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <button
          onClick={handleExit}
          className="p-2 rounded-lg hover:bg-teal-tint text-ink/60"
          aria-label="Exit practice"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex-1 text-center">
          <h1 className="text-xl font-semibold">{practice.title}</h1>
        </div>
        <button
          onClick={() => setDrawerOpen(true)}
          className="px-3 py-2 text-sm font-medium text-teal-deep hover:bg-teal-tint rounded-lg"
          aria-haspopup="dialog"
        >
          Parts
        </button>
      </header>

      {/* Step content */}
      {renderStep()}

      {/* Parts Drawer (browse mode) - accessible from any step */}
      <PartsDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        mode="browse"
      />

      {/* Exit confirmation dialog */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowExitConfirm(false)}>
          <div className="bg-white rounded-xl border border-ink/10 p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-2">Leave this practice?</h3>
            <p className="text-ink/65 mb-4">
              Your progress is saved automatically. You can resume from this step later.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="px-4 py-2 border border-ink/15 rounded-lg hover:bg-teal-tint/60"
              >
                Stay
              </button>
              <button
                onClick={handleConfirmExit}
                className="px-4 py-2 bg-teal text-ivory rounded-lg hover:bg-teal-deep"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}