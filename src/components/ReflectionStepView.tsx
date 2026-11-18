'use client';

import { useState, useEffect, useRef } from 'react';
import type { ReflectionStep } from '@/content/practiceSteps';
import type { PracticeProgress } from '@/lib/types';

interface ReflectionStepProps {
  step: ReflectionStep;
  stepNumber: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  canGoBack: boolean;
  isLastStep: boolean;
  progress: PracticeProgress;
  onReflectionChange: (text: string) => void;
}

export function ReflectionStepView({
  step,
  stepNumber,
  totalSteps,
  onNext,
  onBack,
  canGoBack,
  isLastStep,
  progress,
  onReflectionChange,
}: ReflectionStepProps) {
  const [text, setText] = useState(() => progress.reflection || '');
  const [debouncedText, setDebouncedText] = useState(text);
  const initializedRef = useRef(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Debounce reflection saves
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedText(text);
      onReflectionChange(text);
    }, 500);
    return () => clearTimeout(timer);
  }, [text, onReflectionChange]);

  // Initialize from progress on first render only
  useEffect(() => {
    if (!initializedRef.current && progress.reflection !== undefined) {
      initializedRef.current = true;
      setText(progress.reflection);
    }
  }, [progress.reflection]);

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

        {/* Textarea */}
        <div className="space-y-3">
          <label htmlFor="reflection-entry" className="block text-sm font-medium">
            Your reflection
          </label>
          <textarea
            ref={textareaRef}
            id="reflection-entry"
            value={text}
            onChange={e => setText(e.target.value)}
            rows={6}
            className="w-full px-4 py-3 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal transition-colors"
            placeholder="Write freely…"
          />
          <p className="text-sm text-ink/60">
            This reflection will be saved with your practice session.
          </p>
        </div>

        {debouncedText !== text && (
          <p className="text-xs text-ink/50 flex items-center gap-1" role="status" aria-live="polite">
            <svg className="w-3.5 h-3.5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Saving…
          </p>
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
          onClick={onNext}
          className="px-4 py-2 bg-teal text-ivory rounded-lg hover:bg-teal-deep"
        >
          {isLastStep ? 'Complete Practice' : 'Next Step'}
        </button>
      </div>
    </section>
  );
}