'use client';

import Link from 'next/link';
import { safetyDisclaimer, attribution, crisisResources } from '@/content/safety';

export default function SafetyPage() {
  return (
    <main className="flex-1 p-6 max-w-3xl mx-auto w-full space-y-8">
      <header>
        <h1 className="text-2xl font-bold">Safety & Attribution</h1>
        <p className="text-ink/65 mt-1">Important information about this companion</p>
      </header>

      <section aria-labelledby="disclaimer-heading" className="space-y-4">
        <h2 id="disclaimer-heading" className="text-lg font-semibold">Disclaimer</h2>
        <div className="bg-white rounded-xl border border-ink/10 p-6 text-ink/75 whitespace-pre-wrap">
          {safetyDisclaimer}
        </div>
      </section>

      <section aria-labelledby="attribution-heading" className="space-y-4">
        <h2 id="attribution-heading" className="text-lg font-semibold">Attribution &amp; Credits</h2>
        <div className="bg-white rounded-xl border border-ink/10 p-6 text-ink/75 whitespace-pre-wrap">
          {attribution}
        </div>
      </section>

      <section aria-labelledby="crisis-heading" className="space-y-4">
        <h2 id="crisis-heading" className="text-lg font-semibold">Crisis Resources</h2>
        <p className="text-ink/65">
          These are generic international placeholders. Please replace with your local numbers.
        </p>
        <div className="space-y-3">
          {crisisResources.map((resource, i) => (
            <article key={i} className="bg-white rounded-xl border border-ink/10 p-4">
              <h3 className="font-medium">{resource.name}</h3>
              <p className="text-ink/65 mt-1">{resource.description}</p>
              {resource.phone && <p className="text-sm mt-1"><strong>Phone:</strong> {resource.phone}</p>}
              {resource.url && (
                <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-sm text-teal-deep hover:underline mt-1 inline-block">
                  Website →
                </a>
              )}
              <p className="text-xs text-ink/50 mt-2">Regions: {resource.regions.join(', ')}</p>
            </article>
          ))}
        </div>
      </section>

      <Link href="/learn" className="inline-block text-teal-deep hover:underline">
        ← Back to Learn
      </Link>
    </main>
  );
}