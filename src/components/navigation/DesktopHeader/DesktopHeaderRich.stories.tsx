import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopHeaderRich } from './DesktopHeaderRich';
import type { CategoryItem, PromoLink } from './DesktopHeaderRich';

const sampleCategories: CategoryItem[] = [
  { id: '1', label: 'Smartphones', icon: 'https://placehold.co/64x64/FFF5F0/FF5000?text=📱' },
  { id: '2', label: 'Laptops', icon: 'https://placehold.co/64x64/FFF5F0/FF5000?text=💻' },
  { id: '3', label: 'Headphones', icon: 'https://placehold.co/64x64/FFF5F0/FF5000?text=🎧' },
  { id: '4', label: 'Monitors', icon: 'https://placehold.co/64x64/FFF5F0/FF5000?text=🖥' },
  { id: '5', label: 'Keyboards', icon: 'https://placehold.co/64x64/FFF5F0/FF5000?text=⌨️' },
  { id: '6', label: 'Mice', icon: 'https://placehold.co/64x64/FFF5F0/FF5000?text=🖱' },
  { id: '7', label: 'GPUs', icon: 'https://placehold.co/64x64/FFF5F0/FF5000?text=🎮' },
  { id: '8', label: 'Storage', icon: 'https://placehold.co/64x64/FFF5F0/FF5000?text=💾' },
  { id: '9', label: 'Cameras', icon: 'https://placehold.co/64x64/FFF5F0/FF5000?text=📷' },
  { id: '10', label: 'Accessories', icon: 'https://placehold.co/64x64/FFF5F0/FF5000?text=🔌' },
  { id: '11', label: 'Smart Home', icon: 'https://placehold.co/64x64/FFF5F0/FF5000?text=🏠' },
  { id: '12', label: 'Audio', icon: 'https://placehold.co/64x64/FFF5F0/FF5000?text=🔊' },
];

const samplePromoLinks: PromoLink[] = [
  { id: '1', label: 'Delivery & Returns' },
  { id: '2', label: 'Sell on GeekShop' },
  { id: '3', label: 'Premium', highlight: true },
  { id: '4', label: 'Gift Cards' },
  { id: '5', label: 'Help' },
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
        />
        <div style={{ height: 2000, padding: 40, background: '#f5f5f5' }}>
          <p>Scroll down to see the sticky shadow transition.</p>
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
  },
};
