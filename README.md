# SubSelves

> A gentle, guided space for Parts Work — so you can meet the parts shaped by inherited trauma, listen without judgment, and build a steadier sense of inner peace.

SubSelves is a community-funded, open-source platform for Parts Work (IFS-informed inner exploration). No ads, no tracking, no investors — just people helping people meet their parts with care.

[![Build Status](https://github.com/FlourishCommons/SubSelves/actions/workflows/ci.yml/badge.svg)](https://github.com/FlourishCommons/SubSelves/actions/workflows/ci.yml)
[![Open Collective](https://img.shields.io/opencollective/all/flourishcommons?label=Community%20Funding)](https://opencollective.com/flourishcommons)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Parts Library** | A living map of 100+ archetypal parts (Protective Voices, Guiding Voices, Young Voices, Guiding Presence) with symbolic artwork, scenes, and meanings |
| **My Parts** | Private, personal parts workspace — add, edit, and track your own parts with roles, fears, body locations, and interview notes |
| **Guided Practices** | Dynamic, step-by-step practices: Going Inside, Dialogue with a Part, Self-Energy, Unblending, Rescuing, Reassignment, Safe Haven, Teamwork |
| **Body Awareness** | Interactive body map to map sensations to parts with intensity sliders |
| **Community** | Share parts with intention (circles, trusted people, guided solo), follow others, heart shared parts, witnessing sessions |
| **Profile & Sharing** | Private parts by default; share with intention (circles, trusted people, guided solo) with witnessing sessions |
| **Journal** | Dialogue, reflection, unburdening entries linked to parts |
| **Check-ins** | Daily mood + part tracking with 8 Cs (Calm, Curious, Clear, Compassionate, Confident, Creative, Courageous, Connected) |

---

## 🎨 Design Philosophy

- **Brand palette**: Teal, Apricot, Golden, Periwinkle, Sage, Ivory, Ink
- **Private by default** — your parts are yours alone until you choose to share
- **Healing-centered sharing** — intentional vulnerability with consent gates, witnessing sessions, and reciprocity
- **Community-funded** — no ads, no tracking, no investors; funded on [Open Collective](https://opencollective.com/flourishcommons)
- **Open source** — MIT licensed, contributions welcome

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) + React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + custom brand palette |
| Database | IndexedDB (local-first, via `idb`) |
| Auth | Local-first email/password (PBKDF2) |
| Hosting | Vercel (edge, serverless functions) |
| CI/CD | GitHub Actions (pnpm, TypeScript, ESLint, Build) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 24+
- pnpm 11+ (or `corepack enable`)

### Install & Run

```bash
# Clone
git clone https://github.com/FlourishCommons/SubSelves.git
cd SubSelves

# Install dependencies (uses pnpm)
pnpm install

# Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll see the landing page with the interactive hero.

---

## 📦 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Landing page
│   ├── profile/            # Profile & sharing settings
│   ├── community/          # Community library, people, feed
│   ├── parts/              # My parts + library
│   ├── practice/           # Guided practice runner
│   ├── session/            # Guided session runner
│   ├── profile/            # Profile & sharing settings
│   ├── community/          # Community library, people, feed
│   ├── costs/              # Transparent cost breakdown
│   ├── donate/             # Donate via Open Collective
│   └── ...                 # check-in, journal, learn, etc.
├── components/
│   ├── Icons.tsx           # Brand icons (Library, Chat, Save, Harmony, Arrow, Sage, Community, Costs, Arrow)
│   ├── HeroPartConversation.tsx
│   ├── PartsLibraryDemo.tsx
│   ├── PartsDrawer.tsx
│   ├── LibraryPicker.tsx
│   ├── PartsLibraryDemo.tsx
│   ├── BodyAwareness.tsx
│   ├── BreathingCircle.tsx
│   ├── PartsDrawer.tsx
│   ├── LibraryPicker.tsx
│   ├── UserMenu.tsx
│   ├── TopNav.tsx
│   ├── Footer.tsx
│   ├── SponsorButton.tsx
│   ├── SponsorWall.tsx
│   ├── Footer.tsx
│   └── ...
├── content/
│   ├── bodyRegions.ts      # SVG body regions for BodyAwareness
│   ├── bodySensations.ts   # Sensation catalog
│   ├── bodyRegions.ts
│   ├── defaultParts.ts     # 100 default parts
│   ├── partArt.ts          # Generated artwork metadata
│   ├── practiceSteps.ts    # Practice step definitions
│   ├── practice.ts         # Practice definitions
│   ├── taxonomy.ts         # Part groups (manager, guardian, innerKid, spiritual)
│   └── ...
├── content/
│   ├── bodyRegions.ts      # SVG body regions for BodyAwareness
│   ├── bodySensations.ts   # Sensation catalog
│   ├── defaultParts.ts     # 100 default parts
│   ├── partArt.ts          # Generated artwork metadata
│   ├── practiceSteps.ts    # Practice step definitions
│   ├── practice.ts         # Practice definitions
│   ├── taxonomy.ts         # Part groups
│   └── ...
├── lib/
│   ├── auth/               # Password hashing (PBKDF2)
│   ├── hooks/              # React hooks (useAuth, useParts, useSessions, etc.)
│   ├── storage/
│   │   ├── db.ts           # IndexedDB schema (subselves v5)
│   │   └── backup.ts       # Export/import/backup
│   └── types.ts            # Core domain types
├── public/
│   ├── logo.png            # Brand logo
│   └── part-art/           # 100 icons + thumbnails
└── ...
```

---

## 🎨 Brand Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Teal | `#246B68` | Primary actions, links, focus rings |
| Apricot | `#EF9476` | Manager/Guiding Voices |
| Golden | `#EAC461` | Save/Export, warm accents |
| Periwinkle | `#929AD5` | Chat/Dialogue, Young Voices |
| Sage | `#9BBE9A` | Spiritual, body awareness |
| Ivory | `#FCFAF6` | Backgrounds |
| Ink | `#263735` | Text, borders |

Tint variants (e.g., `teal-tint`, `apricot-tint`) are used for subtle backgrounds.

---

## 🧪 Development

```bash
# Install deps
pnpm install

# Dev server
pnpm dev

# Type check
pnpm run typecheck

# Lint
pnpm run lint

# Build
pnpm run build

# Run all checks (typecheck + lint + build)
pnpm run check
```

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Run `pnpm run check` (typecheck + lint + build)
5. Submit a PR

### Areas we'd love help with

- 🌐 **Translations** (i18n)
- ♿ **Accessibility** (ARIA, keyboard nav, screen readers)
- 📱 **Mobile responsiveness** improvements
- 🧪 **Tests** (unit, integration, E2E)
- 🎨 **Design system** components
- 📚 **Documentation** (guides, API docs)
- 🌍 **Translations** (i18n)

---

## 💝 Community Funding

SubSelves is **community-funded** via [Open Collective](https://opencollective.com/flourishcommons).

- No ads, no tracking, no investors
- Transparent finances on Open Collective
- Funds cover: hosting, domain, image optimization, database, development time
- [Become a sponsor](https://opencollective.com/flourishcommons) • [View finances](https://opencollective.com/flourishcommons)

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- Inspired by Peter Garlach's research on Parts Work & intergenerational healing
- IFS (Internal Family Systems) community for foundational concepts
- All contributors and community members who share their parts with courage

---

**SubSelves** — Break the cycle. Come home to yourself.