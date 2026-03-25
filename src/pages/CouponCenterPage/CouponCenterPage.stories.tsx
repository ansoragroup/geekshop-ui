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

/** Default view showing available coupons tab */
export const Default: Story = {};

/** Available coupons tab with percentage and fixed discount coupons */
export const AvailableCoupons: Story = {};

/** User's claimed coupons (My Coupons tab) */
export const MyCoupons: Story = {
  play: async ({ canvasElement }) => {
    const myCouponsTab = canvasElement.querySelectorAll('[role="tab"]')[1];
    if (myCouponsTab instanceof HTMLElement) {
      myCouponsTab.click();
    }
  },
};

/** Expired coupons tab — shows used/expired coupons without action button */
export const ExpiredCoupons: Story = {
  play: async ({ canvasElement }) => {
    const expiredTab = canvasElement.querySelectorAll('[role="tab"]')[2];
    if (expiredTab instanceof HTMLElement) {
      expiredTab.click();
    }
  },
};

/** Empty state when no coupons are available in a tab */
export const EmptyState: Story = {};

/** Multiple coupons with various discount types and thresholds */
export const ManyCoupons: Story = {};
