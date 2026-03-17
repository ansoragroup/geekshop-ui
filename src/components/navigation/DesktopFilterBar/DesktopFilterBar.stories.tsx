import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopFilterBar, type DesktopFilterBarItem } from './DesktopFilterBar';

const meta = {
  title: 'Navigation (Desktop)/DesktopFilterBar',
  component: DesktopFilterBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 900, padding: 24, background: '#fff' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopFilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems: DesktopFilterBarItem[] = [
  { label: 'All', value: 'all', active: true },
  { label: 'In Stock', value: 'instock' },
  { label: 'On Sale', value: 'onsale' },
  { label: 'New Arrivals', value: 'new' },
  { label: 'Free Shipping', value: 'freeship' },
];

export const Default: Story = {
  args: {
    items: defaultItems,
  },
};

export const WithDropdowns: Story = {
  args: {
    items: [
      { label: 'All Categories', value: 'category', options: [
        { label: 'GPUs', value: 'gpu' },
        { label: 'CPUs', value: 'cpu' },
        { label: 'RAM', value: 'ram' },
        { label: 'Storage', value: 'storage' },
      ]},
      { label: 'Brand', value: 'brand', options: [
        { label: 'ASUS', value: 'asus' },
        { label: 'MSI', value: 'msi' },
        { label: 'Gigabyte', value: 'gigabyte' },
        { label: 'EVGA', value: 'evga' },
      ]},
      { label: 'Price Range', value: 'price', options: [
        { label: 'Under $100', value: 'under100' },
        { label: '$100 - $500', value: '100-500' },
        { label: '$500 - $1000', value: '500-1000' },
        { label: 'Over $1000', value: 'over1000' },
      ]},
      { label: 'In Stock', value: 'instock' },
      { label: 'On Sale', value: 'onsale', active: true },
    ],
  },
};

export const Interactive: Story = {
  render: () => {
    const [activeValue, setActiveValue] = useState('all');
    const items: DesktopFilterBarItem[] = [
      { label: 'All', value: 'all', active: activeValue === 'all' },
      { label: 'GPUs', value: 'gpu', active: activeValue === 'gpu' },
      { label: 'CPUs', value: 'cpu', active: activeValue === 'cpu' },
      { label: 'Monitors', value: 'monitor', active: activeValue === 'monitor' },
      { label: 'Sort By', value: 'sort', options: [
        { label: 'Price: Low to High', value: 'price-asc' },
        { label: 'Price: High to Low', value: 'price-desc' },
        { label: 'Newest First', value: 'newest' },
        { label: 'Best Selling', value: 'bestselling' },
      ]},
    ];

    return (
      <DesktopFilterBar
        items={items}
        onItemClick={(value) => setActiveValue(value)}
        onOptionSelect={(filter, option) => alert(`Selected ${option} from ${filter}`)}
      />
    );
  },
};

export const ManyFilters: Story = {
  args: {
    items: [
      { label: 'All', value: 'all', active: true },
      { label: 'NVIDIA', value: 'nvidia' },
      { label: 'AMD', value: 'amd' },
      { label: 'Intel', value: 'intel' },
      { label: '8GB VRAM', value: '8gb' },
      { label: '12GB VRAM', value: '12gb' },
      { label: '16GB VRAM', value: '16gb' },
      { label: '24GB VRAM', value: '24gb' },
      { label: 'Under 5M', value: 'under5m' },
      { label: '5M - 10M', value: '5m-10m' },
    ],
  },
};
