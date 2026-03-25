# Task Spec: headless-architecture-batch4

## Metadata
- Task ID: headless-architecture-batch4
- Created: 2026-03-25
- Frozen: 2026-03-25
- Repo root: /Users/yishmael/Desktop/server/mine/geekshop.uz/design/component-library
- Package name: @ansoragroup/ui v0.4.1
- Branch: v5.1.0

## Guidance sources
- `/Users/yishmael/Desktop/server/mine/geekshop.uz/design/component-library/CLAUDE.md`
- `/Users/yishmael/Desktop/server/mine/geekshop.uz/design/component-library/package.json`
- `/Users/yishmael/Desktop/server/mine/geekshop.uz/design/component-library/vite.config.ts`
- `/Users/yishmael/Desktop/server/mine/geekshop.uz/design/component-library/src/hooks/useControllableState.ts`
- `/Users/yishmael/Desktop/server/mine/geekshop.uz/design/component-library/src/hooks/useFocusTrap.ts`
- `/Users/yishmael/Desktop/server/mine/geekshop.uz/design/component-library/src/components/navigation/Tabs/Tabs.tsx`
- `/Users/yishmael/Desktop/server/mine/geekshop.uz/design/component-library/src/components/feedback/Dialog/Dialog.tsx`

## Original task statement

Add a headless/unstyled architecture layer to the component library so developers can use our behavior logic without our styles.

Architecture approach: hooks-based headless (similar to React Aria, Downshift, Headless UI). Extract behavior into custom hooks that return props to spread onto user's elements.

Eight hooks to create:
1. `useAccordion` / `useCollapse` — expand/collapse with a11y
2. `useDialog` / `useModal` — focus trap, escape close, aria-modal
3. `useSlider` — thumb positioning, keyboard nav, range mode
4. `useSelect` / `useCombobox` — listbox pattern, keyboard nav, filtering
5. `useTooltip` — positioning, hover/focus trigger, delay
6. `useTabs` — tab/panel association, keyboard nav
7. `useMenu` — dropdown menu, keyboard nav, nested menus
8. `usePopover` — floating positioning, click-outside dismiss

File structure target: `src/headless/` with barrel export.

New package.json export: `"./headless"` pointing at separate ES/CJS/types build outputs.

After creating hooks, refactor 2–3 existing styled components to use the headless hooks internally:
- `Tabs` (navigation) → internally uses `useTabs`
- `Dialog` (feedback) → internally uses `useDialog`
- Third candidate: `Popover` (feedback) → internally uses `usePopover`

## Assumptions (narrowed from ambiguity)

A1. The `./headless` entry point is a new Vite build entry added to `vite.config.ts` `build.lib.entry` as a second entry alongside `src/components/index.ts`. The existing build output structure is preserved.

A2. `dist/headless/` is used for the types path in the new exports entry (parallel to how `dist/components/` serves types for the main entry today).

A3. "Zero CSS dependencies" means: headless hook files must not import any `.scss`, `.css`, or `.module.scss` file, and must not reference any `var(--gs-*)` tokens.

A4. `useCollapse` and `useAccordion` are implemented as a single file `useAccordion.ts` — `useCollapse` is exported as an alias from the same file. Similarly `useSelect` and `useCombobox` share `useSelect.ts`. `useDialog` and `useModal` share `useDialog.ts`.

A5. The refactored styled components (`Tabs`, `Dialog`, `Popover`) must have identical external APIs after refactoring — no prop changes, no behavior changes observable by consumers.

A6. Stories for headless hooks go into the existing Storybook under a new top-level `'Headless/{HookName}'` category. They demonstrate usage via render functions with zero GeekShop styles applied.

A7. Test coverage threshold for headless hooks is 95%+ (matching the existing hooks standard defined in CLAUDE.md).

A8. The `files` array in `package.json` must include `dist/headless` so the types directory is shipped in the npm package.

A9. `useTooltip` and `usePopover` handle positioning via CSS top/left values returned in a `floatingStyle` object — no third-party floating-ui dependency is introduced in this batch. Simple viewport-aware positioning (preferred above/below) is sufficient.

A10. `useMenu` supports one level of nesting (a menu item can have a `submenu` that also uses `useMenu` internally) but does not need infinite recursion support.

---

## Acceptance criteria

### AC1 — Directory structure exists
`src/headless/` exists and contains exactly these files:
- `useAccordion.ts`
- `useDialog.ts`
- `useSlider.ts`
- `useSelect.ts`
- `useTooltip.ts`
- `useTabs.ts`
- `useMenu.ts`
- `usePopover.ts`
- `index.ts`

Verification: filesystem check via `ls src/headless/`.

---

### AC2 — Headless barrel export
`src/headless/index.ts` exports all 8 hooks plus their public TypeScript types using named exports only (no default exports).

Exported names include at minimum:
`useAccordion`, `UseAccordionOptions`, `UseAccordionReturn`,
`useCollapse` (alias of useAccordion),
`useDialog`, `UseDialogOptions`, `UseDialogReturn`,
`useModal` (alias of useDialog),
`useSlider`, `UseSliderOptions`, `UseSliderReturn`,
`useSelect`, `UseSelectOptions`, `UseSelectReturn`,
`useCombobox`, `UseComboboxOptions`, `UseComboboxReturn`,
`useTooltip`, `UseTooltipOptions`, `UseTooltipReturn`,
`useTabs`, `UseTabsOptions`, `UseTabsReturn`,
`useMenu`, `UseMenuOptions`, `UseMenuReturn`,
`usePopover`, `UsePopoverOptions`, `UsePopoverReturn`.

Verification: `grep 'export' src/headless/index.ts` shows all names.

---

### AC3 — package.json exports entry
`package.json` `"exports"` field contains a `"./headless"` key with all three sub-fields:

```json
"./headless": {
  "import": "./dist/es/headless/index.mjs",
  "require": "./dist/cjs/headless/index.cjs",
  "types": "./dist/headless/index.d.ts"
}
```

The `"files"` array includes `"dist/headless"`.

Verification: parse `package.json`.

---

### AC4 — Vite build entry includes headless
`vite.config.ts` `build.lib.entry` is updated to an object (or array) form that includes both `src/components/index.ts` and `src/headless/index.ts` as named entries. The headless entry produces output paths under `dist/es/headless/` and `dist/cjs/headless/` matching the exports paths.

Verification: read `vite.config.ts`, confirm second entry present.

---

### AC5 — Zero CSS imports in headless hooks
No file under `src/headless/` contains an import statement that resolves to a `.scss`, `.css`, or `.module.scss` file. No file under `src/headless/` references `var(--gs-` or any hardcoded hex color.

Verification: `grep -r '\.scss\|\.css\|var(--gs-\|#[0-9a-fA-F]' src/headless/` returns zero matches.

---

### AC6 — Hook return shapes (contract)
Each hook returns an object with at minimum these fields:

| Hook | Required return fields |
|---|---|
| `useAccordion` | `items[].triggerProps`, `items[].panelProps`, `items[].isOpen`, `expandItem(key)`, `collapseItem(key)`, `toggleItem(key)` |
| `useDialog` | `overlayProps`, `dialogProps`, `closeButtonProps`, `isOpen`, `open()`, `close()` |
| `useSlider` | `trackProps`, `thumbProps` (or `thumbsProps` for range), `value` (number or [number, number]), `setValue`, `isFocused` |
| `useSelect` | `triggerProps`, `listboxProps`, `optionProps(item)`, `isOpen`, `selectedValue`, `activeIndex`, `open()`, `close()`, `selectOption(value)` |
| `useCombobox` | `inputProps`, `listboxProps`, `optionProps(item)`, `isOpen`, `inputValue`, `selectedValue`, `activeIndex`, `open()`, `close()`, `setInputValue` |
| `useTooltip` | `triggerProps`, `tooltipProps`, `floatingStyle`, `isVisible`, `show()`, `hide()` |
| `useTabs` | `tabListProps`, `tabProps(key)`, `panelProps(key)`, `activeKey`, `setActiveKey` |
| `useMenu` | `triggerProps`, `menuProps`, `itemProps(key)`, `isOpen`, `activeIndex`, `open()`, `close()`, `toggleOpen()` |
| `usePopover` | `triggerProps`, `popoverProps`, `floatingStyle`, `isOpen`, `open()`, `close()`, `toggle()` |

Verification: read each hook source file and confirm the return object shape against this table.

---

### AC7 — Keyboard navigation
Each hook implements the keyboard navigation required by its ARIA pattern:

| Hook | Required keyboard behavior |
|---|---|
| `useAccordion` | Enter/Space on trigger: toggle. Arrow Down/Up: move focus between triggers. Home/End: first/last trigger. |
| `useDialog` | Escape: close. Tab/Shift+Tab: cycle focus within dialog (reuses `useFocusTrap`). |
| `useSlider` | Arrow Left/Right (horizontal) or Up/Down (vertical): increment/decrement by step. Home/End: min/max. |
| `useSelect` | Enter/Space: open; Arrow Down/Up: navigate options; Enter: select; Escape: close; Home/End: first/last. |
| `useCombobox` | Arrow Down/Up: navigate options; Enter: select; Escape: close and clear or reset. |
| `useTooltip` | Escape: hide tooltip when focused. |
| `useTabs` | Arrow Left/Right: navigate tabs; Home/End: first/last tab. |
| `useMenu` | Enter/Space: open; Arrow Down/Up: navigate items; Escape: close; Arrow Right: open submenu; Arrow Left: close submenu. |
| `usePopover` | Escape: close. Click-outside: close. |

Verification: unit test assertions for each keyboard interaction.

---

### AC8 — WCAG 2.1 AA aria attributes
Props objects returned by each hook must include the correct aria attributes:

| Hook | Required aria attributes |
|---|---|
| `useAccordion` | `triggerProps`: `aria-expanded`, `aria-controls`. `panelProps`: `id`, `role="region"`, `aria-labelledby`. |
| `useDialog` | `dialogProps`: `role="dialog"` (or `"alertdialog"`), `aria-modal="true"`, `aria-labelledby` (when title id provided). `overlayProps`: `role="presentation"`. |
| `useSlider` | `thumbProps`: `role="slider"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext`. |
| `useSelect` | `triggerProps`: `role="combobox"`, `aria-haspopup="listbox"`, `aria-expanded`. `listboxProps`: `role="listbox"`. `optionProps`: `role="option"`, `aria-selected`. |
| `useCombobox` | `inputProps`: `role="combobox"`, `aria-autocomplete`, `aria-expanded`, `aria-activedescendant`. `listboxProps`: `role="listbox"`. |
| `useTooltip` | `triggerProps`: `aria-describedby`. `tooltipProps`: `role="tooltip"`, `id`. |
| `useTabs` | `tabListProps`: `role="tablist"`. `tabProps`: `role="tab"`, `aria-selected`, `aria-controls`. `panelProps`: `role="tabpanel"`, `aria-labelledby`. |
| `useMenu` | `triggerProps`: `aria-haspopup="menu"`, `aria-expanded`. `menuProps`: `role="menu"`. `itemProps`: `role="menuitem"`. |
| `usePopover` | `triggerProps`: `aria-haspopup`, `aria-expanded`. `popoverProps`: `role="dialog"`, `aria-modal`. |

Verification: unit test assertions on returned props objects.

---

### AC9 — Controlled + uncontrolled support
Each hook that manages open/value state (`useAccordion`, `useDialog`, `useSlider`, `useSelect`, `useCombobox`, `useTabs`, `useMenu`, `usePopover`) supports both controlled (via `value`/`isOpen` + `onChange`/`onOpenChange` props) and uncontrolled (via `defaultValue`/`defaultOpen`) usage by delegating to the existing `useControllableState` hook from `src/hooks/useControllableState.ts`.

Verification: each hook source imports `useControllableState`; tests cover both controlled and uncontrolled scenarios.

---

### AC10 — Refactored: Tabs uses useTabs
`src/components/navigation/Tabs/Tabs.tsx` is updated to internally call `useTabs` from `src/headless/useTabs.ts` for its active-key state and keyboard navigation. The component's external props interface (`TabsProps`) is unchanged. All existing Tabs tests continue to pass.

Verification: `grep 'useTabs' src/components/navigation/Tabs/Tabs.tsx` returns a match; `npm test -- --project unit` passes; Tabs stories render correctly.

---

### AC11 — Refactored: Dialog uses useDialog
`src/components/feedback/Dialog/Dialog.tsx` is updated to internally call `useDialog` from `src/headless/useDialog.ts` for its focus trap and keyboard/overlay logic. The component's external `DialogProps` interface is unchanged. All existing Dialog tests continue to pass.

Verification: `grep 'useDialog' src/components/feedback/Dialog/Dialog.tsx` returns a match; `npm test -- --project unit` passes.

---

### AC12 — Refactored: Popover uses usePopover
`src/components/feedback/Popover/Popover.tsx` is updated to internally call `usePopover` from `src/headless/usePopover.ts`. The component's external props interface is unchanged. All existing Popover tests continue to pass.

Verification: `grep 'usePopover' src/components/feedback/Popover/Popover.tsx` returns a match; `npm test -- --project unit` passes.

---

### AC13 — Test coverage >= 95% for headless hooks
Each headless hook file has a companion `*.test.ts` or `*.test.tsx` file in `src/headless/`. Coverage for lines, functions, and branches across all `src/headless/*.ts` files meets or exceeds 95% per file.

Tests cover:
- Uncontrolled default state
- Controlled state round-trip (calling `onChange`/`onOpenChange`)
- All keyboard interactions listed in AC7
- All aria props listed in AC8
- Edge cases: empty items, disabled items, single item

Verification: `npm run test:coverage` — `src/headless/**` coverage rows show >= 95%.

---

### AC14 — Storybook stories for headless hooks
Each of the 8 hooks has a story file at `src/headless/{hookName}.stories.tsx` with:
- `title: 'Headless/{HookName}'`
- `tags: ['autodocs']`
- A `Default` story showing the hook wired to plain HTML elements with zero GeekShop CSS classes
- A `Controlled` story showing a controlled usage example
- No import of any `.scss` or `.module.scss` file within the story

Verification: `ls src/headless/*.stories.tsx` lists 8 files; `npm run build-storybook` passes.

---

### AC15 — `npm run lint` passes with 0 errors
Running `npm run lint` from repo root against all new and modified files produces zero errors and zero warnings that were not already present before this task.

Verification: `npm run lint` exit code 0.

---

### AC16 — `npm test` passes
Running `npm test` (Vitest unit project) passes with zero test failures across existing tests AND new headless hook tests.

Verification: `npm test` exit code 0, all test suites green.

---

### AC17 — `npm run build:lib` succeeds
Running `npm run build:lib` produces:
- `dist/es/headless/index.mjs` (and per-module files with preserveModules)
- `dist/cjs/headless/index.cjs` (and per-module files)
- `dist/headless/index.d.ts` (TypeScript declarations)
- All previously-existing `dist/es/components/` and `dist/cjs/components/` outputs unaffected

Verification: `npm run build:lib` exit code 0; `ls dist/es/headless/` and `ls dist/cjs/headless/` and `ls dist/headless/` each list expected files.

---

### AC18 — Named exports only, no default exports
No file under `src/headless/` uses `export default`. Every export is a named export. Hook function names follow the `use{Name}` camelCase convention. Props interfaces follow `Use{Name}Options` / `Use{Name}Return` naming.

Verification: `grep 'export default' src/headless/*.ts` returns zero matches.

---

### AC19 — No new hardcoded hex in any modified SCSS
Any `.module.scss` files touched during the Tabs, Dialog, or Popover refactoring contain zero new hardcoded hex color values. All colors use `var(--gs-*)` tokens.

Verification: `scripts/scss-token-audit.sh` (if present) or `grep -n '#[0-9a-fA-F]\{3,6\}' src/components/navigation/Tabs/Tabs.module.scss src/components/feedback/Dialog/Dialog.module.scss src/components/feedback/Popover/Popover.module.scss` returns no NEW lines (lines not present before this task).

---

## Constraints

- Do not break existing component APIs. `TabsProps`, `DialogProps`, and `PopoverProps` interfaces must be byte-for-byte identical after refactoring.
- Headless hooks must import only from `react` and from `src/hooks/` (specifically `useControllableState`, `useFocusTrap`, `useControllableState`). No third-party dependencies may be added.
- `'use client'` directive is NOT added to headless hook files (hooks are not React Server Component boundaries; they are already client-only by nature of using React hooks, but the directive is only required on component `.tsx` files per project rules).
- Hook files are `.ts` (not `.tsx`) unless they return JSX, which they must not — hooks return props objects only.
- The new `./headless` build entry must use `preserveModules: true` identical to the existing components entry so every hook is tree-shakeable.
- Do not add new peer dependencies.
- Do not modify `src/components/index.ts` (headless hooks are NOT exported from the main package entry).

## Non-goals

- No changes to existing component APIs unless specified (Tabs, Dialog, Popover internal refactoring only; their public props are frozen).
- Not extracting ALL components to headless — only the 8 hooks listed above.
- Not building a full Radix-like primitive library with compound components.
- Not adding a documentation site for the headless API (Storybook stories are sufficient).
- Not adding floating-ui or @floating-ui/dom for precise positioning — simple offset-based positioning is acceptable for useTooltip and usePopover in this batch.
- Not implementing animations or transitions in headless hooks — that remains the responsibility of the consuming styled layer or user's CSS.
- Not publishing a separate npm package for headless — it ships as a sub-path export of the existing `@ansoragroup/ui` package.
- Not adding Playwright screenshot verification for headless hook stories (no visual design to verify; hooks produce no markup themselves).
- Not implementing virtual scrolling in `useSelect` or `useCombobox`.

## Verification plan

### Build verification
```bash
npm run build:lib
# Must exit 0.
# Then verify:
ls dist/es/headless/
ls dist/cjs/headless/
ls dist/headless/
```

### Lint
```bash
npm run lint
# Must exit 0 with zero errors.
```

### Unit tests
```bash
npm test -- --project unit
# Must exit 0, all suites green.
```

### Coverage
```bash
npm run test:coverage
# src/headless/** rows must show >= 95% lines/functions/branches.
```

### Zero CSS imports in headless
```bash
grep -rn '\.scss\|\.css\|var(--gs-\|#[0-9a-fA-F]' \
  /Users/yishmael/Desktop/server/mine/geekshop.uz/design/component-library/src/headless/
# Must return zero matches.
```

### No default exports in headless
```bash
grep -n 'export default' \
  /Users/yishmael/Desktop/server/mine/geekshop.uz/design/component-library/src/headless/*.ts
# Must return zero matches.
```

### package.json exports check
```bash
node -e "const p=require('./package.json'); console.log(JSON.stringify(p.exports['./headless'],null,2)); console.log(p.files.includes('dist/headless'))"
# Must print the three-field exports object and "true".
```

### Refactored component internal usage
```bash
grep 'useTabs'    src/components/navigation/Tabs/Tabs.tsx
grep 'useDialog'  src/components/feedback/Dialog/Dialog.tsx
grep 'usePopover' src/components/feedback/Popover/Popover.tsx
# Each must return at least one match.
```

### Storybook build (stories exist)
```bash
ls src/headless/*.stories.tsx | wc -l
# Must print 8.
npm run build-storybook
# Must exit 0.
```
