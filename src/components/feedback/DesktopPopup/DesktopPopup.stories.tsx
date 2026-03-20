import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopPopup } from './DesktopPopup';

const meta = {
  title: 'Feedback (Desktop)/DesktopPopup',
  component: DesktopPopup,
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
} satisfies Meta<typeof DesktopPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    title: 'Confirm Action',
    width: 480,
    children: (
      <div>
        <p style={{ margin: '0 0 16px', color: '#666', fontSize: 14, lineHeight: 1.5 }}>
          Are you sure you want to remove this item from your cart? This action cannot be undone.
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button
            style={{
              padding: '8px 20px',
              borderRadius: 8,
              border: '1px solid #eee',
              background: '#fff',
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            Cancel
          </button>
          <button
            style={{
              padding: '8px 20px',
              borderRadius: 8,
              border: 'none',
              background: '#FF5000',
              color: '#fff',
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            Remove
          </button>
        </div>
      </div>
    ),
  },
};

export const WithoutTitle: Story = {
  args: {
    open: true,
    width: 400,
    children: (
      <div style={{ textAlign: 'center', padding: '24px 0' }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: '#E8F8EF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M8 16L14 22L24 10" stroke="#07C160" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 600 }}>Order Placed!</h3>
        <p style={{ margin: 0, color: '#666', fontSize: 14 }}>Your order #12345 has been confirmed.</p>
      </div>
    ),
  },
};

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <button
          onClick={() => setOpen(true)}
          style={{
            padding: '10px 24px',
            borderRadius: 8,
            border: 'none',
            background: '#FF5000',
            color: '#fff',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          Open Popup
        </button>
        <DesktopPopup open={open} onClose={() => setOpen(false)} title="Desktop Popup" width={500}>
          <p style={{ margin: 0, color: '#666', fontSize: 14, lineHeight: 1.6 }}>
            This is a desktop popup with a centered overlay, close button in the top-right corner,
            and semi-transparent backdrop. Click outside or press Escape to close.
          </p>
        </DesktopPopup>
      </div>
    );
  },
};

export const NonClosable: Story = {
  args: {
    open: true,
    closable: false,
    title: 'Processing Payment',
    width: 400,
    children: (
      <div style={{ textAlign: 'center', padding: '16px 0' }}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
          <circle cx="20" cy="20" r="16" stroke="#eee" strokeWidth="3" />
          <path d="M20 4a16 16 0 0 1 16 16" stroke="#FF5000" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <p style={{ margin: '16px 0 0', color: '#666', fontSize: 14 }}>Please wait while we process your payment...</p>
      </div>
    ),
  },
};
