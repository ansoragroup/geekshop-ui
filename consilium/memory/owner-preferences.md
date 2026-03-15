# Owner Preference Model
<!-- Auto-synthesized from owner-profile.jsonl. -->
<!-- Session 1 complete — 10 observations. Next synthesis after session 3. -->

Status: CALIBRATING (session 1/3 — 10 observations, strong signals)

## Decision Style
- Terse, delegating task descriptions — trusts the system to self-direct
- Says "давай все" / "do all recommended steps" — prefers comprehensive execution over incremental
- Trusts agent to merge PRs autonomously ("можешь сам замержить")
- Makes decisions quickly when presented with options ("го пока что GitHub Packages")
- Proactively checks CI status and reports failures

## Quality Bar
- Visual verification required for all component work
- Tests valued (772 tests across 55 components)
- Wants local verification before final approval ("локально как посмотреть")
- Expects 0 lint errors in CI (reported lint failure proactively)

## Hard Rules (non-negotiable)
- NEVER delete anything without explicit permission
- NEVER touch .env.production
- NEVER commit/push to main unless explicitly asked
- Work only on branches: feat/*, bugfix/*, v0.1.*

## Communication Style
- Bilingual: Russian for casual conversation, English for technical terms
- Terse — minimal words, maximum action
- Doesn't need explanations of what was done — can read diffs
- Responds well to status tables and compliance scorecards

## Architecture Preferences
- Version branches (v0.1.*) with tag-based releases, keep last 5
- GitHub Packages for package distribution (@ansoragroup/ui)
- GitHub Actions for CI/CD with quality gates
- Prefers comprehensive single-session execution over multi-session incremental

## Priorities (observed)
1. Complete execution (do everything, not just part)
2. Working CI pipeline (0 errors, all gates pass)
3. Convention compliance (lint enforcement > documentation)
4. Proper release workflow (tags, packages, branches)
5. Local verification before deploy
