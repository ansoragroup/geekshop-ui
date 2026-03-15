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

export const Default: Story = {
  args: {
    totalPrice: 5_000_000,
    months: 12,
    interestFree: true,
  },
};

export const ThreeMonths: Story = {
  args: {
    totalPrice: 2_400_000,
    months: 3,
    interestFree: true,
  },
};

export const SixMonths: Story = {
  args: {
    totalPrice: 3_600_000,
    months: 6,
    interestFree: false,
  },
};

export const WithInterest: Story = {
  args: {
    totalPrice: 12_000_000,
    months: 12,
    interestFree: false,
  },
};

export const AllVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
    <InstallmentDisplay totalPrice={2_400_000} months={3} interestFree />
    <InstallmentDisplay totalPrice={3_600_000} months={6} interestFree />
    <InstallmentDisplay totalPrice={5_000_000} months={12} interestFree />
    <InstallmentDisplay totalPrice={12_000_000} months={12} />
  </div>
);

export const InProductContext = () => (
  <div style={{ padding: 16, background: '#fff', borderRadius: 12, border: '1px solid #eee' }}>
    <h3 style={{ margin: '0 0 4px', fontSize: 16 }}>NVIDIA RTX 4070 Ti Super</h3>
    <p style={{ margin: '0 0 12px', fontSize: 24, fontWeight: 700, color: '#FF0000' }}>
      5 999 000 so&apos;m
    </p>
    <InstallmentDisplay totalPrice={5_999_000} months={12} interestFree />
  </div>
);
