import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopActionSheet } from './DesktopActionSheet';

const meta = {
  title: 'Feedback (Desktop)/DesktopActionSheet',
  component: DesktopActionSheet,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600, padding: 24, background: '#f5f5f5', display: 'flex', justifyContent: 'flex-end' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopActionSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M11.5 2.5l2 2L5 13H3v-2l8.5-8.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="5" y="5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 11V3.5A1.5 1.5 0 014.5 2H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 4h12M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1m2 0v9a1 1 0 01-1 1H4a1 1 0 01-1-1V4h10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MoreButton = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 36,
      height: 36,
      borderRadius: 8,
      border: '1px solid #eee',
      background: '#fff',
      cursor: 'pointer',
      fontSize: 18,
    }}
  >
    &#x22EE;
  </button>
);

export const Default: Story = {
  args: {
    open: false,
    onClose: () => {},
    actions: [
      { label: 'Edit', icon: <EditIcon />, onClick: () => console.log('Edit') },
      { label: 'Duplicate', icon: <CopyIcon />, onClick: () => console.log('Duplicate') },
      { label: 'Delete', icon: <TrashIcon />, danger: true, onClick: () => console.log('Delete') },
    ],
    children: null,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <DesktopActionSheet
        {...args}
        open={open}
        onClose={() => setOpen(false)}
      >
        <MoreButton onClick={() => setOpen(!open)} />
      </DesktopActionSheet>
    );
  },
};

export const WithDisabled: Story = {
  args: {
    open: false,
    onClose: () => {},
    actions: [
      { label: 'View Details', onClick: () => console.log('View') },
      { label: 'Edit Address', onClick: () => console.log('Edit') },
      { label: 'Set as Default', disabled: true },
      { label: 'Remove', danger: true, onClick: () => console.log('Remove') },
    ],
    children: null,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <DesktopActionSheet
        {...args}
        open={open}
        onClose={() => setOpen(false)}
      >
        <MoreButton onClick={() => setOpen(!open)} />
      </DesktopActionSheet>
    );
  },
};

export const OpenByDefault: Story = {
  args: {
    open: true,
    onClose: () => {},
    actions: [
      { label: 'Share Order', icon: <CopyIcon /> },
      { label: 'Track Package' },
      { label: 'Cancel Order', icon: <TrashIcon />, danger: true },
    ],
    children: null,
  },
  render: (args) => (
    <DesktopActionSheet {...args}>
      <MoreButton onClick={() => {}} />
    </DesktopActionSheet>
  ),
};
