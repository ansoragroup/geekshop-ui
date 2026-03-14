# GeekShop UI

An open-source React component library built for e-commerce applications. Mobile-first, accessible, and tree-shakeable.

[![npm version](https://img.shields.io/npm/v/@geekshop/ui.svg)](https://www.npmjs.com/package/@geekshop/ui)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![CI](https://github.com/ansoragroup/geekshop-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/ansoragroup/geekshop-ui/actions/workflows/ci.yml)
[![Storybook](https://img.shields.io/badge/storybook-live-ff4785.svg)](https://ansoragroup.github.io/geekshop-ui)

---

## Features

- **46+ components** across 8 categories, purpose-built for e-commerce
- **Mobile-first** design with responsive breakpoints (375px / 414px / 768px)
- **TypeScript** -- strict types, exported interfaces for every component
- **SCSS Modules** -- scoped styles with design tokens, no global CSS leaks
- **Storybook** -- interactive documentation with accessibility audits
- **Tree-shakeable** -- import only what you use
- **Accessible** -- WAI-ARIA patterns, keyboard navigation, screen reader support

## Installation

```bash
npm install @geekshop/ui
```

## Quick Start

```tsx
import { Button } from '@geekshop/ui';
import '@geekshop/ui/styles.css';

function App() {
  return (
    <Button variant="primary" size="lg" onClick={() => alert('Added to cart')}>
      Add to Cart
    </Button>
  );
}
```

## Component Categories

| Category | Components |
|---|---|
| **Commerce** | ActionBar, CartItem, QuantityStepper, QuickBuyPopup, SkuSelector |
| **Content** | CategoryIcon, CountdownTimer, CouponCard, DealCard, HeroBanner, PromoBanner, SectionHeader |
| **Data Display** | Avatar, Badge, OrderCard, OrderStatusBar, Rating, ReviewCard, SpecsTable, Tag |
| **Feedback** | BottomSheet, Empty, Loading, Popup, Toast |
| **Form** | Button, Checkbox, Input |
| **Layout** | Container, Divider, Grid, Section |
| **Navigation** | CategorySidebar, FilterBar, FilterPanel, NavBar, PopularSearches, SearchBar, SearchSuggestions, TabBar, TabFilter |
| **Product** | PriceDisplay, ProductCard, ProductCarousel, ProductGrid, ProductImageGallery |

## Theming

GeekShop UI uses CSS custom properties for theming. All tokens use the `--gs-*` prefix and can be overridden at any level of the DOM tree.

```css
:root {
  --gs-color-primary: #FF5000;
  --gs-color-primary-light: #FF7A33;
  --gs-color-primary-dark: #E64800;
  --gs-color-bg-page: #F5F5F5;
  --gs-radius-md: 8px;
  --gs-spacing-lg: 16px;
  --gs-font-size-md: 14px;
}
```

Override tokens to match your brand:

```css
:root {
  --gs-color-primary: #1A73E8;
  --gs-color-primary-light: #4A90D9;
  --gs-color-primary-dark: #1557B0;
}
```

## Documentation

Browse the full component documentation, live examples, and accessibility reports in [Storybook](https://ansoragroup.github.io/geekshop-ui).

## Contributing

Contributions are welcome. Please read the [Contributing Guide](./CONTRIBUTING.md) before opening a pull request.

## License

[MIT](./LICENSE) -- Copyright (c) 2025-present Ansora Group
