import type { Meta, StoryObj } from '@storybook/react-vite';
import { CustomerServicePage } from './CustomerServicePage';

const meta = {
  title: 'Pages/CustomerServicePage',
  component: CustomerServicePage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof CustomerServicePage>;

export default meta;
type Story = StoryObj<typeof CustomerServicePage>;

/** Default: chat with bot greeting and user message with bot reply */
export const Default: Story = {};

/** Empty chat — only bot greeting and FAQ chips visible (new conversation) */
export const Empty: Story = {
  args: {
    hasMessages: false,
  },
};

/** Active conversation with messages exchanged between user and bot */
export const ActiveConversation: Story = {
  args: {
    hasMessages: true,
  },
};

/** New conversation showing FAQ quick action chips (order status, payment, return, delivery) */
export const WithFAQChips: Story = {
  args: {
    hasMessages: false,
  },
};

/** Chat with bot reply containing a "Track Order" action button */
export const WithActionButton: Story = {
  args: {
    hasMessages: true,
  },
};
