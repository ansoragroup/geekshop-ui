import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopCell } from './DesktopCell';

const meta = {
  title: 'Data Display (Desktop)/DesktopCell',
  component: DesktopCell,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    onClick: { action: 'clicked' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopCell>;

export default meta;
type Story = StoryObj<typeof meta>;

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M3.5 17.5c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M10 2v2M10 16v2M2 10h2M16 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M4.2 15.8l1.4-1.4M14.4 5.6l1.4-1.4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M10 2L3.5 5.5V10c0 4 2.5 7 6.5 9 4-2 6.5-5 6.5-9V5.5L10 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M7 10l2 2 4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M10 2a5 5 0 00-5 5v3l-1.5 2h13L15 10V7a5 5 0 00-5-5zM8.5 17h3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const WalletIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="5" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 9h16" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="14" cy="12.5" r="1" fill="currentColor" />
  </svg>
);

export const Default: Story = {
  args: {
    title: 'Account Settings',
    description: 'Manage your profile and preferences',
    showArrow: true,
  },
};

export const FullFeatured: Story = {
  name: 'Full Featured (All Props)',
  args: {
    title: 'Profile',
    description: 'View and edit your personal information',
    value: 'Verified',
    icon: <UserIcon />,
    showArrow: true,
    border: true,
  },
};

export const WithValue: Story = {
  args: {
    title: 'Language',
    value: 'English',
    showArrow: true,
  },
};

export const WithIcon: Story = {
  args: {
    title: 'Profile',
    description: 'View and edit your profile',
    icon: <UserIcon />,
    showArrow: true,
  },
};

export const NonInteractive: Story = {
  name: 'Non-Interactive (Display Only)',
  args: {
    title: 'Order ID',
    value: 'GS-2026-0047',
    border: true,
  },
};

export const WithBorder: Story = {
  name: 'With Bottom Border',
  args: {
    title: 'Email',
    value: 'john@example.com',
    border: true,
  },
};

export const CellList: Story = {
  name: 'Cell List (Settings Page)',
  render: () => (
    <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden' }}>
      <DesktopCell
        title="Account"
        description="Manage your account settings"
        icon={<UserIcon />}
        showArrow
        border
        onClick={() => {}}
      />
      <DesktopCell
        title="Settings"
        description="App preferences and configuration"
        icon={<SettingsIcon />}
        showArrow
        border
        onClick={() => {}}
      />
      <DesktopCell
        title="Security"
        description="Password, 2FA, and login history"
        icon={<ShieldIcon />}
        value="Enabled"
        showArrow
        border
        onClick={() => {}}
      />
      <DesktopCell
        title="Notifications"
        description="Push and email notification preferences"
        icon={<BellIcon />}
        value="3 new"
        showArrow
        border
        onClick={() => {}}
      />
      <DesktopCell
        title="Payment Methods"
        description="Manage cards and wallets"
        icon={<WalletIcon />}
        showArrow
        onClick={() => {}}
      />
    </div>
  ),
};

export const OrderDetailCells: Story = {
  name: 'Order Detail Cells (Non-Interactive)',
  render: () => (
    <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden' }}>
      <DesktopCell title="Order Number" value="GS-2026-0047" border />
      <DesktopCell title="Order Date" value="14 March 2026, 10:30 AM" border />
      <DesktopCell title="Payment Method" value="Visa ending 4242" border />
      <DesktopCell title="Shipping Address" value="123 Navoi St, Tashkent" border />
      <DesktopCell
        title="Total Amount"
        value={<span style={{ color: '#FF0000', fontWeight: 600 }}>23,700,000 UZS</span>}
      />
    </div>
  ),
};

export const TitleOnly: Story = {
  name: 'Title Only (Minimal)',
  args: {
    title: 'Help & Support',
    showArrow: true,
  },
};

export const LongDescription: Story = {
  args: {
    title: 'Privacy Settings',
    description:
      'Control who can see your profile, order history, reviews, and wishlist. You can also manage your data sharing preferences with third-party partners.',
    icon: <ShieldIcon />,
    showArrow: true,
  },
};

export const ReactNodeValue: Story = {
  name: 'ReactNode as Value',
  args: {
    title: 'Status',
    value: (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          color: '#07C160',
          fontSize: 13,
          fontWeight: 500,
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#07C160' }} />
        Active
      </span>
    ),
    border: true,
  },
};
