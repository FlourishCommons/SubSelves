'use client';

export function SponsorButton() {
  const tiers = [
    { label: 'Supporter', amount: 5, desc: "Covers one user's monthly hosting" },
    { label: 'Sustainer', amount: 25, desc: 'Funds a maintainer hour', featured: true },
    { label: 'Patron', amount: 100, desc: 'Sponsors a new part illustration' },
  ];

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-6 sm:p-8">
      <h3 className="text-lg font-semibold text-center">Keep SubSelves free for everyone</h3>
      <p className="mt-2 text-sm text-ink/60 text-center">
        Community-funded • No ads • No tracking • Open source
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {tiers.map(t => (
          <a
            key={t.amount}
            href="https://opencollective.com/innerharmony"
            target="_blank"
            rel="noopener noreferrer"
            className={`relative rounded-xl border p-4 text-center transition-colors ${
              t.featured
                ? 'border-teal bg-teal-tint'
                : 'border-ink/10 hover:border-teal/30'
            }`}
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).plausible) {
                (window as any).plausible('sponsor_click', { props: { tier: t.label } });
              }
            }}
          >
            {t.featured && (
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-teal px-2 py-0.5 text-[10px] font-semibold text-ivory">
                Most popular
              </span>
            )}
            <div className="text-2xl font-bold text-ink">${t.amount}<span className="text-sm font-normal">/mo</span></div>
            <div className="mt-1 text-sm font-medium">{t.label}</div>
            <p className="mt-2 text-xs text-ink/55">{t.desc}</p>
            <button className="mt-4 w-full rounded-full bg-teal px-4 py-2 text-sm font-semibold text-ivory hover:bg-teal-deep">
              Become a {t.label}
            </button>
          </a>
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-ink/50">
        Or{' '}
        <a href="https://opencollective.com/innerharmony" target="_blank" rel="noopener noreferrer" className="underline hover:text-teal">
          one-time donation
        </a>{' '}
        •{' '}
        <a href="https://github.com/sponsors/innerharmony" target="_blank" rel="noopener noreferrer" className="underline hover:text-teal">
          GitHub Sponsors
        </a>
      </p>
    </div>
  );
}