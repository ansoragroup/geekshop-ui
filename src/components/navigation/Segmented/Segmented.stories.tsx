import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Segmented } from './Segmented';

const ListIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M2 3h10M2 7h10M2 11h10" />
  </svg>
);

const GridIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="4" height="4" rx="1" />
    <rect x="8" y="2" width="4" height="4" rx="1" />
    <rect x="2" y="8" width="4" height="4" rx="1" />
    <rect x="8" y="8" width="4" height="4" rx="1" />
  </svg>
);

const meta = {
  title: 'Navigation/Segmented',
  component: Segmented,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 16, background: '#fff', borderRadius: 12, width: 375 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Segmented>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      { value: 'all', label: 'All' },
      { value: 'pending', label: 'Pending' },
      { value: 'completed', label: 'Completed' },
    ],
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const tabs = canvas.getAllByRole('tab');

    await expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    await userEvent.click(tabs[1]);
    await expect(args.onChange).toHaveBeenCalledWith('pending');
  },
};

export const WithDefaultValue: Story = {
  args: {
    options: [
      { value: 'newest', label: 'Newest' },
      { value: 'popular', label: 'Popular' },
      { value: 'price', label: 'Price' },
    ],
    defaultValue: 'popular',
  },
};

export const SmallSize: Story = {
  args: {
    options: [
      { value: 'day', label: 'Day' },
      { value: 'week', label: 'Week' },
      { value: 'month', label: 'Month' },
    ],
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    options: [
      { value: 'daily', label: 'Daily' },
      { value: 'weekly', label: 'Weekly' },
      { value: 'monthly', label: 'Monthly' },
    ],
    size: 'lg',
  },
};

export const FullWidth: Story = {
  args: {
    options: [
      { value: 'products', label: 'Products' },
      { value: 'reviews', label: 'Reviews' },
      { value: 'specs', label: 'Specs' },
    ],
    block: true,
  },
};

export const WithIcons: Story = {
  args: {
    options: [
      { value: 'list', label: 'List', icon: <ListIcon /> },
      { value: 'grid', label: 'Grid', icon: <GridIcon /> },
    ],
  },
};

export const WithDisabledOption: Story = {
  args: {
    options: [
      { value: 'all', label: 'All' },
      { value: 'active', label: 'Active' },
      { value: 'archived', label: 'Archived', disabled: true },
    ],
  },
};

export const Interactive: Story = {
  name: 'Controlled Example',
  render: () => {
    const [view, setView] = useState('products');

    const content: Record<string, string> = {
      products: '156 products found',
      reviews: '24 reviews',
      specs: 'Technical specifications',
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Segmented
          value={view}
          onChange={setView}
          options={[
            { value: 'products', label: 'Products' },
            { value: 'reviews', label: 'Reviews' },
            { value: 'specs', label: 'Specs' },
          ]}
          block
        />
        <div style={{ padding: '12px 0', fontSize: 14, color: '#666' }}>
          {content[view]}
        </div>
      </div>
    );
  },
};

export const OrderStatusTabs: Story = {
  name: 'Order Status Example',
  render: () => {
    const [status, setStatus] = useState('all');

    return (
      <Segmented
        value={status}
        onChange={setStatus}
        options={[
          { value: 'all', label: 'All' },
          { value: 'pending', label: 'Pending' },
          { value: 'shipped', label: 'Shipped' },
          { value: 'delivered', label: 'Done' },
        ]}
        block
        size="sm"
      />
    );
  },
};
