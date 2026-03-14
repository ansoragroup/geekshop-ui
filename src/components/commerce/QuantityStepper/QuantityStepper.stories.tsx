import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QuantityStepper } from './QuantityStepper';

const meta = {
  title: 'Commerce/QuantityStepper',
  component: QuantityStepper,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'White' },
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md'],
    },
    value: { control: { type: 'number', min: 0, max: 99 } },
    min: { control: 'number' },
    max: { control: 'number' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof QuantityStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 1,
    min: 1,
    max: 99,
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    value: 3,
    min: 1,
    max: 10,
    size: 'sm',
  },
};

export const AtMinimum: Story = {
  args: {
    value: 1,
    min: 1,
    max: 99,
    size: 'md',
  },
};

export const AtMaximum: Story = {
  args: {
    value: 5,
    min: 1,
    max: 5,
    size: 'md',
  },
};

export const Disabled: Story = {
  args: {
    value: 2,
    min: 1,
    max: 10,
    size: 'md',
    disabled: true,
  },
};

export const Interactive = () => {
  const [qty, setQty] = useState(1);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <QuantityStepper value={qty} min={1} max={20} onChange={setQty} size="md" />
      <span style={{ fontSize: 14, color: '#666' }}>Tanlangan: {qty} ta</span>
    </div>
  );
};
