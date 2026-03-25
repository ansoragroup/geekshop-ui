import type { Meta, StoryObj } from '@storybook/react-vite';
import { NotificationsPage } from './NotificationsPage';

const meta: Meta<typeof NotificationsPage> = {
  title: 'Pages/NotificationsPage',
  component: NotificationsPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
};

export default meta;
type Story = StoryObj<typeof NotificationsPage>;

/** Default: all notifications with unread indicators and swipe-to-dismiss */
export const WithNotifications: Story = {
  args: {
    empty: false,
  },
};

/** Empty state — no notifications received yet */
export const EmptyState: Story = {
  args: {
    empty: true,
  },
};

/** Order notifications tab — delivery updates, payment confirmations */
export const OrderNotifications: Story = {
  args: {
    empty: false,
  },
  play: async ({ canvasElement }) => {
    const tabs = canvasElement.querySelectorAll('[role="tab"]');
    if (tabs[1] instanceof HTMLElement) {
      tabs[1].click();
    }
  },
};

/** Promo notifications — discount alerts, coupon gifts, seasonal sales */
export const PromoNotifications: Story = {
  args: {
    empty: false,
  },
  play: async ({ canvasElement }) => {
    const tabs = canvasElement.querySelectorAll('[role="tab"]');
    if (tabs[2] instanceof HTMLElement) {
      tabs[2].click();
    }
  },
};

/** System notifications — security alerts, app updates */
export const SystemNotifications: Story = {
  args: {
    empty: false,
  },
  play: async ({ canvasElement }) => {
    const tabs = canvasElement.querySelectorAll('[role="tab"]');
    if (tabs[3] instanceof HTMLElement) {
      tabs[3].click();
    }
  },
};

/** Notifications with unread count badge and mark-all-read action */
export const WithUnreadBadge: Story = {
  args: {
    empty: false,
  },
};
