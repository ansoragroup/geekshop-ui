import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DesktopGroupBuyCard } from './DesktopGroupBuyCard';

const meta = {
  title: 'Commerce (Desktop)/DesktopGroupBuyCard',
  component: DesktopGroupBuyCard,
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
} satisfies Meta<typeof DesktopGroupBuyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default: group buy in progress, 3 of 5 members joined, 2 hours left. */
export const Default: Story = {
  args: {
    product: {
      name: 'Apple AirPods Pro 2nd Generation with USB-C',
      image: 'https://images.unsplash.com/photo-1606220838315-056192d5e927?w=200&h=200&fit=crop',
      price: 2_800_000,
      originalPrice: 3_500_000,
    },
    groupSize: 5,
    currentMembers: 3,
    memberAvatars: [
      'https://i.pravatar.cc/64?img=1',
      'https://i.pravatar.cc/64?img=2',
    ],
    timeLeft: 7200,
    onJoinGroup: fn(),
    onBuyAlone: fn(),
  },
};

/** Almost full: only 1 slot remaining, urgency state. */
export const AlmostFull: Story = {
  args: {
    product: {
      name: 'Samsung Galaxy Buds3 Pro Wireless Earbuds',
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=200&h=200&fit=crop',
      price: 1_200_000,
      originalPrice: 1_800_000,
    },
    groupSize: 3,
    currentMembers: 2,
    memberAvatars: [
      'https://i.pravatar.cc/64?img=5',
      'https://i.pravatar.cc/64?img=6',
    ],
    timeLeft: 1800,
    onJoinGroup: fn(),
    onBuyAlone: fn(),
  },
};

/** Full group: all slots filled, can no longer join. */
export const Full: Story = {
  args: {
    product: {
      name: 'Sony WH-1000XM5 Wireless Headphones',
      image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&h=200&fit=crop',
      price: 3_200_000,
      originalPrice: 4_200_000,
    },
    groupSize: 3,
    currentMembers: 3,
    memberAvatars: [
      'https://i.pravatar.cc/64?img=10',
      'https://i.pravatar.cc/64?img=11',
      'https://i.pravatar.cc/64?img=12',
    ],
    timeLeft: 3600,
    onJoinGroup: fn(),
    onBuyAlone: fn(),
  },
};

/** Expired: timer at 0, group buy ended. */
export const Expired: Story = {
  args: {
    product: {
      name: 'JBL Charge 5 Portable Bluetooth Speaker',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop',
      price: 1_500_000,
      originalPrice: 2_000_000,
    },
    groupSize: 4,
    currentMembers: 2,
    memberAvatars: [
      'https://i.pravatar.cc/64?img=20',
    ],
    timeLeft: 0,
    onJoinGroup: fn(),
    onBuyAlone: fn(),
  },
};

/** Large group: 10 members needed, currently 6 joined. */
export const LargeGroup: Story = {
  args: {
    product: {
      name: 'Xiaomi Robot Vacuum X20 Pro',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=200&h=200&fit=crop',
      price: 4_500_000,
      originalPrice: 6_800_000,
    },
    groupSize: 10,
    currentMembers: 6,
    memberAvatars: [
      'https://i.pravatar.cc/64?img=30',
      'https://i.pravatar.cc/64?img=31',
      'https://i.pravatar.cc/64?img=32',
      'https://i.pravatar.cc/64?img=33',
      'https://i.pravatar.cc/64?img=34',
    ],
    timeLeft: 14400,
    onJoinGroup: fn(),
    onBuyAlone: fn(),
  },
};

/** Just started: 0 members joined, full timer. */
export const JustStarted: Story = {
  args: {
    product: {
      name: 'Logitech G Pro X Superlight 2 Wireless Mouse',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop',
      price: 1_100_000,
      originalPrice: 1_600_000,
    },
    groupSize: 5,
    currentMembers: 0,
    memberAvatars: [],
    timeLeft: 86400,
    onJoinGroup: fn(),
    onBuyAlone: fn(),
  },
};

/** Single member needed (2-person group). */
export const TwoPersonGroup: Story = {
  args: {
    product: {
      name: 'Apple iPad Air M2 11" 256GB',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=200&fit=crop',
      price: 7_200_000,
      originalPrice: 9_500_000,
    },
    groupSize: 2,
    currentMembers: 1,
    memberAvatars: [
      'https://i.pravatar.cc/64?img=40',
    ],
    timeLeft: 5400,
    onJoinGroup: fn(),
    onBuyAlone: fn(),
  },
};

/** Very short time left (under 5 minutes). */
export const UrgentTimer: Story = {
  args: {
    product: {
      name: 'Marshall Emberton II Portable Speaker',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop',
      price: 1_800_000,
      originalPrice: 2_500_000,
    },
    groupSize: 4,
    currentMembers: 3,
    memberAvatars: [
      'https://i.pravatar.cc/64?img=50',
      'https://i.pravatar.cc/64?img=51',
      'https://i.pravatar.cc/64?img=52',
    ],
    timeLeft: 180,
    onJoinGroup: fn(),
    onBuyAlone: fn(),
  },
};
