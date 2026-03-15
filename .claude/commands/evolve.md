Run a manual evolution review of the consilium system.

$ARGUMENTS

## Instructions

This command triggers a standalone evolution analysis outside of a normal session.
Useful for periodic maintenance or when you want to see the system's self-assessment.

1. Read ALL memory files:
   - metrics.jsonl → compute trends
   - prompt-scores.jsonl → identify underperforming roles
   - role-effectiveness.jsonl → check for merge/split candidates
   - debate-quality.jsonl → evaluate debate strategies
   - plan-scores.jsonl → check plan template
   - failures.jsonl → identify patterns
   - knowledge-graph.jsonl → check for stale entities
   - phase-timing.jsonl → compute optimal distributions
   - protocol-modifications.md → check status transitions
   - owner-profile.jsonl → synthesize if needed
   - decision-log.jsonl → review decision outcomes

2. Produce a comprehensive evolution report:
   - Session count and trajectory
   - Top 3 things working well (with evidence)
   - Top 3 things to improve (with evidence)
   - Spawn prompt health per role
   - Owner model completeness
   - Knowledge graph coverage
   - Protocol modification status
   - Recommended actions

3. If arguments include "apply": execute recommended changes automatically.
   Otherwise: report only, don't modify.

4. Write report to /tmp/consilium/evolution-report-{date}.md
