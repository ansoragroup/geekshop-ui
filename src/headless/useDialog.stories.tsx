'use client';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useDialog } from './useDialog';

function DialogDemo() {
  const { overlayProps, dialogProps, closeButtonProps, isOpen, open, close } = useDialog({
    role: 'dialog',
  });

  return (
    <div>
      <button onClick={open}>Open Dialog</button>
      {isOpen && (
        <div
          {...overlayProps}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            {...dialogProps}
            style={{
              background: 'white',
              borderRadius: 8,
              padding: 24,
              minWidth: 300,
              maxWidth: 400,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <h2 style={{ margin: 0, fontSize: 18 }}>Dialog Title</h2>
              <button
                {...closeButtonProps}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}
              >
                x
              </button>
            </div>
            <p>This is a headless dialog with focus trap and Escape-to-close.</p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
              <button onClick={close} style={{ padding: '8px 16px' }}>
                Cancel
              </button>
              <button
                onClick={close}
                style={{
                  padding: '8px 16px',
                  background: '#333',
                  color: 'white',
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer',
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ControlledDialogDemo() {
  const [open, setOpen] = useState(false);
  const { overlayProps, dialogProps, closeButtonProps, isOpen } = useDialog({
    isOpen: open,
    onOpenChange: setOpen,
    role: 'alertdialog',
  });

  return (
    <div>
      <p>Controlled state: {isOpen ? 'open' : 'closed'}</p>
      <button onClick={() => setOpen(true)}>Open Alert Dialog</button>
      {isOpen && (
        <div
          {...overlayProps}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            {...dialogProps}
            style={{ background: 'white', borderRadius: 8, padding: 24, minWidth: 300 }}
          >
            <h2 style={{ margin: '0 0 12px' }}>Delete Item?</h2>
            <p>This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button {...closeButtonProps}>Cancel</button>
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: 4,
                  padding: '8px 16px',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const meta = {
  title: 'Headless/useDialog',
  tags: ['autodocs'],
  component: DialogDemo,
} satisfies Meta<typeof DialogDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Controlled: Story = { render: () => <ControlledDialogDemo /> };
