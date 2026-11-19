import Link from "next/link";
import Image from "next/image";
import { HeroPartConversation } from "@/components/HeroPartConversation";
import PartsLibraryDemo from "@/components/PartsLibraryDemo";
import { SponsorButton } from "@/components/SponsorButton";
import { SponsorWall } from "@/components/SponsorWall";
import { Footer } from "@/components/Footer";
import { LibraryIcon, ChatIcon, SaveIcon, HarmonyIcon, ArrowIcon, SageIcon, CommunityIcon, CostsIcon } from "@/components/Icons";

const features = [
  {
    name: "Parts Library",
    description:
      "A living map of your inner world. Meet the protective, vulnerable, and exiled parts that shape how you respond—each with its own story and needs.",
    accent: "bg-periwinkle-tint text-periwinkle-deep",
    icon: LibraryIcon,
  },
  {
    name: "Chat with Parts",
    description:
      "Have a safe, structured dialogue with a part. Move between Self and Part so every voice gets room to be heard without judgment.",
    accent: "bg-teal-tint text-teal-deep",
    icon: ChatIcon,
  },
  {
    name: "Save Parts",
    description:
      "Keep the parts you meet, along with reflections and breakthroughs, so your inner work has continuity, memory, and momentum.",
    accent: "bg-golden-tint text-golden-deep",
    icon: SaveIcon,
  },
  {
    name: "Peace & Harmony",
    description:
      "Build the capacity to hold competing needs with compassion—and turn inherited survival patterns into grounded, conscious choice.",
    accent: "bg-apricot-tint text-apricot-deep",
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

const principleTints = [
  "bg-apricot-tint/70",
  "bg-golden-tint/70",
  "bg-sage-tint/80",
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
    <div className="flex flex-1 flex-col bg-ivory text-ink">

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 top-6 h-72 w-72 rounded-full bg-apricot/30 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-periwinkle/30 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-1/3 top-1/2 h-64 w-64 rounded-full bg-golden/35 blur-3xl"
          />

          <div className="relative mx-auto grid w-full max-w-6xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-teal/25 bg-teal-tint px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-teal-deep">
                <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                Parts Work for intergenerational healing
              </p>

              <h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Break the cycle.
                <br />
                Come home to yourself.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-ink/70">
                SubSelves is a gentle, guided space for Parts Work—so you can
                meet the parts shaped by inherited trauma, listen without
                judgment, and build a steadier sense of inner peace.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/check-in"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-teal px-7 text-sm font-semibold text-ivory shadow-sm transition-colors hover:bg-teal-deep"
                >
                  Start a free check-in
                </Link>
                <a
                  href="#parts-work"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-teal/30 bg-white px-7 text-sm font-semibold text-teal-deep transition-colors hover:border-teal/50 hover:bg-teal-tint"
                >
                  Explore Parts Work
                </a>
              </div>

              <p className="mt-5 text-sm text-ink/55">
                Rooted in Peter Garlach’s research on inner work—no account
                needed to begin.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <span
                aria-hidden="true"
                className="absolute -left-6 top-12 h-20 w-20 rounded-full bg-apricot/80"
              />
              <span
                aria-hidden="true"
                className="absolute -right-5 top-4 h-12 w-12 rounded-full bg-golden/90"
              />
              <span
                aria-hidden="true"
                className="absolute -bottom-6 right-10 h-16 w-16 rounded-full bg-periwinkle/70"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 -rotate-3 rounded-[2rem] bg-gradient-to-br from-apricot/70 via-golden/60 to-sage/45"
              />
              <div className="relative rounded-[2rem] border border-ink/10 bg-white p-6 shadow-xl shadow-teal/10 sm:p-8">
                <HeroPartConversation />
              </div>
            </div>
          </div>
        </section>

        <section
          id="parts-work"
          className="scroll-mt-20 border-y border-ink/10 bg-white"
        >
          <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-deep">
                  What is Parts Work?
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
                  Healing that honors where you come from.
                </h2>
              </div>

              <div className="space-y-5 text-base leading-8 text-ink/70">
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
                  className={`rounded-2xl border border-ink/10 p-6 ${principleTints[index]}`}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal text-sm font-semibold text-ivory">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-ink/70">
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
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-deep">
                A complete inner practice
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
                Everything you need to meet your parts with care.
              </h2>
              <p className="mt-4 text-base leading-7 text-ink/70">
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
                    className="group rounded-3xl border border-ink/10 bg-white p-6 transition-all hover:-translate-y-1 hover:border-teal/30 hover:shadow-lg hover:shadow-teal/10"
                  >
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl ${feature.accent}`}
                    >
                      <Icon />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold text-ink">
                      {feature.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-ink/70">
                      {feature.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="library-demo"
          className="scroll-mt-20 border-y border-ink/10 bg-white"
        >
          <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div className="lg:sticky lg:top-24">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-deep">
                  Inside the Parts Library
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
                  Find the voices already living in your system.
                </h2>
                <p className="mt-4 text-base leading-7 text-ink/70">
                  This is a live demo of the library—a curated set of named
                  parts you can start from. Search it, explore a group, and
                  make each part your own.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link
                    href="/parts"
                    className="inline-flex h-11 items-center justify-center rounded-full bg-teal px-6 text-sm font-semibold text-ivory transition-colors hover:bg-teal-deep"
                  >
                    Open your Parts Library
                  </Link>
                  <Link
                    href="/parts/library"
                    className="inline-flex h-11 items-center justify-center rounded-full border border-teal/30 bg-white px-6 text-sm font-semibold text-teal-deep transition-colors hover:border-teal hover:bg-teal-tint"
                  >
                    Browse all artwork
                  </Link>
                </div>
                <p className="mt-4 text-sm text-ink/55">
                  Try searching for “Critic”, “Worrier”, or “Playful”.
                </p>
              </div>

              <PartsLibraryDemo />
            </div>
          </div>
        </section>

        <section
          id="quick-actions"
          className="scroll-mt-20 border-y border-ink/10 bg-white"
        >
          <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-deep">
                  Your practice, when you need it
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
                  Jump back into the work.
                </h2>
                <p className="mt-3 text-base leading-7 text-ink/70">
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
                  className="group flex flex-col justify-between rounded-2xl border border-ink/10 bg-ivory p-5 transition-colors hover:border-teal hover:bg-teal hover:text-ivory"
                >
                  <div>
                    <h3 className="text-base font-semibold">{action.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink/70 transition-colors group-hover:text-ivory/85">
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

        <SponsorWall />
        <section className="border-y border-ink/10 bg-white">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
            <SponsorButton />
          </div>
        </section>

        <section id="support" className="scroll-mt-20">
          <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
            <div className="relative overflow-hidden rounded-[2rem] bg-teal px-6 py-14 text-ivory sm:px-12 lg:px-16">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-apricot/30 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-golden/25 blur-3xl"
              />

              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-golden-tint">
                    Community supported
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                    Support our collective
                  </h2>
                  <p className="mt-4 text-base leading-7 text-ivory/85">
                    SubSelves is built for people doing the quiet,
                    generational work of healing. Your support helps keep these
                    tools accessible and lets us grow them with care.
                  </p>
                </div>

                <Link
                  href="/donate"
                  className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-golden px-7 text-sm font-semibold text-ink transition-colors hover:bg-golden/90"
                >
                  Support our collective
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function BrandMark() {
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-full">
      <Image
        src="/logo.png"
        alt="SubSelves"
        width={36}
        height={36}
        className="h-full w-full rounded-full object-cover"
      />
    </span>
  );
}
