# Spec: new-primitives-batch3

**Task ID:** new-primitives-batch3
**Date frozen:** 2026-03-25
**Branch target:** feat/new-primitives-batch3 (never main)

---

## Original Task Statement

Add 4 missing primitive components that the competitive analysis identified as gaps vs shadcn/ui and NutUI. Each component needs mobile + desktop variants: DataTable, Slider, TreeView, TimePicker.

---

## Scope Summary

8 new components total (4 mobile + 4 desktop) across 2 categories:

| Component | Category | Variant |
|---|---|---|
| `DataTable` | `data-display` | mobile |
| `DesktopDataTable` | `data-display` | desktop |
| `Slider` | `form` | mobile |
| `DesktopSlider` | `form` | desktop |
| `TreeView` | `data-display` | mobile |
| `DesktopTreeView` | `data-display` | desktop |
| `TimePicker` | `form` | mobile |
| `DesktopTimePicker` | `form` | desktop |

---

## Assumptions (resolved narrowly)

**A1.** Drag-and-drop in `TreeView`/`DesktopTreeView` is excluded entirely from this release (see Non-goals). The `draggable` prop is not typed or documented.

**A2.** "Async loading" for `TreeView` means a `loadChildren` callback prop that receives a node id and returns `Promise<TreeNode[]>`. A loading spinner (reuse `Skeleton` rows) is shown in the expanded row while the promise resolves.

**A3.** `TimePicker` mobile bottom sheet reuses the existing `BottomSheet` component from `src/components/feedback/BottomSheet` — it does not reimplement an overlay.

**A4.** `DesktopTimePicker` uses `useFocusTrap` on the dropdown panel (same pattern as the existing `Select` component).

**A5.** `DataTable` "custom cell renderer" is implemented as `render?: (value: unknown, row: T) => ReactNode` on the column definition. The row generic `T` defaults to `Record<string, unknown>`.

**A6.** `DataTable` "sticky header" applies `position: sticky; top: 0` to the `<thead>` inside a scrollable wrapper. On mobile card layout there is no sticky header; the sticky header AC applies only to `DesktopDataTable`.

**A7.** Pagination is controlled: the components accept `page`, `pageSize`, `total`, and `onPageChange` props. `useControllableState` is used so uncontrolled usage (no `page` prop) also works. The existing `Pagination` component from navigation category may be reused for the pagination row if its API is compatible; if not, a simple prev/next row is sufficient.

**A8.** Storybook story titles follow the mandatory convention from CLAUDE.md:
- `'Data Display/DataTable'`, `'Data Display (Desktop)/DesktopDataTable'`
- `'Form/Slider'`, `'Form (Desktop)/DesktopSlider'`
- `'Data Display/TreeView'`, `'Data Display (Desktop)/DesktopTreeView'`
- `'Form/TimePicker'`, `'Form (Desktop)/DesktopTimePicker'`

**A9.** `Slider` vertical orientation is gated by `orientation?: 'horizontal' | 'vertical'` defaulting to `'horizontal'`. Vertical mode must still meet the 44px touch target requirement (44px wide track area).

**A10.** `DesktopSlider` tick marks are rendered as visual marks below the track when `marks` prop is provided. `marks` is typed as `Array<{ value: number; label?: string }>`.

**A11.** `DesktopTimePicker` scroll-wheel columns are implemented with CSS `overflow-y: scroll` + `scroll-snap-type: y mandatory` on each column. No third-party scroll library is used.

---

## Detailed Component Specs

---

### 1. DataTable

#### Mobile: `DataTable`

ASCII layout — card mode (container < 480px):

```
+---------------------------------------+
| [x] Product Name          ^ Price     |  <- sort row (optional)
+---------------------------------------+
| [x] +-----------------------------+   |
|     | Name:    iPhone 15 Pro      |   |
|     | Price:   12 990 000 sum     |   |
|     | Stock:   In stock           |   |
|     +-----------------------------+   |
| [x] +-----------------------------+   |
|     | ...                         |   |
|     +-----------------------------+   |
+---------------------------------------+
| [Prev]   Page 1 of 5   [Next]         |
+---------------------------------------+
```

ASCII layout — horizontal scroll mode (container >= 480px):

```
+-------------------------------------------------------------+
| [x] | Name           | Price      | Stock    | Actions     |
|-----+----------------+------------+----------+-------------|
| [x] | iPhone 15 Pro  | 12 990 000 | In stock | [Edit][Del] |
| [x] | Samsung S24    | 10 490 000 | In stock | [Edit][Del] |
|-----+----------------+------------+----------+-------------|
| [Prev]    Page 1 of 5    [Next]                            |
+-------------------------------------------------------------+
```

The mobile `DataTable` uses `container-type: inline-size` to switch between card and scroll layouts via `@container` queries.

Props interface (TypeScript):

```ts
export interface DataTableColumn<T = Record<string, unknown>> {
  key: string;
  title: string;
  sortable?: boolean;
  width?: number | string;
  render?: (value: unknown, row: T) => ReactNode;
}

export interface DataTableProps<T = Record<string, unknown>>
  extends HTMLAttributes<HTMLDivElement> {
  columns: DataTableColumn<T>[];
  data: T[];
  rowKey: keyof T | ((row: T) => string);
  // Selection
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  onSelectionChange?: (keys: string[]) => void;
  // Sorting
  sortKey?: string;
  sortDirection?: 'asc' | 'desc';
  onSortChange?: (key: string, direction: 'asc' | 'desc') => void;
  // Pagination
  page?: number;
  defaultPage?: number;
  pageSize?: number;
  total?: number;
  onPageChange?: (page: number) => void;
  // States
  loading?: boolean;
  empty?: ReactNode;
  // Display
  showHeader?: boolean;  // default true
}
```

#### Desktop: `DesktopDataTable`

Full `<table>` layout. Extends `DataTableProps` with:

```ts
export interface DesktopDataTableProps<T = Record<string, unknown>>
  extends DataTableProps<T> {
  stickyHeader?: boolean;
}
```

Features:
- `stickyHeader`: `position: sticky; top: 0` on `<thead>`.
- Sortable column headers: click cycles `none -> asc -> desc`. `aria-sort` attribute updates accordingly.
- Row selection via checkbox column at left edge.
- Loading state: 6 skeleton rows rendered using `Skeleton` component, one `Skeleton` per column cell.
- Empty state: renders the `empty` prop content centered in the table body.

ASCII layout (1280px):

```
+-----------------------------------------------------------------------+
| [x] | Name ^         | Category   | Price      | Stock  | Actions   |  <- sticky thead
|-----+----------------+------------+------------+--------+-----------|
| [x] | iPhone 15 Pro  | Mobile     | 12 990 000 | 42     | [E] [D]   |
| [x] | Samsung S24    | Mobile     | 10 490 000 | 18     | [E] [D]   |
| [x] | MacBook Air M3 | Laptops    | 38 990 000 | 7      | [E] [D]   |
|-----+----------------+------------+------------+--------+-----------|
|                      [< Prev]  1  2  3  [Next >]                    |
+-----------------------------------------------------------------------+
```

---

### 2. Slider

#### Mobile: `Slider`

ASCII layout — single value, horizontal:

```
|<---------●-------------------->|
           ^-- 44px touch target, 20px visual circle
  min=0                    max=100
```

ASCII layout — range mode, horizontal:

```
|<------●==============●-------->|
        from           to
```

Props interface:

```ts
export interface SliderMark {
  value: number;
  label?: string;
}

export interface SliderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  value?: number | [number, number];
  defaultValue?: number | [number, number];
  onChange?: (value: number | [number, number]) => void;
  min?: number;          // default 0
  max?: number;          // default 100
  step?: number;         // default 1
  range?: boolean;       // two-thumb mode
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
  marks?: SliderMark[];
  'aria-label'?: string;
  'aria-labelledby'?: string;
}
```

Touch target: thumb element has `min-width: 44px; min-height: 44px`. The visual circle (20px) is centered within the touch area. The track height is 4px.

Keyboard: focused thumb responds to `ArrowLeft`/`ArrowRight` (horizontal) or `ArrowUp`/`ArrowDown` (vertical) by `step`. `Home` moves to `min`, `End` moves to `max`.

ARIA: thumb `role="slider"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-orientation`.

#### Desktop: `DesktopSlider`

Same props as `Slider`. Additional behavior:
- Tooltip showing current value is shown on hover and focus above the thumb, hidden at rest.
- Tick marks rendered as visual marks below the track when `marks` is provided; labels appear under each mark.

The tooltip visibility is CSS-driven (`:hover`, `:focus-within` on the thumb wrapper) — no JS state needed.

---

### 3. TreeView

#### Mobile: `TreeView`

ASCII layout:

```
v Electronics
    > Phones
    v Laptops
        * MacBook Air        <- leaf node (bullet, no toggle)
        * Dell XPS 13
    > Tablets
> Clothing
```

- Row `min-height: 44px` (touch target).
- Indent: 20px per depth level (CSS custom property `--tree-indent: 20px`).
- Expand icon: `>` (collapsed) / `v` (expanded); hidden on leaf nodes.
- Loading per-node: shows a `Skeleton` row below the expanded node while `loadChildren` promise is pending.
- `searchQuery`: hides non-matching nodes; ancestors of matches remain visible.

Props interface:

```ts
export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  disabled?: boolean;
  icon?: ReactNode;
  /** Node can have children but they are not yet loaded */
  hasChildren?: boolean;
}

export interface TreeViewProps extends HTMLAttributes<HTMLDivElement> {
  nodes: TreeNode[];
  // Expand
  expandedIds?: string[];
  defaultExpandedIds?: string[];
  onExpandChange?: (ids: string[]) => void;
  // Selection (click/tap)
  selectedIds?: string[];
  defaultSelectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  selectable?: boolean;
  multiSelect?: boolean;
  // Checkboxes
  showCheckboxes?: boolean;
  checkedIds?: string[];
  defaultCheckedIds?: string[];
  onCheckChange?: (ids: string[]) => void;
  // Async loading
  loadChildren?: (id: string) => Promise<TreeNode[]>;
  // Search/filter
  searchQuery?: string;
}
```

#### Desktop: `DesktopTreeView`

Same props as `TreeView`. Additional behavior:
- Hover highlight on each row (CSS `:hover`).
- Full keyboard navigation:
  - `ArrowDown` / `ArrowUp`: move focus between visible nodes.
  - `ArrowRight`: if collapsed parent, expand it; if expanded parent, move focus to first child; if leaf, do nothing.
  - `ArrowLeft`: if expanded parent, collapse it; if child, move focus to parent.
  - `Enter` / `Space`: toggle selection or checkbox.
- ARIA: root `role="tree"`, each node `role="treeitem"`, `aria-expanded` (parents), `aria-selected`, `aria-disabled`, `aria-level` (depth).

---

### 4. TimePicker

#### Mobile: `TimePicker`

Opens a `BottomSheet`. Inside the sheet: scroll-wheel columns for hours, minutes, and (in 12h mode) AM/PM.

ASCII layout (inside bottom sheet):

```
+----------------------------------+
|  Select Time              [x]    |
| -------------------------------- |
|                                  |
|   10  :  30  |  AM               |  <- scroll columns; AM/PM only in 12h
|   11  :  45  |                   |
|  [12] : [00] | [PM]              |  <- selected row highlighted
|   01  :  15  |                   |
|   02  :  30  |                   |
|                                  |
|            [Confirm]             |
+----------------------------------+
```

Scroll wheels: `overflow-y: scroll` + `scroll-snap-type: y mandatory`. Each item has `scroll-snap-align: center`.

Props interface:

```ts
export interface TimePickerProps {
  value?: string;           // "HH:mm" (24h) or "hh:mm a" (12h)
  defaultValue?: string;
  onChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  format?: '12h' | '24h';   // default '24h'
  minuteStep?: number;      // default 1; common: 5, 15, 30
  minTime?: string;         // "HH:mm" — times before this are disabled
  maxTime?: string;         // "HH:mm" — times after this are disabled
  disabled?: boolean;
  placeholder?: string;
  /** Custom trigger element. Defaults to an Input-style button showing selected time */
  children?: ReactNode;
  className?: string;
}
```

`useControllableState` used for both `value`/`defaultValue` and `open`/`defaultOpen`.

#### Desktop: `DesktopTimePicker`

Dropdown panel (not a bottom sheet). Panel opens below the trigger input, or above if viewport clipping is detected (compare `getBoundingClientRect().bottom` against `window.innerHeight`).

ASCII layout:

```
+------------------------+
|  12:00          [o] v  |  <- trigger input (role="combobox")
+------------------------+
         v open
+---------------------------+
|  +------+ +------+ +----+ |
|  |  11  | |  45  | | AM | |  <- scrollable columns
|  | [12] | | [00] | | PM | |  <- selected (highlighted)
|  |  01  | |  15  | |    | |
|  +------+ +------+ +----+ |
|  Hour     Minute   Period  |
|  [Cancel]      [Confirm]   |
+---------------------------+
```

Props interface: same as `TimePickerProps` but without `open`/`defaultOpen`/`onOpenChange` (trigger controls open state), plus full `HTMLAttributes<HTMLDivElement>` on the root wrapper.

`useFocusTrap` applied to the dropdown panel div when open. Escape key closes the panel.

ARIA: trigger has `role="combobox"`, `aria-expanded`, `aria-haspopup="dialog"`. Panel has `role="dialog"`, `aria-modal="true"`, `aria-label="Select time"`.

---

## File Structure (per component)

Each of the 8 components lives in:

```
src/components/{category}/{ComponentName}/
  {ComponentName}.tsx
  {ComponentName}.module.scss
  {ComponentName}.stories.tsx
  {ComponentName}.test.tsx
  index.ts
```

All 8 components and their Props types are added as named exports in `src/components/index.ts`.

---

## Acceptance Criteria

### AC1 — File structure: all 8 component folders exist with all 5 required files

Verified folders and files:

```
src/components/data-display/DataTable/{DataTable.tsx, DataTable.module.scss, DataTable.stories.tsx, DataTable.test.tsx, index.ts}
src/components/data-display/DesktopDataTable/{DesktopDataTable.tsx, DesktopDataTable.module.scss, DesktopDataTable.stories.tsx, DesktopDataTable.test.tsx, index.ts}
src/components/data-display/TreeView/{TreeView.tsx, TreeView.module.scss, TreeView.stories.tsx, TreeView.test.tsx, index.ts}
src/components/data-display/DesktopTreeView/{DesktopTreeView.tsx, DesktopTreeView.module.scss, DesktopTreeView.stories.tsx, DesktopTreeView.test.tsx, index.ts}
src/components/form/Slider/{Slider.tsx, Slider.module.scss, Slider.stories.tsx, Slider.test.tsx, index.ts}
src/components/form/DesktopSlider/{DesktopSlider.tsx, DesktopSlider.module.scss, DesktopSlider.stories.tsx, DesktopSlider.test.tsx, index.ts}
src/components/form/TimePicker/{TimePicker.tsx, TimePicker.module.scss, TimePicker.stories.tsx, TimePicker.test.tsx, index.ts}
src/components/form/DesktopTimePicker/{DesktopTimePicker.tsx, DesktopTimePicker.module.scss, DesktopTimePicker.stories.tsx, DesktopTimePicker.test.tsx, index.ts}
```

Evidence: `ls` of each folder.

---

### AC2 — Barrel exports: all 8 components and their Props types exported from `src/components/index.ts`

The following named exports must appear in `src/components/index.ts`:

```
DataTable, DataTableProps, DataTableColumn
DesktopDataTable, DesktopDataTableProps
TreeView, TreeViewProps, TreeNode
DesktopTreeView, DesktopTreeViewProps
Slider, SliderProps, SliderMark
DesktopSlider, DesktopSliderProps
TimePicker, TimePickerProps
DesktopTimePicker, DesktopTimePickerProps
```

No `export default` in any of the 8 component files or their `index.ts` files.

Evidence: `grep "DataTable\|DesktopDataTable\|TreeView\|DesktopTreeView\|Slider\|DesktopSlider\|TimePicker\|DesktopTimePicker" src/components/index.ts` shows the expected exports. `grep "export default"` in all 8 component tsx and index files returns zero matches.

---

### AC3 — `'use client'` is the first line of every component `.tsx` file

Line 1 of each of the 8 `.tsx` implementation files reads `'use client'`, appearing before any import statements.

Evidence: `head -1` on each `.tsx` file.

---

### AC4 — Zero hardcoded hex colors in any `.module.scss` file

`grep -rn "#[0-9A-Fa-f]\{3,6\}"` across all 8 `.module.scss` files returns zero matches. All colors use `var(--gs-*)` CSS custom properties or SCSS token variables imported via `@use '../../../theme/tokens' as *`.

Evidence: grep output (empty = pass).

---

### AC5 — `npm run lint` passes with 0 errors

`npm run lint` exits with code 0. No ESLint errors reported.

Evidence: lint stdout/stderr and exit code.

---

### AC6 — `npm test` passes with coverage thresholds met

`npm test` exits with code 0.

Coverage thresholds (statements/lines):
- Form category (`Slider`, `DesktopSlider`, `TimePicker`, `DesktopTimePicker`): 85%+
- Data-display category (`DataTable`, `DesktopDataTable`, `TreeView`, `DesktopTreeView`): 60%+

Each test file covers at minimum:
- Renders without crashing
- Controlled mode: passing `value` + `onChange` updates state correctly
- Uncontrolled mode: `defaultValue` sets initial state
- Keyboard navigation (all interactive components)
- Correct aria attributes present

Evidence: test runner summary and coverage output.

---

### AC7 — `npm run build:lib` succeeds

`npm run build:lib` exits with code 0. The `dist/` directory contains compiled output for the 8 new components (verified by `ls dist/` showing new entries or no build errors).

Evidence: build stdout and exit code.

---

### AC8 — Playwright screenshot: mobile components at 390x844 viewport

4 screenshots captured via Playwright at 390x844 (iPhone 13 viewport), one per mobile story (Default story of each):

- `DataTable` Default
- `Slider` Default
- `TreeView` Default
- `TimePicker` Default

Visual checklist verified in each screenshot:
- No overflow, clipping, or unexpected horizontal scrollbar
- Proper spacing using design tokens (no magic numbers visible as suspicious pixel values)
- Touch targets appear visually adequate (>= 44px for thumbs, expand icons, checkboxes)
- Text readable, not truncated on primary content
- Component looks intentional and matches density of existing sibling components

Evidence: screenshots saved to `.agent/tasks/new-primitives-batch3/raw/screenshots/mobile/`.

---

### AC9 — Playwright screenshot: desktop components at 1280x800 viewport

4 screenshots captured via Playwright at 1280x800 viewport, one per desktop story (Default story):

- `DesktopDataTable` Default (sticky header visible)
- `DesktopSlider` Default (tooltip visible on hover)
- `DesktopTreeView` Default
- `DesktopTimePicker` Default (trigger + dropdown open state)

Same visual checklist as AC8.

Evidence: screenshots saved to `.agent/tasks/new-primitives-batch3/raw/screenshots/desktop/`.

---

### AC10 — Storybook story titles match mandatory convention

Story meta `title` in each stories file matches exactly:

| File | title |
|---|---|
| `DataTable.stories.tsx` | `'Data Display/DataTable'` |
| `DesktopDataTable.stories.tsx` | `'Data Display (Desktop)/DesktopDataTable'` |
| `TreeView.stories.tsx` | `'Data Display/TreeView'` |
| `DesktopTreeView.stories.tsx` | `'Data Display (Desktop)/DesktopTreeView'` |
| `Slider.stories.tsx` | `'Form/Slider'` |
| `DesktopSlider.stories.tsx` | `'Form (Desktop)/DesktopSlider'` |
| `TimePicker.stories.tsx` | `'Form/TimePicker'` |
| `DesktopTimePicker.stories.tsx` | `'Form (Desktop)/DesktopTimePicker'` |

Each stories file has `tags: ['autodocs']` in meta. Each has at least 2 stories (Default + one variant/state).

Evidence: grep for `title:` and `tags:` in each stories file.

---

### AC11 — Story decorators use `width` (not `maxWidth` alone) for container-query components

For components using `container-type: inline-size` (`DataTable`, `DesktopDataTable`, `TreeView`, `DesktopTreeView`), story decorators specify `style={{ width: N }}` (not `maxWidth` alone).

Evidence: grep for `maxWidth` in all 8 `.stories.tsx` files; any match must be accompanied by a `width` property on the same element.

---

### AC12 — `forwardRef`, prop spreading (`...rest`), and named Props interface exported

Each of the 8 `.tsx` files:
- Uses `forwardRef` from React
- Spreads `...rest` onto the root DOM element
- Exports a named `{ComponentName}Props` interface (not a type alias, though type is also acceptable per TypeScript conventions)

Evidence: grep for `forwardRef` and `\.\.\.rest` in each `.tsx` file.

---

### AC13 — `useControllableState` used in all value-bearing components

The following components import and use `useControllableState` from `../../../hooks/useControllableState`:
- `Slider.tsx` (for `value`/`defaultValue`)
- `DesktopSlider.tsx` (for `value`/`defaultValue`)
- `TimePicker.tsx` (for `value`/`defaultValue` and `open`/`defaultOpen`)
- `DesktopTimePicker.tsx` (for `value`/`defaultValue`)
- `DataTable.tsx` (for `page`/`defaultPage` and `selectedKeys`/`defaultSelectedKeys`)
- `DesktopDataTable.tsx` (same as DataTable)
- `TreeView.tsx` (for `expandedIds`/`defaultExpandedIds`, `selectedIds`/`defaultSelectedIds`, `checkedIds`/`defaultCheckedIds`)
- `DesktopTreeView.tsx` (same as TreeView)

Evidence: grep for `useControllableState` in each tsx file.

---

### AC14 — WCAG 2.1 AA keyboard accessibility and ARIA attributes

**Slider / DesktopSlider:**
- Thumb: `role="slider"`, `aria-valuenow={currentValue}`, `aria-valuemin={min}`, `aria-valuemax={max}`, `aria-orientation`.
- Responds to: `ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`, `Home`, `End`.
- Disabled state: `aria-disabled="true"`, no keyboard response.

**TreeView / DesktopTreeView:**
- Root: `role="tree"`.
- Each node: `role="treeitem"`, `aria-expanded` (on parent nodes), `aria-selected`, `aria-disabled` (when disabled), `aria-level`.
- DesktopTreeView additionally: `ArrowDown`/`ArrowUp` move focus; `ArrowRight` expands or descends; `ArrowLeft` collapses or ascends; `Enter`/`Space` toggles selection/checkbox.

**DataTable / DesktopDataTable:**
- Sortable column headers: `role="columnheader"`, `aria-sort="ascending"|"descending"|"none"`.
- Checkboxes: each has an accessible `aria-label` describing the row.
- Table: `role="table"` (or semantic `<table>` element).

**TimePicker / DesktopTimePicker:**
- Trigger: `role="combobox"`, `aria-expanded`, `aria-haspopup="dialog"`.
- Panel: `role="dialog"`, `aria-modal="true"`, `aria-label="Select time"`.
- Escape key closes the panel and returns focus to trigger.
- Disabled items: `aria-disabled="true"`.

Evidence: test assertions on aria attributes in each `.test.tsx` file.

---

### AC15 — `TimePicker` uses existing `BottomSheet`; `DesktopTimePicker` uses `useFocusTrap`

`TimePicker.tsx` imports `BottomSheet` from `../../feedback/BottomSheet`.
`DesktopTimePicker.tsx` imports `useFocusTrap` from `../../../hooks/useFocusTrap`.

Evidence: grep for these import paths in the respective files.

---

## Constraints

1. `'use client'` is the first line of every `.tsx` file, before any import statements.
2. No `export default` anywhere — named exports only.
3. No `any` type — use `unknown`, proper generics, or precise union types.
4. No inline styles — CSS Modules only.
5. No hardcoded hex values in `.module.scss` — all colors via `var(--gs-*)` or SCSS tokens.
6. No deprecated Sass functions (`darken`, `lighten`, etc.) — use `@use 'sass:color'` with `color.adjust()` / `color.scale()`.
7. Story decorators: use `width` (not `maxWidth` alone) for container-query components.
8. Container queries cannot style the container element itself — only descendants.
9. `container-type: inline-size` must always be paired with `width: 100%`.
10. No picsum.photos or placehold.co in stories — use realistic text-based data; product images use Unsplash verified URLs only.
11. `cn()` utility is only for className merging — never as a substitute for array brackets.
12. Do not `import React` at the top level (unnecessary with React 17+ JSX transform). Import individual hooks (`useState`, `useRef`, `forwardRef`, etc.) directly from `'react'`.
13. All spacing, sizing, and z-index values must come from design tokens — no magic numbers.
14. `min-height` not `height` on containers with padding (per mobile layout rules).
15. All interactive elements: minimum 44x44px effective tap area.

---

## Non-goals

- No changes to existing component APIs unless specified.
- No drag-and-drop in `TreeView` or `DesktopTreeView`.
- No Date+Time combined picker.
- No virtualized/windowed rendering (can be added in a future batch).
- No integration with any external table library.
- No server-side sorting or filtering — client-side only.
- No `DataTable` CSV/Excel export.
- No `TimePicker` seconds column (hours and minutes only).
- No RTL (right-to-left) layout support in this batch.

---

## Verification Plan

### Step 1 — Static checks (automated, must all pass)

```bash
# From repo root
npm run lint          # exit 0, zero ESLint errors
npm test              # exit 0, coverage thresholds met
npm run build:lib     # exit 0, dist/ populated
```

### Step 2 — Barrel export check

```bash
grep -n "DataTable\|DesktopDataTable\|TreeView\|DesktopTreeView\|Slider\|DesktopSlider\|TimePicker\|DesktopTimePicker" \
  src/components/index.ts
```

Expect lines for all 8 components and their Props types. Zero results from:

```bash
grep -rn "export default" \
  src/components/data-display/DataTable/ \
  src/components/data-display/DesktopDataTable/ \
  src/components/data-display/TreeView/ \
  src/components/data-display/DesktopTreeView/ \
  src/components/form/Slider/ \
  src/components/form/DesktopSlider/ \
  src/components/form/TimePicker/ \
  src/components/form/DesktopTimePicker/
```

### Step 3 — Hex audit

```bash
grep -rn "#[0-9A-Fa-f]\{3,6\}" \
  src/components/data-display/DataTable/DataTable.module.scss \
  src/components/data-display/DesktopDataTable/DesktopDataTable.module.scss \
  src/components/data-display/TreeView/TreeView.module.scss \
  src/components/data-display/DesktopTreeView/DesktopTreeView.module.scss \
  src/components/form/Slider/Slider.module.scss \
  src/components/form/DesktopSlider/DesktopSlider.module.scss \
  src/components/form/TimePicker/TimePicker.module.scss \
  src/components/form/DesktopTimePicker/DesktopTimePicker.module.scss
```

Expect zero output.

### Step 4 — `'use client'` first-line check

```bash
for f in \
  src/components/data-display/DataTable/DataTable.tsx \
  src/components/data-display/DesktopDataTable/DesktopDataTable.tsx \
  src/components/data-display/TreeView/TreeView.tsx \
  src/components/data-display/DesktopTreeView/DesktopTreeView.tsx \
  src/components/form/Slider/Slider.tsx \
  src/components/form/DesktopSlider/DesktopSlider.tsx \
  src/components/form/TimePicker/TimePicker.tsx \
  src/components/form/DesktopTimePicker/DesktopTimePicker.tsx; do
  echo "$f -> $(head -1 $f)"
done
```

All lines must read `'use client'`.

### Step 5 — Playwright visual verification

Start Storybook (`npm run storybook`), then via Playwright MCP:

For each of the 8 stories:
1. Navigate to `http://localhost:6006`.
2. Find the component story in the sidebar.
3. Set viewport to 390x844 (mobile) or 1280x800 (desktop).
4. Take screenshot and visually inspect.

Save 8 screenshots under `.agent/tasks/new-primitives-batch3/raw/screenshots/`.

### Step 6 — Accessibility spot check in browser DevTools

For each of the 4 interactive component types:
- `Slider`: keyboard-focus the thumb; verify `aria-valuenow` changes on arrow key press.
- `TreeView`: expand a node; verify `aria-expanded` toggles in DOM inspector.
- `DataTable`: click sortable column header; verify `aria-sort` changes.
- `TimePicker`/`DesktopTimePicker`: open picker; verify `role="dialog"` and `aria-modal="true"` on panel.

---

## Evidence Artifacts (to be produced by builder)

Saved under `.agent/tasks/new-primitives-batch3/`:

| Path | Content |
|---|---|
| `raw/lint.txt` | stdout of `npm run lint` |
| `raw/test.txt` | stdout of `npm test` |
| `raw/build.txt` | stdout of `npm run build:lib` |
| `raw/hex-audit.txt` | grep hex output (empty = pass) |
| `raw/barrel-exports.txt` | grep output for new exports in index.ts |
| `raw/use-client-check.txt` | head -1 of each tsx file |
| `raw/screenshots/mobile/datatable.png` | 390x844 screenshot |
| `raw/screenshots/mobile/slider.png` | 390x844 screenshot |
| `raw/screenshots/mobile/treeview.png` | 390x844 screenshot |
| `raw/screenshots/mobile/timepicker.png` | 390x844 screenshot |
| `raw/screenshots/desktop/desktop-datatable.png` | 1280x800 screenshot |
| `raw/screenshots/desktop/desktop-slider.png` | 1280x800 screenshot |
| `raw/screenshots/desktop/desktop-treeview.png` | 1280x800 screenshot |
| `raw/screenshots/desktop/desktop-timepicker.png` | 1280x800 screenshot |
| `evidence.json` | AC verdict map (AC1..AC15 -> PASS/FAIL, filled by verifier) |
