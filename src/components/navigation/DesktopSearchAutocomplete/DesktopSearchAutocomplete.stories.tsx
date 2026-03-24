import { useState, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopSearchAutocomplete } from './DesktopSearchAutocomplete';

const sampleRecent = ['RTX 4090', 'Mechanical keyboard', 'USB-C hub'];

const sampleTrending = [
  { text: 'iPhone 16 Pro Max', count: 45200 },
  { text: 'Samsung Galaxy S25 Ultra', count: 38100 },
  { text: 'AirPods Pro 3', count: 29800 },
  { text: 'PlayStation 5 Pro', count: 21500 },
  { text: 'MacBook Air M4', count: 18300 },
];

const sampleProducts = [
  {
    id: '1',
    title: 'NVIDIA GeForce RTX 4090 Founders Edition 24GB',
    image: 'https://placehold.co/96x96/f5f5f5/333?text=4090',
    price: 18990000,
    rating: 4.9,
  },
  {
    id: '2',
    title: 'AMD Ryzen 9 7950X Processor',
    image: 'https://placehold.co/96x96/f5f5f5/333?text=7950X',
    price: 7490000,
    rating: 4.8,
  },
  {
    id: '3',
    title: 'Corsair K100 RGB Mechanical Keyboard',
    image: 'https://placehold.co/96x96/f5f5f5/333?text=K100',
    price: 3290000,
    rating: 4.7,
  },
];

const sampleCategories = [
  { id: '1', name: 'Graphics Cards', count: 234 },
  { id: '2', name: 'Processors', count: 189 },
  { id: '3', name: 'Laptops', count: 456 },
];

const meta = {
  title: 'Navigation (Desktop)/DesktopSearchAutocomplete',
  component: DesktopSearchAutocomplete,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600, margin: '40px auto' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopSearchAutocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Search for GPUs, CPUs, monitors...',
  },
};

export const WithRecentSearches: Story = {
  args: {
    placeholder: 'Search products...',
    recentSearches: sampleRecent,
    onClearRecent: () => {},
  },
};

export const WithAllSections: Story = {
  args: {
    placeholder: 'Search for GPUs, CPUs, monitors...',
    recentSearches: sampleRecent,
    trendingSearches: sampleTrending,
    suggestedProducts: sampleProducts,
    categorySuggestions: sampleCategories,
    onClearRecent: () => {},
  },
};

export const PhotoSearchOpen: Story = {
  render: (args) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    return (
      <DesktopSearchAutocomplete
        ref={wrapperRef}
        {...args}
        onPhotoSearch={(source) => console.log('Photo search:', source)}
      />
    );
  },
  args: {
    placeholder: 'Search by text or upload a photo...',
    onPhotoSearch: () => {},
  },
};

export const WithPhotoPreview: Story = {
  render: (args) => (
    <DesktopSearchAutocomplete
      {...args}
      onPhotoSearch={(source) => console.log('Photo search:', source)}
    />
  ),
  args: {
    placeholder: 'Search by text or upload a photo...',
    onPhotoSearch: () => {},
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    const [recent, setRecent] = useState(sampleRecent);
    return (
      <div>
        <DesktopSearchAutocomplete
          {...args}
          value={value}
          onChange={setValue}
          recentSearches={recent}
          trendingSearches={sampleTrending}
          suggestedProducts={sampleProducts}
          categorySuggestions={sampleCategories}
          onSearch={(q) => {
            alert(`Searching: ${q}`);
            if (q && !recent.includes(q)) {
              setRecent((prev) => [q, ...prev].slice(0, 5));
            }
          }}
          onClearRecent={() => setRecent([])}
          onSuggestionClick={(text) => console.log('Suggestion clicked:', text)}
          onProductClick={(p) => console.log('Product clicked:', p)}
          onCategoryClick={(c) => console.log('Category clicked:', c)}
          onPhotoSearch={(source) => console.log('Photo search:', source)}
        />
        <p style={{ marginTop: 24, color: '#666', fontSize: 14 }}>
          Current value: &quot;{value}&quot; — Try typing, clicking suggestions, or using arrow keys.
        </p>
      </div>
    );
  },
  args: {
    placeholder: 'Search for RTX 4090, Ryzen 9...',
  },
};
