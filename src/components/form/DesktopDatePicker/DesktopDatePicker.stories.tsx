import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { DesktopDatePicker } from './DesktopDatePicker';

const meta = {
  title: 'Forms (Desktop)/DesktopDatePicker',
  component: DesktopDatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    disabled: { control: 'boolean' },
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

/* ─── Basic ─── */

export const Default: Story = {
  args: {
    placeholder: 'Select date',
    label: 'Delivery Date',
    onChange: fn(),
  },
};

/* ─── With Value ─── */

export const WithValue: Story = {
  args: {
    value: '2025-03-15',
    label: 'Order Date',
    onChange: fn(),
  },
};

/* ─── Custom Format ─── */

export const CustomFormat: Story = {
  args: {
    value: '2025-12-25',
    label: 'Event Date',
    format: 'yyyy-MM-dd',
    onChange: fn(),
  },
};

/* ─── Validation ─── */

export const WithError: Story = {
  args: {
    label: 'Birth Date',
    error: 'Please select a valid date',
    onChange: fn(),
  },
};

export const ErrorWithValue: Story = {
  name: 'Error with Value',
  args: {
    label: 'Return By',
    value: '2025-01-01',
    error: 'Return window has expired',
    onChange: fn(),
  },
};

/* ─── Disabled ─── */

export const Disabled: Story = {
  args: {
    label: 'Locked Date',
    value: '2025-01-01',
    disabled: true,
  },
};

export const DisabledEmpty: Story = {
  name: 'Disabled (Empty)',
  args: {
    label: 'Not Available',
    placeholder: 'Date selection disabled',
    disabled: true,
  },
};

/* ─── Date Constraints ─── */

export const WithMinDate: Story = {
  name: 'Min Date Only',
  args: {
    label: 'Start Date',
    placeholder: 'No dates before March 10',
    minDate: '2025-03-10',
    onChange: fn(),
  },
};

export const WithMaxDate: Story = {
  name: 'Max Date Only',
  args: {
    label: 'End Date',
    placeholder: 'No dates after March 25',
    maxDate: '2025-03-25',
    onChange: fn(),
  },
};

export const WithMinAndMax: Story = {
  name: 'Min + Max Date Range',
  args: {
    label: 'Delivery Window',
    placeholder: 'Select delivery date',
    minDate: '2025-03-10',
    maxDate: '2025-03-25',
    onChange: fn(),
  },
};

export const TightDateRange: Story = {
  name: 'Narrow Date Range (3 days)',
  args: {
    label: 'Express Delivery Slot',
    placeholder: 'Limited availability',
    minDate: '2025-03-20',
    maxDate: '2025-03-22',
    onChange: fn(),
  },
};

/* ─── Custom Placeholder ─── */

export const CustomPlaceholder: Story = {
  args: {
    label: 'Appointment',
    placeholder: 'Pick a date for your appointment...',
    onChange: fn(),
  },
};

/* ─── No Label ─── */

export const NoLabel: Story = {
  name: 'Without Label',
  args: {
    placeholder: 'Select date...',
    onChange: fn(),
  },
};

/* ─── Full Featured ─── */

export const FullFeatured: Story = {
  name: 'Full Featured (All Props)',
  args: {
    label: 'Preferred Delivery Date',
    placeholder: 'Choose a date within the delivery window',
    format: 'dd.MM.yyyy',
    minDate: '2025-03-15',
    maxDate: '2025-04-15',
    disabled: false,
    onChange: fn(),
  },
};

/* ─── Controlled ─── */

export const Controlled: Story = {
  name: 'Controlled (Interactive)',
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
        <div style={{ fontSize: 13, color: '#666' }}>
          Selected: {date || '(none)'}
        </div>
        {date && (
          <button
            type="button"
            onClick={() => setDate('')}
            style={{
              alignSelf: 'flex-start',
              fontSize: 13,
              color: '#FF5000',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            Clear date
          </button>
        )}
      </div>
    );
  },
};

/* ─── All States Overview ─── */

export const AllStatesOverview: Story = {
  name: 'All States Overview',
  decorators: [
    (Story) => (
      <div style={{ width: 500, padding: 24, background: '#fff', minHeight: 200 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <DesktopDatePicker label="Default (Empty)" placeholder="Select date" />
      <DesktopDatePicker label="With Value" value="2025-06-15" />
      <DesktopDatePicker label="With Error" error="Invalid date" />
      <DesktopDatePicker label="Disabled" value="2025-01-01" disabled />
      <DesktopDatePicker label="With Constraints" minDate="2025-03-01" maxDate="2025-03-31" placeholder="March only" />
    </div>
  ),
};

/* ─── Realistic: Booking Form ─── */

export const BookingForm: Story = {
  name: 'Booking Date Range',
  render: () => {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, border: '1px solid #eee', borderRadius: 12, padding: 20 }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A' }}>
          Select Delivery Dates
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <DesktopDatePicker
              label="From"
              value={checkIn}
              onChange={setCheckIn}
              placeholder="Start date"
              minDate="2025-03-25"
            />
          </div>
          <div style={{ flex: 1 }}>
            <DesktopDatePicker
              label="To"
              value={checkOut}
              onChange={setCheckOut}
              placeholder="End date"
              minDate={checkIn || '2025-03-25'}
            />
          </div>
        </div>
        <div style={{ fontSize: 12, color: '#666' }}>
          {checkIn && checkOut
            ? `${checkIn} to ${checkOut}`
            : 'Select both dates to continue'}
        </div>
      </div>
    );
  },
};
