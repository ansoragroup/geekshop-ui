Review a GeekShop UI component for design system compliance.

Arguments: $ARGUMENTS (component name or PR diff)

Instructions:
1. Read CLAUDE.md for all component development rules
2. Read the target component's files (.tsx, .module.scss, .stories.tsx, .test.tsx, index.ts)

3. Check against this compliance checklist:

**TypeScript:**
- [ ] Props interface exported and named {ComponentName}Props
- [ ] No `any` types
- [ ] Union types for variants (not plain string)
- [ ] forwardRef used (if interactive)
- [ ] ...rest props spread on root element

**Styles:**
- [ ] CSS Modules (.module.scss)
- [ ] Tokens imported via @use
- [ ] No magic numbers (all values from tokens)
- [ ] No deprecated Sass functions
- [ ] container-type: inline-size (if should be responsive)
- [ ] prefers-reduced-motion respected
- [ ] CSS custom properties for themeable values

**Accessibility:**
- [ ] Proper semantic HTML (button for buttons, not div)
- [ ] aria-label on icon-only elements
- [ ] Keyboard navigation (Enter/Space on role="button")
- [ ] Focus trap on overlays
- [ ] aria-live on notifications

**Stories:**
- [ ] satisfies Meta pattern
- [ ] tags: ['autodocs']
- [ ] Default + variant stories
- [ ] Realistic data
- [ ] play function for interaction testing

**Tests:**
- [ ] Render test exists
- [ ] Interaction tests (if interactive)
- [ ] Accessibility tests
- [ ] Coverage meets target for category

**Exports:**
- [ ] Named export in index.ts
- [ ] Props type exported
- [ ] Added to src/components/index.ts

4. Report: PASS/FAIL per category, specific issues to fix, severity (critical/high/medium/low)
