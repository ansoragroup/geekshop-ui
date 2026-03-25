import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, within } from 'storybook/test';
import { DatePicker } from './DatePicker';

const meta = {
  title: 'Form/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 16, background: '#fff', borderRadius: 12, width: 390 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Sana',
    placeholder: 'Sanani tanlang',
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /sana/i });

    await expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  },
};

export const WithValue: Story = {
  args: {
    label: 'Tug\'ilgan sana',
    value: new Date(1998, 4, 15),
  },
};

export const WithStringValue: Story = {
  name: 'Value as ISO String',
  args: {
    label: 'Yetkazib berish sanasi',
    value: '2026-03-20',
    format: 'dd.MM.yyyy',
  },
};

export const WithMinMax: Story = {
  name: 'Min — Max Date Constraints',
  args: {
    label: 'Yetkazib berish sanasi',
    placeholder: 'Tanlang',
    min: new Date(2026, 2, 10),
    max: new Date(2026, 3, 20),
    onChange: fn(),
  },
};

export const WithError: Story = {
  args: {
    label: 'Yetkazib berish sanasi',
    error: 'Iltimos, sanani tanlang',
    placeholder: 'Sanani tanlang',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Sana',
    disabled: true,
    value: new Date(2026, 2, 16),
  },
};

export const RussianLocale: Story = {
  args: {
    label: 'Dата рождения',
    placeholder: 'Выберите дату',
    locale: 'ru',
    onChange: fn(),
  },
};

export const EnglishLocale: Story = {
  args: {
    label: 'Delivery Date',
    placeholder: 'Select date',
    locale: 'en',
    onChange: fn(),
  },
};

export const Interactive: Story = {
  name: 'Controlled DatePicker',
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <DatePicker
          label="Buyurtma sanasi"
          value={date}
          onChange={setDate}
          placeholder="Sanani tanlang"
          min={new Date()}
        />
        {date && (
          <div style={{ fontSize: 12, color: '#666' }}>
            Tanlangan: {date.toLocaleDateString('uz-UZ')}
          </div>
        )}
      </div>
    );
  },
};

export const CustomFormat: Story = {
  name: 'Custom Display Format',
  args: {
    label: 'Date',
    value: new Date(2026, 2, 16),
    format: 'yyyy-MM-dd',
    locale: 'en',
  },
};
