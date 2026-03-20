import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopCalendar } from './DesktopCalendar';

const meta = {
  title: 'Data Display (Desktop)/DesktopCalendar',
  component: DesktopCalendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 900, padding: 24, background: '#f5f5f5', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    locale: 'en',
  },
};

export const WithSelectedDate: Story = {
  args: {
    value: new Date(2026, 2, 17),
    locale: 'en',
  },
};

export const WithMarkedDates: Story = {
  args: {
    value: new Date(2026, 2, 17),
    locale: 'en',
    markedDates: {
      '2026-03-10': { dot: true, color: '#FF3B30' },
      '2026-03-15': { dot: true, color: '#07C160', label: 'Sale' },
      '2026-03-20': { dot: true, color: '#1890FF' },
      '2026-03-25': { dot: true, label: 'Event' },
    },
  },
};

export const WithDateRange: Story = {
  args: {
    locale: 'en',
    minDate: new Date(2026, 2, 5),
    maxDate: new Date(2026, 2, 28),
  },
};

export const Controlled: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date(2026, 2, 17));
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <DesktopCalendar value={date} onChange={setDate} locale="en" />
        <p style={{ fontSize: 14, color: '#666' }}>
          Selected: {date ? date.toLocaleDateString('en-US') : 'None'}
        </p>
      </div>
    );
  },
};

export const Uzbek: Story = {
  args: {
    value: new Date(2026, 2, 17),
    locale: 'uz',
    markedDates: {
      '2026-03-08': { dot: true, color: '#FF5000', label: 'Bayram' },
      '2026-03-21': { dot: true, color: '#07C160', label: 'Navro\'z' },
    },
  },
};
