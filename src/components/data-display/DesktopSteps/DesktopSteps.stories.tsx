import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopSteps } from './DesktopSteps';

const meta = {
  title: 'Data Display (Desktop)/DesktopSteps',
  component: DesktopSteps,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 900, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopSteps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    current: 1,
    items: [
      { title: 'Cart Review', description: 'Review items in your cart' },
      { title: 'Shipping', description: 'Select delivery address' },
      { title: 'Payment', description: 'Choose payment method' },
      { title: 'Confirmation', description: 'Review and place order' },
    ],
  },
};

export const AllCompleted: Story = {
  args: {
    current: 4,
    items: [
      { title: 'Cart Review' },
      { title: 'Shipping' },
      { title: 'Payment' },
      { title: 'Confirmation' },
    ],
  },
};

export const WithError: Story = {
  args: {
    current: 2,
    items: [
      { title: 'Account', description: 'Sign in or create account' },
      { title: 'Verification', description: 'Verify your email' },
      { title: 'Payment', description: 'Payment failed', status: 'error' },
      { title: 'Done', description: 'Order confirmed' },
    ],
  },
};

export const Vertical: Story = {
  args: {
    current: 2,
    direction: 'vertical',
    items: [
      { title: 'Order Placed', description: 'Your order has been received' },
      { title: 'Processing', description: 'We are preparing your items' },
      { title: 'Quality Check', description: 'Items are being inspected' },
      { title: 'Shipped', description: 'On its way to you' },
      { title: 'Delivered', description: 'Package at your doorstep' },
    ],
  },
};

export const ThreeSteps: Story = {
  args: {
    current: 0,
    items: [
      { title: 'Select Plan', description: 'Choose your subscription' },
      { title: 'Payment', description: 'Enter payment details' },
      { title: 'Activate', description: 'Start using premium features' },
    ],
  },
};
