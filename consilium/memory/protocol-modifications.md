# Protocol Modifications
<!-- Proposed/testing/adopted changes to the consilium protocol. -->
<!-- Status lifecycle: PROPOSED → TESTING (2+ sessions) → ADOPTED or REJECTED -->

## ADOPTED: Skip Phase 2-3 for compliance/bugfix ONLY
- **Observed:** Phase 5 was executed directly after Phase 0 for forwardRef/rest/hooks work. No cross-pollination or debate was needed — the work was identical pattern applied 44 times.
- **Proposal:** Skip Phase 2-3 for compliance/bugfix ONLY. Feature and architecture tasks MUST have minimum 2 debate rounds.
- **Evidence:** Session 20260315 — 44 forwardRef additions, 5 useControllableState wirings, all followed identical pattern. Debate would add zero value. However, sessions s2 and s3 skipped debate for feature tasks (i18n architecture, theme system). Both required rework: i18n had missing keys, theme had incomplete palettes. Debate would have caught these.
- **Status:** ADOPTED

## REJECTED: Mini Phase 8 after each implementation round
- **Observed:** Session had 4 implementation rounds (audit, phase5a, phase5b, phase5c) but Phase 8 only ran once after audit.
- **Proposal:** After each implementation round, run a lightweight Phase 8.
- **Status:** REJECTED (2026-03-25 evolution review)
- **Reason:** Stalled 10 days in TESTING with 0/2 sessions tested. This project's workflow is fast-paced parallel execution — mini retros between rounds add friction without proven value. Metrics are captured at session end which is sufficient.

## ADOPTED: Include "remove export default" in forwardRef prompts
- **Observed:** 2 of 3 forwardRef agents left `export default` statements when converting from FC to forwardRef.
- **Proposal:** Add explicit instruction to forwardRef agent prompts: "If the component has `export default X`, remove it. This project uses named exports only."
- **Status:** ADOPTED

## ADOPTED: Enforce debate for feature/architecture tasks
- **Observed:** Feature sessions s2 and s3 skipped debate. i18n architecture and theme system required rework.
- **Proposal:** Feature and architecture task types MUST have Phase 3 (debate) with minimum 2 rounds. Only compliance and bugfix tasks may skip.
- **Evidence:** Sessions s2 (i18n had 71 missing keys), s3 (theme had incomplete palettes). Session 20260321 ran 2 debate rounds — best session outcome (500 files, 8 agents, 0 gate failures).
- **Status:** ADOPTED
- **Enforcement status:** 1 of 5 feature sessions enforced (20260321). Enforcement rate: 20%. MUST improve to 100%.

## REJECTED: Require Phase 6 (cross-review) for sessions with 3+ agents
- **Observed:** Cross-review phase has never executed across 13 sessions.
- **Proposal:** Sessions with 3+ agents MUST run Phase 6 (cross-review).
- **Status:** REJECTED (2026-03-25 evolution review)
- **Reason:** Stalled 5 days in TESTING with 0/2 sessions tested. This project relies on automated quality gates (lint, tsc, tests) + Playwright visual verification + owner review. Adding manual cross-review between agents adds latency without demonstrated benefit beyond what gates catch. If quality gate failures increase, reconsider.

## ADOPTED: Always use TeamCreate for multi-agent work
- **Observed:** Owner explicitly requires team agents over standalone Agent spawns.
- **Proposal:** All multi-agent work MUST use TeamCreate.
- **Status:** ADOPTED

## ADOPTED: Mandatory component reuse check before creating new components
- **Observed:** DesktopHeaderAliExpress created plain `<form>` instead of reusing DesktopSearchAutocomplete.
- **Proposal:** Before creating ANY component, check Component Reuse Map in CLAUDE.md.
- **Status:** ADOPTED

## ADOPTED: Storybook sidebar organization convention in CLAUDE.md
- **Observed:** Desktop components placed in wrong Storybook sections.
- **Proposal:** Desktop Storybook titles MUST use `'{Category} (Desktop)/{ComponentName}'` pattern.
- **Status:** ADOPTED

## ADOPTED: Full component checklist for "audit all" requests
- **Observed:** Owner asked to audit all 150+ components. Agent only audited 4.
- **Proposal:** When owner requests audit/fix of "all" components: (1) enumerate every directory, (2) create markdown checklist, (3) process each one, (4) report remaining count if exhausted, (5) NEVER mark complete until every component checked.
- **Status:** ADOPTED (promoted from PROPOSED — 2026-03-25 evolution review)
- **Reason:** Owner signal "все means literally all" has confidence 1.0. No testing period needed — this is a hard owner requirement.

## ADOPTED: Critical Rules Injection for all agent spawns
- **Observed:** Agents don't read CLAUDE.md. After compaction, rules are lost.
- **Proposal:** Include `consilium/memory/critical-rules.md` in every agent spawn prompt.
- **Status:** ADOPTED

## ADOPTED: Theme-compatible CSS enforcement
- **Observed:** Hardcoded `#FFF0F3 → #F5F0FF` gradient in DesktopSaleHits survived multiple sessions. Owner caught in 20260325b: "оранжевый для темы монохром херня подзалупная".
- **Proposal:** All component backgrounds and colors MUST use `var(--gs-*, fallback)`. Hardcoded hex values in bg/color/border-color properties are rejected. Agent spawn prompts must include: "Never hardcode hex colors for backgrounds. Use var(--gs-color-primary-bg) or var(--gs-bg-card) etc."
- **Status:** ADOPTED (2026-03-25, fast-tracked — owner signal confidence 1.0)
