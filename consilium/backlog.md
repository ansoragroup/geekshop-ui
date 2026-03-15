# Consilium Backlog (Level 3 Continuous Mode)
<!-- Generated from bootstrap audit session 20260315 -->
<!-- Priority: CRITICAL > HIGH > MEDIUM > LOW -->

## CRITICAL
- [x] ~~Fix Vite build config~~ (completed 20260315)
- [x] ~~Add test job to CI workflow~~ (completed 20260315)

## HIGH
- [x] ~~Sync CLAUDE.md design tokens with actual tokens.scss~~ (completed 20260315)
- [x] ~~Remove default exports from 4 components~~ (completed 20260315)
- [x] ~~Wire useControllableState into QuantityStepper~~ (completed 20260315)
- [x] ~~Wire useCountdown into CountdownTimer~~ (completed 20260315)
- [ ] Add forwardRef to 15+ interactive components missing it (QuantityStepper, SkuSelector, ActionBar, CartItem, BottomSheet, Popup, Toast, SearchBar, TabBar, FilterBar, FilterPanel, NavBar, Rating, TabFilter, QuickBuyPopup)
- [ ] Wire useControllableState into remaining components (Rating, FilterBar, TabFilter, TabBar, SearchBar)
- [ ] Add ...rest prop spreading to 46 components missing it

## MEDIUM
- [x] ~~Fix deprecated darken() in Skeleton.module.scss~~ (completed 20260315)
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
