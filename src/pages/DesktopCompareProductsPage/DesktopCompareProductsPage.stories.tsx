import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopCompareProductsPage } from './DesktopCompareProductsPage';

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
      { id: 'gpu1', name: 'MSI RTX 4060 Ventus 2X 8GB', image: 'https://picsum.photos/seed/cmp2-gpu1/300/300', price: 5200000 },
      { id: 'gpu2', name: 'ASUS Dual RTX 4060 OC 8GB', image: 'https://picsum.photos/seed/cmp2-gpu2/300/300', price: 4800000 },
    ],
  },
};

export const Empty: Story = {
  name: 'No Products',
  args: {
    compareProducts: [],
  },
};
