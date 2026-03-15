# Learnings
<!-- Accumulated insights from consilium sessions. Auto-appended by Phase 8. -->

## Session 20260315 — Bootstrap Audit

1. **Build output verification is critical.** The vite.config.ts had preserveModules configured but the actual dist/ output was chunked (ui.js, ui2-ui114). The package.json exports pointed to non-existent paths. Always verify build output matches package.json exports.

2. **CLAUDE.md drifts from source of truth.** Token values, names, and scales documented in CLAUDE.md differed from actual tokens.scss. The source file is authoritative; documentation must be periodically synced.

3. **Convention rules without lint enforcement get violated.** "Named exports only" was documented but 4 components had default exports. "Use useControllableState" was documented but 0 components used it. Rules need automated enforcement.

4. **CI pipeline gaps are invisible until audited.** 772 tests existed but CI never ran them. The pipeline passed on every commit without testing a single assertion.

5. **Hook utilization gap.** useControllableState and useCountdown were built but never adopted by components. Hooks should be wired into components at creation time, not deferred.

## Session 20260315 — Phase 5 Implementation

6. **Parallel agents work if file boundaries are strict.** 5 agents modified 72 files simultaneously with 0 merge conflicts. Key: each agent owned exclusive directories.

7. **forwardRef agents need explicit "remove default export" instruction.** 2 of 3 agents left `export default` when converting FC → forwardRef. The third agent (data-display+feedback) correctly removed them. Difference: prompts didn't mention default exports.

8. **ESLint rule scope must exclude stories.** Adding `no-restricted-syntax` for default exports caught all story files (which legitimately use `export default meta`). Must add `ignores: ['**/*.stories.*']` to the rule config.

9. **Unused dependencies cause hidden friction.** @nutui/nutui-react was in dependencies but unused by any source file. It forced `--legacy-peer-deps` on every CI job. Removing it cleaned the entire install chain.

10. **GitHub Release with `dist/**/*` hits rate limits.** Uploading 500+ individual files as release assets triggers GitHub's secondary rate limit. Package as single tarball instead.

11. **jsx-a11y plugin surfaces real issues.** 29 legitimate a11y errors found across 13 components — clickable divs without keyboard handlers, missing roles, redundant alt text. Worth installing early in project lifecycle.

12. **CSS custom properties beat inline styles for dynamic values.** Converting `style={{ background: color }}` to `style={{ '--gs-var': color }}` + SCSS `var(--gs-var, $default)` keeps styles in the stylesheet while allowing runtime overrides.

## Session 20260315 — i18n + Docs + Pages

13. **MDX import paths differ between Storybook versions.** Storybook 10 uses `@storybook/addon-docs/blocks` for Meta, not `@storybook/blocks`. Always verify import paths against the installed version.

14. **GeekShopProvider context with non-null default is the right pattern.** Using `createContext(DEFAULT_CONTEXT)` instead of `createContext(null)` means components work without a provider wrapper. Zero breaking changes for existing consumers.

15. **i18n migration is mechanical but test-breaking.** Replacing hardcoded strings with t() calls is straightforward, but tests that assert on English strings ("Close", "Clear input") break when the default locale changes them to Uzbek. Always update tests in the same pass.

16. **Storybook toolbar globals + decorator is the right pattern for library-level config.** Adding locale/currency to globalTypes with a GeekShopProvider decorator lets users toggle i18n in the Storybook UI without code changes.

## Session 20260315 — UI Layout Conflict Fixes

17. **`height` + `padding` = crushed content on fixed bars.** ActionBar had `height: 56px` + `padding-bottom: safe-area` — on iPhone the safe area (34px) ate into the 56px, leaving only 22px for buttons. Fix: use `min-height` so padding ADDS to total height.

18. **CTA buttons without `flex: 1` overflow on narrow viewports.** Two buttons with `white-space: nowrap` + `padding: 8px 20px` + 3 icon buttons = more than 390px. Fix: make CTA buttons `flex: 1` so they equally share remaining space after icons.

19. **`min-width: 0` is mandatory on flex children that may overflow.** Without it, flex items refuse to shrink below their content width, causing container overflow. Always pair `flex: 1` with `min-width: 0`.

20. **`max-width` on fixed bars breaks consistency.** ActionBar had `max-width: 420px; margin: 0 auto` while TabBar was full-width — misalignment on wider screens. Fixed bars should always span full viewport width.

21. **Test i18n in ALL locales for layout.** Russian "В корзину" is 2x longer than English "Cart" — buttons that fit in English overflow in Russian. Always verify ActionBar/NavBar in uz, ru, en before shipping.

22. **`text-overflow: ellipsis` is a safety net, not a design choice.** If CTA text is being truncated, the layout is wrong. Ellipsis should only trigger on extreme edge cases, not normal locales.
