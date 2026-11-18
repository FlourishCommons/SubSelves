'use client';

import { useState, useCallback, useMemo } from 'react';
import { PartsDrawer } from './PartsDrawer';
import type { ChoosePartStep } from '@/content/practiceSteps';
import type { Part } from '@/lib/types';

interface ChoosePartStepProps {
  step: ChoosePartStep;
  stepNumber: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  canGoBack: boolean;
  isLastStep: boolean;
  parts: Part[];
  selectedPartIds: string[];
  onSelectionChange: (partIds: string[]) => void;
}

export function ChoosePartStepView({
  step,
  stepNumber,
  totalSteps,
  onNext,
  onBack,
  canGoBack,
  isLastStep,
  parts,
  selectedPartIds,
  onSelectionChange,
}: ChoosePartStepProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [addedParts, setAddedParts] = useState<Part[]>([]);
  const required = step.required ?? false;

  const handleNext = () => {
    if (required && selectedPartIds.length === 0) return;
    onNext();
  };

  const handleSelectPart = () => {
    setDrawerOpen(true);
  };

  const handleSelectionChange = useCallback((ids: string[]) => {
    onSelectionChange(ids);
  }, [onSelectionChange]);

  const handleClear = () => {
    onSelectionChange([]);
  };

  const handlePartRemove = (partId: string) => {
    onSelectionChange(selectedPartIds.filter(id => id !== partId));
  };

  // Get selected parts for display (merge in parts added via the drawer so
  // newly created parts resolve to their names even though SessionRunner's
  // useParts() instance hasn't been refreshed)
  const allParts = useMemo(() => {
    const seen = new Set(parts.map(p => p.id));
    return [...parts, ...addedParts.filter(p => !seen.has(p.id))];
  }, [parts, addedParts]);

  const selectedParts = allParts.filter(p => selectedPartIds.includes(p.id));

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
        {step.text && <p className="text-lg text-ink/75 mb-4">{step.text}</p>}

        {/* Role description */}
        <div className="mb-6 p-4 bg-teal-tint border border-teal/30 rounded-lg">
          <p className="text-sm font-medium text-teal-deep">Role in this step:</p>
          <p className="text-ink/75 mt-1">{step.role}</p>
        </div>

        {/* Part selection */}
        <div className="space-y-4">
          {step.multiple ? (
            <div>
              <label className="block text-sm font-medium mb-2">Selected parts ({selectedPartIds.length})</label>
              {selectedPartIds.length === 0 ? (
                <p className="text-ink/60 italic">No parts selected yet</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedParts.map(part => (
                    <span
                      key={part.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-tint text-teal-deep rounded-full text-sm"
                    >
                      {part.name}
                      <button
                        type="button"
                        onClick={() => handlePartRemove(part.id)}
                        className="p-0.5 hover:bg-teal-tint rounded-full"
                        aria-label={`Remove ${part.name}`}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : selectedPartIds.length > 0 ? (
            <div>
              <label className="block text-sm font-medium mb-2">Selected part</label>
              <div className="inline-flex items-center gap-2 px-3 py-2 bg-teal-tint text-teal-deep rounded-lg">
                <span className="font-medium">{selectedParts[0]?.name}</span>
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-0.5 hover:bg-teal-tint rounded-full"
                  aria-label="Change part"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ) : null}

          <button
            type="button"
            onClick={handleSelectPart}
            className={`w-full px-4 py-3 rounded-lg border-2 text-left transition-colors ${
              selectedPartIds.length > 0
                ? 'border-teal bg-teal-tint '
                : 'border-ink/10 hover:border-teal/40 bg-white '
            }`}
            aria-haspopup="dialog"
            aria-expanded={drawerOpen}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">
                {selectedPartIds.length > 0
                  ? step.multiple
                    ? `Choose parts (${selectedPartIds.length} selected)`
                    : 'Change part'
                  : 'Choose a part…'}
              </span>
              <svg className="w-5 h-5 text-ink/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>

          {required && selectedPartIds.length === 0 && (
            <p className="text-sm text-golden-deep" role="alert">
              Please choose at least one part to continue.
            </p>
          )}
        </div>

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
          disabled={required && selectedPartIds.length === 0}
          className={`px-4 py-2 rounded-lg ${
            required && selectedPartIds.length === 0
              ? 'bg-ink/15 text-ink/60 cursor-not-allowed'
              : 'bg-teal text-ivory hover:bg-teal-deep'
          }`}
        >
          {isLastStep ? 'Complete Practice' : 'Next Step'}
        </button>
      </div>

      {/* Parts Drawer */}
      <PartsDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        mode="select"
        stepId={step.id}
        suggestedGroups={step.suggestedGroups}
        multiple={step.multiple}
        selectedPartIds={selectedPartIds}
        onSelectionChange={handleSelectionChange}
        onPartAdded={p => setAddedParts(prev => [...prev, p])}
      />
    </section>
  );
}