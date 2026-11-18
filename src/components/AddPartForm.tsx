'use client';

import { useState, useCallback } from 'react';
import { partGroups } from '@/content/taxonomy';
import { getDefaultPartsByGroup } from '@/content/defaultParts';
import { bodyRegionsFront, bodyRegionsBack } from '@/content/bodyRegions';
import type { PartGroup } from '@/lib/types';
import type { DefaultPart } from '@/content/defaultParts';
import { LibraryPicker } from './LibraryPicker';
import BodyAwareness from './BodyAwareness';
import type { SelectedSensation } from './BodyAwareness';

export interface AddPartInput {
  name: string;
  group: PartGroup;
  /** The part's current job / role in the inner system. */
  role: string;
  /** What the part believes would happen if it stopped doing its job. */
  fear: string;
  /** Body sensations associated with this part */
  bodySensations: SelectedSensation[];
  notes: string;
}

export interface AddPartFormProps {
  /** Whether the optional spiritual group may be chosen. */
  spiritualityEnabled: boolean;
  onCancel: () => void;
  onAdd: (input: AddPartInput) => Promise<void>;
}

const initialInput: AddPartInput = {
  name: '',
  group: 'manager',
  role: '',
  fear: '',
  bodySensations: [],
  notes: '',
};

export function AddPartForm({ spiritualityEnabled, onCancel, onAdd }: AddPartFormProps) {
  const [input, setInput] = useState<AddPartInput>(initialInput);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLibrary, setShowLibrary] = useState(false);
  const [showBodyAwareness, setShowBodyAwareness] = useState(false);

  const setField = useCallback(
    (key: keyof AddPartInput, value: string | SelectedSensation[]) => {
      setInput(prev => ({ ...prev, [key]: value }));
      setError(null);
    },
    []
  );

  const handleLibrarySelect = useCallback((part: DefaultPart) => {
    setInput(prev => ({ ...prev, name: part.name, group: part.group }));
    setShowLibrary(false);
  }, []);

  const handleBodySensationsChange = useCallback((sensations: SelectedSensation[]) => {
    setField('bodySensations', sensations);
  }, [setField]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await onAdd(input);
      setInput(initialInput);
    } catch {
      setError("Couldn't save this part. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const isComplete = Boolean(input.name && input.group && input.role && input.fear);

  return (
    <section className="space-y-4" aria-labelledby="add-part-heading">
      <h2 id="add-part-heading" className="text-lg font-semibold">Add New Part</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="addpart-name" className="block text-sm font-medium">
              Name *
            </label>
            <button
              type="button"
              onClick={() => setShowLibrary(true)}
              className="text-sm text-teal-deep hover:underline"
              aria-haspopup="dialog"
            >
              Pick from library…
            </button>
          </div>
          <input
            id="addpart-name"
            autoFocus
            required
            value={input.name}
            onChange={e => setField('name', e.target.value)}
            placeholder="e.g., The Perfectionist, The Numb-er, The Little One"
            className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
          />
        </div>
        <div>
          <label htmlFor="addpart-group" className="block text-sm font-medium mb-1">
            Group *
          </label>
          <select
            id="addpart-group"
            value={input.group}
            onChange={e => setField('group', e.target.value as PartGroup)}
            className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
          >
            {partGroups
              .filter(g => g.key !== 'spiritual' || spiritualityEnabled)
              .map(g => (
                <option key={g.key} value={g.key}>
                  {g.label} {g.emoji}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label htmlFor="addpart-role" className="block text-sm font-medium mb-1">
            Role / Job *
          </label>
          <textarea
            id="addpart-role"
            required
            rows={2}
            value={input.role}
            onChange={e => setField('role', e.target.value)}
            placeholder="What does this part do for you? What is its job?"
            className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
          />
        </div>
        <div>
          <label htmlFor="addpart-fear" className="block text-sm font-medium mb-1">
            Fear *
          </label>
          <textarea
            id="addpart-fear"
            required
            rows={2}
            value={input.fear}
            onChange={e => setField('fear', e.target.value)}
            placeholder="What is this part afraid would happen if it stopped doing its job?"
            className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="addpart-body" className="block text-sm font-medium">
              Body Sensations
            </label>
            <button
              type="button"
              onClick={() => setShowBodyAwareness(true)}
              className="text-sm text-teal-deep hover:underline"
              aria-haspopup="dialog"
            >
              {input.bodySensations.length > 0
                ? `${input.bodySensations.length} sensations mapped → Edit`
                : 'Map sensations…'}
            </button>
          </div>
          {input.bodySensations.length > 0 && (
            <div className="mt-2 p-3 rounded-lg border border-teal/30 bg-teal-tint/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-teal-deep">
                  {input.bodySensations.length} sensation{input.bodySensations.length !== 1 ? 's' : ''} mapped
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {input.bodySensations.map(({ sensationId, intensity, bodyRegionId }) => {
                  const regionName = bodyRegionsFront[bodyRegionId as keyof typeof bodyRegionsFront]?.label ||
                    bodyRegionsBack[bodyRegionId as keyof typeof bodyRegionsBack]?.label ||
                    bodyRegionId;
                  return (
                    <div key={sensationId} className="inline-flex items-center gap-1.5 bg-white border border-teal/40 px-2.5 py-1 rounded-full text-sm">
                      <span className="font-medium">{regionName}</span>
                      <span className="text-teal-deep font-bold">{intensity}/10</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div>
          <label htmlFor="addpart-notes" className="block text-sm font-medium mb-1">
            Notes
          </label>
          <textarea
            id="addpart-notes"
            rows={2}
            value={input.notes}
            onChange={e => setField('notes', e.target.value)}
            placeholder="Anything else to remember about this part"
            className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
          />
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-ink/15 rounded-lg hover:bg-teal-tint/60 text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting || !isComplete}
            className="flex-1 px-4 py-2 bg-teal text-ivory rounded-lg hover:bg-teal-deep disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {submitting ? 'Adding…' : 'Add Part'}
          </button>
        </div>
        {error && (
          <p className="text-sm text-apricot-deep mt-2" role="alert">
            {error}
          </p>
        )}
      </form>

      <LibraryPicker
        onSelect={handleLibrarySelect}
        spiritualityEnabled={spiritualityEnabled}
        isOpen={showLibrary}
        onClose={() => setShowLibrary(false)}
      />

      {/* Body Awareness Modal */}
      {showBodyAwareness && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="body-awareness-title"
        >
          <div className="bg-white rounded-2xl border border-ink/10 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-ink/10 sticky top-0 bg-white z-10">
              <h2 id="body-awareness-title" className="text-lg font-semibold">Map Body Sensations</h2>
              <button
                onClick={() => setShowBodyAwareness(false)}
                className="p-2 rounded-lg hover:bg-teal-tint text-ink/60"
                aria-label="Close body awareness"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <BodyAwareness
                initialSensations={input.bodySensations}
                onChange={(sensations) => setField('bodySensations', sensations)}
                emotion={input.fear ? undefined : undefined}
                showSummary={true}
                mapHeight={400}
              />
            </div>
            <div className="p-4 border-t border-ink/10 bg-ivory flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowBodyAwareness(false)}
                className="px-4 py-2 bg-teal text-ivory rounded-lg hover:bg-teal-deep"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
