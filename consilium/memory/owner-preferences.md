# Owner Preference Model
<!-- Auto-synthesized from 37 observations across 13 sessions + 21 decisions. -->
<!-- Last synthesis: 2026-03-25 (forced re-synthesis) -->

Status: CALIBRATED (13 sessions, 37 observations, 21 decisions, strong signal convergence)

## Decision Style (confidence: 0.92)
- Terse, delegating — "давай все", trusts system to self-direct
- Comprehensive execution over incremental — wants the full vision in one shot
- Trusts autonomous merges/commits — no need to ask on routine operations
- Quick decisions when presented with options ("го пока что GitHub Packages")
- Proactively checks CI status and reports failures
- Iterative visual polish alongside expansion — refines existing while building new

## Quality Bar (confidence: 0.97)
- **Visual correctness is CRITICAL** — "it compiles" ≠ "it works". Must look right on first delivery
- **Zero rework tolerance** — broken output = frustration. Fix it right the first time
- **Rules MUST be followed** — CLAUDE.md rules exist for a reason. Non-compliance wastes time
- **Storybook organization** — Desktop components in correct sidebar sections. Disorganized = unprofessional
- **Reuse existing components** — always check barrel exports before creating new. Duplication = unacceptable
- **Open-source reputation** — no competitor brand names in exported identifiers. Brand-neutral naming only
- **"All" means literally ALL** — "все компоненты" = every single one. Never scope-reduce
- **Equal-height cards** — CTA alignment across grid rows is non-negotiable
- **Genuinely different story variants** — unique data per story, not copy-paste with name changes
- **Values honesty** — prefers honest "I only did 4/150" over silent omission. Transparency > excuses
- **Design alignment = pixel-level** — when reference provided, match every detail before committing
- **CSS must be theme-compatible** — no hardcoded colors. Use CSS custom properties that adapt to any theme. Monochrome theme = gray, not orange
- **Layout alignment** — padding/margins must not misalign child content relative to sibling sections. Clinical design details matter
- Tests valued (772+ tests). 0 lint errors expected. Local verification before deploy

## Hard Rules (confidence: 1.0 — non-negotiable)
- NEVER delete anything without explicit permission
- NEVER touch `.env.production`
- NEVER commit/push to `main` unless explicitly asked
- Work only on branches: `feat/*`, `bugfix/*`, `v0.1.*`

## Communication Style (confidence: 0.97)
- Bilingual: Russian casual + English technical
- Terse — minimal words, maximum action
- Doesn't need explanations — can read diffs
- Status tables and compliance scorecards work well
- Profanity = urgency signal, not hostility. Respond with action, not apologies
- Gets frustrated by lazy/surface-level work — identical stories, placeholders, scope reduction
- Expects immediate correction, not discussion — "бэкграунд какого хера не меняется?" → fix it NOW
- Record every correction in owner-profile.jsonl immediately — don't lose feedback

## Architecture Direction (confidence: 0.92)
- Version branches `v0.1.*` with tag-based releases, keep last 5
- GitHub Packages (`@ansoragroup/ui`), GitHub Actions CI/CD
- Comprehensive single-session execution over multi-session incremental
- **SSR/Next.js readiness** — `'use client'`, CSS vars, `as`/`href` polymorphic props, `cn()` utility
- **i18n pattern**: `labels` prop with typed interface + English defaults (not provider-dependent)
- **Theme-first CSS**: all color/bg values via `var(--gs-*)`. Components must work in ANY color theme — orange, blue, gray, dark. Hardcoded hex = rejected

## Agent Workflow (confidence: 0.97)
- **ALWAYS team agents** — never standalone Agent spawns. Frustrated when agents launched outside team
- Parallel execution with exclusive file boundaries per agent
- Real engineering team level — not checkbox-checkers
- **Check existing components before creating** — search barrel exports first. Reuse > recreation
- **Storybook organization non-negotiable** — `{Category} (Desktop)/{Name}` for Desktop, `{Category}/{Name}` for mobile
- **Rich stories** — every component must have 8+ stories covering all props, variants, edge cases, interactive states

## Scope Preferences (confidence: 0.92)
- Comprehensive, not minimal — 15+ features per task, full vision executed
- Thoroughness over speed — incomplete is worse than slow
- Expansion + polish simultaneously — new components + refining existing in same session
- **Full library audits when requested** — "audit all" = checklist every directory, track progress, flag remaining count

## Design Preferences — Desktop (confidence: 0.97)
- Must match Uzum.uz / Ozon.ru / Alifshop.uz pixel-level
- Product cards: white bg images, badges, installment pills, full-width CTA, wishlist heart
- **Header contained in max-width container** with rounded corners — NOT full-width edge-to-edge
- Real product images (Unsplash for demos, no picsum/placehold.co)
- **Section backgrounds must be theme-compatible** — use `var(--gs-color-primary-bg)` not hardcoded gradients. Gray theme = gray bg, blue theme = blue bg
- **Content alignment** — all page sections (header, banners, sale hits, product grid, footer) must align horizontally. Extra padding that misaligns content = unacceptable

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
| 9 | SSR readiness: `'use client'` + CSS vars + polymorphic props | All components ready |

## Priorities (ranked by observed behavior)
1. Working output on first delivery (no rework)
2. Complete execution (everything, not a subset)
3. Visual correctness (Storybook must look right)
4. Theme compatibility (works in any color scheme)
5. Working CI pipeline (0 errors, all gates pass)
6. SSR/Next.js readiness
7. Convention compliance (lint enforcement > docs)
8. Proper release workflow (tags, packages, branches)
9. Local verification before deploy
