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

## Session 20260315 — Full Library Expansion (v0.3.0)

21. **6-agent parallel wave for library expansion.** Split by domain: form components, commerce components, feedback+data-display, pages, docs, auth. Zero file conflicts. 20 components + 10 pages + 7 docs in one wave.

22. **Automated i18n key audit.** `grep -roh "t('[^']*')" src/ | sort -u` extracts all used keys. `comm -23 used.txt defined.txt` finds missing. Run after every agent wave.

23. **color-mix() for CSS var opacity.** `color-mix(in srgb, var(--gs-color-primary) 50%, transparent)` replaces `rgba($color-primary, 0.5)` when using CSS custom properties.

24. **Reusable Table component for MDX docs.** `export const Table = ({ headers, rows }) => <table>...</table>` reduces boilerplate in large doc pages like ComponentStatus.mdx.

## Session 20260321 — Desktop Design System Overhaul + SSR Readiness

25. **Team agents for parallel work (owner requirement).** ALWAYS use TeamCreate for multi-agent work. Owner explicitly requires team agents over standalone Agent spawns. Team structure provides shared context, coordinated file boundaries, and metrics collection.

26. **'use client' must be FIRST line before any imports.** In React Server Components / Next.js, the `'use client'` directive must appear as the very first line of the file, before any `import` statements. Placing it after imports causes silent SSR failures.

27. **margin-top: auto on CTA buttons for equal-height card grids.** When cards are in a CSS Grid with `align-items: stretch`, use `display: flex; flex-direction: column` on the card, then `margin-top: auto` on the CTA/actions container. This pushes CTAs to the bottom regardless of content height, ensuring visual alignment across the row.

28. **CSS vars for colors/shadows, SCSS vars for spacing/breakpoints.** Colors and shadows use `var(--gs-*)` CSS custom properties (runtime-changeable for themes). Spacing and breakpoints use `$spacing-*` SCSS variables (compile-time, no runtime cost). This split ensures theming works while keeping layout performance optimal.

29. **Unsplash for verified demo images.** Newegg/ASUS CDN images get hotlink blocked in Storybook. Use Unsplash URLs (e.g., `https://images.unsplash.com/photo-...?w=400&h=400&fit=crop`) as they allow hotlinking and provide high-quality product-style images.

## Session 20260324 — Evolution Analysis Patterns

30. **Storybook sidebar organization: Desktop/{Category}/{ComponentName}.** Desktop components use `title: 'Desktop/{Category}/{ComponentName}'` in story meta. Mobile components use `title: '{Category}/{ComponentName}'`. Pages use `title: 'Pages/Desktop/{PageName}'` or `title: 'Pages/Mobile/{PageName}'`. This prevents cross-contamination of mobile and desktop sections.

31. **Component reuse verification before creation.** Before creating any new component, run: `grep -i "{concept}" src/components/index.ts` to check existing exports. If a related component exists (e.g., DesktopRating for a rating distribution feature), evaluate extending it vs creating new. Document the decision in the investigation artifacts.

32. **Iterative design polish workflow.** Owner's pattern: create initial components -> visually verify -> refine SCSS -> re-verify. The v5.1.0 branch shows this pattern: DesktopDialog, DesktopModal, DesktopPopup all had SCSS modifications alongside page refinements (checkout, login, register). Support this by keeping component SCSS modular and avoiding tightly coupled styles.

33. **Expansion + polish in parallel.** Current sessions show new component creation (DesktopDeliverySelector, DesktopImageZoom, etc.) alongside refinement of existing components (DesktopDialog SCSS, DesktopHeader). Agent teams should allocate roles for both: creation agents + polish agents working in parallel on non-overlapping files.

34. **Search autocomplete with deduplication.** Latest commit (c8348a0) adds DesktopSearchAutocomplete with photo search and deduplicates 19 pages. When adding new page-level compositions, always check for duplicates across the pages/ directory first.
