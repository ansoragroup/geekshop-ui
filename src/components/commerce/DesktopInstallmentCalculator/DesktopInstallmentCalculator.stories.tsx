import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopInstallmentCalculator } from './DesktopInstallmentCalculator';

const meta = {
  title: 'Commerce/DesktopInstallmentCalculator',
  component: DesktopInstallmentCalculator,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    onChange: { action: 'plan selected' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 420, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopInstallmentCalculator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    price: 8_900_000,
    options: [
      { months: 3, rate: 0 },
      { months: 6, rate: 0 },
      { months: 12, rate: 5 },
    ],
  },
};

export const ExpensiveProduct: Story = {
  name: 'Qimmat mahsulot (iPhone 15 Pro Max)',
  args: {
    price: 18_990_000,
    options: [
      { months: 3, rate: 0 },
      { months: 6, rate: 0 },
      { months: 12, rate: 3 },
      { months: 24, rate: 8 },
    ],
  },
};

export const AllZeroPercent: Story = {
  name: '0% ustama barcha muddatlar',
  args: {
    price: 2_500_000,
    options: [
      { months: 3, rate: 0 },
      { months: 6, rate: 0 },
      { months: 12, rate: 0 },
    ],
  },
};

export const WithMinPayment: Story = {
  name: 'Minimal oylik to\'lov bilan',
  args: {
    price: 45_000_000,
    options: [
      { months: 6, rate: 0, minPayment: 7_500_000 },
      { months: 12, rate: 2, minPayment: 3_825_000 },
      { months: 24, rate: 5, minPayment: 1_968_750 },
    ],
  },
};
