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

export const Default: Story = {
  args: {
    placeholder: 'Search for GPUs, CPUs, monitors...',
  },
};

export const WithCategories: Story = {
  args: {
    placeholder: 'Search products...',
    categories: [
      { value: 'all', label: 'All' },
      { value: 'gpu', label: 'GPUs' },
      { value: 'cpu', label: 'CPUs' },
      { value: 'ram', label: 'Memory' },
      { value: 'storage', label: 'Storage' },
      { value: 'monitors', label: 'Monitors' },
    ],
    selectedCategory: 'all',
  },
};

export const WithValue: Story = {
  args: {
    value: 'RTX 4090',
    placeholder: 'Search products...',
  },
};

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

export const WithCategoriesAndImageSearch: Story = {
  args: {
    placeholder: 'Search products...',
    categories: [
      { value: 'all', label: 'All Categories' },
      { value: 'gpu', label: 'Graphics Cards' },
      { value: 'cpu', label: 'Processors' },
      { value: 'ram', label: 'Memory' },
    ],
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

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [category, setCategory] = useState('all');

    return (
      <DesktopSearchBar
        value={value}
        onChange={setValue}
        onSubmit={(q) => alert(`Searching "${q}" in category "${category}"`)}
        onClear={() => setValue('')}
        placeholder="Search for RTX 4090, Ryzen 9..."
        categories={[
          { value: 'all', label: 'All Categories' },
          { value: 'gpu', label: 'Graphics Cards' },
          { value: 'cpu', label: 'Processors' },
          { value: 'ram', label: 'Memory' },
        ]}
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
    );
  },
};

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
    categories: [
      { value: 'all', label: 'All' },
      { value: 'gpu', label: 'GPUs' },
    ],
    selectedCategory: 'all',
  },
};
