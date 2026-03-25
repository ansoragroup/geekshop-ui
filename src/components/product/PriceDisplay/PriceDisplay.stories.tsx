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
    showCurrency: { control: 'boolean' },
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

// ─── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    price: 5_200_000,
    variant: 'default',
    size: 'md',
  },
};

// ─── Full Featured ───────────────────────────────────────────────────────────

export const FullFeatured: Story = {
  name: 'Full Featured (sale + xl + color)',
  args: {
    price: 8_900_000,
    originalPrice: 12_000_000,
    variant: 'sale',
    size: 'xl',
    showCurrency: true,
    color: '#FF0000',
  },
};

// ─── Variant: Sale ───────────────────────────────────────────────────────────

export const Sale: Story = {
  args: {
    price: 4_890_000,
    originalPrice: 5_200_000,
    variant: 'sale',
    size: 'md',
  },
};

// ─── Variant: Range ──────────────────────────────────────────────────────────

export const Range: Story = {
  args: {
    price: 0,
    minPrice: 3_500_000,
    maxPrice: 7_800_000,
    variant: 'range',
    size: 'md',
  },
};

// ─── Size: Small ─────────────────────────────────────────────────────────────

export const Small: Story = {
  args: { price: 1_290_000, size: 'sm' },
};

// ─── Size: Medium ────────────────────────────────────────────────────────────

export const Medium: Story = {
  args: { price: 2_450_000, size: 'md' },
};

// ─── Size: Large ─────────────────────────────────────────────────────────────

export const Large: Story = {
  args: { price: 5_200_000, size: 'lg' },
};

// ─── Size: Extra Large ───────────────────────────────────────────────────────

export const ExtraLarge: Story = {
  args: { price: 12_500_000, size: 'xl' },
};

// ─── All Sizes ───────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  name: 'All Sizes Comparison',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ width: 40, fontSize: 12, color: '#999' }}>sm</span>
        <PriceDisplay price={5_200_000} size="sm" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ width: 40, fontSize: 12, color: '#999' }}>md</span>
        <PriceDisplay price={5_200_000} size="md" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ width: 40, fontSize: 12, color: '#999' }}>lg</span>
        <PriceDisplay price={5_200_000} size="lg" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ width: 40, fontSize: 12, color: '#999' }}>xl</span>
        <PriceDisplay price={5_200_000} size="xl" />
      </div>
    </div>
  ),
};

// ─── All Variants ────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants Comparison',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <span style={{ fontSize: 12, color: '#999', display: 'block', marginBottom: 4 }}>Default</span>
        <PriceDisplay price={5_200_000} variant="default" size="lg" />
      </div>
      <div>
        <span style={{ fontSize: 12, color: '#999', display: 'block', marginBottom: 4 }}>Sale</span>
        <PriceDisplay price={4_890_000} originalPrice={5_200_000} variant="sale" size="lg" />
      </div>
      <div>
        <span style={{ fontSize: 12, color: '#999', display: 'block', marginBottom: 4 }}>Range</span>
        <PriceDisplay price={0} minPrice={3_500_000} maxPrice={7_800_000} variant="range" size="lg" />
      </div>
    </div>
  ),
};

// ─── Without Currency ────────────────────────────────────────────────────────

export const NoCurrency: Story = {
  args: {
    price: 3_750_000,
    showCurrency: false,
    size: 'lg',
  },
};

// ─── Custom Color ────────────────────────────────────────────────────────────

export const CustomColor: Story = {
  args: {
    price: 8_900_000,
    size: 'lg',
    color: '#FF5000',
  },
};

// ─── Custom Currency Label ───────────────────────────────────────────────────

export const CustomCurrency: Story = {
  name: 'Custom Currency (USD)',
  args: {
    price: 89.99,
    originalPrice: 129.99,
    variant: 'sale',
    size: 'lg',
    currency: '$',
  },
};

// ─── Large Sale Price ────────────────────────────────────────────────────────

export const LargeSalePrice: Story = {
  name: 'RTX 4090 Sale Price',
  args: {
    price: 28_500_000,
    originalPrice: 32_000_000,
    variant: 'sale',
    size: 'xl',
  },
};

// ─── Small Price ─────────────────────────────────────────────────────────────

export const SmallPrice: Story = {
  name: 'Edge: Very Small Price',
  args: {
    price: 5_000,
    size: 'md',
  },
};

// ─── Large Price ─────────────────────────────────────────────────────────────

export const LargePrice: Story = {
  name: 'Edge: Very Large Price',
  args: {
    price: 150_000_000,
    size: 'lg',
  },
};

// ─── Wide Range ──────────────────────────────────────────────────────────────

export const WideRange: Story = {
  name: 'Edge: Wide Price Range',
  args: {
    price: 0,
    minPrice: 500_000,
    maxPrice: 42_990_000,
    variant: 'range',
    size: 'lg',
  },
};
