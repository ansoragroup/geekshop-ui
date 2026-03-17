import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DesktopDatePicker } from './DesktopDatePicker';

const meta = {
  title: 'Forms (Desktop)/DesktopDatePicker',
  component: DesktopDatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 500, padding: 24, background: '#fff', minHeight: 420 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopDatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Select date',
    label: 'Delivery date',
  },
};

export const WithValue: Story = {
  args: {
    value: '2025-03-15',
    label: 'Order date',
  },
};

export const WithError: Story = {
  args: {
    label: 'Birth date',
    error: 'Please select a valid date',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Locked date',
    value: '2025-01-01',
    disabled: true,
  },
};

export const WithMinMax: Story = {
  args: {
    label: 'Delivery window',
    placeholder: 'Select delivery date',
    minDate: '2025-03-10',
    maxDate: '2025-03-25',
  },
};

export const Controlled: Story = {
  name: 'Controlled Example',
  render: () => {
    const [date, setDate] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <DesktopDatePicker
          label="Select a date"
          value={date}
          onChange={setDate}
          placeholder="Pick a date..."
        />
        <div style={{ fontSize: 14, color: '#666' }}>
          Selected: {date || 'none'}
        </div>
      </div>
    );
  },
};
