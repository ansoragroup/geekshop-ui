# GeekShop UI — Component Library

## Overview
Open-source React component library for e-commerce applications. Mobile-first with container query adaptivity. Published as `@geekshop/ui` on npm.

Repository: https://github.com/ansoragroup/geekshop-ui
Storybook: https://ansoragroup.github.io/geekshop-ui

## Tech Stack
- **Runtime:** React 19 + TypeScript 5.9
- **Build:** Vite 8 (library mode with preserveModules for tree-shaking)
- **Styles:** SCSS Modules + CSS Custom Properties (--gs-* prefix)
- **Docs/Dev:** Storybook 10 with autodocs, a11y addon, Vitest integration
- **Testing:** Vitest + @testing-library/react + Storybook play functions
- **CI/CD:** GitHub Actions (lint, typecheck, test, build, deploy Storybook, npm publish via Changesets)

## Project Structure
```
src/
  components/              — all library components (the npm package entry)
    {category}/            — 8 categories (see below)
      {ComponentName}/     — one folder per component
        ComponentName.tsx          — implementation
        ComponentName.module.scss  — styles (CSS Modules)
        ComponentName.stories.tsx  — Storybook stories
        ComponentName.test.tsx     — tests (Vitest + Testing Library)
        index.ts                   — public export
    index.ts               — barrel export (ALL components exported here)
  hooks/                   — shared hooks (useCountdown, useToast, useFocusTrap, useControllableState)
  theme/
    tokens.scss            — SCSS design tokens (source of truth)
    global.scss            — CSS custom properties + global reset
    index.ts               — TypeScript token constants
  pages/                   — page-level Storybook compositions (NOT part of npm package)
```

## Component Categories
| Category | Purpose | Components |
|---|---|---|
| commerce | Cart, checkout, purchasing | ActionBar, CartItem, QuantityStepper, QuickBuyPopup, SkuSelector |
| content | Marketing, promotions | CategoryIcon, CountdownTimer, CouponCard, DealCard, HeroBanner, PromoBanner, SectionHeader |
| data-display | Showing data | Avatar, Badge, OrderCard, OrderStatusBar, Rating, ReviewCard, SpecsTable, Tag |
| feedback | User feedback, overlays | BottomSheet, Empty, Loading, Popup, Skeleton, Toast |
| form | User input | Button, Checkbox, Input |
| layout | Structure, spacing | Container, Divider, Grid, Section |
| navigation | Navigation, search, filters | CategorySidebar, FilterBar, FilterPanel, NavBar, PopularSearches, SearchBar, SearchSuggestions, TabBar, TabFilter |
| product | Product display | PriceDisplay, ProductCard, ProductCarousel, ProductGrid, ProductImageGallery |

## Component Development Rules

### MUST follow for every component:

1. **forwardRef** — Every interactive component (buttons, inputs, overlays) MUST use `React.forwardRef`
2. **Prop spreading** — Spread `...rest` native HTML props onto the root element. This enables form libraries, data-* attributes, aria-* overrides
3. **Props interface** — Export a typed interface named `{ComponentName}Props`. Use union types for variants, not string
4. **CSS Modules** — Use `.module.scss` extension. Import tokens via `@use '../../../theme/tokens' as *`
5. **CSS Custom Properties** — Use `var(--gs-*)` for any value that should be themeable (colors, layout heights). Use SCSS vars for compile-time values (breakpoints, z-index)
6. **Container queries** — Use `container-type: inline-size` for components that adapt to available space (ProductCard, CartItem, ReviewCard, DealCard, OrderCard)
7. **Accessibility (WCAG 2.1 AA)**:
   - All interactive elements: proper `role`, `aria-label`, keyboard handlers (Enter + Space for buttons)
   - Overlays: focus trap (useFocusTrap hook), Escape to close, aria-modal="true"
   - Toast/notifications: `role="alert"` + `aria-live="assertive"`
   - Respect `prefers-reduced-motion`
   - Form inputs: label association via htmlFor/id
8. **No deprecated Sass** — Never use `darken()`, `lighten()`, `saturate()` etc. Use `@use 'sass:color'` and `color.adjust()` / `color.scale()`
9. **Named exports only** — No default exports. Export component and Props type from index.ts
10. **Controlled/uncontrolled** — Use `useControllableState` hook for components with `value`/`onChange`. Support both controlled and uncontrolled usage
11. **Visual verification** — After creating/modifying any component, you MUST run Storybook and take a screenshot via Playwright MCP (`browser_navigate` to `http://localhost:6006`, find the story, `browser_take_screenshot`). A component that compiles is NOT the same as a component that looks correct.
12. **Match existing visual density** — Before creating a new component, render 2-3 existing components from the same category in Storybook. Match their spacing, font sizes, border radius, and visual density. A new card must look like it belongs next to OrderCard and ReviewCard.

### Story requirements:
- Include `tags: ['autodocs']` in meta
- Use `satisfies Meta<typeof ComponentName>` pattern
- At least: Default story + one variant/state story
- Complex interactive components: add `play` function for interaction testing
- Use realistic e-commerce data in stories

### Test requirements:
- Hooks: 95%+ coverage
- Interactive components (form, feedback, commerce): 85%+
- Display components: 60%+
- Layout: 40%+
- Always test keyboard navigation for interactive components
- Always test aria attributes

## Design Tokens Reference

### Colors
- Primary: `$color-primary: #FF4D00` (GeekShop Orange)
- Primary light: `$color-primary-light: #FFF0E6`
- Danger: `$color-danger: #FF3B30`
- Success: `$color-success: #34C759`
- Warning: `$color-warning: #FF9500`
- Text primary: `$color-text-primary: #1A1A1A`
- Text secondary: `$color-text-secondary: #666666`
- Text placeholder: `$color-text-placeholder: #999999`
- Background: `$color-bg-page: #F5F5F5`
- Background card: `$color-bg-card: #FFFFFF`
- Border: `$color-border: #E5E5E5`

### Spacing (8px base)
`$spacing-xs: 2px`, `$spacing-sm: 4px`, `$spacing-md: 8px`, `$spacing-lg: 12px`, `$spacing-xl: 16px`, `$spacing-2xl: 24px`, `$spacing-3xl: 32px`

### Border Radius
`$radius-xs: 4px` through `$radius-3xl: 24px`, `$radius-round: 9999px`

### Typography
Base: `$font-size-base: 14px`, sizes from `$font-size-xs: 10px` to `$font-size-2xl: 24px`

### Z-index Scale
`$z-normal: 1`, `$z-dropdown: 100`, `$z-sticky: 200`, `$z-fixed: 300`, `$z-modal-backdrop: 400`, `$z-modal: 500`, `$z-toast: 600`

## Commands
```bash
npm run dev            # Vite dev server (for pages/demos)
npm run storybook      # Storybook dev server on port 6006
npm run build:lib      # Build library for npm (dist/)
npm run build-storybook # Build Storybook static site
npm run lint           # ESLint
npm test               # Vitest tests
npm run test:coverage  # Tests with coverage report
```

## Adding a New Component — Step by Step

1. Create folder: `src/components/{category}/{ComponentName}/`
2. Create `ComponentName.tsx` with:
   - Exported `ComponentNameProps` interface
   - `forwardRef` wrapper (if interactive)
   - `...rest` prop spreading
   - CSS Module import
   - Token imports
3. Create `ComponentName.module.scss` with:
   - `@use '../../../theme/tokens' as *`
   - `container-type: inline-size` (if responsive)
   - `@container` queries for adaptivity
   - `prefers-reduced-motion` for animations
4. Create `ComponentName.stories.tsx` with:
   - `satisfies Meta<typeof ComponentName>` pattern
   - `tags: ['autodocs']`
   - Default + variant stories
   - `play` function for interaction testing
5. Create `ComponentName.test.tsx` with:
   - Render test
   - Props/variant tests
   - Keyboard navigation test (if interactive)
   - aria attribute tests
6. Create `index.ts`: `export { ComponentName } from './ComponentName'` + `export type { ComponentNameProps } from './ComponentName'`
7. Add export to `src/components/index.ts`
8. Verify: `npm run lint && npm test && npm run build:lib`
9. Visual QA: Start Storybook (`npm run storybook`), navigate to the new component's story via Playwright MCP, take screenshots at iPhone 13 (390px) viewport, verify the component looks correct visually — no broken layout, no clipped text, proper spacing

## Common Patterns

### useControllableState (controlled + uncontrolled)
```tsx
const [value, setValue] = useControllableState({
  value: props.value,
  defaultValue: props.defaultValue ?? initialValue,
  onChange: props.onChange,
})
```

### Focus trap for overlays
```tsx
const containerRef = useFocusTrap(isOpen)
return <div ref={containerRef} role="dialog" aria-modal="true">...</div>
```

### Container query responsive pattern
```scss
.card {
  container-type: inline-size;
  width: 100%; // REQUIRED — without this, inline-size containment collapses to 0px
  @container (max-width: 200px) { /* compact */ }
  @container (min-width: 200px) and (max-width: 320px) { /* standard */ }
  @container (min-width: 320px) { /* expanded */ }
}
```
**WARNING:** `container-type: inline-size` MUST always be paired with `width: 100%`. Without explicit width, the element has no intrinsic inline size and collapses to 0px.

### Keyboard-accessible clickable div
```tsx
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }}
>
```

## E-commerce UX Rules (enforced in components)
1. **Price always visible** — PriceDisplay never truncates the current price
2. **CTA min 44x44px** — Button primary enforces min touch target
3. **Skeleton over spinner** — Use Skeleton component for loading states, not Loading spinner
4. **Optimistic UI** — Toast appears immediately on action, don't wait for API
5. **Safe area** — ActionBar, TabBar respect `env(safe-area-inset-bottom)`

## Visual QA (REQUIRED for every component)

Every component MUST pass visual inspection. Code that compiles is NOT sufficient — you must SEE the rendered result.

### Verification steps
1. Run Storybook: `npm run storybook` (port 6006)
2. Navigate via Playwright MCP: `browser_navigate` to `http://localhost:6006`
3. Find the component's story in the sidebar
4. Take screenshot: `browser_take_screenshot`
5. Verify at default iPhone 13 viewport (390x844)

### Visual checklist
- No overflow, clipping, or unexpected scrollbars
- Proper spacing between elements (consistent with design tokens)
- Text readable, not overlapping, proper hierarchy (title > body > secondary)
- Interactive elements have visible boundaries and touch targets (min 44x44px)
- Component looks intentional, not broken
- Matches visual density of sibling components in the same category

### Card-type components (ProductCard, OrderCard, ReviewCard, AddressCard, etc.) MUST follow:
- Container: `padding: $spacing-lg`, `background: $color-bg-card`, `border-radius: $radius-lg`, `border: 1px solid $color-border` or `box-shadow: $shadow-sm`
- Title: `font-size: $font-size-lg`, `font-weight: $font-weight-semibold`, `color: $color-text-primary`
- Secondary text: `font-size: $font-size-sm`, `color: $color-text-secondary`
- Actions row: `margin-top: $spacing-md`, `gap: $spacing-sm`, aligned flex-end
- Consistent internal spacing using `$spacing-md` or `$spacing-lg` gaps

### Layout reference requirement
When creating a new component, the prompt MUST include a visual layout description (ASCII diagram or structured format). Example:
```
┌──────────────────────────────┐
│ [Tag: Home]        [Default] │
│ John Doe  •  +998 90 123... │
│ 123 Main Street, Apt 4      │
│ Tashkent, Uzbekistan 100000 │
│                [Edit] [Del]  │
└──────────────────────────────┘
```
Without a visual reference, the agent is guessing what the component should look like.

## DO NOT
- Add `default export` — library uses named exports only
- Use `any` type — use `unknown` or proper generic
- Import React (unnecessary with React 17+ JSX transform, except for hooks)
- Use inline styles — use CSS Modules
- Use magic numbers — use design tokens
- Use deprecated Sass functions — use sass:color module
- Skip keyboard navigation on interactive elements
- Forget to export new components from src/components/index.ts
