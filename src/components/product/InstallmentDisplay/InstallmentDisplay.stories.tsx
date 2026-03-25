import type { Meta, StoryObj } from '@storybook/react-vite';
import { InstallmentDisplay } from './InstallmentDisplay';

const meta = {
  title: 'Product/InstallmentDisplay',
  component: InstallmentDisplay,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'GeekShop Light' },
  },
  argTypes: {
    months: { control: { type: 'select' }, options: [3, 6, 12, 18, 24] },
    interestFree: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 390, margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InstallmentDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    totalPrice: 5_000_000,
    months: 12,
    interestFree: true,
  },
};

// ─── Full Featured ───────────────────────────────────────────────────────────

export const FullFeatured: Story = {
  name: 'Full Featured (interest-free, 12 months)',
  args: {
    totalPrice: 22_900_000,
    months: 12,
    interestFree: true,
  },
};

// ─── 3 Months ────────────────────────────────────────────────────────────────

export const ThreeMonths: Story = {
  args: {
    totalPrice: 2_400_000,
    months: 3,
    interestFree: true,
  },
};

// ─── 6 Months ────────────────────────────────────────────────────────────────

export const SixMonths: Story = {
  args: {
    totalPrice: 3_600_000,
    months: 6,
    interestFree: false,
  },
};

// ─── 12 Months ───────────────────────────────────────────────────────────────

export const TwelveMonths: Story = {
  args: {
    totalPrice: 8_900_000,
    months: 12,
    interestFree: true,
  },
};

// ─── 18 Months ───────────────────────────────────────────────────────────────

export const EighteenMonths: Story = {
  args: {
    totalPrice: 15_200_000,
    months: 18,
    interestFree: false,
  },
};

// ─── 24 Months ───────────────────────────────────────────────────────────────

export const TwentyFourMonths: Story = {
  args: {
    totalPrice: 28_500_000,
    months: 24,
    interestFree: false,
  },
};

// ─── With Interest ───────────────────────────────────────────────────────────

export const WithInterest: Story = {
  args: {
    totalPrice: 12_000_000,
    months: 12,
    interestFree: false,
  },
};

// ─── Cheap Product ───────────────────────────────────────────────────────────

export const CheapProduct: Story = {
  name: 'Edge: Low Price Product',
  args: {
    totalPrice: 450_000,
    months: 3,
    interestFree: true,
  },
};

// ─── Expensive Product ───────────────────────────────────────────────────────

export const ExpensiveProduct: Story = {
  name: 'Edge: Expensive Product',
  args: {
    totalPrice: 42_990_000,
    months: 24,
    interestFree: false,
  },
};

// ─── All Month Variants ──────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Month Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <InstallmentDisplay totalPrice={2_400_000} months={3} interestFree />
      <InstallmentDisplay totalPrice={3_600_000} months={6} interestFree />
      <InstallmentDisplay totalPrice={5_000_000} months={12} interestFree />
      <InstallmentDisplay totalPrice={12_000_000} months={18} />
      <InstallmentDisplay totalPrice={22_900_000} months={24} />
    </div>
  ),
};

// ─── In Product Card Context ─────────────────────────────────────────────────

export const InProductContext: Story = {
  name: 'In Product Card Context',
  render: () => (
    <div style={{ padding: 16, background: '#fff', borderRadius: 12, border: '1px solid #eee' }}>
      <h3 style={{ margin: '0 0 4px', fontSize: 16 }}>NVIDIA GeForce RTX 4070 Ti Super</h3>
      <p style={{ margin: '0 0 12px', fontSize: 24, fontWeight: 700, color: '#FF0000' }}>
        8,900,000 so&apos;m
      </p>
      <InstallmentDisplay totalPrice={8_900_000} months={12} interestFree />
    </div>
  ),
};
