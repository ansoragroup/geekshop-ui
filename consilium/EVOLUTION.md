# Consilium Self-Evolution Engine v2

## Overview

This engine makes consilium better with every session. Not through learning (Claude is stateless),
but through disciplined context engineering: observe, record, synthesize, inject.

The lead orchestrator loads this at session start and applies all tactics automatically.

---

## TACTIC 1: METRICS-DRIVEN FEEDBACK LOOP

Every session tracks quantitative metrics. Phase 8 computes and appends to `memory/metrics.jsonl`:

```json
{
  "session_id": "20260224_143022",
  "task": "Implement JWT auth",
  "task_type": "feature",
  "timestamp": "2026-02-24T14:30:22Z",
  "team_size": 4,
  "team_composition": ["architect", "backend", "frontend", "data"],
  "phases_completed": 9,
  "autonomy_level": 1,
  "metrics": {
    "total_duration_minutes": 45,
    "phase_durations": {
      "context_discovery": 3,
      "investigate": 8,
      "cross_pollinate": 4,
      "debate": 12,
      "plan": 5,
      "implement": 10,
      "review": 4,
      "integrate": 2,
      "retrospective": 2
    },
    "debate_rounds": 4,
    "debate_strategy": "adversarial",
    "plan_revisions": 1,
    "quality_gate_failures": 3,
    "quality_gate_failure_details": ["lint:backend", "test:frontend", "test:frontend"],
    "boundary_violations": 0,
    "review_issues_found": 7,
    "review_critical_issues": 2,
    "integration_failures": 1,
    "tests_added": 14,
    "files_modified": 23,
    "teammate_idle_events": 2,
    "teammate_respawn_events": 0,
    "deadlock_interventions": 0,
    "owner_interventions": 0,
    "owner_plan_changes": 0,
    "context_tokens_used": 45000,
    "expertise_packs_loaded": ["laravel", "docker"],
    "new_knowledge_entities": 8,
    "new_owner_observations": 3
  }
}
```

### Trend Analysis Rules

The lead reads metrics.jsonl at session start, computes trends over last 5 sessions:

1. **quality_gate_failures trending UP:**
   → Increase spawn prompt specificity for failing roles
   → Add: "Run tests before marking complete. Verify lint passes."
   → Log: "QG failures ↑ — tightening implementation instructions"

2. **debate_rounds trending DOWN (avg < 2):**
   → Inject adversarial challenges in Phase 3
   → Add to prompts: "MUST find at least one flaw in each proposal"
   → Log: "Debate depth ↓ — increasing adversarial pressure"

3. **boundary_violations > 0 in last session:**
   → Use explicit file lists in plan, not directory patterns
   → Log: "Boundary violations — switching to explicit file ownership"

4. **teammate_idle_events > team_size:**
   → Tasks too small. Fewer teammates OR larger chunks next time.
   → Log: "Idle events ↑ — adjusting task granularity"

5. **debate duration < implement duration * 0.5:**
   → Debate too short. Enforce minimum rounds.
   → Log: "Debate underspent — enforcing minimum 3 substantive rounds"

6. **integration_failures > 0 for 2+ consecutive sessions:**
   → Add integration contracts to Phase 3 debate
   → Add integration test planning to Phase 4
   → Log: "Recurring integration failures — adding contracts to debate"

7. **owner_interventions > 0 for 2+ consecutive sessions:**
   → System is misaligned with owner expectations
   → Re-synthesize owner-preferences.md immediately
   → Log: "Owner keeps intervening — recalibrating preferences"

8. **new_knowledge_entities trending DOWN:**
   → Project knowledge is saturating (good)
   → Consider shortening Phase 0 further
   → Log: "Knowledge graph stabilizing — reducing discovery overhead"

---

## TACTIC 2: SPAWN PROMPT EVOLUTION

### Prompt Scoring

After each session, lead scores each teammate:

```json
{
  "session_id": "20260224_143022",
  "role": "backend",
  "spawn_prompt_version": "latest",
  "scores": {
    "investigation_depth": 4,
    "debate_quality": 3,
    "implementation_quality": 5,
    "review_value": 4,
    "convention_compliance": 5,
    "owner_alignment": 4,
    "overall": 4.2
  },
  "prompt_modifications_applied": [
    "Added explicit file list from previous boundary violation",
    "Included testing convention from project-conventions.md"
  ],
  "suggested_improvements": [
    "Needs more context about existing service patterns"
  ]
}
```

### Prompt Mutation Rules

1. **Score < 3 overall for 2+ sessions:**
   - Analyze what went wrong
   - Add corrective instructions to `memory/spawn-prompts/{role}-latest.md`
   - Example: low on tests → add "Write tests FIRST (TDD)"

2. **Score == 5 overall:**
   - Save as `memory/spawn-prompts/{role}-golden.md`
   - Future sessions start from golden version

3. **New convention discovered:**
   - Add to ALL future spawn prompts
   - Example: "This project uses repository pattern for all DB access"

4. **Every 5 sessions:**
   - Compare current vs golden prompts
   - If golden still scores higher: revert to golden + incremental additions

5. **Owner alignment < 3:**
   - Inject more owner context into prompt
   - Add specific owner preferences relevant to this role

---

## TACTIC 3: TEAM COMPOSITION OPTIMIZATION

### Role Effectiveness Tracking

```json
{
  "session_id": "20260224_143022",
  "task_type": "feature",
  "team_composition": ["architect", "backend", "frontend", "data"],
  "role_contributions": {
    "architect": {"tasks_completed": 2, "review_issues_found": 5, "debate_contributions": 8, "integration_value": 4},
    "backend": {"tasks_completed": 4, "review_issues_found": 3, "debate_contributions": 6, "integration_value": 3},
    "frontend": {"tasks_completed": 3, "review_issues_found": 2, "debate_contributions": 4, "integration_value": 2},
    "data": {"tasks_completed": 1, "review_issues_found": 1, "debate_contributions": 2, "integration_value": 1}
  },
  "outcome_quality": 4
}
```

### Evolution Rules

1. **Role < 20% of team total for 3+ sessions:**
   → Merge into another role with expanded scope
   → Log: "{role} undercontributing — merging into {other}"

2. **Role > 50% of contributions:**
   → Split into two specialists
   → Log: "{role} overloaded — splitting into sub-roles"

3. **Track task_type → optimal_composition:**
   ```
   Default mappings (evolve based on data):
   feature     → [architect, backend, frontend]
   refactor    → [architect, backend, core]
   bugfix      → [backend, frontend]
   architecture→ [architect, backend, data, infra]
   migration   → [data, backend, infra]
   ```

4. **Outcome quality by team size:**
   Track whether 3-agent teams outperform 4-agent teams for specific task types.
   Smaller teams = less coordination overhead = sometimes better.

---

## TACTIC 4: DEBATE PROTOCOL EVOLUTION

### Debate Quality Scoring

```json
{
  "session_id": "20260224_143022",
  "task_type": "feature",
  "rounds": 4,
  "strategy_used": "adversarial",
  "quality_markers": {
    "proposals_with_tradeoffs": 4,
    "genuine_objections_raised": 7,
    "positions_changed_after_debate": 2,
    "new_risks_discovered": 3,
    "deadlocks_resolved": 1,
    "lead_interventions_needed": 1
  },
  "outcome": "consensus_with_revision",
  "outcome_quality_correlation": 4
}
```

### Strategy Selection Algorithm

For each task_type, track: strategy → avg(positions_changed + risks_discovered)
Select strategy with highest score. Fallback: adversarial.

### Strategy Descriptions

1. **Adversarial** (default): each breaks others' proposals
2. **Red/Blue Team**: half propose, half attack
3. **Rotating Devil's Advocate**: one assigned opposer per round
4. **Convergent**: broad → narrow, eliminate weakest each round
5. **Dialectic**: thesis → antithesis → synthesis

---

## TACTIC 5: PLAN TEMPLATE EVOLUTION

### Plan Quality Scoring

```json
{
  "session_id": "20260224_143022",
  "plan_sections_present": ["task_decomposition", "file_boundaries", "dependency_graph", "verification_criteria", "risk_register", "integration_contracts"],
  "plan_sections_that_prevented_issues": ["dependency_graph", "file_boundaries"],
  "plan_sections_that_missed_issues": ["integration_contracts"],
  "integration_failures_traceable_to_plan_gaps": 1,
  "owner_requested_changes_to_plan": 0
}
```

### Rules
1. Section consistently prevents issues → REQUIRED
2. Section always present, never prevents issues → OPTIONAL
3. Failures traceable to missing section → add as REQUIRED
4. Every 5 sessions: regenerate plan-template.md from scores

---

## TACTIC 6: PROJECT INSTRUCTIONS AUTO-REFINEMENT

The project CLAUDE.md (or equivalent) evolves:

1. **Convention violated by teammate:**
   → Not clear enough in CLAUDE.md → rewrite with examples
2. **Convention discovered during session:**
   → Auto-append to CLAUDE.md
3. **Section never referenced in 5+ sessions:**
   → Archive to memory/archived-conventions.md → remove from CLAUDE.md
4. **Every 10 sessions:**
   → Full CLAUDE.md audit: read everything, produce cleaned version

---

## TACTIC 7: FAILURE RECOVERY EVOLUTION

### Failure Journal

```json
{
  "session_id": "20260224_143022",
  "failure_type": "teammate_stuck",
  "phase": 5,
  "role": "frontend",
  "description": "Frontend stuck on state management refactor for 5+ minutes",
  "root_cause": "Spawn prompt didn't mention existing Redux store structure",
  "resolution": "Lead sent context about Redux store, teammate recovered",
  "prevention": "Add state management details to frontend spawn prompt",
  "prevention_applied": true,
  "recurrence_check": "monitor next 3 sessions"
}
```

### Rules
1. Same failure 2+ times → escalate to HARD RULE in protocol
2. New failure type → add to antipatterns.md
3. Prevention works (no recurrence) → add to patterns.md
4. Every 3 sessions: cluster analysis. Same type, different roles = systemic issue

---

## TACTIC 8: ADAPTIVE PHASE TIMING

### Timing Data

```json
{
  "session_id": "20260224_143022",
  "task_type": "feature",
  "actual_distribution": {
    "context_discovery": 0.07,
    "investigate": 0.18,
    "cross_pollinate": 0.09,
    "debate": 0.27,
    "plan": 0.11,
    "implement": 0.22,
    "review": 0.04,
    "integrate": 0.02,
    "retrospective": 0.02
  },
  "outcome_quality": 4,
  "token_efficiency": 3
}
```

### Rules
Build: task_type → optimal_distribution model.
High outcome_quality sessions define the target distribution.
Lead sets phase time expectations in spawn prompts based on model.

---

## TACTIC 9: KNOWLEDGE GRAPH ACCUMULATION

### Extraction

Each session, Phase 8 extracts entities and relationships from Phase 1 findings:

```json
{
  "session_id": "20260224_143022",
  "entities": [
    {"name": "UserService", "type": "service", "path": "src/services/UserService.ts"}
  ],
  "relationships": [
    {"from": "AuthMiddleware", "to": "UserService", "type": "depends_on"}
  ],
  "annotations": [
    {"entity": "UserService", "note": "Has N+1 query on getUsersWithRoles()"}
  ]
}
```

### Usage
Inject relevant subgraph into spawn prompts. Each session starts with accumulated understanding.

### Maintenance
- Entities not seen in 10+ sessions: mark stale
- Conflicting annotations: newer wins
- Every 10 sessions: validate against actual codebase

---

## TACTIC 10: PROTOCOL SELF-MODIFICATION

### Protocol Review (end of Phase 8)

Lead evaluates:
- Were phases unnecessary for this task type?
- Were phases too short/long?
- Missing phases?
- Communication patterns optimal?

Write to `memory/protocol-modifications.md`:

```markdown
## Proposed: Skip Phase 2 for Small Refactors
- Observed: For refactors < 5 files, cross-pollination adds no value
- Proposal: IF task_type == "refactor" AND files < 5, skip Phase 2
- Evidence: Sessions 20260220, 20260222
- Status: PROPOSED

## Testing: Add Cost Analysis to Debate
- Observed: Owner keeps asking about costs
- Proposal: Add mandatory "cost impact" section to Phase 3 proposals
- Evidence: Sessions 20260222, 20260224
- Status: TESTING (session 1 of 2)
```

### Lifecycle
PROPOSED → TESTING (2+ sessions) → ADOPTED or REJECTED
ADOPTED: merged into ORCHESTRATION.md behavior
REJECTED: moved to antipatterns.md

### Immutable Rules
- CANNOT remove Phase 8 (retrospective/evolution)
- CANNOT remove metrics tracking
- CANNOT remove quality gates
- CANNOT remove file boundary enforcement

---

## TACTIC 11: OWNER MODEL EVOLUTION (NEW)

### Observation
Every session, log owner signals to memory/owner-profile.jsonl:
- Task description style (terse/verbose, technical/product)
- Plan feedback (what approved, what rejected, what modified)
- Correction patterns (what the owner fixes in output)
- Decision patterns (buy/build, speed/quality, simple/scalable)
- Stack preferences (inferred from project + corrections)

### Synthesis
Every 3 sessions (or when 10+ new observations accumulate):
- Read all owner-profile.jsonl entries
- Synthesize into memory/owner-preferences.md
- This file gets injected into every spawn prompt

See consilium/OWNER-DISCOVERY.md for full mechanism.

---

## TACTIC 12: EXPERTISE AUTO-DISCOVERY (NEW)

### Trigger
When Phase 0 detects a technology not in memory/expertise/:
1. Scout or lead writes a concise best-practices document
2. Sources: Claude's training knowledge (NOT web search)
3. Format: patterns, pitfalls, performance tips, testing approach
4. Length: 2-3 pages max
5. Saved to memory/expertise/{technology}.md

### Updates
When a session discovers a project-specific pattern:
- Append to relevant expertise doc under "## Project-Specific Learnings"
- Include session ID and context

### Pruning
Sections never referenced in 10+ sessions: archive.

---

## TACTIC 13: DECISION QUALITY TRACKING (NEW)

### Purpose
Track which decisions led to good outcomes and which didn't.

### Format

```json
{
  "session_id": "20260224",
  "decision": "chose_monolith_over_microservices",
  "context": "API architecture for new feature",
  "who_proposed": "architect",
  "who_objected": "backend",
  "objection_summary": "scaling concerns",
  "resolution": "monolith with clear module boundaries",
  "outcome_measured_sessions_later": 3,
  "outcome": "successful — no scaling issues, simpler deployment"
}
```

### Usage
When similar decisions arise in future sessions, the lead references past outcomes:
"In session X, we chose Y over Z. Outcome: {result}. Consider this precedent."

---

## TACTIC 14: EVIDENCE QUALITY TRACKING (RTPL Integration)

### Purpose
Track how accurate builder self-assessments are vs fresh verifier verdicts.

### Data Format

```json
{
  "session_id": "20260325_191511",
  "task_type": "feature",
  "evidence_metrics": {
    "ac_total": 12,
    "ac_builder_pass": 11,
    "ac_verifier_pass": 10,
    "ac_builder_accuracy": 0.91,
    "fix_loops": 2,
    "fix_loop_details": [
      {"ac_id": "AC3", "iterations": 1, "root_cause": "hardcoded_hex"},
      {"ac_id": "AC7", "iterations": 1, "root_cause": "missing_forwardRef"}
    ],
    "visual_acs_total": 4,
    "visual_acs_pass": 3,
    "visual_acs_builder_accuracy": 0.75,
    "evidence_freshness_seconds": 120,
    "gap_density": 0.08
  }
}
```

### Evolution Rules
1. **Builder accuracy < 0.8 for 2+ sessions:** Add stricter self-check instructions to builder spawn prompt
2. **Visual AC accuracy < builder overall accuracy:** Builders overestimate visual correctness → add "take screenshot and compare to reference before claiming PASS"
3. **Same AC type fails 3+ sessions:** Systemic → add to critical-rules.md and quality gate scripts
4. **Fix loops averaging > 2:** Spec quality issue → tighten AC writing in Phase 4

---

## TACTIC 15: VERIFIER EFFECTIVENESS

### Purpose
Track whether fresh verification catches real issues vs creating false positives.

### Data Format

```json
{
  "session_id": "20260325_191511",
  "verifier_metrics": {
    "acs_verified": 12,
    "builder_pass_confirmed": 9,
    "builder_pass_rejected": 1,
    "builder_fail_confirmed": 1,
    "builder_unknown_resolved": 1,
    "false_positive_rate": 0.0,
    "unique_issues_found": 2,
    "verification_time_minutes": 8,
    "verification_depth_avg": 2.3
  }
}
```

### Evolution Rules
1. **False positive rate > 0.2:** Verifier prompt needs more project context → add critical-rules.md content
2. **unique_issues_found == 0 for 3+ sessions:** Verification may be rubber-stamping → increase adversarial pressure in verifier prompt
3. **Verification time trending UP:** Consider splitting into parallel verifiers per domain

---

## TACTIC 16: AC QUALITY ANALYSIS

### Purpose
Track which acceptance criteria templates produce useful signal vs noise.

### Data Format

```json
{
  "session_id": "20260325_191511",
  "ac_analysis": [
    {"ac_template": "GS-SCSS-TOKENS", "times_used": 5, "times_caught_real_issue": 3, "value": "high"},
    {"ac_template": "GS-VISUAL-*", "times_used": 12, "times_caught_real_issue": 4, "value": "high"},
    {"ac_template": "GS-USE-CLIENT", "times_used": 5, "times_caught_real_issue": 0, "value": "low"}
  ]
}
```

### Evolution Rules
1. **AC template value == "low" for 5+ sessions:** Remove from standard template or weaken to WARN
2. **AC template catches issues > 50% of uses:** Strengthen to hard gate in quality gate scripts
3. **New AC type discovered during fix loop:** Add to geekshop-ac-template.json

---

## Evolution Loading Checklist (Session Start)

```
□ Read metrics.jsonl → compute 5-session trends
□ Read prompt-scores.jsonl → load golden/latest prompts
□ Read role-effectiveness.jsonl → get optimal composition for task_type
□ Read debate-quality.jsonl → select debate strategy
□ Read plan-scores.jsonl → get required plan sections
□ Read failures.jsonl → apply all prevention rules
□ Read knowledge-graph.jsonl → extract relevant subgraph for task
□ Read phase-timing.jsonl → set time expectations
□ Read protocol-modifications.md → apply ADOPTED, test TESTING
□ Read owner-preferences.md → calibrate to owner
□ Read decision-log.jsonl → load relevant precedents
□ Check for expertise packs matching detected stack
□ Read evidence-quality.jsonl → track builder accuracy trends
□ Read verifier-metrics.jsonl → calibrate verifier prompt
□ Read ac-quality.jsonl → prune/strengthen AC templates
□ Log evolution state summary
```

Time: < 30 seconds. Impact: dramatic improvement in session quality.
