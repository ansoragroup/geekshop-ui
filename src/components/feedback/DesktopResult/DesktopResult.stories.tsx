import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DesktopResult } from './DesktopResult';

const meta = {
  title: 'Feedback (Desktop)/DesktopResult',
  component: DesktopResult,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600, padding: 24, background: '#fff', borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopResult>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    status: 'success',
    title: 'Order Placed Successfully!',
    description: 'Your order #GS-2024-78541 has been confirmed. You will receive a confirmation email shortly.',
    primaryAction: { label: 'View Order', onClick: fn() },
    secondaryAction: { label: 'Continue Shopping', onClick: fn() },
  },
};

export const Error: Story = {
  args: {
    status: 'error',
    title: 'Payment Failed',
    description: 'We could not process your payment. Please check your card details and try again.',
    primaryAction: { label: 'Try Again', onClick: fn() },
    secondaryAction: { label: 'Change Payment', onClick: fn() },
  },
};

export const Warning: Story = {
  args: {
    status: 'warning',
    title: 'Out of Stock',
    description: 'Some items in your cart are no longer available. We have removed them automatically.',
    primaryAction: { label: 'Review Cart', onClick: fn() },
  },
};

export const Info: Story = {
  args: {
    status: 'info',
    title: 'Account Verification Required',
    description: 'Please verify your email address to complete your registration and start shopping.',
    primaryAction: { label: 'Resend Email', onClick: fn() },
    secondaryAction: { label: 'Change Email', onClick: fn() },
  },
};

export const NoActions: Story = {
  args: {
    status: 'success',
    title: 'All Caught Up!',
    description: 'You have no new notifications at this time.',
  },
};
