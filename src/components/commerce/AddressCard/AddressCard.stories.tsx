import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AddressCard } from './AddressCard';
import type { Address } from './AddressCard';

const meta = {
  title: 'Commerce/AddressCard',
  component: AddressCard,
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
} satisfies Meta<typeof AddressCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleAddress: Address = {
  id: '1',
  name: 'Aziz Karimov',
  phone: '+998 90 123 45 67',
  street: 'Amir Temur shoh ko\'chasi, 108-uy, 24-xonadon',
  city: 'Toshkent',
  region: 'Toshkent shahri',
  postalCode: '100000',
};

export const Default: Story = {
  args: {
    address: sampleAddress,
  },
};

export const Selected: Story = {
  args: {
    address: sampleAddress,
    selected: true,
    selectable: true,
  },
};

export const WithActions: Story = {
  args: {
    address: {
      ...sampleAddress,
      label: 'Uy',
    },
    editable: true,
    deletable: true,
    onEdit: (addr) => console.log('Edit:', addr.id),
    onDelete: (addr) => console.log('Delete:', addr.id),
  },
};

export const DefaultAddress: Story = {
  args: {
    address: {
      ...sampleAddress,
      isDefault: true,
      label: 'Uy',
    },
    selectable: true,
    selected: true,
    editable: true,
    deletable: true,
  },
};

export const CompactWidth: Story = {
  args: {
    address: sampleAddress,
    editable: true,
    deletable: true,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 260 }}>
        <Story />
      </div>
    ),
  ],
};

export const AddressList = () => {
  const addresses: Address[] = [
    {
      id: '1',
      name: 'Aziz Karimov',
      phone: '+998 90 123 45 67',
      street: 'Amir Temur shoh ko\'chasi, 108-uy, 24-xonadon',
      city: 'Toshkent',
      region: 'Toshkent shahri',
      isDefault: true,
      label: 'Uy',
    },
    {
      id: '2',
      name: 'Aziz Karimov',
      phone: '+998 90 123 45 67',
      street: 'Mustaqillik maydoni, 5-bino, 3-qavat',
      city: 'Toshkent',
      region: 'Toshkent shahri',
      label: 'Ish',
    },
    {
      id: '3',
      name: 'Nodira Karimova',
      phone: '+998 91 987 65 43',
      street: 'Navoiy ko\'chasi, 42-uy',
      city: 'Samarqand',
      region: 'Samarqand viloyati',
      postalCode: '140100',
    },
  ];

  const [selectedId, setSelectedId] = useState('1');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {addresses.map((addr) => (
        <AddressCard
          key={addr.id}
          address={addr}
          selectable
          selected={selectedId === addr.id}
          editable
          deletable
          onSelect={(a) => setSelectedId(a.id)}
          onEdit={(a) => console.log('Edit:', a.id)}
          onDelete={(a) => console.log('Delete:', a.id)}
        />
      ))}
    </div>
  );
};
