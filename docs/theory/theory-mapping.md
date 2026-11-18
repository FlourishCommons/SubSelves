# Parts-Work Theory → InnerHarmony App Mapping

*Internal design document. Built from the SFHELP parts-work theory notes (confidential — see §1.3) plus the Lane D user-content digest. This is the authoritative bridge between the source theory and the app's data model, content, and screens.*

---

## 1. Purpose, Scope & Constraints

### 1.1 Purpose
Map the parts-work theory to a concrete app: taxonomy, method/practice structure, techniques, data model, screens, assessment, progress metrics, safety gating, and troubleshooting content.

### 1.2 Source inventory (as read)
| Source (under `…/IFS/parts-work-theory/`) | Covers |
|---|---|
| `An overview of parts work (inner-family therapy) - p. 1 of 7.md` | Pages 1–2: concepts, glossary, subself traits, 4 groups, 5-phase method, preparation, goal-setting, roster inventory |
| `An Introduction to Effective "Parts Work"….md` (118 KB) | Superset of pages 1–3: language awareness, naming, session prep, all communication channels |
| `An Introduction to Effective "Parts Work"….md` (offset 880+) | Page 4: arguing vs blending, unblending/freeing Self, re-doing, rescuing steps 1–2 |
| `…p.     5 of 7.md` | Rescuing steps 3–5, retraining, inner conflicts, problem-solving, reassigning roles, disowned parts, spirituality |
| `…p. 6.md` | Trust-building, inner councils, teamwork checklist, expected phases, how long, measuring progress |
| `…p. 7.md` | Troubleshooting: focus, imaging difficulty, silent parts, resistant parts, self-doubt/skepticism |
| `Three Groups of Personality Parts.md` | Managers / Inner Kids / Guardians groupings + subself examples |
| `Rescuing Subselves Living in the Past.md` | Bringing "stuck-in-the-past" parts to present safety |
| `FAQ - Common questions about personality subselves (parts).md` | 10 FAQs (digested in Lane D) |
| `Parts-work Strategies for Reducing Common Problems … Part 1.md` | Problem→strategy tracks (digested in Lane D) |
| `How to safely -interview- a personality subself.md` | **Empty (0 bytes)** — no content |
| `An Introduction to Personality Subselves.md` | Low incremental value |

### 1.3 Confidentiality + licensing constraints
- Theory notes are **confidential**; app content must be **original paraphrase**, never verbatim source text, and no identifiable case material.
- **No "IFS" / "Internal Family Systems" branding** in the product (trademark). Use generic "parts work / inner-family work." The current `src/content/safety.ts` attribution names Schwartz and IFS explicitly — see §14 for the required change.
- Full exclusion list: `docs/theory/lane-d-user-content.md` §6 (do-not-use list) — branded terms, book titles, author names, case anecdotes, credential claims, medical-claim language.

---

## 2. Core Conceptual Model (from theory)

| Concept | Theory | App implication |
|---|---|---|
| **Subself / part** | Discrete functional "brain region"; unique talents, a primary job, own thoughts/feelings; benign intent; present- or past-oriented; has its own gender/age distinct from the body. | "Part" entity with rich fields (age, gender, image, job, trust, present/past). Not just a name+category. |
| **"Me" vs Self** | Lowercase "me/I" = the whole person. Capital-S **Self** = a specific subself with the talent for leadership. | UI distinguishes "your Inner Leader" (Self) from parts; never imply Self is a mystical higher self. |
| **True Self traits** | calm/centered/grounded/clear/compassionate/decisive/purposeful; perceives reality, seeks counsel, delegates, decides, acts. Feels full emotions. **Cannot fire parts; needs their trust to lead.** | Self-leadership is a *state* to detect, not a rank to earn. "Who's in charge right now?" is the key question. |
| **False self** | A protective coalition (Inner Kids + Guardians) that takes over when Self is disabled. | "Protective autopilot" framing; blending detector. |
| **Blending** | A part takes over; its emotions/beliefs feel like *your* reality. Normal, not failure. | In-moment "who's driving?" tagging; not shamed. |
| **Unblending** | Step back; witness the part *as* a part. Prerequisite to any real work. | Unblending gate before deeper flows. |
| **Living in the past** | A part (usually young) is stuck in the trauma era; can be invited on a safe "visit" to the present. | A boolean flag + a "bring to the present" flow (this is the theory's "exile" state). |
| **Disowned parts** | Parts pushed outside awareness; often attract mirror-people. | "Disowned" flag; re-ownership flow. |
| **Inner family / team** | Managers, Inner Kids, Guardians forming a family; harmonize via teamwork + councils. | Team map, council feature, teamwork checklist. |

---

## 3. Taxonomy — Theory vs Scaffold (KEY DIVERGENCE)

### 3.1 What the theory actually groups
The SFHELP theory groups subselves into **three functional groups plus optional spiritual/other**:

1. **Managers** — general staff that run daily life proactively (Nurturer/Good Parent, Analyzer, Thinker, Organizer, Teacher, Achiever, Planner, People-pleaser…).
2. **Guardians** — protectors that activate to defend the system (Critic, Perfectionist, Worrier, Catastrophizer, Pessimist, Numb-er, Blocker, Saboteur, Skeptic/Doubter, Aggressor, Addict, Controller…).
3. **Inner Kids** — developmentally young, vulnerable parts (Playful, Curious, Scared, Shamed, Abandoned, Hurt, Angry, Lost, Victim, Rebel, Bully, Entitled…).
4. **Spiritual / other** — optional (guides, spiritual presences; also "Disowned" parts).

Crucially, in this theory **"exile" is not a fourth group** — it is a *state* a young (or Guardian) part is in: **"living in the past."** Likewise there is no separate "firefighter" group in the sfhelp framing; crisis responders are **Guardians** using extreme methods.

### 3.2 What the scaffold currently assumes
`src/lib/types.ts` + `src/content/taxonomy.ts` use the **IFS-branded 3-category** model:

```
manager | firefighter | exile   →   "Protective" / "Reactive" / "Wounded" Voices
```

This (a) diverges from the source theory's grouping, (b) uses the exact IFS framing we're told to avoid, and (c) collapses "exile" (a state) into a hard category.

### 3.3 Recommended taxonomy (theory-faithful, licensing-safe)
Adopt the theory's grouping, rename for the product, and demote "exile" to a flag:

| New app key | Display label | Emoji | Maps from (scaffold) | Notes |
|---|---|---|---|---|
| `manager` | **Guiding Voices** | 🧭 | `manager` | Proactive helpers: Nurturer, Organizer, Planner, Analyzer, Achiever |
| `guardian` | **Protective Voices** | 🛡️ | `firefighter` + part of `manager` | Critic, Perfectionist, Worrier, Catastrophizer, Numb-er, Saboteur, Addict, Blocker |
| `innerKid` | **Young Voices** | 🧸 | `exile` + part of `manager`/`firefighter` | Scared, Shamed, Abandoned, Playful, Angry, Hurt, Lost |
| `spiritual` (optional) | **Guiding Presence** | ✨ | *(new)* | Optional spiritual/other parts; can be toggled off |

Plus **flags** (not categories):
- `livingInPast: boolean` — the old "exile/wounded" state.
- `disowned: boolean` — outside awareness.

> Legacy compatibility: keep a mapping `manager→manager`, `firefighter→guardian`, `exile→innerKid` + set `livingInPast=true` when migrating existing `exile` records.

---

## 4. Licensing-Safe Label Map (apply to all copy)

| Theory term | Product copy |
|---|---|
| Subself / part | "part" / "aspect of you" |
| True Self (capital S) | "your Inner Leader" (glossary may say "Self") |
| False Self | "protective autopilot" / "survival self" |
| Inner Kids | "Young Voices" / "young parts" |
| Guardian | "Protective Voices" |
| Manager | "Guiding Voices" |
| Firefighter (IFS) | *(dropped; crisis responders are Protective Voices)* |
| Exile (IFS) | *(dropped; use "a part living in the past")* |
| Blending | "takeover" / "blended with [part]" |
| Unblending | "stepping back" |
| Burden | "old pain / outdated belief" |
| Reassign / retrain | "new role / updated job" |
| Inner family / team | "your Inner Team" |
| Polarization | "inner tug-of-war" |
| Alliance | "inner partnership" |
| Blocker | "interference / static" |

---

## 5. The Method: 5-Phase Arc → App Journey

The theory's overall arc (synthesized from pages 1–6) becomes the app's **Journey / program** structure:

| Phase | Theory content | App "Journey" stage |
|---|---|---|
| **1. Understand & Prepare** | Learn concepts; glossary; temperament; self-awareness; goal-setting; language awareness ("a part of me"); set up session space. | **Orientation** — Learn articles + goals + first check-ins |
| **2. Meet & Map** | Evolve a list of subselves; group as Kids/Guardians/Managers; name them; build images; notice trust levels. | **Inner Team Map** — part cards, naming, grouping |
| **3. Communicate** | Inner dialogs, interviews, all channels (voices, images, senses, body, memories, dreams, writing); argue-vs-blend; first-interview question set. | **Dialogues & Journal** — guided interview + multi-channel logging |
| **4. Free & Resolve** | Unblending/free the Self; resolve inner conflicts; re-doing; rescue "stuck-in-the-past" parts; Safe Haven; disowned parts. | **Unblending & Rescuing** (readiness-gated) |
| **5. Harmonize** | Retrain/reassign roles; build trust (trial periods); teamwork checklist; inner councils; measure progress. | **Retrain & Council** — new roles, team meetings, progress |

App should present these as a **non-linear journey with a recommended default order** and **readiness gates** (see §10), because the theory insists deeper work (phases 4–5) requires prior trust-building.

---

## 6. Techniques Catalog → App Features

This is the core mapping. Each theory technique → a concrete app surface.

### 6.1 Awareness & language
| Theory technique | App feature | Screen |
|---|---|---|
| **Language awareness** — notice "I am" vs "a part of me is…" | In-app **reframe nudge**: users can flag a sentence and see the "a part of me…" rewrite | Journal / Check-in inline tool |

### 6.2 Session preparation
| Theory technique | App feature | Screen |
|---|---|---|
| **Prepare**: undistracted time, comfortable/quiet place, materials, agree to pause when overwhelmed, physiological needs met | **Session Setup wizard** — checklist + "agree-to-pause" contract + environment nudge | Session (pre-step) |

### 6.3 Check-in / Self-detection
| Theory technique | App feature | Screen |
|---|---|---|
| **"Who's in charge right now?"** — detect Self vs blended | Daily **Check-In**: mood + 8 Cs + "who's driving?" part tag | Check-In |
| **Blending spotter** — notice takeover in the moment | Quick **"Who's driving?"** capture; builds awareness dataset | Check-In / Home |
| **Self-leadership signs** (calm, centered, clear, compassionate, decisive; emotional range) | Self-leadership **pulse** (3-tap) + trend | Check-In / Progress |

### 6.4 Communication channels (multi-modal)
Theory lists the legitimate channels: inner voices, emotions, memories, "senses," hunches/intuition, images, physical sensations, body signals, flashbacks, dreams, writing, drawing, monologuing, dialoging, change-chairs.

| App feature | Notes |
|---|---|
| **Dialogue journal** | Text back-and-forth between Self and a part |
| **Voice note** | Speak the dialogue aloud |
| **Image/sketch** | Describe or (later) attach an image |
| **Body-signal log** | Log sensation + location (feeds `bodyLocation`) |
| **Dream/hunch capture** | Low-friction quick capture |
| **Change-chairs mode** | Prompted "speak as the part, then as Self" toggle |

### 6.5 First-interview question set
| Theory questions | App: **guided interview flow** |
|---|---|
| "What name would you like?" / "How old are you?" / "Where do you live?" / "Do you live with anyone?" / "What's your job?" / "Do you like your job?" / "What would happen if you stopped?" / "Would you like help with this job?" / "What year is it?" | Stepped prompts that populate part fields: name, age, image, job, `likesJob`, `wouldHappenIfStop`, `livingInPast` (via "What year is it?") |

### 6.6 Deeper work (gated)
| Theory technique | App feature | Gate |
|---|---|---|
| **Unblending / free the Self** | Guided "step back" flow + unblending practice | Always available; encouraged before others |
| **Arguing vs blending** differentiation | Teaching article + in-flow prompt | Phase 3+ |
| **Inner conflict resolution** (polarization) | **Conflict mediator**: pick two parts, hear each, negotiate | After ≥1 part dialogued |
| **Rescuing** (steps 1–5) — befriend Guardian first, then Child; bring to present; Safe Haven | **Rescuing flow** with Safe Haven config | Readiness-gated; trauma → therapist-recommended |
| **Re-doing** (trauma reprocessing) | **Advanced, therapist-recommended** flow, heavily gated | Highest gate |
| **Disowned parts** | **Acceptance flow** to re-own a part | Phase 4+ |
| **Retraining / reassigning roles** | **New-Role negotiation** flow | After trust |
| **Trust-building trial periods** ("observe me for 2 hours; how did I do?") | **Trust tracker** per part (0–5) + trial log | Phase 3+ |
| **Inner councils** | **Council** feature: convene parts, take "minutes" | Phase 5 |
| **Teamwork checklist** (8 items) | **Team-health self-assessment** (recurring) | Phase 5 |
| **Spirituality** (Safe Haven / higher presence) | **Optional module** (toggle) | User choice |

### 6.7 Troubleshooting (from page 7)
| Problem | App surface |
|---|---|
| Trouble staying focused "inside" | Pre-session setup + grounding; "notice Self being overruled" article |
| Difficulty imaging parts | "You don't need to visualize" article + **non-visual channel prompts** ("What do you sense/feel/know?") + Blocker question ("Is someone blocking an image?") |
| A part won't talk | **Silent-part** guidance: ask "who doesn't want this part to speak?", befriend the blocker, patience; "silence is a communication" |
| A part resists change | **Resistance flow**: patience framing, rank-order parts, "living in the past?" check, trust trials, involve the Nurturer |
| Doubt / skepticism | **Doubts article + FAQ**: "parts work feels made up" reframes; reassure parts they won't be fired |

---

## 7. Data Model Implications

### 7.1 `Part` (expand significantly)
```
id, name,
group: 'manager' | 'guardian' | 'innerKid' | 'spiritual'
role,                          // current job
primaryJob?, likesJob?: boolean, wouldHappenIfStop?
age?, gender?, image?,         // from first-interview
fear,                          // keep
needs?, primaryEmotion?,
bodyLocation?,                 // keep
livingInPast?: boolean,        // was 'exile'
disowned?: boolean,
trustLevel?: number,           // 0–5, Self-trust
protectiveOf?: string[],       // child part ids this part guards
alliances?: string[], conflicts?: string[],
status?: 'meeting'|'dialoguing'|'trusting'|'retrained'|'reassigned',
newRole?,
notes?, createdAt, updatedAt
```
*(Scaffold currently has: id, name, category, role, fear, bodyLocation, notes, createdAt.)*

### 7.2 New/expanded entities
- **SessionRecord** — `id, date, phase, technique, targetPartIds[], selfLed (bool), blendingEvents, durationSec, notes`. (Scaffold `PracticeSession` is close but lacks phase/targets/selfLed.)
- **TrustTrial** — `partId, start, end, selfKeptSafe(bool), partFeedback` (from trust-building trials).
- **CouncilMeeting** — `id, date, agenda[], attendeePartIds[], decisions[], minutes`.
- **SafeHaven** — settings: chosen safe place description/imagery, presence figure.
- **BodySignal** — `date, sensation, location, intensity, partId?`.
- Keep `CheckIn`, `JournalEntry` (extend `kind` to include `'interview' | 'conflict' | 'rescue' | 'council'`), `UserSettings`; extend `AssessmentResult`.

### 7.3 Storage
IndexedDB stores: `parts` (add indexes `by-group`, `by-status`), plus new `sessions`, `trustTrials`, `councils`, `bodySignals`, `haven`. Bump `DB_VERSION` and write a migration mapping old category → new group + `livingInPast`.

---

## 8. Screens / IA (revised)

Scaffold's 9 screens: Home, Onboarding, Check-In, Parts, Part Detail, Session, Journal, Practice, Progress, Learn (+ Learn/[slug], Learn/safety).

**Recommended MVP set (theory-complete), 12 surfaces:**
1. **Home / Journey** — phase progress, next best action
2. **Onboarding** — consent, disclaimer, goals
3. **Check-In** — 8 Cs + "who's driving?"
4. **Parts (Inner Team Map)** — grouped cards (3 groups + flags)
5. **Part Detail** — full profile, trust, history, protections
6. **Session** — setup wizard + unblending + guided dialogue/interview
7. **Journal** — multi-channel; filter by part/kind
8. **Practice** — guided exercises library (going inside, Self energy, unblending, rescuing…)
9. **Progress** — Self-led episodes, blending trend, trust deltas, phases
10. **Learn** — theory-safe articles (revised list)
11. **Council** *(new)* — convene parts, minutes *(phase 5, can be v1.1)*
12. **Troubleshooting / Safety** *(new-ish)* — "when you're stuck" + crisis + gating *(highest priority new surface)*

---

## 9. Assessment Redesign

Scaffold: 10 MCQs scored into `manager/firefighter/exile`. Replace with **non-pathologizing, theory-aligned** tools:

1. **Inner Team Map** (interactive, not scored) — user creates part cards; app suggests tracks from patterns (many young parts → "Rescuing"; strong Critic → "Worth Reclaimed").
2. **Self-Leadership Pulse** — daily 3-tap (calm/clear/compassionate), trend not diagnosis.
3. **Blending Spotter** — in-moment "who's driving?" tag.
4. *(Optional keep)* a light **grouping starter** quiz that seeds example parts into managers/guardians/innerKids — but never labels the user.

Assessment weights/keys must move off `firefighter`/`exile` to `guardian`/`innerKid` (or be dropped entirely in favor of #1).

---

## 10. Safety & Readiness Gating (core rule set)

Derived directly from theory:
1. **Unblend before dialoguing**; a blended part "cannot be helped."
2. **Befriend the Guardian before rescuing the Child it guards.** Enforce order in the Rescuing flow (identify protected kids → build trust → bring to present → involve Nurturer → *then* negotiate with Guardian).
3. **Don't rush rescue/redo.** Gate phases 4–5 behind prior dialogue + trust. Trauma/PTSD → **therapist-recommended** gate.
4. **Agree-to-pause contract** in session setup; grounding controls always visible.
5. **Reassure parts** they will never be fired/killed/exiled (shown in reassignment & skepticism flows).
6. **Never pathologize**; use "reduce / manage / support," not "cure / heal permanently."
7. **Crisis resources** on every safety surface; disclaimer that app ≠ therapy.
8. **Attribution without brand infringement** — rewrite `safety.ts` to remove "IFS by Richard Schwartz" naming (see §14).

---

## 11. Progress & Metrics

| Signal | Source |
|---|---|
| Self-led episodes (count/trend) | Check-in "who's driving?" + session `selfLed` |
| Blending frequency (trend down) | Check-in / Blending spotter |
| Team-map growth (parts known) | Parts store |
| Trust deltas per part | Trust tracker / trials |
| Phase completion | Journey |
| Teamwork checklist score over time | Team-health assessment |
| Journal/ dialogue consistency | Journal/practice reps |

---

## 12. Divergence Report vs Current Scaffold

| Area | Status | Required change |
|---|---|---|
| Taxonomy grouping | **DIVERGES** | Replace `manager/firefighter/exile` with `manager/guardian/innerKid(+spiritual)`; add `livingInPast`/`disowned` flags; migrate records |
| Category labels | **DIVERGES** | "Protective/Reactive/Wounded Voices" → "Guiding/Protective/Young Voices" |
| `Part` fields | **PARTIALLY** | Add age, gender, image, needs, job, likesJob, wouldHappenIfStop, trustLevel, protectiveOf, alliances/conflicts, status, newRole |
| Self concept | **ALIGNS (partially)** | 8 Cs + "Core Self" present; reword to "Inner Leader"; add self-leadership *state* detection |
| Blending/unblending | **ALIGNS** | Articles exist; add in-moment "who's driving?" + unblending gate |
| 5-phase journey | **SILENT** | Add Journey/phase structure + readiness gates |
| Session prep | **SILENT** | Add Setup wizard + agree-to-pause |
| First-interview question set | **PARTIALLY** | `dialogueTemplates` has generic prompts; expand to the full interview set and populate part fields |
| Communication channels | **PARTIALLY** | Journal exists; add voice/image/body-signal/dream/change-chairs modes |
| Unblending / conflicts | **PARTIALLY** | Article + practice exist; add Conflict mediator |
| Rescuing / Safe Haven | **SILENT** | Add gated Rescuing flow + Safe Haven config |
| Re-doing | **SILENT** | Add high-gate, therapist-recommended flow |
| Retraining / reassign roles | **PARTIALLY** | `unburdening` practice mentions "new role"; add dedicated New-Role flow |
| Trust-building trials | **SILENT** | Add Trust tracker + trials |
| Inner councils | **SILENT** | Add Council feature (v1.1) |
| Teamwork checklist | **SILENT** | Add Team-health self-assessment |
| Disowned parts | **SILENT** | Add Acceptance flow |
| Spirituality | **SILENT** | Optional module (toggle) |
| Troubleshooting | **SILENT** | Add "when you're stuck" content from page 7 |
| Assessment | **DIVERGES** | Replace scored 3-category quiz with Team Map + Pulse + Spotter |
| Learn articles | **PARTIALLY** | 6 exist; replace with the 11 theory-safe articles from Lane D §5 |
| Safety/disclaimer | **DIVERGES (legal)** | Remove IFS/Schwartz branding; keep attribution generic; keep crisis resources |
| Licensing exclusions | **PARTIALLY** | Enforce Lane D §6 do-not-use list across all copy |

---

## 13. Change Backlog (implementation order)

Locked design → hand to spec/fixer lanes:

- **C1 (types + storage)** — new taxonomy keys, `Part` expansion, new entities, DB migration. *(blocks everything)*
- **C2 (content)** — `taxonomy.ts`, `dialogueTemplates.ts`, `learn.ts` (11 articles), `assessment.ts` (Team Map/Pulse/Spotter), `sessionFlow.ts` (5-phase), `practice.ts` (unblending/rescuing/new-role), new `troubleshooting.ts`, new `interview.ts` (question set), `safety.ts` (rebrand + attribution fix).
- **C3 (screens IA)** — Journey/Home, Part Detail fields, Session setup wizard + gating, Journal multi-channel, Council, Safety/Troubleshooting. *(designer lane)*
- **C4 (hooks/logic)** — extend `useParts/useCheckIns/useJournal/usePractice/useProgress/useSettings`; add `useSessions/useTrust/useCouncils`; gating logic.
- **C5 (verify)** — `pnpm build` + `pnpm lint`; manual flow smoke test; then revoke notes access.

---

## 14. Decisions (RESOLVED)

1. **Taxonomy** — ✅ **Adopt** `manager/guardian/innerKid` (+optional `spiritual`); `livingInPast`/`disowned` are flags. Migration: `firefighter→guardian`, `exile→innerKid` + `livingInPast=true`. *(Frozen in `src/lib/types.ts`.)*
2. **MVP scope** — ✅ **Core 5-phase now**; **Council → v1.1**; **Re-doing = gated / therapist-recommended**.
3. **`safety.ts` attribution** — ✅ Must be **rewritten to drop IFS/Schwartz brand names** (generic attribution only).
4. **Spirituality module** — ✅ Optional, **off by default** (`settings.spiritualityEnabled`).
5. **Notes access** — ✅ Keep temporary `~/docs/notes` allow rules until build (C5) is done, then revoke.
