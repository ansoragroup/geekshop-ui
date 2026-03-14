import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PaymentMethodCard } from './PaymentMethodCard';
import type { PaymentMethod } from './PaymentMethodCard';

const meta = {
  title: 'Commerce/PaymentMethodCard',
  component: PaymentMethodCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'GeekShop Light' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 420, width: '100%', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PaymentMethodCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    method: {
      id: '1',
      type: 'visa',
      label: 'Visa',
      lastFour: '4242',
      expiryDate: '12/26',
      isDefault: true,
    },
    selectable: true,
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    method: {
      id: '1',
      type: 'uzcard',
      label: 'Uzcard',
      lastFour: '8600',
      expiryDate: '03/27',
      isDefault: true,
    },
    selectable: true,
    selected: true,
  },
};

export const AllTypes = () => {
  const methods: PaymentMethod[] = [
    { id: '1', type: 'visa', label: 'Visa', lastFour: '4242', expiryDate: '12/26' },
    { id: '2', type: 'mastercard', label: 'Mastercard', lastFour: '5555', expiryDate: '08/25' },
    { id: '3', type: 'uzcard', label: 'Uzcard', lastFour: '8600', expiryDate: '03/27', isDefault: true },
    { id: '4', type: 'humo', label: 'Humo', lastFour: '9860', expiryDate: '11/26' },
    { id: '5', type: 'click', label: 'Click', },
    { id: '6', type: 'payme', label: 'Payme' },
    { id: '7', type: 'cash', label: 'Naqd pul' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {methods.map((m) => (
        <PaymentMethodCard
          key={m.id}
          method={m}
          onDelete={(method) => console.log('Delete:', method.id)}
        />
      ))}
    </div>
  );
};

export const SelectableList = () => {
  const methods: PaymentMethod[] = [
    { id: '1', type: 'uzcard', label: 'Uzcard', lastFour: '8600', expiryDate: '03/27', isDefault: true },
    { id: '2', type: 'humo', label: 'Humo', lastFour: '9860', expiryDate: '11/26' },
    { id: '3', type: 'visa', label: 'Visa', lastFour: '4242', expiryDate: '12/26' },
    { id: '4', type: 'click', label: 'Click' },
    { id: '5', type: 'payme', label: 'Payme' },
    { id: '6', type: 'cash', label: 'Naqd pul' },
  ];

  const [selectedId, setSelectedId] = useState('1');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {methods.map((m) => (
        <PaymentMethodCard
          key={m.id}
          method={m}
          selectable
          selected={selectedId === m.id}
          onSelect={(method) => setSelectedId(method.id)}
        />
      ))}
    </div>
  );
};
