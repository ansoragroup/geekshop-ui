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
  decorators: [(Story) => (
    <div style={{ width: 700, padding: 24, background: '#f5f5f5' }}>
      <Story />
    </div>
  )],
} satisfies Meta<typeof DesktopShopCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'GeekTech Official Store',
    logo: 'https://picsum.photos/seed/shop1/112/112',
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

export const Following: Story = {
  args: {
    ...Default.args,
    isFollowed: true,
  },
};

export const NoResponseRate: Story = {
  args: {
    name: 'Samsung Official',
    logo: 'https://picsum.photos/seed/shop2/112/112',
    rating: 4.9,
    followersCount: 85000,
    productsCount: 1200,
    isFollowed: false,
    onFollow: fn(),
    onEnter: fn(),
    onChat: fn(),
  },
};

export const SmallShop: Story = {
  args: {
    name: 'Micro Electronics',
    logo: 'https://picsum.photos/seed/shop3/112/112',
    rating: 4.2,
    followersCount: 156,
    productsCount: 28,
    responseRate: 75,
    isFollowed: false,
    onFollow: fn(),
    onEnter: fn(),
  },
};

export const WithoutChat: Story = {
  args: {
    name: 'Apple Premium Reseller Tashkent',
    logo: 'https://picsum.photos/seed/shop4/112/112',
    rating: 5.0,
    followersCount: 45000,
    productsCount: 89,
    responseRate: 100,
    isFollowed: true,
    onFollow: fn(),
    onEnter: fn(),
  },
};
