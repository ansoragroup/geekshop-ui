# GeekShop UI — Master Implementation Plan

## Phase 1 — Foundation [DONE]
- [x] LICENSE (MIT)
- [x] Vite library mode config (vite.config.ts)
- [x] package.json (exports, peerDeps, files, @geekshop/ui name)
- [x] tsconfig.app.json (declaration generation)
- [x] Fix: Rating SVG ID collision (useId)
- [x] Fix: QuantityStepper sync (useEffect)
- [x] Fix: SkuSelector stale closure
- [x] Fix: Button deprecated darken()
- [x] Fix: ProductCard keyboard handler (onKeyDown)
- [x] Fix: CategoryIcon keyboard handler
- [x] Fix: HeroBanner keyboard handler
- [x] CLAUDE.md (comprehensive AI agent instructions)
- [x] CONTRIBUTING.md
- [x] README.md (proper library README)
- [x] CI workflow (.github/workflows/ci.yml)
- [x] Storybook deploy workflow (.github/workflows/deploy-storybook.yml)
- [x] Release workflow (.github/workflows/release.yml)
- [x] Issue templates (.github/ISSUE_TEMPLATE/)
- [x] PR template (.github/pull_request_template.md)
- [x] .github/dependabot.yml
- [x] CODE_OF_CONDUCT.md
- [x] Changesets setup (.changeset/)
- [x] Claude Code commands (new-component, fix-a11y, write-tests, add-responsive, review-component)

## Phase 2 — Quality [DONE]
- [x] useControllableState hook
- [x] useFocusTrap hook
- [x] useToast imperative hook
- [x] useCountdown hook
- [x] forwardRef on Button, Input, Checkbox
- [x] Native prop spreading (...rest) on interactive components
- [x] Apply focus trap to BottomSheet, Popup, QuickBuyPopup
- [x] Toast: role="alert", aria-live="assertive"
- [x] Input: label htmlFor/id association, aria-invalid, aria-describedby
- [x] Enable a11y tests in Storybook (preview.ts → a11y.test: 'error')
- [x] Add tablet/desktop viewports to Storybook
- [x] prefers-reduced-motion on BottomSheet, Toast, Loading animations
- [x] Standardize all story meta to `satisfies Meta` (in progress)
- [x] Add `tags: ['autodocs']` to all stories (in progress)
- [x] Tests (in progress)

## Phase 3 — Responsive & New Components [DONE]
- [x] Container queries: ProductCard, CartItem, ReviewCard, DealCard, OrderCard
- [x] New: Skeleton + ProductCardSkeleton component
- [x] New: Swipe component (swipe-to-delete)
- [x] New: ImageLazy component (blur-up placeholder)
- [x] New: InfiniteScroll component
- [x] New: NoticeBar component (marquee promo)
- [x] New: PullToRefresh component
- [x] New: AddressCard component
- [x] New: PaymentMethodCard component (with UZ payment systems)

## Phase 4 — Polish & Release [DONE]
- [x] Compound component API for ProductCard
- [x] Polymorphic `as` prop for Button
- [x] Dark mode via CSS custom properties ([data-theme="dark"])
- [x] Theme utilities (setTheme, getTheme)
- [x] Changesets + npm publish pipeline
- [x] Bundle size check in CI

## Phase 5 — Ecosystem [FUTURE]
- [ ] @geekshop/icons separate package
- [ ] @geekshop/theme separate package
- [ ] Figma tokens sync (Style Dictionary)
- [ ] Cascader component (region → city → district for delivery)
- [ ] Form integration guide (react-hook-form)
- [ ] i18n support (string context provider)
- [ ] RTL support
- [ ] Visual regression testing (Chromatic/Percy)
- [ ] Community setup (Discord/Telegram links, GitHub Projects roadmap)
