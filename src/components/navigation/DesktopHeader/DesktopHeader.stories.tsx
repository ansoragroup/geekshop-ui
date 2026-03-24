import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopHeader } from './DesktopHeader';

const meta = {
  title: 'Navigation (Desktop)/DesktopHeader',
  component: DesktopHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    searchPlaceholder: 'Search for GPUs, CPUs, monitors...',
    cartCount: 3,
    wishlistCount: 5,
  },
};

export const WithCustomLogo: Story = {
  args: {
    logo: (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div
          style={{
            width: 32,
            height: 32,
            background: '#FF5000',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          G
        </div>
        <span style={{ fontWeight: 700, fontSize: 20, color: '#1A1A1A' }}>GeekShop</span>
      </div>
    ),
    searchPlaceholder: 'Search products...',
    cartCount: 12,
  },
};

export const NoBadges: Story = {
  args: {
    searchPlaceholder: 'What are you looking for?',
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <DesktopHeader
        {...args}
        searchValue={value}
        onSearchChange={setValue}
        onSearch={(q) => alert(`Searching: ${q}`)}
        onCartClick={() => alert('Cart clicked')}
        onWishlistClick={() => alert('Wishlist clicked')}
        onUserClick={() => alert('User clicked')}
        onLogoClick={() => alert('Logo clicked')}
      />
    );
  },
  args: {
    searchPlaceholder: 'Search for RTX 4090, Ryzen 9...',
    cartCount: 3,
    wishlistCount: 2,
  },
};

export const WithImageSearch: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <DesktopHeader
        {...args}
        searchValue={value}
        onSearchChange={setValue}
        onSearch={(q) => alert(`Searching: ${q}`)}
        onImageSearch={(file) => alert(`Image search: ${file.name} (${file.type}, ${file.size} bytes)`)}
        cartCount={3}
        wishlistCount={2}
      />
    );
  },
  args: {
    searchPlaceholder: 'Search by text or upload a photo...',
  },
};
