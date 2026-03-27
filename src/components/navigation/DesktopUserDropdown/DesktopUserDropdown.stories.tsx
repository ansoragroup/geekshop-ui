import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DesktopUserDropdown } from './DesktopUserDropdown';

const ProfileIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21v-1a6 6 0 0112 0v1" />
  </svg>
);

const OrdersIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M8 7h8M8 12h8M8 17h4" />
  </svg>
);

const WishlistIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
  </svg>
);

const SettingsIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const defaultItems = [
  { label: 'My Profile', icon: <ProfileIcon />, onClick: fn() },
  { label: 'My Orders', icon: <OrdersIcon />, onClick: fn() },
  { label: 'Wishlist', icon: <WishlistIcon />, onClick: fn() },
  { label: 'Settings', icon: <SettingsIcon />, onClick: fn() },
];

const meta = {
  title: 'Navigation (Desktop)/DesktopUserDropdown',
  component: DesktopUserDropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 300, display: 'flex', justifyContent: 'flex-end', padding: 16 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopUserDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    isLoggedIn: true,
    userName: 'John Doe',
    userEmail: 'john@example.com',
    items: defaultItems,
    onSignOut: fn(),
  },
};

export const LoggedInWithAvatar: Story = {
  args: {
    isLoggedIn: true,
    userName: 'Alisher Karimov',
    userEmail: 'alisher@geekshop.uz',
    userAvatar: 'https://i.pravatar.cc/100?u=alisher',
    items: defaultItems,
    onSignOut: fn(),
  },
};

export const LoggedOut: Story = {
  args: {
    isLoggedIn: false,
    onSignIn: fn(),
  },
};

export const LongUserName: Story = {
  args: {
    isLoggedIn: true,
    userName: 'Abdulaziz Mukhammadkarimov',
    userEmail: 'abdulaziz.mukhammadkarimov@longdomain.com',
    items: defaultItems,
    onSignOut: fn(),
  },
};

export const NoMenuItems: Story = {
  args: {
    isLoggedIn: true,
    userName: 'Basic User',
    userEmail: 'basic@geekshop.uz',
    items: [],
    onSignOut: fn(),
  },
};
