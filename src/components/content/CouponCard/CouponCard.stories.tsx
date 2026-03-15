import type { Meta, StoryObj } from '@storybook/react-vite';
import { CouponCard } from './CouponCard';

const meta = {
  title: 'Content/CouponCard',
  component: CouponCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '375px', padding: '12px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    onUse: { action: 'coupon used' },
    color: { control: 'color' },
  },
} satisfies Meta<typeof CouponCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    discount: '-10%',
    code: 'GEEK10',
    expiryDate: '2026-04-01',
    minAmount: 500000,
    color: '#FF5000',
  },
};

export const FifteenPercent: Story = {
  args: {
    discount: '-15%',
    code: 'SPRING15',
    expiryDate: '2026-03-31',
    minAmount: 1000000,
    color: '#F5222D',
  },
};

export const FixedAmount: Story = {
  args: {
    discount: '50 000',
    code: 'SAVE50K',
    expiryDate: '2026-05-15',
    minAmount: 2000000,
    color: '#07C160',
  },
};

export const PremiumCoupon: Story = {
  args: {
    discount: '-25%',
    code: 'VIP25',
    expiryDate: '2026-06-01',
    minAmount: 5000000,
    color: '#722ED1',
  },
};

export const MultipleCoupons: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '375px', padding: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Story />
        </div>
      </div>
    ),
  ],
  render: () => (
    <>
      <CouponCard
        discount="-10%"
        code="GEEK10"
        expiryDate="2026-04-01"
        minAmount={500000}
        color="#FF5000"
      />
      <CouponCard
        discount="-15%"
        code="SPRING15"
        expiryDate="2026-03-31"
        minAmount={1000000}
        color="#F5222D"
      />
      <CouponCard
        discount="-25%"
        code="VIP25"
        expiryDate="2026-06-01"
        minAmount={5000000}
        color="#722ED1"
      />
    </>
  ),
};
