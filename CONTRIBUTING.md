# Contributing to SubSelves

Thank you for wanting to contribute! 💚

## Getting Started

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/your-username/SubSelves.git`
3. **Install dependencies**: `pnpm install`
4. **Create a branch**: `git checkout -b feature/your-feature-name`
4. **Make changes** and test locally
5. **Run checks**: `pnpm run check` (typecheck + lint + build)
5. **Commit** with a clear message
6. **Push** and open a Pull Request

---

## Development Setup

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Run all checks (typecheck + lint + build)
pnpm run check
```

---

## Code Style

- **TypeScript** strict mode enabled
- **ESLint** with Next.js config
- **Prettier** for formatting (run `pnpm exec prettier --write .`)
- **TypeScript strict mode** — no `any`, explicit types

### Code Conventions

- **Components**: PascalCase, functional, `'use client'` when needed
- **Hooks**: `use` prefix, e.g., `useParts`, `useAuth`
- **Types**: PascalCase interfaces, `type` for unions/aliases
- **Files**: kebab-case for files, PascalCase for components
- **Imports**: absolute paths with `@/` prefix

---

## Commit Messages

Use conventional commits:

```
type(scope): short description

[optional body]

[optional footer]
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `build`, `ci`

**Examples**:
```
feat(parts): add body awareness to part detail modal
fix(community): fix follow button not updating optimistically
docs(readme): add contributing section
chore(deps): update @swc/helpers to 0.5.24
```

---

## Pull Request Checklist

- [ ] `pnpm run check` passes (typecheck + lint + build)
- [ ] No `console.log` or debugger statements
- [ ] No `any` types without justification
- [ ] Components have proper ARIA attributes
- [ ] New components have `'use client'` only when needed
- [ ] Accessibility: semantic HTML, ARIA labels, keyboard navigation
- [ ] Mobile responsive (test at 375px, 768px, 1440px)
- [ ] Dark mode not required (light-only by design)

---

## Code Review

- All PRs require at least one review
- Maintainers will review within 48 hours
- Address feedback promptly
- Squash commits before merge (maintainers will do this)

---

## Issue Reporting

Use the [issue tracker](https://github.com/FlourishCommons/SubSelves/issues) for:

- **Bug reports** — include steps to reproduce, expected vs actual, browser/OS
- **Feature requests** — describe the problem, proposed solution, alternatives considered
- **Accessibility issues** — include screen reader, keyboard nav details
- **Performance** — include metrics, profiling data if possible

---

## Community

- **Discussions**: [GitHub Discussions](https://github.com/FlourishCommons/SubSelves/discussions)
- **Open Collective**: [flourishcommons](https://opencollective.com/flourishcommons)
- **Code of Conduct**: [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

---

Thank you for contributing to SubSelves! 💚