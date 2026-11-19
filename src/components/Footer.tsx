export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ivory/50">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <nav className="flex flex-wrap justify-center gap-6 text-sm text-ink/60">
          <a href="/privacy" className="hover:text-teal">Privacy</a>
          <a href="/terms" className="hover:text-teal">Terms</a>
          <a href="https://opencollective.com/innerharmony" target="_blank" rel="noopener noreferrer" className="hover:text-teal">
            Financial Transparency
          </a>
          <a href="https://github.com/innerharmony/inner-harmony" target="_blank" rel="noopener noreferrer" className="hover:text-teal">
            Source Code
          </a>
          <a href="/community" className="hover:text-teal">Contribute</a>
        </nav>
        <p className="mt-6 text-center text-xs text-ink/40">
          SubSelves is free forever.{' '}
          <a href="https://opencollective.com/innerharmony" target="_blank" rel="noopener noreferrer" className="underline hover:text-teal">
            Help keep it that way.
          </a>
        </p>
      </div>
    </footer>
  );
}