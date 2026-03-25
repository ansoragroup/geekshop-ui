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

/** Refund request submitted, under review — timeline at step 0 */
export const Processing: Story = {
  args: { status: 'processing' },
};

/** Refund approved by support — timeline at step 2, awaiting money transfer */
export const Approved: Story = {
  args: { status: 'approved' },
};

/** Refund fully completed — money returned, all timeline steps done */
export const Refunded: Story = {
  args: { status: 'refunded' },
};

/** Refund request rejected by support — error result, timeline stops at review */
export const Rejected: Story = {
  args: { status: 'rejected' },
};

/** Processing state on narrow iPhone SE — verifies timeline and amount card fit */
export const ProcessingOnSmallScreen: Story = {
  args: { status: 'processing' },
  parameters: {
    viewport: { defaultViewport: 'iPhoneSE' },
  },
};

/** Rejected state on narrow device — verifies error result and contact button layout */
export const RejectedOnSmallScreen: Story = {
  args: { status: 'rejected' },
  parameters: {
    viewport: { defaultViewport: 'iPhoneSE' },
  },
};
