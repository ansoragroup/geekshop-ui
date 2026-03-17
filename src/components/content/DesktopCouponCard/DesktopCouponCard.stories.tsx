import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopCouponCard } from './DesktopCouponCard';

const meta = {
  title: 'Content (Desktop)/DesktopCouponCard',
  component: DesktopCouponCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    onApply: { action: 'apply clicked' },
    color: {
      control: { type: 'select' },
      options: ['orange', 'red', 'green', 'blue'],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 700, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopCouponCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    discount: "50,000 so'm",
    code: 'GEEK50K',
    minAmount: "Orders over 500,000 so'm",
    categories: ['Electronics', 'Gadgets'],
    expiryDate: '31 Mar 2026',
    color: 'orange',
  },
};

export const RedCoupon: Story = {
  args: {
    discount: '15%',
    code: 'FLASH15',
    minAmount: "Orders over 200,000 so'm",
    categories: ['All categories'],
    expiryDate: '15 Apr 2026',
    color: 'red',
  },
};

export const Applied: Story = {
  args: {
    discount: "100,000 so'm",
    code: 'SPRING100',
    minAmount: "Orders over 1,000,000 so'm",
    expiryDate: '30 Apr 2026',
    color: 'green',
    applied: true,
  },
};

export const WithCategories: Story = {
  args: {
    discount: '20%',
    code: 'MULTI20',
    minAmount: "Orders over 300,000 so'm",
    categories: ['Laptops', 'Keyboards', 'Monitors', 'Accessories'],
    expiryDate: '01 May 2026',
    color: 'blue',
  },
};

export const CouponGrid: Story = {
  name: 'Coupon Grid (3 stacked)',
  decorators: [
    (Story) => (
      <div style={{ width: 700, padding: 24, background: '#f5f5f5', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <DesktopCouponCard
        discount="50,000 so'm"
        code="GEEK50K"
        minAmount="Orders over 500,000 so'm"
        categories={['Electronics', 'Gadgets']}
        expiryDate="31 Mar 2026"
        color="orange"
      />
      <DesktopCouponCard
        discount="15%"
        code="FLASH15"
        minAmount="Orders over 200,000 so'm"
        categories={['All categories']}
        expiryDate="15 Apr 2026"
        color="red"
      />
      <DesktopCouponCard
        discount="100,000 so'm"
        code="SPRING100"
        minAmount="Orders over 1,000,000 so'm"
        expiryDate="30 Apr 2026"
        color="green"
        applied
      />
    </>
  ),
};
