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

// --- EACH TYPE ---

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
    message: 'Your order #GS-2026-0047 has been shipped.',
    visible: true,
    duration: 0,
    onClose: fn(),
  },
};

// --- NOT CLOSABLE ---

export const NotClosable: Story = {
  name: 'Not Closable',
  args: {
    type: 'info',
    message: 'Syncing your cart with the server...',
    visible: true,
    closable: false,
    duration: 0,
  },
};

export const NotClosableWarning: Story = {
  name: 'Not Closable (Warning)',
  args: {
    type: 'warning',
    message: 'Your session will expire in 2 minutes. Please save your work.',
    visible: true,
    closable: false,
    duration: 0,
  },
};

// --- LONG TEXT ---

export const LongMessage: Story = {
  name: 'Long Message Text',
  args: {
    type: 'error',
    message: 'We encountered an unexpected error while processing your order #GS-2026-0082. Please check your payment details, ensure your card has sufficient funds, and try again. If the problem persists, contact our customer support at support@geekshop.uz.',
    visible: true,
    duration: 0,
    onClose: fn(),
  },
};

export const ShortMessage: Story = {
  name: 'Short Message',
  args: {
    type: 'success',
    message: 'Saved!',
    visible: true,
    duration: 0,
    onClose: fn(),
  },
};

// --- AUTO-DISMISS ---

export const AutoDismiss3s: Story = {
  name: 'Auto-Dismiss (3 seconds)',
  args: {
    type: 'success',
    message: 'This toast will auto-dismiss in 3 seconds.',
    visible: true,
    duration: 3000,
    onClose: fn(),
  },
};

export const AutoDismiss5s: Story = {
  name: 'Auto-Dismiss (5 seconds)',
  args: {
    type: 'info',
    message: 'This toast will auto-dismiss in 5 seconds.',
    visible: true,
    duration: 5000,
    onClose: fn(),
  },
};

export const NeverDismiss: Story = {
  name: 'Never Auto-Dismiss (duration=0)',
  args: {
    type: 'warning',
    message: 'This toast stays visible until manually closed.',
    visible: true,
    duration: 0,
    onClose: fn(),
  },
};

// --- HIDDEN STATE ---

export const Hidden: Story = {
  name: 'Hidden (visible=false)',
  args: {
    type: 'success',
    message: 'This should not be visible.',
    visible: false,
    duration: 0,
    onClose: fn(),
  },
};

// --- ALL TYPES STACK ---

export const AllTypesStack: Story = {
  name: 'All Types Stacked',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <DesktopToast type="success" message="Item added to cart" visible duration={0} onClose={fn()} />
      <DesktopToast type="warning" message="Low stock warning: only 3 left" visible duration={0} onClose={fn()} />
      <DesktopToast type="error" message="Network connection lost" visible duration={0} onClose={fn()} />
      <DesktopToast type="info" message="New coupon available: SAVE20" visible duration={0} onClose={fn()} />
    </div>
  ),
};

// --- INTERACTIVE ---

export const Interactive: Story = {
  name: 'Interactive (Click to Trigger)',
  render: () => {
    const [toasts, setToasts] = useState<Array<{ id: number; type: 'success' | 'error' | 'warning' | 'info'; message: string }>>([]);
    let counter = 0;

    const messages: Record<string, string> = {
      success: 'Product "MacBook Air M3" added to cart!',
      error: 'Payment declined for card ending 4242.',
      warning: 'Only 1 unit left in stock for "Sony WH-1000XM5".',
      info: 'Your order #GS-2026-0082 is out for delivery.',
    };

    const addToast = (type: 'success' | 'error' | 'warning' | 'info') => {
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
              duration={4000}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </div>
      </div>
    );
  },
};

// --- E-COMMERCE SCENARIOS ---

export const AddToCartSuccess: Story = {
  name: 'Scenario: Add to Cart',
  args: {
    type: 'success',
    message: 'MSI RTX 4060 Ventus 2X has been added to your cart.',
    visible: true,
    duration: 0,
    onClose: fn(),
  },
};

export const OutOfStockError: Story = {
  name: 'Scenario: Out of Stock',
  args: {
    type: 'error',
    message: 'Sorry, this item is currently out of stock and cannot be added to your cart.',
    visible: true,
    duration: 0,
    onClose: fn(),
  },
};

export const CouponApplied: Story = {
  name: 'Scenario: Coupon Applied',
  args: {
    type: 'success',
    message: 'Coupon SAVE20 applied! You saved 2,500,000 UZS.',
    visible: true,
    duration: 0,
    onClose: fn(),
  },
};

export const ShipmentUpdate: Story = {
  name: 'Scenario: Shipment Update',
  args: {
    type: 'info',
    message: 'Your package from order #GS-2026-0047 is now at the Tashkent sorting center.',
    visible: true,
    duration: 0,
    onClose: fn(),
  },
};
