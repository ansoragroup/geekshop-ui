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
    <path d="M3.5 17.5c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M4.2 15.8l1.4-1.4M14.4 5.6l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2L3.5 5.5V10c0 4 2.5 7 6.5 9 4-2 6.5-5 6.5-9V5.5L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Default: Story = {
  args: {
    title: 'Account Settings',
    description: 'Manage your profile and preferences',
    showArrow: true,
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

export const CellList: Story = {
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
        onClick={() => {}}
      />
    </div>
  ),
};

export const NonInteractive: Story = {
  args: {
    title: 'Order ID',
    value: 'GS-2026-0047',
    border: true,
  },
};
