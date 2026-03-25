import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopInstallmentCalculator } from './DesktopInstallmentCalculator';

const meta = {
  title: 'Commerce (Desktop)/DesktopInstallmentCalculator',
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

/** Default: mid-range product with 3/6/12 month options. */
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

/** Expensive product (iPhone 15 Pro Max): 3/6/12/24 month options. */
export const ExpensiveProduct: Story = {
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

/** All options at 0% interest. */
export const AllZeroPercent: Story = {
  args: {
    price: 2_500_000,
    options: [
      { months: 3, rate: 0 },
      { months: 6, rate: 0 },
      { months: 12, rate: 0 },
    ],
  },
};

/** With minimum payment overrides. */
export const WithMinPayment: Story = {
  args: {
    price: 45_000_000,
    options: [
      { months: 6, rate: 0, minPayment: 7_500_000 },
      { months: 12, rate: 2, minPayment: 3_825_000 },
      { months: 24, rate: 5, minPayment: 1_968_750 },
    ],
  },
};

/** Cheap product with 2 short-term options. */
export const CheapProduct: Story = {
  args: {
    price: 450_000,
    options: [
      { months: 3, rate: 0 },
      { months: 6, rate: 0 },
    ],
  },
};

/** Long-term only: 12 and 24 month options. */
export const LongTermOnly: Story = {
  args: {
    price: 28_900_000,
    options: [
      { months: 12, rate: 2 },
      { months: 24, rate: 5 },
    ],
  },
};

/** Single option available. */
export const SingleOption: Story = {
  args: {
    price: 5_600_000,
    options: [{ months: 6, rate: 0 }],
  },
};

/** Many options (5 plans). */
export const ManyOptions: Story = {
  args: {
    price: 32_000_000,
    options: [
      { months: 3, rate: 0 },
      { months: 6, rate: 0 },
      { months: 9, rate: 2 },
      { months: 12, rate: 3 },
      { months: 24, rate: 7 },
    ],
  },
};

/** All options with interest (no 0% markup). */
export const AllWithInterest: Story = {
  args: {
    price: 15_000_000,
    options: [
      { months: 6, rate: 3 },
      { months: 12, rate: 5 },
      { months: 24, rate: 10 },
    ],
  },
};

/** Default selection override (start on 12 months). */
export const DefaultMonthsOverride: Story = {
  args: {
    price: 12_500_000,
    options: [
      { months: 3, rate: 0 },
      { months: 6, rate: 0 },
      { months: 12, rate: 3 },
    ],
    defaultMonths: 12,
  },
};

/** Custom labels for Russian locale. */
export const RussianLabels: Story = {
  args: {
    price: 8_900_000,
    options: [
      { months: 3, rate: 0 },
      { months: 6, rate: 0 },
      { months: 12, rate: 5 },
    ],
    labels: {
      title: 'Рассрочка',
      zeroBadge: '0% наценка',
      monthSuffix: 'мес',
      monthlyPayment: 'Ежемесячный платеж',
      totalAmount: 'Общая сумма',
      markup: 'Наценка',
      acceptedPayments: 'Принимаем:',
    },
  },
};

/** Custom labels for Uzbek locale. */
export const UzbekLabels: Story = {
  args: {
    price: 8_900_000,
    options: [
      { months: 3, rate: 0 },
      { months: 6, rate: 0 },
      { months: 12, rate: 5 },
    ],
    labels: {
      title: "Bo'lib to'lash",
      zeroBadge: '0% ustama',
      monthSuffix: 'oy',
      monthlyPayment: "Oylik to'lov",
      totalAmount: 'Umumiy summa',
      markup: 'Ustama',
      acceptedPayments: 'Qabul qilinadi:',
    },
  },
};
