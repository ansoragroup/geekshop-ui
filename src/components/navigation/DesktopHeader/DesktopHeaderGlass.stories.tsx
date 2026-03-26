import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopHeaderGlass } from './DesktopHeaderGlass';
import type { CategoryItem } from './DesktopHeaderGlass';

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
    icon: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=64&h=64&fit=crop',
  },
  {
    id: '10',
    label: 'Accessories',
    icon: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=64&h=64&fit=crop',
  },
  {
    id: '11',
    label: 'Smart Home',
    icon: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=64&h=64&fit=crop',
  },
  {
    id: '12',
    label: 'Audio',
    icon: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=64&h=64&fit=crop',
  },
];

const meta = {
  title: 'Navigation (Desktop)/DesktopHeaderGlass',
  component: DesktopHeaderGlass,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopHeaderGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    searchPlaceholder: 'Search for GPUs, CPUs, monitors...',
    cartCount: 3,
    wishlistCount: 5,
    categories: sampleCategories,
  },
};

export const OverColoredContent: Story = {
  render: (args) => (
    <div>
      <DesktopHeaderGlass {...args} />
      <div
        style={{
          height: 300,
          background: 'linear-gradient(135deg, #FF5000 0%, #FF7A33 50%, #FFA366 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 32,
          fontWeight: 700,
        }}
      >
        Hero Banner — Glass effect visible here
      </div>
      <div style={{ height: 1500, padding: 40, background: '#f5f5f5' }}>
        <p>Scroll to see the transparent→frosted glass transition.</p>
      </div>
    </div>
  ),
  args: {
    searchPlaceholder: 'Search products...',
    cartCount: 7,
    wishlistCount: 12,
    categories: sampleCategories,
  },
};

export const WithoutCategories: Story = {
  args: {
    searchPlaceholder: 'What are you looking for?',
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div>
        <DesktopHeaderGlass
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
        />
        <div
          style={{
            height: 200,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        />
        <div style={{ height: 2000, padding: 40, background: '#f5f5f5' }}>
          <p>Scroll down to see the glass effect intensify.</p>
        </div>
      </div>
    );
  },
  args: {
    searchPlaceholder: 'Search for RTX 4090, Ryzen 9...',
    cartCount: 3,
    wishlistCount: 2,
    categories: sampleCategories,
  },
};

export const WithImageSearch: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <DesktopHeaderGlass
        {...args}
        searchValue={value}
        onSearchChange={setValue}
        onSearch={(q) => alert(`Searching: ${q}`)}
        onImageSearch={(file) => alert(`Image search: ${file.name} (${file.type})`)}
      />
    );
  },
  args: {
    searchPlaceholder: 'Search by text or upload a photo...',
    cartCount: 3,
    wishlistCount: 2,
    categories: sampleCategories,
  },
};
