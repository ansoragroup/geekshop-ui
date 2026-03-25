import type { Meta, StoryObj } from '@storybook/react-vite';
import { SettingsPage } from './SettingsPage';

const meta = {
  title: 'Pages/SettingsPage',
  component: SettingsPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof SettingsPage>;

export default meta;
type Story = StoryObj<typeof SettingsPage>;

/** Default: all settings sections (notifications, language, currency, account, about) */
export const Default: Story = {
  args: {
    showDeleteConfirm: false,
  },
};

/** Delete account confirmation popup visible */
export const DeleteAccountConfirm: Story = {
  args: {
    showDeleteConfirm: true,
  },
};

/** Notification preferences with toggles (order updates, promo alerts, email, push) */
export const NotificationSettings: Story = {
  args: {
    showDeleteConfirm: false,
  },
};

/** Language and currency switcher section */
export const LanguageAndCurrency: Story = {
  args: {
    showDeleteConfirm: false,
  },
};

/** Account section with change password and delete account options */
export const AccountSection: Story = {
  args: {
    showDeleteConfirm: false,
  },
};

/** About section with app version, terms of service, and privacy policy */
export const AboutSection: Story = {
  args: {
    showDeleteConfirm: false,
  },
};
