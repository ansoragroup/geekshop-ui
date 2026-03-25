# Contributing to GeekShop UI

Thank you for your interest in contributing. This guide covers everything you need to get started.

## Prerequisites

- **Node.js** 22 or later
- **npm** (ships with Node)

## Setup

```bash
# Clone the repository
git clone https://github.com/ansoragroup/geekshop-ui.git
cd geekshop-ui

# Install dependencies
npm install

# Start Storybook (development server)
npm run storybook
```

Storybook will open at `http://localhost:6006`.

## Project Structure

```
src/
  components/
    commerce/         # Cart, checkout, purchasing components
    content/          # Banners, deals, promotional content
    data-display/     # Badges, ratings, order info, tables
    feedback/         # Toasts, popups, loading, empty states
    form/             # Button, Input, Checkbox
    layout/           # Container, Grid, Section, Divider
    navigation/       # NavBar, TabBar, search, filters
    product/          # Product cards, grids, galleries, pricing
  hooks/              # Shared React hooks
  pages/              # Full-page compositions (Storybook only)
  theme/
    tokens.scss       # SCSS design tokens
    global.scss       # Global resets and base styles
    index.ts          # TypeScript token export
  utils/              # Shared utility functions
```

Each component lives in its own folder:

```
components/form/Button/
  Button.tsx              # Component implementation
  Button.module.scss      # Scoped styles
  Button.stories.tsx      # Storybook stories
  index.ts                # Public re-export
```

## Creating a New Component

1. **Choose the correct category** from the list above.
2. **Create the folder** under `src/components/<category>/<ComponentName>/`.
3. **Create four files** following the naming convention:
   - `ComponentName.tsx`
   - `ComponentName.module.scss`
   - `ComponentName.stories.tsx`
   - `index.ts`
4. **Re-export** from `src/components/index.ts`.

## Component Development Rules

### TypeScript

- Use strict TypeScript. No `any` types.
- Export a `ComponentNameProps` interface for every component.
- Use named exports (not default-only). A default export may be added alongside the named export.

```tsx
export interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children?: ReactNode;
}

export function Button({ variant = 'primary', ...props }: ButtonProps) {
  // ...
}
```

### Refs and Prop Spreading

- Use `forwardRef` when the component renders a native DOM element that consumers may need to reference.
- Spread remaining props onto the root element so consumers can pass `className`, `data-*`, `aria-*`, and other standard attributes.

### Styling

- Use CSS Modules (`.module.scss` files). Never use global class names.
- Import design tokens from `@/theme/tokens.scss`.
- Follow mobile-first responsive design. Base styles target the smallest viewport; use `@media` for larger breakpoints.

### Accessibility

- Use semantic HTML elements (`button`, `nav`, `input`, not generic `div`).
- Include appropriate ARIA attributes when semantic HTML is not sufficient.
- Ensure keyboard navigation works (focus management, `tabIndex`, key handlers).
- Maintain sufficient color contrast ratios.

## Story Requirements

Every component must have a Storybook story file.

- Include the `autodocs` tag in the story meta so documentation pages are generated automatically.
- Write at least a `Default` story.
- Add interaction tests using `play` functions where applicable.

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Form/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Click me',
    variant: 'primary',
  },
};
```

## Testing

- Tests run via Vitest with @testing-library/react using the jsdom environment.
- Storybook interaction tests complement unit tests via play functions.
- Playwright MCP is used separately for visual QA in Storybook (not part of `npm test`).
- Run tests locally before pushing:

```bash
npm run test
```

## Pull Request Process

### Branch Naming

Use descriptive branch names with a prefix:

- `feat/component-name` -- new component or feature
- `fix/issue-description` -- bug fix
- `docs/what-changed` -- documentation only
- `refactor/what-changed` -- code refactoring

### Commit Messages

Use clear, imperative-mood commit messages:

```
feat(Button): add loading state with spinner animation
fix(ProductCard): correct price alignment on small screens
docs: update contributing guide with testing section
```

### Review Checklist

Before requesting review, confirm:

- [ ] All tests pass (`npm run test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Accessibility checks pass in Storybook's a11y addon
- [ ] Storybook stories are added or updated
- [ ] TypeScript types are exported
- [ ] Component works at all three breakpoints (375px, 414px, 768px)

### Submitting

1. Fork the repository and create your branch from `main`.
2. Make your changes following the rules above.
3. Push to your fork and open a pull request against `main`.
4. Fill out the pull request template.
5. Wait for review. Address any feedback and push follow-up commits.

## Code Style

- **TypeScript strict mode** is enabled. Do not suppress type errors.
- **Named exports** for all components and types.
- **Props interface naming**: `ComponentNameProps` (e.g., `ButtonProps`, `ProductCardProps`).
- **No inline styles** -- use SCSS Modules.
- **No `console.log`** in committed code.

## Questions?

Open a [GitHub issue](https://github.com/ansoragroup/geekshop-ui/issues) or start a discussion. We are happy to help.
