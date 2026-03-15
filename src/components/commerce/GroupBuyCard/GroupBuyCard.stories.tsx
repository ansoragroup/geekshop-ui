import type { Meta, StoryObj } from '@storybook/react-vite';
import { GroupBuyCard } from './GroupBuyCard';

const meta = {
  title: 'Commerce/GroupBuyCard',
  component: GroupBuyCard,
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
} satisfies Meta<typeof GroupBuyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleProduct = {
  name: 'NVIDIA GeForce RTX 4060 Ti 8GB GDDR6',
  image: 'https://picsum.photos/seed/gpu1/200/200',
  price: 4_199_000,
  originalPrice: 5_999_000,
};

export const Default: Story = {
  args: {
    product: sampleProduct,
    groupSize: 3,
    currentMembers: 2,
    memberAvatars: [
      'https://i.pravatar.cc/80?u=aziz',
      'https://i.pravatar.cc/80?u=nodira',
    ],
    timeLeft: 4 * 3600 + 23 * 60,
    onJoinGroup: () => console.log('Join group'),
    onBuyAlone: () => console.log('Buy alone'),
  },
};

export const OneJoined: Story = {
  args: {
    product: {
      name: 'Intel Core i7-14700K Processor 20-Core',
      image: 'https://picsum.photos/seed/cpu1/200/200',
      price: 3_499_000,
      originalPrice: 4_799_000,
    },
    groupSize: 5,
    currentMembers: 1,
    memberAvatars: ['https://i.pravatar.cc/80?u=bobur'],
    timeLeft: 12 * 3600,
    onJoinGroup: () => console.log('Join group'),
    onBuyAlone: () => console.log('Buy alone'),
  },
};

export const GroupFull: Story = {
  args: {
    product: {
      name: 'Samsung 990 EVO Plus SSD 2TB NVMe M.2',
      image: 'https://picsum.photos/seed/ssd1/200/200',
      price: 1_299_000,
      originalPrice: 1_799_000,
    },
    groupSize: 3,
    currentMembers: 3,
    memberAvatars: [
      'https://i.pravatar.cc/80?u=user1',
      'https://i.pravatar.cc/80?u=user2',
      'https://i.pravatar.cc/80?u=user3',
    ],
    timeLeft: 2 * 3600,
    onJoinGroup: () => console.log('Join group'),
    onBuyAlone: () => console.log('Buy alone'),
  },
};

export const AlmostExpired: Story = {
  args: {
    product: {
      name: 'Logitech G Pro X Superlight 2 Wireless Mouse',
      image: 'https://picsum.photos/seed/mouse1/200/200',
      price: 799_000,
      originalPrice: 1_199_000,
    },
    groupSize: 3,
    currentMembers: 1,
    memberAvatars: ['https://i.pravatar.cc/80?u=kamol'],
    timeLeft: 180,
    onJoinGroup: () => console.log('Join group'),
    onBuyAlone: () => console.log('Buy alone'),
  },
};

export const NoAvatars: Story = {
  args: {
    product: {
      name: 'Kingston FURY Beast DDR5 32GB (2x16GB) 6000MHz',
      image: 'https://picsum.photos/seed/ram1/200/200',
      price: 899_000,
      originalPrice: 1_299_000,
    },
    groupSize: 4,
    currentMembers: 2,
    timeLeft: 8 * 3600,
    onJoinGroup: () => console.log('Join group'),
    onBuyAlone: () => console.log('Buy alone'),
  },
};

export const NarrowWidth: Story = {
  args: {
    ...Default.args,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
};
