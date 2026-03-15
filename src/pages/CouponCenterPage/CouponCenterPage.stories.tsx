import type { Meta, StoryObj } from '@storybook/react-vite';
import { CouponCenterPage } from './CouponCenterPage';

const meta = {
  title: 'Pages/CouponCenterPage',
  component: CouponCenterPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof CouponCenterPage>;

export default meta;
type Story = StoryObj<typeof CouponCenterPage>;

export const Default: Story = {};
