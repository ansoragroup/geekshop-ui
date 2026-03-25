import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { TreeView, type TreeNode } from './TreeView';

const electronicNodes: TreeNode[] = [
  {
    id: 'electronics',
    label: 'Electronics',
    children: [
      {
        id: 'phones',
        label: 'Phones',
        children: [
          { id: 'iphone-15', label: 'iPhone 15 Pro' },
          { id: 'samsung-s24', label: 'Samsung Galaxy S24' },
          { id: 'xiaomi-14', label: 'Xiaomi 14 Ultra' },
        ],
      },
      {
        id: 'laptops',
        label: 'Laptops',
        children: [
          { id: 'macbook-air', label: 'MacBook Air M3' },
          { id: 'dell-xps', label: 'Dell XPS 13' },
          { id: 'lenovo-thinkpad', label: 'Lenovo ThinkPad X1' },
        ],
      },
      {
        id: 'tablets',
        label: 'Tablets',
        children: [
          { id: 'ipad-pro', label: 'iPad Pro 12.9' },
          { id: 'samsung-tab', label: 'Samsung Galaxy Tab S9' },
        ],
      },
    ],
  },
  {
    id: 'clothing',
    label: 'Clothing',
    children: [
      { id: 'mens', label: "Men's Fashion" },
      { id: 'womens', label: "Women's Fashion" },
      { id: 'kids', label: "Children's Clothing" },
    ],
  },
  {
    id: 'home',
    label: 'Home & Garden',
    children: [
      { id: 'furniture', label: 'Furniture' },
      { id: 'kitchen', label: 'Kitchen & Dining' },
    ],
  },
];

const meta = {
  title: 'Data Display/TreeView',
  component: TreeView,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 16, background: '#fff', borderRadius: 12, width: 375 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TreeView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    nodes: electronicNodes,
    defaultExpandedIds: ['electronics'],
  },
};

export const WithCheckboxes: Story = {
  args: {
    nodes: electronicNodes,
    showCheckboxes: true,
    defaultExpandedIds: ['electronics', 'phones'],
    defaultCheckedIds: ['iphone-15'],
    onCheckChange: fn(),
  },
};

export const Selectable: Story = {
  args: {
    nodes: electronicNodes,
    selectable: true,
    defaultExpandedIds: ['electronics', 'laptops'],
    defaultSelectedIds: ['macbook-air'],
    onSelectionChange: fn(),
  },
};

export const AllExpanded: Story = {
  args: {
    nodes: electronicNodes,
    defaultExpandedIds: ['electronics', 'phones', 'laptops', 'tablets', 'clothing', 'home'],
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
          placeholder="Search categories..."
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
        <TreeView
          nodes={electronicNodes}
          searchQuery={query}
          defaultExpandedIds={['electronics', 'phones', 'laptops', 'tablets', 'clothing', 'home']}
        />
      </div>
    );
  },
};

export const DisabledNodes: Story = {
  args: {
    nodes: [
      {
        id: 'cat-1',
        label: 'Available Products',
        children: [
          { id: 'p1', label: 'Wireless Mouse' },
          { id: 'p2', label: 'Mechanical Keyboard', disabled: true },
          { id: 'p3', label: 'USB-C Hub' },
        ],
      },
      {
        id: 'cat-2',
        label: 'Out of Stock',
        disabled: true,
        children: [{ id: 'p4', label: 'Gaming Monitor' }],
      },
    ],
    defaultExpandedIds: ['cat-1'],
    selectable: true,
  },
};

export const AsyncLoading: Story = {
  name: 'Async Load Children',
  args: {
    nodes: [
      { id: 'root-1', label: 'Smartphones', hasChildren: true },
      { id: 'root-2', label: 'Accessories', hasChildren: true },
      { id: 'root-3', label: 'Services', children: [{ id: 's1', label: 'Warranty' }] },
    ],
    loadChildren: (async (id: string) => {
      await new Promise((r) => setTimeout(r, 1000));
      if (id === 'root-1') {
        return [
          { id: 'sp-1', label: 'iPhone 15 Pro Max' },
          { id: 'sp-2', label: 'Samsung S24 Ultra' },
          { id: 'sp-3', label: 'Google Pixel 9 Pro' },
        ];
      }
      return [
        { id: 'ac-1', label: 'Phone Case' },
        { id: 'ac-2', label: 'Screen Protector' },
      ];
    }) as TreeViewProps['loadChildren'],
  },
};

export const DeepNesting: Story = {
  name: 'Deep Nesting (4 levels)',
  args: {
    nodes: [
      {
        id: 'l1',
        label: 'Category Level 1',
        children: [
          {
            id: 'l2',
            label: 'Subcategory Level 2',
            children: [
              {
                id: 'l3',
                label: 'Group Level 3',
                children: [
                  { id: 'l4a', label: 'Product A' },
                  { id: 'l4b', label: 'Product B' },
                  { id: 'l4c', label: 'Product C' },
                ],
              },
            ],
          },
        ],
      },
    ],
    defaultExpandedIds: ['l1', 'l2', 'l3'],
  },
};
