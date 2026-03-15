import type { Meta, StoryObj } from '@storybook/react-vite';
import { RefundStatusPage } from './RefundStatusPage';

const meta = {
  title: 'Pages/RefundStatusPage',
  component: RefundStatusPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof RefundStatusPage>;

export default meta;
type Story = StoryObj<typeof RefundStatusPage>;

export const Processing: Story = {
  args: { status: 'processing' },
};

export const Approved: Story = {
  args: { status: 'approved' },
};

export const Refunded: Story = {
  args: { status: 'refunded' },
};

export const Rejected: Story = {
  args: { status: 'rejected' },
};
