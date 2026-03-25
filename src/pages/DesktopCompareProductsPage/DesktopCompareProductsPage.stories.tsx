import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopCompareProductsPage } from './DesktopCompareProductsPage';
import type { DesktopComparisonProduct } from '../../components';

const meta = {
  title: 'Pages (Desktop)/DesktopCompareProductsPage',
  component: DesktopCompareProductsPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopCompareProductsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TwoProducts: Story = {
  name: 'Two Products',
  args: {
    compareProducts: [
      { id: 'gpu1', name: 'MSI RTX 4060 Ventus 2X 8GB', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop', price: 5200000 },
      { id: 'gpu2', name: 'ASUS Dual RTX 4060 OC 8GB', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop', price: 4800000 },
    ] satisfies DesktopComparisonProduct[],
  },
};

export const Empty: Story = {
  name: 'No Products',
  args: {
    compareProducts: [],
  },
};

export const SingleProduct: Story = {
  name: 'Single Product',
  args: {
    compareProducts: [
      { id: 'gpu1', name: 'Gigabyte RTX 4060 Eagle OC 8GB GDDR6', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop', price: 4500000 },
    ] satisfies DesktopComparisonProduct[],
  },
};

export const SamePriceRange: Story = {
  name: 'Same Price Range GPUs',
  args: {
    compareProducts: [
      { id: 'gpu1', name: 'MSI RTX 4060 Ventus 2X 8GB', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop', price: 5200000 },
      { id: 'gpu2', name: 'ASUS Dual RTX 4060 OC 8GB', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop', price: 4800000 },
      { id: 'gpu3', name: 'Gigabyte RTX 4060 Eagle OC 8GB', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop', price: 4500000 },
    ] satisfies DesktopComparisonProduct[],
  },
};

export const DifferentBudgets: Story = {
  name: 'Wide Price Spread',
  args: {
    compareProducts: [
      { id: 'gpu1', name: 'MSI RTX 4090 Suprim X 24GB', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop', price: 22000000 },
      { id: 'gpu2', name: 'MSI RTX 4070 Super Gaming X 12GB', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop', price: 8900000 },
      { id: 'gpu3', name: 'ASUS Dual RTX 4060 OC 8GB', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop', price: 4800000 },
    ] satisfies DesktopComparisonProduct[],
  },
};
