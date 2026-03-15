import type { Meta, StoryObj } from '@storybook/react-vite';
import { SocialProof } from './SocialProof';

const meta = {
  title: 'Content/SocialProof',
  component: SocialProof,
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
} satisfies Meta<typeof SocialProof>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleAvatars = [
  'https://i.pravatar.cc/60?u=buyer1',
  'https://i.pravatar.cc/60?u=buyer2',
  'https://i.pravatar.cc/60?u=buyer3',
  'https://i.pravatar.cc/60?u=buyer4',
  'https://i.pravatar.cc/60?u=buyer5',
];

export const Default: Story = {
  args: {
    count: 243,
    variant: 'text',
    period: 'bugun',
  },
};

export const WithAvatars: Story = {
  args: {
    count: 1250,
    variant: 'text',
    avatars: sampleAvatars,
    maxAvatars: 3,
    period: 'shu hafta',
  },
};

export const ToastVariant: Story = {
  args: {
    count: 1,
    variant: 'toast',
    buyerName: 'Sardor A.',
    timeAgo: '2 min',
    avatars: ['https://i.pravatar.cc/60?u=sardor'],
  },
};

export const ToastNoAvatar: Story = {
  args: {
    count: 156,
    variant: 'toast',
    period: 'bugun',
  },
};

export const BadgeVariant: Story = {
  args: {
    count: 5400,
    variant: 'badge',
  },
};

export const HighCount: Story = {
  args: {
    count: 15600,
    variant: 'text',
    period: 'shu oy',
  },
};

export const AllVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
    <div>
      <h4 style={{ marginBottom: 8, fontSize: 14, color: '#666' }}>Text (default)</h4>
      <SocialProof count={243} period="bugun" />
    </div>
    <div>
      <h4 style={{ marginBottom: 8, fontSize: 14, color: '#666' }}>Text with avatars</h4>
      <SocialProof
        count={1250}
        avatars={sampleAvatars}
        maxAvatars={3}
        period="shu hafta"
      />
    </div>
    <div>
      <h4 style={{ marginBottom: 8, fontSize: 14, color: '#666' }}>Toast (individual purchase)</h4>
      <SocialProof
        count={1}
        variant="toast"
        buyerName="Sardor A."
        timeAgo="2 min"
        avatars={['https://i.pravatar.cc/60?u=sardor']}
      />
    </div>
    <div>
      <h4 style={{ marginBottom: 8, fontSize: 14, color: '#666' }}>Badge</h4>
      <SocialProof count={5400} variant="badge" />
    </div>
  </div>
);
