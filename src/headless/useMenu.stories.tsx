'use client';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMenu } from './useMenu';
import type { MenuItem } from './useMenu';

const menuItems: MenuItem[] = [
  { key: 'cut', label: 'Cut' },
  { key: 'copy', label: 'Copy' },
  { key: 'paste', label: 'Paste' },
  { key: 'delete', label: 'Delete', disabled: true },
];

function MenuDemo() {
  const [lastAction, setLastAction] = useState<string>('');
  const { triggerProps, menuProps, itemProps, isOpen, activeIndex } = useMenu({
    items: menuItems,
    onAction: (key) => setLastAction(key),
  });

  return (
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
        Actions
      </button>
      {isOpen && (
        <div
          {...menuProps}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            minWidth: 160,
            border: '1px solid #ccc',
            borderRadius: 4,
            background: 'white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '4px 0',
          }}
          tabIndex={-1}
        >
          {menuItems.map((item, i) => (
            <div
              key={item.key}
              {...itemProps(item.key)}
              style={{
                padding: '8px 16px',
                cursor: item.disabled ? 'not-allowed' : 'pointer',
                opacity: item.disabled ? 0.4 : 1,
                background: i === activeIndex ? '#f0f0f0' : 'transparent',
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
      {lastAction && <p style={{ marginTop: 8 }}>Last action: {lastAction}</p>}
    </div>
  );
}

function ControlledMenuDemo() {
  const [open, setOpen] = useState(false);
  const { triggerProps, menuProps, itemProps, activeIndex } = useMenu({
    items: menuItems,
    isOpen: open,
    onOpenChange: setOpen,
    onAction: (key) => {
      setOpen(false);
      alert(`Action: ${key}`);
    },
  });

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <p>Controlled: {open ? 'open' : 'closed'}</p>
      <button
        {...triggerProps}
        style={{
          padding: '8px 16px',
          border: '1px solid #ccc',
          borderRadius: 4,
          cursor: 'pointer',
        }}
      >
        Menu
      </button>
      {open && (
        <div
          {...menuProps}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            minWidth: 160,
            border: '1px solid #ccc',
            borderRadius: 4,
            background: 'white',
            padding: '4px 0',
          }}
          tabIndex={-1}
        >
          {menuItems.map((item, i) => (
            <div
              key={item.key}
              {...itemProps(item.key)}
              style={{
                padding: '8px 16px',
                cursor: item.disabled ? 'not-allowed' : 'pointer',
                opacity: item.disabled ? 0.4 : 1,
                background: i === activeIndex ? '#f0f0f0' : 'transparent',
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const meta = {
  title: 'Headless/useMenu',
  tags: ['autodocs'],
  component: MenuDemo,
} satisfies Meta<typeof MenuDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Controlled: Story = { render: () => <ControlledMenuDemo /> };
