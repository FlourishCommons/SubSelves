'use client';

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useParts } from '@/lib/hooks/useParts';
import { useJournal } from '@/lib/hooks/useJournal';
import { partGroups } from '@/content/taxonomy';
import Link from 'next/link';

interface PartOption {
  id: string;
  name: string;
  group: 'manager' | 'guardian' | 'innerKid' | 'spiritual';
}

function SearchablePartSelect({
  parts,
  value,
  onChange,
  disabled = false,
}: {
  parts: PartOption[];
  value: string;
  onChange: (id: string) => void;
  disabled?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filteredParts = useMemo(() => {
    if (!searchQuery) return parts;
    const q = searchQuery.toLowerCase();
    return parts.filter(p => p.name.toLowerCase().includes(q));
  }, [parts, searchQuery]);

  const selectedPart = useMemo(() => parts.find(p => p.id === value), [parts, value]);

  const getGroupInfo = useCallback((group: PartOption['group']) => {
    return partGroups.find(g => g.key === group);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setSearchQuery('');
    setHighlightedIndex(-1);
  }, []);

  const open = useCallback(() => {
    if (!disabled) setIsOpen(true);
  }, [disabled]);

  const handleSelect = useCallback((part: PartOption) => {
    onChange(part.id);
    close();
    inputRef.current?.focus();
  }, [onChange, close]);

  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    close();
    inputRef.current?.focus();
  }, [onChange, close]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen) {
      if ((e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') && !disabled) {
        e.preventDefault();
        open();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => Math.min(prev + 1, filteredParts.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => Math.max(prev - 1, -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredParts[highlightedIndex]) {
          handleSelect(filteredParts[highlightedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        close();
        break;
      case 'Tab':
        close();
        break;
      default:
        break;
    }
  }, [isOpen, filteredParts, highlightedIndex, handleSelect, close, open, disabled]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setHighlightedIndex(-1);
    if (!isOpen) open();
  }, [isOpen, open]);

  const handleInputClick = useCallback(() => {
    if (!isOpen) open();
  }, [isOpen, open]);

  const handleBlur = useCallback(() => {
    // Delay close to allow click on option
    setTimeout(() => close(), 150);
  }, [close]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node) &&
          listRef.current && !listRef.current.contains(event.target as Node)) {
        close();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, close]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const option = listRef.current.querySelector(`[data-index="${highlightedIndex}"]`);
      option?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex]);

  return (
    <div className="relative">
      <label htmlFor="partId-search" className="block text-sm font-medium mb-1">Related Part (Optional)</label>
      <div className="relative">
        <input
          ref={inputRef}
          id="partId-search"
          type="text"
          readOnly
          disabled={disabled}
          value={selectedPart ? selectedPart.name : ''}
          placeholder={parts.length === 0 ? 'No parts yet — add one on the Parts page' : 'Search parts…'}
          onClick={handleInputClick}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={handleInputClick}
          aria-autocomplete="list"
          aria-controls="partId-listbox"
          aria-expanded={isOpen}
          aria-activedescendant={highlightedIndex >= 0 ? `partId-option-${highlightedIndex}` : undefined}
          role="combobox"
          className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal pr-10"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/50 hover:text-ink p-1 rounded"
            aria-label="Clear selection"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        )}
      </div>

      {isOpen && (
        <ul
          ref={listRef}
          id="partId-listbox"
          role="listbox"
          className="absolute z-10 mt-1 w-full max-h-60 overflow-auto bg-white rounded-lg border border-ink/10 shadow-lg"
        >
          {parts.length === 0 ? (
            <li className="px-4 py-3 text-center text-ink/60">
              No parts yet. <Link href="/parts" className="text-teal-deep hover:underline">Add one on the Parts page</Link>
            </li>
          ) : filteredParts.length === 0 ? (
            <li className="px-4 py-3 text-center text-ink/60">No parts match &ldquo;{searchQuery}&rdquo;</li>
          ) : (
            <>
              <li role="option" data-index={-1} id="partId-option-none" aria-selected={!value} className={`px-4 py-2 hover:bg-teal-tint cursor-pointer ${!value ? 'bg-teal-tint ' : ''}`} onClick={() => onChange('')} onMouseEnter={() => setHighlightedIndex(-1)}>
                <span className="flex items-center gap-2 text-ink">
                  <span className="w-5 h-5 flex items-center justify-center">✕</span>
                  <span>None</span>
                </span>
              </li>
              <li role="separator" className="border-t border-ink/10 my-1" />
              {filteredParts.map((part, index) => {
                const groupInfo = getGroupInfo(part.group);
                const isHighlighted = index === highlightedIndex;
                const isSelected = part.id === value;
                return (
                  <li
                    key={part.id}
                    role="option"
                    id={`partId-option-${index}`}
                    data-index={index}
                    className={`px-4 py-2 cursor-pointer transition-colors ${isHighlighted || isSelected ? 'bg-teal-tint ' : 'hover:bg-teal-tint/60 '}`}
                    onClick={() => handleSelect(part)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    aria-selected={isSelected}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{groupInfo?.emoji}</span>
                      <span className="font-medium text-ink truncate">{part.name}</span>
                      <span className="text-xs text-ink/60 ml-auto">({groupInfo?.label || part.group})</span>
                    </div>
                  </li>
                );
              })}
            </>
          )}
        </ul>
      )}
    </div>
  );
}

export default function JournalPage() {
  const { entries, addEntry, removeEntry, loading } = useJournal();
  const { parts } = useParts();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    partId: '',
    prompt: '',
    body: '',
    kind: 'reflection' as 'dialogue' | 'reflection' | 'unburdening' | 'interview' | 'conflict' | 'rescue' | 'council' | 'dream',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addEntry({
        partId: formData.partId || undefined,
        prompt: formData.prompt || undefined,
        body: formData.body,
        kind: formData.kind,
      });
      setFormData({ partId: '', prompt: '', body: '', kind: 'reflection' });
      setShowForm(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this entry?')) {
      await removeEntry(id);
    }
  };

  if (loading) {
    return <main className="flex-1 p-6 flex items-center justify-center">Loading…</main>;
  }

  const getPartLabel = (partId: string) => {
    const part = parts.find(p => p.id === partId);
    if (!part) return '';
    const groupInfo = partGroups.find(g => g.key === part.group);
    return `${part.name} (${groupInfo?.label || part.group})`;
  };

  return (
    <main className="flex-1 p-6 max-w-3xl mx-auto w-full space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Journal</h1>
          <p className="text-ink/65">Dialogue, reflection, and unburdening entries</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-teal text-ivory rounded-lg hover:bg-teal-deep"
        >
          New Entry
        </button>
      </div>

      {showForm && (
        <section className="bg-white rounded-xl border border-ink/10 p-6 space-y-4" aria-labelledby="new-entry-heading">
          <h2 id="new-entry-heading" className="text-xl font-semibold">New Journal Entry</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="kind" className="block text-sm font-medium mb-1">Type *</label>
              <select
                id="kind"
                value={formData.kind}
                onChange={e => setFormData(prev => ({ ...prev, kind: e.target.value as typeof formData.kind }))}
                className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
              >
                <option value="dialogue">Dialogue with a part</option>
                <option value="reflection">General reflection</option>
                <option value="unburdening">Unburdening record</option>
                <option value="interview">First interview</option>
                <option value="conflict">Inner conflict</option>
                <option value="rescue">Rescue session</option>
                <option value="council">Inner council</option>
                <option value="dream">Dream / hunch capture</option>
              </select>
            </div>
            <div>
              <SearchablePartSelect
                parts={parts.map(p => ({ id: p.id, name: p.name, group: p.group }))}
                value={formData.partId}
                onChange={partId => setFormData(prev => ({ ...prev, partId }))}
              />
            </div>
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium mb-1">Prompt / Question (Optional)</label>
              <input
                id="prompt"
                value={formData.prompt}
                onChange={e => setFormData(prev => ({ ...prev, prompt: e.target.value }))}
                className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
                placeholder="e.g., What does this part need me to know?"
              />
            </div>
            <div>
              <label htmlFor="body" className="block text-sm font-medium mb-1">Entry *</label>
              <textarea
                id="body"
                required
                rows={6}
                value={formData.body}
                onChange={e => setFormData(prev => ({ ...prev, body: e.target.value }))}
                className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
                placeholder="Write freely…"
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
                {submitting ? 'Saving…' : 'Save Entry'}
              </button>
            </div>
          </form>
        </section>
      )}

      {entries.length === 0 ? (
        <section className="text-center py-12 bg-white rounded-xl border border-ink/10">
          <h2 className="text-lg font-semibold">No Entries Yet</h2>
          <p className="text-ink/65 mt-2">Start your first journal entry to begin tracking your inner dialogue.</p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 px-4 py-2 bg-teal text-ivory rounded-lg hover:bg-teal-deep"
          >
            Write Your First Entry
          </button>
        </section>
      ) : (
        <section aria-labelledby="entries-heading" className="space-y-4">
          <h2 id="entries-heading" className="text-lg font-semibold">All Entries ({entries.length})</h2>
          <div className="space-y-3">
            {entries.map(entry => (
              <article key={entry.id} className="bg-white rounded-xl border border-ink/10 p-4 hover:border-teal/40 transition-colors">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-2 py-1 text-xs bg-teal-tint text-teal-deep rounded capitalize">{entry.kind}</span>
                  {entry.partId && parts.find(p => p.id === entry.partId) && (
                    <span className="px-2 py-1 text-xs bg-teal-tint/60 text-ink/75 rounded">
                      {getPartLabel(entry.partId)}
                    </span>
                  )}
                  <time className="px-2 py-1 text-xs bg-teal-tint/60 text-ink/75 rounded">
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </time>
                </div>
                {entry.prompt && <p className="text-sm text-ink/60 mb-1 italic">Prompt: {entry.prompt}</p>}
                <p className="text-ink/75 whitespace-pre-wrap">{entry.body}</p>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="mt-3 text-sm text-apricot-deep hover:underline"
                >
                  Delete
                </button>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}