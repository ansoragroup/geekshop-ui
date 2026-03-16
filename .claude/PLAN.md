# GeekShop UI — Master Implementation Plan

## Phase 1 — Foundation [DONE]
- [x] LICENSE (MIT)
- [x] Vite library mode config (vite.config.ts)
- [x] package.json (exports, peerDeps, files, @ansoragroup/ui)
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

## Phase 2 — Quality [DONE]
- [x] useControllableState hook
- [x] useFocusTrap hook
- [x] useToast imperative hook
- [x] useCountdown hook
- [x] forwardRef on ALL 86 components
- [x] Native prop spreading (...rest) on ALL components
- [x] Apply focus trap to BottomSheet, Popup, QuickBuyPopup
- [x] Toast: role="alert", aria-live="assertive"
- [x] Input: label htmlFor/id association, aria-invalid, aria-describedby
- [x] Enable a11y tests in Storybook
- [x] Add tablet/desktop viewports to Storybook
- [x] prefers-reduced-motion on animations
- [x] Standardize all story meta to `satisfies Meta`
- [x] Add `tags: ['autodocs']` to all stories
- [x] 1,869 tests passing

## Phase 3 — Responsive & New Components [DONE]
- [x] Container queries: ProductCard, CartItem, ReviewCard, DealCard, OrderCard
- [x] New: Skeleton + ProductCardSkeleton
- [x] New: Swipe (swipe-to-delete)
- [x] New: ImageLazy (blur-up placeholder)
- [x] New: InfiniteScroll
- [x] New: NoticeBar (marquee promo)
- [x] New: PullToRefresh
- [x] New: AddressCard, PaymentMethodCard

## Phase 4 — Polish & Release [DONE]
- [x] Dark mode via CSS custom properties ([data-theme="dark"])
- [x] Theme utilities (setTheme, getTheme)
- [x] Changesets + npm publish pipeline
- [x] GitHub Packages publishing (@ansoragroup/ui)

## Phase 5 — i18n, Theming, Design System Docs [DONE]
- [x] i18n: GeekShopProvider context + useGeekShop hook
- [x] 3 locales (uz, ru, en) — ~455 translation keys each
- [x] 4 currencies (UZS, USD, RUB, EUR) via Intl.NumberFormat
- [x] formatPrice utility replacing 8 duplicated functions
- [x] ALL 86 components + 32 pages migrated to t() / formatPrice()
- [x] 6 theme presets (default, teal, red, yellow, green, monochrome)
- [x] Full 16-color palettes per theme (primary + semantic colors)
- [x] SCSS → CSS custom properties migration (all colors runtime-themeable)
- [x] ThemeSwitcher, LanguageSwitcher, CurrencySwitcher components
- [x] 15 Storybook MDX doc pages (Introduction, Getting Started, Colors, Typography, Spacing, Shadows, Theming, ThemePresets, Icons, i18n, Accessibility, Motion, Form Patterns, Responsive Behavior, Component Status)
- [x] MDX tables converted to JSX for reliable rendering

## Phase 6 — Full Component Library (P0+P1) [DONE]
- [x] Form: Radio/RadioGroup, Switch, TextArea, Select/Picker, ImageUploader, Chip, OTPInput, TelegramLoginButton
- [x] Navigation: Segmented, Tabs
- [x] Commerce: GroupBuyCard, ShopCard, DeliveryCard
- [x] Product: StockIndicator, InstallmentDisplay
- [x] Content: SocialProof
- [x] Data Display: AvatarGroup, Cell/ListItem, Steps, Timeline, Collapse, Progress, AuthenticityBadge
- [x] Feedback: Dialog, Result, FloatingBubble, ActionSheet, Tooltip
- [x] Auth: OTPInput (6-digit, paste support), TelegramLoginButton

## Phase 7 — Page Compositions [DONE]
- [x] Auth: LoginPage (phone+OTP+Telegram), RegisterPage (guest-to-registered)
- [x] Commerce: SettingsPage, OnboardingPage, OrderConfirmationPage, PreOrderPage
- [x] CRUD: AddressListPage, AddressFormPage, EditProfilePage, PaymentMethodsPage
- [x] Discovery: CategoryProductsPage (with real filtering), WriteReviewPage
- [x] After-sale: ReturnRequestPage, RefundStatusPage, DeliveryTrackingPage
- [x] Engagement: CouponCenterPage, BrowsingHistoryPage, FAQPage, FlashSalePage
- [x] Shared mock data (src/pages/_shared/) for all pages

## Phase 8 — UI/UX Quality [DONE]
- [x] ActionBar: min-height + flex CTA + safe area padding
- [x] Touch targets 44px on NavBar, AppBar, ActionBar
- [x] Container hasActionBar prop for content spacing
- [x] No magic numbers — all padding from design tokens
- [x] 9 CSS layout rules in CLAUDE.md
- [x] 6 lint errors fixed, CI fully green

## Phase 9 — Ecosystem [NEXT]
- [ ] @geekshop/icons separate package (lucide-react currently used inline)
- [ ] @geekshop/theme separate package (tokens + presets extractable)
- [ ] Figma tokens sync (Style Dictionary)
- [ ] CascadePicker component (viloyat → tuman → mahalla)
- [ ] DatePicker component
- [ ] Calendar component (delivery slot selection)
- [ ] Form wrapper with validation context (zod/yup integration)
- [ ] Visual regression testing (Chromatic/Percy)
- [ ] ShareSheet component (Telegram/social sharing)
- [ ] ComparisonTable component (side-by-side product specs)
- [ ] QRCode / Barcode display components
- [ ] Popover component (positioned content popup)
- [ ] react-hook-form integration guide
- [ ] Community setup (GitHub Projects roadmap)
- [ ] StoreFrontPage, GroupBuyPage, CustomerServicePage (chat)
- [ ] Bundle size per-component report in docs

## Current Stats (2026-03-16)
- 86 components across 8 categories
- 32 page compositions
- 15 Storybook MDX documentation pages
- 1,869 tests (100% passing)
- 3 locales × ~455 keys = ~1,365 translations
- 6 theme presets with 16-color palettes
- CI: 6 jobs, all green
