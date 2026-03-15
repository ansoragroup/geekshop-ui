# Protocol Modifications
<!-- Proposed/testing/adopted changes to the consilium protocol. -->
<!-- Status lifecycle: PROPOSED → TESTING (2+ sessions) → ADOPTED or REJECTED -->

## TESTING: Skip Phase 2-3 for mechanical compliance tasks
- **Observed:** Phase 5 was executed directly after Phase 0 for forwardRef/rest/hooks work. No cross-pollination or debate was needed — the work was identical pattern applied 44 times.
- **Proposal:** IF task_type == "compliance" AND changes follow a single repeatable pattern, skip Phases 2 (cross-pollinate) and 3 (debate).
- **Evidence:** Session 20260315 — 44 forwardRef additions, 5 useControllableState wirings, all followed identical pattern. Debate would add zero value.
- **Status:** TESTING (session 1 of 2)
- **Note:** Testing from 20260315. Will compare outcome quality with/without skip.

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
