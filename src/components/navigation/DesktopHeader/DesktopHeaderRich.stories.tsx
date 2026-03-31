import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopHeaderRich } from './DesktopHeaderRich';
import type { CategoryItem, PromoLink } from './DesktopHeaderRich';
import type {
  DesktopSearchTrendingItem,
  DesktopSearchSuggestedProduct,
  DesktopSearchCategoryItem,
} from '../DesktopSearchAutocomplete';

const sampleCategories: CategoryItem[] = [
  {
    id: '1',
    label: 'Smartphones',
    icon: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=64&h=64&fit=crop',
  },
  {
    id: '2',
    label: 'Laptops',
    icon: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=64&h=64&fit=crop',
  },
  {
    id: '3',
    label: 'Headphones',
    icon: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=64&h=64&fit=crop',
  },
  {
    id: '4',
    label: 'Monitors',
    icon: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=64&h=64&fit=crop',
  },
  {
    id: '5',
    label: 'Keyboards',
    icon: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=64&h=64&fit=crop',
  },
  {
    id: '6',
    label: 'Mice',
    icon: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=64&h=64&fit=crop',
  },
  {
    id: '7',
    label: 'GPUs',
    icon: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=64&h=64&fit=crop',
  },
  {
    id: '8',
    label: 'Storage',
    icon: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=64&h=64&fit=crop',
  },
  {
    id: '9',
    label: 'Cameras',
    icon: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=64&h=64&fit=crop',
  },
  {
    id: '10',
    label: 'Accessories',
    icon: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=64&h=64&fit=crop',
  },
  {
    id: '11',
    label: 'Smart Home',
    icon: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=64&h=64&fit=crop',
  },
  {
    id: '12',
    label: 'Audio',
    icon: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=64&h=64&fit=crop',
  },
];

const samplePromoLinks: PromoLink[] = [
  { id: '1', label: 'Delivery & Returns' },
  { id: '2', label: 'Sell on GeekShop' },
  { id: '3', label: 'Premium', highlight: true },
  { id: '4', label: 'Gift Cards' },
  { id: '5', label: 'Help' },
];

const sampleRecentSearches = ['RTX 4090', 'Mechanical keyboard', 'USB-C hub'];

const sampleTrendingSearches: DesktopSearchTrendingItem[] = [
  { text: 'iPhone 16 Pro Max', count: 45200 },
  { text: 'Samsung Galaxy S25 Ultra', count: 38100 },
  { text: 'AirPods Pro 3', count: 29800 },
];

const sampleSearchProducts: DesktopSearchSuggestedProduct[] = [
  {
    id: '1',
    title: 'NVIDIA GeForce RTX 4090 24GB',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=96&h=96&fit=crop',
    price: 18990000,
    rating: 4.9,
  },
  {
    id: '2',
    title: 'AMD Ryzen 9 7950X',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=96&h=96&fit=crop',
    price: 7490000,
    rating: 4.8,
  },
];

const sampleSearchCategories: DesktopSearchCategoryItem[] = [
  { id: '1', name: 'Graphics Cards', count: 234 },
  { id: '2', name: 'Processors', count: 189 },
];

const meta = {
  title: 'Navigation (Desktop)/DesktopHeaderRich',
  component: DesktopHeaderRich,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopHeaderRich>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    searchPlaceholder: 'Search for GPUs, CPUs, monitors...',
    cartCount: 3,
    wishlistCount: 5,
    categories: sampleCategories,
    promoLinks: samplePromoLinks,
    location: 'Tashkent',
    recentSearches: sampleRecentSearches,
    trendingSearches: sampleTrendingSearches,
    suggestedProducts: sampleSearchProducts,
    searchCategorySuggestions: sampleSearchCategories,
    onClearRecentSearches: () => {},
  },
};

export const WithoutPromoBar: Story = {
  args: {
    searchPlaceholder: 'Search products...',
    cartCount: 12,
    categories: sampleCategories,
  },
};

export const MinimalContent: Story = {
  args: {
    searchPlaceholder: 'What are you looking for?',
    promoLinks: samplePromoLinks.slice(0, 3),
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div>
        <DesktopHeaderRich
          {...args}
          searchValue={value}
          onSearchChange={setValue}
          onSearch={(q) => alert(`Searching: ${q}`)}
          onCartClick={() => alert('Cart clicked')}
          onWishlistClick={() => alert('Wishlist clicked')}
          onUserClick={() => alert('User clicked')}
          onLogoClick={() => alert('Logo clicked')}
          onCatalogClick={() => alert('Catalog clicked')}
          onCategoryClick={(cat) => alert(`Category: ${cat.label}`)}
          onPromoLinkClick={(link) => alert(`Promo: ${link.label}`)}
          onLocationClick={() => alert('Change location')}
          onPhotoSearch={(source) => alert(`Photo search: ${source.type}`)}
          onSearchSuggestionClick={(text) => alert(`Suggestion: ${text}`)}
          onSearchProductClick={(p) => alert(`Product: ${p.id}`)}
          onSearchCategoryClick={(c) => alert(`Category: ${c.name}`)}
        />
        <div style={{ height: 2000, padding: 40, background: '#f5f5f5' }}>
          <p>
            Scroll down to see the sticky shadow transition. Click the search bar to see
            autocomplete.
          </p>
        </div>
      </div>
    );
  },
  args: {
    searchPlaceholder: 'Search for RTX 4090, Ryzen 9...',
    cartCount: 3,
    wishlistCount: 2,
    categories: sampleCategories,
    promoLinks: samplePromoLinks,
    location: 'Samarkand',
    recentSearches: sampleRecentSearches,
    trendingSearches: sampleTrendingSearches,
    suggestedProducts: sampleSearchProducts,
    searchCategorySuggestions: sampleSearchCategories,
    onClearRecentSearches: () => {},
  },
};

export const WithImageSearch: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <DesktopHeaderRich
        {...args}
        searchValue={value}
        onSearchChange={setValue}
        onSearch={(q) => alert(`Searching: ${q}`)}
        onPhotoSearch={(source) => alert(`Photo search: ${source.type}`)}
      />
    );
  },
  args: {
    searchPlaceholder: 'Search by text or upload a photo...',
    cartCount: 3,
    wishlistCount: 2,
    categories: sampleCategories,
    promoLinks: samplePromoLinks,
    location: 'Tashkent',
    recentSearches: sampleRecentSearches,
    trendingSearches: sampleTrendingSearches,
    suggestedProducts: sampleSearchProducts,
    searchCategorySuggestions: sampleSearchCategories,
    onClearRecentSearches: () => {},
  },
};
