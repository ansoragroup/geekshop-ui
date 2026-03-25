import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProfilePage } from './ProfilePage';

const meta = {
  title: 'Pages/ProfilePage',
  component: ProfilePage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof ProfilePage>;

export default meta;
type Story = StoryObj<typeof ProfilePage>;

/** Default: returning user (Jasur Karimov) with orders, addresses, payment methods */
export const Default: Story = {
  args: {
    newUser: false,
  },
};

/** New/guest user — no avatar, no addresses, no payment methods, login prompt */
export const NewUser: Story = {
  args: {
    newUser: true,
  },
};

/** Returning user with address card preview and payment method preview */
export const WithPreviewCards: Story = {
  name: 'With Preview Cards',
  args: {
    newUser: false,
  },
};

/** Profile showing order badge count (3) and favorites badge count (12) */
export const WithBadgeCounts: Story = {
  name: 'With Badge Counts',
  args: {
    newUser: false,
  },
};

/** Full profile layout with all sections: orders, addresses, payment, settings, logout */
export const FullProfile: Story = {
  name: 'Full Profile',
  args: {
    newUser: false,
  },
};
