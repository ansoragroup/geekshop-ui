import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { DesktopTreeView } from './DesktopTreeView';
import type { TreeNode } from '../TreeView';

const catalogNodes: TreeNode[] = [
  {
    id: 'electronics',
    label: 'Electronics',
    children: [
      {
        id: 'phones',
        label: 'Smartphones',
        children: [
          { id: 'iphone-15', label: 'iPhone 15 Pro' },
          { id: 'samsung-s24', label: 'Samsung Galaxy S24 Ultra' },
          { id: 'xiaomi-14', label: 'Xiaomi 14 Ultra' },
          { id: 'pixel-9', label: 'Google Pixel 9 Pro' },
        ],
      },
      {
        id: 'laptops',
        label: 'Laptops',
        children: [
          { id: 'macbook-air', label: 'MacBook Air M3' },
          { id: 'dell-xps', label: 'Dell XPS 13' },
          { id: 'thinkpad', label: 'Lenovo ThinkPad X1 Carbon' },
        ],
      },
      {
        id: 'tablets',
        label: 'Tablets',
        children: [
          { id: 'ipad-pro', label: 'iPad Pro 12.9"' },
          { id: 'tab-s9', label: 'Samsung Galaxy Tab S9 Ultra' },
        ],
      },
      {
        id: 'audio',
        label: 'Audio',
        children: [
          { id: 'airpods', label: 'AirPods Pro 2' },
          { id: 'sony-wh', label: 'Sony WH-1000XM5' },
        ],
      },
    ],
  },
  {
    id: 'fashion',
    label: 'Fashion',
    children: [
      { id: 'mens', label: "Men's Clothing" },
      { id: 'womens', label: "Women's Clothing" },
      { id: 'kids-fashion', label: "Children's Wear" },
      { id: 'shoes', label: 'Footwear' },
    ],
  },
  {
    id: 'home-garden',
    label: 'Home & Garden',
    children: [
      { id: 'furniture', label: 'Furniture' },
      { id: 'kitchen', label: 'Kitchen & Dining' },
      { id: 'decor', label: 'Home Decor' },
    ],
  },
];

const meta = {
  title: 'Data Display (Desktop)/DesktopTreeView',
  component: DesktopTreeView,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 24, background: '#fff', borderRadius: 12, width: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopTreeView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    nodes: catalogNodes,
    defaultExpandedIds: ['electronics', 'phones'],
  },
};

export const WithCheckboxes: Story = {
  args: {
    nodes: catalogNodes,
    showCheckboxes: true,
    defaultExpandedIds: ['electronics', 'phones'],
    defaultCheckedIds: ['iphone-15', 'samsung-s24'],
    onCheckChange: fn(),
  },
};

export const Selectable: Story = {
  args: {
    nodes: catalogNodes,
    selectable: true,
    defaultExpandedIds: ['electronics', 'laptops'],
    defaultSelectedIds: ['macbook-air'],
    onSelectionChange: fn(),
  },
};

export const MultiSelect: Story = {
  args: {
    nodes: catalogNodes,
    selectable: true,
    multiSelect: true,
    defaultExpandedIds: ['electronics', 'phones'],
    defaultSelectedIds: ['iphone-15', 'xiaomi-14'],
    onSelectionChange: fn(),
  },
};

export const FullyExpanded: Story = {
  name: 'All Categories Expanded',
  args: {
    nodes: catalogNodes,
    defaultExpandedIds: [
      'electronics',
      'phones',
      'laptops',
      'tablets',
      'audio',
      'fashion',
      'home-garden',
    ],
  },
};

export const WithSearch: Story = {
  name: 'Search Filter',
  render: () => {
    const [query, setQuery] = useState('');
    return (
      <div>
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #eee',
            borderRadius: 8,
            fontSize: 14,
            marginBottom: 12,
            boxSizing: 'border-box',
          }}
        />
        <DesktopTreeView
          nodes={catalogNodes}
          searchQuery={query}
          defaultExpandedIds={[
            'electronics',
            'phones',
            'laptops',
            'tablets',
            'audio',
            'fashion',
            'home-garden',
          ]}
          selectable
        />
      </div>
    );
  },
};

export const DisabledNodes: Story = {
  args: {
    nodes: [
      {
        id: 'available',
        label: 'In Stock',
        children: [
          { id: 'a1', label: 'Wireless Mouse — 149,000 sum' },
          { id: 'a2', label: 'USB-C Hub — 89,000 sum' },
        ],
      },
      {
        id: 'unavailable',
        label: 'Out of Stock',
        disabled: true,
        children: [
          { id: 'u1', label: 'RTX 4090 — 24,990,000 sum' },
          { id: 'u2', label: 'PS5 Pro — 11,990,000 sum' },
        ],
      },
    ],
    defaultExpandedIds: ['available'],
    selectable: true,
  },
};

export const KeyboardDemo: Story = {
  name: 'Keyboard Navigation',
  args: {
    nodes: catalogNodes,
    defaultExpandedIds: ['electronics'],
    selectable: true,
    onSelectionChange: fn(),
    onExpandChange: fn(),
  },
};
