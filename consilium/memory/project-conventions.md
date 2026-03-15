# Project Conventions
<!-- Auto-maintained by consilium Phase 8. Source: CLAUDE.md + audit findings. -->

## Code Style
- Named exports only (no `export default`). Enforced by ESLint `no-restricted-syntax` rule.
- TypeScript strict mode. No `any` type — use `unknown` or proper generics.
- React 17+ JSX transform — do NOT import React (except for hooks).

## Component Structure
- Every component: `ComponentName.tsx`, `ComponentName.module.scss`, `ComponentName.stories.tsx`, `ComponentName.test.tsx`, `index.ts`
- Interactive components MUST use `React.forwardRef`
- ALL components spread `...rest` native HTML props onto root element
- Props interface exported as `{ComponentName}Props`
- CSS Modules with `.module.scss` extension

## Styling
- Import tokens: `@use '../../../theme/tokens' as *`
- CSS Custom Properties: `var(--gs-*)` for themeable values
- SCSS vars for compile-time values (breakpoints, z-index)
- Container queries: `container-type: inline-size` for responsive components (MUST pair with `width: 100%`)
- No deprecated Sass: use `@use 'sass:color'` and `color.adjust()` / `color.scale()`
- No inline styles — use CSS custom property bridge pattern for dynamic values

## i18n
- All user-facing strings use `useGeekShop().t('key')` — no hardcoded text
- All price formatting uses `useGeekShop().formatPrice()` — no local formatPrice functions
- Default locale: uz (Uzbek Latin), default currency: UZS

## Stories
- Use `satisfies Meta<typeof Component>` pattern
- Include `tags: ['autodocs']`
- Story decorators: use `width`, never just `maxWidth` (container queries collapse)
- Interactive components: add `play` function for interaction testing

## Testing
- Interactive components: 85%+ coverage, test keyboard navigation + aria attributes
- Display components: 60%+ coverage
- Hooks: 95%+ coverage

## Git
- NEVER commit/push to main unless explicitly asked
- Branches: feat/*, bugfix/*, v0.1.*
- Keep last 5 version branches

## Build
- Vite library mode with preserveModules (rollupOptions.output as array)
- Separate dist/es/ and dist/cjs/ directories
- Package exports: "." → components, "./styles" → CSS

## CSS Layout Rules (Mobile-First — 390px viewport)

### Sizing
- `min-height` not `height` on containers with padding (padding inside fixed height crushes content)
- `box-sizing: border-box` on ALL `position: fixed` elements
- No magic numbers — always token-based `calc()` for padding

### Flex Layout
- CTA buttons: `flex: 1` to share space equally, `min-width: 0` to allow shrinking
- Icon groups: `flex-shrink: 0` — icons keep size, buttons absorb remaining space
- All buttons: `overflow: hidden; text-overflow: ellipsis` for i18n safety

### Fixed Positioning
- `padding-bottom: $safe-area-bottom` on ALL `position: fixed; bottom: 0` — mandatory
- Safe area padding ADDED to content padding via `calc()`, never included in height
- No `max-width` on fixed bars — must span full viewport
- One bottom bar rule: ActionBar at `bottom: $tabbar-height` if TabBar also present

### Touch Targets
- Min 44x44px interactive area (use `min-height`/`min-width`, not `height`/`width`)
- Min 8px gap between adjacent tappable elements

### Z-index Scale
- sticky: 200, fixed: 500, modal-backdrop: 900, modal: 1000, popover: 1100, toast: 1200

### i18n Text
- Test ALL components in uz, ru, en — text length varies 2x between locales
- CTA buttons: `$font-size-md` (14px) on constrained bars, not `$font-size-lg`

### Page Completion Checklist
Every page must pass: content scrolls past all fixed bars, safe area on all fixed elements, 44px touch targets, CTA readable in all 3 locales, no magic numbers, works on 390px and 375px
