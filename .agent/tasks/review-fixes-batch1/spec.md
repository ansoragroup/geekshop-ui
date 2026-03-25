# Spec: review-fixes-batch1

## Task Statement

Fix all critical and medium issues found in a comprehensive technical review of @ansoragroup/ui component library. Issues span broken quality gates, DX tooling gaps, a token mismatch, a missing dark mode preset, a security validation gap, policy-violating image URLs, and an unpatched npm vulnerability.

---

## Scope

13 discrete fixes. No new primitive components, no visual redesign, no existing API changes.

---

## Acceptance Criteria

### AC1 — scss-token-audit.sh: macOS-compatible hex regex

**File:** `scripts/scss-token-audit.sh`

The grep pattern `{3,8}` uses ERE interval syntax that BSD grep on macOS silently ignores (treating the braces as literals), causing the script to pass vacuously on macOS. The fix must make the hex-length constraint work on both BSD grep (macOS) and GNU grep (Linux).

Accepted approaches (either):
- Replace the ERE interval with a portable BRE quantifier (`\{3,8\}`) used via `grep -E` with compatible syntax, OR
- Switch to `grep -P` (PCRE) where available with a fallback, OR
- Rewrite the hex match without interval quantifiers using explicit optional groups.

**Assumption:** ripgrep (`rg`) is not guaranteed to be present in CI. The fix must work with only POSIX tools, or detect and prefer `rg`/`ggrep` when present.

**Verification:**
- On macOS: `bash scripts/scss-token-audit.sh <file>` returns exit 1 when the file contains a bare `color: #FF5000` in a color property, and returns exit 0 when all colors use `var(--gs-*)`.
- Script produces identical results on a Linux runner (GNU grep environment).

---

### AC2 — verify-barrel-exports.sh: full audit, not diff-only

**File:** `scripts/verify-barrel-exports.sh`

When `git diff HEAD` produces no output (clean branch, CI on main), `COMPONENTS` is empty and the script exits PASS without checking anything. The script must audit ALL component folders against `src/components/index.ts` when called with no arguments.

**Fix:** When no arguments are passed, enumerate every component folder under `src/components/` (one level of subdirectory per category) and check each against the barrel. The diff-based fast-path may be kept as an opt-in flag (e.g., `--changed-only`) but must NOT be the default no-argument behavior.

**Verification:**
- Running `bash scripts/verify-barrel-exports.sh` on the current repo (clean branch) outputs at least one `OK:` line per exported component and does not immediately print "PASS (nothing to check)".
- If a component folder is manually created without a barrel entry, the script exits 1 and names the missing component.

---

### AC3 — Token mismatch: $color-bg-page reconciled

**Files:** `src/theme/tokens.scss` (line 32), `src/theme/index.ts` (line 24)

Current state:
- `tokens.scss`: `$color-bg-page: #FFFFFF;`
- `index.ts`: `bgPage: '#F5F5F5'`

The canonical correct value is `#F5F5F5` (light grey page background). Update `tokens.scss` to `$color-bg-page: #F5F5F5;`.

**Assumption:** `#F5F5F5` is correct because `index.ts` mirrors what Storybook and runtime consumers use. The SCSS variable was wrong. Changing `tokens.scss` may visually affect page backgrounds; that is an intentional correction.

**Verification:**
- `grep 'color-bg-page' src/theme/tokens.scss` outputs a line containing `#F5F5F5`.
- `grep 'bgPage' src/theme/index.ts` outputs a line containing `#F5F5F5`.
- Both values match.

---

### AC4 — Prettier config added

**File:** `.prettierrc` (new, project root)

Add a Prettier config compatible with the existing ESLint setup. Must not conflict with `@typescript-eslint` or `eslint-plugin-react` rules already in use.

Required settings:
```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2,
  "jsxSingleQuote": false
}
```

**Verification:**
- `.prettierrc` exists at repo root and is valid JSON.
- `npm run lint` exits 0 after adding the file.

---

### AC5 — Husky + lint-staged pre-commit hook

**Files:** `.husky/pre-commit` (new), `package.json` (lint-staged config), devDependencies updated.

Pre-commit hook must run:
1. `eslint --fix` on staged `.ts`/`.tsx` files.
2. `prettier --write` on staged `.ts`/`.tsx`/`.scss` files.

**Constraint:** Hook must respect `HUSKY=0` environment variable so CI environments that skip Husky are not broken.

**Verification:**
- `cat .husky/pre-commit` shows a `lint-staged` invocation.
- `package.json` contains a `"lint-staged"` key with globs for `.ts`, `.tsx`, `.scss`.
- `husky` and `lint-staged` appear in `devDependencies`.
- `npm run lint` exits 0.
- `npm test` exits 0.

---

### AC6 — .nvmrc with Node 22

**File:** `.nvmrc` (new, project root)

**Verification:**
- `cat .nvmrc` outputs `22` (or `lts/jod` which resolves to Node 22).

---

### AC7 — SECURITY.md added

**File:** `SECURITY.md` (new, project root)

Must include:
- Supported versions table (current major).
- Instructions to report a vulnerability privately via GitHub private advisory: `https://github.com/ansoragroup/geekshop-ui/security/advisories/new`.
- Expected response timeline: acknowledge within 72 hours, fix within 30 days for critical.
- Statement that public disclosure is coordinated after a fix is released.

**Verification:**
- `SECURITY.md` exists and contains `security/advisories`.

---

### AC8 — CHANGELOG.md bootstrapped

**File:** `CHANGELOG.md` (new, project root)

Must use the Changesets output format so `npx changeset version` can append to it automatically. Minimum content: a header comment explaining that Changesets manages this file, plus an empty initial section.

**Verification:**
- `CHANGELOG.md` exists at repo root.
- File begins with `# @geekshop/ui` (Changesets convention matching the package name in `package.json`).

---

### AC9 — CONTRIBUTING.md: corrected testing section

**File:** `CONTRIBUTING.md`

Line 138 currently reads:
> Tests run via Vitest with Playwright browser mode.

This is incorrect. Tests use Vitest with `jsdom` environment. Playwright is only used for optional visual QA via Storybook MCP, not as part of `npm test`.

**Fix:** Replace the testing section description so it accurately states:
- Vitest + @testing-library/react with jsdom environment.
- `npm test` to run all unit/integration tests.
- Playwright MCP used separately for visual QA in Storybook (not part of `npm test`).

**Verification:**
- `grep 'Playwright browser mode' CONTRIBUTING.md` returns no matches.
- `grep 'jsdom' CONTRIBUTING.md` returns at least one match in the testing section.

---

### AC10 — Dark mode preset added

**Files:** `src/theme/presets.ts`, `src/theme/global.scss`

Add a `'dark'` entry to `THEME_PRESETS` and extend the `ThemePreset` union type.

**Updated union:** `'default' | 'teal' | 'red' | 'yellow' | 'green' | 'monochrome' | 'dark'`

**Dark preset colors:**
```ts
dark: {
  name: 'dark',
  label: 'Dark Mode',
  colors: {
    primary: '#FF6A1F',
    primaryLight: '#FF8C4D',
    primaryDark: '#E64800',
    primaryBg: '#2A1500',
    primaryGradient: 'linear-gradient(135deg, #FF6A1F 0%, #FF8C4D 100%)',
    primaryGradientHeader: 'linear-gradient(180deg, #FF6A1F 0%, #FF8C4D 50%, #FFB088 100%)',
    price: '#FF6B6B',
    priceDark: '#E55A5A',
    sale: '#FF6B6B',
    error: '#FF6B6B',
    success: '#2DD4A8',
    successLight: '#0A2E23',
    warning: '#FFB347',
    warningLight: '#2E1F00',
    info: '#4DA6FF',
    textLink: '#FF6A1F',
  },
}
```

**Dark surface overrides** must be added to `src/theme/global.scss` under a `[data-theme="dark"]` selector:

```scss
[data-theme="dark"] {
  --gs-color-bg-page: #0F0F0F;
  --gs-color-bg-card: #1A1A1A;
  --gs-color-bg-skeleton: #2A2A2A;
  --gs-color-text-primary: #F5F5F5;
  --gs-color-text-secondary: #AAAAAA;
  --gs-color-text-tertiary: #666666;
  --gs-color-text-placeholder: #555555;
  --gs-color-border: #2A2A2A;
  --gs-color-border-light: #222222;
  --gs-color-divider: #222222;
  --gs-color-bg-overlay: rgba(0, 0, 0, 0.75);
}
```

**Assumption:** `setThemePreset()` iterates `THEME_PRESETS` keys dynamically; no hardcoded switch on preset names exists. If a switch does exist, it must be updated to include `'dark'`.

**Verification:**
- `grep "'dark'" src/theme/presets.ts` finds the dark entry.
- `grep 'data-theme="dark"' src/theme/global.scss` finds the selector block.
- `npm run build:lib` exits 0 with no TypeScript errors.
- `npm test` exits 0.

---

### AC11 — TelegramLoginButton: botUsername input validation

**Files:** `src/components/form/TelegramLoginButton/TelegramLoginButton.tsx`, `src/components/form/DesktopTelegramLoginButton/DesktopTelegramLoginButton.tsx`, `src/components/form/TelegramLoginButton/TelegramLoginButton.test.tsx`

The `botUsername` prop is used directly in DOM construction (script `data-telegram-login` attribute and URL string interpolation) without validation. An invalid value could inject unexpected content.

**Fix:** Validate `botUsername` against `/^[a-zA-Z0-9_]{5,32}$/` before use. If validation fails:
- Log `console.error` with a descriptive message (development-friendly).
- Return `null` from the component (render nothing — safer than rendering with an unvalidated string).

Apply the same validation to `DesktopTelegramLoginButton`.

**Verification:**
- `TelegramLoginButton.test.tsx` contains a test: given `botUsername="<script>"`, the component renders nothing (null).
- `TelegramLoginButton.test.tsx` contains a test: given `botUsername="GeekShopBot"` (valid, 10 chars, alphanumeric), the component renders normally.
- `npm test` exits 0.

---

### AC12 — Replace picsum.photos URLs in component story files

**Scope:** All `.stories.tsx` files under `src/components/` only (not `src/pages/` — deferred).

**Rule (CLAUDE.md):** Do not use `picsum.photos` or `placehold.co`. Use Unsplash verified URLs.

**Replacement pattern:**
```
https://images.unsplash.com/photo-{PHOTO_ID}?w={WIDTH}&h={HEIGHT}&fit=crop&auto=format
```

Each replaced URL must use a contextually appropriate, distinct Unsplash photo ID. No two story slots in the same file may use the same photo ID.

**Verification:**
- `grep -r 'picsum\.photos' src/components/` returns no matches.
- `npm run lint` exits 0.
- `npm run build:lib` exits 0.

---

### AC13 — npm audit fix for flatted prototype pollution

**Action:** Run `npm audit fix`. Do not use `--force` unless required AND no component APIs change as a result.

**Verification:**
- `npm audit` reports 0 critical or high severity vulnerabilities in production dependencies.
- Acceptable residual: dev-only vulnerabilities that are not exploitable in library consumers.
- `npm test` exits 0 after the fix.
- `npm run build:lib` exits 0 after the fix.

---

## Global Quality Gate

All of the following must pass together after all 13 fixes are applied:

- **AC-GATE-1:** `npm run lint` exits 0 with 0 errors.
- **AC-GATE-2:** `npm test` exits 0.
- **AC-GATE-3:** `npm run build:lib` exits 0.
- **AC-GATE-4:** `bash scripts/scss-token-audit.sh` exits 0 on macOS.
- **AC-GATE-5:** `bash scripts/verify-barrel-exports.sh` exits 0 and audits all component folders (not diff-only).

---

## Constraints

- Do NOT change any component's visual appearance.
- Do NOT restructure component folders.
- Do NOT modify existing component prop interfaces (adding `'dark'` to `ThemePreset` is additive and permitted).
- Do NOT touch `.env.production`.
- Dark mode preset must be compatible with the existing `setThemePreset()`/`getThemePreset()` API; no callers of existing preset names may break.
- Quality gate scripts must work on macOS (BSD tools) and Linux (GNU tools) without requiring third-party tools.
- Husky pre-commit hooks must not break `npm install` in CI when `HUSKY=0` is set.

---

## Non-Goals

- Adding new primitive components (Table, Slider, etc.) — separate task.
- CSS code-splitting — separate task.
- Cleaning up 95 inline styles — separate task.
- Adding 73 missing Desktop component tests — separate task.
- Headless/unstyled option — separate task.
- Visual regression CI — separate task.
- Replacing `picsum.photos` in `src/pages/` — deferred (pages are not part of the npm package).
- Full dark mode SCSS audit across all component files — deferred; AC10 covers only the global CSS custom property overrides.
- No changes to existing component APIs unless specified above.

---

## Assumptions

1. `$color-bg-page` canonical value is `#F5F5F5`. The SCSS file (`tokens.scss`) was wrong; `index.ts` was correct.
2. `setThemePreset()` reads from `THEME_PRESETS` keys dynamically with no hardcoded preset name switch. If a switch exists, updating it is in scope for AC10.
3. `DesktopTelegramLoginButton` uses the same `botUsername` prop path as the mobile version and requires the same AC11 validation.
4. Unsplash URLs used in AC12 are publicly accessible CDN URLs (no auth required with standard query params).
5. Husky 9.x is used; `.husky/pre-commit` is a plain shell script (no `.husky/_/husky.sh` shim needed).
6. `npm audit fix` for `flatted` does not require `--force` and will not bump any direct dependency to a breaking version.

---

## Verification Plan

| AC | Verification command | Expected outcome |
|----|---------------------|-----------------|
| AC1 | `echo 'color: #FF5000' > /tmp/test.module.scss && bash scripts/scss-token-audit.sh /tmp/test.module.scss` | Exit 1, violation listed |
| AC2 | `bash scripts/verify-barrel-exports.sh` on clean branch | Lists OK:/MISSING: for all component folders |
| AC3 | `grep 'color-bg-page' src/theme/tokens.scss` | `$color-bg-page: #F5F5F5;` |
| AC4 | `cat .prettierrc` | Valid JSON with required keys |
| AC5 | `cat .husky/pre-commit` | Contains `lint-staged` invocation |
| AC6 | `cat .nvmrc` | `22` |
| AC7 | `grep 'advisories' SECURITY.md` | Match found |
| AC8 | `head -1 CHANGELOG.md` | `# @geekshop/ui` |
| AC9 | `grep 'Playwright browser mode' CONTRIBUTING.md` | No matches |
| AC10 | `grep 'dark' src/theme/presets.ts` + `grep 'data-theme' src/theme/global.scss` | Both present |
| AC11 | `npm test -- TelegramLoginButton` | Invalid + valid username tests pass |
| AC12 | `grep -r 'picsum\.photos' src/components/` | No matches |
| AC13 | `npm audit` | 0 critical/high in production deps |
| GATE | `npm run lint && npm test && npm run build:lib` | All exit 0 |
