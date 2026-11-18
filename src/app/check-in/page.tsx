'use client';

import { useState } from 'react';
import { useParts } from '@/lib/hooks/useParts';
import { useCheckIns } from '@/lib/hooks/useCheckIns';
import { defaultEightCs, eightCsList } from '@/content/eightCs';
import { useRouter } from 'next/navigation';
import { getGroupInfo } from '@/content/taxonomy';

export default function CheckInPage() {
  const { parts, loading: partsLoading } = useParts();
  const { addCheckIn, loading: checkInsLoading } = useCheckIns();
  const router = useRouter();
  const [mood, setMood] = useState(5);
  const [activePartId, setActivePartId] = useState('');
  const [blended, setBlended] = useState(false);
  const [eightCs, setEightCs] = useState<typeof defaultEightCs>(defaultEightCs);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addCheckIn({
        date: new Date().toISOString().split('T')[0],
        mood,
        activePartId: activePartId || undefined,
        blended,
        eightCs,
        notes: notes || undefined,
      });
      router.push('/');
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  };

  if (partsLoading || checkInsLoading) {
    return <main className="flex-1 p-6 flex items-center justify-center">Loading…</main>;
  }

  return (
    <main className="flex-1 p-6 max-w-2xl mx-auto w-full space-y-8">
      <header>
        <h1 className="text-2xl font-bold">Daily Check-in</h1>
        <p className="text-ink/65 mt-1">How are you right now? Takes 2 minutes.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8" noValidate>
        <section aria-labelledby="mood-heading">
          <h2 id="mood-heading" className="text-lg font-semibold">Overall Mood</h2>
          <div className="flex gap-2 mt-4" role="radiogroup" aria-label="Mood 1-10">
            {[...Array(10)].map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setMood(i + 1)}
                className={`flex-1 aspect-square rounded-lg border-2 transition-all ${
                  mood === i + 1
                    ? 'bg-teal border-teal text-ivory'
                    : 'bg-white border-ink/10 hover:border-teal/40 '
                }`}
                aria-pressed={mood === i + 1}
                aria-label={`Mood ${i + 1}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <p className="text-sm text-ink/60 mt-2 text-center">
            {mood <= 3 ? 'Struggling' : mood <= 6 ? 'Mixed' : 'Good'}
          </p>
        </section>

        <section aria-labelledby="part-heading">
          <h2 id="part-heading" className="text-lg font-semibold">Active Part (Optional)</h2>
          <select
            value={activePartId}
            onChange={e => setActivePartId(e.target.value)}
            className="mt-3 w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
          >
            <option value="">None / Not sure</option>
            {parts.map(part => (
              <option key={part.id} value={part.id}>{part.name} ({getGroupInfo(part.group).label})</option>
            ))}
          </select>
        </section>

        <section aria-labelledby="blended-heading">
          <h2 id="blended-heading" className="text-lg font-semibold">Blended?</h2>
          <label className="mt-3 flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={blended}
              onChange={e => setBlended(e.target.checked)}
              className="w-5 h-5 text-teal-deep border-ink/15 rounded focus:ring-teal/30"
            />
            <span className="text-ink/75">
              A part is taking over — I am seeing through its eyes right now
            </span>
          </label>
          <p className="text-sm text-ink/60 mt-1">
            Blending means you temporarily lost access to Self and became the part.
          </p>
        </section>

        <section aria-labelledby="eightcs-heading">
          <h2 id="eightcs-heading" className="text-lg font-semibold">The 8 Cs (Self Energy)</h2>
          <p className="text-sm text-ink/60">Rate each quality 1–10 right now:</p>
          <div className="grid gap-4 mt-4 sm:grid-cols-2">
            {eightCsList.map(c => (
              <div key={c.key} className="space-y-2">
                <label htmlFor={c.key} className="flex justify-between text-sm">
                  <span className="capitalize">{c.label}</span>
                  <span>{eightCs[c.key]}</span>
                </label>
                <input
                  type="range"
                  id={c.key}
                  min="1"
                  max="10"
                  value={eightCs[c.key]}
                  onChange={e => setEightCs(prev => ({ ...prev, [c.key]: Number(e.target.value) }))}
                  className="w-full h-2 bg-ink/10 rounded-lg appearance-none accent-teal"
                />
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="notes-heading">
          <h2 id="notes-heading" className="text-lg font-semibold">Notes (Optional)</h2>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={3}
            className="mt-3 w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
            placeholder="Anything else to note?"
          />
        </section>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-teal text-ivory rounded-lg font-medium hover:bg-teal-deep disabled:opacity-50"
        >
          {submitting ? 'Saving…' : 'Save Check-in'}
        </button>
      </form>
    </main>
  );
}