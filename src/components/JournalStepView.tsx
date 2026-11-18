'use client';

import { useJournal } from '@/lib/hooks/useJournal';
import { useState, useCallback, useRef, useEffect } from 'react';
import type { JournalStep } from '@/content/practiceSteps';
import type { Part } from '@/lib/types';

interface JournalStepProps {
  step: JournalStep;
  stepNumber: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  canGoBack: boolean;
  isLastStep: boolean;
  parts: Part[];
  lastChosenPartId: string | undefined;
  journalEntryId: string | undefined;
  onSaveEntry: (body: string) => Promise<string>;
  onSkip: () => void;
}

export function JournalStepView({
  step,
  stepNumber,
  totalSteps,
  onNext,
  onBack,
  canGoBack,
  isLastStep,
  parts,
  lastChosenPartId,
  journalEntryId,
  onSaveEntry,
  onSkip,
}: JournalStepProps) {
  const { entries } = useJournal();
  const savedEntry = journalEntryId ? entries.find(e => e.id === journalEntryId) : undefined;

  const [text, setText] = useState(savedEntry?.body ?? '');
  const [saved, setSaved] = useState(!!journalEntryId);
  const [saving, setSaving] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const savedToastRef = useRef<HTMLDivElement>(null);

  // Announce saved status to screen readers
  useEffect(() => {
    if (saved && savedToastRef.current) {
      savedToastRef.current.focus();
    }
  }, [saved]);

  const handleSave = useCallback(async () => {
    if (!text.trim()) return;
    setSaving(true);
    try {
      await onSaveEntry(text);
      setSaved(true);
      // Note: parent will update journalEntryIds via the returned entryId
    } finally {
      setSaving(false);
    }
  }, [text, onSaveEntry]);

  const handleNext = () => {
    if (!journalEntryId && !saved) return;
    onNext();
  };

  const handleSkip = () => {
    onSkip();
  };

  const linkedPart = lastChosenPartId ? parts.find(p => p.id === lastChosenPartId) : undefined;

  return (
    <section aria-labelledby="step-heading" className="space-y-6">
      {/* Progress indicator */}
      <div className="bg-white rounded-xl border border-ink/10 p-4">
        <div className="flex justify-between text-sm mb-2">
          <span>Step {stepNumber} of {totalSteps}</span>
          {step.phase && (
            <span className="px-2 py-0.5 text-xs bg-teal-tint text-teal-deep rounded">
              Phase {step.phase}
            </span>
          )}
        </div>
        <div className="h-2 bg-ink/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-teal transition-all duration-300"
            style={{ width: `${(stepNumber / totalSteps) * 100}%` }}
            role="progressbar"
            aria-valuenow={stepNumber}
            aria-valuemin={1}
            aria-valuemax={totalSteps}
            aria-label="Practice progress"
          />
        </div>
      </div>

      {/* Step content */}
      <article className="bg-white rounded-xl border border-ink/10 p-8" aria-labelledby="step-heading">
        <h2 id="step-heading" className="text-xl font-semibold mb-2">{step.title}</h2>
        <p className="text-lg text-ink/75 mb-6">{step.question}</p>

        {/* Linked part indicator */}
        {step.linkToPart && linkedPart && (
          <div className="mb-6 p-4 bg-sage-tint border border-sage/30 rounded-lg">
            <p className="text-sm font-medium text-sage-deep">This entry will be linked to:</p>
            <p className="text-ink/75 mt-1">{linkedPart.name}</p>
          </div>
        )}

        {/* Textarea */}
        <div className="space-y-3">
          <label htmlFor="journal-entry" className="block text-sm font-medium">
            Your response
          </label>
          <textarea
            ref={textareaRef}
            id="journal-entry"
            value={text}
            onChange={e => {
              setText(e.target.value);
              if (saved) setSaved(false);
            }}
            rows={6}
            className="w-full px-4 py-3 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal transition-colors"
            placeholder="Write freely…"
            aria-describedby="journal-hint"
          />
          <p id="journal-hint" className="text-sm text-ink/60">
            Your entry will be saved as a <span className="font-medium capitalize">{step.journalKind ?? 'reflection'}</span> journal entry.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 mt-4">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !text.trim()}
            className="px-4 py-2 bg-teal text-ivory rounded-lg hover:bg-teal-deep disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving…' : journalEntryId ? 'Update Entry' : 'Save Entry'}
          </button>
          {journalEntryId && (
            <button
              type="button"
              onClick={() => { setText(''); setSaved(false); }}
              className="px-4 py-2 border border-ink/15 rounded-lg hover:bg-teal-tint/60"
            >
              Edit / Replace
            </button>
          )}
          <button
            type="button"
            onClick={handleSkip}
            className="px-4 py-2 border border-ink/15 rounded-lg hover:bg-teal-tint/60 text-ink/65"
          >
            Skip
          </button>
        </div>

        {/* Saved confirmation */}
        {saved && (
          <div
            ref={savedToastRef}
            role="status"
            aria-live="polite"
            className="mt-4 p-3 bg-sage-tint border border-sage/30 rounded-lg flex items-center gap-2"
            tabIndex={-1}
          >
            <svg className="w-5 h-5 text-sage-deep flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sage-deep font-medium">Saved</span>
            <span className="text-sage-deep text-sm">Your entry has been saved.</span>
          </div>
        )}

        {step.durationSec && (
          <p className="text-sm text-ink/50 mt-4">
            Suggested time: ~{Math.round(step.durationSec / 60)} min
          </p>
        )}
      </article>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          disabled={!canGoBack}
          className="px-4 py-2 border border-ink/15 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-tint/60"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!journalEntryId && !saved}
          className={`px-4 py-2 rounded-lg ${
            !journalEntryId && !saved
              ? 'bg-ink/15 text-ink/60 cursor-not-allowed'
              : 'bg-teal text-ivory hover:bg-teal-deep'
          }`}
        >
          {isLastStep ? 'Complete Practice' : 'Next Step'}
        </button>
      </div>
    </section>
  );
}