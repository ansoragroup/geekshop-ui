import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn, expect, within } from 'storybook/test';
import { DesktopSlider } from './DesktopSlider';

const meta = {
  title: 'Form (Desktop)/DesktopSlider',
  component: DesktopSlider,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 32, background: '#fff', borderRadius: 12, width: 600 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 40,
    'aria-label': 'Volume control',
    onChange: fn(),
  },
};

export const RangeMode: Story = {
  args: {
    range: true,
    defaultValue: [25, 75] as [number, number],
    'aria-label': 'Price range',
    onChange: fn(),
  },
};

export const WithMarks: Story = {
  args: {
    defaultValue: 50,
    marks: [
      { value: 0, label: 'Min' },
      { value: 25, label: '25%' },
      { value: 50, label: 'Half' },
      { value: 75, label: '75%' },
      { value: 100, label: 'Max' },
    ],
    'aria-label': 'Brightness',
  },
};

export const LargeSteps: Story = {
  args: {
    defaultValue: 200000,
    min: 0,
    max: 1000000,
    step: 50000,
    marks: [
      { value: 0, label: '0' },
      { value: 250000, label: '250K' },
      { value: 500000, label: '500K' },
      { value: 750000, label: '750K' },
      { value: 1000000, label: '1M' },
    ],
    'aria-label': 'Budget selector',
    onChange: fn(),
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: 60,
    disabled: true,
    'aria-label': 'Disabled control',
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
      <div style={{ padding: 32, background: '#fff', borderRadius: 12, width: 200, height: 300 }}>
        <Story />
      </div>
    ),
  ],
};

export const PriceRangeFilter: Story = {
  name: 'E-commerce Price Filter',
  render: () => {
    const [val, setVal] = useState<[number, number]>([1000000, 8000000]);
    const fmt = (n: number) => new Intl.NumberFormat('uz-UZ').format(n) + " so'm";

    return (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 12,
            fontSize: 14,
            color: '#666',
          }}
        >
          <span>{fmt(val[0])}</span>
          <span>{fmt(val[1])}</span>
        </div>
        <DesktopSlider
          range
          value={val}
          onChange={(v) => setVal(v as [number, number])}
          min={0}
          max={10000000}
          step={500000}
          marks={[
            { value: 0, label: '0' },
            { value: 5000000, label: "5M so'm" },
            { value: 10000000, label: "10M so'm" },
          ]}
          aria-label="Price range"
        />
      </div>
    );
  },
};

export const TooltipDemo: Story = {
  name: 'Tooltip on Hover',
  args: {
    defaultValue: 65,
    'aria-label': 'Hover to see tooltip',
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const slider = canvas.getByRole('slider');
    await expect(slider).toHaveAttribute('aria-valuenow', '65');
  },
};
