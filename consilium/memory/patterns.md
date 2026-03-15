# Patterns (What Works)
<!-- Successful approaches. Reuse in future sessions. Auto-maintained by Phase 8. -->

## Session 20260315 — Bootstrap Audit

1. **100% file completeness.** All 55 components have all 5 required files (.tsx, .module.scss, .stories.tsx, .test.tsx, index.ts). This is a strong foundation — maintain it.

2. **Focus trap hook adoption.** useFocusTrap is correctly used by all 3 overlay components (BottomSheet, Popup, QuickBuyPopup). This pattern works well.

3. **Container queries on card components.** The 5 card-type components (CartItem, DealCard, OrderCard, ReviewCard, ProductCard) all correctly use container-type: inline-size. Consistent application.

4. **Storybook conventions.** All 55 stories use `satisfies Meta<typeof Component>` and `tags: ['autodocs']`. 100% consistency.

5. **Dark mode support.** global.scss has full dark mode via `[data-theme="dark"]` overrides and `prefers-color-scheme` auto-detection.

6. **Mobile-first viewports.** Storybook has custom viewports (iPhone 13 default at 390px).

## Session 20260315 — Phase 5 Implementation

7. **Category-based file boundaries for parallel agents.** Splitting agents by component category (commerce+content+layout / data-display+feedback / navigation+product) eliminates merge conflicts. Each agent owns exclusive directories.

8. **Core agent for cross-cutting concerns.** A single "core" agent handling useControllableState wiring + barrel exports achieved 5.0/5.0 score. Cross-cutting tasks benefit from single-agent ownership.

9. **CSS custom property pattern for dynamic props.** `style={{ '--gs-var': value }} + var(--gs-var, $default)` in SCSS. Used for CouponCard, HeroBanner, PromoBanner backgrounds.

10. **Overlay backdrop pattern.** `role="presentation"` on backdrop div + `role="dialog" aria-modal="true"` on content div. Used for BottomSheet, Popup, QuickBuyPopup, SkuSelector, FilterPanel.

11. **Ref merging pattern for overlays.** useCallback ref that assigns to both useFocusTrap ref and forwarded ref. Used in BottomSheet and Popup.

12. **Play function patterns.** Form: click → assert callback. Overlay: verify open → click close → assert onClose. Navigation: click tabs → assert onChange with key. Stepper: verify disabled at min → increment → assert value.

## Session 20260315 — i18n + Docs + Pages

13. **GeekShopProvider with fallback defaults.** `createContext(DEFAULT_CONTEXT)` with non-null default means useGeekShop() works with or without provider. Default = uz locale, UZS currency. Provider overrides for consumers who need different locales.

14. **MDX docs in src/docs/ with sidebar groups.** Three groups: Docs (Introduction, Getting Started), Design Tokens (Colors, Typography, Spacing, Shadows), Guides (Theming). Each MDX uses `<Meta title="Group/Page" />` for sidebar placement.

15. **Storybook toolbar for i18n.** globalTypes with `icon: 'globe'` for locale + `icon: 'credit'` for currency. Decorator wraps every story in GeekShopProvider using context.globals values.

16. **formatPrice includes currency symbol.** `formatPrice(5200000)` returns `"5 200 000 so'm"` not just the number. Components no longer need separate currency text nodes. Uses Intl.NumberFormat for grouping + manual symbol placement.

## Session 20260315 — Mobile Layout Best Practices

17. **Fixed bar pattern: `min-height` + additive padding.** `min-height: $action-bar-height; padding: $spacing-sm $spacing-md; padding-bottom: calc(#{$spacing-sm} + #{$safe-area-bottom});` — height grows to accommodate content + safe area, never crushes it.

18. **Action bar flex pattern: icons + CTA split.** `.icons { flex-shrink: 0; gap: $spacing-xs; }` keeps icons compact. `.actions { flex: 1; }` with `.ctaBtn { flex: 1; min-width: 0; }` lets CTA buttons share remaining space equally.

19. **i18n-safe button pattern.** `flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;` — button fills available space, truncates only in extreme cases, never overflows container.

20. **Fixed bar self-test: must pass 3 locales.** After creating/modifying any fixed bar (ActionBar, TabBar, bottom bars), switch Storybook locale toolbar to uz → ru → en and verify no truncation, no overflow, proper spacing in each.
