# Antipatterns (What Doesn't Work)
<!-- Failed approaches. Avoid in future sessions. Auto-maintained by Phase 8. -->

## Session 20260315 — Bootstrap Audit

1. **Writing hooks without wiring them into components.** useControllableState and useCountdown exist but are used by 0 components. The hook becomes dead code and the components implement ad-hoc solutions instead.

2. **Documenting conventions without lint enforcement.** "Named exports only" and "use useControllableState" are in CLAUDE.md but there's no ESLint rule to enforce them. 4 default-export violations and 0 useControllableState usage resulted.

3. **Single rollup output object with multiple formats.** Using `formats: ['es', 'cjs']` in a single output config produces chunked files instead of preserveModules tree. Must use an array of output configs.

4. **CI pipeline without test job.** Lint, typecheck, and build all pass while 772 tests go unexecuted. False confidence.

5. **Magic numbers in component styles.** Loading component uses hardcoded width percentages ('80%', '60%', etc.) as inline styles. Should use design tokens or semantic constants.

## Session 20260315 — i18n + Docs + Pages

6. **Don't add ESLint rules without scope exclusions.** Adding `no-restricted-syntax` for default exports caught story files which legitimately use `export default meta`. Always add `ignores: ['**/*.stories.*']` for rules that conflict with Storybook conventions.

7. **Don't remove exports without checking consumers.** Removing `export default` from components broke 6 tests that used default import syntax. Always grep test files for the old pattern before removing.

8. **Don't change user-facing text without updating tests.** Changing alt text in ProductImageGallery for a11y broke the test that asserted on the old text. After any text change, search tests for the old string.

## Session 20260315 — Layout Anti-patterns

4. **Don't use `height` on containers that also have `padding`.** The padding eats into the fixed height, shrinking content area. On iPhone with 34px safe area + 56px bar = only 22px left for buttons. Use `min-height` instead.

5. **Don't rely on text width for button sizing.** Buttons with only `padding` and `white-space: nowrap` overflow when text is long (especially in Russian). Use `flex: 1` to share space.

6. **Don't put `max-width` on `position: fixed` bars.** Creates misalignment with other full-width fixed elements (TabBar vs ActionBar). Fixed bars must always be full viewport width.

7. **Don't forget `min-width: 0` on flex children.** Without it, flex items can't shrink below their intrinsic content width, causing the parent to overflow. This is the #1 cause of "content pushes out of container" bugs.

8. **Don't assume one locale fits all.** Text lengths vary 2x across locales. "Buy" (EN) = 3 chars, "Купить" (RU) = 6 chars, "Sotib olish" (UZ) = 11 chars. Always test the longest locale.

## Session 20260315 — Full Library Expansion

9. **Don't use SCSS vars for themeable colors.** `$color-primary` compiles to `#FF5000` at build time. CSS custom properties `var(--gs-color-primary)` are read at runtime and respond to theme changes.

10. **Don't assume markdown tables work in MDX.** MDX v3 breaks markdown tables near JSX. Always use `<table>` JSX elements in MDX files.

11. **Don't ship theme presets with only primary colors.** Users see "theme broken" when price/success/warning colors don't match. Each preset needs ALL 16 semantic colors.

## Session 20260321 — Desktop Design System Overhaul + SSR Readiness

12. **Don't use standalone Agent spawns instead of team agents.** Owner explicitly requires TeamCreate for all multi-agent work. Standalone Agent spawns lack: shared context, coordinated file boundaries, metrics collection, and orchestration. Always use team agents.

13. **Don't let cn() utility corrupt array destructuring.** The cn() className merging utility can be mistakenly applied by automated fixes to array destructuring patterns. `const [x, y] = ...` must NOT become `const cn(x, y] = ...`. Always verify cn() is only applied to className string concatenation, not arbitrary bracket syntax.

14. **Don't use picsum.photos or placehold.co for product images.** Owner explicitly rejected placeholder image services. Storybook must look like real e-commerce. Use Unsplash URLs with real product-style images, or verified CDN URLs that allow hotlinking.

15. **Don't create identical story data with different names.** Each story variant MUST have genuinely different data — different product names, prices, images, descriptions, and state. Copy-pasting a Default story and renaming it "WithDiscount" while keeping the same data is unacceptable. Owner got very angry about this.

16. **Don't place 'use client' after import statements.** The `'use client'` directive MUST be the very first line of the file, before any imports. Placing it after imports causes silent SSR failures in Next.js. This was a bug fixed in commit c13379f.

## Session 20260324 — Evolution Analysis

17. **Don't place Desktop components in mobile Storybook sections.** Desktop components MUST be in "Desktop / {Category} / {ComponentName}" in the Storybook sidebar. Never place them alongside mobile components in "{Category} / {ComponentName}". Owner explicitly frustrated by disorganized sidebar. Set the story title correctly: `title: 'Desktop/{Category}/{ComponentName}'`.

18. **Don't create new components without checking existing barrel exports.** Before creating ANY new component, search `src/components/index.ts` for related components. If a similar one exists, compose or extend it rather than creating from scratch. Owner frustrated by duplication when agents ignore existing library components.

19. **Don't skip the component reuse check in Phase 1 (investigate).** Every investigation phase MUST include: `grep -i "{component concept}" src/components/index.ts` to find existing components. If DesktopRating exists and you need rating distribution, check if DesktopRating can be extended rather than creating DesktopRatingDistribution from scratch.

20. **Don't adopt protocol modifications without actual enforcement.** "Enforce debate for features" was ADOPTED after session s3 but was only enforced in 1 of 5 subsequent feature sessions (20%). Adopting a rule and not enforcing it is worse than not having the rule — it creates false confidence.

## Session 20260324c — Brand-Neutral Overhaul

21. **Don't interpret "audit all" as "audit what I changed".** When the owner says "все компоненты" or "абсолютно все" or "audit all 150+ components", that means EVERY SINGLE component directory. Not just the 4 components the agent touched in the current session. Create a checklist of every component directory and track progress through the full list. Incomplete audits waste the owner's time and erode trust.

22. **Don't use competitor brand names in open-source component naming.** `DesktopHeaderAliExpress` is unacceptable for a library published on npm/GitHub. Component names must be brand-neutral: `DesktopHeaderMarketplace`, `DesktopHeaderModern`, etc. Competitor brand names (AliExpress, Ozon, Uzum, Taobao) are acceptable as design REFERENCES in comments/docs but never in exported component names, CSS classes, or file paths.

## Session 20260325b — Rich Stories + Theme Fix

23. **Don't hardcode hex colors in theme-sensitive CSS properties.** `background: linear-gradient(135deg, #FFF0F3 0%, #F5F0FF 100%)` breaks in any non-orange theme. Owner: "оранжевый для темы монохром херня подзалупная, серая должна быть нет?" Always use `var(--gs-color-primary-bg)`, `var(--gs-bg-card)`, or other CSS custom properties. If a component needs a custom background, expose it via `var(--gs-{component}-bg, var(--gs-color-primary-bg))`.

24. **Don't add padding that misaligns content with sibling sections.** SaleHits had `padding: 24px` which made its content narrower than the header and product grid above/below. Owner: "why such clinical moments of design not mentioned and skipped?" Before adding padding to any section component, verify that its content aligns horizontally with adjacent sections.
