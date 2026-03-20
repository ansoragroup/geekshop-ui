import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DesktopPaymentMethodCard } from './DesktopPaymentMethodCard';

const meta = {
  title: 'Commerce (Desktop)/DesktopPaymentMethodCard',
  component: DesktopPaymentMethodCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    onSelect: { action: 'onSelect' },
    onDelete: { action: 'onDelete' },
  },
  decorators: [(Story) => (
    <div style={{ width: 700, padding: 24 }}>
      <Story />
    </div>
  )],
} satisfies Meta<typeof DesktopPaymentMethodCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    method: {
      id: '1',
      type: 'visa',
      label: 'Visa',
      lastFour: '4242',
      expiryDate: '12/27',
      isDefault: true,
    },
    selected: false,
    onSelect: fn(),
    onDelete: fn(),
  },
};

export const Mastercard: Story = {
  args: {
    method: {
      id: '2',
      type: 'mastercard',
      label: 'Mastercard',
      lastFour: '5555',
      expiryDate: '08/26',
    },
    selected: false,
    onSelect: fn(),
    onDelete: fn(),
  },
};

export const UzCard: Story = {
  args: {
    method: {
      id: '3',
      type: 'uzcard',
      label: 'UzCard',
      lastFour: '8600',
      expiryDate: '03/28',
    },
    selected: false,
    onSelect: fn(),
    onDelete: fn(),
  },
};

export const CashOnDelivery: Story = {
  args: {
    method: {
      id: '4',
      type: 'cash',
      label: 'Cash on Delivery',
    },
    selected: false,
    onSelect: fn(),
  },
};

export const Selected: Story = {
  args: {
    method: {
      id: '5',
      type: 'humo',
      label: 'Humo',
      lastFour: '9860',
      expiryDate: '11/25',
      isDefault: true,
    },
    selected: true,
    onSelect: fn(),
    onDelete: fn(),
  },
};
