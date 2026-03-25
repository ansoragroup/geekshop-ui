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
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=96&h=96&fit=crop',
    price: 18990000,
    rating: 4.9,
  },
  {
    id: '2',
    title: 'AMD Ryzen 9 7950X Processor',
    image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=96&h=96&fit=crop',
    price: 7490000,
    rating: 4.8,
  },
  {
    id: '3',
    title: 'Corsair K100 RGB Mechanical Keyboard',
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=96&h=96&fit=crop',
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

/** Minimal usage with only placeholder text. No dropdown sections. */
export const Default: Story = {
  args: {
    placeholder: 'Search for GPUs, CPUs, monitors...',
  },
};

/** Displays only the recent searches section with a clear button. */
export const WithRecentSearches: Story = {
  args: {
    placeholder: 'Search products...',
    recentSearches: sampleRecent,
    onClearRecent: () => {},
  },
};

/** Displays only trending searches with ranked list and search counts. */
export const TrendingOnly: Story = {
  args: {
    placeholder: 'What are you looking for?',
    trendingSearches: sampleTrending,
  },
};

/** Displays only product suggestions with images, prices, and ratings. */
export const ProductSuggestionsOnly: Story = {
  args: {
    placeholder: 'Search products...',
    suggestedProducts: sampleProducts,
  },
};

/** Displays only category suggestions with item counts. */
export const CategoriesOnly: Story = {
  args: {
    placeholder: 'Browse categories...',
    categorySuggestions: sampleCategories,
  },
};

/** Full-featured dropdown: all 4 sections (recent, trending, products, categories) + clear recent + photo search. */
export const FullFeatured: Story = {
  args: {
    placeholder: 'Search for GPUs, CPUs, monitors...',
    recentSearches: ['RTX 4090', 'Mechanical keyboard', 'USB-C hub', '4K Monitor', 'DDR5 RAM'],
    trendingSearches: [
      { text: 'iPhone 16 Pro Max', count: 45200 },
      { text: 'Samsung Galaxy S25 Ultra', count: 38100 },
      { text: 'AirPods Pro 3', count: 29800 },
      { text: 'PlayStation 5 Pro', count: 21500 },
      { text: 'MacBook Air M4', count: 18300 },
      { text: 'Steam Deck OLED', count: 15400 },
      { text: 'Galaxy Watch 7', count: 12600 },
    ],
    suggestedProducts: [
      {
        id: '1',
        title: 'NVIDIA GeForce RTX 4090 Founders Edition 24GB GDDR6X',
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=96&h=96&fit=crop',
        price: 18990000,
        rating: 4.9,
      },
      {
        id: '2',
        title: 'Apple MacBook Pro 16" M3 Max 48GB 1TB',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=96&h=96&fit=crop',
        price: 42500000,
        rating: 4.8,
      },
      {
        id: '3',
        title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=96&h=96&fit=crop',
        price: 4200000,
        rating: 4.7,
      },
      {
        id: '4',
        title: 'Samsung Odyssey G9 49" DQHD Gaming Monitor 240Hz',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=96&h=96&fit=crop',
        price: 16800000,
        rating: 4.6,
      },
    ],
    categorySuggestions: [
      { id: '1', name: 'Graphics Cards', count: 234 },
      { id: '2', name: 'Processors', count: 189 },
      { id: '3', name: 'Laptops', count: 456 },
      { id: '4', name: 'Gaming Peripherals', count: 312 },
      { id: '5', name: 'Monitors', count: 178 },
    ],
    onClearRecent: () => {},
    onPhotoSearch: () => {},
    submitLabel: 'Search',
  },
};

/** Same as FullFeatured but all 4 sections are populated. Dropdown opens on focus. */
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

/** Shows the photo/image search button (camera icon). Click the camera to open the photo search panel. */
export const WithPhotoSearch: Story = {
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
    recentSearches: ['Wireless earbuds', 'Laptop stand'],
    trendingSearches: [
      { text: 'iPhone 16 case', count: 8400 },
      { text: 'Laptop sleeve', count: 5200 },
    ],
  },
};

/** Custom submit button label and custom placeholder. */
export const CustomSubmitLabel: Story = {
  args: {
    placeholder: 'Find products, brands, and categories...',
    submitLabel: 'Find',
    recentSearches: ['Bluetooth speaker', 'Webcam 4K'],
    trendingSearches: [
      { text: 'Mini projector', count: 12300 },
      { text: 'Ring light', count: 9800 },
    ],
    onClearRecent: () => {},
  },
};

/** Custom i18n labels for Russian locale. */
export const RussianLabels: Story = {
  args: {
    placeholder: 'Поиск товаров...',
    submitLabel: 'Найти',
    recentSearches: ['Видеокарта RTX 4070', 'Клавиатура механическая', 'Наушники Sony'],
    trendingSearches: [
      { text: 'iPhone 16 Pro Max', count: 45200 },
      { text: 'MacBook Air M4', count: 18300 },
      { text: 'PlayStation 5 Pro', count: 21500 },
    ],
    suggestedProducts: [
      {
        id: '1',
        title: 'ASUS ROG Strix GeForce RTX 4070 Ti Super OC',
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=96&h=96&fit=crop',
        price: 12500000,
        rating: 4.8,
      },
    ],
    categorySuggestions: [
      { id: '1', name: 'Видеокарты', count: 234 },
      { id: '2', name: 'Ноутбуки', count: 456 },
    ],
    labels: {
      searchInput: 'Поиск товаров',
      clearSearch: 'Очистить',
      searchByPhoto: 'Поиск по фото',
      submitSearch: 'Искать',
      recentSearches: 'Недавние запросы',
      clearRecent: 'Очистить',
      trending: 'Популярное',
      products: 'Товары',
      categories: 'Категории',
      categoryPrefix: 'в',
      categoryItemsSuffix: 'товаров',
    },
    onClearRecent: () => {},
    onPhotoSearch: () => {},
  },
};

/** Pre-filled search value with products visible. */
export const WithPrefilledValue: Story = {
  args: {
    defaultValue: 'RTX 4090',
    placeholder: 'Search products...',
    suggestedProducts: sampleProducts,
    categorySuggestions: sampleCategories,
  },
};

/** Edge case: very long search terms in recent searches, and products with extremely long titles. */
export const LongTextEdgeCases: Story = {
  args: {
    placeholder: 'Search for products...',
    recentSearches: [
      'ASUS ROG Strix GeForce RTX 4090 OC Edition 24GB GDDR6X Gaming Graphics Card',
      'Samsung Galaxy S24 Ultra 5G Phantom Black 512GB Unlocked International Version',
      'Logitech G Pro X Superlight 2 Lightspeed Wireless Gaming Mouse',
    ],
    trendingSearches: [
      { text: 'Apple MacBook Pro 16-inch with M3 Max chip and 48GB Unified Memory', count: 99999 },
      { text: 'Sony PlayStation 5 Pro Console Digital Edition 2TB', count: 1 },
    ],
    suggestedProducts: [
      {
        id: '1',
        title: 'ASUS ROG Strix GeForce RTX 4090 OC Edition 24GB GDDR6X PCI Express 4.0 Graphics Card with RGB Lighting',
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=96&h=96&fit=crop',
        price: 28990000,
        rating: 5.0,
      },
    ],
    categorySuggestions: [
      { id: '1', name: 'High-Performance Desktop Graphics Cards for Gaming and Workstations', count: 9999 },
    ],
    onClearRecent: () => {},
  },
};

/** Edge case: single item in each section. */
export const MinimalContent: Story = {
  args: {
    placeholder: 'Search...',
    recentSearches: ['Webcam'],
    trendingSearches: [{ text: 'USB-C Dock', count: 2100 }],
    suggestedProducts: [
      {
        id: '1',
        title: 'Anker USB-C Hub 7-in-1',
        image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=96&h=96&fit=crop',
        price: 590000,
      },
    ],
    categorySuggestions: [{ id: '1', name: 'Accessories', count: 89 }],
    onClearRecent: () => {},
  },
};

/** Trending searches without counts. */
export const TrendingWithoutCounts: Story = {
  args: {
    placeholder: 'Search products...',
    trendingSearches: [
      { text: 'Wireless mouse' },
      { text: 'Desk lamp LED' },
      { text: 'External SSD 2TB' },
      { text: 'Monitor arm' },
    ],
  },
};

/** Products without ratings. */
export const ProductsWithoutRatings: Story = {
  args: {
    placeholder: 'Search products...',
    suggestedProducts: [
      {
        id: '1',
        title: 'Generic USB-C to HDMI Adapter',
        image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=96&h=96&fit=crop',
        price: 120000,
      },
      {
        id: '2',
        title: 'Baseus 65W GaN Fast Charger',
        image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=96&h=96&fit=crop',
        price: 350000,
      },
    ],
  },
};

/** Categories without counts. */
export const CategoriesWithoutCounts: Story = {
  args: {
    placeholder: 'Search categories...',
    categorySuggestions: [
      { id: '1', name: 'Smartphones' },
      { id: '2', name: 'Tablets' },
      { id: '3', name: 'Wearables' },
    ],
  },
};

/** Fully interactive controlled story with state management. Adds recent searches on submit. */
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

/** Wide container (900px) to test responsive layout. */
export const WideContainer: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 900, margin: '40px auto' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    placeholder: 'Search across all departments...',
    recentSearches: sampleRecent,
    trendingSearches: sampleTrending,
    suggestedProducts: sampleProducts,
    categorySuggestions: sampleCategories,
    onClearRecent: () => {},
    onPhotoSearch: () => {},
    submitLabel: 'Search',
  },
};

/** Narrow container (400px) to test compact layout. */
export const NarrowContainer: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 400, margin: '40px auto' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    placeholder: 'Search...',
    recentSearches: sampleRecent.slice(0, 2),
    trendingSearches: sampleTrending.slice(0, 3),
    onClearRecent: () => {},
  },
};
