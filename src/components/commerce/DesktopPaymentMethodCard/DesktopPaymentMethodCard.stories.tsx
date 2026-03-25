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

/** Visa card: default, with last four digits, expiry, and default badge. */
export const Visa: Story = {
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

/** Mastercard: with last four and expiry. */
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

/** UzCard: Uzbekistan local payment card. */
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

/** Humo: Uzbekistan local payment card, selected state. */
export const HumoSelected: Story = {
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

/** Payme: mobile payment method. */
export const Payme: Story = {
  args: {
    method: {
      id: '6',
      type: 'payme',
      label: 'Payme',
      lastFour: '7777',
      expiryDate: '06/27',
    },
    selected: false,
    onSelect: fn(),
    onDelete: fn(),
  },
};

/** Cash on delivery: no last four or expiry. */
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

/** Non-selectable: display only, no radio button. */
export const NonSelectable: Story = {
  args: {
    method: {
      id: '7',
      type: 'visa',
      label: 'Visa Business',
      lastFour: '1234',
      expiryDate: '01/28',
      isDefault: false,
    },
    selectable: false,
    onDelete: fn(),
  },
};

/** Without delete button. */
export const NoDelete: Story = {
  args: {
    method: {
      id: '8',
      type: 'mastercard',
      label: 'Corporate Card',
      lastFour: '9999',
      expiryDate: '12/26',
      isDefault: true,
    },
    selected: true,
    onSelect: fn(),
  },
};

/** Minimal: no last four, no expiry, not default. */
export const Minimal: Story = {
  args: {
    method: {
      id: '9',
      type: 'cash',
      label: 'Pay at Store',
    },
    selected: false,
    onSelect: fn(),
  },
};

/** All payment types stacked for comparison. */
export const AllPaymentTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <DesktopPaymentMethodCard
        method={{ id: '1', type: 'visa', label: 'Visa', lastFour: '4242', expiryDate: '12/27', isDefault: true }}
        selected={true}
        onSelect={fn()}
        onDelete={fn()}
      />
      <DesktopPaymentMethodCard
        method={{ id: '2', type: 'mastercard', label: 'Mastercard', lastFour: '5555', expiryDate: '08/26' }}
        selected={false}
        onSelect={fn()}
        onDelete={fn()}
      />
      <DesktopPaymentMethodCard
        method={{ id: '3', type: 'uzcard', label: 'UzCard', lastFour: '8600', expiryDate: '03/28' }}
        selected={false}
        onSelect={fn()}
        onDelete={fn()}
      />
      <DesktopPaymentMethodCard
        method={{ id: '4', type: 'humo', label: 'Humo', lastFour: '9860', expiryDate: '11/25' }}
        selected={false}
        onSelect={fn()}
        onDelete={fn()}
      />
      <DesktopPaymentMethodCard
        method={{ id: '5', type: 'payme', label: 'Payme', lastFour: '7777', expiryDate: '06/27' }}
        selected={false}
        onSelect={fn()}
        onDelete={fn()}
      />
      <DesktopPaymentMethodCard
        method={{ id: '6', type: 'cash', label: 'Cash on Delivery' }}
        selected={false}
        onSelect={fn()}
      />
    </div>
  ),
};
