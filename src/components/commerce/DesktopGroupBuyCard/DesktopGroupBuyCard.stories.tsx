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

export const Default: Story = {
  args: {
    product: {
      name: 'Apple AirPods Pro 2nd Generation with USB-C',
      image: 'https://picsum.photos/seed/airpods/200/200',
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

export const AlmostFull: Story = {
  args: {
    product: {
      name: 'Samsung Galaxy Buds3 Pro',
      image: 'https://picsum.photos/seed/buds/200/200',
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

export const Full: Story = {
  args: {
    product: {
      name: 'Sony WH-1000XM5 Headphones',
      image: 'https://picsum.photos/seed/sony/200/200',
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

export const Expired: Story = {
  args: {
    product: {
      name: 'JBL Charge 5 Portable Speaker',
      image: 'https://picsum.photos/seed/jbl/200/200',
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
