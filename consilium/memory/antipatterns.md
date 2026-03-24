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
