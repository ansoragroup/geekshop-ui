import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DesktopQuantityStepper } from './DesktopQuantityStepper';

const meta = {
  title: 'Commerce (Desktop)/DesktopQuantityStepper',
  component: DesktopQuantityStepper,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    onChange: { action: 'onChange' },
    size: { control: 'radio', options: ['sm', 'md'] },
    value: { control: { type: 'number', min: 0, max: 99 } },
    min: { control: 'number' },
    max: { control: 'number' },
    disabled: { control: 'boolean' },
  },
  decorators: [(Story) => (
    <div style={{ width: 300, padding: 24 }}>
      <Story />
    </div>
  )],
} satisfies Meta<typeof DesktopQuantityStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default: medium size, value 1, range 1-99. */
export const Default: Story = {
  args: {
    defaultValue: 1,
    min: 1,
    max: 99,
    size: 'md',
    onChange: fn(),
  },
};

/** Disabled state: stepper is non-interactive. */
export const Disabled: Story = {
  args: {
    value: 3,
    min: 1,
    max: 99,
    disabled: true,
  },
};

/** Small size variant. */
export const SmallSize: Story = {
  args: {
    defaultValue: 2,
    min: 1,
    max: 20,
    size: 'sm',
    onChange: fn(),
  },
};

/** At maximum: plus button disabled. */
export const AtMaximum: Story = {
  args: {
    value: 5,
    min: 1,
    max: 5,
    size: 'md',
    onChange: fn(),
  },
};

/** At minimum: minus button disabled. */
export const AtMinimum: Story = {
  args: {
    value: 1,
    min: 1,
    max: 99,
    size: 'md',
    onChange: fn(),
  },
};

/** Custom range: min 10, max 50 (bulk order scenario). */
export const CustomRange: Story = {
  args: {
    defaultValue: 10,
    min: 10,
    max: 50,
    size: 'md',
    onChange: fn(),
  },
};

/** Min equals max (only one valid value). */
export const SingleValue: Story = {
  args: {
    value: 1,
    min: 1,
    max: 1,
    size: 'md',
    onChange: fn(),
  },
};

/** Small size, disabled. */
export const SmallDisabled: Story = {
  args: {
    value: 5,
    min: 1,
    max: 10,
    size: 'sm',
    disabled: true,
  },
};

/** High value displayed. */
export const HighValue: Story = {
  args: {
    value: 99,
    min: 1,
    max: 99,
    size: 'md',
    onChange: fn(),
  },
};

/** Interactive: controlled stepper with value display. */
export const Interactive: Story = {
  render: () => {
    const [quantity, setQuantity] = useState(1);

    return (
      <div>
        <DesktopQuantityStepper
          value={quantity}
          min={1}
          max={20}
          onChange={setQuantity}
        />
        <p style={{ marginTop: 16, color: '#666', fontSize: 14 }}>
          Quantity: <strong>{quantity}</strong>
          {' '}&bull;{' '}
          Subtotal: <strong>{(quantity * 5_900_000).toLocaleString()} UZS</strong>
        </p>
      </div>
    );
  },
};

/** Side by side: small vs medium comparison. */
export const SizeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <span style={{ fontSize: 12, color: '#999', display: 'block', marginBottom: 4 }}>Size: sm</span>
        <DesktopQuantityStepper defaultValue={3} min={1} max={10} size="sm" />
      </div>
      <div>
        <span style={{ fontSize: 12, color: '#999', display: 'block', marginBottom: 4 }}>Size: md</span>
        <DesktopQuantityStepper defaultValue={3} min={1} max={10} size="md" />
      </div>
    </div>
  ),
};
