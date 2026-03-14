Audit and fix accessibility issues in GeekShop UI components.

Arguments: $ARGUMENTS (optional component name, or "all" for full audit)

Instructions:
1. Read CLAUDE.md for accessibility requirements (WCAG 2.1 AA)
2. If a specific component is given, read that component's .tsx and .module.scss files
3. If "all" or no arguments, scan all components in src/components/

Check for these accessibility issues:
- Missing aria-label on icon-only buttons
- Missing role attribute on interactive non-semantic elements (div with onClick)
- Missing keyboard handlers (onKeyDown for Enter/Space) on role="button" elements
- Missing focus trap on overlay components (BottomSheet, Popup, etc.)
- Missing aria-live on notification components (Toast)
- Missing htmlFor/id association on form labels
- Missing prefers-reduced-motion on animations
- Insufficient color contrast (check against WCAG AA: 4.5:1 for text, 3:1 for large text)
- Missing alt text on images
- Tab order issues (tabIndex values)

For each issue found:
1. Describe the WCAG criterion violated
2. Fix the issue directly in the code
3. If the component has a test file, add an accessibility test

After fixes, run: npm run lint
