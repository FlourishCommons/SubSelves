'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { defaultParts } from '@/content/defaultParts';
import { getPartArt } from '@/content/partArt';
import { partGroups } from '@/content/taxonomy';
import type { PartGroup } from '@/lib/types';

type FilterKey = 'all' | PartGroup;

const groupStyles: Record<
  PartGroup,
  { dot: string; pill: string; active: string }
> = {
  manager: {
    dot: 'bg-apricot',
    pill: 'border-apricot/40 bg-apricot-tint text-ink',
    active: 'border-teal bg-teal text-ivory',
  },
  guardian: {
    dot: 'bg-golden',
    pill: 'border-golden/40 bg-golden-tint text-ink',
    active: 'border-teal bg-teal text-ivory',
  },
  innerKid: {
    dot: 'bg-periwinkle',
    pill: 'border-periwinkle/40 bg-periwinkle-tint text-ink',
    active: 'border-teal bg-teal text-ivory',
  },
  spiritual: {
    dot: 'bg-sage',
    pill: 'border-sage/50 bg-sage-tint text-ink',
    active: 'border-teal bg-teal text-ivory',
  },
};

const filters: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All parts' },
  ...partGroups.map((group) => ({ key: group.key, label: group.label })),
];

export default function PartsLibraryDemo() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  const filteredParts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return defaultParts.filter((part) => {
      const matchesGroup =
        activeFilter === 'all' || part.group === activeFilter;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        part.name.toLowerCase().includes(normalizedQuery);

      return matchesGroup && matchesQuery;
    });
  }, [activeFilter, query]);

  const visibleGroups = partGroups.filter(
    (group) => activeFilter === 'all' || group.key === activeFilter
  );

  return (
    <div className="rounded-3xl border border-ink/10 bg-white p-5 shadow-sm shadow-teal/10 sm:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <label htmlFor="parts-library-demo-search" className="sr-only">
            Search the parts library
          </label>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            id="parts-library-demo-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search parts—Critic, Worrier, Playful…"
            className="h-11 w-full rounded-full border border-ink/10 bg-ivory pl-10 pr-4 text-sm text-ink placeholder:text-ink/40 focus:border-teal focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal/20"
          />
        </div>

        <p className="text-sm text-ink/55" aria-live="polite">
          {filteredParts.length} of {defaultParts.length} parts
        </p>
      </div>

      <div
        className="mt-5 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter parts by group"
      >
        {filters.map((filter) => {
          const isActive = activeFilter === filter.key;

          return (
            <button
              key={filter.key}
              type="button"
              onClick={() => setActiveFilter(filter.key)}
              aria-pressed={isActive}
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                isActive
                  ? filter.key === 'all'
                    ? 'border-teal bg-teal text-ivory'
                    : groupStyles[filter.key].active
                  : 'border-ink/15 bg-white text-ink/70 hover:border-teal/40'
              }`}
            >
              {filter.key !== 'all' && (
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 rounded-full ${
                    isActive ? 'bg-ivory/80' : groupStyles[filter.key].dot
                  }`}
                />
              )}
              {filter.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 max-h-[30rem] space-y-6 overflow-y-auto pr-1">
        {visibleGroups.map((group) => {
          const parts = filteredParts.filter(
            (part) => part.group === group.key
          );

          if (parts.length === 0) return null;

          return (
            <section
              key={group.key}
              aria-labelledby={`parts-demo-${group.key}-heading`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className={`h-2 w-2 rounded-full ${groupStyles[group.key].dot}`}
                />
                <h3
                  id={`parts-demo-${group.key}-heading`}
                  className="text-sm font-semibold text-ink"
                >
                  {group.label}
                </h3>
                <span className="rounded-full bg-teal-tint px-2 py-0.5 text-[11px] font-medium text-teal-deep">
                  {parts.length}
                </span>
              </div>
              <p className="mt-1.5 text-xs leading-5 text-ink/55">
                {group.description}
              </p>

              <ul className="mt-3 flex flex-wrap gap-2">
                {parts.slice(0, 20).map((part) => {
                  const art = getPartArt(part.name, part.group);

                  return (
                    <li key={`${part.group}-${part.name}`}>
                      <span
                        className={`inline-flex items-center gap-2 rounded-full border py-1 pl-1 pr-3 text-xs font-medium ${groupStyles[part.group].pill}`}
                      >
                        {art && (
                          <Image
                            src={art.icon}
                            alt=""
                            width={24}
                            height={24}
                            loading="lazy"
                            className="h-6 w-6 shrink-0 rounded-full object-cover"
                          />
                        )}
                        {part.name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}

        {filteredParts.length === 0 && (
          <div className="rounded-2xl border border-dashed border-ink/20 bg-ivory px-6 py-10 text-center">
            <p className="text-sm font-semibold text-ink">
              No parts match that search.
            </p>
            <p className="mt-1 text-sm text-ink/55">
              Try a broader word, or clear the search to see the whole library.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
