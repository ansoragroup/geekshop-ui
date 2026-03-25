# Problems: review-fixes-batch1

All 13 individual ACs (AC1-AC13) PASS. Three global quality gate criteria FAIL.

---

### AC-GATE-1: `npm run lint` exits 0 with 0 errors
- Status: FAIL
- Why it is not proven: `npm run lint` exits 1 with 97 errors and 233 warnings.
- Minimal reproduction steps: Run `npm run lint` from the repo root.
- Expected: Exit 0, 0 errors.
- Actual: Exit 1, 97 errors, 233 warnings.
- Affected files: Multiple files across the codebase (not isolated to review-fixes-batch1 changes). These appear to be pre-existing lint errors.
- Smallest safe fix: Either fix the 97 lint errors, or determine if they are pre-existing and out of scope for this task. If pre-existing, the spec's gate requirement was written against a codebase that already had these errors.
- Corrective hint: Run `npm run lint 2>&1 | grep "error " | head -20` to identify the most common error patterns. Most are likely fixable with `--fix` or are pre-existing issues unrelated to this batch.

---

### AC-GATE-2: `npm test` exits 0
- Status: FAIL
- Why it is not proven: `npm test` exits 1. 49 test files failed, 362 passed (4387 total tests: 183 failed, 4204 passed).
- Minimal reproduction steps: Run `npm test` from the repo root.
- Expected: Exit 0, all tests pass.
- Actual: Exit 1, 49 test files failed. Failures include Storybook chromium integration tests and unit tests (e.g., Modal component useCallback errors).
- Affected files: 49 test files across multiple components. These appear to be pre-existing failures unrelated to the 13 fixes.
- Smallest safe fix: Determine if failures are pre-existing. If so, the gate was written against an assumption that the test suite was green before these fixes. The TelegramLoginButton-specific tests (AC11) all pass.
- Corrective hint: Run `npm test 2>&1 | grep "FAIL" | head -20` to identify the failing test files. Many appear to be Storybook chromium-mode integration tests that may have infrastructure issues.

---

### AC-GATE-4: `bash scripts/scss-token-audit.sh` exits 0 on macOS
- Status: FAIL
- Why it is not proven: The script exits 1 due to 3 files with hardcoded hex values. One is in `src/components/commerce/PaymentMethodCard/PaymentMethodCard.module.scss` (6 violations: brand colors for Visa #1A1F71, Mastercard #EB001B, etc.). Two are in `src/pages/` (out of npm package scope).
- Minimal reproduction steps: Run `bash scripts/scss-token-audit.sh` from the repo root.
- Expected: Exit 0.
- Actual: Exit 1 with 3 violating files.
- Affected files: `src/components/commerce/PaymentMethodCard/PaymentMethodCard.module.scss`, `src/pages/DesktopLoginPage/DesktopLoginPage.module.scss`, `src/pages/ReviewsPage/ReviewsPage.module.scss`
- Smallest safe fix: For PaymentMethodCard, convert the 6 brand hex colors to CSS custom properties (e.g., `--gs-color-brand-visa: #1A1F71`) defined in tokens or in the component itself. Alternatively, add an allowlist mechanism to the audit script for third-party brand colors. For pages/ files, either fix them or exclude `src/pages/` from the audit scope (pages are not part of the npm package).
- Corrective hint: The PaymentMethodCard hex values are payment network brand colors that arguably should not use design tokens. Either add a `/* scss-audit-ignore */` comment mechanism to the script, or convert them to CSS custom properties for consistency.
