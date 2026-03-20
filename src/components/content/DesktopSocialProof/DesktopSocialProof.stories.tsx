import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopSocialProof } from './DesktopSocialProof';

const sampleAvatars = [
  'https://i.pravatar.cc/80?img=1',
  'https://i.pravatar.cc/80?img=2',
  'https://i.pravatar.cc/80?img=3',
  'https://i.pravatar.cc/80?img=4',
  'https://i.pravatar.cc/80?img=5',
  'https://i.pravatar.cc/80?img=6',
  'https://i.pravatar.cc/80?img=7',
];

const sampleBuyers = [
  { name: 'Ali K.', avatar: 'https://i.pravatar.cc/40?img=10' },
  { name: 'Nodira M.', avatar: 'https://i.pravatar.cc/40?img=11' },
  { name: 'Sardor B.', avatar: 'https://i.pravatar.cc/40?img=12' },
  { name: 'Dilnoza R.', avatar: 'https://i.pravatar.cc/40?img=13' },
];

const meta = {
  title: 'Content (Desktop)/DesktopSocialProof',
  component: DesktopSocialProof,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 900, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopSocialProof>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 2450,
    avatars: sampleAvatars,
    maxAvatars: 5,
    period: 'this week',
  },
};

export const WithRecentBuyers: Story = {
  args: {
    count: 1280,
    avatars: sampleAvatars.slice(0, 4),
    recentBuyers: sampleBuyers,
    maxRecentBuyers: 3,
    period: 'today',
  },
};

export const LargeCount: Story = {
  args: {
    count: 15600,
    avatars: sampleAvatars,
    maxAvatars: 5,
    period: 'this month',
  },
};

export const MinimalNoAvatars: Story = {
  name: 'Minimal (no avatars)',
  args: {
    count: 340,
    period: 'in the last hour',
  },
};

export const WithBuyersNoAvatarStack: Story = {
  name: 'Recent Buyers Only',
  args: {
    count: 890,
    recentBuyers: sampleBuyers,
    maxRecentBuyers: 4,
    period: 'today',
  },
};
