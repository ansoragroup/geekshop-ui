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
  name: 'Default',
  args: {},
};

export const WithPhotos: Story = {
  name: 'With Photos',
  args: {
    orderId: 'GS-2024-9012',
    initialReason: 'defective',
    initialDescription: 'The monitor arrived with dead pixels in the lower-right corner. There are approximately 3-4 stuck pixels visible on white backgrounds.',
    item: {
      id: '1',
      image: 'https://picsum.photos/seed/ret-laptop/160/160',
      name: 'ASUS ROG Strix G16 Gaming Laptop (2024)',
      price: 15_500_000,
      maxQuantity: 1,
    },
  },
};

export const StoreCredit: Story = {
  name: 'Store Credit',
  args: {
    orderId: 'GS-2024-7890',
    initialReason: 'changed-mind',
    initialRefundMethod: 'store-credit',
    item: {
      id: '1',
      image: 'https://picsum.photos/seed/ret-headset/160/160',
      name: 'Sony WH-1000XM5 Wireless Headphones',
      price: 3_200_000,
      maxQuantity: 2,
    },
  },
};
