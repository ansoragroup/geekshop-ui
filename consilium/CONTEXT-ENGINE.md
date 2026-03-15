# Context Engine

## Philosophy

Claude doesn't learn — it reasons within context. The quality of its output is directly proportional to the quality of context it receives. This engine maximizes context quality.

Instead of trying to make Claude "remember," we build the perfect briefing for every session. An amnesia patient with a brilliant filing system beats a forgetful genius.

## Context Layers

Every consilium session constructs a layered context window:

```
Layer 1: PROTOCOL     (~3KB)  — How to orchestrate (ORCHESTRATION.md)
Layer 2: PROJECT      (~5KB)  — What this project is (knowledge-graph, conventions)
Layer 3: OWNER        (~2KB)  — Who we're building for (owner-preferences.md)
Layer 4: EVOLUTION    (~3KB)  — What we've learned (metrics trends, failures, patterns)
Layer 5: EXPERTISE    (~5KB)  — Best practices for this stack (expertise packs)
Layer 6: TASK         (~2KB)  — What we're building now (task + product context)
Layer 7: REFERENCES   (~3KB)  — How others solved similar problems (if available)
```

Total baseline: ~23KB. Leaves massive room for actual work within context window.

## Layer Details

### Layer 1: Protocol
Source: consilium/ORCHESTRATION.md
Always loaded. Defines the 9-phase protocol.
Pruning: after 10+ sessions, only load phases relevant to current task type.

### Layer 2: Project
Source: memory/knowledge-graph.jsonl + memory/project-conventions.md
Built incrementally through Phase 0 discoveries.
For teammates: inject only the subgraph relevant to their domain.
For lead: inject full graph.

Knowledge graph schema:
```json
{
  "entities": [
    {"name": "UserService", "type": "service", "path": "src/services/UserService.ts", "last_seen": "20260224"}
  ],
  "relationships": [
    {"from": "UserService", "to": "users_table", "type": "reads_from"}
  ],
  "annotations": [
    {"entity": "UserService", "note": "Has N+1 query on getUsersWithRoles()", "session": "20260224"}
  ]
}
```

Entity types: service, controller, model, table, component, page, middleware, config, migration, test, hook, utility, type/interface
Relationship types: depends_on, reads_from, writes_to, renders, extends, implements, imports, triggers, validates

### Layer 3: Owner
Source: memory/owner-preferences.md
Synthesized from owner-profile.jsonl every 3 sessions.
Injected into every spawn prompt as "OWNER CONTEXT" block.
On first session: empty. System uses balanced defaults.

### Layer 4: Evolution
Source: all memory/*.jsonl files
Lead computes at session start:
- Trend analysis (last 5 sessions of metrics.jsonl)
- Active prevention rules (from failures.jsonl)
- Golden/latest spawn prompts
- Debate strategy recommendation
- Plan template requirements
- Protocol modifications (ADOPTED + TESTING)

Injected into lead's context only. Teammates get the OUTPUT of evolution (modified spawn prompts, specific instructions) but not the raw data.

### Layer 5: Expertise
Source: memory/expertise/*.md
Auto-populated on first discovery of a stack.

When Phase 0 detects a stack (e.g., "Laravel + PostgreSQL + Docker"):
1. Check if memory/expertise/laravel.md exists
2. If not: the lead or a scout agent writes a concise best-practices document
   - Source: Claude's training knowledge (not web search)
   - Focus: production patterns, common pitfalls, performance tips
   - Length: 2-3 pages max
   - Updated when a pattern or antipattern is discovered during a session

Format:
```markdown
# Laravel Best Practices (auto-generated, session 20260224)

## Architecture
- Use service classes for business logic, controllers stay thin
- Repository pattern for complex queries, Eloquent direct for simple
- Form Requests for validation, never validate in controllers
- ...

## Testing
- Feature tests for API endpoints (HTTP tests)
- Unit tests for service classes
- Use DatabaseTransactions trait, not DatabaseMigrations
- ...

## Performance
- Eager load relationships (prevent N+1)
- Use chunk() for large datasets
- Cache config, routes, views in production
- ...

## Common Pitfalls
- Don't use env() outside config files (gets cached away)
- Queue workers need restart after deploy
- ...

## Updated Learnings
- [20260225] This project uses Spatie permissions — always check HasRoles trait
- [20260226] Redis used for cache + queue, separate databases (db=0 cache, db=1 queue)
```

### Layer 6: Task
Source: user's task description + Phase 0 product context
Always present. The actual thing we're building.

Enriched with:
- Product context (who uses this, why it matters)
- Related past tasks (from decision-log.jsonl)
- Known risks in affected areas (from knowledge-graph annotations)

### Layer 7: References
Source: memory/references/*.md
Optional. Populated when relevant patterns are discovered.

Not auto-generated — curated by the lead when a novel problem pattern is encountered.
If a task resembles a known pattern (e.g., "build a payment system"), the lead checks for references.
If none exist: proceed without. Don't waste time creating references mid-session.

## Context Budget Management

### For Lead
Full layers 1-7: ~23KB base + session artifacts
Lead has the most context and needs it for synthesis.

### For Teammates
Selective loading:
- Layer 1: their current phase instructions only (~1KB)
- Layer 2: their domain subgraph only (~2KB)
- Layer 3: owner preferences relevant to their role (~0.5KB)
- Layer 5: expertise for their domain only (~2KB)
- Layer 6: task description + product context (~1KB)
Total: ~6.5KB per teammate — extremely efficient

### Context Pruning Rules
1. Knowledge graph entries not seen in 10+ sessions: archive
2. Owner profile observations older than 20 sessions: archive
3. Expertise sections never referenced: trim
4. Convention entries violated 0 times in 10 sessions: archive
5. Failed patterns that no longer recur: move to archived-antipatterns

## Auto-Discovery Triggers

### New Stack Component
When Phase 0 or Phase 1 discovers a technology not in the expertise library:
→ Scout agent or lead creates a concise expertise doc
→ Saved to memory/expertise/{technology}.md

### New Convention
When Phase 1 discovers a pattern used consistently in the codebase:
→ Add to memory/project-conventions.md
→ Flag in orchestration log

### New Entity/Relationship
When any phase discovers a service, model, or component:
→ Add to memory/knowledge-graph.jsonl
→ Include annotations for known issues

### New Owner Signal
When the owner provides feedback, makes a decision, or shows a preference:
→ Append to memory/owner-profile.jsonl
→ Re-synthesize owner-preferences.md if 10+ new observations since last synthesis
