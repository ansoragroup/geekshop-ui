import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopFilterPanel, type DesktopFilterGroup, type DesktopFilterValues } from './DesktopFilterPanel';

const meta = {
  title: 'Navigation (Desktop)/DesktopFilterPanel',
  component: DesktopFilterPanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopFilterPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Data Sets ──────────────────────────────────────────────────────────────

const gpuFilterGroups: DesktopFilterGroup[] = [
  {
    key: 'brand',
    title: 'Brand',
    type: 'checkbox',
    options: [
      { value: 'asus', label: 'ASUS', count: 42 },
      { value: 'msi', label: 'MSI', count: 38 },
      { value: 'gigabyte', label: 'Gigabyte', count: 25 },
      { value: 'evga', label: 'EVGA', count: 18 },
      { value: 'zotac', label: 'Zotac', count: 12 },
    ],
  },
  {
    key: 'price',
    title: 'Price Range',
    type: 'priceRange',
  },
  {
    key: 'memory',
    title: 'Memory (VRAM)',
    type: 'checkbox',
    options: [
      { value: '8gb', label: '8 GB', count: 24 },
      { value: '12gb', label: '12 GB', count: 31 },
      { value: '16gb', label: '16 GB', count: 18 },
      { value: '24gb', label: '24 GB', count: 8 },
    ],
  },
  {
    key: 'chipset',
    title: 'Chipset',
    type: 'checkbox',
    options: [
      { value: 'rtx4090', label: 'RTX 4090', count: 12 },
      { value: 'rtx4080', label: 'RTX 4080', count: 15 },
      { value: 'rtx4070ti', label: 'RTX 4070 Ti', count: 20 },
      { value: 'rx7900xtx', label: 'RX 7900 XTX', count: 8 },
      { value: 'rx7800xt', label: 'RX 7800 XT', count: 10 },
    ],
  },
];

const fashionFilterGroups: DesktopFilterGroup[] = [
  {
    key: 'category',
    title: 'Category',
    type: 'checkbox',
    options: [
      { value: 'tshirts', label: 'T-Shirts', count: 156 },
      { value: 'jeans', label: 'Jeans', count: 89 },
      { value: 'jackets', label: 'Jackets', count: 45 },
      { value: 'shoes', label: 'Shoes', count: 210 },
      { value: 'accessories', label: 'Accessories', count: 178 },
    ],
  },
  {
    key: 'size',
    title: 'Size',
    type: 'checkbox',
    options: [
      { value: 'xs', label: 'XS', count: 34 },
      { value: 's', label: 'S', count: 67 },
      { value: 'm', label: 'M', count: 89 },
      { value: 'l', label: 'L', count: 72 },
      { value: 'xl', label: 'XL', count: 45 },
      { value: 'xxl', label: 'XXL', count: 23 },
    ],
  },
  {
    key: 'color',
    title: 'Color',
    type: 'checkbox',
    options: [
      { value: 'black', label: 'Black', count: 120 },
      { value: 'white', label: 'White', count: 95 },
      { value: 'blue', label: 'Blue', count: 67 },
      { value: 'red', label: 'Red', count: 45 },
      { value: 'green', label: 'Green', count: 32 },
    ],
  },
  {
    key: 'price',
    title: 'Price Range (UZS)',
    type: 'priceRange',
  },
];

// ─── Stories ────────────────────────────────────────────────────────────────

/** Default: GPU filters with 4 groups (brand, price, memory, chipset). */
export const Default: Story = {
  args: {
    groups: gpuFilterGroups,
  },
};

/** Pre-selected values: brand and memory already checked, price range set. */
export const WithPreselectedValues: Story = {
  args: {
    groups: gpuFilterGroups,
    values: {
      brand: ['asus', 'msi'],
      memory: ['12gb'],
      price: { min: '1000000', max: '15000000' },
    },
  },
};

/** Single checkbox group only. */
export const SingleGroup: Story = {
  args: {
    groups: [
      {
        key: 'category',
        title: 'Category',
        type: 'checkbox',
        options: [
          { value: 'gpu', label: 'Graphics Cards', count: 156 },
          { value: 'cpu', label: 'Processors', count: 98 },
          { value: 'ram', label: 'Memory', count: 72 },
          { value: 'ssd', label: 'Storage', count: 145 },
          { value: 'mobo', label: 'Motherboards', count: 64 },
        ],
      },
    ],
  },
};

/** Price range only (no checkbox groups). */
export const PriceOnly: Story = {
  args: {
    groups: [
      { key: 'price', title: 'Price Range (UZS)', type: 'priceRange' },
    ],
  },
};

/** Fashion/clothing filters: category, size, color, price. */
export const FashionFilters: Story = {
  args: {
    groups: fashionFilterGroups,
  },
};

/** Fashion filters with pre-selections. */
export const FashionPreselected: Story = {
  args: {
    groups: fashionFilterGroups,
    values: {
      category: ['tshirts', 'jeans'],
      size: ['m', 'l'],
      color: ['black'],
      price: { min: '50000', max: '500000' },
    },
  },
};

/** Many groups to test scrolling within the panel. */
export const ManyGroups: Story = {
  args: {
    groups: [
      ...gpuFilterGroups,
      {
        key: 'cooling',
        title: 'Cooling Type',
        type: 'checkbox',
        options: [
          { value: 'air', label: 'Air Cooled', count: 89 },
          { value: 'liquid', label: 'Liquid Cooled', count: 12 },
          { value: 'hybrid', label: 'Hybrid', count: 5 },
        ],
      },
      {
        key: 'psu',
        title: 'Recommended PSU',
        type: 'checkbox',
        options: [
          { value: '650w', label: '650W+', count: 45 },
          { value: '750w', label: '750W+', count: 38 },
          { value: '850w', label: '850W+', count: 22 },
          { value: '1000w', label: '1000W+', count: 8 },
        ],
      },
    ],
  },
};

/** Group with many options (long checkbox list). */
export const ManyOptions: Story = {
  args: {
    groups: [
      {
        key: 'brand',
        title: 'Brand',
        type: 'checkbox',
        options: [
          { value: 'asus', label: 'ASUS', count: 42 },
          { value: 'msi', label: 'MSI', count: 38 },
          { value: 'gigabyte', label: 'Gigabyte', count: 25 },
          { value: 'evga', label: 'EVGA', count: 18 },
          { value: 'zotac', label: 'Zotac', count: 12 },
          { value: 'sapphire', label: 'Sapphire', count: 15 },
          { value: 'xfx', label: 'XFX', count: 9 },
          { value: 'pny', label: 'PNY', count: 7 },
          { value: 'inno3d', label: 'INNO3D', count: 6 },
          { value: 'palit', label: 'Palit', count: 11 },
          { value: 'galax', label: 'GALAX', count: 4 },
          { value: 'colorful', label: 'Colorful', count: 3 },
        ],
      },
    ],
  },
};

/** No counts on options. */
export const WithoutCounts: Story = {
  args: {
    groups: [
      {
        key: 'material',
        title: 'Material',
        type: 'checkbox',
        options: [
          { value: 'cotton', label: 'Cotton' },
          { value: 'polyester', label: 'Polyester' },
          { value: 'linen', label: 'Linen' },
          { value: 'wool', label: 'Wool' },
          { value: 'silk', label: 'Silk' },
        ],
      },
      {
        key: 'price',
        title: 'Price Range',
        type: 'priceRange',
      },
    ],
  },
};

/** Interactive: apply and clear callbacks with state display. */
export const Interactive: Story = {
  render: () => {
    const [appliedValues, setAppliedValues] = useState<DesktopFilterValues>({});

    return (
      <div>
        <DesktopFilterPanel
          groups={gpuFilterGroups}
          values={appliedValues}
          onApply={(values) => {
            setAppliedValues(values);
            console.log('Applied filters:', values);
          }}
          onClear={() => {
            setAppliedValues({});
            console.log('Filters cleared');
          }}
        />
        <pre style={{ marginTop: 16, fontSize: 11, color: '#666', whiteSpace: 'pre-wrap' }}>
          Applied: {JSON.stringify(appliedValues, null, 2)}
        </pre>
      </div>
    );
  },
};
