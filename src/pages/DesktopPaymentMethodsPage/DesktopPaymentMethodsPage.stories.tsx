import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopPaymentMethodsPage } from './DesktopPaymentMethodsPage';

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
