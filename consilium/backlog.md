# Consilium Backlog (Level 3 Continuous Mode)
<!-- Generated from bootstrap audit session 20260315 -->
<!-- Priority: CRITICAL > HIGH > MEDIUM > LOW -->

## CRITICAL
- [ ] Fix Vite build config — rollupOptions.output must be array with separate dirs for ESM/CJS, verify dist/ matches package.json exports
- [ ] Add test job to CI workflow (ci.yml) — 772 tests never run in pipeline

## HIGH
- [ ] Sync CLAUDE.md design tokens with actual tokens.scss (colors, spacing names, z-index names/values)
- [ ] Remove default exports from 4 components (AddressCard, PaymentMethodCard, CategoryIcon, CategoryIconRow)
- [ ] Add forwardRef to 15+ interactive components missing it (QuantityStepper, SkuSelector, ActionBar, CartItem, BottomSheet, Popup, Toast, SearchBar, TabBar, FilterBar, FilterPanel, NavBar, Rating, TabFilter, QuickBuyPopup)
- [ ] Wire useControllableState into components with value/onChange (QuantityStepper, Rating, FilterBar, TabFilter, TabBar, SearchBar)
- [ ] Wire useCountdown into CountdownTimer (replace ad-hoc implementation)
- [ ] Add ...rest prop spreading to 46 components missing it

## MEDIUM
- [ ] Fix deprecated darken() in Skeleton.module.scss — use sass:color module
- [ ] Add play functions to interactive component stories (form, feedback, commerce, navigation)
- [ ] Export all Props types from main barrel (src/components/index.ts) — ~35 missing
- [ ] Add import/no-default-export ESLint rule to enforce convention
- [ ] Configure Vitest coverage thresholds to enforce documented targets
- [ ] Add Playwright browser install step to CI if Storybook tests are added

## LOW
- [ ] Gate deploy-storybook.yml on CI passing (use workflow_run trigger)
- [ ] Gate release.yml on CI passing
- [ ] Resolve peer dependency conflicts (remove --legacy-peer-deps need)
- [ ] Add eslint-plugin-jsx-a11y for lint-time accessibility checks
- [ ] Audit inline styles in Loading, CouponCard, HeroBanner, PromoBanner for token opportunities
