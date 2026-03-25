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

/** Default state showing cards, wallets, and cash sections with Add button */
export const Default: Story = {
  args: {
    empty: false,
    showDeleteConfirm: false,
  },
};

/** New user with no saved payment methods — shows empty wallet illustration and CTA */
export const Empty: Story = {
  args: {
    empty: true,
  },
};

/** Delete confirmation popup is visible — user tapped delete on a card */
export const DeleteConfirmation: Story = {
  args: {
    empty: false,
    showDeleteConfirm: true,
  },
};

/** Empty state on a narrow iPhone SE viewport — verifies layout doesn't break */
export const EmptyOnSmallScreen: Story = {
  args: {
    empty: true,
  },
  parameters: {
    viewport: { defaultViewport: 'iPhoneSE' },
  },
};

/** Delete confirmation dialog on a narrow device */
export const DeleteConfirmationSmallScreen: Story = {
  args: {
    empty: false,
    showDeleteConfirm: true,
  },
  parameters: {
    viewport: { defaultViewport: 'iPhoneSE' },
  },
};
