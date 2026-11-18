# Backcasting Plan: InnerHarmony — Free, Community-Funded, Sustainable

---

## Target Future State: 3 Years Out (Month 36)

| Metric | Target |
|--------|--------|
| **Monthly Active Users** | 25,000 |
| **Recurring Community Revenue** | $5,000/mo |
| **Core Maintainers (merge rights)** | 5 |
| **Active Contributors (monthly)** | 30 |
| **Languages** | 12 |
| **Institutional Partners** | 8 (clinics, universities, training orgs) |
| **Grant Funding Secured** | $75k cumulative |
| **Platform** | iOS, Android, Web, F-Droid |
| **Uptime / Incident MTTR** | 99.9% / <2 hrs |
| **Bus Factor** | ≥3 on every critical system |

**Qualitative**: Recognized as the reference implementation for digital Parts Work; cited in 3+ peer-reviewed papers; recommended by IFS Institute.

---

## Backcast: What Must Be True at Each Milestone

### Month 24 (Year 2) — "Self-Sustaining Engine"
- $4k/mo recurring (200 sustainers @ $25 + 2 grants/yr + 3 partners)
- 4 core maintainers, 20 active contributors
- 8 languages, mobile apps in stores
- 15k MAU, 5% sponsor conversion
- 2 peer-reviewed publications using platform data
- Automated release pipeline: weekly web, monthly mobile
- Security audit completed, SOC2-ready controls

**→ Preconditions at Month 18:**
- Grant pipeline yielding ≥$15k/yr
- 3 institutional LOIs signed
- Contributor onboarding < 2 hrs (docs, dev env, first issue)
- Translation pipeline: PR → auto-deploy in 24h
- Mobile build pipeline (Fastlane / EAS) green

### Month 12 (Year 1) — "Community Flywheel Spinning"
- $2.5k/mo recurring (100 sustainers + 1 grant + 1 partner)
- 3 core maintainers, 10 active contributors
- 5 languages
- 5k MAU, 2% sponsor conversion
- First academic citation (preprint)
- RFC process live; 4 major features community-proposed
- Therapist referral loop: 50 clinicians using "prescribe links"

**→ Preconditions at Month 9:**
- Open Collective at $1.5k/mo
- First grant awarded ($10–25k)
- First institutional LOI
- Contributor guide + good-first-issues ≥20
- Translation infra (Crowdin/Weblate) + 3 language teams
- Therapist referral link generator shipped

### Month 6 — "Foundation Solid"
- $1k/mo recurring (50 sustainers @ $25)
- 2 core maintainers + founder
- 2 languages (EN + ES)
- 1k MAU
- Open Collective page live with transparent budget
- `CONTRIBUTING.md`, `GOVERNANCE.md`, CLA, Code of Conduct
- First grant application submitted (Mozilla OSS / NLnet)
- 10 good-first-issues, mentorship program launched
- Therapist "prescribe link" MVP tested with 5 clinicians

**→ Preconditions at Month 3:**
- Fiscal host (Open Collective) active
- `FUNDING.yml` in repo (GitHub Sponsors, OC, Ko-fi)
- 3 good-first-issues labeled
- Landing page: "Free forever, community-funded" + sponsor wall
- Analytics (Plausible/Umami) + error tracking (Sentry)
- Automated deploy preview on PR

### Month 3 — "Launch Ready"
- Legal: fiscal host active, trademark filed
- Repo public with license (AGPL-3.0 or MIT + Commons Clause)
- Funding page live, first 10 sponsors (founder network)
- Contributor onboarding doc + dev environment script
- 5 good-first-issues across code/content/art/translation
- Therapist feedback loop: 3 clinicians committed to test
- Grant calendar: 3 deadlines identified, 1 draft written

### Month 1 — "Weekend Sprint"
- [ ] Open Collective page deployed
- [ ] `FUNDING.yml`, `CONTRIBUTING.md`, `GOVERNANCE.md`, `CODE_OF_CONDUCT.md` committed
- [ ] Trademark application filed (USPTO TEAS Plus, $250)
- [ ] 10 good-first-issues created (code/content/art/translation)
- [ ] Landing page updated: "Free forever • Community-funded" + sponsor embed
- [ ] Analytics + error tracking + deploy previews live
- [ ] Email 5 IFS trainers: "Free tool for your students — feedback welcome?"
- [ ] Grant calendar: Mozilla OSS (quarterly), NLnet (rolling), Shuttleworth (annual)
- [ ] First grant draft (Mozilla OSS) — 2 pages: problem, solution, budget, team

---

## Critical Path Dependencies (Must Happen in Order)

```
1. Fiscal host + legal entity (Week 1)
      ↓
2. Transparent funding page + first sponsors (Week 2)
      ↓
3. Contributor onboarding + good-first-issues (Week 3)
      ↓
4. First grant application submitted (Month 1)
      ↓
5. Therapist referral MVP + 3 clinician pilots (Month 2)
      ↓
6. $500/mo recurring → hire part-time maintainer (Month 4)
      ↓
7. Mobile build pipeline + translation infra (Month 5)
      ↓
8. $1k/mo → second maintainer (Month 6)
      ↓
9. First grant awarded + first institutional LOI (Month 9)
      ↓
10. $2.5k/mo → third maintainer + contractor budget (Month 12)
```

---

## Risk Mitigation (Backcast from Failure Modes)

| Failure Mode | Early Indicator | Countermeasure (by Month) |
|--------------|-----------------|---------------------------|
| **Single maintainer burnout** | >2 weeks no merges | Month 2: 2nd maintainer with merge rights |
| **Donor churn >30%/yr** | Monthly recurring plateaus | Month 4: quarterly impact reports, sponsor perks |
| **Grant rejections** | 0/3 applications funded | Month 3: diversify — 5 applications, diff funders |
| **Scope creep kills velocity** | >50% issues untriaged | Month 1: RFC gate, "core freeze" label |
| **No institutional partners** | 0 LOIs at Month 6 | Month 3: dedicated outreach list (50 targets) |
| **Mobile app store rejection** | Build fails / guideline issues | Month 5: TestFlight / internal testing weekly |
| **Translation quality low** | User complaints / low adoption | Month 6: native-speaker review gate |

---

## Resource Budget (Cumulative 36 Months)

| Category | Year 1 | Year 2 | Year 3 | Total |
|----------|--------|--------|--------|-------|
| Hosting / Infra | $2k | $5k | $8k | $15k |
| Maintainer Stipends (part-time) | $15k | $45k | $72k | $132k |
| Contractor (art, security, i18n) | $5k | $15k | $20k | $40k |
| Legal / Trademark / Accounting | $2k | $1k | $1k | $4k |
| Grants (matched) | -$25k | -$50k | -$75k | -$150k |
| **Net Cash Needed** | **-$3k** | **$16k** | **$26k** | **$39k** |

**Funding Mix Target**: 40% recurring sponsors, 40% grants, 20% institutional

---

## Decision Gates (Go/No-Go)

| Gate | Criteria | If No-Go |
|------|----------|----------|
| **Month 3** | ≥10 sponsors, 1 grant submitted, 3 clinician pilots | Pivot to pure volunteer; reduce scope |
| **Month 6** | $1k/mo recurring, 1k MAU, 2 maintainers | Seek fiscal sponsor org (e.g., Apache, Linux Foundation) |
| **Month 12** | $2.5k/mo, 5k MAU, 1 grant awarded, 1 partner LOI | Apply for NSF SBIR / EU Horizon (requires entity) |
| **Month 24** | $4k/mo, 15k MAU, 4 maintainers, 2 publications | Spin up 501(c)(3) for larger grants |

---

## One-Page Sprint Plan (Next 30 Days)

| Week | Mon | Tue | Wed | Thu | Fri | Sat | Sun |
|------|-----|-----|-----|-----|-----|-----|-----|
| **1** | Open Collective setup | Fiscal host config | Trademark filing | `FUNDING.yml` + docs | Landing page update | **Rest** | **Rest** |
| **2** | Good-first-issues (10) | Contributor guide | Dev env script | Analytics + Sentry | Deploy previews | Outreach: 5 trainers | Grant calendar |
| **3** | Mozilla OSS draft | Therapist referral spec | Clinician calls (3) | Refine draft | Submit grant | **Rest** | **Rest** |
| **4** | Therapist MVP build | Test with 3 clinicians | Feedback loop | Sponsor thank-you | Month 1 retro | Plan Month 2 | **Rest** |

---

**Success =** A self-governing, multilingual, mobile-first Parts Work platform that outlives any single maintainer, funded by the community it serves.