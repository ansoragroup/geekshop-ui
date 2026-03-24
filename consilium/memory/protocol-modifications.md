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
- **Status:** TESTING (session 0 of 2 — stalled 9 days)
- **Note:** TESTING — 0 of 2 sessions tested. Stalled since 20260315. **DEADLINE: Must be tested in next consilium session (by 2026-03-28) or REJECTED.** 9 days without testing is unacceptable for a TESTING mod.

## ADOPTED: Include "remove export default" in forwardRef prompts
- **Observed:** 2 of 3 forwardRef agents left `export default` statements when converting from FC to forwardRef. Required cleanup agent.
- **Proposal:** Add explicit instruction to forwardRef agent prompts: "If the component has `export default X`, remove it. This project uses named exports only."
- **Evidence:** Session 20260315 — agents 1 and 3 left defaults, agent 2 removed them correctly.
- **Status:** ADOPTED
- **Note:** Adopted 20260315. Evidence: 2/3 frontend agents left stale defaults in phase5a.

## ADOPTED: Enforce debate for feature/architecture tasks
- **Observed:** Feature sessions s2 and s3 skipped debate. i18n architecture and theme system required rework.
- **Proposal:** Feature and architecture task types MUST have Phase 3 (debate) with minimum 2 rounds. Only compliance and bugfix tasks may skip.
- **Evidence:** Sessions s2 (i18n had 71 missing keys), s3 (theme had incomplete palettes, SCSS vars not migrated). Session 20260321 ran 2 debate rounds — first actual enforcement, produced the best session outcome (500 files, 8 agents, 0 gate failures).
- **Status:** ADOPTED
- **Enforcement status:** 1 of 5 feature sessions enforced (20260321). 4 feature sessions skipped (s2, s3, 20260317, 20260318). Enforcement rate: 20%. MUST improve to 100%.

## TESTING: Require Phase 6 (cross-review) for sessions with 3+ agents
- **Observed:** Cross-review phase has never executed across 11 sessions. Quality depends entirely on individual agents + automated gates.
- **Proposal:** Sessions with 3+ active agents MUST run Phase 6 (cross-review). Each agent reviews the next agent's code (circular rotation).
- **Evidence:** Session s3 — stale test assertion (OTPInput import path) would have been caught by review. Session s2 — 71 missing i18n keys would have been caught. 4 total bugs across sessions that review would have prevented. Session 20260320 — owner deleted 3 homepage variants, suggesting pre-integration review would have caught quality issues.
- **Status:** TESTING (promoted from PROPOSED on 2026-03-20 evolution review)
- **Note:** TESTING — 0 of 2 sessions tested. **DEADLINE: Must be tested in next 3+ agent consilium session (by 2026-03-28) or REJECTED.** 4 days stalled since promotion.

## ADOPTED: Always use TeamCreate for multi-agent work
- **Observed:** Owner explicitly requires team agents over standalone Agent spawns. Got frustrated when agents were launched outside the team structure.
- **Proposal:** All multi-agent work MUST use TeamCreate to spawn agents as a coordinated team. Never use standalone Agent spawns for parallel work. Team structure provides: shared context, coordinated file boundaries, proper orchestration, and metrics collection.
- **Evidence:** Session 20260321 — owner explicitly told to always use team agents, not standalone agents. Frustrated when agents were launched outside team. Confirmed in CLAUDE.md memory `feedback_team_agents_mandatory.md`. Also in owner-preferences.md Agent Workflow section.
- **Status:** ADOPTED (fast-tracked from PROPOSED on 2026-03-24 evolution review)
- **Note:** Owner signal is unambiguous and repeated across multiple sessions. No testing period needed — this is a hard owner requirement, not a process improvement hypothesis.

## ADOPTED: Mandatory component reuse check before creating new components
- **Observed:** DesktopHeaderAliExpress created with plain `<form>` instead of DesktopSearchAutocomplete, and plain `<button>` instead of MegaMenu. Owner: "почему блять не переиспользован компонент существующий"
- **Proposal:** Before creating ANY component, check Component Reuse Map in CLAUDE.md. Phase 1 MUST include a barrel-export scan.
- **Evidence:** Session 20260324 — header rewritten twice because first version didn't reuse search/menu. Owner explicitly frustrated. Now enforced via Component Reuse Map table in CLAUDE.md + critical-rules.md injection.
- **Status:** ADOPTED (2026-03-24, fast-tracked — owner signal unambiguous)

## ADOPTED: Storybook sidebar organization convention in CLAUDE.md
- **Observed:** DesktopSaleHits placed in "Content" instead of "Content (Desktop)". Owner: "какого хуя твои компоненты находятся не в их соответствующих секциях"
- **Proposal:** Desktop Storybook titles MUST use `'{Category} (Desktop)/{ComponentName}'` pattern.
- **Evidence:** Session 20260324 — DesktopSaleHits and DesktopHeaderAliExpress stories both wrong. Now enforced via Storybook Title Convention table in CLAUDE.md + critical-rules.md.
- **Status:** ADOPTED (2026-03-24, fast-tracked — convention now documented in CLAUDE.md)

## ADOPTED: Critical Rules Injection for all agent spawns
- **Observed:** Agents don't read CLAUDE.md. After context compaction, rules are lost. Subagents receive custom prompts without project rules.
- **Proposal:** Create `consilium/memory/critical-rules.md` (~30 lines) containing the most-violated rules. This file MUST be included in every agent spawn prompt. It survives compaction because it's a separate file that gets re-read.
- **Evidence:** All 11 sessions show rule violations that trace to agents not having rules at implementation time. The 590-line CLAUDE.md is too large to inject; the 30-line critical-rules.md is small enough to always include.
- **Status:** ADOPTED (2026-03-24, file created and populated)
