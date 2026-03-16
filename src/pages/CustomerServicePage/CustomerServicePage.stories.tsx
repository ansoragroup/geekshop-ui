import type { Meta, StoryObj } from '@storybook/react-vite';
import { CustomerServicePage } from './CustomerServicePage';

const meta = {
  title: 'Pages/CustomerServicePage',
  component: CustomerServicePage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof CustomerServicePage>;

export default meta;
type Story = StoryObj<typeof CustomerServicePage>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    hasMessages: false,
  },
};
