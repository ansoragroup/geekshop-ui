# Owner Preference Model
<!-- Auto-synthesized from 35 observations across 12 sessions + 21 decisions. -->
<!-- Last synthesis: 2026-03-24 (forced re-synthesis) -->

Status: CALIBRATED (12 sessions, 35 observations, 21 decisions, strong signal convergence)

## Decision Style (confidence: 0.90)
- Terse, delegating — "давай все", trusts system to self-direct
- Comprehensive execution over incremental — wants the full vision in one shot
- Trusts autonomous merges/commits — no need to ask on routine operations
- Quick decisions when presented with options ("го пока что GitHub Packages")
- Proactively checks CI status and reports failures

## Quality Bar (confidence: 0.95)
- **Visual correctness is CRITICAL** — "it compiles" ≠ "it works". Must look right on first delivery
- **Zero rework tolerance** — broken output = frustration. Fix it right the first time
- **Rules MUST be followed** — CLAUDE.md rules exist for a reason. Non-compliance wastes time
- **Storybook organization** — Desktop components in correct sidebar sections. Disorganized = unprofessional
- **Reuse existing components** — always check barrel exports before creating new. Duplication = unacceptable
- **Open-source reputation** — no competitor brand names (AliExpress, Ozon, Uzum) in exported identifiers. Brand-neutral naming only
- **"All" means literally ALL** — "все компоненты" = every single one, not just recent changes. Never scope-reduce
- **Equal-height cards** — CTA alignment across grid rows is non-negotiable
- **Genuinely different story variants** — unique data per story, not copy-paste with name changes
- **Values honesty** — prefers honest "I only did 4/150" over silent omission. Transparency > excuses
- Tests valued (772+ tests). 0 lint errors expected. Local verification before deploy

## Hard Rules (confidence: 1.0 — non-negotiable)
- NEVER delete anything without explicit permission
- NEVER touch `.env.production`
- NEVER commit/push to `main` unless explicitly asked
- Work only on branches: `feat/*`, `bugfix/*`, `v0.1.*`

## Communication Style (confidence: 0.95)
- Bilingual: Russian casual + English technical
- Terse — minimal words, maximum action
- Doesn't need explanations — can read diffs
- Status tables and compliance scorecards work well
- Profanity = urgency signal, not hostility. Respond with action, not apologies
- Gets frustrated by lazy/surface-level work — identical stories, placeholders, scope reduction

## Architecture Direction (confidence: 0.90)
- Version branches `v0.1.*` with tag-based releases, keep last 5
- GitHub Packages (`@ansoragroup/ui`), GitHub Actions CI/CD
- Comprehensive single-session execution over multi-session incremental
- **SSR/Next.js readiness** — `'use client'`, CSS vars, `as`/`href` polymorphic props, `cn()` utility
- **i18n pattern**: `labels` prop with typed interface + English defaults (not provider-dependent)

## Agent Workflow (confidence: 0.95)
- **ALWAYS team agents** — never standalone Agent spawns. Frustrated when agents launched outside team
- Parallel execution with exclusive file boundaries per agent
- Real engineering team level — not checkbox-checkers
- **Check existing components before creating** — search barrel exports first. Reuse > recreation
- **Storybook organization non-negotiable** — `{Category} (Desktop)/{Name}` for Desktop, `{Category}/{Name}` for mobile

## Scope Preferences (confidence: 0.90)
- Comprehensive, not minimal — 15+ features per task, full vision executed
- Thoroughness over speed — incomplete is worse than slow
- Expansion + polish simultaneously — new components + refining existing in same session
- **Full library audits when requested** — "audit all" = checklist every directory, track progress, flag remaining count. Auditing 4/150 when asked for all = unacceptable

## Design Preferences — Desktop (confidence: 0.95)
- Must match Uzum.uz / Ozon.ru / Alifshop.uz pixel-level
- Product cards: white bg images, badges, installment pills, full-width CTA, wishlist heart
- Brand variants: purple Uzum, orange Alifshop, blue Ozon — not our orange everywhere
- Deleted all 3 DesktopHomePage variants — redesign from scratch required
- Real product images (Unsplash for demos, no picsum/placehold.co)

## Key Decisions (from 21 logged)
| # | Decision | Outcome |
|---|---|---|
| 1 | Desktop as separate `Desktop*` components (not CQ extensions) | 90 components |
| 2 | GeekShopProvider context pattern for i18n | 23 components migrated, 0 breaks |
| 3 | 6-agent parallel expansion by domain | 160 files, 0 conflicts |
| 4 | SCSS → CSS vars migration for runtime theming | 38 files, all themes work |
| 5 | Rich header (Ozon-style) as primary variant | All 3 variants available |
| 6 | Rename AliExpress → Marketplace | Brand-neutral, deprecated alias kept |
| 7 | `labels` prop pattern for i18n-neutral components | Adopted for new components |
| 8 | `formatNumber` shared utility | Replaced 4 duplicates |

## Priorities (ranked by observed behavior)
1. Working output on first delivery (no rework)
2. Complete execution (everything, not a subset)
3. Visual correctness (Storybook must look right)
4. Working CI pipeline (0 errors, all gates pass)
5. SSR/Next.js readiness
6. Convention compliance (lint enforcement > docs)
7. Proper release workflow (tags, packages, branches)
8. Local verification before deploy
