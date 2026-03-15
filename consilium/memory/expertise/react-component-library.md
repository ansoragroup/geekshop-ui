# React Component Library Best Practices (auto-generated, session 20260315)

## Architecture
- Barrel exports with named exports only — enables tree-shaking
- preserveModules in Vite for per-component chunks
- CSS Modules for style isolation, CSS custom properties for theming
- Dual format output (ESM + CJS) for broad ecosystem compatibility
- Separate output directories per format: `dist/es/` and `dist/cjs/`

## Component Design
- forwardRef on ALL interactive components (buttons, inputs, overlays, steppers)
- Spread `...rest` HTML props for composability (data-*, aria-*, form library integration)
- useControllableState for dual controlled/uncontrolled support
- Container queries (container-type: inline-size) for responsive components
- ALWAYS pair container-type with explicit width: 100%

## Accessibility
- WCAG 2.1 AA minimum
- Focus trap on overlays (dialog, modal, bottom sheet)
- role, aria-label, aria-modal on overlays
- role="alert" + aria-live="assertive" for toasts/notifications
- Keyboard navigation: Enter + Space for button-like elements
- prefers-reduced-motion for animations
- Form inputs: label association via htmlFor/id

## SCSS Best Practices
- Use `@use 'sass:color'` module — NEVER use deprecated `darken()`, `lighten()`, `saturate()`
- Use `color.adjust()` or `color.scale()` instead
- Import tokens with `@use '../../../theme/tokens' as *`
- CSS custom properties (`var(--gs-*)`) for runtime-themeable values
- SCSS variables (`$var`) for compile-time values only

## Testing
- @testing-library/react + Vitest for unit tests
- Storybook play functions for interaction testing
- Test: rendering, props/variants, keyboard nav, ARIA attributes
- Coverage targets: hooks 95%+, interactive 85%+, display 60%+, layout 40%+

## Storybook
- Use `satisfies Meta<typeof Component>` pattern
- tags: ['autodocs'] on all stories
- Story decorators: use `width` not `maxWidth` (container-type collapses without explicit width)
- Realistic e-commerce data in stories
- Play functions for interactive component testing

## Build Configuration (Vite 8)
- Library mode with `build.lib` config
- For dual ESM/CJS: use `rollupOptions.output` as an ARRAY with separate `dir` per format
- External: react, react-dom, react/jsx-runtime
- vite-plugin-dts for TypeScript declarations
- cssCodeSplit: true for per-component CSS

## Common Pitfalls
- container-type: inline-size without explicit width → element collapses to 0px
- preserveModules with single output object + multiple formats → chunked output instead of module tree
- maxWidth without width in Storybook decorators → container query elements collapse
- @container rules targeting the container element itself (only descendants are affected)
- Mixing controlled/uncontrolled patterns without useControllableState → inconsistent behavior

## Project-Specific Learnings
- [20260315] CLAUDE.md token documentation is out of sync with tokens.scss — always trust tokens.scss
- [20260315] 4 components have default exports violating convention (AddressCard, PaymentMethodCard, CategoryIcon, CategoryIconRow)
- [20260315] useControllableState exists but zero components use it
- [20260315] CI pipeline does NOT run npm test — 772 tests are invisible to CI
- [20260315] Build output is broken — dist/ has chunked files (ui.js, ui2-ui114) instead of preserveModules tree
