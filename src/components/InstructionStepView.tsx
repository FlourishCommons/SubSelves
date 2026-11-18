'use client';

import type { InstructionStep } from '@/content/practiceSteps';
import { BreathingCircle } from './BreathingCircle';

interface InstructionStepProps {
  step: InstructionStep;
  stepNumber: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  canGoBack: boolean;
  isLastStep: boolean;
  progressRef?: React.RefObject<HTMLDivElement>;
}

const BREATHING_TEXT = 'Take a few slow breaths. Feel yourself here, present and supported.';

export function InstructionStepView({
  step,
  stepNumber,
  totalSteps,
  onNext,
  onBack,
  canGoBack,
  isLastStep,
}: InstructionStepProps) {
  const showBreathing = step.text === BREATHING_TEXT;

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
        {showBreathing && (
          <div className="mt-6 max-w-md mx-auto">
            <BreathingCircle size={220} inhaleDuration={4000} exhaleDuration={6000} holdDuration={1000} />
          </div>
        )}
        {step.followUp && (
          <p className="text-ink/60 italic border-l-4 border-teal/30 pl-4 mt-4">
            {step.followUp}
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