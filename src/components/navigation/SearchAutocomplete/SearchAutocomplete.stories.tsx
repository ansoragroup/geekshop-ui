import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { SearchAutocomplete } from './SearchAutocomplete';
import type { SearchAutocompleteProps } from './SearchAutocomplete';

const sampleRecent = ['RTX 4060', 'Ryzen 7', 'DDR5', 'Samsung SSD'];

const sampleSuggestions = ['RTX 4070 Super 12GB', 'RTX 4070 Ti 12GB', 'RTX 4070 Super Gaming OC'];

const sampleProducts = [
  {
    id: '1',
    title: 'ASUS ROG Strix RTX 4070 Super 12GB OC',
    image:
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=100&h=100&fit=crop&auto=format',
    price: 8900000,
  },
  {
    id: '2',
    title: 'MSI GeForce RTX 4070 Ti Gaming X Trio 12GB',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format',
    price: 9500000,
  },
  {
    id: '3',
    title: 'Gigabyte RTX 4070 Super Eagle OC 12GB',
    image:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&h=100&fit=crop&auto=format',
    price: 8700000,
  },
];

const meta = {
  title: 'Navigation/SearchAutocomplete',
  component: SearchAutocomplete,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 500, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchAutocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

function InteractiveSearch(props: Partial<SearchAutocompleteProps>) {
  const [val, setVal] = useState(props.value ?? '');
  return (
    <SearchAutocomplete
      value={val}
      onChange={setVal}
      recentSearches={sampleRecent}
      suggestions={sampleSuggestions}
      products={sampleProducts}
      onSearch={(q) => alert(`Search: ${q}`)}
      onClearRecent={fn()}
      onSuggestionClick={fn()}
      onProductClick={fn()}
      onViewAll={fn()}
      {...props}
    />
  );
}

export const Default: Story = {
  render: () => <InteractiveSearch />,
};

export const WithValue: Story = {
  render: () => <InteractiveSearch value="RTX 4070" />,
};

export const RecentOnly: Story = {
  render: () => <InteractiveSearch suggestions={[]} products={[]} />,
};

export const SuggestionsOnly: Story = {
  render: () => <InteractiveSearch recentSearches={[]} products={[]} />,
};

export const ProductsOnly: Story = {
  render: () => <InteractiveSearch recentSearches={[]} suggestions={[]} />,
};

export const Empty: Story = {
  render: () => (
    <SearchAutocomplete
      placeholder="Search products..."
      recentSearches={[]}
      suggestions={[]}
      products={[]}
    />
  ),
};

export const CustomPlaceholder: Story = {
  render: () => <InteractiveSearch placeholder="Search for GPUs, CPUs, monitors..." />,
};

export const AllSections: Story = {
  render: () => (
    <InteractiveSearch
      recentSearches={['RTX 4060', 'Ryzen 7 7800X3D', 'DDR5 6000MHz', 'NVMe SSD 2TB']}
      suggestions={[
        'RTX 4070 Super 12GB',
        'RTX 4070 Ti 12GB',
        'RTX 4070 Super Gaming OC',
        'RTX 4070 Ti Super 16GB',
      ]}
      products={[
        {
          id: '1',
          title: 'ASUS ROG Strix RTX 4070 Super OC 12GB GDDR6X',
          image:
            'https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&h=100&fit=crop&auto=format',
          price: 8900000,
        },
        {
          id: '2',
          title: 'MSI GeForce RTX 4070 Ti Gaming X Trio 12GB',
          image:
            'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=100&h=100&fit=crop&auto=format',
          price: 9500000,
        },
      ]}
    />
  ),
};
