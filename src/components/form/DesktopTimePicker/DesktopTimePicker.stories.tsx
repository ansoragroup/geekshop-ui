import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn, expect, within } from 'storybook/test';
import { DesktopTimePicker } from './DesktopTimePicker';

const meta = {
  title: 'Form (Desktop)/DesktopTimePicker',
  component: DesktopTimePicker,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{ padding: 32, background: '#fff', borderRadius: 12, width: 400, minHeight: 400 }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopTimePicker>;

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

export const ThirtyMinuteStep: Story = {
  name: '30-Minute Intervals',
  args: {
    defaultValue: '09:00',
    minuteStep: 30,
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

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Choose appointment time',
    format: '24h',
    onChange: fn(),
  },
};

export const ControlledMode: Story = {
  name: 'Controlled',
  render: () => {
    const [val, setVal] = useState('16:45');
    return (
      <div>
        <div style={{ marginBottom: 12, fontSize: 14, color: '#666' }}>
          Selected: <strong>{val}</strong>
        </div>
        <DesktopTimePicker value={val} onChange={setVal} format="24h" />
      </div>
    );
  },
};

export const AppointmentBooking: Story = {
  name: 'Appointment Booking Form',
  render: () => {
    const [time, setTime] = useState('10:00');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <span
            style={{
              display: 'block',
              fontSize: 14,
              fontWeight: 500,
              marginBottom: 6,
              color: '#1A1A1A',
            }}
          >
            Appointment Time
          </span>
          <DesktopTimePicker value={time} onChange={setTime} minuteStep={15} format="24h" />
        </div>
        <div style={{ fontSize: 13, color: '#666' }}>Working hours: 09:00 - 18:00</div>
      </div>
    );
  },
};

export const AriaTest: Story = {
  name: 'ARIA Attributes',
  args: {
    defaultValue: '12:00',
    format: '24h',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    await expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  },
};
