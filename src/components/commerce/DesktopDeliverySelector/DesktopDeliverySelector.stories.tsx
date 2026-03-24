import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DesktopDeliverySelector } from './DesktopDeliverySelector';

const meta = {
  title: 'Commerce/DesktopDeliverySelector',
  component: DesktopDeliverySelector,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    onChange: { action: 'delivery selected' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 480, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopDeliverySelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      { id: 'standard', title: 'Standart yetkazish', price: 0, estimatedDays: '3-5 ish kuni', icon: 'standard' },
      { id: 'express', title: 'Tezkor yetkazish', price: 25_000, estimatedDays: '1-2 ish kuni', icon: 'express' },
      { id: 'pickup', title: 'Olib ketish', price: 0, estimatedDays: 'Bugun', icon: 'pickup' },
    ],
    selected: 'standard',
  },
};

export const ExpressSelected: Story = {
  name: 'Tezkor tanlangan',
  args: {
    options: [
      { id: 'standard', title: 'Standart yetkazish', price: 0, estimatedDays: '3-5 ish kuni', icon: 'standard' },
      { id: 'express', title: 'Tezkor yetkazish', price: 35_000, estimatedDays: 'Ertaga', icon: 'express' },
      { id: 'pickup', title: 'Olib ketish (Tashkent)', price: 0, estimatedDays: 'Bugun tayyor', icon: 'pickup' },
    ],
    selected: 'express',
  },
};

export const Interactive: Story = {
  name: 'Interactive (controlled)',
  render: () => {
    const [selected, setSelected] = useState('standard');
    return (
      <DesktopDeliverySelector
        options={[
          { id: 'standard', title: 'Standart yetkazish', price: 0, estimatedDays: '3-5 ish kuni', icon: 'standard' },
          { id: 'express', title: 'Tezkor yetkazish', price: 25_000, estimatedDays: '1-2 ish kuni', icon: 'express' },
          { id: 'pickup', title: 'Olib ketish (Chilanzar filiali)', price: 0, estimatedDays: 'Bugun tayyor', icon: 'pickup' },
        ]}
        selected={selected}
        onChange={setSelected}
      />
    );
  },
};

export const TwoOptions: Story = {
  name: 'Ikki variant',
  args: {
    options: [
      { id: 'standard', title: 'Oddiy yetkazish', price: 15_000, estimatedDays: '5-7 ish kuni', icon: 'standard' },
      { id: 'express', title: 'Tezkor yetkazish', price: 50_000, estimatedDays: 'Ertaga', icon: 'express' },
    ],
    selected: 'standard',
  },
};
