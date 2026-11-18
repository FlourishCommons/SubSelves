'use client';

import { useParams } from 'next/navigation';
import { getArticle, getAllArticles } from '@/content/learn';
import Link from 'next/link';
import { Suspense } from 'react';

function LearnArticleContent() {
  const params = useParams();
  const slug = params.slug as string;
  const article = getArticle(slug);
  const allArticles = getAllArticles();
  const currentIndex = allArticles.findIndex(a => a.slug === slug);

  if (!article) {
    return (
      <main className="flex-1 p-6 max-w-3xl mx-auto w-full text-center">
        <h1 className="text-2xl font-bold">Article Not Found</h1>
        <Link href="/learn" className="mt-4 text-teal-deep hover:underline">Back to Learn</Link>
      </main>
    );
  }

  return (
    <main className="flex-1 p-6 max-w-3xl mx-auto w-full">
      <Link href="/learn" className="inline-block mb-6 text-teal-deep hover:underline text-sm">
        ← Back to Learn
      </Link>

      <article className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold">{article.title}</h1>
          <p className="text-ink/60 mt-1">{article.readTimeMin} min read</p>
        </header>

        <div className="prose prose-gray max-w-none whitespace-pre-wrap">
          {article.body}
        </div>

        <nav className="flex justify-between border-t border-ink/10 pt-6" aria-label="Article navigation">
          {currentIndex > 0 && (
            <Link
              href={`/learn/${allArticles[currentIndex - 1].slug}`}
              className="text-teal-deep hover:underline"
            >
              ← {allArticles[currentIndex - 1].title}
            </Link>
          )}
          {currentIndex < allArticles.length - 1 && (
            <Link
              href={`/learn/${allArticles[currentIndex + 1].slug}`}
              className="text-teal-deep hover:underline text-right"
            >
              {allArticles[currentIndex + 1].title} →
            </Link>
          )}
        </nav>
      </article>
    </main>
  );
}

export default function LearnArticlePage() {
  return (
    <Suspense fallback={<div className="flex-1 p-6 max-w-3xl mx-auto w-full">Loading…</div>}>
      <LearnArticleContent />
    </Suspense>
  );
}