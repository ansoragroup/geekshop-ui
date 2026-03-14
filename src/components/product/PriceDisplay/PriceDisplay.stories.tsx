import type { Meta, StoryObj } from '@storybook/react-vite';
import { PriceDisplay } from './PriceDisplay';

const meta = {
  title: 'Product/PriceDisplay',
  component: PriceDisplay,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'sale', 'range'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    color: { control: 'color' },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 16, background: '#fff', borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PriceDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Default ---
export const Default: Story = {
  args: {
    price: 5_200_000,
    variant: 'default',
    size: 'md',
  },
};

// --- Sale with original price ---
export const Sale: Story = {
  args: {
    price: 4_890_000,
    originalPrice: 5_200_000,
    variant: 'sale',
    size: 'md',
  },
};

// --- Range ---
export const Range: Story = {
  args: {
    price: 0,
    minPrice: 3_500_000,
    maxPrice: 7_800_000,
    variant: 'range',
    size: 'md',
  },
};

// --- Sizes ---
export const Small: Story = {
  args: { price: 1_290_000, size: 'sm' },
};

export const Medium: Story = {
  args: { price: 2_450_000, size: 'md' },
};

export const Large: Story = {
  args: { price: 5_200_000, size: 'lg' },
};

export const ExtraLarge: Story = {
  args: { price: 12_500_000, size: 'xl' },
};

// --- All sizes side by side ---
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <PriceDisplay price={5_200_000} size="sm" />
      <PriceDisplay price={5_200_000} size="md" />
      <PriceDisplay price={5_200_000} size="lg" />
      <PriceDisplay price={5_200_000} size="xl" />
    </div>
  ),
};

// --- Without currency ---
export const NoCurrency: Story = {
  args: {
    price: 3_750_000,
    showCurrency: false,
    size: 'lg',
  },
};

// --- Custom colour ---
export const CustomColor: Story = {
  args: {
    price: 8_900_000,
    size: 'lg',
    color: '#FF5000',
  },
};

// --- GPU price example ---
export const GPUPrice: Story = {
  name: 'RTX 4060 Price',
  args: {
    price: 5_200_000,
    originalPrice: 5_800_000,
    variant: 'sale',
    size: 'lg',
  },
};
