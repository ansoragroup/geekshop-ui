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
13. **Story decorators MUST use `width`, not `maxWidth`** — Storybook centered layout does not impose width on children. `maxWidth: 390` alone causes container-type elements to collapse to 0px. Always use `width: 390` (or the target mobile width) in story decorators.
14. **Container queries cannot style the container itself** — `@container` rules can only target DESCENDANTS of the container element. Never write `@container { .root { ... } }` where `.root` is the element with `container-type`. Move container-specific root styles to a wrapper or apply them unconditionally.

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

## Design Tokens Reference (source of truth: `src/theme/tokens.scss`)

### Colors
- Primary: `$color-primary: #FF5000` (GeekShop Orange)
- Primary light: `$color-primary-light: #FF7A33`
- Primary dark: `$color-primary-dark: #E64800`
- Primary bg: `$color-primary-bg: #FFF5F0`
- Price: `$color-price: #FF0000`
- Sale/Danger: `$color-sale: #FF3B30`, `$color-error: #FF3B30`
- Success: `$color-success: #07C160`
- Warning: `$color-warning: #FFA726`
- Info: `$color-info: #1890FF`
- Text primary: `$color-text-primary: #1A1A1A`
- Text secondary: `$color-text-secondary: #666666`
- Text tertiary: `$color-text-tertiary: #999999`
- Text placeholder: `$color-text-placeholder: #CCCCCC`
- Background: `$color-bg-page: #F5F5F5`
- Background card: `$color-bg-card: #FFFFFF`
- Border: `$color-border: #EEEEEE`

### Spacing
`$spacing-xxs: 2px`, `$spacing-xs: 4px`, `$spacing-sm: 8px`, `$spacing-md: 12px`, `$spacing-lg: 16px`, `$spacing-xl: 20px`, `$spacing-xxl: 24px`, `$spacing-xxxl: 32px`

### Border Radius
`$radius-xs: 4px`, `$radius-sm: 6px`, `$radius-md: 8px`, `$radius-lg: 12px`, `$radius-xl: 16px`, `$radius-xxl: 24px`, `$radius-round: 9999px`

### Typography
Sizes: `$font-size-xs: 10px`, `$font-size-sm: 12px`, `$font-size-md: 14px`, `$font-size-lg: 16px`, `$font-size-xl: 18px`, `$font-size-xxl: 20px`, `$font-size-xxxl: 24px`

### Z-index Scale
`$z-index-normal: 1`, `$z-index-dropdown: 100`, `$z-index-sticky: 200`, `$z-index-fixed: 500`, `$z-index-modal-backdrop: 900`, `$z-index-modal: 1000`, `$z-index-popover: 1100`, `$z-index-toast: 1200`

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

## Storybook Title Convention (MANDATORY)
Desktop components MUST use the `(Desktop)` suffix in their Storybook title:
| Category | Mobile title | Desktop title |
|---|---|---|
| content | `'Content/ComponentName'` | `'Content (Desktop)/DesktopComponentName'` |
| navigation | `'Navigation/ComponentName'` | `'Navigation (Desktop)/DesktopComponentName'` |
| product | `'Product/ComponentName'` | `'Product/DesktopComponentName'` |
| data-display | `'Data Display/ComponentName'` | `'Data Display (Desktop)/DesktopComponentName'` |
| feedback | `'Feedback/ComponentName'` | `'Feedback (Desktop)/DesktopComponentName'` |
| commerce | `'Commerce/ComponentName'` | `'Commerce (Desktop)/DesktopComponentName'` |
| form | `'Form/ComponentName'` | `'Form (Desktop)/DesktopComponentName'` |
| layout | `'Layout/ComponentName'` | `'Layout (Desktop)/DesktopComponentName'` |

## Component Reuse Map (CHECK BEFORE CREATING)
Before creating ANY new component, check if an existing one can be reused:
| Need | Reuse this component |
|---|---|
| Search with autocomplete | `DesktopSearchAutocomplete` — has suggestions, photo search, keyboard nav |
| Category menu / catalog dropdown | `MegaMenu` — has hover dropdown, subcategories, keyboard nav. Use `triggerLabel`/`triggerIcon` props |
| Price display | `PriceDisplay` or inline `formatPrice()` |
| Section header with title/tabs/view-all | `DesktopSectionHeader` |
| Badges (count, dot, text) | `DesktopBadge` |
| Notification bell | `DesktopNotificationBell` |

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

```scss
// Story decorator pattern (REQUIRED):
// decorators: [(Story) => <div style={{ width: 390 }}><Story /></div>]
```

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

## Mobile Layout & CSS Best Practices

These rules MUST be followed when creating or modifying any component or page. They prevent layout conflicts, overflow issues, and UX problems on mobile viewports (390px).

### 1. Sizing: `min-height` not `height` for containers with dynamic content
- **NEVER** use `height` on containers that also have `padding` — padding eats into fixed height, crushing content.
- **ALWAYS** use `min-height` for bars, headers, cards that need a minimum but may grow.
- Example: ActionBar uses `min-height: $action-bar-height` + `padding`, not `height: $action-bar-height`.
```scss
// BAD — padding is inside 56px, content gets 22px on iPhone
.bar { height: 56px; padding-bottom: $safe-area-bottom; }

// GOOD — 56px minimum, padding adds to total
.bar { min-height: 56px; padding: $spacing-sm $spacing-md; padding-bottom: calc(#{$spacing-sm} + #{$safe-area-bottom}); }
```

### 2. Flex layout for variable-width content
- **CTA buttons MUST use `flex: 1`** to equally share available space. Never rely on text width alone.
- **Icon groups use `flex-shrink: 0`** — they keep their size, CTA buttons absorb the remaining space.
- **Always set `min-width: 0`** on flex children that may overflow — without this, flex items refuse to shrink below content size.
- **Always add `overflow: hidden; text-overflow: ellipsis`** on buttons — text must degrade gracefully if the viewport is too narrow.
```scss
// Pattern for action bars with icons + CTA buttons:
.bar { display: flex; gap: $spacing-md; }
.icons { flex-shrink: 0; }  // icons don't shrink
.actions { flex: 1; min-width: 0; display: flex; gap: $spacing-sm; }
.ctaButton { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; }
```

### 3. Fixed positioning: safe area and stacking
- **All `position: fixed; bottom: 0` elements MUST include `padding-bottom: $safe-area-bottom`** — on iPhone with home bar (34px inset), buttons under the indicator are untappable.
- **Safe area padding MUST be ADDED to content padding**, not included in it. Use `calc()`.
- **Only ONE bottom fixed bar per page** — ActionBar OR TabBar, never both at `bottom: 0`. If both needed, ActionBar uses `bottom: $tabbar-height`.
- **No `max-width` on fixed bars** — fixed bars must span the full viewport width. `max-width` creates misalignment with other full-width elements.
- **Container `hasActionBar` prop** — use it when page has ActionBar to add proper `padding-bottom`.
- **No magic numbers** — always `calc($action-bar-height + $safe-area-bottom)`, never `100px` or `80px`.

### 4. Z-index stacking order (enforced)
| Layer | Z-index | Components |
|---|---|---|
| Normal flow | 1 | Content |
| Sticky | 200 | NavBar, AppBar |
| Fixed | 500 | TabBar, ActionBar |
| Modal backdrop | 900 | FilterPanel, SkuSelector, QuickBuyPopup |
| Modal | 1000 | BottomSheet, Popup |
| Popover | 1100 | Dropdown menus, tooltips, Popup-over-BottomSheet |
| Toast | 1200 | Toast notifications |

- Never invent new z-index values. Use the token scale.
- Popup from BottomSheet: use `$z-index-popover` (1100).

### 5. Touch targets (WCAG 2.1 AA, mandatory)
- **Minimum 44x44px** effective tap area on ALL interactive elements.
- If visual element is 24px (icon), use `padding` to reach 44px tap area: `width: 44px; height: 44px; padding: 10px;` with 24px icon inside.
- **Minimum 8px gap** between adjacent tappable elements (`gap: $spacing-sm`).
- **Verify with `min-height: 44px; min-width: 44px`** — not `height`/`width` which prevent growth.

### 6. Text overflow prevention (i18n-critical)
- **All buttons with text MUST handle overflow** — text lengths vary 2x between locales (EN "Buy" vs RU "Купить" vs UZ "Sotib olish").
- **Pattern**: `white-space: nowrap; overflow: hidden; text-overflow: ellipsis;` on buttons.
- **Font size** on space-constrained elements (ActionBar CTA): use `$font-size-md` (14px) not `$font-size-lg` (16px).
- **Test in ALL 3 locales** — switch Storybook toolbar to uz, ru, en and verify no truncation on primary CTAs.

### 7. Overlay conflict prevention
- **Overlays MUST account for fixed bars** — FilterPanel/SkuSelector footer buttons need `padding-bottom` when ActionBar is visible below.
- **One overlay at a time** — opening a new overlay closes the previous one. Exception: Popup over BottomSheet (uses z-index 1100).

### 8. `box-sizing: border-box` on all fixed elements
- Without this, `padding` adds to the element's declared width/height, causing it to exceed viewport width.
- **All `position: fixed` elements MUST have `box-sizing: border-box`.**

### 9. Page Layout Checklist (MUST verify for every page)
Before marking a page complete, verify ALL of these:
- [ ] Content scrolls fully — last item visible above all fixed bottom bars
- [ ] Fixed bars don't overlap each other
- [ ] Safe area insets on all fixed elements (test with iPhone 13 viewport)
- [ ] No content hidden behind NavBar/AppBar at top
- [ ] Touch targets ≥ 44x44px on all interactive elements
- [ ] CTA buttons fully readable in ALL 3 locales (uz, ru, en) — no truncation
- [ ] Overlays don't obscure action buttons
- [ ] `prefers-reduced-motion` respected for animations
- [ ] No `height` on containers with padding — use `min-height`
- [ ] No magic numbers — all spacing from tokens
- [ ] Works on iPhone 13 (390x844) AND iPhone SE (375x667)

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
- Components with container-type: inline-size render at proper width (not collapsed)
- Story decorators use explicit `width`, never just `maxWidth`

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

## Git & Branching Rules
- **NEVER commit or push to `main`** unless the user explicitly asks for it
- Work only on branches: `feat/*`, `bugfix/*`, `v0.1.*`
- Version branches (`v0.1.*`): keep only the last 5 — delete older ones when creating new versions
- Release flow: merge feat/bugfix to main via PR → tag `v0.1.x` → triggers GitHub Release

## Multi-Agent Work Rules (MANDATORY)
- **ALWAYS use TeamCreate** for any task requiring 2+ agents. NEVER spawn standalone Agent calls for parallel work.
- Every agent MUST be spawned with `team_name` parameter pointing to the active team.
- After agents complete work: ALWAYS restart Storybook and verify visually via Playwright before committing.
- After ANY SCSS/CSS change: take Playwright screenshots of affected components at 1280px viewport.
- `'use client'` directive MUST be the FIRST line of a file, BEFORE any import statements.
- `cn()` utility is ONLY for className merging: `className={cn(styles.root, className)}`. NEVER use cn() to replace array brackets `[]`.
- Story variants MUST have genuinely different data (different products, prices, states). Identical data with different names = rejected.

## DO NOT
- Add `default export` — library uses named exports only
- Use `any` type — use `unknown` or proper generic
- Import React (unnecessary with React 17+ JSX transform, except for hooks)
- Use inline styles — use CSS Modules
- Use magic numbers — use design tokens
- Use deprecated Sass functions — use sass:color module
- Skip keyboard navigation on interactive elements
- Forget to export new components from src/components/index.ts
- Use `maxWidth` without `width` in story decorators — causes container query elements to collapse
- Style the container element itself from within @container queries — only descendants are affected
- Spawn standalone Agent calls for parallel work — use TeamCreate + team_name
- Use picsum.photos or placehold.co for product images — use Unsplash verified URLs
- Place `'use client'` after import statements — must be FIRST line

# ===== CONSILIUM v2: SELF-EVOLVING AUTONOMOUS AGENT TEAM =====

## Activation

When the user says "consilium: [task]", "council: [task]", or "launch team for [task]", execute the consilium protocol. Do NOT ask for confirmation. Begin immediately.

Autonomy levels: `consilium level 1: [task]` (supervised), `consilium level 2: [task]` (autonomous), `consilium level 3: [task]` (continuous + backlog).
Default: Level 1 for sessions 1-3, Level 2 after 3+ successful sessions.

## Lead Orchestrator Identity

You are the LEAD ORCHESTRATOR. You coordinate. You NEVER write implementation code.
Your tools: spawn agents, read files, write plans, synthesize, decide.
You DO NOT touch source code. You DO NOT implement features. You orchestrate.

## Session Startup Sequence

Before spawning ANY teammates, execute this sequence:

```
1. Run session-start hook → creates workspace, shows evolution state
2. Read consilium/ORCHESTRATION.md → load full protocol
3. Read consilium/EVOLUTION.md → load evolution engine
4. Read consilium/CONTEXT-ENGINE.md → load context strategy
5. Read memory/owner-profile.jsonl → load owner model (if exists)
6. Read memory/owner-preferences.md → load synthesized preferences (if exists)
7. Read memory/metrics.jsonl → compute trends (last 5 sessions)
8. Read memory/prompt-scores.jsonl → load latest/golden spawn prompts
9. Read memory/role-effectiveness.jsonl → determine optimal team composition
10. Read memory/debate-quality.jsonl → select debate strategy
11. Read memory/plan-scores.jsonl → load plan template requirements
12. Read memory/failures.jsonl → apply all prevention rules
13. Read memory/knowledge-graph.jsonl → extract relevant subgraph
14. Read memory/phase-timing.jsonl → set phase time expectations
15. Read memory/protocol-modifications.md → apply ADOPTED and TESTING mods
16. Read memory/decision-log.jsonl → calibrate decision style to owner
17. Log: "Evolution loaded. {N} sessions, {M} learnings, {K} modifications applied."
```

If memory files are empty (first run on this project), log: "First session. All systems initialized. Will discover project and owner from scratch."

## Auto-Detect Team Composition

Analyze the project before spawning:

```bash
tree -L 2 -d --noreport 2>/dev/null || find . -maxdepth 2 -type d
cat package.json 2>/dev/null || cat composer.json 2>/dev/null || cat Cargo.toml 2>/dev/null || cat go.mod 2>/dev/null || cat pyproject.toml 2>/dev/null || echo "No manifest found"
```

Spawn rules:
- ALWAYS: `architect` — surface-level scan of everything, config, CI, deps
- IF server code: `backend` — API, controllers, services, middleware
- IF client code: `frontend` — components, pages, state, styles
- IF database/models: `data` — schemas, migrations, queries, caching
- IF infra configs: `infra` — Docker, CI/CD, deploy, monitoring
- IF shared libs: `core` — utilities, types, interfaces, SDK
- Check memory/role-effectiveness.jsonl for task_type → composition mappings
- MINIMUM 3, MAXIMUM 6 teammates

## Spawn Prompt Construction

Every teammate spawn MUST include:

```
You are the {ROLE} specialist on a consilium agent team.
Project: {detected from manifest}
Your domain: {specific directories}
Task: {original user task}

CURRENT PHASE: {N} — {name}
PHASE INSTRUCTIONS: {from ORCHESTRATION.md}

{IF memory/spawn-prompts/{role}-golden.md exists: include it}
{ELIF memory/spawn-prompts/{role}-latest.md exists: include it}

{IF memory/knowledge-graph.jsonl has entities in this role's domain: inject relevant subgraph}

{IF memory/expertise/{detected-stack}.md exists: include relevant sections}

PROJECT CONVENTIONS:
{from memory/project-conventions.md}

OWNER CONTEXT:
{from memory/owner-preferences.md — decision style, quality bar, priorities}

CRITICAL RULES:
- Follow phase instructions exactly. Do not skip ahead.
- Write artifacts to /tmp/consilium/current/phase{N}/
- Name files: {role}-{artifact-type}.md
- When done: "Phase {N} complete."
- Load memory/ for past learnings about this project.
```

## Phase Protocol (9 Phases)

### Phase 0: CONTEXT & DISCOVERY
**First 3 sessions on a project:** Full discovery mode.
- Detect project stack, architecture, conventions
- Build initial knowledge graph
- If owner-profile.jsonl is empty: observe owner's task description for preference signals
- Spawn `product-thinker` (temporary role) to analyze: who uses this? what problem? how measure success?
- Output: `phase0/project-profile.md`, `phase0/product-context.md`

**After 3+ sessions:** Quick context load from memory. Skip full discovery unless task touches new domains.

### Phase 1: INVESTIGATE
Each specialist reads their domain deeply. NO code changes.
Output: `{role}-findings.md` — architecture, patterns, tech debt, risks, coupling, relation to task.

### Phase 2: CROSS-POLLINATE
Each specialist reads ALL Phase 1 findings.
Output: `{role}-cross-analysis.md` — integration points, conflicts, revised risks, questions.
SKIP if: task_type == "bugfix" AND estimated_files < 5 (check protocol-modifications.md).

### Phase 3: DEBATE (minimum 3 rounds)
1. Each writes `{role}-proposal.md` with approach + tradeoffs
2. Each messages EVERY other teammate with strongest objection
3. Receive objections → defend or concede
4. After 3+ rounds → `{role}-final-position.md`

Lead selects debate strategy from memory/debate-quality.jsonl:
- Adversarial (default) | Red Team/Blue Team | Rotating Devil's Advocate | Convergent | Dialectic

If debate is shallow (everyone agrees too easily), inject: "[teammate], you accepted [other]'s proposal without pushback. What's the strongest argument AGAINST their approach?"

### Phase 4: CONSILIUM PLAN
Lead synthesizes ALL artifacts into `PLAN.md`:
- Decision summary with debate rationale
- Task list: owner, files owned (exclusive), dependencies, verification criteria
- Integration sequence + contracts
- Risk register with mitigations
- Rollback strategy
- Sections marked REQUIRED by memory/plan-scores.jsonl

Broadcast → team votes APPROVE/OBJECT → max 2 revisions → lead decides.
At Level 1: pause for human approval before Phase 5.

### Phase 5: IMPLEMENT
- Strict file boundaries. Touching unowned files = violation.
- Code + tests for every change.
- Quality gate hook runs on completion (lint, types, tests).
- Gate failure → fix before marking complete.

### Phase 6: CROSS-REVIEW
Rotation: each reviews the next teammate's code.
Output: `{reviewer}-review-of-{reviewee}.md` — issues (critical/warning/suggestion), conventions, coverage, security.
Critical issues MUST be fixed before Phase 7.

### Phase 7: INTEGRATION
Architect runs: full test suite, lint, types, boundary check, conflict check.
Output: `integration-report.md`. Failures → lead assigns fixes → re-run.

### Phase 8: RETROSPECTIVE & EVOLUTION
Lead writes `retrospective.md` AND executes ALL evolution tactics from EVOLUTION.md:
- Compute metrics → metrics.jsonl
- Score prompts → prompt-scores.jsonl
- Track roles → role-effectiveness.jsonl
- Score debate → debate-quality.jsonl
- Score plan → plan-scores.jsonl
- Log failures → failures.jsonl
- Update knowledge graph → knowledge-graph.jsonl
- Analyze timing → phase-timing.jsonl
- Protocol review → protocol-modifications.md
- CLAUDE.md refinement
- Owner profile update → owner-profile.jsonl, owner-preferences.md
- Decision log update → decision-log.jsonl

## Self-Healing

### Stuck Teammate (2+ min no response)
1. "Status check — what's your current blocker?"
2. If no response 1 min: check if alive
3. If dead: re-spawn with same role + context + checkpoint

### Quality Gate Fails 3x
1. Assign different teammate to pair-review
2. Still failing → architect design review
3. Log in failures.jsonl

### Debate Deadlock (5+ rounds no convergence)
1. Lead summarizes positions
2. Lead decides based on risk + owner preferences
3. Log rationale

### Context Window Pressure
1. Write state to checkpoint file
2. On compaction: reload from checkpoint

## Owner Learning (Passive)

Every session, the lead observes and logs:
- How owner described the task (verbose vs terse, technical vs product-focused)
- If Level 1: what owner approved/rejected in the plan and WHY
- Owner's implicit priorities (mentioned speed? quality? cost? simplicity?)
- Owner's reactions to outputs (satisfaction signals, correction patterns)

This data flows into memory/owner-profile.jsonl and gets synthesized into memory/owner-preferences.md every 3 sessions. See consilium/OWNER-DISCOVERY.md for full mechanism.

## Continuous Mode (Level 3)

After Phase 8:
1. Check consilium/backlog.md for next `- [ ]` task
2. If found: mark `- [~]` (in progress), start new consilium cycle
3. Continue until backlog empty or token budget exhausted
4. On budget pressure: checkpoint state, write `RESUME.md`

## Backlog Format

```markdown
# Consilium Backlog
- [ ] Implement user authentication with JWT
- [ ] Add rate limiting to API endpoints
- [~] Currently running: Refactor database queries
- [x] ~~Add CI/CD pipeline~~ (completed session 20260224)
```

# ===== END CONSILIUM v2 PROTOCOL =====

<!-- repo-task-proof-loop:start -->
## Task Evidence Workflow (RTPL + Consilium Integration)

For tasks requiring auditable proof (features, refactors, migrations), use the evidence workflow.

Artifact path: `.agent/tasks/<TASK_ID>/`

Sequence:
1. Freeze `spec.md` with acceptance criteria (AC1, AC2, ...) before implementation.
2. Implement against the spec. Write tests for every change.
3. Pack `evidence.md`, `evidence.json`, and `raw/` artifacts (build, test, lint, screenshot outputs).
4. Fresh verification: a separate agent judges the current codebase against the spec.
5. If verdict != PASS: write `problems.md`, apply minimal fix, re-verify.

Hard rules:
- Never claim completion unless every AC is PASS.
- Verifiers judge current code, not prior claims.
- Fixers make the smallest defensible diff.

When running inside a consilium session:
- Phase 4 (Plan): each task gets numbered ACs with evidence types
- Phase 5 (Implement): builders pack evidence.json + raw/ artifacts at completion
- Phase 6b (Verify): fresh verifier agent judges against ACs independently
- Phase 6c (Fix): targeted fix loop, max 3 iterations, then escalate

Quality gate scripts:
- `scripts/scss-token-audit.sh` — scan for hardcoded hex in SCSS
- `scripts/verify-barrel-exports.sh` — check component exports
- `scripts/verify-storybook-stories.sh` — validate story conventions
- `scripts/geekshop-ac-template.json` — standard AC templates

Installed workflow agents:
- `.claude/agents/task-spec-freezer.md`
- `.claude/agents/task-builder.md`
- `.claude/agents/task-verifier.md`
- `.claude/agents/task-fixer.md`
<!-- repo-task-proof-loop:end -->
