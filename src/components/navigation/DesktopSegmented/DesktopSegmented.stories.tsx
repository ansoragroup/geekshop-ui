import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopSegmented, type DesktopSegmentedOption } from './DesktopSegmented';

const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
);

const ListIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

const meta = {
  title: 'Navigation (Desktop)/DesktopSegmented',
  component: DesktopSegmented,
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
} satisfies Meta<typeof DesktopSegmented>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicOptions: DesktopSegmentedOption[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export const Default: Story = {
  args: {
    options: basicOptions,
    defaultValue: 'all',
  },
};

export const SmallSize: Story = {
  args: {
    options: basicOptions,
    defaultValue: 'all',
    size: 'sm',
  },
};

export const WithIcons: Story = {
  args: {
    options: [
      { label: 'Grid', value: 'grid', icon: <GridIcon /> },
      { label: 'List', value: 'list', icon: <ListIcon /> },
    ],
    defaultValue: 'grid',
  },
};

export const FullWidth: Story = {
  args: {
    options: [
      { label: 'Products', value: 'products' },
      { label: 'Reviews', value: 'reviews' },
      { label: 'Q&A', value: 'qa' },
      { label: 'Similar', value: 'similar' },
    ],
    defaultValue: 'products',
    fullWidth: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('newest');

    const options: DesktopSegmentedOption[] = [
      { label: 'Newest', value: 'newest' },
      { label: 'Price: Low', value: 'price-asc' },
      { label: 'Price: High', value: 'price-desc' },
      { label: 'Popular', value: 'popular' },
      { label: 'Rating', value: 'rating' },
    ];

    return (
      <div>
        <DesktopSegmented
          options={options}
          value={value}
          onChange={setValue}
        />
        <p style={{ marginTop: 16, color: '#666', fontSize: 14 }}>
          Selected: <strong>{value}</strong>
        </p>
      </div>
    );
  },
};

export const ManyOptions: Story = {
  args: {
    options: [
      { label: 'All', value: 'all' },
      { label: 'GPUs', value: 'gpu' },
      { label: 'CPUs', value: 'cpu' },
      { label: 'RAM', value: 'ram' },
      { label: 'Storage', value: 'storage' },
      { label: 'Monitors', value: 'monitors' },
    ],
    defaultValue: 'all',
  },
};
