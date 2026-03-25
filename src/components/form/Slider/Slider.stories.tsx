import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn, expect, userEvent, within } from 'storybook/test';
import { Slider } from './Slider';

const meta = {
  title: 'Form/Slider',
  component: Slider,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 24, background: '#fff', borderRadius: 12, width: 375 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 40,
    'aria-label': 'Volume',
    onChange: fn(),
  },
};

export const RangeMode: Story = {
  args: {
    range: true,
    defaultValue: [20, 80] as [number, number],
    'aria-label': 'Price range',
    onChange: fn(),
  },
};

export const WithMarks: Story = {
  args: {
    defaultValue: 50,
    marks: [
      { value: 0, label: '0' },
      { value: 25, label: '25%' },
      { value: 50, label: '50%' },
      { value: 75, label: '75%' },
      { value: 100, label: '100%' },
    ],
    'aria-label': 'Brightness',
  },
};

export const CustomStep: Story = {
  args: {
    defaultValue: 20,
    min: 0,
    max: 100,
    step: 10,
    'aria-label': 'Volume level',
    onChange: fn(),
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: 60,
    disabled: true,
    'aria-label': 'Disabled slider',
  },
};

export const CustomRange: Story = {
  args: {
    defaultValue: 500000,
    min: 100000,
    max: 5000000,
    step: 100000,
    'aria-label': 'Budget',
    onChange: fn(),
  },
};

export const VerticalOrientation: Story = {
  args: {
    defaultValue: 70,
    orientation: 'vertical',
    'aria-label': 'Vertical slider',
    onChange: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 24, background: '#fff', borderRadius: 12, width: 375, height: 200 }}>
        <Story />
      </div>
    ),
  ],
};

export const PriceRangeFilter: Story = {
  name: 'Price Range Filter',
  render: () => {
    const [val, setVal] = useState<[number, number]>([500000, 3000000]);
    const fmt = (n: number) => new Intl.NumberFormat('uz-UZ').format(n) + " so'm";

    return (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 8,
            fontSize: 14,
            color: '#666',
          }}
        >
          <span>{fmt(val[0])}</span>
          <span>{fmt(val[1])}</span>
        </div>
        <Slider
          range
          value={val}
          onChange={(v) => setVal(v as [number, number])}
          min={0}
          max={5000000}
          step={100000}
          aria-label="Price range filter"
        />
      </div>
    );
  },
};

export const KeyboardNav: Story = {
  name: 'Keyboard Navigation',
  args: {
    defaultValue: 50,
    'aria-label': 'Keyboard test',
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const slider = canvas.getByRole('slider');
    slider.focus();

    await expect(slider).toHaveAttribute('aria-valuenow', '50');
    await userEvent.keyboard('{ArrowRight}');
    await expect(args.onChange).toHaveBeenCalled();
  },
};
