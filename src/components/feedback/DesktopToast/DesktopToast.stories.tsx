import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DesktopToast } from './DesktopToast';

const meta = {
  title: 'Feedback (Desktop)/DesktopToast',
  component: DesktopToast,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopToast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    type: 'success',
    message: 'Product has been added to your cart successfully!',
    visible: true,
    duration: 0,
    onClose: fn(),
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    message: 'Failed to process your payment. Please try again.',
    visible: true,
    duration: 0,
    onClose: fn(),
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    message: 'Only 2 items left in stock. Order soon!',
    visible: true,
    duration: 0,
    onClose: fn(),
  },
};

export const Info: Story = {
  args: {
    type: 'info',
    message: 'Your order #GS-2024-78541 has been shipped.',
    visible: true,
    duration: 0,
    onClose: fn(),
  },
};

export const NotClosable: Story = {
  args: {
    type: 'info',
    message: 'Syncing your cart with the server...',
    visible: true,
    closable: false,
    duration: 0,
  },
};

export const ToastStack: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <DesktopToast type="success" message="Item added to cart" visible duration={0} onClose={fn()} />
      <DesktopToast type="warning" message="Low stock warning" visible duration={0} onClose={fn()} />
      <DesktopToast type="error" message="Network connection lost" visible duration={0} onClose={fn()} />
      <DesktopToast type="info" message="New coupon available: SAVE20" visible duration={0} onClose={fn()} />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [toasts, setToasts] = useState<Array<{ id: number; type: 'success' | 'error' | 'warning' | 'info'; message: string }>>([]);
    let counter = 0;

    const addToast = (type: 'success' | 'error' | 'warning' | 'info') => {
      const messages = {
        success: 'Action completed successfully!',
        error: 'Something went wrong. Try again.',
        warning: 'Please review your cart items.',
        info: 'New update available.',
      };
      const id = ++counter;
      setToasts((prev) => [...prev, { id, type, message: messages[type] }]);
    };

    const removeToast = (id: number) => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
      <div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {(['success', 'error', 'warning', 'info'] as const).map((type) => (
            <button
              key={type}
              onClick={() => addToast(type)}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                border: 'none',
                background: type === 'success' ? '#07C160' : type === 'error' ? '#FF3B30' : type === 'warning' ? '#FFA726' : '#1890FF',
                color: '#fff',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 500,
                textTransform: 'capitalize',
              }}
            >
              {type}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {toasts.map((toast) => (
            <DesktopToast
              key={toast.id}
              type={toast.type}
              message={toast.message}
              visible
              duration={3000}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </div>
      </div>
    );
  },
};
