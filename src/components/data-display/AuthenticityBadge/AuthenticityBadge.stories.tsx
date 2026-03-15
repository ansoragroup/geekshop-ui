import type { Meta, StoryObj } from '@storybook/react-vite';
import { AuthenticityBadge } from './AuthenticityBadge';

const meta = {
  title: 'Data Display/AuthenticityBadge',
  component: AuthenticityBadge,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: ['verified', 'pending', 'unverified'] },
    type: { control: 'select', options: ['inline', 'card'] },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 390, padding: 24, background: '#F5F5F5', borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AuthenticityBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InlineVerified: Story = {
  args: {
    status: 'verified',
    type: 'inline',
  },
};

export const InlinePending: Story = {
  args: {
    status: 'pending',
    type: 'inline',
  },
};

export const InlineUnverified: Story = {
  args: {
    status: 'unverified',
    type: 'inline',
  },
};

export const CardVerified: Story = {
  args: {
    status: 'verified',
    type: 'card',
    verifiedBy: 'GeekShop Verify',
    verifiedDate: '2026-03-15',
  },
};

export const CardPending: Story = {
  args: {
    status: 'pending',
    type: 'card',
    verifiedBy: 'GeekShop Verify',
    verifiedDate: '2026-03-14',
  },
};

export const CardUnverified: Story = {
  args: {
    status: 'unverified',
    type: 'card',
    verifiedBy: 'GeekShop Verify',
  },
};

export const AllInlineStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, background: '#fff', padding: 16, borderRadius: 12 }}>
      <AuthenticityBadge status="verified" />
      <AuthenticityBadge status="pending" />
      <AuthenticityBadge status="unverified" />
    </div>
  ),
};

export const AllCardStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <AuthenticityBadge status="verified" type="card" verifiedDate="2026-03-15" />
      <AuthenticityBadge status="pending" type="card" verifiedDate="2026-03-14" />
      <AuthenticityBadge status="unverified" type="card" />
    </div>
  ),
};

export const CustomVerifier: Story = {
  args: {
    status: 'verified',
    type: 'card',
    verifiedBy: 'Poizon Authentication',
    verifiedDate: '2026-03-10',
  },
};

export const InProductContext: Story = {
  render: () => (
    <div style={{ background: '#fff', padding: 16, borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A' }}>
        Nike Air Jordan 1 Retro High OG
      </div>
      <div style={{ fontSize: 20, fontWeight: 700, color: '#FF0000' }}>
        2,450,000 so'm
      </div>
      <AuthenticityBadge status="verified" />
    </div>
  ),
};
