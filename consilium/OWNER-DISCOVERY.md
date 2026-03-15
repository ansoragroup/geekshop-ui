# Owner Discovery System

## Purpose

Consilium doesn't just learn the project — it learns the person directing it.
Not through questionnaires, but through observation. Every interaction is a signal.

## What Gets Observed

### Signal Category 1: Task Description Style
How the owner describes tasks reveals their mental model:
- **Terse technical**: "add JWT auth with refresh tokens" → engineer, knows what they want
- **Product-focused**: "users should stay logged in" → product thinker, cares about UX
- **Outcome-oriented**: "reduce churn by keeping sessions alive" → business-minded
- **Detailed spec**: multi-paragraph with acceptance criteria → structured, thorough
- **One-liner**: "fix the login thing" → trusts the team, delegates

Log pattern: `task_description_style` in owner-profile.jsonl

### Signal Category 2: Plan Approval Patterns (Level 1)
When the owner reviews Phase 4 plans:
- What they approve immediately vs what they push back on
- What they add that was missing
- What they remove as unnecessary
- Whether they care more about architecture or delivery speed

Log: `plan_feedback` events in owner-profile.jsonl

### Signal Category 3: Correction Patterns
When the owner corrects the output:
- "Too complex, simplify" → values simplicity
- "Add error handling" → values robustness
- "Ship it, we'll fix later" → values speed
- "Write tests first" → values quality
- "How much will this cost to run?" → cost-conscious
- "What does the user see?" → UX-focused

Log: `correction` events in owner-profile.jsonl

### Signal Category 4: Decision Patterns
Track every decision the owner makes:
- Buy vs build (chose managed Redis vs self-hosted)
- Speed vs quality (chose MVP vs full implementation)
- Simple vs scalable (chose SQLite vs PostgreSQL for prototype)
- Familiar vs optimal (chose Laravel because team knows it, not because it's best for this)

Log: `decision` events in decision-log.jsonl

### Signal Category 5: Stack & Tool Preferences
Inferred from project analysis and owner corrections:
- Languages, frameworks, databases
- Cloud provider, hosting approach
- CI/CD tooling
- Monitoring/observability
- Package management preferences

Log: `stack_preference` in owner-profile.jsonl

## Data Format

### owner-profile.jsonl (append-only)
```json
{"session_id":"20260224","type":"task_description_style","value":"terse_technical","evidence":"User said: 'add websocket support for real-time updates'","confidence":0.7}
{"session_id":"20260224","type":"correction","value":"prefers_simplicity","evidence":"User said: 'too many abstractions, just use a simple function'","confidence":0.9}
{"session_id":"20260224","type":"plan_feedback","value":"speed_over_architecture","evidence":"User approved quick implementation, rejected refactoring step","confidence":0.8}
{"session_id":"20260224","type":"stack_preference","value":"prefers_docker_compose","evidence":"Project uses docker-compose.yml, user rejected k8s suggestion","confidence":0.9}
{"session_id":"20260225","type":"decision","value":"build_over_buy","evidence":"User chose custom auth over Auth0, citing cost","confidence":0.85}
{"session_id":"20260225","type":"quality_bar","value":"tests_required","evidence":"User asked 'where are the tests?' on first delivery","confidence":0.95}
```

### decision-log.jsonl (append-only)
```json
{"session_id":"20260224","decision":"chose_postgresql_over_sqlite","context":"production database for CRM","reasoning":"needs concurrent access","owner_stated_reason":"we need proper transactions","alternatives_considered":["sqlite","mysql"],"outcome":"successful"}
{"session_id":"20260225","decision":"rejected_microservices","context":"API architecture","reasoning":"too complex for current stage","owner_stated_reason":"overkill, monolith is fine","alternatives_considered":["microservices","modular monolith"],"outcome":"n/a"}
```

## Synthesis: owner-preferences.md

Every 3 sessions (or when 10+ new observations accumulate), the lead synthesizes all signals into a human-readable preference model:

```markdown
# Owner Preference Model
Last updated: session 20260228 (synthesized from 15 observations across 5 sessions)

## Decision Style
- Prefers speed over perfection in early stages
- Switches to quality-focus when approaching production
- Makes decisions quickly, rarely revisits
- Trusts technical recommendations but always asks about cost

## Quality Bar
- Tests are expected for all features (stated explicitly in session 3)
- Error handling: expects happy path + top 3 error cases, not exhaustive
- Documentation: minimal, prefers self-documenting code
- "Done" means: works in production with basic monitoring

## Architecture Preferences
- Monolith-first, extract services only when proven necessary
- Docker Compose for local dev, simple deployment
- Avoids vendor lock-in where cost difference is small
- Prefers boring technology over cutting-edge

## Communication Style
- Terse task descriptions — fill in the gaps intelligently
- Dislikes over-explaining, prefers showing working code
- Responds well to: "I did X because Y" not "Would you like me to X?"
- Correction style: direct, no sugarcoating needed

## Cost Sensitivity
- Willing to pay for: databases, monitoring, CI/CD
- Avoids: per-seat SaaS, expensive managed services
- Self-hosting preference when ops burden is low
- Asks about cloud costs before choosing infrastructure

## Priorities (ranked by observed frequency)
1. Working software (ships and runs)
2. Simplicity (minimal abstractions)
3. Cost efficiency (not cheap, but conscious)
4. Test coverage (safety net, not ceremony)
5. Performance (when it matters, not premature)
```

## How Preferences Are Used

1. **Spawn prompts**: Owner preferences are injected into every teammate's context
   ```
   OWNER CONTEXT:
   - Prefers simple solutions, dislikes over-engineering
   - Tests expected for all features
   - Cost-conscious: prefer self-hosted over managed when ops burden is low
   - "Done" = works in production with monitoring
   ```

2. **Plan generation**: Phase 4 plans calibrate to owner's quality bar
   - If owner values speed: fewer abstraction layers, pragmatic shortcuts
   - If owner values quality: more review cycles, comprehensive tests

3. **Debate calibration**: Phase 3 debates weight owner's priorities
   - If owner is cost-conscious: cost analysis becomes a required debate point
   - If owner values simplicity: complexity must be justified

4. **Output format**: Final delivery matches owner's communication style
   - Terse owner → short summaries, just the diff
   - Detailed owner → comprehensive reports with rationale

## Bootstrap (First Session)

On the very first session, the system has zero owner data. It uses these defaults:
- Balanced speed/quality
- Standard quality gates (lint + test)
- Full phase protocol (no shortcuts)
- Verbose output (will calibrate down if owner prefers terse)
- Ask for plan approval (Level 1)

The first 3 sessions are the calibration period. After that, the system should have enough data to predict owner preferences with ~80% accuracy.

## Privacy Note

All owner data stays in the project's memory/ directory. It never leaves the local filesystem. If the owner wants to reset: `rm memory/owner-profile.jsonl memory/owner-preferences.md memory/decision-log.jsonl`
