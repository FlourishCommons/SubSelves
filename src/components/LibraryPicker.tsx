'use client';

import { useMemo, useState, useEffect } from 'react';
import Image from 'next/image';
import { partGroups } from '@/content/taxonomy';
import { getDefaultPartsByGroup } from '@/content/defaultParts';
import { getPartArt } from '@/content/partArt';
import type { PartGroup } from '@/lib/types';
import type { DefaultPart } from '@/content/defaultParts';

interface LibraryPickerProps {
  onSelect: (part: DefaultPart) => void;
  spiritualityEnabled: boolean;
  isOpen: boolean;
  onClose: () => void;
  /** Optional initial search query */
  initialSearchQuery?: string;
  /** Callback when search changes (optional, for external sync) */
  onSearchChange?: (q: string) => void;
}

export function LibraryPicker({
  onSelect,
  spiritualityEnabled,
  isOpen,
  onClose,
  initialSearchQuery = '',
  onSearchChange,
}: LibraryPickerProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

  // Sync with parent if provided
  useEffect(() => {
    onSearchChange?.(searchQuery);
  }, [searchQuery, onSearchChange]);

  // Reset search when dialog opens
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
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-ink truncate">{part.name}</p>
                          <p className="text-xs text-ink/60 truncate">{group.label}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))
          )}
        </div>
      </div>
    </div>
  );
}