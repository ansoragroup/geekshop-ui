# GeekShop UI — Master Implementation Plan

## Phase 1 — Foundation (CURRENT)
- [x] LICENSE (MIT)
- [ ] Vite library mode config (vite.config.ts)
- [ ] package.json (exports, peerDeps, files, @geekshop/ui name)
- [ ] tsconfig.app.json (declaration generation)
- [ ] Fix: Rating SVG ID collision (useId)
- [ ] Fix: QuantityStepper sync (useEffect)
- [ ] Fix: SkuSelector stale closure
- [ ] Fix: Button deprecated darken()
- [ ] Fix: ProductCard keyboard handler (onKeyDown)
- [ ] Fix: CategoryIcon keyboard handler
- [ ] Fix: HeroBanner keyboard handler
- [ ] CLAUDE.md (comprehensive AI agent instructions)
- [ ] CONTRIBUTING.md
- [ ] README.md (proper library README)
- [ ] CI workflow (.github/workflows/ci.yml)
- [ ] Storybook deploy workflow (.github/workflows/storybook.yml)
- [ ] Issue templates (.github/ISSUE_TEMPLATE/)
- [ ] PR template (.github/pull_request_template.md)
- [ ] .github/dependabot.yml

## Phase 2 — Quality
- [ ] useControllableState hook
- [ ] useFocusTrap hook
- [ ] useToast imperative hook
- [ ] forwardRef on Button, Input, Checkbox
- [ ] Native prop spreading (...rest) on interactive components
- [ ] Apply focus trap to BottomSheet, Popup, QuickBuyPopup
- [ ] Toast: role="alert", aria-live, useToast()
- [ ] Enable a11y tests in Storybook (preview.ts)
- [ ] Standardize all story meta to `satisfies Meta`
- [ ] Add `tags: ['autodocs']` to all stories
- [ ] Tests: SkuSelector, QuantityStepper, FilterPanel
- [ ] Tests: BottomSheet focus, Toast timing
- [ ] Apply useControllableState to QuantityStepper, SkuSelector
- [ ] prefers-reduced-motion on all animations

## Phase 3 — Responsive & New Components
- [ ] Container queries: ProductCard, CartItem, ReviewCard, DealCard, OrderCard
- [ ] Media queries: Container (tablet/desktop), Grid (responsive columns)
- [ ] Breakpoint tokens extension
- [ ] New: Skeleton component
- [ ] New: Swipe component (swipe-to-delete)
- [ ] New: ImageLazy component (blur-up)
- [ ] New: InfiniteScroll component
- [ ] New: NoticeBar component (marquee promo)
- [ ] New: PullToRefresh component
- [ ] New: AddressCard component
- [ ] New: PaymentMethodCard component
- [ ] Rewrite pages as Storybook page compositions using library components

## Phase 4 — Polish & Release
- [ ] Compound component API for ProductCard
- [ ] Polymorphic `as` prop for Button
- [ ] Dark mode via CSS custom properties
- [ ] Changesets + npm publish pipeline (.github/workflows/release.yml)
- [ ] First npm publish preparation
- [ ] Performance benchmark (bundle size CI check)
- [ ] Claude Code custom commands (new-component, fix-a11y, write-tests)

## Phase 5 — Ecosystem
- [ ] @geekshop/icons separate package
- [ ] @geekshop/theme separate package
- [ ] Figma tokens sync (Style Dictionary)
- [ ] Cascader component
- [ ] Form integration guide (react-hook-form)
- [ ] i18n support
- [ ] RTL support
- [ ] Visual regression testing
- [ ] Community setup (Discord/Telegram links, GitHub Projects roadmap)
