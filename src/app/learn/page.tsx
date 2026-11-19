'use client';

import { getAllArticles } from '@/content/learn';
import Link from 'next/link';

export default function LearnPage() {
  const articles = getAllArticles();

  return (
    <main className="flex-1 p-6 max-w-3xl mx-auto w-full space-y-8">
      <header>
        <h1 className="text-2xl font-bold">Learn</h1>
        <p className="text-ink/65 mt-1">Understand the map of your inner world</p>
      </header>

      <section aria-labelledby="articles-heading" className="space-y-4">
        <h2 id="articles-heading" className="text-lg font-semibold">Articles</h2>
        <div className="space-y-3">
          {articles.map(article => (
            <Link
              key={article.slug}
              href={`/learn/${article.slug}`}
              className="block bg-white rounded-xl border border-ink/10 p-4 hover:border-teal/40 transition-colors"
            >
              <h3 className="font-semibold">{article.title}</h3>
              <p className="text-sm text-ink/60 mt-1">{article.readTimeMin} min read</p>
            </Link>
          ))}
          <Link
            href="/learn/strategies"
            className="block bg-white rounded-xl border border-ink/10 p-4 hover:border-teal/40 transition-colors"
          >
            <h3 className="font-semibold">Strategies for Common Problems</h3>
            <p className="text-sm text-ink/60 mt-1">Guided tracks for recurring patterns — addiction, anger, anxiety, and more</p>
          </Link>
        </div>
      </section>

      <section aria-labelledby="safety-heading" className="space-y-4 border-t border-ink/10 pt-8">
        <h2 id="safety-heading" className="text-lg font-semibold">Safety & Attribution</h2>
        <div className="bg-white rounded-xl border border-ink/10 p-4 space-y-3 text-sm">
          <p className="text-ink/65">
            SubSelves is an educational self-exploration companion, not therapy. It does not provide diagnosis, treatment, or clinical advice.
          </p>
          <p className="text-ink/65">
            Draws on parts-work and inner-leadership traditions. SubSelves is independent and is not affiliated with or endorsed by any therapy method or institute.
          </p>
          <Link href="/learn/safety" className="text-teal-deep hover:underline">
            View crisis resources & full disclaimer →
          </Link>
        </div>
      </section>
    </main>
  );
}