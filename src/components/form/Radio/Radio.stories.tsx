import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Radio, RadioGroup } from './Radio';

const meta = {
  title: 'Form/Radio',
  component: RadioGroup,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 16, background: '#fff', borderRadius: 12, width: 375 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 'male',
    onChange: fn(),
    children: null,
  },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="male">Erkak</Radio>
      <Radio value="female">Ayol</Radio>
    </RadioGroup>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const radios = canvas.getAllByRole('radio');

    await expect(radios).toHaveLength(2);
    await expect(radios[0]).toBeChecked();
    await expect(radios[1]).not.toBeChecked();

    // Click second option
    await userEvent.click(radios[1]);
    await expect(args.onChange).toHaveBeenCalledWith('female');
  },
};

export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
    defaultValue: 'male',
    children: null,
  },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="male">Erkak</Radio>
      <Radio value="female">Ayol</Radio>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  args: {
    defaultValue: 'cash',
    disabled: true,
    children: null,
  },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="cash">Naqd pul</Radio>
      <Radio value="card">Plastik karta</Radio>
      <Radio value="transfer">Bank o&apos;tkazmasi</Radio>
    </RadioGroup>
  ),
};

export const SingleDisabled: Story = {
  name: 'Individual Disabled Option',
  args: {
    defaultValue: 'standard',
    children: null,
  },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="express">Express yetkazish (1 kun)</Radio>
      <Radio value="standard">Standart yetkazish (3-5 kun)</Radio>
      <Radio value="economy" disabled>
        Tejamkor yetkazish (mavjud emas)
      </Radio>
    </RadioGroup>
  ),
};

export const Interactive: Story = {
  args: {
    children: null,
  },
  render: () => {
    const [value, setValue] = useState('tashkent');
    return (
      <div>
        <div style={{ fontSize: 14, color: '#666', marginBottom: 12 }}>
          Tanlangan: <strong>{value}</strong>
        </div>
        <RadioGroup value={value} onChange={setValue}>
          <Radio value="tashkent">Toshkent</Radio>
          <Radio value="samarkand">Samarqand</Radio>
          <Radio value="bukhara">Buxoro</Radio>
          <Radio value="fergana">Farg&apos;ona</Radio>
        </RadioGroup>
      </div>
    );
  },
};

export const PaymentMethods: Story = {
  name: 'Payment Method Selection',
  args: {
    children: null,
  },
  render: () => {
    const [method, setMethod] = useState('card');
    return (
      <RadioGroup value={method} onChange={setMethod}>
        <Radio value="card">Plastik karta (Visa/MasterCard)</Radio>
        <Radio value="payme">Payme</Radio>
        <Radio value="click">Click</Radio>
        <Radio value="cash">Naqd pul (yetkazib berishda)</Radio>
      </RadioGroup>
    );
  },
};
