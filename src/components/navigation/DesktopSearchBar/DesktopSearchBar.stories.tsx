import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopSearchBar } from './DesktopSearchBar';

const meta = {
  title: 'Navigation (Desktop)/DesktopSearchBar',
  component: DesktopSearchBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 900, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopSearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Categories Data ────────────────────────────────────────────────────────

const techCategories = [
  { value: 'all', label: 'All Categories' },
  { value: 'gpu', label: 'Graphics Cards' },
  { value: 'cpu', label: 'Processors' },
  { value: 'ram', label: 'Memory' },
  { value: 'storage', label: 'Storage' },
  { value: 'monitors', label: 'Monitors' },
  { value: 'peripherals', label: 'Peripherals' },
  { value: 'laptops', label: 'Laptops' },
];

const shortCategories = [
  { value: 'all', label: 'All' },
  { value: 'gpu', label: 'GPUs' },
  { value: 'cpu', label: 'CPUs' },
];

// ─── Default / Minimal ─────────────────────────────────────────────────────

/** Bare minimum: just a search input with placeholder. */
export const Default: Story = {
  args: {
    placeholder: 'Search for GPUs, CPUs, monitors...',
  },
};

// ─── With Categories ────────────────────────────────────────────────────────

/** Search bar with a category dropdown selector. */
export const WithCategories: Story = {
  args: {
    placeholder: 'Search products...',
    categories: techCategories,
    selectedCategory: 'all',
  },
};

/** Category dropdown with only a few short options. */
export const WithShortCategories: Story = {
  args: {
    placeholder: 'Search hardware...',
    categories: shortCategories,
    selectedCategory: 'all',
  },
};

// ─── Pre-filled Value ───────────────────────────────────────────────────────

/** Pre-filled search value showing the clear button. */
export const WithValue: Story = {
  args: {
    value: 'RTX 4090',
    placeholder: 'Search products...',
  },
};

/** Long pre-filled value to test text overflow. */
export const WithLongValue: Story = {
  args: {
    value: 'ASUS ROG Strix GeForce RTX 4090 OC Edition 24GB GDDR6X Graphics Card',
    placeholder: 'Search products...',
    categories: techCategories,
    selectedCategory: 'gpu',
  },
};

// ─── Image Search ───────────────────────────────────────────────────────────

/** Search bar with image/photo search button visible. Click the camera icon to open popover. */
export const WithImageSearch: Story = {
  args: {
    placeholder: 'Search for GPUs, CPUs, monitors...',
    showImageSearch: true,
    onImageSearch: (source) => {
      if (typeof source === 'string') {
        alert(`Image search by URL: ${source}`);
      } else {
        alert(`Image search by file: ${source.name}`);
      }
    },
  },
};

/** Image search hidden (showImageSearch = false). */
export const ImageSearchHidden: Story = {
  args: {
    placeholder: 'Search products...',
    showImageSearch: false,
    onImageSearch: () => {},
  },
};

// ─── Full Featured ──────────────────────────────────────────────────────────

/** All props filled: categories, image search, pre-filled value. */
export const FullFeatured: Story = {
  args: {
    placeholder: 'Search across all departments...',
    value: 'Mechanical keyboard',
    categories: techCategories,
    selectedCategory: 'peripherals',
    showImageSearch: true,
    onImageSearch: (source) => {
      if (typeof source === 'string') {
        alert(`Image URL: ${source}`);
      } else {
        alert(`Image file: ${source.name} (${(source.size / 1024).toFixed(1)}KB)`);
      }
    },
  },
};

/** Categories + image search combined. */
export const WithCategoriesAndImageSearch: Story = {
  args: {
    placeholder: 'Search products...',
    categories: techCategories,
    selectedCategory: 'all',
    showImageSearch: true,
    onImageSearch: (source) => {
      if (typeof source === 'string') {
        alert(`Image search by URL: ${source}`);
      } else {
        alert(`Image search by file: ${source.name}`);
      }
    },
  },
};

// ─── Sizes ──────────────────────────────────────────────────────────────────

/** Narrow container (500px) to test compact behavior. */
export const NarrowWidth: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 500, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    placeholder: 'Search...',
    categories: shortCategories,
    selectedCategory: 'all',
  },
};

/** Very wide container (1200px) to test stretch behavior. */
export const WideWidth: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 1200, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    placeholder: 'Search for electronics, fashion, home & garden, and more...',
    categories: techCategories,
    selectedCategory: 'all',
    showImageSearch: true,
    onImageSearch: () => {},
  },
};

// ─── Interactive ────────────────────────────────────────────────────────────

/** Fully controlled interactive story with category switching, clear, submit, and image search. */
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [category, setCategory] = useState('all');

    return (
      <div>
        <DesktopSearchBar
          value={value}
          onChange={setValue}
          onSubmit={(q) => alert(`Searching "${q}" in category "${category}"`)}
          onClear={() => setValue('')}
          placeholder="Search for RTX 4090, Ryzen 9..."
          categories={techCategories}
          selectedCategory={category}
          onCategoryChange={setCategory}
          onImageSearch={(source) => {
            if (typeof source === 'string') {
              alert(`Image search URL: ${source}`);
            } else {
              alert(`Image file: ${source.name} (${(source.size / 1024).toFixed(1)}KB)`);
            }
          }}
        />
        <p style={{ marginTop: 16, color: '#666', fontSize: 14 }}>
          Value: <strong>&quot;{value}&quot;</strong> | Category: <strong>{category}</strong>
        </p>
      </div>
    );
  },
};

/** Uncontrolled usage with defaultValue. */
export const Uncontrolled: Story = {
  args: {
    defaultValue: 'Samsung Galaxy',
    placeholder: 'Search smartphones...',
    categories: [
      { value: 'all', label: 'All' },
      { value: 'phones', label: 'Phones' },
      { value: 'tablets', label: 'Tablets' },
      { value: 'wearables', label: 'Wearables' },
    ],
    selectedCategory: 'phones',
    onSubmit: (val) => alert(`Submit: ${val}`),
  },
};
