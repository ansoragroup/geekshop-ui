# Owner Preference Model
<!-- Auto-synthesized from owner-profile.jsonl. -->
<!-- Sessions 1-3 complete — 20 observations. Next synthesis after session 6. -->

Status: CALIBRATED (3 sessions, 20 observations, strong signal convergence)

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

## Architecture Preferences (confidence: 0.90)
- Version branches (v0.1.*) with tag-based releases, keep last 5
- GitHub Packages for package distribution (@ansoragroup/ui)
- GitHub Actions for CI/CD with quality gates
- Prefers comprehensive single-session execution over multi-session incremental

## Scope Preferences (confidence: 0.90)
- Comprehensive, not minimal — wants the full vision executed, not a subset
- Describes 15+ features in a single task — prefers ambitious scope
- Expects thoroughness over speed — incomplete is worse than slow
- Wants agents that operate at the level of real engineering teams

## Priorities (observed, confidence: 0.85)
1. Working output on first delivery (no rework)
2. Complete execution (do everything, not just part)
3. Visual correctness (Storybook must look right, not just compile)
4. Working CI pipeline (0 errors, all gates pass)
5. Convention compliance (lint enforcement > documentation)
6. Proper release workflow (tags, packages, branches)
7. Local verification before deploy
