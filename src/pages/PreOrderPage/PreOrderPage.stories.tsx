import type { Meta, StoryObj } from '@storybook/react-vite';
import { PreOrderPage } from './PreOrderPage';

const meta = {
  title: 'Pages/PreOrderPage',
  component: PreOrderPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof PreOrderPage>;

export default meta;
type Story = StoryObj<typeof PreOrderPage>;

export const Default: Story = {
  args: {
    notifyOnly: false,
  },
};

export const NotifyMode: Story = {
  args: {
    notifyOnly: true,
  },
};
