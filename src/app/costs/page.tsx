'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CostItem {
  name: string;
  description: string;
  monthlyCost: number;
  category: 'hosting' | 'services' | 'domain' | 'development';
}

const costItems: CostItem[] = [
  {
    name: 'Vercel Hosting (Pro)',
    description: 'Edge hosting, serverless functions, global CDN',
    monthlyCost: 20,
    category: 'hosting',
  },
  {
    name: 'Vercel Analytics & Speed Insights',
    description: 'Privacy-friendly analytics and performance monitoring',
    monthlyCost: 10,
    category: 'services',
  },
  {
    name: 'Domain (subselves.app)',
    description: 'Custom domain registration & DNS',
    monthlyCost: 1.5,
    category: 'domain',
  },
  {
    name: 'Image Optimization (Vercel)',
    description: 'Automatic image optimization & global delivery',
    monthlyCost: 5,
    category: 'services',
  },
  {
    name: 'Database (Vercel KV/Postgres)',
    description: 'Serverless data storage for parts, sessions, social',
    monthlyCost: 15,
    category: 'services',
  },
];

const categoryLabels: Record<string, { label: string; color: string }> = {
  hosting: { label: 'Hosting', color: 'bg-teal-tint text-teal-deep' },
  services: { label: 'Services', color: 'bg-golden-tint text-golden-deep' },
  domain: { label: 'Domain', color: 'bg-apricot-tint text-apricot-deep' },
  development: { label: 'Development', color: 'bg-periwinkle-tint text-periwinkle-deep' },
};

const totalMonthly = 51.5;
const totalYearly = totalMonthly * 12;

export default function CostsPage() {
  const [monthlyAmount, setMonthlyAmount] = useState(5);
  const [isCustom, setIsCustom] = useState(false);
  const [isYearly, setIsYearly] = useState(false);

  const totalCost = isYearly ? totalYearly : totalMonthly;
  const contribution = monthlyAmount;

  const presetAmounts = [3, 5, 10, 15, 25, 50];

  const [showCostBreakdown, setShowCostBreakdown] = useState(true);

  return (
    <main className="flex flex-1 bg-ivory px-5 py-20 text-ink sm:px-8">
      <div className="w-full max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-deep mb-2">
            Transparent costs
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            What it costs to run SubSelves
          </h1>
          <p className="mt-4 text-base leading-7 text-ink/65 max-w-2xl mx-auto">
            No investors, no ads, no data selling. Just real costs covered by people who
            find value here. Every dollar goes directly to keeping SubSelves running.
          </p>
        </header>

        <details className="mb-8" open={showCostBreakdown} onToggle={() => setShowCostBreakdown(!showCostBreakdown)}>
          <summary className="cursor-pointer flex items-center gap-2 text-sm font-semibold text-ink/70 hover:text-ink">
            <svg className="w-5 h-5 text-ink/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            <span>Show cost breakdown</span>
          </summary>
          <div className="mt-4 space-y-3">
            {costItems.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between p-4 rounded-xl border border-ink/10 bg-white"
              >
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${categoryLabels[item.category].color}`}>
                    {categoryLabels[item.category].label}
                  </span>
                  <div>
                    <p className="font-medium text-ink">{item.name}</p>
                    <p className="text-xs text-ink/50">{item.description}</p>
                  </div>
                </div>
                <span className="font-semibold text-ink">${item.monthlyCost.toFixed(item.monthlyCost % 1 === 0 ? 0 : 1)}/mo</span>
              </div>
            ))}
            <div className="flex items-center justify-between p-4 rounded-xl border-2 border-teal/30 bg-teal-tint/50">
              <span className="font-semibold text-ink">Total monthly</span>
              <span className="text-2xl font-bold text-teal-deep">${totalMonthly.toFixed(1)}/mo</span>
            </div>
            <p className="text-sm text-ink/55 text-center">
              That&apos;s ${totalYearly.toFixed(0)}/year to keep SubSelves running for everyone.
            </p>
          </div>
        </details>

        <div className="mt-8 space-y-6">
          <div className="rounded-3xl border border-ink/10 bg-white p-6 sm:p-8">
            <div className="text-center mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-deep mb-2">
                Help cover the costs
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Chip in what feels right
              </h2>
              <p className="mt-2 text-base leading-7 text-ink/65 max-w-xl mx-auto">
                No pressure. No recurring obligation. Just a way to help keep SubSelves
                sustainable if it&apos;s been useful to you.
              </p>
            </div>

            <div className="space-y-6">
              {/* Monthly/Yearly toggle */}
              <div className="flex items-center justify-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="billing"
                    checked={!isYearly}
                    onChange={() => setIsYearly(false)}
                    className="h-4 w-4 text-teal border-ink/15 focus:ring-2 focus:ring-teal/30"
                  />
                  <span className="text-sm font-medium text-ink/70">Monthly</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="billing"
                    checked={isYearly}
                    onChange={() => setIsYearly(true)}
                    className="h-4 w-4 text-teal border-ink/15 focus:ring-2 focus:ring-teal/30"
                  />
                  <span className="flex items-center gap-1 text-sm font-medium text-ink/70">
                    Yearly
                    <span className="px-1.5 py-0.5 text-xs font-medium bg-golden-tint text-golden-deep rounded">
                      Save 20%
                    </span>
                  </span>
                </label>
              </div>

              {/* Preset amounts */}
              <div>
                <p className="text-sm font-medium text-ink/60 mb-3 text-center">Quick select</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {[3, 5, 10, 15, 25, 50].map((amt) => {
                    const displayAmt = isYearly ? amt * 12 : amt;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setMonthlyAmount(amt);
                          setIsCustom(false);
                        }}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                          monthlyAmount === amt
                            ? 'bg-teal text-ivory'
                            : 'bg-white text-ink border border-ink/15 hover:border-teal/40 hover:bg-teal-tint/60'
                        }`}
                      >
                        ${displayAmt}{isYearly ? '/yr' : '/mo'}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom amount slider */}
              <div className="border-t border-ink/10 pt-6">
                <p className="text-sm font-medium text-ink/60 mb-3 text-center">Or choose your own amount</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ink/60">Monthly contribution</span>
                    <span className="text-2xl font-bold text-ink">${monthlyAmount}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={100}
                    step={1}
                    value={monthlyAmount}
                    onChange={(e) => {
                      setMonthlyAmount(Number(e.target.value));
                      setIsCustom(true);
                    }}
                    className="w-full h-2 bg-ink/10 rounded-lg appearance-none cursor-pointer accent-teal"
                    aria-label="Monthly contribution amount"
                  />
                  <input
                    type="number"
                    min={1}
                    max={200}
                    step={1}
                    value={monthlyAmount}
                    onChange={(e) => {
                      setMonthlyAmount(Math.max(1, Math.min(200, Number(e.target.value) || 1)));
                      setIsCustom(true);
                    }}
                    className="w-full px-4 py-2 text-center text-lg font-medium border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
                    inputMode="numeric"
                  />
                </div>
              </div>

              {/* Impact statement */}
              <div className="rounded-xl border border-teal/30 bg-teal-tint/50 p-4 text-center">
                <p className="text-sm text-teal-deep">
                  ${monthlyAmount}/mo covers {((monthlyAmount / totalMonthly) * 100).toFixed(0)}% of monthly costs.
                  {isYearly && <span className="ml-2 text-golden-deep">Yearly = ${monthlyAmount * 12}/yr (20% off)</span>}
                </p>
              </div>

              {/* Contribute button */}
              <button
                className="w-full h-12 rounded-full bg-teal px-6 text-base font-semibold text-ivory shadow-sm transition-colors hover:bg-teal-deep"
              >
                Cover ${monthlyAmount}/mo
              </button>

              <p className="text-xs text-ink/50 text-center mt-4">
                No recurring obligation. Cancel anytime. Secure payment via Stripe (coming soon).
              </p>
            </div>
          </div>

          <div className="mt-12 rounded-3xl border border-ink/10 bg-white p-6 sm:p-8 text-center">
            <h3 className="text-lg font-semibold text-ink mb-3">Other ways to help</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/community"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-ink/10 bg-white text-sm font-semibold text-ink/70 hover:border-teal hover:bg-teal-tint/60 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <span>Join the community</span>
              </Link>
              <Link
                href="/parts/library"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-ink/10 bg-white text-sm font-semibold text-ink/70 hover:border-teal hover:bg-teal-tint/60 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z" /></svg>
                <span>Explore the library</span>
              </Link>
              <Link
                href="/practice"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-ink/10 bg-white text-sm font-semibold text-ink/70 hover:border-teal hover:bg-teal-tint/60 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253v-13Z" /></svg>
                <span>Try a practice</span>
              </Link>
            </div>
          </div>

          <Link
            href="/"
            className="mt-8 inline-flex h-11 items-center justify-center rounded-full border border-teal/30 bg-white px-6 text-sm font-semibold text-teal-deep transition-colors hover:border-teal hover:bg-teal-tint"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}