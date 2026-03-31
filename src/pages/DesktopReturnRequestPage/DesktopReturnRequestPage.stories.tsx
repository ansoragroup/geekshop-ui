import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopReturnRequestPage } from './DesktopReturnRequestPage';

const meta = {
  title: 'Pages (Desktop)/DesktopReturnRequestPage',
  component: DesktopReturnRequestPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopReturnRequestPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Defective: Story = {
  name: 'Defective Item',
  args: {
    orderId: 'GS-2024-9012',
    initialReason: 'defective',
    initialDescription:
      'The monitor arrived with dead pixels in the lower-right corner. There are approximately 3-4 stuck pixels visible on white backgrounds.',
    item: {
      id: '1',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=160&h=160&fit=crop',
      name: 'ASUS ROG Strix G16 Gaming Laptop (2024)',
      price: 15_500_000,
      maxQuantity: 1,
    },
  },
};

export const StoreCredit: Story = {
  name: 'Store Credit Refund',
  args: {
    orderId: 'GS-2024-7890',
    initialReason: 'changed-mind',
    initialRefundMethod: 'store-credit',
    item: {
      id: '1',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=160&h=160&fit=crop',
      name: 'Sony WH-1000XM5 Wireless Headphones',
      price: 3_200_000,
      maxQuantity: 2,
    },
  },
};

export const WrongItem: Story = {
  name: 'Wrong Item Received',
  args: {
    orderId: 'GS-2024-4567',
    initialReason: 'wrong-item',
    initialDescription:
      'I ordered the black version but received the silver one. The packaging had the correct label but the product inside was wrong.',
    item: {
      id: '1',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=160&h=160&fit=crop',
      name: 'Samsung Galaxy S24 Ultra 256GB (Titanium Black)',
      price: 12_500_000,
      maxQuantity: 1,
    },
  },
};

export const NotAsDescribed: Story = {
  args: {
    orderId: 'GS-2024-3333',
    initialReason: 'not-as-described',
    initialDescription:
      'The listing said 2TB storage but the product only has 1TB. The model number also does not match what was advertised.',
    item: {
      id: '1',
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=160&h=160&fit=crop',
      name: 'Samsung 990 Pro NVMe SSD',
      price: 2_400_000,
      maxQuantity: 3,
    },
  },
};

export const HighValueReturn: Story = {
  args: {
    orderId: 'GS-2024-1001',
    initialReason: 'defective',
    initialDescription:
      'The laptop screen has a visible dark spot in the center. Battery only lasts 2 hours instead of the advertised 18 hours.',
    initialRefundMethod: 'original',
    item: {
      id: '1',
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=160&h=160&fit=crop',
      name: 'Apple MacBook Pro 16" M3 Max 36GB 1TB',
      price: 42_000_000,
      maxQuantity: 1,
    },
  },
};
