import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, within } from 'storybook/test';
import { Select } from './Select';

const categoryOptions = [
  { value: 'laptops', label: 'Laptops' },
  { value: 'monitors', label: 'Monitors' },
  { value: 'keyboards', label: 'Keyboards' },
  { value: 'mice', label: 'Mice' },
  { value: 'gpus', label: 'Graphics Cards' },
  { value: 'cpus', label: 'Processors' },
  { value: 'ram', label: 'Memory (RAM)' },
  { value: 'ssd', label: 'SSD/HDD' },
];

const meta = {
  title: 'Form/Select',
  component: Select,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 16, background: '#fff', borderRadius: 12, width: 375 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: categoryOptions,
    label: 'Category',
    placeholder: 'Select category',
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /category/i });

    await expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  },
};

export const WithValue: Story = {
  args: {
    options: categoryOptions,
    label: 'Category',
    value: 'laptops',
  },
};

export const WithError: Story = {
  args: {
    options: categoryOptions,
    label: 'Category',
    error: 'Please select a category',
  },
};

export const Disabled: Story = {
  args: {
    options: categoryOptions,
    label: 'Category',
    disabled: true,
    value: 'monitors',
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: 'available', label: 'In Stock' },
      { value: 'preorder', label: 'Pre-Order' },
      { value: 'outofstock', label: 'Out of Stock', disabled: true },
    ],
    label: 'Availability',
  },
};

export const MultipleSelect: Story = {
  args: {
    options: categoryOptions,
    label: 'Categories',
    multiple: true,
    placeholder: 'Select categories',
    onChange: fn(),
  },
};

export const MultipleWithValue: Story = {
  args: {
    options: categoryOptions,
    label: 'Categories',
    multiple: true,
    value: ['laptops', 'monitors', 'gpus'],
  },
};

export const WithIcons: Story = {
  args: {
    options: [
      {
        value: 'uzs',
        label: 'UZS - Uzbek Sum',
        icon: <span style={{ fontSize: 16 }}>🇺🇿</span>,
      },
      {
        value: 'usd',
        label: 'USD - US Dollar',
        icon: <span style={{ fontSize: 16 }}>🇺🇸</span>,
      },
      {
        value: 'rub',
        label: 'RUB - Russian Ruble',
        icon: <span style={{ fontSize: 16 }}>🇷🇺</span>,
      },
    ],
    label: 'Currency',
    title: 'Select Currency',
  },
};

export const Interactive: Story = {
  name: 'Controlled Single Select',
  render: () => {
    const [value, setValue] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Select
          options={categoryOptions}
          label="Category"
          value={value}
          onChange={(v) => setValue(v as string)}
          placeholder="Choose a category"
        />
        {value && (
          <div style={{ fontSize: 12, color: '#666' }}>
            Selected: {value}
          </div>
        )}
      </div>
    );
  },
};

export const InteractiveMultiple: Story = {
  name: 'Controlled Multi Select',
  render: () => {
    const [values, setValues] = useState<string[]>([]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Select
          options={categoryOptions}
          label="Favourite Categories"
          multiple
          value={values}
          onChange={(v) => setValues(v as string[])}
          placeholder="Select favourites"
          title="Select Categories"
        />
        {values.length > 0 && (
          <div style={{ fontSize: 12, color: '#666' }}>
            Selected: {values.join(', ')}
          </div>
        )}
      </div>
    );
  },
};

export const CustomTexts: Story = {
  args: {
    options: categoryOptions.slice(0, 4),
    label: 'Kategoriya',
    multiple: true,
    placeholder: 'Tanlang',
    title: 'Kategoriyani tanlang',
    confirmText: 'Tasdiqlash',
    cancelText: 'Bekor qilish',
  },
};
