import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopRating } from './DesktopRating';

const meta = {
  title: 'Data Display (Desktop)/DesktopRating',
  component: DesktopRating,
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
} satisfies Meta<typeof DesktopRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 4.5,
    showValue: true,
    count: 1287,
    allowHalf: true,
    readonly: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState(3);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <DesktopRating
          value={value}
          onChange={setValue}
          showValue
          size={28}
        />
        <span style={{ fontSize: 14, color: '#666' }}>Click to rate. Current: {value} stars</span>
      </div>
    );
  },
};

export const HalfStars: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <DesktopRating value={4.5} allowHalf readonly showValue count={523} />
      <DesktopRating value={3.5} allowHalf readonly showValue count={87} />
      <DesktopRating value={2.5} allowHalf readonly showValue count={12} />
      <DesktopRating value={1.5} allowHalf readonly showValue count={3} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <DesktopRating value={4} size={16} readonly showValue count={42} />
      <DesktopRating value={4} size={24} readonly showValue count={42} />
      <DesktopRating value={4} size={32} readonly showValue count={42} />
    </div>
  ),
};

export const ReadonlyNoCount: Story = {
  args: {
    value: 5,
    readonly: true,
    showValue: true,
    size: 24,
  },
};
