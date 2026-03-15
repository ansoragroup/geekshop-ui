import type { Meta, StoryObj } from '@storybook/react-vite';
import { DeliveryTrackingPage } from './DeliveryTrackingPage';

const meta = {
  title: 'Pages/DeliveryTrackingPage',
  component: DeliveryTrackingPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof DeliveryTrackingPage>;

export default meta;
type Story = StoryObj<typeof DeliveryTrackingPage>;

export const Default: Story = {};
