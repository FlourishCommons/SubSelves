'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { defaultParts } from '@/content/defaultParts';
import { getPartArt } from '@/content/partArt';
import { partGroups } from '@/content/taxonomy';
import type { PartGroup } from '@/lib/types';

type FilterKey = 'all' | PartGroup;

const groupStyles: Record<
  PartGroup,
  { dot: string; border: string; ring: string; badge: string }
> = {
  manager: {
    dot: 'bg-apricot',
    border: 'border-apricot/30',
    ring: 'border-apricot',
    badge: 'bg-apricot-tint text-apricot-deep',
  },
  guardian: {
    dot: 'bg-golden',
    border: 'border-golden/40',
    ring: 'border-golden',
    badge: 'bg-golden-tint text-golden-deep',
  },
  innerKid: {
    dot: 'bg-periwinkle',
    border: 'border-periwinkle/40',
    ring: 'border-periwinkle',
    badge: 'bg-periwinkle-tint text-periwinkle-deep',
  },
  spiritual: {
    dot: 'bg-sage',
    border: 'border-sage/40',
    ring: 'border-sage',
    badge: 'bg-sage-tint text-sage-deep',
  },
};

const filters: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All parts' },
  ...partGroups.map((group) => ({ key: group.key, label: group.label })),
];

export default function PartsLibraryPage() {
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
    <main className="flex-1 bg-ivory">
      <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
        <div className="flex flex-col gap-6 border-b border-ink/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <Link
              href="/parts"
              className="inline-flex items-center gap-2 text-sm font-medium text-teal-deep hover:text-teal"
            >
              <span aria-hidden="true">←</span>
              Your Parts
            </Link>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Parts Library
            </h1>
            <p className="mt-3 text-base leading-7 text-ink/65">
              Explore all {defaultParts.length} named parts and their symbolic
              artwork. Each image is an invitation to reflect, not a diagnosis.
            </p>
          </div>
          <Link
            href="/parts"
            className="inline-flex h-11 shrink-0 items-center justify-center rounded-full border border-teal/30 bg-white px-5 text-sm font-semibold text-teal-deep transition-colors hover:border-teal hover:bg-teal-tint"
          >
            Go to your parts
          </Link>
        </div>

        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <label htmlFor="parts-library-search" className="sr-only">
              Search the full parts library
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
              id="parts-library-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name—Critic, Worrier, Playful…"
              className="h-11 w-full rounded-full border border-ink/10 bg-white pl-10 pr-4 text-sm text-ink placeholder:text-ink/40 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
            />
          </div>

          <p className="text-sm text-ink/55" aria-live="polite">
            Showing {filteredParts.length} of {defaultParts.length} parts
          </p>
        </div>

        <div
          className="mt-4 flex flex-wrap gap-2"
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
                    ? 'border-teal bg-teal text-ivory'
                    : 'border-ink/15 bg-white text-ink/70 hover:border-teal/40'
                }`}
              >
                {filter.key !== 'all' && (
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 rounded-full ${
                      isActive
                        ? 'bg-ivory/80'
                        : groupStyles[filter.key].dot
                    }`}
                  />
                )}
                {filter.label}
              </button>
            );
          })}
        </div>

        <div className="mt-10 space-y-12">
          {visibleGroups.map((group) => {
            const parts = filteredParts.filter(
              (part) => part.group === group.key
            );

            if (parts.length === 0) return null;
            const styles = groupStyles[group.key];

            return (
              <section
                key={group.key}
                aria-labelledby={`library-${group.key}-heading`}
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2
                      id={`library-${group.key}-heading`}
                      className="flex items-center gap-2.5 text-xl font-semibold text-ink"
                    >
                      <span
                        aria-hidden="true"
                        className={`h-2.5 w-2.5 rounded-full ${styles.dot}`}
                      />
                      {group.label}
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles.badge}`}>
                        {parts.length}
                      </span>
                    </h2>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-ink/60">
                      {group.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
{parts.map((part, index) => {
                    const art = getPartArt(part.name, part.group);
                    if (!art) return null;

                    return (
                      <article
                        key={`${part.group}-${part.name}`}
                        className={`group flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm shadow-teal/5 transition-shadow hover:shadow-md hover:shadow-teal/10 ${styles.border}`}
                      >
                        <div className="relative aspect-square overflow-hidden bg-ivory">
                          <div
                            className={`absolute inset-[4%] rounded-full border-[0.078125cqw] bg-ivory p-[0.05cqw] ${styles.ring}`}
                          >
                            <div className="relative h-full w-full overflow-hidden rounded-full bg-ivory">
                              <Image
                                src={art.thumbnail}
                                alt={`Symbolic artwork for ${part.name}`}
                                fill
                                sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
                                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                              />
                            </div>
                          </div>
                          {art.provisional && (
                            <span className="absolute right-3 top-3 rounded-full bg-golden-tint px-2 py-1 text-[11px] font-semibold text-golden-deep shadow-sm">
                              Provisional
                            </span>
                          )}
                        </div>
                        <div className="flex flex-1 flex-col p-4">
                          <h3 className="text-base font-semibold leading-snug text-ink">
                            {part.name}
                          </h3>
                          <Link
                            href={`/parts?add=${encodeURIComponent(part.name)}&group=${part.group}`}
                            className="mt-auto pt-4 text-sm font-semibold text-teal-deep underline decoration-teal/30 underline-offset-4 hover:text-teal"
                          >
                            Add this part
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}

          {filteredParts.length === 0 && (
            <div className="rounded-3xl border border-dashed border-ink/20 bg-white px-6 py-14 text-center">
              <p className="text-base font-semibold text-ink">
                No parts match that search.
              </p>
              <p className="mt-2 text-sm text-ink/55">
                Try a broader word, or clear the search to see the whole
                library.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
