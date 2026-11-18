# Kanban

Plan the project here. Each card can start a Parallel Code task.

## Backlog

- [ ] **Add User Registration & Login (Local-First)**
  Implement email/password registration and login using IndexedDB (local-only for now). No backend required yet.
  - Create `src/lib/hooks/useAuth.ts` with `register(email, password, displayName)`, `login(email, password)`, `logout()`, `getCurrentUser()` returning `{ id, email, displayName, onboardingComplete }`
  - Add `users` store to IndexedDB schema in `src/lib/storage/db.ts` (id, email, passwordHash, displayName, onboardingComplete, createdAt)
  - Hash passwords client-side with Web Crypto API (PBKDF2) before storing
  - Add auth context/provider in `src/lib/hooks/useAuth.tsx` (or separate provider) wrapping the app
  - Protect existing pages behind auth (redirect to `/login` if no user)
  - Create `/login` and `/register` pages under `src/app/`
  - Why: Users need accounts to save parts, sessions, and progress locally. This is the foundation for multi-device sync later.
  - Acceptance criteria:
    - [ ] Register creates user in IndexedDB with hashed password
    - [ ] Login verifies hash and sets session in localStorage
    - [ ] Logout clears session
    - [ ] Current user persists across page reloads
    - [ ] Protected routes redirect to `/login`
    - [ ] `/login` and `/register` pages work end-to-end
  - depends: none
  - group: auth
- [ ] **Build Dynamic Part Chat Component**
  Create a reusable chat interface where the user alternates between "Self" and a selected "Part" — one message line per speaker. This will be used in guided sessions and standalone chat.
  - New component: `src/components/PartChat.tsx` — accepts `part: Part`, `messages: { role: 'self' | 'part', content: string }[]`, `onSend(role, content)`
  - Visual distinction: Self messages on right (blue), Part messages on left (part's group color)
  - Input area with role toggle (Self ↔ Part) or auto-alternate
  - Persist chat history to IndexedDB per part (new `partChats` store: partId, messages, updatedAt)
  - Add hook `usePartChat(partId)` in `src/lib/hooks/usePartChat.ts` for CRUD
  - Why: Core differentiator — users dialogue with parts in real time, seeing the conversation flow.
  - Acceptance criteria:
    - [ ] Component renders alternating Self/Part bubbles correctly
    - [ ] Messages persist to IndexedDB and load on revisit
    - [ ] Role toggle works (manual or auto-alternate)
    - [ ] Accessible (ARIA roles, keyboard navigation)
    - [ ] Works as standalone page `/chat/[partId]` and embeddable in SessionRunner
  - depends: Transform Dashboard into InnerHarmony Landing Page
  - group: part-chat
- [ ] **Create Standalone Part Chat Page**
  Add a new route `/chat/[partId]` that loads the PartChat component for a specific part, allowing users to have ongoing dialogues outside guided sessions.
  - Page at `src/app/chat/[partId]/page.tsx`
  - Fetch part by ID, load chat history, render PartChat
  - Link from Parts library (`/parts`) and Part detail (`/parts/[id]`)
  - Why: Users want to chat with parts anytime, not only during structured sessions.
  - Acceptance criteria:
    - [ ] Page loads part and chat history
    - [ ] New messages save and appear immediately
    - [ ] Navigation from Parts pages works
    - [ ] Empty state for new parts (prompt to start dialogue)
  - depends: Build Dynamic Part Chat Component
  - group: part-chat
- [ ] **Integrate Part Chat into Guided Sessions**
  Replace or augment the JournalStepView in dialogue-type practices with the PartChat component so users can chat with the part in real time during a session.
  - Modify `SessionRunner` to detect `choosePart` + `journal` step sequences and offer chat mode
  - Or add a new practice step type `chat` in `src/content/practiceSteps.ts`
  - Save chat messages as a special journal entry (kind: 'dialogue') with full transcript
  - Why: Makes guided dialogues feel live and conversational, not just form-filling.
  - Acceptance criteria:
    - [ ] Dialogue practices show chat interface instead of/in addition to textarea
    - [ ] Transcript saves as journal entry on completion
    - [ ] Can resume chat mid-session
  - depends: Build Dynamic Part Chat Component
  - group: part-chat
- [ ] **Run Next.js Security Upgrade**
  Execute `npx next upgrade --agent=security` (or `pnpm next upgrade --agent=security`) and follow the automated codemod instructions to apply security patches and best practices.
  - Run the command in project root
  - Review and commit the changes
  - Verify dev server still starts and tests pass
  - Why: Keep dependencies secure and follow Next.js recommended security patterns.
  - Acceptance criteria:
    - [ ] Command runs without errors
    - [ ] All suggested changes applied
    - [ ] `pnpm dev` starts successfully
    - [ ] No regressions in existing features
  - depends: none
  - group: maintenance

## Parts-Backlog

- [ ] Import the authoritative part descriptions
  Create `content/parts/catalog.json` from the supplied descriptions. Preserve each part’s category, name, aliases, purpose, behaviors, and existing ID. Descriptions—not names alone—must guide symbolism. Record missing information instead of inventing it.
  - [ ] Include all 100 parts across the four supplied categories.
  - [ ] Preserve similarly named parts as separate records.
  - [ ] Preserve source wording alongside any normalized fields.
  - [ ] Flag missing descriptions before artwork production.
  group: Part content
- [ ] Define the illustration and export contract
  Create `docs/part-art/art-direction.md` and `content/part-art/schema.json`. Document the approved circular composition, flowing organic shapes, teal/coral/gold/periwinkle palette, and compassionate treatment of every part. Define common fields for all symbolism briefs so agents can work independently.
  - [ ] Require a signature motif, action, silhouette, emotional tension, intended meaning, and avoid-list per part.
  - [ ] Specify 512 × 512 thumbnails and 128 × 128 icons.
  - [ ] Icons must be resized copies of the exact thumbnail artwork.
  - [ ] Define filesystem-safe `category-part name-thumbnail.png` and `category-part name-icon.png` filenames.
  - [ ] Define separate filenames for duplicate names across categories.
  group: Visual identity
- [ ] Establish the symbolic storytelling method
  Create `docs/part-art/symbolism-method.md`. Translate the Taylor-inspired direction into practical art rules: layered meaning, emotionally meaningful situations, protective intention, and room for personal interpretation. Clearly distinguish sourced ideas from our design interpretations.
  - [ ] Require concepts to reflect the supplied function of each part.
  - [ ] Avoid treating symbols as universal psychological facts.
  - [ ] Avoid shaming, villainizing, or stereotyping parts.
  - [ ] Require distinct stories rather than repeated figures holding different objects.
  - [ ] Include a rubric for emotional resonance and immediate recognition.
  group: Symbolism
- [ ] Develop symbolism briefs for Guiding Voices
  Create one JSON brief per part under `content/part-art/briefs/guiding-voices/`. Cover all 19 parts, deriving a distinct symbolic situation from each description. Touch only this category’s files.
  - [ ] All 19 briefs satisfy the shared schema.
  - [ ] Differentiate overlapping roles such as Planner, Prioritizer, Analyzer, and Philosopher.
  - [ ] Describe each concept’s connection to the source description.
  depends: Import the authoritative part descriptions
  depends: Define the illustration and export contract
  depends: Establish the symbolic storytelling method
  group: Symbolism
- [ ] Develop symbolism briefs for Protective Voices A–F
  Create briefs under `content/part-art/briefs/protective-voices/` for the 16 entries from Addict through Fantasizer, in the supplied order. Show both protective intention and the cost of the strategy.
  - [ ] All 16 briefs satisfy the shared schema.
  - [ ] Each concept has a distinct silhouette, action, and signature motif.
  - [ ] No concept depicts the part as inherently evil or defective.
  depends: Import the authoritative part descriptions
  depends: Define the illustration and export contract
  depends: Establish the symbolic storytelling method
  group: Symbolism
- [ ] Develop symbolism briefs for Protective Voices Flirt–Predictor
  Create briefs under `content/part-art/briefs/protective-voices/` for the 14 entries from Flirt through Predictor. Touch only these parts’ files.
  - [ ] All 14 briefs satisfy the shared schema.
  - [ ] Differentiate Judge, Moralizer, Critic, and Righteous One through their described functions.
  - [ ] Differentiate Predictor from Worrier and Catastrophizer.
  depends: Import the authoritative part descriptions
  depends: Define the illustration and export contract
  depends: Establish the symbolic storytelling method
  group: Symbolism
- [ ] Develop symbolism briefs for Protective Voices Pretender–Worrier
  Create briefs under `content/part-art/briefs/protective-voices/` for the remaining 18 entries from Pretender through Worrier. Touch only these parts’ files.
  - [ ] All 18 briefs satisfy the shared schema.
  - [ ] Differentiate avoidance, repression, repetition, and self-sabotage visually.
  - [ ] Retain dignity and protective intention in every concept.
  depends: Import the authoritative part descriptions
  depends: Define the illustration and export contract
  depends: Establish the symbolic storytelling method
  group: Symbolism
- [ ] Develop symbolism briefs for Young Voices Abandoned–Hypervigilant
  Create briefs under `content/part-art/briefs/young-voices/` for the first 18 supplied entries, ending with Hypervigilant Protector. Use age-appropriate symbolic situations and varied compositions.
  - [ ] All 18 briefs satisfy the shared schema.
  - [ ] Distinguish emotional states through posture, setting, and action.
  - [ ] Avoid making every vulnerable child a similar isolated, crouching figure.
  depends: Import the authoritative part descriptions
  depends: Define the illustration and export contract
  depends: Establish the symbolic storytelling method
  group: Symbolism
- [ ] Develop symbolism briefs for remaining Young Voices and Guiding Presence
  Create briefs for the remaining 14 Young Voices and the Spiritual One in their respective category directories. Use symbolic, non-explicit imagery for Sensual or Sexual One; avoid prescribing one religious tradition for Guiding Presence.
  - [ ] All 15 briefs satisfy the shared schema.
  - [ ] Distinguish Worried Child from Anxious Child using their actual descriptions.
  - [ ] Flag overlapping descriptions that need clarification.
  - [ ] Respect the optional status of Guiding Presence.
  depends: Import the authoritative part descriptions
  depends: Define the illustration and export contract
  depends: Establish the symbolic storytelling method
  group: Symbolism
- [ ] Audit differentiation across all symbolism briefs
  Create `docs/part-art/differentiation-review.md`. Compare all 100 concepts across categories before generating the collection. Record conflicts and revise only the affected brief files after category work is merged.
  - [ ] No two concepts share essentially the same motif, action, and composition.
  - [ ] Closely related parts have explicit visual distinctions.
  - [ ] Shared branding remains consistent without repeated scenes.
  - [ ] All unresolved description ambiguities are listed.
  depends: Develop symbolism briefs for Guiding Voices
  depends: Develop symbolism briefs for Protective Voices A–F
  depends: Develop symbolism briefs for Protective Voices Flirt–Predictor
  depends: Develop symbolism briefs for Protective Voices Pretender–Worrier
  depends: Develop symbolism briefs for Young Voices Abandoned–Hypervigilant
  depends: Develop symbolism briefs for remaining Young Voices and Guiding Presence
  group: Art quality
- [ ] Produce three representative artwork samples
  Generate Analyzer, Worrier, and Curious Child under `assets/part-art/samples/`, following the reviewed briefs. Use the approved Nurturer image as the style reference. Record prompts and source part IDs in a sample manifest.
  - [ ] Samples demonstrate three clearly different symbolic stories.
  - [ ] Palette, circular wholeness, and illustration style remain cohesive.
  - [ ] Artwork is inspected at both 512 px and 128 px.
  - [ ] Sample feedback is recorded before full production.
  depends: Audit differentiation across all symbolism briefs
  group: Artwork production
- [ ] Generate the complete part artwork collection
  Generate one master illustration per part under `assets/part-art/masters/<category>/`. Divide execution into separate category or part-range worktrees, with each worker owning different files. Follow the reviewed briefs and sample feedback.
  - [ ] Exactly 100 masters are mapped to their source part IDs.
  - [ ] Each image reflects its description and reviewed symbolic story.
  - [ ] Every image receives visual inspection.
  - [ ] Repetitive compositions and anatomy defects are corrected.
  depends: Produce three representative artwork samples
  group: Artwork production
- [ ] Build thumbnail and icon exports
  Create `scripts/part-art/export.py` to resize masters into `dist/part-art/`. Generate both sizes from the same source without redrawing, changing composition, or distorting aspect ratio.
  - [ ] Produce 512 × 512 thumbnails and 128 × 128 icons.
  - [ ] Apply the agreed filenames consistently.
  - [ ] Detect filename collisions and missing masters.
  - [ ] Record source IDs and output paths in `dist/part-art/manifest.json`.
  depends: Define the illustration and export contract
  group: Asset delivery
- [ ] Validate and package the final collection
  Create `scripts/part-art/package.py`. Validate exported assets against the catalog, then build `InnerHarmony-Part-Art.zip` with all images, the mapping manifest, and a labeled contact sheet for review.
  - [ ] ZIP contains exactly 100 thumbnails and 100 matching icons.
  - [ ] Category totals are 19, 48, 32, and 1.
  - [ ] Every file opens and has the required dimensions.
  - [ ] Contact sheet labels match the manifest and filenames.
  - [ ] Final visual review confirms sufficient differentiation.
  depends: Generate the complete part artwork collection
  depends: Build thumbnail and icon exports
  group: Asset delivery

## In progress

- [ ] Add this source work before the symbolism cards:
  - [ ] Map Gerlach’s descriptions to the app’s 100 parts
    Create `content/parts/source-map.json` using `https://sfhelp.org/gwc/IF/innerfam.htm` and its individual part-description links. Match sources to the existing app catalog while preserving the app’s names, categories, and IDs. Record source URLs, concise function summaries, protective intentions, and distinguishing behaviors.
    group: Part content
    - [ ] Every app part has a source mapping or an explicit missing-description flag.
    - [ ] Read individual linked descriptions rather than inferring functions from titles.
    - [ ] Record shared descriptions and aliases without merging separate app entries.
    - [ ] Flag differences between Gerlach’s roster and the app’s roster.
    - [ ] Keep source-derived descriptions separate from proposed symbolic interpretations.
    - [ ] Make “Import the authoritative part descriptions” depend on this card.
    - save as .md
  branch: `task/add-this-source-work-before-the-symbolism-cards-42489e`
- [ ] **Transform Dashboard into InnerHarmony Landing Page**
  Replace the current dashboard (`src/app/page.tsx`) with a marketing-style landing page that introduces InnerHarmony. Key sections:
  - Hero banner explaining "Parts Work" based on Peter Garlach's research on inner work for breaking intergenerational trauma
  - Feature cards showing: Parts Library, Chat with Parts, Save Parts, Inner Peace/Harmony outcomes
  - Donation link: "Support our collective" linking to donation page
  - Keep quick actions as secondary CTAs (Check-in, Session, Practice, Journal)
  - Remove the stats/streak cards — they belong in a logged-in dashboard, not the landing page
  - Why: The current page is a logged-in dashboard; unauthenticated visitors need an intro to the method and value prop.
  - Acceptance criteria:
    - [ ] Hero section with headline, subheadline, and CTA button
    - [ ] "Parts Work" banner explaining Garlach's research basis
    - [ ] 4 feature cards: Library, Chat, Save, Peace/Harmony
    - [ ] Donation link/button to support the collective
    - [ ] Responsive layout (mobile-first, works on desktop)
    - [ ] Existing quick-action cards still accessible
  - depends: none
  - group: landing-page
  branch: `task/transform-dashboard-into-innerharmony-landing-page-46f683`

## Review

## Done
