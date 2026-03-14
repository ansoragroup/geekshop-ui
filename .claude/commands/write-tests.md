Generate or update tests for GeekShop UI components.

Arguments: $ARGUMENTS (component name, category name, or "all")

Instructions:
1. Read CLAUDE.md for testing requirements and coverage targets
2. Identify target components based on arguments:
   - Specific component: "Button" → src/components/form/Button/
   - Category: "form" → all components in src/components/form/
   - "all" → all components in src/components/
3. For each component, read the .tsx file to understand:
   - All props and their types
   - Interactive behaviors (click, keyboard, state changes)
   - Conditional rendering logic
   - Event handlers and callbacks

4. Create/update {ComponentName}.test.tsx with:
   - Basic render test (does it render without crashing)
   - Props test (each variant/prop produces correct output)
   - Interaction tests (click, keyboard events, state changes)
   - Accessibility tests (correct roles, aria attributes, keyboard navigation)
   - Edge case tests (empty data, max values, undefined callbacks)

5. Use these testing patterns:
```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { ComponentName } from './ComponentName'

describe('ComponentName', () => {
  it('renders correctly', () => { ... })
  it('handles click events', async () => { ... })
  it('supports keyboard navigation', async () => { ... })
  it('has correct aria attributes', () => { ... })
})
```

6. After writing tests, run: npm test -- --reporter=verbose
7. Report coverage for the tested components
