import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopDialog } from './DesktopDialog';

const meta = {
  title: 'Feedback (Desktop)/DesktopDialog',
  component: DesktopDialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: false,
    onClose: () => {},
    title: 'Confirm Action',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    children: null,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 24 }}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 14 }}
        >
          Open Dialog
        </button>
        <DesktopDialog
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={() => { console.log('Confirmed'); setOpen(false); }}
          onCancel={() => setOpen(false)}
        >
          <p style={{ margin: 0 }}>Are you sure you want to proceed with this action? This cannot be undone.</p>
        </DesktopDialog>
      </div>
    );
  },
};

export const DangerConfirm: Story = {
  args: {
    open: false,
    onClose: () => {},
    title: 'Delete Order',
    confirmText: 'Delete',
    cancelText: 'Keep Order',
    confirmType: 'danger',
    children: null,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 24 }}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid #ff3b30', color: '#ff3b30', background: '#fff', cursor: 'pointer', fontSize: 14 }}
        >
          Delete Order
        </button>
        <DesktopDialog
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={() => { console.log('Deleted'); setOpen(false); }}
          onCancel={() => setOpen(false)}
        >
          <p style={{ margin: 0 }}>This will permanently delete order #GS-2026-0047 and all associated data. This action cannot be reversed.</p>
        </DesktopDialog>
      </div>
    );
  },
};

export const SimpleMessage: Story = {
  args: {
    open: false,
    onClose: () => {},
    title: 'Clear Cart',
    confirmText: 'Clear All',
    cancelText: 'Cancel',
    children: null,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 24 }}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 14 }}
        >
          Clear Cart
        </button>
        <DesktopDialog
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={() => { console.log('Cart cleared'); setOpen(false); }}
          onCancel={() => setOpen(false)}
        >
          <p style={{ margin: 0 }}>Remove all 5 items from your shopping cart?</p>
        </DesktopDialog>
      </div>
    );
  },
};
