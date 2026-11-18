import Image from 'next/image';
import Link from 'next/link';
import sourceMap from '@/content/parts/source-map.json';

export const instant = false;

const categoryStyles: Record<string, string> = {
  Manager: 'bg-apricot-tint text-apricot-deep',
  Guardian: 'bg-teal-tint text-teal-deep',
  'Inner Child': 'bg-periwinkle-tint text-periwinkle-deep',
};

export default function SourceMapPage() {
  const parts = sourceMap.parts.filter(
    (p): p is (typeof sourceMap.parts)[number] & { thumbnail: string } =>
      typeof p.thumbnail === 'string'
  );

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:py-14">
      <header className="max-w-3xl">
        <Link
          href="/parts/library"
          className="text-sm font-medium text-teal-deep hover:text-teal"
        >
          Browse the full artwork library →
        </Link>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Parts with Thumbnails
        </h1>
        <p className="mt-3 text-base leading-7 text-ink/65">
          Showing {parts.length} of {sourceMap.parts.length} source-map entries
          that have legacy thumbnail artwork attached.
        </p>
      </header>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {parts.map((part) => (
          <article
            key={part.id}
            className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm shadow-teal/5"
          >
            <Image
              src={part.thumbnail}
              alt={part.appName}
              width={512}
              height={512}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-base font-semibold text-ink">
                {part.appName}
              </h3>
              <span
                className={`mt-2 inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  categoryStyles[part.category] ?? 'bg-teal-tint text-teal-deep'
                }`}
              >
                {part.category}
              </span>
              <p className="mt-3 text-sm leading-6 text-ink/60">
                {part.functionSummary}
              </p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
