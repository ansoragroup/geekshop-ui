import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { TimePicker } from './TimePicker';

const meta = {
  title: 'Form/TimePicker',
  component: TimePicker,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 24, background: '#fff', borderRadius: 12, width: 375 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: '14:30',
    format: '24h',
    onChange: fn(),
  },
};

export const TwelveHourFormat: Story = {
  args: {
    defaultValue: '02:30 PM',
    format: '12h',
    onChange: fn(),
  },
};

export const FifteenMinuteStep: Story = {
  name: '15-Minute Intervals',
  args: {
    defaultValue: '09:00',
    minuteStep: 15,
    format: '24h',
    onChange: fn(),
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Pick a delivery time',
    format: '24h',
    onChange: fn(),
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: '10:00',
    disabled: true,
  },
};

export const OpenByDefault: Story = {
  args: {
    defaultValue: '18:45',
    defaultOpen: true,
    format: '24h',
    onChange: fn(),
  },
};

export const ControlledMode: Story = {
  name: 'Controlled',
  render: () => {
    const [val, setVal] = useState('08:30');
    return (
      <div>
        <div style={{ marginBottom: 8, fontSize: 14, color: '#666' }}>Selected: {val}</div>
        <TimePicker value={val} onChange={setVal} format="24h" />
      </div>
    );
  },
};

export const DeliveryScheduler: Story = {
  name: 'Delivery Time Picker',
  render: () => {
    const [time, setTime] = useState('10:00');
    const slots = [
      { start: '09:00', end: '12:00', label: 'Morning' },
      { start: '12:00', end: '17:00', label: 'Afternoon' },
      { start: '17:00', end: '21:00', label: 'Evening' },
    ];
    const currentSlot = slots.find((s) => time >= s.start && time < s.end);

    return (
      <div>
        <div style={{ marginBottom: 12, fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>
          Yetkazib berish vaqti
        </div>
        <TimePicker value={time} onChange={setTime} minuteStep={30} format="24h" />
        {currentSlot && (
          <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
            {currentSlot.label} delivery ({currentSlot.start} - {currentSlot.end})
          </div>
        )}
      </div>
    );
  },
};
