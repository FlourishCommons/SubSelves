'use client';

import { getAllTroubleshooting } from '@/content/troubleshooting';

export default function TroubleshootingPage() {
  const entries = getAllTroubleshooting();

  return (
    <main className="flex-1 p-6 max-w-3xl mx-auto w-full space-y-8">
      <header>
        <h1 className="text-2xl font-bold">Troubleshooting</h1>
        <p className="text-ink/65 mt-1">Common sticking points in parts work — and what to try</p>
      </header>

      <section aria-labelledby="entries-heading" className="space-y-6">
        <h2 id="entries-heading" className="text-lg font-semibold">When You&apos;re Stuck</h2>
        <div className="space-y-4">
          {entries.map(entry => (
            <article key={entry.id} className="bg-white rounded-xl border border-ink/10 p-6 space-y-4">
              <h3 className="text-xl font-semibold">{entry.title}</h3>

              <div>
                <h4 className="font-medium text-ink/75 mb-2">You might notice:</h4>
                <ul className="space-y-1 list-disc list-inside text-ink/65">
                  {entry.signs.map((sign, i) => (
                    <li key={i}>{sign}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-ink/75 mb-2">Why it happens:</h4>
                <ul className="space-y-1 list-disc list-inside text-ink/65">
                  {entry.causes.map((cause, i) => (
                    <li key={i}>{cause}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-ink/75 mb-2">What to try:</h4>
                <ol className="space-y-1 list-decimal list-inside text-ink/65">
                  {entry.options.map((option, i) => (
                    <li key={i}>{option}</li>
                  ))}
                </ol>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="principles-heading" className="space-y-4 border-t border-ink/10 pt-8">
        <h2 id="principles-heading" className="text-lg font-semibold">Core Principles to Remember</h2>
        <div className="bg-white rounded-xl border border-ink/10 p-4 space-y-3 text-sm">
          <p className="text-ink/65">
            <strong>Resistance is a part.</strong> When something blocks you, that blockage itself is a Protective Voice doing its job. Meet it first.
          </p>
          <p className="text-ink/65">
            <strong>You don&apos;t need to visualize.</strong> Parts speak through felt sense, inner knowing, body sensations, emotions, and words — not just images.
          </p>
          <p className="text-ink/65">
            <strong>Unblend before you engage.</strong> A blended part cannot be helped. Step back, witness, then dialogue.
          </p>
          <p className="text-ink/65">
            <strong>Never fire parts.</strong> They are never banished, killed, or exiled. They are invited to evolve into roles that fit the present.
          </p>
          <p className="text-ink/65">
            <strong>Go slow.</strong> Trust builds over repetitions. If anything feels overwhelming, pause, ground, and return another time.
          </p>
          <p className="text-ink/65">
            <strong>This is not therapy.</strong> For complex trauma, dissociation, or severe distress, work with a qualified professional. This app supports the process but does not replace clinical care.
          </p>
        </div>
      </section>
    </main>
  );
}