# Patterns (What Works)
<!-- Successful approaches. Reuse in future sessions. Auto-maintained by Phase 8. -->

## Session 20260315 — Bootstrap Audit

1. **100% file completeness.** All 55 components have all 5 required files (.tsx, .module.scss, .stories.tsx, .test.tsx, index.ts). This is a strong foundation — maintain it.

2. **Focus trap hook adoption.** useFocusTrap is correctly used by all 3 overlay components (BottomSheet, Popup, QuickBuyPopup). This pattern works well.

3. **Container queries on card components.** The 5 card-type components (CartItem, DealCard, OrderCard, ReviewCard, ProductCard) all correctly use container-type: inline-size. Consistent application.

4. **Storybook conventions.** All 55 stories use `satisfies Meta<typeof Component>` and `tags: ['autodocs']`. 100% consistency.

5. **Dark mode support.** global.scss has full dark mode via `[data-theme="dark"]` overrides and `prefers-color-scheme` auto-detection. Comprehensive approach.

6. **Mobile-first viewports.** Storybook has custom viewports (iPhone 13 default at 390px) with proper backgrounds. Development workflow is mobile-first by default.
