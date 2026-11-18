'use client';

import Image from 'next/image';
import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useParts } from '@/lib/hooks/useParts';
import { useSettings } from '@/lib/hooks/useSettings';
import { getPartArt } from '@/content/partArt';
import { partGroups } from '@/content/taxonomy';
import { getDefaultPartsByGroup } from '@/content/defaultParts';
import type { Part, PartGroup } from '@/lib/types';
import type { DefaultPart } from '@/content/defaultParts';
import { AddPartForm, type AddPartInput } from '@/components/AddPartForm';
import { LibraryPicker } from '@/components/LibraryPicker';

interface PartsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'select' | 'browse';
  /** In select mode: step id for context (unused but kept for API compat) */
  stepId?: string;
  /** In select mode: suggested groups to surface first */
  suggestedGroups?: PartGroup[];
  /** In select mode: allow multiple selections */
  multiple?: boolean;
  /** Currently selected part ids (for select mode) */
  selectedPartIds?: string[];
  /** Callback when selection changes (select mode) */
  onSelectionChange?: (partIds: string[]) => void;
  /** Callback when a new part is added (so the parent can refresh its own parts list) */
  onPartAdded?: (part: Part) => void;
}

function getGroupInfo(group: PartGroup) {
  return partGroups.find(g => g.key === group);
}

export function PartsDrawer({
  isOpen,
  onClose,
  mode,
  suggestedGroups = [],
  multiple = false,
  selectedPartIds = [],
  onSelectionChange,
  onPartAdded,
}: PartsDrawerProps) {
  const { parts, addPart, loading } = useParts();
  const { settings } = useSettings();
  const spiritualityEnabled = settings?.spiritualityEnabled ?? false;
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  // Handle library selection - adds part to user's parts and selects it
  const handleLibrarySelect = useCallback(
    async (part: DefaultPart) => {
      const newPart = await addPart({
        name: part.name,
        group: part.group,
        role: '',
        fear: '',
        bodyLocation: '',
        notes: '',
      });
      onPartAdded?.(newPart);

      if (mode === 'select' && onSelectionChange) {
        const newSelection = multiple
          ? [...selectedPartIds, newPart.id]
          : [newPart.id];
        onSelectionChange(newSelection);
        if (!multiple) {
          setShowLibrary(false);
          onClose();
          return;
        }
      }
      setShowLibrary(false);
    },
    [addPart, mode, multiple, onSelectionChange, onClose, selectedPartIds, onPartAdded]
  );

  // Group parts by PartGroup
  const groupedParts = useMemo(() => {
    if (loading) return [];

    const allParts = parts.filter(p => p.group !== 'spiritual' || spiritualityEnabled);

    // Determine group order: suggestedGroups first, then remaining
    const orderedGroups = [
      ...suggestedGroups,
      ...partGroups
        .filter(g => g.key !== 'spiritual' || spiritualityEnabled)
        .filter(g => !suggestedGroups.includes(g.key))
        .map(g => g.key)
    ] as PartGroup[];

    return orderedGroups
      .map(groupKey => {
        const groupInfo = getGroupInfo(groupKey);
        const groupParts = allParts.filter(p => p.group === groupKey);
        if (groupParts.length === 0) return null;
        return { groupKey, groupInfo, parts: groupParts };
      })
      .filter(Boolean) as Array<{ groupKey: PartGroup; groupInfo: ReturnType<typeof getGroupInfo>; parts: Part[] }>;
  }, [parts, loading, spiritualityEnabled, suggestedGroups]);

  // Filter parts by search query
  const filteredGroups = useMemo(() => {
    if (!searchQuery) return groupedParts;
    const q = searchQuery.toLowerCase();
    return groupedParts
      .map((g) => ({
        ...g,
        parts: g.parts.filter((p) => p.name.toLowerCase().includes(q)),
      }))
      .filter((g) => g.parts.length > 0);
  }, [groupedParts, searchQuery]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      lastFocusedElementRef.current = document.activeElement as HTMLElement;
      // Focus search input after render
      setTimeout(() => inputRef.current?.focus(), 0);
    } else if (lastFocusedElementRef.current) {
      lastFocusedElementRef.current.focus();
    }
  }, [isOpen]);

  // Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Trap focus within drawer (simplified)
  useEffect(() => {
    if (!isOpen) return;
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const focusableElements = listRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusableElements?.length) return;
      const first = focusableElements[0] as HTMLElement;
      const last = focusableElements[focusableElements.length - 1] as HTMLElement;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  const handleSelect = useCallback((part: Part) => {
    if (mode === 'select' && onSelectionChange) {
      const newSelection = multiple
        ? selectedPartIds.includes(part.id)
          ? selectedPartIds.filter(id => id !== part.id)
          : [...selectedPartIds, part.id]
        : [part.id];
      onSelectionChange(newSelection);
      if (!multiple) {
        onClose();
      }
    }
  }, [mode, multiple, onSelectionChange, onClose, selectedPartIds]);

  const handleClearSelection = useCallback(() => {
    if (mode === 'select' && onSelectionChange) {
      onSelectionChange([]);
    }
  }, [mode, onSelectionChange]);

  const handleAddPart = useCallback(
    async (input: AddPartInput) => {
      const newPart = await addPart(input);
      onPartAdded?.(newPart);

      if (mode === 'select' && onSelectionChange) {
        const newSelection = multiple
          ? [...selectedPartIds, newPart.id]
          : [newPart.id];
        onSelectionChange(newSelection);
        if (!multiple) {
          onClose();
          return;
        }
      }

      setShowAddForm(false);
    },
    [addPart, mode, multiple, onSelectionChange, onClose, selectedPartIds, onPartAdded]
  );

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const allParts = filteredGroups.flatMap(g => g.parts);
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => Math.min(prev + 1, allParts.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => Math.max(prev - 1, -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && allParts[highlightedIndex]) {
          handleSelect(allParts[highlightedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
      case 'Tab':
        // Let focus trap handle this
        break;
      default:
        break;
    }
  }, [filteredGroups, handleSelect, isOpen, onClose, highlightedIndex]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setHighlightedIndex(-1);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/50 lg:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={mode === 'select' ? 'drawer-title-select' : 'drawer-title-browse'}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-2xl lg:rounded-2xl border border-ink/10 w-full max-w-lg max-h-[85vh] lg:max-h-[80vh] flex flex-col overflow-hidden shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-ink/10 sticky top-0 bg-white z-10">
          <h2
            id={mode === 'select' ? 'drawer-title-select' : 'drawer-title-browse'}
            className="text-lg font-semibold"
          >
            {mode === 'select'
              ? suggestedGroups.length > 0
                ? 'Choose a Part'
                : 'Choose Parts'
              : 'Your Parts'}
          </h2>
          <div className="flex items-center gap-2">
            {mode === 'select' && (
              <button
                type="button"
                onClick={() => setShowLibrary(true)}
                className="p-2 rounded-lg hover:bg-teal-tint text-teal-deep font-semibold text-sm"
                aria-label="Pick a part from the library"
              >
                📚 Library
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowAddForm(true)}
              className="p-2 rounded-lg hover:bg-teal-tint text-teal-deep font-semibold text-sm"
              aria-label="Add a part"
            >
              + Add
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-teal-tint text-ink/60"
              aria-label="Close parts drawer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search */}
        {!showAddForm && (
          <div className="p-4 border-b border-ink/10 sticky top-12 lg:top-14 bg-white z-10">
            <label htmlFor="drawer-search" className="sr-only">
              {mode === 'select' ? 'Search parts to choose' : 'Search your parts'}
            </label>
            <input
              ref={inputRef}
              id="drawer-search"
              type="search"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Search parts…"
              className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
              autoComplete="off"
            />
          </div>
        )}

        {/* Parts List / Add form / Library */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6" ref={listRef}>
          {showLibrary ? (
            <LibraryPicker
              onSelect={handleLibrarySelect}
              spiritualityEnabled={spiritualityEnabled}
              isOpen={true}
              onClose={() => setShowLibrary(false)}
              initialSearchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          ) : showAddForm ? (
            <AddPartForm
              spiritualityEnabled={spiritualityEnabled}
              onCancel={() => setShowAddForm(false)}
              onAdd={handleAddPart}
            />
          ) : loading ? (
            <p className="text-center text-ink/60 py-8">Loading parts…</p>
          ) : filteredGroups.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-ink/60 mb-3">
                {searchQuery ? 'No parts match your search.' : 'No parts yet.'}
              </p>
              {!searchQuery && (
                <button
                  type="button"
                  onClick={() => setShowAddForm(true)}
                  className="px-4 py-2 bg-teal text-ivory rounded-lg hover:bg-teal-deep text-sm"
                >
                  + Add a part
                </button>
              )}
            </div>
          ) : (
            filteredGroups.map(({ groupKey, groupInfo, parts: groupParts }) => (
              <section key={groupKey} aria-labelledby={`drawer-${groupKey}-heading`}>
                <h3
                  id={`drawer-${groupKey}-heading`}
                  className="flex items-center gap-2 text-sm font-semibold text-ink/75 mb-3 pb-2 border-b border-ink/10"
                >
                  <span>{groupInfo?.emoji}</span>
                  {groupInfo?.label}
                  {suggestedGroups.includes(groupKey) && (
                    <span className="px-2 py-0.5 text-xs bg-teal-tint text-teal-deep rounded">
                      Suggested
                    </span>
                  )}
                </h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {groupParts.map((part) => {
                    const globalIndex = filteredGroups.flatMap((g) => g.parts).indexOf(part);
                    const isSelected = selectedPartIds.includes(part.id);
                    const isHighlighted = globalIndex === highlightedIndex;
                    const art = getPartArt(part.name, part.group);
                    return (
                      <button
                        key={part.id}
                        onClick={() => handleSelect(part)}
                        onMouseEnter={() => setHighlightedIndex(globalIndex)}
                        className={`text-left p-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal ${
                          isSelected
                            ? 'border-teal bg-teal-tint '
                            : 'border-ink/10 hover:border-teal hover:bg-teal-tint '
                        } ${isHighlighted ? 'ring-2 ring-teal/30' : ''}`}
                        aria-pressed={isSelected}
                      >
                        <div className="flex items-start gap-3">
                          {art ? (
                            <Image
                              src={art.icon}
                              alt=""
                              width={40}
                              height={40}
                              loading="lazy"
                              className="h-10 w-10 shrink-0 rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-base">{groupInfo?.emoji}</span>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-ink truncate">{part.name}</p>
                            {part.role && (
                              <p className="text-xs text-ink/60 truncate mt-0.5">{part.role}</p>
                            )}
                            {part.bodyLocation && (
                              <p className="text-xs text-ink/50 mt-0.5">📍 {part.bodyLocation}</p>
                            )}
                          </div>
                          {isSelected && (
                            <svg className="w-5 h-5 text-teal-deep flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-ink/10 bg-ivory flex gap-3">
          {mode === 'select' && selectedPartIds.length > 0 && (
            <button
              type="button"
              onClick={handleClearSelection}
              className="flex-1 px-4 py-2 border border-ink/15 rounded-lg hover:bg-teal-tint text-sm"
            >
              Clear Selection
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className={`flex-1 px-4 py-2 rounded-lg ${
              mode === 'select' && selectedPartIds.length > 0
                ? 'bg-teal text-ivory hover:bg-teal-deep'
                : 'border border-ink/15 hover:bg-teal-tint '
            }`}
          >
            {mode === 'select' && selectedPartIds.length > 0 ? 'Done' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}