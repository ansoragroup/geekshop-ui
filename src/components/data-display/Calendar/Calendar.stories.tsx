import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, within } from 'storybook/test';
import { Calendar } from './Calendar';

const meta = {
  title: 'Data Display/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 16, background: '#f5f5f5', borderRadius: 12, width: 390 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const grid = canvas.getByRole('grid');
    await expect(grid).toBeInTheDocument();
  },
};

export const WithSelectedDate: Story = {
  args: {
    value: new Date(2026, 2, 16),
  },
};

export const RangeSelection: Story = {
  name: 'Range Mode (Delivery Window)',
  args: {
    mode: 'range',
    value: [new Date(2026, 2, 18), new Date(2026, 2, 22)],
    onChange: fn(),
  },
};

export const MultipleSelection: Story = {
  name: 'Multiple Mode',
  args: {
    mode: 'multiple',
    value: [new Date(2026, 2, 10), new Date(2026, 2, 15), new Date(2026, 2, 20)],
    onChange: fn(),
  },
};

export const WithMinMax: Story = {
  name: 'Min — Max Constraints',
  args: {
    min: new Date(2026, 2, 5),
    max: new Date(2026, 2, 25),
    onChange: fn(),
  },
};

export const WithMarkedDates: Story = {
  name: 'Marked Dates (Flash Sales & Coupons)',
  args: {
    markedDates: {
      '2026-03-10': { dot: true, color: '#FF3B30', label: 'Sale' },
      '2026-03-11': { dot: true, color: '#FF3B30', label: 'Sale' },
      '2026-03-12': { dot: true, color: '#FF3B30', label: 'Sale' },
      '2026-03-20': { dot: true, color: '#07C160' },
      '2026-03-25': { dot: true, color: '#FFA726', label: 'Kupon' },
      '2026-03-31': { dot: true, color: '#1890FF' },
    },
    value: new Date(2026, 2, 16),
    onChange: fn(),
  },
};

export const WithWeekNumbers: Story = {
  name: 'With Week Numbers',
  args: {
    showWeekNumber: true,
    value: new Date(2026, 2, 16),
    locale: 'en',
  },
};

export const SundayStart: Story = {
  name: 'Sunday as First Day',
  args: {
    firstDayOfWeek: 0,
    value: new Date(2026, 2, 16),
    locale: 'en',
  },
};

export const RussianLocale: Story = {
  name: 'Russian Locale',
  args: {
    locale: 'ru',
    value: new Date(2026, 2, 16),
  },
};

export const InteractiveRange: Story = {
  name: 'Interactive Range Picker',
  render: () => {
    const [dates, setDates] = useState<Date[]>([]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Calendar
          mode="range"
          value={dates}
          onChange={setDates}
          min={new Date()}
        />
        {dates.length > 0 && (
          <div style={{ fontSize: 12, color: '#666', padding: '0 4px' }}>
            {dates.length === 1
              ? `Boshlanish: ${dates[0].toLocaleDateString('uz-UZ')}`
              : `${dates[0].toLocaleDateString('uz-UZ')} - ${dates[1].toLocaleDateString('uz-UZ')}`}
          </div>
        )}
      </div>
    );
  },
};

export const InteractiveMultiple: Story = {
  name: 'Interactive Multiple Dates',
  render: () => {
    const [dates, setDates] = useState<Date[]>([]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Calendar
          mode="multiple"
          value={dates}
          onChange={setDates}
        />
        {dates.length > 0 && (
          <div style={{ fontSize: 12, color: '#666', padding: '0 4px' }}>
            Tanlangan: {dates.map((d) => d.getDate()).sort((a, b) => a - b).join(', ')}
          </div>
        )}
      </div>
    );
  },
};

export const DeliverySlots: Story = {
  name: 'Delivery Slot Selection',
  render: () => {
    const [dates, setDates] = useState<Date[]>([]);
    const markedDates: Record<string, { dot: boolean; color: string; label?: string }> = {};

    // Mark available delivery slots
    for (let d = 1; d <= 31; d++) {
      const date = new Date(2026, 2, d);
      const dayOfWeek = date.getDay();
      if (dayOfWeek !== 0) {
        const key = `2026-03-${String(d).padStart(2, '0')}`;
        markedDates[key] = { dot: true, color: '#07C160' };
      }
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 600, padding: '0 4px' }}>
          Yetkazib berish sanasini tanlang
        </div>
        <Calendar
          mode="single"
          value={dates}
          onChange={setDates}
          markedDates={markedDates}
          min={new Date(2026, 2, 16)}
          max={new Date(2026, 3, 15)}
        />
        {dates.length > 0 && (
          <div style={{ fontSize: 12, color: '#07C160', padding: '0 4px' }}>
            Yetkazib berish: {dates[0].toLocaleDateString('uz-UZ')}
          </div>
        )}
      </div>
    );
  },
};
