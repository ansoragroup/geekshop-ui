import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DesktopDeliverySelector } from './DesktopDeliverySelector';

const meta = {
  title: 'Commerce (Desktop)/DesktopDeliverySelector',
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

/** Default: 3 delivery options (standard, express, pickup) in English. */
export const Default: Story = {
  args: {
    options: [
      {
        id: 'standard',
        title: 'Standard Delivery',
        price: 0,
        estimatedDays: '3-5 business days',
        icon: 'standard',
      },
      {
        id: 'express',
        title: 'Express Delivery',
        price: 25_000,
        estimatedDays: '1-2 business days',
        icon: 'express',
      },
      { id: 'pickup', title: 'Store Pickup', price: 0, estimatedDays: 'Today', icon: 'pickup' },
    ],
    selected: 'standard',
  },
};

/** Express selected. */
export const ExpressSelected: Story = {
  args: {
    options: [
      {
        id: 'standard',
        title: 'Standard Delivery',
        price: 0,
        estimatedDays: '3-5 business days',
        icon: 'standard',
      },
      {
        id: 'express',
        title: 'Express Delivery',
        price: 35_000,
        estimatedDays: 'Next day',
        icon: 'express',
      },
      {
        id: 'pickup',
        title: 'Store Pickup (Tashkent)',
        price: 0,
        estimatedDays: 'Ready today',
        icon: 'pickup',
      },
    ],
    selected: 'express',
  },
};

/** Pickup selected. */
export const PickupSelected: Story = {
  args: {
    options: [
      {
        id: 'standard',
        title: 'Standard Delivery',
        price: 15_000,
        estimatedDays: '5-7 business days',
        icon: 'standard',
      },
      {
        id: 'express',
        title: 'Express Delivery',
        price: 50_000,
        estimatedDays: 'Next day',
        icon: 'express',
      },
      {
        id: 'pickup',
        title: 'Pickup from Chilanzar Branch',
        price: 0,
        estimatedDays: 'Ready today',
        icon: 'pickup',
      },
    ],
    selected: 'pickup',
  },
};

/** Two options only (no pickup). */
export const TwoOptions: Story = {
  args: {
    options: [
      {
        id: 'standard',
        title: 'Regular Shipping',
        price: 15_000,
        estimatedDays: '5-7 business days',
        icon: 'standard',
      },
      {
        id: 'express',
        title: 'Priority Shipping',
        price: 50_000,
        estimatedDays: 'Next day delivery',
        icon: 'express',
      },
    ],
    selected: 'standard',
  },
};

/** Single option (free standard shipping). */
export const SingleOption: Story = {
  args: {
    options: [
      {
        id: 'standard',
        title: 'Free Standard Shipping',
        price: 0,
        estimatedDays: '3-5 business days',
        icon: 'standard',
      },
    ],
    selected: 'standard',
  },
};

/** All paid options (no free shipping). */
export const AllPaid: Story = {
  args: {
    options: [
      {
        id: 'standard',
        title: 'Economy',
        price: 10_000,
        estimatedDays: '7-10 business days',
        icon: 'standard',
      },
      {
        id: 'express',
        title: 'Standard',
        price: 25_000,
        estimatedDays: '3-5 business days',
        icon: 'standard',
      },
      {
        id: 'priority',
        title: 'Priority Express',
        price: 75_000,
        estimatedDays: 'Same day',
        icon: 'express',
      },
    ],
    selected: 'standard',
  },
};

/** With custom label. */
export const WithLabel: Story = {
  args: {
    label: 'Choose Delivery Method',
    options: [
      {
        id: 'standard',
        title: 'Standard Delivery',
        price: 0,
        estimatedDays: '3-5 business days',
        icon: 'standard',
      },
      {
        id: 'express',
        title: 'Express Delivery',
        price: 35_000,
        estimatedDays: '1-2 business days',
        icon: 'express',
      },
    ],
    selected: 'standard',
  },
};

/** Uzbek locale text. */
export const UzbekLocale: Story = {
  args: {
    label: 'Yetkazish usulini tanlang',
    options: [
      {
        id: 'standard',
        title: 'Standart yetkazish',
        price: 0,
        estimatedDays: '3-5 ish kuni',
        icon: 'standard',
      },
      {
        id: 'express',
        title: 'Tezkor yetkazish',
        price: 25_000,
        estimatedDays: '1-2 ish kuni',
        icon: 'express',
      },
      {
        id: 'pickup',
        title: 'Olib ketish (Chilanzar filiali)',
        price: 0,
        estimatedDays: 'Bugun tayyor',
        icon: 'pickup',
      },
    ],
    selected: 'standard',
  },
};

/** Interactive: controlled state with selection display. */
export const Interactive: Story = {
  render: () => {
    const [selected, setSelected] = useState('standard');
    const options = [
      {
        id: 'standard',
        title: 'Standard Delivery',
        price: 0,
        estimatedDays: '3-5 business days',
        icon: 'standard' as const,
      },
      {
        id: 'express',
        title: 'Express Delivery',
        price: 25_000,
        estimatedDays: '1-2 business days',
        icon: 'express' as const,
      },
      {
        id: 'pickup',
        title: 'Store Pickup (Chilanzar)',
        price: 0,
        estimatedDays: 'Ready today',
        icon: 'pickup' as const,
      },
    ];

    const selectedOption = options.find((o) => o.id === selected);

    return (
      <div>
        <DesktopDeliverySelector options={options} selected={selected} onChange={setSelected} />
        <p style={{ marginTop: 16, color: '#666', fontSize: 14 }}>
          Selected: <strong>{selectedOption?.title}</strong>
          {selectedOption?.price ? ` (${selectedOption.price.toLocaleString()} UZS)` : ' (Free)'}
        </p>
      </div>
    );
  },
};
