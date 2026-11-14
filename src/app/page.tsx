import Link from "next/link";

const features = [
  {
    name: "Parts Library",
    description:
      "A living map of your inner world. Meet the protective, vulnerable, and exiled parts that shape how you respond—each with its own story and needs.",
    accent: "bg-amber-100 text-amber-800",
    icon: LibraryIcon,
  },
  {
    name: "Chat with Parts",
    description:
      "Have a safe, structured dialogue with a part. Move between Self and Part so every voice gets room to be heard without judgment.",
    accent: "bg-sky-100 text-sky-800",
    icon: ChatIcon,
  },
  {
    name: "Save Parts",
    description:
      "Keep the parts you meet, along with reflections and breakthroughs, so your inner work has continuity, memory, and momentum.",
    accent: "bg-emerald-100 text-emerald-800",
    icon: SaveIcon,
  },
  {
    name: "Peace & Harmony",
    description:
      "Build the capacity to hold competing needs with compassion—and turn inherited survival patterns into grounded, conscious choice.",
    accent: "bg-rose-100 text-rose-800",
    icon: HarmonyIcon,
  },
];

const quickActions = [
  {
    name: "Check-in",
    href: "/check-in",
    description: "Notice what is present and name what you are carrying.",
  },
  {
    name: "Session",
    href: "/session",
    description: "Follow a guided sequence for deeper Parts Work.",
  },
  {
    name: "Practice",
    href: "/practice",
    description: "Return to grounding and regulation exercises.",
  },
  {
    name: "Journal",
    href: "/journal",
    description: "Capture insights, questions, and shifts as they arise.",
  },
];

const principles = [
  {
    title: "Meet your parts",
    description:
      "Every protective voice has a reason for being there. Parts Work begins with curiosity instead of combat.",
  },
  {
    title: "Listen for the legacy",
    description:
      "Some patterns are older than your own story. Naming inherited survival responses creates space between you and them.",
  },
  {
    title: "Choose a new response",
    description:
      "With compassionate awareness, automatic reactions can become conscious choices—and the cycle can begin to break.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-stone-50 text-stone-900">

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 top-6 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl"
          />

          <div className="relative mx-auto grid w-full max-w-6xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-amber-300/70 bg-amber-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-amber-800">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                Parts Work for intergenerational healing
              </p>

              <h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                Break the cycle.
                <br />
                Come home to yourself.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">
                InnerHarmony is a gentle, guided space for Parts Work—so you can
                meet the parts shaped by inherited trauma, listen without
                judgment, and build a steadier sense of inner peace.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/check-in"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-stone-900 px-7 text-sm font-semibold text-stone-50 shadow-sm transition-colors hover:bg-stone-700"
                >
                  Start a free check-in
                </Link>
                <a
                  href="#parts-work"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-stone-300 bg-white px-7 text-sm font-semibold text-stone-800 transition-colors hover:border-stone-400 hover:bg-stone-100"
                >
                  Explore Parts Work
                </a>
              </div>

              <p className="mt-5 text-sm text-stone-500">
                Rooted in Peter Garlach’s research on inner work—no account
                needed to begin.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div
                aria-hidden="true"
                className="absolute inset-0 -rotate-3 rounded-[2rem] bg-gradient-to-br from-amber-200/70 to-emerald-200/70"
              />
              <div className="relative rounded-[2rem] border border-white/80 bg-white p-6 shadow-xl shadow-stone-900/5 sm:p-8">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                    A conversation with a part
                  </p>
                  <span className="rounded-full bg-stone-100 px-2.5 py-1 text-[11px] font-medium text-stone-600">
                    Preview
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-sky-50 px-4 py-3 text-sm leading-6 text-sky-950">
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-sky-700">
                      Part
                    </p>
                    I keep bracing for something bad to happen.
                  </div>
                  <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-amber-700">
                      Self
                    </p>
                    I see you. You are trying to keep us safe.
                  </div>
                  <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-sky-50 px-4 py-3 text-sm leading-6 text-sky-950">
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-sky-700">
                      Part
                    </p>
                    I did not know I could put it down.
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs text-stone-500">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                  Held with compassion, at your pace
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="parts-work"
          className="scroll-mt-20 border-y border-stone-200 bg-white"
        >
          <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  What is Parts Work?
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                  Healing that honors where you come from.
                </h2>
              </div>

              <div className="space-y-5 text-base leading-8 text-stone-600">
                <p>
                  Parts Work is an approach to inner healing based on Peter
                  Garlach’s research into how trauma—including trauma passed
                  down through generations—can show up as distinct parts of us.
                  Instead of fighting those parts, you learn to recognize them,
                  understand what they carry, and offer them the safety they
                  never got.
                </p>
                <p>
                  Garlach’s work suggests that when we bring compassionate
                  awareness to inherited patterns, we can interrupt the cycle
                  and create room for choice, connection, and calm.
                </p>
              </div>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {principles.map((principle, index) => (
                <div
                  key={principle.title}
                  className="rounded-2xl border border-stone-200 bg-stone-50 p-6"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 text-sm font-semibold text-stone-50">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-base font-semibold">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="scroll-mt-20">
          <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                A complete inner practice
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Everything you need to meet your parts with care.
              </h2>
              <p className="mt-4 text-base leading-7 text-stone-600">
                Simple tools for a deep process—designed to feel safe,
                unhurried, and genuinely yours.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <article
                    key={feature.name}
                    className="group rounded-3xl border border-stone-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-stone-300 hover:shadow-lg hover:shadow-stone-900/5"
                  >
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl ${feature.accent}`}
                    >
                      <Icon />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold">
                      {feature.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                      {feature.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="quick-actions"
          className="scroll-mt-20 border-y border-stone-200 bg-white"
        >
          <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                  Your practice, when you need it
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                  Jump back into the work.
                </h2>
                <p className="mt-3 text-base leading-7 text-stone-600">
                  Already practicing? These guided tools are here whenever you
                  want to check in, sit with a part, or reflect on what has
                  moved.
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action) => (
                <Link
                  key={action.name}
                  href={action.href}
                  className="group flex flex-col justify-between rounded-2xl border border-stone-200 bg-stone-50 p-5 transition-colors hover:border-stone-900 hover:bg-stone-900 hover:text-stone-50"
                >
                  <div>
                    <h3 className="text-base font-semibold">{action.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-stone-600 transition-colors group-hover:text-stone-300">
                      {action.description}
                    </p>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                    Open
                    <ArrowIcon />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="support" className="scroll-mt-20">
          <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
            <div className="relative overflow-hidden rounded-[2rem] bg-stone-900 px-6 py-14 text-stone-50 sm:px-12 lg:px-16">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl"
              />

              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                    Community supported
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                    Support our collective
                  </h2>
                  <p className="mt-4 text-base leading-7 text-stone-300">
                    InnerHarmony is built for people doing the quiet,
                    generational work of healing. Your support helps keep these
                    tools accessible and lets us grow them with care.
                  </p>
                </div>

                <Link
                  href="/donate"
                  className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-amber-300 px-7 text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-200"
                >
                  Support our collective
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <BrandMark />
              <span className="text-base font-semibold tracking-tight">
                InnerHarmony
              </span>
            </div>
            <p className="mt-3 max-w-md text-sm leading-6 text-stone-600">
              A gentle space for Parts Work and intergenerational healing.
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm text-stone-500 md:items-end">
            <Link href="/donate" className="transition-colors hover:text-stone-900">
              Support our collective
            </Link>
            <p>InnerHarmony is not a substitute for therapy or emergency care.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function BrandMark() {
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-emerald-400">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5 text-stone-900"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="7.5" />
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 4.5v3M12 16.5v3M4.5 12h3M16.5 12h3" />
      </svg>
    </span>
  );
}

function LibraryIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z" />
      <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20" />
      <path d="M8 7h8M8 10h5" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h7A2.5 2.5 0 0 1 16 5.5v4A2.5 2.5 0 0 1 13.5 12H9l-5 4V5.5Z" />
      <path d="M18 8.5h.5A2.5 2.5 0 0 1 21 11v7l-4-3h-3.5A2.5 2.5 0 0 1 11 12.5" />
    </svg>
  );
}

function SaveIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z" />
      <path d="M9 7h6" />
    </svg>
  );
}

function HarmonyIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
      <path d="M8.5 11.5c1 .8 2.2 1.2 3.5 1.2s2.5-.4 3.5-1.2" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}
