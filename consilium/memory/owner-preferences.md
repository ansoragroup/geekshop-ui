# Owner Preference Model
<!-- Auto-synthesized from owner-profile.jsonl. -->
<!-- Sessions 1-11 complete — 27 observations. Updated 2026-03-21 evolution fixes. -->

Status: CALIBRATED (11 sessions, 27 observations, strong signal convergence)

## Decision Style (confidence: 0.90)
- Terse, delegating task descriptions — trusts the system to self-direct
- Says "давай все" / "do all recommended steps" — prefers comprehensive execution over incremental
- Trusts agent to merge PRs autonomously ("можешь сам замержить")
- Makes decisions quickly when presented with options ("го пока что GitHub Packages")
- Proactively checks CI status and reports failures
- Wants things committed and pushed immediately — no need to ask permission on routine commits

## Quality Bar (confidence: 0.95)
- Visual correctness is CRITICAL — "it compiles" is not sufficient. Components must look and work correctly on first delivery
- Gets frustrated when output is broken (ThemeSwitcher not working, MDX tables broken) — rework is unacceptable
- Tests valued (772+ tests across 75+ components)
- Wants local verification before final approval ("локально как посмотреть")
- Expects 0 lint errors in CI (reported lint failure proactively)
- Expects agents to think like real IT giant teams, not checkbox-checkers ("такое ощущение что хуево консиллум не парился")
- **Equal-height cards are non-negotiable** — got very frustrated about product card height inconsistency. Visual alignment of CTA buttons across grid rows is critical.
- **Each story variant must have genuinely different data** — very angry when agents produced identical stories with different names but same content.

## Hard Rules (non-negotiable, confidence: 1.0)
- NEVER delete anything without explicit permission
- NEVER touch .env.production
- NEVER commit/push to main unless explicitly asked
- Work only on branches: feat/*, bugfix/*, v0.1.*

## Communication Style (confidence: 0.95)
- Bilingual: Russian for casual conversation, English for technical terms
- Terse — minimal words, maximum action
- Doesn't need explanations of what was done — can read diffs
- Responds well to status tables and compliance scorecards
- Uses direct criticism with profanity when frustrated — not hostile, expressing urgency
- Respond with immediate action, not apologies
- Gets frustrated by lazy agent output — identical stories, placeholder images, surface-level work

## Architecture Direction (confidence: 0.90)
- Version branches (v0.1.*) with tag-based releases, keep last 5
- GitHub Packages for package distribution (@ansoragroup/ui)
- GitHub Actions for CI/CD with quality gates
- Prefers comprehensive single-session execution over multi-session incremental
- **Next.js/SSR readiness is now a priority** — approved 'use client' directives, CSS vars for server rendering, as/href polymorphic props, className merging via cn(). Moving toward Next.js deployment.

## Agent Workflow (confidence: 0.95)
- **ALWAYS use team agents, never standalone** — explicitly told to always use team agents, not standalone Agent spawns. Frustrated when agents were launched outside team structure.
- Prefers parallel execution with exclusive file boundaries per agent
- Expects agents that operate at the level of real engineering teams
- Comprehensive, not minimal — wants the full vision executed, not a subset
- Describes 15+ features in a single task — prefers ambitious scope

## Scope Preferences (confidence: 0.90)
- Comprehensive, not minimal — wants the full vision executed, not a subset
- Describes 15+ features in a single task — prefers ambitious scope
- Expects thoroughness over speed — incomplete is worse than slow
- Wants agents that operate at the level of real engineering teams

## Design Preferences — Desktop (confidence: 0.95)
- Desktop components MUST match Uzum.uz / Ozon.ru / Alifshop.uz pixel-level — not "inspired by"
- Product cards: white bg images, badges at bottom of image, installment pricing in colored pills, full-width CTA, heart wishlist top-right, discount badge top-left
- Each brand variant has its own color (purple Uzum, orange Alifshop, blue Ozon) — not our orange everywhere
- Deleted all 3 DesktopHomePage variants (A, B, C) — unsatisfied with quality, needs redesign from scratch
- See feedback_modern_design_requirements.md for full visual spec

## Visual Standards (confidence: 0.95)
- **Equal-height product cards** — CTA buttons must align across grid rows. Use margin-top: auto on CTA container + flex column layout on cards.
- **Real product images required** — explicitly demanded real brand images from Newegg/ASUS. Rejected picsum.photos and placehold.co placeholders. Wants Storybook to look like real e-commerce.
- **Genuinely different story variants** — each story must have different product names, prices, images, and descriptions. No copy-paste with name changes.
- **Unsplash for fallback demo images** — CDN images from brand sites get hotlink blocked. Use Unsplash as verified source for demo product images.

## Priorities (observed, confidence: 0.85)
1. Working output on first delivery (no rework)
2. Complete execution (do everything, not just part)
3. Visual correctness (Storybook must look right, not just compile)
4. Working CI pipeline (0 errors, all gates pass)
5. SSR/Next.js readiness (production deployment path)
6. Convention compliance (lint enforcement > documentation)
7. Proper release workflow (tags, packages, branches)
8. Local verification before deploy
