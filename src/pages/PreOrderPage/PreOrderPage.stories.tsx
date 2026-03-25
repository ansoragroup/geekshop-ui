import type { Meta, StoryObj } from '@storybook/react-vite';
import { PreOrderPage } from './PreOrderPage';

const meta = {
  title: 'Pages/PreOrderPage',
  component: PreOrderPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof PreOrderPage>;

export default meta;
type Story = StoryObj<typeof PreOrderPage>;

/** Default: pre-order mode with variant selector, quantity, and deposit info */
export const Default: Story = {
  args: {
    notifyOnly: false,
  },
};

/** Notify-only mode — product not available for pre-order yet, only notification signup */
export const NotifyMode: Story = {
  args: {
    notifyOnly: true,
  },
};

/** Pre-order with variant selection available (12GB Black, 12GB White, 16GB Black) */
export const WithVariantSelection: Story = {
  args: {
    notifyOnly: false,
  },
};

/** Pre-order showing deposit amount (10% of price) and payment terms */
export const DepositInfo: Story = {
  args: {
    notifyOnly: false,
  },
};

/** Pre-order terms section — cancellation policy, notify-on-arrival, pay-later info */
export const PreOrderTerms: Story = {
  name: 'Pre-Order Terms',
  args: {
    notifyOnly: false,
  },
};
