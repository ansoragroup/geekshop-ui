Audit and fix design token compliance across GeekShop UI components.

Arguments: $ARGUMENTS (optional: component name, category, or "all")

## Purpose
Ensures every component uses design tokens correctly — border-radius, spacing, colors, shadows, typography, z-index from `src/theme/tokens.scss`. Catches hardcoded values that bypass the design system.

## Instructions

### Step 1: Determine scope
- If argument is a component name: audit that component only
- If argument is a category (product, navigation, etc.): audit all components in that category
- If argument is "all" or empty: audit EVERY component. Create a checklist, track progress, report remaining.

### Step 2: Read design tokens
Read `src/theme/tokens.scss` for the canonical token values. Key tokens to verify:

**Border Radius:**
- Cards: `$desktop-radius-card` (16px)
- Buttons: `$desktop-radius-button` (12px)
- Chips: `$desktop-radius-chip` (20px)
- Inputs: `$desktop-radius-input` (12px)
- Banners: `$desktop-radius-banner` (20px)

**Spacing:**
- Must use `$spacing-*` or `$desktop-spacing-*` tokens
- No magic pixel numbers (12px should be `$spacing-md` or `$desktop-spacing-sm`)

**Colors in SCSS:**
- Must use `var(--gs-*)` CSS custom properties for runtime colors
- Must use `$token` SCSS vars only for compile-time values (breakpoints, z-index)
- No hardcoded hex in .module.scss files

**Colors in TSX:**
- No `#XXXXXX` hex values — use `var(--gs-*)` or `currentColor`
- Exception: brand logos (Visa, UzCard, etc.)

**Shadows:**
- Must use `$shadow-*` or `$desktop-shadow-*` tokens
- No hardcoded `box-shadow` with raw rgba values

**Typography:**
- Must use `$font-size-*` or `$desktop-font-size-*` tokens
- Must use `$font-weight-*` tokens
- No hardcoded `font-size: 14px` — use `$font-size-md`

**Z-index:**
- Must use `$z-index-*` scale
- No hardcoded z-index numbers

### Step 3: For EACH component, check SCSS file for:
1. `border-radius` — uses `$radius-*` or `$desktop-radius-*` token?
2. `padding`/`margin`/`gap` — uses `$spacing-*` or `$desktop-spacing-*`?
3. `color`/`background` — uses `var(--gs-*)`?
4. `box-shadow` — uses `$shadow-*` or `var(--gs-shadow-*)`?
5. `font-size` — uses `$font-size-*` or `$desktop-font-size-*`?
6. `font-weight` — uses `$font-weight-*`?
7. `z-index` — uses `$z-index-*`?
8. Any raw pixel values that should be tokens

### Step 4: Fix violations
- Replace hardcoded values with correct tokens
- If no matching token exists, document it as a gap

### Step 5: Verify
- `npx tsc --noEmit` — 0 errors
- Start Storybook and visually verify changed components haven't broken

### Step 6: Report
Output compliance scorecard:
- Total components checked
- PASS / FAIL counts
- For each fail: file, line, violation, fix applied
- Design token gaps (values used that have no token)
