'use client';

import Link from 'next/link';
import type { PracticeKind } from '@/lib/types';

interface CompletionViewProps {
  kind: PracticeKind;
  partsTouchedCount: number;
  entriesSavedCount: number;
  onBackToPicker: () => void;
}

export function CompletionView({
  partsTouchedCount,
  entriesSavedCount,
  onBackToPicker,
}: CompletionViewProps) {
  return (
    <section className="space-y-6" aria-labelledby="completion-heading">
      <div className="bg-white rounded-xl border border-ink/10 p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sage-tint flex items-center justify-center">
          <svg className="w-8 h-8 text-sage-deep" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 id="completion-heading" className="text-2xl font-bold text-sage-deep">
          Practice Complete
        </h2>
        <p className="text-ink/65 mt-2 max-w-md mx-auto">
          Well done. You spent time with your inner system today.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-ink/10 p-6 space-y-4">
        <h3 className="text-lg font-semibold">Summary</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="p-4 bg-ivory rounded-lg">
            <p className="text-2xl font-bold text-teal-deep">{partsTouchedCount}</p>
            <p className="text-sm text-ink/60">Parts touched</p>
          </div>
          <div className="p-4 bg-ivory rounded-lg">
            <p className="text-2xl font-bold text-teal-deep">{entriesSavedCount}</p>
            <p className="text-sm text-ink/60">Journal entries saved</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/journal"
          className="flex-1 px-4 py-3 bg-teal text-ivory rounded-lg text-center hover:bg-teal-deep"
        >
          View Journal
        </Link>
        <button
          onClick={onBackToPicker}
          className="flex-1 px-4 py-3 border border-ink/15 rounded-lg hover:bg-teal-tint/60"
        >
          Back to Practices
        </button>
      </div>
    </section>
  );
}