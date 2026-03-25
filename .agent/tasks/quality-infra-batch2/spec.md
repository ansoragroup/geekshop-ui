# Task Spec: quality-infra-batch2

## Metadata
- Task ID: `quality-infra-batch2`
- Created: 2026-03-25
- Repo root: `/Users/yishmael/Desktop/server/mine/geekshop.uz/design/component-library`
- Branch at freeze: `v5.1.0`

## Guidance sources read
- `CLAUDE.md` (project rules)
- `package.json` (scripts, devDependencies, exports field)
- `vite.config.ts` (current build + vitest config)
- `eslint.config.js` (current lint rules)
- `src/theme/tokens.scss` (design token source of truth)
- `src/theme/index.ts` (TS constants file, manually maintained)
- `.github/workflows/ci.yml` (current CI pipeline)
- `scripts/` directory listing (existing quality scripts)
- `.agent/tasks/quality-infra-batch2/spec.md` (prior stub)

## Original task statement

Fix all pre-existing quality issues in @ansoragroup/ui to get the project to a green CI state, then add infrastructure improvements.

Issues to fix:
1. Pre-existing lint errors (97 errors, 233 warnings) — broken `jsx-a11y` usages, React Compiler conflicts, TypeScript parse errors, and more
2. Pre-existing test failures (49 files, 183 failed tests out of 4387)
3. CSS code-splitting: `cssCodeSplit: false` → `true`
4. Coverage thresholds: raise from 50% global to per-category targets matching CLAUDE.md
5. Visual regression CI with Chromatic
6. Token sync script: SCSS → TS generation + CI verification

---

## Acceptance Criteria

### AC1 — Lint: zero errors
`npm run lint` exits with code 0 and reports **0 errors**.

Measured by: `npm run lint 2>&1 | tail -5` showing no error count line (or explicitly "0 errors").

Specific error classes that must be eliminated:

| Error type | Count | Fix strategy |
|---|---|---|
| `jsx-a11y/label-has-associated-control` | 23 | Every `<label>` must have a matching `htmlFor`+`id` pair on the input, or wrap the input as a child |
| TypeScript parsing errors (`',' expected`) | 9 | Fix the invalid TS syntax in the affected files |
| `jsx-a11y/anchor-is-valid` | 5 | Replace `href="#"` anchors that act as buttons with `<button>` elements |
| `jsx-a11y/no-redundant-roles` | 4 | Remove `role="list"` from `<ul>` elements |
| `jsx-a11y/click-events-have-key-events` | 3 | Add `onKeyDown` handlers (Enter + Space) to all clickable divs |
| `jsx-a11y/no-static-element-interactions` | 3 | Add proper `role` attribute (e.g., `role="button"`) alongside event handlers |
| React Compiler "Compilation Skipped" | 22 | Remove manual `useMemo`/`useCallback` calls that conflict with React Compiler; let the compiler handle them, or restructure so the compiler can optimize |
| setState in effect cascade | 3 | Restructure effects to avoid cascading setState calls that trigger re-renders |
| `jsx-a11y/no-autofocus` | 2 | Remove `autoFocus` prop; implement focus management programmatically if needed |
| Other assorted errors | ~23 | Fix individually per rule |

Constraint: fixing errors must not change runtime behavior. Lint fixes may not alter component visual output or public APIs.

### AC2 — Lint: storybook warnings resolved
`npm run lint` reports zero `storybook/no-redundant-story-name` warnings.

These are auto-fixable. Running `eslint --fix` on `*.stories.{ts,tsx}` files eliminates them.

`react-refresh/only-export-components` warnings in `src/pages/` are **intentionally left** as warnings (not errors). No action needed on them.

### AC3 — All unit tests pass
`npx vitest run --project unit` exits with code 0. Zero failing tests across all `src/**/*.test.{ts,tsx}` files.

Stale assertions after recent component changes must be updated to match current component output. Missing mocks must be properly set up. Tests may not be deleted or skipped to satisfy this criterion — every failure must be a genuine fix.

### AC4 — All Storybook tests pass
`npx vitest run --project storybook` exits with code 0. Zero failing Storybook play-function tests.

Chromium must be installed (`npx playwright install chromium`) before this can run locally.

### AC5 — Build succeeds with CSS code-splitting enabled
`npm run build:lib` exits with code 0 with `cssCodeSplit: true` in `vite.config.ts`.

Post-build verification:
- `dist/es/components/index.mjs` exists
- `dist/cjs/components/index.cjs` exists
- CSS output consists of **multiple `.css` files** (one per component module), not a single `ui.css` bundle
- The `"./styles"` export entry in `package.json` is updated to remain valid. Since there will no longer be a single `dist/es/ui.css`, one of:
  - The `"./styles"` entry is removed and the `sideEffects` field documents per-component CSS, OR
  - A compatibility shim file is generated (e.g., a root `dist/es/styles.css` that `@import`s all chunks), OR
  - The `package.json` exports map is updated to point to the new aggregated CSS path

  Assumption (narrow resolution): Remove the `"./styles"` entry from `package.json` exports and update `sideEffects` to `["**/*.css", "**/*.scss"]`. Existing consumers who imported `@ansoragroup/ui/styles` will need to import individual component CSS files or the bundler handles it automatically via `sideEffects`. Document this as a breaking change note in the spec.

- Tree-shaking still works: importing a single component does not force loading all CSS

### AC6 — Coverage thresholds raised
`vitest.config.ts` (or `vite.config.ts` `test.projects[unit].test.coverage.thresholds`) is updated to:

```
Global minimum (lines/functions/branches/statements): 70%
```

If per-file/per-category granular thresholds are supported by the vitest `v8` provider's `thresholds` config, additionally enforce:
- `src/hooks/**`: 95%
- `src/components/form/**`, `src/components/feedback/**`, `src/components/commerce/**`: 85%
- `src/components/data-display/**`, `src/components/content/**`, `src/components/navigation/**`, `src/components/product/**`: 60%
- `src/components/layout/**`: 40%

If per-path thresholds are not supported in the current vitest version, raise the global threshold to 70% and document the per-category targets as comments in the config. Do not lower any existing threshold.

`npx vitest run --project unit --coverage` exits with code 0 (no threshold violations).

### AC7 — Chromatic workflow file exists and is valid
`.github/workflows/chromatic.yml` is created with:
- Trigger: `push` to `main`, `feat/**`, `bugfix/**`; `pull_request` targeting `main`
- Uses `actions/checkout@v4`, `actions/setup-node@v4` (Node 22, npm cache)
- Runs `npm ci`
- Runs Chromatic using the official `chromaui/action` GitHub Action (latest stable major)
- References `CHROMATIC_PROJECT_TOKEN` from `${{ secrets.CHROMATIC_PROJECT_TOKEN }}` — never hardcoded
- Uploads Storybook as the target (uses `--storybook-build-dir` or builds inline)
- Job name: `chromatic`

A `.chromaticrc` (JSON or YAML) or inline Chromatic options must configure:
- `exitOnceUploaded: false` (default, but explicit is preferred)
- `onlyChanged: true` — only capture stories affected by the diff, to reduce snapshot count on PRs

The workflow file must be valid YAML (parseable). No `CHROMATIC_PROJECT_TOKEN` value appears in any committed file.

Documentation requirement: the spec itself (this file) records: "Add `CHROMATIC_PROJECT_TOKEN` as a secret in the GitHub repo settings at `https://github.com/ansoragroup/geekshop-ui/settings/secrets/actions` before the workflow will run successfully."

### AC8 — Token sync script created and wired into CI
`scripts/sync-tokens.ts` (or `scripts/sync-tokens.sh`) exists and when executed:
1. Reads `src/theme/tokens.scss` as the source of truth
2. Regenerates the `tokens` constant object in `src/theme/index.ts` — preserving the `setTheme`, `getTheme`, `setThemePreset`, `getThemePreset`, `THEME_PRESETS`, `ThemePreset`, `ALL_PRESET_PROPS` exports that exist below the `tokens` constant
3. Exits with code 0

`package.json` `scripts` includes `"sync-tokens": "tsx scripts/sync-tokens.ts"` (or the shell equivalent).

A CI check script `scripts/check-tokens-in-sync.sh` exists that:
1. Runs the sync script to a temp output
2. Diffs the temp output against `src/theme/index.ts`
3. Exits with code 1 and prints a message if they differ; exits 0 if identical

`.github/workflows/ci.yml` gains a new job `token-sync-check`:
- Runs `npm ci` then `npm run sync-tokens -- --check` (or `bash scripts/check-tokens-in-sync.sh`)
- Exits with code 1 if the generated output differs from the committed `src/theme/index.ts`
- Job placed in parallel with `lint` and `typecheck` (no dependency on `build`)

Assumption: `tsx` is available as an npx invocation (`npx tsx`) or added as a devDependency. If a shell script is chosen instead, no extra dependency is needed.

---

## Constraints

1. Do not change any component's visual appearance.
2. Do not change any component's public API (props interface, exported names).
3. Do not touch `.env.production`.
4. Lint fixes must be behavioral no-ops — they may restructure code but must not change what the component renders or how event handlers fire.
5. Test fixes must be genuine fixes — no `it.skip`, `xit`, `test.todo` substitutions, no deletion of test cases.
6. CSS code-splitting change must maintain backward compatibility for consumers who use tree-shaking via the ES module entry. Breaking the `./styles` single-file import is acceptable if documented (see AC5 assumption).
7. Do not lower any coverage threshold — only raise.
8. The `CHROMATIC_PROJECT_TOKEN` secret value must never appear in any committed file.
9. No changes to existing component APIs unless specified.

---

## Non-goals

- Adding new components.
- Refactoring component architecture (container queries, file structure, forwardRef patterns).
- Changing the build tool from Vite.
- Adding new lint rules beyond what is needed to reach 0 errors.
- Fixing `react-refresh/only-export-components` warnings in `src/pages/`.
- Configuring Chromatic auto-accept or baseline approval policies (out of scope).
- Writing a full design-token schema validator.
- No changes to existing component APIs unless specified.

---

## Assumptions recorded

| # | Assumption | Rationale |
|---|---|---|
| A1 | `cssCodeSplit: true` will produce per-module CSS files, not a single `ui.css`. The `./styles` export in `package.json` is removed and `sideEffects: ["**/*.css", "**/*.scss"]` covers auto-injection. | No alternative single-file path will exist after split. Documented as breaking for manual style importers. |
| A2 | React Compiler "Compilation Skipped" errors are produced by `eslint-plugin-react-hooks` v7's built-in React Compiler lint rule. Removing the conflicting `useMemo`/`useCallback` in affected files resolves them without needing compiler config changes. | eslint-plugin-react-hooks v7+ ships the React Compiler rule by default. |
| A3 | `tsx` (TypeScript execution) is available via `npx tsx` without adding a new devDependency. If not available, the sync script falls back to a shell+`node` implementation. | Standard in most TS projects; avoids adding another dep. |
| A4 | Per-path coverage thresholds (e.g., per `src/components/form/**`) are specified via vitest's `thresholds` config object with file glob keys if supported by vitest v4.1. If the vitest version does not support glob-key thresholds, global 70% is the fallback. | vitest v4.x supports per-file threshold via `thresholds` with glob keys according to docs. |
| A5 | Fixing the 9 TypeScript parsing errors requires correcting invalid TS syntax (e.g., generic type parameters written incorrectly), not changing `tsconfig` settings. | Parsing errors at lint time almost always indicate source-level syntax issues. |

---

## Verification plan

| Step | Command | Expected result |
|---|---|---|
| Lint errors | `npm run lint` | Exit 0, 0 errors reported |
| Storybook story name warnings | `npm run lint 2>&1 \| grep "no-redundant-story-name"` | No matches |
| Unit tests | `npx vitest run --project unit` | Exit 0, 0 failures |
| Storybook tests | `npx vitest run --project storybook` | Exit 0, 0 failures |
| Build | `npm run build:lib` | Exit 0 |
| CSS split | `ls dist/es/**/*.css 2>/dev/null \| wc -l` | More than 1 CSS file |
| No monolithic CSS | `test ! -f dist/es/ui.css` | Exit 0 (file absent) |
| Coverage thresholds | `npx vitest run --project unit --coverage` | Exit 0 (no threshold violations) |
| Chromatic workflow | `cat .github/workflows/chromatic.yml \| grep CHROMATIC_PROJECT_TOKEN` | Shows `secrets.CHROMATIC_PROJECT_TOKEN`, not a literal token |
| Token sync check | `bash scripts/check-tokens-in-sync.sh` | Exit 0 (tokens in sync) |
| Token sync script | `npm run sync-tokens && git diff --name-only src/theme/index.ts` | No diff (already in sync after running) |

All six checks must pass for the task to be considered complete.
