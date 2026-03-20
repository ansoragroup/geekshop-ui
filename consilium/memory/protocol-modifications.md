# Protocol Modifications
<!-- Proposed/testing/adopted changes to the consilium protocol. -->
<!-- Status lifecycle: PROPOSED → TESTING (2+ sessions) → ADOPTED or REJECTED -->

## ADOPTED: Skip Phase 2-3 for compliance/bugfix ONLY
- **Observed:** Phase 5 was executed directly after Phase 0 for forwardRef/rest/hooks work. No cross-pollination or debate was needed — the work was identical pattern applied 44 times.
- **Proposal:** Skip Phase 2-3 for compliance/bugfix ONLY. Feature and architecture tasks MUST have minimum 2 debate rounds.
- **Evidence:** Session 20260315 — 44 forwardRef additions, 5 useControllableState wirings, all followed identical pattern. Debate would add zero value. However, sessions s2 and s3 skipped debate for feature tasks (i18n architecture, theme system). Both required rework: i18n had missing keys, theme had incomplete palettes. Debate would have caught these.
- **Status:** ADOPTED
- **Note:** Refined from original "skip for all mechanical tasks" to "compliance/bugfix only" based on s2/s3 evidence.

## TESTING: Mini Phase 8 after each implementation round
- **Observed:** Session had 4 implementation rounds (audit, phase5a, phase5b, phase5c) but Phase 8 only ran once after audit. 10 agent scores and 3 rounds of metrics were lost.
- **Proposal:** After each implementation round in a multi-round session, run a lightweight Phase 8: score agents, log metrics, update failures. Full knowledge graph + protocol review only at session end.
- **Evidence:** Session 20260315 — had to retroactively reconstruct metrics for 3 implementation rounds.
- **Status:** TESTING (session 1 of 2)
- **Note:** Testing from 20260315. Will capture per-round metrics, failures, and prompt scores.

## ADOPTED: Include "remove export default" in forwardRef prompts
- **Observed:** 2 of 3 forwardRef agents left `export default` statements when converting from FC to forwardRef. Required cleanup agent.
- **Proposal:** Add explicit instruction to forwardRef agent prompts: "If the component has `export default X`, remove it. This project uses named exports only."
- **Evidence:** Session 20260315 — agents 1 and 3 left defaults, agent 2 removed them correctly.
- **Status:** ADOPTED
- **Note:** Adopted 20260315. Evidence: 2/3 frontend agents left stale defaults in phase5a.

## ADOPTED: Enforce debate for feature/architecture tasks
- **Observed:** Feature sessions s2 and s3 skipped debate. i18n architecture and theme system required rework.
- **Proposal:** Feature and architecture task types MUST have Phase 3 (debate) with minimum 2 rounds. Only compliance and bugfix tasks may skip.
- **Evidence:** Sessions s2 (i18n had 71 missing keys), s3 (theme had incomplete palettes, SCSS vars not migrated)
- **Status:** ADOPTED

## TESTING: Require Phase 6 (cross-review) for sessions with 3+ agents
- **Observed:** Cross-review phase has never executed across 7 sessions. Quality depends entirely on individual agents + automated gates.
- **Proposal:** Sessions with 3+ active agents MUST run Phase 6 (cross-review). Each agent reviews the next agent's code (circular rotation).
- **Evidence:** Session s3 — stale test assertion (OTPInput import path) would have been caught by review. Session s2 — 71 missing i18n keys would have been caught. 4 total bugs across sessions that review would have prevented.
- **Status:** TESTING (promoted from PROPOSED on 2026-03-20 evolution review)
- **Note:** Testing starts next consilium session with 3+ agents. Need 2 successful sessions to adopt.
