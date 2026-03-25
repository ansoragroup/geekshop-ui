import { useState } from 'react';
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

// ─── Default ─────────────────────────────────────────────────────────────────

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

// ─── Full Featured ───────────────────────────────────────────────────────────

export const FullFeatured: Story = {
  name: 'Full Featured (all props)',
  args: {
    discount: '25%',
    code: 'MEGA25',
    minAmount: "Orders over 1,000,000 so'm",
    categories: ['Laptops', 'Monitors', 'GPUs', 'Audio'],
    expiryDate: '15 Apr 2026',
    color: 'red',
    applied: false,
  },
};

// ─── Color: Orange ───────────────────────────────────────────────────────────

export const OrangeCoupon: Story = {
  name: 'Color: Orange',
  args: {
    discount: "50,000 so'm",
    code: 'GEEK50K',
    minAmount: "Orders over 500,000 so'm",
    expiryDate: '31 Mar 2026',
    color: 'orange',
  },
};

// ─── Color: Red ──────────────────────────────────────────────────────────────

export const RedCoupon: Story = {
  name: 'Color: Red',
  args: {
    discount: '15%',
    code: 'FLASH15',
    minAmount: "Orders over 200,000 so'm",
    categories: ['All categories'],
    expiryDate: '15 Apr 2026',
    color: 'red',
  },
};

// ─── Color: Green ────────────────────────────────────────────────────────────

export const GreenCoupon: Story = {
  name: 'Color: Green',
  args: {
    discount: "100,000 so'm",
    code: 'SPRING100',
    minAmount: "Orders over 1,000,000 so'm",
    expiryDate: '30 Apr 2026',
    color: 'green',
  },
};

// ─── Color: Blue ─────────────────────────────────────────────────────────────

export const BlueCoupon: Story = {
  name: 'Color: Blue',
  args: {
    discount: '20%',
    code: 'MULTI20',
    minAmount: "Orders over 300,000 so'm",
    categories: ['Laptops', 'Keyboards', 'Monitors'],
    expiryDate: '01 May 2026',
    color: 'blue',
  },
};

// ─── Applied State ───────────────────────────────────────────────────────────

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

// ─── No Min Amount ───────────────────────────────────────────────────────────

export const NoMinAmount: Story = {
  name: 'No Minimum Amount',
  args: {
    discount: '10%',
    code: 'WELCOME10',
    categories: ['All categories'],
    expiryDate: '01 Jun 2026',
    color: 'orange',
  },
};

// ─── No Categories ───────────────────────────────────────────────────────────

export const NoCategories: Story = {
  args: {
    discount: "200,000 so'm",
    code: 'BIGDEAL',
    minAmount: "Orders over 2,000,000 so'm",
    expiryDate: '30 Jun 2026',
    color: 'red',
  },
};

// ─── No Expiry Date ──────────────────────────────────────────────────────────

export const NoExpiry: Story = {
  name: 'No Expiry Date',
  args: {
    discount: '5%',
    code: 'LOYAL5',
    minAmount: "Any order",
    categories: ['All categories'],
    color: 'blue',
  },
};

// ─── Minimal (discount + code only) ──────────────────────────────────────────

export const Minimal: Story = {
  name: 'Minimal (discount + code)',
  args: {
    discount: '30%',
    code: 'FLASH30',
    color: 'red',
  },
};

// ─── As Link ─────────────────────────────────────────────────────────────────

export const AsLink: Story = {
  name: 'As Link (href)',
  args: {
    discount: '15%',
    code: 'LINK15',
    minAmount: "Orders over 500,000 so'm",
    expiryDate: '01 May 2026',
    color: 'orange',
    href: '#coupon-detail',
    target: '_blank',
  },
};

// ─── Many Categories ─────────────────────────────────────────────────────────

export const ManyCategories: Story = {
  name: 'Edge: Many Categories',
  args: {
    discount: '20%',
    code: 'MULTI20',
    minAmount: "Orders over 300,000 so'm",
    categories: ['Laptops', 'Keyboards', 'Monitors', 'Accessories', 'Audio', 'Storage'],
    expiryDate: '01 May 2026',
    color: 'blue',
  },
};

// ─── Interactive (apply toggle) ──────────────────────────────────────────────

export const Interactive: Story = {
  name: 'Interactive (apply toggle)',
  render: () => {
    const [applied, setApplied] = useState(false);
    return (
      <DesktopCouponCard
        discount="50,000 so'm"
        code="GEEK50K"
        minAmount="Orders over 500,000 so'm"
        categories={['Electronics', 'Gadgets']}
        expiryDate="31 Mar 2026"
        color="orange"
        applied={applied}
        onApply={() => setApplied(true)}
      />
    );
  },
};

// ─── Coupon Grid (4 stacked) ─────────────────────────────────────────────────

export const CouponGrid: Story = {
  name: 'Coupon Grid (4 stacked)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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
      <DesktopCouponCard
        discount="20%"
        code="MULTI20"
        minAmount="Orders over 300,000 so'm"
        categories={['Laptops', 'Monitors']}
        expiryDate="01 May 2026"
        color="blue"
      />
    </div>
  ),
};
