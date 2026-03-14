Create a new GeekShop UI component.

Arguments: $ARGUMENTS (format: "category/ComponentName" e.g. "feedback/Skeleton")

Instructions:
1. Parse the category and ComponentName from the arguments
2. Read CLAUDE.md for component development rules and design tokens
3. Read an existing component in the same category for reference patterns
4. Create the component folder at src/components/{category}/{ComponentName}/
5. Create these files following ALL rules from CLAUDE.md:
   - {ComponentName}.tsx — with forwardRef (if interactive), Props interface, prop spreading, CSS Module import
   - {ComponentName}.module.scss — with @use tokens, container queries if applicable, prefers-reduced-motion
   - {ComponentName}.stories.tsx — with satisfies Meta, tags: ['autodocs'], Default + variant stories, play function
   - {ComponentName}.test.tsx — render test, props test, keyboard nav test (if interactive), aria test
   - index.ts — named exports of component and props type
6. Add export to src/components/index.ts (maintain alphabetical order within category)
7. Verify build: run npm run lint and npm run build:lib
8. Visual QA: Start Storybook if not running (`npm run storybook`), use Playwright MCP to navigate to the new component's story at http://localhost:6006, take a screenshot, and verify the component renders correctly — no broken layout, proper spacing, readable text, matches visual density of other components in the same category
