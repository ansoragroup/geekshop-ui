# @geekshop/ui

## 0.5.1

### Minor Changes

- **Headless hooks architecture**: 8 new behavior-only hooks (`useAccordion`, `useDialog`, `useSlider`, `useSelect`, `useTooltip`, `useTabs`, `useMenu`, `usePopover`) exported via `@ansoragroup/ui/headless`. Tabs, Dialog, and Popover refactored to use headless hooks internally.
- **New primitive components**: `DataTable`, `Slider`, `TreeView`, `TimePicker` with mobile + desktop variants (8 components total).
- **Dark mode preset**: `setThemePreset('dark')` with full surface color overrides via `[data-theme="dark"]`.
- **CSS code-splitting**: Each component now ships its own CSS chunk instead of one monolithic bundle.

### Patch Changes

- **Fixed quality gate scripts**: `scss-token-audit.sh` now works on macOS (BSD grep), `verify-barrel-exports.sh` audits all folders (not just git diff).
- **Fixed token mismatch**: `$color-bg-page` reconciled to `#F5F5F5` across SCSS and TypeScript.
- **Fixed 97 lint errors**: All a11y, TypeScript, and React Compiler lint violations resolved.
- **Fixed 49 failing test files**: All unit tests now pass (158 files, 2625 tests).
- **Fixed Desktop story titles**: All Desktop* components now in `(Desktop)` Storybook sections per convention.
- **Reverted CategorySidebar**: Restored to v0.5.0 design state.
- **Added DX tooling**: Prettier, Husky + lint-staged, `.nvmrc`, `SECURITY.md`, `CHANGELOG.md`.
- **Added Chromatic CI**: Visual regression testing via `.github/workflows/chromatic.yml`.
- **Added token sync script**: `scripts/sync-tokens.sh` verifies SCSS/TS token consistency in CI.
- **Security**: Added `botUsername` validation in TelegramLoginButton, resolved npm audit vulnerability.
- **Coverage thresholds**: Raised from 50% to 70% global minimum.

## 0.4.1

### Patch Changes

- Initial changelog entry. Previous versions were not tracked via Changesets.
