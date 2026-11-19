'use client';

import { useEffect, useState } from 'react';

export function SponsorWall() {
  const [sponsors, setSponsors] = useState<string[]>([]);

  useEffect(() => {
    let mounted = true;
    fetch('https://opencollective.com/flourishcommons/members/all.json')
      .then(r => r.json())
      .then(data => {
        if (mounted) {
          setSponsors(
            data
              .filter((m: any) => m.totalAmountDonated >= 500 && m.image)
              .map((m: any) => m.image)
              .slice(0, 30)
          );
        }
      })
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  if (!sponsors.length) return null;

  return (
    <section className="py-12" aria-label="Community sponsors">
      <h3 className="text-center text-sm font-semibold uppercase tracking-[0.1em] text-ink/50 mb-6">
        Sustained by
      </h3>
      <div className="flex flex-wrap justify-center gap-3">
        {sponsors.slice(0, 24).map((src, i) => (
          <img key={i} src={src} alt="" className="h-10 w-10 rounded-full bg-ivory p-1" loading="lazy" />
        ))}
      </div>
    </section>
  );
}