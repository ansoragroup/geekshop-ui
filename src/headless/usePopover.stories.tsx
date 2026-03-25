'use client';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { usePopover } from './usePopover';

function PopoverDemo() {
  const { triggerProps, popoverProps, floatingStyle, isOpen } = usePopover({
    placement: 'bottom',
  });

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <button
          {...triggerProps}
          style={{
            padding: '8px 16px',
            border: '1px solid #ccc',
            borderRadius: 4,
            cursor: 'pointer',
            background: 'white',
          }}
        >
          Click me
        </button>
        {isOpen && (
          <div
            {...popoverProps}
            style={{
              ...floatingStyle,
              minWidth: 200,
              padding: 16,
              border: '1px solid #ccc',
              borderRadius: 8,
              background: 'white',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            }}
          >
            <p style={{ margin: 0, fontWeight: 600, marginBottom: 8 }}>Popover Content</p>
            <p style={{ margin: 0, fontSize: 14, color: '#666' }}>
              This popover is rendered using the headless usePopover hook.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function ControlledPopoverDemo() {
  const [open, setOpen] = useState(false);
  const { triggerProps, popoverProps, floatingStyle, isOpen } = usePopover({
    isOpen: open,
    onOpenChange: setOpen,
    placement: 'right',
  });

  return (
    <div style={{ padding: '40px' }}>
      <p>Controlled: {isOpen ? 'open' : 'closed'}</p>
      <button onClick={() => setOpen(!open)} style={{ marginBottom: 12, padding: '4px 8px' }}>
        External toggle
      </button>
      <br />
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <button
          {...triggerProps}
          style={{
            padding: '8px 16px',
            border: '1px solid #ccc',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          Trigger
        </button>
        {isOpen && (
          <div
            {...popoverProps}
            style={{
              ...floatingStyle,
              minWidth: 160,
              padding: 12,
              border: '1px solid #ccc',
              borderRadius: 8,
              background: 'white',
            }}
          >
            Controlled popover
          </div>
        )}
      </div>
    </div>
  );
}

const meta = {
  title: 'Headless/usePopover',
  tags: ['autodocs'],
  component: PopoverDemo,
} satisfies Meta<typeof PopoverDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Controlled: Story = { render: () => <ControlledPopoverDemo /> };
