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

export const WithNotifications: Story = {
  args: {
    empty: false,
  },
};

export const EmptyState: Story = {
  args: {
    empty: true,
  },
};
