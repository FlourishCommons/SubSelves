'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DonatePage() {
  const [amount, setAmount] = useState(5);
  const [isCustom, setIsCustom] = useState(false);

  const presetAmounts = [5, 10, 20, 50, 100];

  const handleDonate = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('https://opencollective.com/flourishcommons/donate', '_blank');
  };

  return (
    <main className="flex flex-1 items-center justify-center bg-ivory px-5 py-20 text-ink sm:px-8">
      <div className="w-full max-w-xl rounded-3xl border border-ink/10 bg-white p-8 text-center shadow-sm sm:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-deep">
          Community supported
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Support our collective
        </h1>
        <p className="mt-4 text-base leading-7 text-ink/65">
          Your support helps keep SubSelves accessible for people doing the
          quiet, generational work of healing.
        </p>

        <div className="mt-10 space-y-6">
          {/* Preset amount buttons */}
          <div>
            <p className="text-sm font-medium text-ink/60 mb-3">Quick select</p>
            <div className="flex flex-wrap justify-center gap-2">
              {presetAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => {
                    setAmount(amt);
                    setIsCustom(false);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    amount === amt && !isCustom
                      ? 'bg-teal text-ivory'
                      : 'bg-white text-ink border border-ink/15 hover:bg-teal-tint/60'
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>
          </div>

          {/* Custom amount slider */}
          <div className="border-t border-ink/10 pt-6">
            <p className="text-sm font-medium text-ink/60 mb-3">Or choose your own amount</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink/60">Custom amount</span>
                <span className="text-2xl font-bold text-ink">${amount}</span>
              </div>
              <input
                type="range"
                min={1}
                max={500}
                step={1}
                value={amount}
                onChange={(e) => {
                  setAmount(Number(e.target.value));
                  setIsCustom(true);
                }}
                className="w-full h-2 bg-ink/10 rounded-lg appearance-none cursor-pointer accent-teal"
                aria-label="Donation amount"
              />
              <input
                type="number"
                min={1}
                max={500}
                step={1}
                value={amount}
                onChange={(e) => {
                  setAmount(Math.max(1, Math.min(500, Number(e.target.value) || 1)));
                  setIsCustom(true);
                }}
                className="w-full px-4 py-2 text-center text-lg font-medium border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
                inputMode="numeric"
              />
            </div>
          </div>

          {/* Donate button - links to Open Collective */}
          <Link
            href="https://opencollective.com/flourishcommons/donate"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-12 rounded-full bg-teal px-6 text-base font-semibold text-ivory shadow-sm transition-colors hover:bg-teal-deep"
          >
            Donate ${amount} on Open Collective
          </Link>
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-full border border-teal/30 bg-white px-6 text-sm font-semibold text-teal-deep transition-colors hover:border-teal hover:bg-teal-tint"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}