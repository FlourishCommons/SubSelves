'use client';

import { useState } from 'react';
import { useSettings } from '@/lib/hooks/useSettings';
import { useRouter } from 'next/navigation';

export default function Onboarding() {
  const { settings, save, loading } = useSettings();
  const router = useRouter();
  const [name, setName] = useState(settings?.displayName || '');
  const [step, setStep] = useState(0);

  const steps = [
    { title: 'Welcome', desc: 'InnerHarmony helps you explore your inner system of parts — Guiding Voices, Protective Voices, and Young Voices — with curiosity and compassion.' },
    { title: 'How It Works', desc: 'Daily check-ins track mood and active parts. Guided sessions help you dialogue with parts. Journaling captures insights. Practices build Inner Leader energy.' },
    { title: 'Not Therapy', desc: 'This is an educational self-exploration companion. It does not replace professional mental health care. See Safety in Learn for crisis resources.' },
    { title: 'Your Name', desc: 'What would you like us to call you? (Optional)' },
  ];

  const current = steps[step];

  if (loading) {
    return <div className="flex-1 p-6 flex items-center justify-center">Loading…</div>;
  }

  const handleNext = async () => {
    if (step === steps.length - 1) {
      await save({ onboardingComplete: true, displayName: name || undefined });
      router.push('/');
      router.refresh();
    } else {
      setStep(s => s + 1);
    }
  };

  const handleBack = () => step > 0 && setStep(s => s - 1);

  return (
    <main className="flex-1 p-6 max-w-xl mx-auto w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">InnerHarmony</h1>
        <p className="text-ink/65 mt-2">A parts-based self-exploration companion</p>
      </div>

      <div className="bg-white rounded-xl border border-ink/10 p-8">
        <div className="mb-6">
          <div className="flex justify-center gap-2 mb-4">
            {steps.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-colors ${
                i <= step ? 'bg-teal' : 'bg-ink/15 '
              }`} />
            ))}
          </div>
          <p className="text-sm text-ink/60 text-center">Step {step + 1} of {steps.length}</p>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-3">{current.title}</h2>
        <p className="text-ink/65 text-center mb-8">{current.desc}</p>

        {step === steps.length - 1 && (
          <div className="max-w-xs mx-auto">
            <label htmlFor="name" className="block text-sm font-medium mb-2">Display name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
              placeholder="Optional"
            />
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={step === 0}
            className="px-6 py-2 border border-ink/15 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-tint/60"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-teal text-ivory rounded-lg hover:bg-teal-deep"
          >
            {step === steps.length - 1 ? 'Get Started' : 'Next'}
          </button>
        </div>
      </div>
    </main>
  );
}