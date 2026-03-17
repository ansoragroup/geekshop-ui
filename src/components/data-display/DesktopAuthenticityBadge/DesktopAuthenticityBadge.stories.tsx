import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopAuthenticityBadge } from './DesktopAuthenticityBadge';

const meta = {
  title: 'Data Display (Desktop)/DesktopAuthenticityBadge',
  component: DesktopAuthenticityBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 900, padding: 24, background: '#f5f5f5', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopAuthenticityBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Verified: Story = {
  args: {
    status: 'verified',
    verifiedBy: 'GeekShop Verify',
    verifiedDate: '15 Mar 2026',
  },
};

export const Official: Story = {
  args: {
    status: 'official',
    verifiedBy: 'Samsung Official',
    verifiedDate: '10 Jan 2026',
    tooltip: 'This is an official Samsung store verified by GeekShop',
  },
};

export const Unverified: Story = {
  args: {
    status: 'unverified',
    verifiedBy: 'GeekShop Verify',
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <DesktopAuthenticityBadge status="verified" verifiedBy="GeekShop Verify" verifiedDate="15 Mar 2026" />
      <DesktopAuthenticityBadge status="official" verifiedBy="Apple Official" verifiedDate="1 Feb 2026" />
      <DesktopAuthenticityBadge status="unverified" />
    </div>
  ),
};
