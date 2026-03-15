# Antipatterns (What Doesn't Work)
<!-- Failed approaches. Avoid in future sessions. Auto-maintained by Phase 8. -->

## Session 20260315 — Bootstrap Audit

1. **Writing hooks without wiring them into components.** useControllableState and useCountdown exist but are used by 0 components. The hook becomes dead code and the components implement ad-hoc solutions instead.

2. **Documenting conventions without lint enforcement.** "Named exports only" and "use useControllableState" are in CLAUDE.md but there's no ESLint rule to enforce them. 4 default-export violations and 0 useControllableState usage resulted.

3. **Single rollup output object with multiple formats.** Using `formats: ['es', 'cjs']` in a single output config produces chunked files instead of preserveModules tree. Must use an array of output configs.

4. **CI pipeline without test job.** Lint, typecheck, and build all pass while 772 tests go unexecuted. False confidence.

5. **Magic numbers in component styles.** Loading component uses hardcoded width percentages ('80%', '60%', etc.) as inline styles. Should use design tokens or semantic constants.
