import type { Meta, StoryObj } from '@storybook/react-vite';
import { PaymentMethodsPage } from './PaymentMethodsPage';

const meta = {
  title: 'Pages/PaymentMethodsPage',
  component: PaymentMethodsPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof PaymentMethodsPage>;

export default meta;
type Story = StoryObj<typeof PaymentMethodsPage>;

/** Default state with all payment method types */
export const Default: Story = {
  args: {
    empty: false,
    showDeleteConfirm: false,
  },
};

/** Empty state with no payment methods */
export const Empty: Story = {
  args: {
    empty: true,
  },
};

/** Delete confirmation popup shown */
export const DeleteConfirmation: Story = {
  args: {
    empty: false,
    showDeleteConfirm: true,
  },
};
