'use client';

import { useProgress } from '@/lib/hooks/useProgress';
import { eightCsList, defaultEightCs } from '@/content/eightCs';
import { useCheckIns } from '@/lib/hooks/useCheckIns';
import { getGroupInfo } from '@/content/taxonomy';

export default function ProgressPage() {
  const { streakDays, totals, mostActiveGroups, loading, recalc } = useProgress();
  const { checkIns } = useCheckIns();

  if (loading) {
    return <main className="flex-1 p-6 flex items-center justify-center">Loading…</main>;
  }

  const avgEightCs = checkIns.length > 0
    ? eightCsList.reduce((acc, c) => {
        const sum = checkIns.reduce((s, ci) => s + ci.eightCs[c.key], 0);
        acc[c.key] = Math.round(sum / checkIns.length);
        return acc;
      }, {} as Record<keyof typeof defaultEightCs, number>)
    : defaultEightCs;

  const recentCheckIns = checkIns.slice(0, 14).reverse();

  return (
    <main className="flex-1 p-6 max-w-4xl mx-auto w-full space-y-8">
      <header>
        <h1 className="text-2xl font-bold">Progress</h1>
        <p className="text-ink/65 mt-1">Your journey at a glance</p>
      </header>

      <section aria-labelledby="overview-heading" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article className="bg-white rounded-xl border border-ink/10 p-6 text-center">
          <p className="text-4xl font-bold text-teal-deep">{streakDays}</p>
          <p className="text-ink/60 mt-1">Day Streak</p>
        </article>
        <article className="bg-white rounded-xl border border-ink/10 p-6 text-center">
          <p className="text-4xl font-bold">{totals.checkIns}</p>
          <p className="text-ink/60 mt-1">Check-ins</p>
        </article>
        <article className="bg-white rounded-xl border border-ink/10 p-6 text-center">
          <p className="text-4xl font-bold">{totals.journals}</p>
          <p className="text-ink/60 mt-1">Journal Entries</p>
        </article>
        <article className="bg-white rounded-xl border border-ink/10 p-6 text-center">
          <p className="text-4xl font-bold">{totals.parts}</p>
          <p className="text-ink/60 mt-1">Parts Mapped</p>
        </article>
      </section>

      <section aria-labelledby="eightcs-heading" className="space-y-4">
        <h2 id="eightcs-heading" className="text-lg font-semibold">Average 8 Cs (from check-ins)</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {eightCsList.map(c => (
            <article key={c.key} className="bg-white rounded-xl border border-ink/10 p-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="capitalize font-medium">{c.label}</span>
                <span>{avgEightCs[c.key]}/10</span>
              </div>
              <div className="h-2 bg-ink/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal transition-all duration-300"
                  style={{ width: `${avgEightCs[c.key] * 10}%` }}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="categories-heading" className="space-y-4">
        <h2 id="categories-heading" className="text-lg font-semibold">Most Active Part Groups</h2>
        {mostActiveGroups.length > 0 ? (
          <div className="bg-white rounded-xl border border-ink/10 p-4">
            <div className="space-y-3">
              {mostActiveGroups.map((item) => {
                const groupInfo = getGroupInfo(item.group);
                return (
                  <div key={item.group} className="flex items-center gap-4">
                    <span className="text-2xl">{groupInfo.emoji}</span>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{groupInfo.label}</span>
                        <span>{item.count} part{item.count !== 1 ? 's' : ''}</span>
                      </div>
                      <div className="h-2 bg-ink/10 rounded-full overflow-hidden mt-1">
                        <div
                          className="h-full bg-teal transition-all duration-300"
                          style={{ width: `${mostActiveGroups[0].count > 0 ? (item.count / mostActiveGroups[0].count) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <p className="text-ink/60">Add parts to see group distribution.</p>
        )}
      </section>

      <section aria-labelledby="mood-heading" className="space-y-4">
        <h2 id="mood-heading" className="text-lg font-semibold">Mood Trend (Last 14 Days)</h2>
        {recentCheckIns.length > 0 ? (
          <div className="bg-white rounded-xl border border-ink/10 p-4 overflow-x-auto">
            <div className="flex items-end gap-2 h-40 min-w-max">
              {recentCheckIns.map(ci => (
                <div key={ci.id} className="flex flex-col items-center flex-1 min-w-[40px]">
                  <div
                    className="w-full bg-teal rounded-t transition-all duration-300"
                    style={{ height: `${ci.mood * 10}%` }}
                    title={`Mood: ${ci.mood}/10`}
                  />
                  <span className="text-xs text-ink/60 mt-2">{new Date(ci.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-ink/60">Complete check-ins to see mood trends.</p>
        )}
      </section>

      <button
        onClick={recalc}
        className="px-4 py-2 border border-ink/15 rounded-lg hover:bg-teal-tint/60"
      >
        Refresh Data
      </button>
    </main>
  );
}