# GeekShop UI

An open-source React component library for e-commerce applications. Mobile-first, accessible, tree-shakeable, with built-in i18n and multi-currency support.

[![npm version](https://img.shields.io/npm/v/@ansoragroup/ui.svg)](https://github.com/ansoragroup/geekshop-ui/packages)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![CI](https://github.com/ansoragroup/geekshop-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/ansoragroup/geekshop-ui/actions/workflows/ci.yml)
[![Storybook](https://img.shields.io/badge/storybook-live-ff4785.svg)](https://ansoragroup.github.io/geekshop-ui)

## Installation

The package is published to GitHub Packages. Add a `.npmrc` file to your project root:

```
@ansoragroup:registry=https://npm.pkg.github.com
```

Then install:

```bash
npm install @ansoragroup/ui
```

## Quick Start

```tsx
import { Button } from '@ansoragroup/ui'
import '@ansoragroup/ui/styles'

function App() {
  return (
    <Button variant="primary" size="lg" onClick={() => alert('Added to cart')}>
      Add to Cart
    </Button>
  )
}
```

## GeekShopProvider

Wrap your app with `GeekShopProvider` for i18n, currency formatting, and theming:

```tsx
import { GeekShopProvider } from '@ansoragroup/ui'

function App({ children }) {
  return (
    <GeekShopProvider locale="ru" currency="UZS">
      {children}
    </GeekShopProvider>
  )
}
```

## Components

57 components across 8 categories, plus 4 shared hooks.

| Category | Count | Components |
|---|---|---|
| **Commerce** | 7 | ActionBar, CartItem, QuantityStepper, QuickBuyPopup, SkuSelector, AddressCard, PaymentMethodCard |
| **Content** | 9 | HeroBanner, PromoBanner, CountdownTimer, DealCard, CouponCard, CategoryIcon, CategoryIconRow, SectionHeader, NoticeBar |
| **Data Display** | 10 | Badge, Tag, Rating, Avatar, ReviewCard, OrderCard, SpecsTable, OrderStatusBar, ImageLazy, InfiniteScroll |
| **Feedback** | 9 | Toast, Popup, BottomSheet, Loading, Empty, Skeleton, ProductCardSkeleton, Swipe, PullToRefresh |
| **Form** | 3 | Button, Input, Checkbox |
| **Layout** | 4 | Container, Section, Divider, Grid |
| **Navigation** | 10 | AppBar, NavBar, SearchBar, TabBar, TabFilter, CategorySidebar, FilterBar, FilterPanel, PopularSearches, SearchSuggestions |
| **Product** | 5 | PriceDisplay, ProductCard, ProductGrid, ProductCarousel, ProductImageGallery |

## Dark Mode

GeekShop UI supports dark mode via CSS custom properties. Apply a `data-theme="dark"` attribute to your root element and override the relevant tokens:

```css
[data-theme='dark'] {
  --gs-color-bg-page: #1A1A1A;
  --gs-color-bg-card: #2A2A2A;
  --gs-color-text-primary: #F5F5F5;
  --gs-color-text-secondary: #AAAAAA;
  --gs-color-border: #3A3A3A;
}
```

## Theming

All design tokens use the `--gs-*` CSS custom property prefix and can be overridden at any level of the DOM tree:

```css
:root {
  --gs-color-primary: #1A73E8;
  --gs-color-primary-light: #4A90D9;
  --gs-color-primary-dark: #1557B0;
  --gs-radius-md: 8px;
  --gs-spacing-lg: 16px;
}
```

## i18n

Built-in internationalization with 3 locales and 4 currencies.

**Supported locales:** `uz` (O'zbek), `ru` (Русский), `en` (English)

**Supported currencies:** `UZS`, `USD`, `RUB`, `EUR`

Use the `useGeekShop` hook inside components for translations and price formatting:

```tsx
import { useGeekShop } from '@ansoragroup/ui'

function Price({ amount }: { amount: number }) {
  const { formatPrice, t } = useGeekShop()
  return <span>{formatPrice(amount)}</span>
}
```

## Framework Support

| Framework | Setup |
|---|---|
| **Next.js (App Router)** | Import styles in `app/layout.tsx`. Wrap with `GeekShopProvider`. |
| **Next.js (Pages Router)** | Import styles in `_app.tsx`. Wrap with `GeekShopProvider`. |
| **Vite** | Import styles in `main.tsx`. Wrap with `GeekShopProvider`. |
| **CRA** | Import styles in `index.tsx`. Wrap with `GeekShopProvider`. |

## Documentation

Browse the full component documentation, live examples, and accessibility reports in [Storybook](https://ansoragroup.github.io/geekshop-ui).

## Contributing

Contributions are welcome. Please read the [Contributing Guide](./CONTRIBUTING.md) before opening a pull request.

## License

[MIT](./LICENSE) -- Copyright (c) 2025-present Ansora Group
