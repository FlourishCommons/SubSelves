import Link from "next/link";

export default function DonatePage() {
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
          quiet, generational work of healing. Secure donation options are on
          their way.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-teal px-6 text-sm font-semibold text-ivory transition-colors hover:bg-teal-deep"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
