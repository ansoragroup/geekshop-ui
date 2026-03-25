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
  'https://i.pravatar.cc/80?img=8',
  'https://i.pravatar.cc/80?img=9',
];

const sampleBuyers = [
  { name: 'Ali K.', avatar: 'https://i.pravatar.cc/40?img=10' },
  { name: 'Nodira M.', avatar: 'https://i.pravatar.cc/40?img=11' },
  { name: 'Sardor B.', avatar: 'https://i.pravatar.cc/40?img=12' },
  { name: 'Dilnoza R.', avatar: 'https://i.pravatar.cc/40?img=13' },
  { name: 'Otabek S.', avatar: 'https://i.pravatar.cc/40?img=14' },
];

const meta = {
  title: 'Content (Desktop)/DesktopSocialProof',
  component: DesktopSocialProof,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    maxAvatars: { control: { type: 'range', min: 1, max: 10, step: 1 } },
    maxRecentBuyers: { control: { type: 'range', min: 1, max: 5, step: 1 } },
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

// ─── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    count: 2450,
    avatars: sampleAvatars.slice(0, 5),
    maxAvatars: 5,
    period: 'this week',
  },
};

// ─── Full Featured ───────────────────────────────────────────────────────────

export const FullFeatured: Story = {
  name: 'Full Featured (all props)',
  args: {
    count: 3680,
    avatars: sampleAvatars,
    maxAvatars: 5,
    recentBuyers: sampleBuyers,
    maxRecentBuyers: 3,
    period: 'today',
  },
};

// ─── With Recent Buyers ──────────────────────────────────────────────────────

export const WithRecentBuyers: Story = {
  args: {
    count: 1280,
    avatars: sampleAvatars.slice(0, 4),
    recentBuyers: sampleBuyers.slice(0, 3),
    maxRecentBuyers: 3,
    period: 'today',
  },
};

// ─── Large Count (10k+) ─────────────────────────────────────────────────────

export const LargeCount: Story = {
  args: {
    count: 15600,
    avatars: sampleAvatars,
    maxAvatars: 5,
    period: 'this month',
  },
};

// ─── Very Large Count ────────────────────────────────────────────────────────

export const VeryLargeCount: Story = {
  name: 'Edge: Very Large Count (100k+)',
  args: {
    count: 156000,
    avatars: sampleAvatars.slice(0, 6),
    maxAvatars: 5,
    period: 'total',
  },
};

// ─── Small Count ─────────────────────────────────────────────────────────────

export const SmallCount: Story = {
  name: 'Edge: Small Count (12)',
  args: {
    count: 12,
    avatars: sampleAvatars.slice(0, 3),
    maxAvatars: 5,
    period: 'in the last hour',
  },
};

// ─── No Avatars ──────────────────────────────────────────────────────────────

export const NoAvatars: Story = {
  name: 'Minimal (no avatars)',
  args: {
    count: 340,
    period: 'in the last hour',
  },
};

// ─── Recent Buyers Only ──────────────────────────────────────────────────────

export const RecentBuyersOnly: Story = {
  name: 'Recent Buyers Only (no avatar stack)',
  args: {
    count: 890,
    recentBuyers: sampleBuyers,
    maxRecentBuyers: 4,
    period: 'today',
  },
};

// ─── Many Avatars (overflow) ─────────────────────────────────────────────────

export const ManyAvatars: Story = {
  name: 'Many Avatars (9, overflow at 5)',
  args: {
    count: 4500,
    avatars: sampleAvatars,
    maxAvatars: 5,
    period: 'this week',
  },
};

// ─── Max 3 Avatars ───────────────────────────────────────────────────────────

export const ThreeAvatars: Story = {
  name: 'maxAvatars: 3',
  args: {
    count: 2100,
    avatars: sampleAvatars.slice(0, 6),
    maxAvatars: 3,
    period: 'today',
  },
};

// ─── No Period ───────────────────────────────────────────────────────────────

export const NoPeriod: Story = {
  name: 'Without Period Text',
  args: {
    count: 5200,
    avatars: sampleAvatars.slice(0, 5),
    maxAvatars: 5,
  },
};

// ─── Buyers Without Avatars ──────────────────────────────────────────────────

export const BuyersNoAvatars: Story = {
  name: 'Buyers without Avatar Images',
  args: {
    count: 670,
    recentBuyers: [
      { name: 'Ali K.' },
      { name: 'Nodira M.' },
      { name: 'Sardor B.' },
    ],
    maxRecentBuyers: 3,
    period: 'today',
  },
};
