'use client';

import { strategyTracks } from '@/content/strategies';
import { resolvePartHrefByName, shortPartLabel } from '@/content/partMentions';
import { PartMentionText } from '@/components/PartMentionText';
import { useParts } from '@/lib/hooks/useParts';
import Link from 'next/link';

export default function StrategiesPage() {
  const { parts } = useParts();
  return (
    <main className="flex-1 p-6 max-w-3xl mx-auto w-full space-y-8">
      <header className="space-y-3">
        <h1 className="text-2xl font-bold">Strategies for Common Problems</h1>
        <p className="text-ink/65 text-lg">
          Gentle, parts-informed tracks for patterns that show up again and again. Each track offers a framing and
          concrete steps — part names link so you can explore or add them to your map.
        </p>
        <p className="text-sm text-ink/60">
          This is an educational companion, not a replacement for professional care.{' '}
          <Link href="/learn/safety" className="text-teal-deep hover:underline">
            View safety resources & full disclaimer
          </Link>
          {' '}→
        </p>
      </header>

      <section aria-labelledby="tracks-heading" className="space-y-6">
        <h2 id="tracks-heading" className="sr-only">
          Strategy tracks
        </h2>
        {strategyTracks.map(track => (
          <article
            key={track.id}
            className="bg-white rounded-xl border border-ink/10 p-6 space-y-5"
          >
            <header className="space-y-3">
              <h3 className="text-xl font-semibold">{track.problem}</h3>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-tint text-teal-deep border border-teal/30">
                {track.trackName}
              </span>
            </header>

            <div className="prose prose-gray max-w-none">
              <p className="text-ink/75 leading-relaxed">
                <PartMentionText text={track.summary} />
              </p>
            </div>

            <section aria-labelledby={`steps-${track.id}`} className="space-y-3 pt-2 border-t border-ink/10">
              <h4 id={`steps-${track.id}`} className="font-medium text-ink">
                Steps
              </h4>
              <ol className="space-y-3 pl-6 list-decimal">
                {track.steps.map((step, index) => (
                  <li key={index} className="text-ink/75 leading-relaxed">
                    <PartMentionText text={step} />
                  </li>
                ))}
              </ol>
            </section>

            {track.keyParts.length > 0 && (
              <section aria-labelledby={`key-parts-${track.id}`} className="space-y-3 pt-2 border-t border-ink/10">
                <h4 id={`key-parts-${track.id}`} className="font-medium text-ink">
                  Key parts involved
                </h4>
                <div className="flex flex-wrap gap-2">
                  {track.keyParts.map(partName => (
                    <Link
                      key={partName}
                      href={resolvePartHrefByName(partName, parts)}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-teal-tint/60 text-ink border border-ink/10 hover:border-teal/40 hover:bg-teal-tint transition-colors"
                    >
                      {shortPartLabel(partName)}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {track.caution && (
              <aside
                className="bg-golden-tint border border-golden/40 rounded-lg p-4 text-sm"
                role="note"
              >
                <p className="text-golden-deep">
                  <PartMentionText text={track.caution} />
                </p>
              </aside>
            )}
          </article>
        ))}
      </section>

      <p className="text-center text-sm text-ink/60 border-t border-ink/10 pt-6">
        This library is growing — more tracks will be added over time.
      </p>
    </main>
  );
}