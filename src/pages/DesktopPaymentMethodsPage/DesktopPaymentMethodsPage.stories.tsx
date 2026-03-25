import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopPaymentMethodsPage } from './DesktopPaymentMethodsPage';
import type { DesktopPaymentMethod } from '../../components';

const meta = {
  title: 'Pages (Desktop)/DesktopPaymentMethodsPage',
  component: DesktopPaymentMethodsPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopPaymentMethodsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  name: 'No Payment Methods',
  args: {
    initialPaymentMethods: [],
  },
};

export const SingleCard: Story = {
  name: 'Single Card',
  args: {
    initialPaymentMethods: [
      { id: 'pm-1', type: 'uzcard', label: 'UzCard', lastFour: '7712', expiryDate: '11/28', isDefault: true },
    ] satisfies DesktopPaymentMethod[],
  },
};

export const ManyMethods: Story = {
  name: 'Many Methods',
  args: {
    initialPaymentMethods: [
      { id: 'pm-1', type: 'uzcard', label: 'UzCard (Asosiy)', lastFour: '4523', expiryDate: '09/27', isDefault: true },
      { id: 'pm-2', type: 'humo', label: 'Humo', lastFour: '8901', expiryDate: '03/28', isDefault: false },
      { id: 'pm-3', type: 'uzcard', label: 'UzCard (Ish)', lastFour: '1199', expiryDate: '06/29', isDefault: false },
      { id: 'pm-4', type: 'payme', label: 'Payme', isDefault: false },
      { id: 'pm-5', type: 'cash', label: 'Naqd pul', isDefault: false },
      { id: 'pm-6', type: 'humo', label: 'Humo (Oila)', lastFour: '3344', expiryDate: '12/27', isDefault: false },
    ] satisfies DesktopPaymentMethod[],
  },
};

export const OnlyDigitalWallets: Story = {
  name: 'Only Digital Wallets',
  args: {
    initialPaymentMethods: [
      { id: 'pm-1', type: 'payme', label: 'Payme', isDefault: true },
      { id: 'pm-2', type: 'cash', label: 'Naqd pul (Yetkazib berish)', isDefault: false },
    ] satisfies DesktopPaymentMethod[],
  },
};

export const ExpiredCard: Story = {
  name: 'With Expired Card',
  args: {
    initialPaymentMethods: [
      { id: 'pm-1', type: 'uzcard', label: 'UzCard', lastFour: '4523', expiryDate: '09/27', isDefault: true },
      { id: 'pm-2', type: 'humo', label: 'Humo (Muddati tugagan)', lastFour: '5501', expiryDate: '01/24', isDefault: false },
      { id: 'pm-3', type: 'payme', label: 'Payme', isDefault: false },
    ] satisfies DesktopPaymentMethod[],
  },
};
