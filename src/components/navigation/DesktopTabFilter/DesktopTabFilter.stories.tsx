import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopTabFilter } from './DesktopTabFilter';

const meta = {
  title: 'Navigation (Desktop)/DesktopTabFilter',
  component: DesktopTabFilter,
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
} satisfies Meta<typeof DesktopTabFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Data Sets ──────────────────────────────────────────────────────────────

const orderTabs = [
  { key: 'all', label: 'All Orders', count: 156 },
  { key: 'pending', label: 'Pending', count: 8 },
  { key: 'shipped', label: 'Shipped', count: 12 },
  { key: 'delivered', label: 'Delivered', count: 130 },
  { key: 'cancelled', label: 'Cancelled', count: 6 },
];

const categoryTabs = [
  { key: 'all', label: 'All' },
  { key: 'electronics', label: 'Electronics' },
  { key: 'fashion', label: 'Fashion' },
  { key: 'home', label: 'Home & Garden' },
  { key: 'sports', label: 'Sports & Outdoors' },
  { key: 'books', label: 'Books' },
];

const reviewTabs = [
  { key: 'all', label: 'All Reviews', count: 1243 },
  { key: '5star', label: '5 Stars', count: 892 },
  { key: '4star', label: '4 Stars', count: 231 },
  { key: '3star', label: '3 Stars', count: 78 },
  { key: '2star', label: '2 Stars', count: 25 },
  { key: '1star', label: '1 Star', count: 17 },
];

const productStatusTabs = [
  { key: 'active', label: 'Active', count: 342 },
  { key: 'draft', label: 'Draft', count: 15 },
  { key: 'archived', label: 'Archived', count: 67 },
  { key: 'outofstock', label: 'Out of Stock', count: 23 },
];

// ─── Pill Variant ───────────────────────────────────────────────────────────

/** Default pill variant with counts. */
export const Default: Story = {
  args: {
    tabs: orderTabs,
    activeTab: 'all',
  },
};

/** Pill variant, small size with order status tabs. */
export const PillSmall: Story = {
  args: {
    tabs: orderTabs,
    activeTab: 'pending',
    size: 'sm',
  },
};

/** Pill variant without counts (category browsing). */
export const PillNoCounts: Story = {
  args: {
    tabs: categoryTabs,
    activeTab: 'electronics',
  },
};

/** Pill variant, small, no counts. */
export const PillSmallNoCounts: Story = {
  args: {
    tabs: categoryTabs,
    activeTab: 'all',
    size: 'sm',
  },
};

// ─── Underline Variant ──────────────────────────────────────────────────────

/** Underline variant with counts (order management). */
export const UnderlineVariant: Story = {
  args: {
    tabs: orderTabs,
    activeTab: 'all',
    variant: 'underline',
  },
};

/** Underline variant, small size. */
export const UnderlineSmall: Story = {
  args: {
    tabs: orderTabs,
    activeTab: 'shipped',
    variant: 'underline',
    size: 'sm',
  },
};

/** Underline variant without counts (navigation tabs). */
export const UnderlineNoCounts: Story = {
  args: {
    tabs: categoryTabs,
    activeTab: 'all',
    variant: 'underline',
  },
};

/** Underline variant, small, no counts. */
export const UnderlineSmallNoCounts: Story = {
  args: {
    tabs: categoryTabs,
    activeTab: 'fashion',
    variant: 'underline',
    size: 'sm',
  },
};

// ─── Card Variant ───────────────────────────────────────────────────────────

/** Card variant with category tabs (no counts). */
export const CardVariant: Story = {
  args: {
    tabs: categoryTabs,
    activeTab: 'all',
    variant: 'card',
  },
};

/** Card variant, small size. */
export const CardSmall: Story = {
  args: {
    tabs: categoryTabs,
    activeTab: 'home',
    variant: 'card',
    size: 'sm',
  },
};

/** Card variant with counts. */
export const CardWithCounts: Story = {
  args: {
    tabs: productStatusTabs,
    activeTab: 'active',
    variant: 'card',
  },
};

/** Card variant, small, with counts. */
export const CardSmallWithCounts: Story = {
  args: {
    tabs: productStatusTabs,
    activeTab: 'draft',
    variant: 'card',
    size: 'sm',
  },
};

// ─── Edge Cases ─────────────────────────────────────────────────────────────

/** Many tabs with high counts (overflow/count cap at 999+). */
export const ManyTabsHighCounts: Story = {
  args: {
    tabs: reviewTabs,
    activeTab: 'all',
    variant: 'pill',
  },
};

/** Two tabs only. */
export const TwoTabs: Story = {
  args: {
    tabs: [
      { key: 'products', label: 'Products', count: 456 },
      { key: 'services', label: 'Services', count: 23 },
    ],
    activeTab: 'products',
  },
};

/** Single tab (edge case). */
export const SingleTab: Story = {
  args: {
    tabs: [{ key: 'all', label: 'All Items', count: 99 }],
    activeTab: 'all',
    variant: 'underline',
  },
};

/** Tabs with very long labels. */
export const LongLabels: Story = {
  args: {
    tabs: [
      { key: 'all', label: 'All Product Categories and Subcategories' },
      { key: 'electronics', label: 'Consumer Electronics & Gadgets' },
      { key: 'fashion', label: 'Fashion, Apparel & Accessories' },
    ],
    activeTab: 'all',
    variant: 'pill',
    size: 'sm',
  },
};

/** Count exactly at 999+ threshold. */
export const CountThreshold: Story = {
  args: {
    tabs: [
      { key: 'low', label: 'Low', count: 5 },
      { key: 'mid', label: 'Medium', count: 999 },
      { key: 'high', label: 'High', count: 1000 },
      { key: 'max', label: 'Max', count: 50000 },
    ],
    activeTab: 'mid',
  },
};

/** Uncontrolled: uses defaultActiveTab, no external activeTab prop. */
export const Uncontrolled: Story = {
  args: {
    tabs: orderTabs,
    defaultActiveTab: 'shipped',
  },
};

// ─── Interactive ────────────────────────────────────────────────────────────

/** Fully controlled interactive story with variant and size selectors. */
export const Interactive: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('all');
    const [variant, setVariant] = useState<'pill' | 'underline' | 'card'>('pill');
    const [size, setSize] = useState<'sm' | 'md'>('md');

    return (
      <div>
        <div style={{ marginBottom: 16, display: 'flex', gap: 16, alignItems: 'center' }}>
          <label style={{ fontSize: 14, color: '#666' }}>
            Variant:
            <select value={variant} onChange={(e) => setVariant(e.target.value as 'pill' | 'underline' | 'card')} style={{ marginLeft: 8 }}>
              <option value="pill">pill</option>
              <option value="underline">underline</option>
              <option value="card">card</option>
            </select>
          </label>
          <label style={{ fontSize: 14, color: '#666' }}>
            Size:
            <select value={size} onChange={(e) => setSize(e.target.value as 'sm' | 'md')} style={{ marginLeft: 8 }}>
              <option value="md">md</option>
              <option value="sm">sm</option>
            </select>
          </label>
        </div>
        <DesktopTabFilter
          tabs={orderTabs}
          activeTab={activeTab}
          onChange={setActiveTab}
          variant={variant}
          size={size}
        />
        <p style={{ marginTop: 16, color: '#666', fontSize: 14 }}>
          Active tab: <strong>{activeTab}</strong>
        </p>
      </div>
    );
  },
};
