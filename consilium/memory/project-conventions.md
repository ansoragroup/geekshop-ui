# Project Conventions
<!-- Coding conventions discovered or established. Auto-maintained by Phase 8. -->
<!-- Discovered session 20260315 -->

## File Structure
- Component folder: PascalCase (`ProductCard/`)
- Required files: `.tsx`, `.module.scss`, `.stories.tsx`, `.test.tsx`, `index.ts`
- All 55 components have 100% file completeness

## Component Pattern
```tsx
export interface ComponentNameProps extends HTMLAttributes<HTMLDivElement> { ... }
export const ComponentName = React.forwardRef<HTMLElement, ComponentNameProps>(
  ({ prop1, prop2, ...rest }, ref) => {
    return <div ref={ref} {...rest} className={styles.root} />
  }
)
ComponentName.displayName = 'ComponentName'
```

## Exports
- Named exports only (NO default exports)
- Each `index.ts`: exports component + Props type
- Barrel: `src/components/index.ts` groups by category

## Styling
- `@use '../../../theme/tokens' as *` — always first line
- CSS Modules with `.root` as main class
- `var(--gs-*)` for themeable values, `$var` for compile-time
- container-type: inline-size on card components (CartItem, DealCard, OrderCard, ReviewCard, ProductCard)

## Stories
- `satisfies Meta<typeof ComponentName>` pattern
- `tags: ['autodocs']` required
- Decorators use `width` not `maxWidth`

## Testing
- Vitest + @testing-library/react + jest-dom
- jsdom environment for unit tests
- Playwright/Chromium for Storybook browser tests

## Token Import
- SCSS: `@use '../../../theme/tokens' as *`
- Source of truth: `src/theme/tokens.scss` (NOT CLAUDE.md — there are documented discrepancies)

## Known Deviations from CLAUDE.md Rules
1. Only 11/55 components use forwardRef (should be all interactive)
2. Only 9/55 components spread ...rest props
3. 4 components have default exports (AddressCard, PaymentMethodCard, CategoryIcon, CategoryIconRow)
4. 0 components use useControllableState
5. CountdownTimer doesn't use useCountdown hook
6. Skeleton.module.scss uses deprecated darken()
7. 0 stories have play functions
8. ~20/55 props types exported from main barrel
