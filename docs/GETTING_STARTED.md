# Getting Started with @ansoragroup/ui

Build an e-commerce storefront with GeekShop UI components in Next.js — from zero to a working product page in 15 minutes.

## Prerequisites

- Node.js 22+
- A GitHub account with a personal access token (PAT) that has `read:packages` scope

---

## 1. Create a Next.js project

```bash
npx create-next-app@latest my-store --typescript --tailwind --app --src-dir
cd my-store
```

## 2. Configure GitHub Packages registry

The library is published on GitHub Packages (not npm). Create `.npmrc` in your project root:

```bash
echo "@ansoragroup:registry=https://npm.pkg.github.com" > .npmrc
```

Authenticate with your GitHub token:

```bash
npm login --scope=@ansoragroup --registry=https://npm.pkg.github.com
# Username: your-github-username
# Password: ghp_YOUR_PERSONAL_ACCESS_TOKEN
# Email: your@email.com
```

Or set the token in `.npmrc` (for CI):

```
@ansoragroup:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

## 3. Install the package

```bash
npm install @ansoragroup/ui
```

The library has zero runtime dependencies — only `react` and `react-dom` as peer deps (which Next.js already provides).

## 4. Set up the Provider

Create `src/app/providers.tsx`:

```tsx
'use client';

import { GeekShopProvider } from '@ansoragroup/ui';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GeekShopProvider locale="en" currency="USD">
      {children}
    </GeekShopProvider>
  );
}
```

Supported locales: `'uz'` | `'ru'` | `'en'`
Supported currencies: `'UZS'` | `'USD'` | `'RUB'` | `'EUR'`

Wrap your layout in `src/app/layout.tsx`:

```tsx
import { Providers } from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

## 5. Your first component

Replace `src/app/page.tsx`:

```tsx
import { Button, PriceDisplay, ProductCard, Rating } from '@ansoragroup/ui';

export default function Home() {
  return (
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
      <h1>My Store</h1>

      {/* Simple button */}
      <Button variant="primary" size="lg">
        Shop Now
      </Button>

      {/* Price with original/sale */}
      <PriceDisplay price={299000} originalPrice={499000} />

      {/* Star rating */}
      <Rating value={4.5} max={5} showValue />

      {/* Product card */}
      <div style={{ maxWidth: 280 }}>
        <ProductCard
          image="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=400&fit=crop"
          title="ASUS ROG Strix RTX 4070 Ti Super OC 16GB"
          price={12500000}
          originalPrice={14000000}
          discount="-11%"
          rating={4.8}
          soldCount="345 purchased"
          badge="top"
          freeShipping
        />
      </div>
    </main>
  );
}
```

Run it:

```bash
npm run dev
```

Open http://localhost:3000 — you should see a styled button, formatted price, star rating, and a product card.

---

## 6. Build a product listing page

```tsx
'use client';

import { useState } from 'react';
import {
  DesktopHeader,
  DesktopProductGrid,
  DesktopSidebar,
  DesktopFooter,
  DesktopShell,
  DesktopTwoColumnLayout,
  DesktopBreadcrumbs,
} from '@ansoragroup/ui';

const products = [
  {
    id: 'gpu-1',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=400&fit=crop',
    title: 'ASUS ROG Strix RTX 4070 Ti Super OC 16GB',
    price: 12500000,
    originalPrice: 14000000,
    discount: '-11%',
    rating: 4.8,
    soldCount: '345 purchased',
    badge: 'top' as const,
    freeShipping: true,
  },
  {
    id: 'cpu-1',
    image: 'https://images.unsplash.com/photo-1555618568-bfe052310f39?w=400&h=400&fit=crop',
    title: 'AMD Ryzen 7 7800X3D Processor 4.2GHz 8-Core',
    price: 5400000,
    rating: 4.9,
    soldCount: '890 purchased',
    badge: 'hot' as const,
  },
  {
    id: 'kb-1',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
    title: 'Keychron Q1 Pro 75% Mechanical Keyboard',
    price: 2450000,
    originalPrice: 2800000,
    discount: '-13%',
    rating: 4.6,
  },
  // ... add more products
];

export default function ProductsPage() {
  const [sortBy, setSortBy] = useState('relevance');

  return (
    <DesktopShell>
      {/* Header */}
      <DesktopHeader
        logo={<span style={{ fontWeight: 700, fontSize: 20, color: '#FF5000' }}>MyStore</span>}
        searchPlaceholder="Search products..."
        cartCount={3}
      />

      {/* Breadcrumbs */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '12px 24px' }}>
        <DesktopBreadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Graphics Cards', href: '/gpu' },
          ]}
        />
      </div>

      {/* Two-column layout: sidebar + product grid */}
      <DesktopTwoColumnLayout
        sidebar={
          <DesktopSidebar
            categories={[
              { label: 'NVIDIA RTX 40xx', count: 48 },
              { label: 'AMD Radeon RX', count: 31 },
              { label: 'Intel Arc', count: 9 },
            ]}
            brands={[
              { name: 'ASUS', count: 24 },
              { name: 'MSI', count: 18 },
              { name: 'Gigabyte', count: 15 },
            ]}
          />
        }
      >
        <DesktopProductGrid
          products={products}
          sortOptions={[
            { label: 'Relevance', value: 'relevance' },
            { label: 'Price: Low to High', value: 'price-asc' },
            { label: 'Price: High to Low', value: 'price-desc' },
          ]}
          activeSortValue={sortBy}
          onSortChange={setSortBy}
          totalCount={195}
        />
      </DesktopTwoColumnLayout>

      {/* Footer */}
      <DesktopFooter
        columns={[
          { title: 'Help', links: [{ label: 'FAQ' }, { label: 'Returns' }] },
          { title: 'About', links: [{ label: 'About Us' }, { label: 'Careers' }] },
        ]}
        copyrightText="© 2026 MyStore"
      />
    </DesktopShell>
  );
}
```

---

## 7. Theming

### Preset themes

Switch the entire color scheme at runtime:

```tsx
import { setThemePreset } from '@ansoragroup/ui';

// Available presets: 'default' | 'teal' | 'red' | 'yellow' | 'green' | 'monochrome' | 'dark'
setThemePreset('teal');
```

### Custom CSS variables

Override any token via CSS:

```css
:root {
  --gs-color-primary: #7c3aed;       /* purple brand */
  --gs-color-primary-light: #a78bfa;
  --gs-color-primary-dark: #5b21b6;
  --gs-color-primary-bg: #f5f3ff;
}
```

### Dark mode

```tsx
setThemePreset('dark');
```

Or apply via HTML attribute for CSS-only switching:

```html
<html data-theme="dark">
```

---

## 8. Headless hooks (unstyled)

If you want behavior without our styles, import from the headless entry:

```tsx
import { useSlider, useTabs, useDialog, useSelect } from '@ansoragroup/ui/headless';

function MyCustomSlider() {
  const { trackProps, thumbProps, percentage } = useSlider({
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
  });

  return (
    <div {...trackProps} className="my-track">
      <div
        className="my-fill"
        style={{ width: `${percentage}%` }}
      />
      <div {...thumbProps} className="my-thumb" />
    </div>
  );
}
```

Available hooks: `useAccordion`, `useDialog`, `useSlider`, `useSelect`, `useTooltip`, `useTabs`, `useMenu`, `usePopover`.

---

## 9. i18n

The library supports Uzbek, Russian, and English out of the box. All component text (button labels, aria labels, form placeholders) automatically translates based on the `locale` prop:

```tsx
<GeekShopProvider locale="uz" currency="UZS">
  {/* All components render in Uzbek */}
  <Button variant="primary">Savatga qo'shish</Button>
</GeekShopProvider>
```

To use translations in your own components:

```tsx
import { useGeekShop } from '@ansoragroup/ui';

function MyComponent() {
  const { t, locale, currency } = useGeekShop();
  return <p>{t('common.viewAll')}</p>; // "Barchasi" / "Все" / "View All"
}
```

---

## 10. Component categories

| Category | Components | Import example |
|---|---|---|
| **Commerce** | ActionBar, CartItem, SkuSelector, QuickBuyPopup, MiniCart, PaymentMethodCard... | `import { CartItem } from '@ansoragroup/ui'` |
| **Content** | HeroBanner, CountdownTimer, CouponCard, DealCard, PromoBanner... | `import { HeroBanner } from '@ansoragroup/ui'` |
| **Data Display** | Rating, ReviewCard, OrderCard, Badge, Calendar, DataTable, TreeView... | `import { Rating } from '@ansoragroup/ui'` |
| **Feedback** | Toast, Modal, BottomSheet, Popup, Skeleton, Loading, Dialog... | `import { Toast } from '@ansoragroup/ui'` |
| **Form** | Button, Input, Checkbox, Select, Slider, TimePicker, DatePicker... | `import { Button } from '@ansoragroup/ui'` |
| **Layout** | Container, Grid, Section, Divider, DesktopShell, DesktopFooter... | `import { DesktopShell } from '@ansoragroup/ui'` |
| **Navigation** | NavBar, TabBar, SearchBar, FilterPanel, DesktopHeader, DesktopMegaMenu... | `import { DesktopHeader } from '@ansoragroup/ui'` |
| **Product** | ProductCard, PriceDisplay, ProductGrid, ImageZoom, ColorSwatch... | `import { ProductCard } from '@ansoragroup/ui'` |

Mobile components have no prefix. Desktop components use the `Desktop` prefix: `DesktopProductCard`, `DesktopHeader`, `DesktopMegaMenu`, etc.

---

## 11. Next.js App Router notes

All components are marked with `'use client'` — they work in both Server and Client components. Import them anywhere:

```tsx
// This works in a Server Component file
import { PriceDisplay } from '@ansoragroup/ui';

// PriceDisplay is a client component, Next.js handles the boundary automatically
export default function ProductPage() {
  return <PriceDisplay price={299000} />;
}
```

For SSR-safe theming, apply the theme in your root layout:

```tsx
// src/app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="default">
      <body>{children}</body>
    </html>
  );
}
```

---

## 12. Tree-shaking

The library uses `preserveModules` — only the components you import are included in your bundle. No need to worry about importing the entire library:

```tsx
// Only Button's code + CSS is bundled
import { Button } from '@ansoragroup/ui';
```

---

## Live examples

- **Storybook**: https://ansoragroup.github.io/geekshop-ui
- **GitHub**: https://github.com/ansoragroup/geekshop-ui

---

## Troubleshooting

### `npm install` fails with 401/404

You need GitHub Packages authentication. Create a PAT at https://github.com/settings/tokens with `read:packages` scope, then:

```bash
npm login --scope=@ansoragroup --registry=https://npm.pkg.github.com
```

### Styles not appearing

Make sure you're wrapping your app with `<GeekShopProvider>`. The provider injects global CSS custom properties needed by all components.

### TypeScript errors

The library ships with full TypeScript declarations. If you see type errors, make sure you're on TypeScript 5.5+:

```bash
npm install typescript@latest
```

### Headless hooks not found

Headless hooks are a separate entry point:

```tsx
// Wrong
import { useSlider } from '@ansoragroup/ui';

// Correct
import { useSlider } from '@ansoragroup/ui/headless';
```
