# Learnings
<!-- Accumulated insights from consilium sessions. Auto-appended by Phase 8. -->

## Session 20260315 — Bootstrap Audit

1. **Build output verification is critical.** The vite.config.ts had preserveModules configured but the actual dist/ output was chunked (ui.js, ui2-ui114). The package.json exports pointed to non-existent paths. Always verify build output matches package.json exports.

2. **CLAUDE.md drifts from source of truth.** Token values, names, and scales documented in CLAUDE.md differed from actual tokens.scss. The source file is authoritative; documentation must be periodically synced.

3. **Convention rules without lint enforcement get violated.** "Named exports only" was documented but 4 components had default exports. "Use useControllableState" was documented but 0 components used it. Rules need automated enforcement.

4. **CI pipeline gaps are invisible until audited.** 772 tests existed but CI never ran them. The pipeline passed on every commit without testing a single assertion.

5. **Hook utilization gap.** useControllableState and useCountdown were built but never adopted by components. Hooks should be wired into components at creation time, not deferred.
