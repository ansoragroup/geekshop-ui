import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ShopCard } from './ShopCard';

const meta = {
  title: 'Commerce/ShopCard',
  component: ShopCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'GeekShop Light' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 390, margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ShopCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'TechZone Official Store',
    logo: 'https://picsum.photos/seed/shop1/100/100',
    rating: 4.8,
    followersCount: 12500,
    productsCount: 356,
    responseRate: 97,
    onFollow: () => console.log('Follow'),
    onEnter: () => console.log('Enter shop'),
  },
};

export const AlreadyFollowed: Story = {
  args: {
    name: 'PC Master Components',
    logo: 'https://picsum.photos/seed/shop2/100/100',
    rating: 4.5,
    followersCount: 8200,
    productsCount: 128,
    responseRate: 92,
    isFollowed: true,
    onFollow: () => console.log('Unfollow'),
    onEnter: () => console.log('Enter shop'),
  },
};

export const NoResponseRate: Story = {
  args: {
    name: 'GPU Warehouse Tashkent',
    logo: 'https://picsum.photos/seed/shop3/100/100',
    rating: 4.2,
    followersCount: 3400,
    productsCount: 89,
    onFollow: () => console.log('Follow'),
    onEnter: () => console.log('Enter shop'),
  },
};

export const HighFollowers: Story = {
  args: {
    name: 'GeekShop Official',
    logo: 'https://picsum.photos/seed/shop4/100/100',
    rating: 4.9,
    followersCount: 156000,
    productsCount: 2450,
    responseRate: 99,
    onFollow: () => console.log('Follow'),
    onEnter: () => console.log('Enter shop'),
  },
};

export const Interactive = () => {
  const [followed, setFollowed] = useState(false);

  return (
    <ShopCard
      name="Smart Devices UZ"
      logo="https://picsum.photos/seed/shop5/100/100"
      rating={4.6}
      followersCount={followed ? 5401 : 5400}
      productsCount={210}
      responseRate={95}
      isFollowed={followed}
      onFollow={() => setFollowed(!followed)}
      onEnter={() => alert("Do'konga kirildi!")}
    />
  );
};

export const NoEnterButton: Story = {
  args: {
    name: 'Mini Shop',
    logo: 'https://picsum.photos/seed/shop6/100/100',
    rating: 3.9,
    followersCount: 120,
    productsCount: 15,
    onFollow: () => console.log('Follow'),
  },
};
