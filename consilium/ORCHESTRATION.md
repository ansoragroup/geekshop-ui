# Consilium v2: Full Orchestration Protocol

## Overview

9-phase protocol. Self-evolving. Universal (any stack, any project, any owner).
The lead orchestrator reads this file at session start and follows it exactly.

---

## Phase 0: CONTEXT & DISCOVERY

### Purpose
Understand the project, the task, and the owner before doing any engineering.
This phase exists because engineering without context produces technically correct but strategically wrong solutions.

### First-Time Discovery (sessions 1-3)

Spawn a temporary `scout` agent:
```
You are the SCOUT on a consilium team. Your job is rapid project discovery.
Read the entire project at surface level. Produce:

1. PROJECT PROFILE:
   - Stack: languages, frameworks, databases, infra
   - Architecture pattern: monolith/microservices/serverless/etc
   - Build system: how to build, test, lint, deploy
   - Key directories: what lives where
   - Dependencies: major libraries and their versions
   - State: greenfield / active development / maintenance / legacy

2. PRODUCT CONTEXT (infer from code, README, comments, config):
   - What does this software do? Who uses it?
   - What's the business model? (if detectable)
   - What are the key user flows?
   - What's the data model?

3. CONVENTIONS:
   - Naming patterns (files, variables, classes)
   - Code organization pattern (MVC, DDD, FSD, etc)
   - Testing approach (unit/integration/e2e, framework)
   - Error handling pattern
   - Logging pattern
   - API style (REST/GraphQL/RPC, versioning)

Write all findings to: /tmp/consilium/current/phase0/
```

### Returning Discovery (session 4+)

Skip full discovery. Instead:
```
1. Load memory/knowledge-graph.jsonl → existing project model
2. Check: does the current task touch domains NOT in the knowledge graph?
   - YES: spawn scout for targeted discovery of new domain only
   - NO: proceed with existing knowledge
3. Load memory/owner-preferences.md → owner model
4. Quick scan: has the project changed significantly since last session?
   - Check git log since last session timestamp
   - If major changes: flag for team awareness
```

### Product Thinking Sub-Phase

For feature tasks (not bugfixes or refactors), inject product context into spawn prompts:
```
PRODUCT CONTEXT FOR THIS TASK:
- User impact: {who is affected and how}
- Success metric: {how do we know this worked — inferred from task description}
- Alternatives considered: {what could we build instead — devil's advocate perspective}
- Scope boundary: {what is explicitly NOT part of this task}
```

If the lead can't infer product context from the task description, and this is session 1-3, ask the owner ONE focused question:
"What does success look like for this? (e.g., users can X, system handles Y, metric Z improves)"

After session 3: infer from owner-preferences.md. Don't ask.

---

## Phase 1: INVESTIGATE

### Who
All domain specialists, in parallel, independently.

### What
Each reads their domain directories deeply. NO code changes.

### Output
`/tmp/consilium/current/phase1/{role}-findings.md` containing:
- Architecture of this domain (how code is organized)
- Patterns in use (naming, structure, error handling)
- Technical debt spotted
- Risks related to the task
- Coupling points with other domains
- How this domain relates to the current task
- Specific files that will need to change

### Gate
ALL teammates report "Phase 1 complete." No exceptions.

### Time Budget
Based on memory/phase-timing.jsonl, or default 15-20% of session.

---

## Phase 2: CROSS-POLLINATE

### Who
All specialists, in parallel.

### What
Each reads ALL Phase 1 findings (not just their own).

### Output
`/tmp/consilium/current/phase2/{role}-cross-analysis.md` containing:
- Integration points discovered
- Conflicts between domains
- Revised risk assessment
- Questions for other teammates
- Suggested API contracts between domains

### Skip Conditions
Check memory/protocol-modifications.md for adopted skip rules. Default skips:
- task_type == "bugfix" AND estimated_files < 5
- task_type == "refactor" AND single_domain == true

### Gate
ALL teammates report complete.

---

## Phase 3: DEBATE

### Purpose
The most valuable phase. This is where bad ideas die before they become bad code.

### Strategy Selection
Lead checks memory/debate-quality.jsonl for best-performing strategy per task_type.
If no data: use Adversarial (default).

Strategies:
1. **Adversarial**: each tries to break others' proposals
2. **Red/Blue Team**: half proposes, half attacks
3. **Rotating Devil's Advocate**: one assigned opposer per round
4. **Convergent**: start broad, narrow each round
5. **Dialectic**: thesis → antithesis → synthesis

### Execution
Round 1: Each writes `{role}-proposal.md` with:
- Proposed approach
- Tradeoffs (what we gain, what we lose)
- Risk assessment
- Alternative they considered and rejected (and why)

Round 2+: Each messages EVERY other teammate with strongest objection.
Receive objections → defend with evidence or concede with revised proposal.

### Quality Enforcement
Lead monitors for:
- Shallow agreement ("sounds good!") → inject: "What's the strongest argument AGAINST this?"
- Missing tradeoffs → inject: "You proposed X but didn't mention the cost/complexity/risk"
- Groupthink → inject: "Everyone agrees on X. What if X is wrong? What's plan B?"

### Output
`{role}-final-position.md` with post-debate stance.

### Minimum Rounds
3 for features, 2 for bugfixes, 4 for architecture decisions.

### Gate
ALL teammates report final position. Lead verifies substantive debate occurred.

---

## Phase 4: CONSILIUM PLAN

### Who
Lead only. Synthesizes everything.

### Output
`/tmp/consilium/current/phase4/PLAN.md` containing:

**Required sections** (from memory/plan-scores.jsonl, or defaults):
- Decision summary with debate rationale
- Task decomposition with owner + files owned (exclusive)
- Dependency graph (what blocks what)
- Verification criteria per task
- Risk register with mitigations

**Conditionally required** (if marked REQUIRED by plan evolution):
- Integration contracts (API interfaces between domains)
- Rollback strategy
- Performance budget
- Security considerations

**Optional** (include if relevant):
- Migration plan
- Feature flag strategy
- Monitoring/alerting additions

### Approval
Broadcast plan to team. Each responds: APPROVE or OBJECT (with specific alternative).
Max 2 revision rounds, then lead decides.

At Level 1: pause for human approval. Log their feedback in owner-profile.jsonl.
At Level 2+: proceed after team approval.

---

## Phase 5: IMPLEMENT

### Rules
- Each teammate implements their assigned tasks from the plan
- **Strict file boundaries**: touching unowned files = violation logged in failures.jsonl
- Must write tests for every change
- Must follow conventions from Phase 1 findings and memory/project-conventions.md
- Quality gate hook runs on task completion

### Quality Gate
On task completion, hooks/task-completed.sh runs:
- Lint check (language-appropriate)
- Type check (if applicable)
- Test suite (related tests)

If gate fails: teammate MUST fix before marking complete.
If gate fails 3x: escalate per self-healing protocol.

### Gate
ALL teammates report implementation complete, all quality gates passed.

---

## Phase 6: CROSS-REVIEW

### Rotation
Each reviews the next teammate's code (circular):
architect → backend → frontend → data → infra → core → architect

### Output
`{reviewer}-review-of-{reviewee}.md` containing:
- Issues found: CRITICAL / WARNING / SUGGESTION
- Convention compliance
- Test coverage assessment
- Security concerns
- Performance concerns
- Edge cases missed

### Rules
- CRITICAL issues MUST be fixed before Phase 7
- WARNING issues SHOULD be fixed, reviewer decides
- SUGGESTION issues are optional improvements

### Gate
ALL reviews complete. ALL critical issues resolved.

---

## Phase 7: INTEGRATION

### Who
Architect teammate (or most senior role).

### Steps
1. Run full test suite
2. Run lint + type checks
3. Verify all Phase 6 critical issues resolved
4. Check for file boundary violations
5. Check for merge conflicts
6. Run build (if applicable)
7. Smoke test key flows (if possible)

### Output
`integration-report.md` with pass/fail per check.

### Failure Handling
If failures: lead assigns fixes to responsible teammate.
Re-run integration after fixes.
If integration fails 3x: log as systemic failure, escalate.

### Gate
ALL checks pass. Integration report is green.

---

## Phase 8: RETROSPECTIVE & EVOLUTION

### Part 1: Retrospective
Lead writes `retrospective.md`:
- What approaches survived debate and why
- Where estimates were wrong
- What conventions were discovered or violated
- What should change for next session

### Part 2: Evolution (MANDATORY)
Execute ALL applicable evolution tactics from consilium/EVOLUTION.md:

```
8a. Compute metrics → memory/metrics.jsonl
8b. Score spawn prompts → memory/prompt-scores.jsonl
    IF score < 3: modify memory/spawn-prompts/{role}-latest.md
    IF score == 5: save memory/spawn-prompts/{role}-golden.md
8c. Track role effectiveness → memory/role-effectiveness.jsonl
8d. Score debate quality → memory/debate-quality.jsonl
8e. Score plan quality → memory/plan-scores.jsonl
8f. Log failures → memory/failures.jsonl
8g. Update knowledge graph → memory/knowledge-graph.jsonl
8h. Phase timing analysis → memory/phase-timing.jsonl
8i. Protocol review → memory/protocol-modifications.md
8j. CLAUDE.md refinement (if needed)
8k. Owner profile update → memory/owner-profile.jsonl
8l. Synthesize owner preferences (every 3 sessions) → memory/owner-preferences.md
8m. Decision log → memory/decision-log.jsonl
```

### Part 3: Memory Maintenance
- Update memory/learnings.md, patterns.md, antipatterns.md, project-conventions.md
- If this is session 5, 10, 15, etc: run cleanup
  - Archive unused conventions
  - Compact knowledge graph (merge duplicate entities)
  - Review protocol-modifications.md status transitions

### Gate
All evolution files written. Session logged.

---

## Communication Protocol

### Lead → Teammate
- Phase transitions: broadcast to all
- Task assignments: direct to assigned teammate
- Challenges/injections: direct to specific teammate
- Status checks: direct to non-responsive teammate

### Teammate → Lead
- Phase completion: "Phase {N} complete."
- Blockers: "BLOCKED: {description}"
- Questions: "QUESTION for {other-role}: {question}"

### Teammate → Teammate
- Phase 3 (debate): direct messages with objections
- Phase 6 (review): direct messages with review findings
- All other phases: via lead only

### Lead → Human (Level 1 only)
- Phase 4: "Here's the plan. Approve to proceed."
- Completion: "Task complete. Here's the summary."

---

## Emergency Procedures

### Token Budget Exhaustion
1. Current phase lead creates checkpoint file
2. Write RESUME.md with: current phase, completed phases, pending tasks, all artifact paths
3. Log partial session metrics
4. Next session reads RESUME.md and continues

### All Teammates Stuck
1. Lead reads all blocker messages
2. Identifies common root cause
3. If architectural: spawn fresh architect with focused prompt
4. If knowledge gap: spawn scout for targeted investigation
5. Log as systemic failure

### Owner Overrides
If owner intervenes at any point:
1. STOP current phase immediately
2. Log the intervention in owner-profile.jsonl (valuable preference signal)
3. Incorporate owner's direction
4. Resume from appropriate phase
