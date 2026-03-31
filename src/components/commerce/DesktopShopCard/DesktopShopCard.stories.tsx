import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DesktopShopCard } from './DesktopShopCard';

const meta = {
  title: 'Commerce (Desktop)/DesktopShopCard',
  component: DesktopShopCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 700, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopShopCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default: all actions (follow, enter, chat), response rate visible. */
export const Default: Story = {
  args: {
    name: 'GeekTech Official Store',
    logo: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=112&h=112&fit=crop',
    rating: 4.8,
    followersCount: 12500,
    productsCount: 342,
    responseRate: 98,
    isFollowed: false,
    onFollow: fn(),
    onEnter: fn(),
    onChat: fn(),
  },
};

/** Following state: follow button shows "Following" with check icon. */
export const Following: Story = {
  args: {
    name: 'Apple Premium Reseller Tashkent',
    logo: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=112&h=112&fit=crop',
    rating: 5.0,
    followersCount: 45000,
    productsCount: 89,
    responseRate: 100,
    isFollowed: true,
    onFollow: fn(),
    onEnter: fn(),
    onChat: fn(),
  },
};

/** No response rate column. */
export const NoResponseRate: Story = {
  args: {
    name: 'Samsung Official',
    logo: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=112&h=112&fit=crop',
    rating: 4.9,
    followersCount: 85000,
    productsCount: 1200,
    isFollowed: false,
    onFollow: fn(),
    onEnter: fn(),
    onChat: fn(),
  },
};

/** Small shop: low counts and average rating. */
export const SmallShop: Story = {
  args: {
    name: 'Micro Electronics',
    logo: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=112&h=112&fit=crop',
    rating: 4.2,
    followersCount: 156,
    productsCount: 28,
    responseRate: 75,
    isFollowed: false,
    onFollow: fn(),
    onEnter: fn(),
  },
};

/** Without chat button. */
export const WithoutChat: Story = {
  args: {
    name: 'Corsair Official Store',
    logo: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=112&h=112&fit=crop',
    rating: 4.7,
    followersCount: 23400,
    productsCount: 156,
    responseRate: 92,
    isFollowed: true,
    onFollow: fn(),
    onEnter: fn(),
  },
};

/** Without follow or chat (view-only). */
export const ViewOnly: Story = {
  args: {
    name: 'Sony Store Uzbekistan',
    logo: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=112&h=112&fit=crop',
    rating: 4.6,
    followersCount: 67800,
    productsCount: 450,
    responseRate: 88,
    isFollowed: false,
    onEnter: fn(),
  },
};

/** Very large shop with huge follower/product counts. */
export const LargeShop: Story = {
  args: {
    name: 'Alibaba Global Marketplace',
    logo: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=112&h=112&fit=crop',
    rating: 4.5,
    followersCount: 2500000,
    productsCount: 150000,
    responseRate: 95,
    isFollowed: false,
    onFollow: fn(),
    onEnter: fn(),
    onChat: fn(),
  },
};

/** Long shop name to test text wrapping. */
export const LongName: Story = {
  args: {
    name: 'International Electronics & Computer Components Wholesale Distribution Center',
    logo: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=112&h=112&fit=crop',
    rating: 3.9,
    followersCount: 450,
    productsCount: 8900,
    responseRate: 65,
    isFollowed: false,
    onFollow: fn(),
    onEnter: fn(),
    onChat: fn(),
  },
};

/** Interactive: toggle follow state on click. */
export const Interactive: Story = {
  render: () => {
    const [isFollowed, setIsFollowed] = useState(false);
    const [followers, setFollowers] = useState(12500);

    return (
      <DesktopShopCard
        name="GeekTech Official Store"
        logo="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=112&h=112&fit=crop"
        rating={4.8}
        followersCount={followers}
        productsCount={342}
        responseRate={98}
        isFollowed={isFollowed}
        onFollow={() => {
          setIsFollowed((prev) => !prev);
          setFollowers((prev) => (isFollowed ? prev - 1 : prev + 1));
        }}
        onEnter={() => alert('Navigating to shop page...')}
        onChat={() => alert('Opening chat...')}
      />
    );
  },
};
