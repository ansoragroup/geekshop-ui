import { useState } from 'react';
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

export const FullFeatured: Story = {
  name: 'Full Featured (All Props)',
  args: {
    current: 2,
    direction: 'horizontal',
    items: [
      { title: 'Account', description: 'Sign in or register' },
      { title: 'Shipping Info', description: 'Enter delivery details' },
      { title: 'Payment', description: 'Choose payment method' },
      { title: 'Review', description: 'Verify your order' },
      { title: 'Complete', description: 'Order confirmed' },
    ],
  },
};

export const AllCompleted: Story = {
  name: 'All Steps Completed',
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

export const FirstStep: Story = {
  name: 'First Step Active',
  args: {
    current: 0,
    items: [
      { title: 'Select Plan', description: 'Choose your subscription' },
      { title: 'Payment', description: 'Enter payment details' },
      { title: 'Activate', description: 'Start using premium features' },
    ],
  },
};

export const WithError: Story = {
  name: 'With Error Step',
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
  name: 'Vertical Direction',
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

export const VerticalWithError: Story = {
  name: 'Vertical With Error',
  args: {
    current: 3,
    direction: 'vertical',
    items: [
      { title: 'Return Requested', description: 'You submitted a return request' },
      { title: 'Approved', description: 'Return request approved' },
      { title: 'Item Shipped', description: 'You shipped the item back' },
      { title: 'Inspection Failed', description: 'Item did not meet return conditions', status: 'error' },
      { title: 'Refund', description: 'Pending resolution' },
    ],
  },
};

export const TwoSteps: Story = {
  name: 'Two Steps Only',
  args: {
    current: 0,
    items: [
      { title: 'Enter Details', description: 'Fill in the form' },
      { title: 'Submit', description: 'Complete your request' },
    ],
  },
};

export const SixSteps: Story = {
  name: 'Six Steps (Complex)',
  args: {
    current: 3,
    items: [
      { title: 'Cart' },
      { title: 'Address' },
      { title: 'Delivery' },
      { title: 'Payment' },
      { title: 'Review' },
      { title: 'Confirm' },
    ],
  },
};

export const WithoutDescriptions: Story = {
  name: 'Without Descriptions',
  args: {
    current: 2,
    items: [
      { title: 'Step 1' },
      { title: 'Step 2' },
      { title: 'Step 3' },
      { title: 'Step 4' },
    ],
  },
};

export const Interactive: Story = {
  name: 'Interactive Step Navigation',
  render: () => {
    const [current, setCurrent] = useState(0);
    const items = [
      { title: 'Cart Review', description: 'Review your items' },
      { title: 'Shipping', description: 'Select address' },
      { title: 'Payment', description: 'Choose method' },
      { title: 'Confirm', description: 'Place your order' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <DesktopSteps current={current} items={items} />
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          <button
            type="button"
            disabled={current <= 0}
            onClick={() => setCurrent((p) => Math.max(0, p - 1))}
            style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #ddd', background: current <= 0 ? '#f5f5f5' : '#fff', cursor: current <= 0 ? 'default' : 'pointer', fontSize: 13, color: current <= 0 ? '#ccc' : '#333' }}
          >
            Back
          </button>
          <button
            type="button"
            disabled={current >= items.length}
            onClick={() => setCurrent((p) => Math.min(items.length, p + 1))}
            style={{ padding: '8px 16px', borderRadius: 6, border: 'none', background: current >= items.length ? '#ccc' : '#FF5000', color: '#fff', cursor: current >= items.length ? 'default' : 'pointer', fontSize: 13 }}
          >
            {current < items.length - 1 ? 'Next' : current === items.length - 1 ? 'Complete' : 'Done'}
          </button>
          <button
            type="button"
            onClick={() => setCurrent(0)}
            style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 13 }}
          >
            Reset
          </button>
        </div>
      </div>
    );
  },
};
