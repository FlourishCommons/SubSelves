'use client';

import { useState, useMemo, useCallback, useEffect, Suspense } from 'react';
import { useParts } from '@/lib/hooks/useParts';
import { useSettings } from '@/lib/hooks/useSettings';
import { getPartArt } from '@/content/partArt';
import { partGroups } from '@/content/taxonomy';
import { getDefaultPartsByGroup } from '@/content/defaultParts';
import type { PartGroup } from '@/lib/types';
import type { DefaultPart } from '@/content/defaultParts';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function LibraryPicker({
  onSelect,
  spiritualityEnabled,
  isOpen,
  onClose,
  initialSearchQuery = '',
  onSearchChange,
}: {
  onSelect: (part: DefaultPart) => void;
  spiritualityEnabled: boolean;
  isOpen: boolean;
  onClose: () => void;
  initialSearchQuery?: string;
  onSearchChange?: (q: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

  useEffect(() => {
    onSearchChange?.(searchQuery);
  }, [searchQuery, onSearchChange]);

  useEffect(() => {
    if (isOpen) {
      setSearchQuery(initialSearchQuery);
    }
  }, [isOpen, initialSearchQuery]);

  const groupedParts = useMemo(() => {
    return partGroups
      .filter(g => g.key !== 'spiritual' || spiritualityEnabled)
      .map(g => ({
        ...g,
        parts: getDefaultPartsByGroup(g.key).filter(p =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }))
      .filter(g => g.parts.length > 0);
  }, [searchQuery, spiritualityEnabled]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="library-picker-title"
    >
      <div className="bg-white rounded-2xl border border-ink/10 w-full max-w-lg max-h-[80vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-ink/10 sticky top-0 bg-white z-10">
          <h2 id="library-picker-title" className="text-lg font-semibold">Choose a Starting Part</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-teal-tint text-ink/60"
            aria-label="Close library picker"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-4 border-b border-ink/10 sticky top-12 bg-white z-10">
          <label htmlFor="library-search" className="sr-only">Search parts</label>
          <input
            id="library-search"
            type="search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search parts…"
            className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
            autoFocus
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {groupedParts.length === 0 ? (
            <p className="text-center text-ink/60 py-8">No parts match your search.</p>
          ) : (
            groupedParts.map(group => (
              <section key={group.key} aria-labelledby={`library-${group.key}-heading`}>
                <h3 id={`library-${group.key}-heading`} className="flex items-center gap-2 text-sm font-semibold text-ink/75 mb-3 pb-2 border-b border-ink/10">
                  <span>{group.emoji}</span>
                  {group.label}
                </h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {group.parts.map(part => {
                    const art = getPartArt(part.name, part.group);

                    return (
                      <button
                        key={part.name}
                        onClick={() => {
                          onSelect(part);
                          onClose();
                        }}
                        className="flex items-center gap-3 text-left p-2 pr-3 rounded-lg border border-ink/10 hover:border-teal hover:bg-teal-tint transition-colors focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                      >
                        {art && (
                          <Image
                            src={art.icon}
                            alt=""
                            width={40}
                            height={40}
                            loading="lazy"
                            className="h-10 w-10 shrink-0 rounded-full object-cover"
                          />
                        )}
                        <p className="font-medium text-ink truncate">{part.name}</p>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))
          )}
        </div>

        <div className="p-4 border-t border-ink/10 bg-ivory">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 border border-ink/15 rounded-lg hover:bg-teal-tint text-sm"
          >
            Cancel — I&apos;ll write my own
          </button>
        </div>
      </div>
    </div>
  );
}

function AddPartFormInitializer({
  spiritualityEnabled,
  setShowForm,
  setFormData,
}: {
  spiritualityEnabled: boolean;
  setShowForm: (show: boolean) => void;
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    group: PartGroup;
    role: string;
    fear: string;
    bodyLocation: string;
    notes: string;
  }>>;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const addParam = searchParams.get('add');
    const groupParam = searchParams.get('group');

    if (addParam) {
      const validGroups: PartGroup[] = ['manager', 'guardian', 'innerKid', 'spiritual'];
      let group: PartGroup = 'manager';

      if (groupParam && validGroups.includes(groupParam as PartGroup)) {
        if (groupParam === 'spiritual' && !spiritualityEnabled) {
          group = 'manager';
        } else {
          group = groupParam as PartGroup;
        }
      }

      setFormData(prev => ({ ...prev, name: addParam, group }));
      setShowForm(true);
    }
  }, [searchParams, spiritualityEnabled, setShowForm, setFormData]);

  return null;
}

export default function PartsPage() {
  const { parts, addPart, removePart, loading } = useParts();
  const { settings } = useSettings();
  const spiritualityEnabled = settings?.spiritualityEnabled ?? false;
  const [showForm, setShowForm] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [librarySearch, setLibrarySearch] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    group: 'manager' as PartGroup,
    role: '',
    fear: '',
    bodyLocation: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleLibrarySelect = useCallback((part: DefaultPart) => {
    setFormData(prev => ({ ...prev, name: part.name, group: part.group }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addPart(formData);
      setFormData({ name: '', group: 'manager', role: '', fear: '', bodyLocation: '', notes: '' });
      setShowForm(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this part? This cannot be undone.')) {
      await removePart(id);
    }
  };

  if (loading) {
    return <main className="flex-1 p-6 flex items-center justify-center">Loading…</main>;
  }

  const grouped = partGroups.map(g => ({
    ...g,
    parts: parts.filter(p => p.group === g.key),
  }));

  return (
    <main className="flex-1 p-6 max-w-4xl mx-auto w-full space-y-8">
      <Suspense fallback={null}>
        <AddPartFormInitializer
          spiritualityEnabled={spiritualityEnabled}
          setShowForm={setShowForm}
          setFormData={setFormData}
        />
      </Suspense>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Parts</h1>
          <p className="text-ink/65">Your inner system map</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/parts/library"
            className="rounded-lg border border-teal/30 bg-white px-4 py-2 text-sm font-semibold text-teal-deep transition-colors hover:border-teal hover:bg-teal-tint"
          >
            Browse library
          </Link>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-teal text-ivory rounded-lg hover:bg-teal-deep"
          >
            Add Part
          </button>
        </div>
      </div>

      {showForm && (
        <section className="bg-white rounded-xl border border-ink/10 p-6 space-y-4" aria-labelledby="add-part-heading">
          <h2 id="add-part-heading" className="text-xl font-semibold">Add New Part</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="name" className="block text-sm font-medium">Name *</label>
                <button
                  type="button"
                  onClick={() => { setLibrarySearch(''); setShowLibrary(true); }}
                  className="text-sm text-teal-deep hover:underline"
                  aria-haspopup="dialog"
                >
                  Pick from library…
                </button>
              </div>
              <input
                id="name"
                required
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
                placeholder="e.g., The Perfectionist, The Numb-er, The Little One"
              />
            </div>
            <div>
              <label htmlFor="group" className="block text-sm font-medium mb-1">Group *</label>
              <select
                id="group"
                value={formData.group}
                onChange={e => setFormData(prev => ({ ...prev, group: e.target.value as PartGroup }))}
                className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
              >
                {partGroups
                  .filter(g => g.key !== 'spiritual' || spiritualityEnabled)
                  .map(g => (
                    <option key={g.key} value={g.key}>{g.label} {g.emoji}</option>
                  ))}
              </select>
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium mb-1">Role / Job *</label>
              <textarea
                id="role"
                required
                rows={2}
                value={formData.role}
                onChange={e => setFormData(prev => ({ ...prev, role: e.target.value }))}
                className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
                placeholder="What does this part do for you? What is its job?"
              />
            </div>
            <div>
              <label htmlFor="fear" className="block text-sm font-medium mb-1">Fear *</label>
              <textarea
                id="fear"
                required
                rows={2}
                value={formData.fear}
                onChange={e => setFormData(prev => ({ ...prev, fear: e.target.value }))}
                className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
                placeholder="What is this part afraid would happen if it stopped doing its job?"
              />
            </div>
            <div>
              <label htmlFor="bodyLocation" className="block text-sm font-medium mb-1">Body Location</label>
              <input
                id="bodyLocation"
                value={formData.bodyLocation}
                onChange={e => setFormData(prev => ({ ...prev, bodyLocation: e.target.value }))}
                className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
                placeholder="e.g., tight chest, lump in throat, heavy shoulders"
              />
            </div>
            <div>
              <label htmlFor="notes" className="block text-sm font-medium mb-1">Notes</label>
              <textarea
                id="notes"
                rows={2}
                value={formData.notes}
                onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
                placeholder="Anything else to remember about this part"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-ink/15 rounded-lg hover:bg-teal-tint/60"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-teal text-ivory rounded-lg hover:bg-teal-deep disabled:opacity-50"
              >
                {submitting ? 'Adding…' : 'Add Part'}
              </button>
            </div>
          </form>
        </section>
      )}

      <LibraryPicker
        onSelect={handleLibrarySelect}
        spiritualityEnabled={spiritualityEnabled}
        isOpen={showLibrary}
        onClose={() => setShowLibrary(false)}
        initialSearchQuery={librarySearch}
        onSearchChange={setLibrarySearch}
      />

      {grouped.map(group => (
        <section key={group.key} aria-labelledby={`${group.key}-heading`} className="space-y-4">
          <h2 id={`${group.key}-heading`} className="text-lg font-semibold flex items-center gap-2">
            <span>{group.emoji}</span>
            {group.label}
            <span className="text-sm font-normal text-ink/60">({group.parts.length})</span>
          </h2>
          <p className="text-sm text-ink/60">{group.description}</p>
          {group.parts.length === 0 ? (
            <p className="text-ink/50 italic">No parts in this category yet.</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.parts.map(part => {
                const art = getPartArt(part.name, part.group);

                return (
                  <article key={part.id} className="bg-white rounded-xl border border-ink/10 p-4 hover:border-teal/40 transition-colors">
                    <Link href={`/parts/${part.id}`} className="block">
                      <div className="flex items-start gap-3">
                        {art && (
                          <Image
                            src={art.icon}
                            alt=""
                            width={48}
                            height={48}
                            loading="lazy"
                            className="h-12 w-12 shrink-0 rounded-full object-cover"
                          />
                        )}
                        <div className="min-w-0">
                          <h3 className="font-medium">{part.name}</h3>
                          <p className="text-sm text-ink/60 mt-1 line-clamp-2">{part.role}</p>
                          {part.bodyLocation && <p className="text-xs text-ink/50 mt-1">📍 {part.bodyLocation}</p>}
                        </div>
                      </div>
                    </Link>
                    <button
                      onClick={() => handleDelete(part.id)}
                      className="mt-3 w-full text-sm text-apricot-deep hover:underline"
                    >
                      Delete
                    </button>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      ))}

      {parts.length === 0 && (
        <section className="text-center py-12 bg-white rounded-xl border border-ink/10">
          <h2 className="text-lg font-semibold">No Parts Yet</h2>
          <p className="text-ink/65 mt-2">Start by adding a part you have noticed, or take a check-in to begin mapping your system.</p>
          <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-teal text-ivory rounded-lg hover:bg-teal-deep"
            >
              Add Your First Part
            </button>
            <button
              type="button"
              onClick={() => { setLibrarySearch(''); setShowLibrary(true); setShowForm(true); }}
              className="px-4 py-2 border border-ink/15 rounded-lg hover:bg-teal-tint/60 text-teal-deep"
              aria-haspopup="dialog"
            >
              Pick from library…
            </button>
          </div>
        </section>
      )}
    </main>
  );
}