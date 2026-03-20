import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopDealCard } from './DesktopDealCard';

const meta = {
  title: 'Content (Desktop)/DesktopDealCard',
  component: DesktopDealCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    onClick: { action: 'clicked' },
    onBuy: { action: 'buy clicked' },
    soldPercent: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    discount: { control: { type: 'range', min: 1, max: 90, step: 1 } },
    rating: { control: { type: 'range', min: 0, max: 5, step: 0.5 } },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopDealCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    image: 'https://picsum.photos/seed/gpu-rtx4060/300/300',
    title: 'MSI GeForce RTX 4060 Ventus 2X 8GB GDDR6',
    price: 8_900_000,
    originalPrice: 12_000_000,
    discount: 26,
    rating: 4,
    reviewCount: 234,
    soldPercent: 68,
    endTime: new Date(Date.now() + 3_600_000 * 3),
  },
};

export const NoCountdown: Story = {
  args: {
    image: 'https://picsum.photos/seed/laptop-asus/300/300',
    title: 'ASUS ROG Strix G16 Gaming Laptop 16" RTX 4070',
    price: 15_200_000,
    originalPrice: 19_000_000,
    discount: 20,
    rating: 4.5,
    reviewCount: 87,
    soldPercent: 45,
  },
};

export const AlmostSoldOut: Story = {
  args: {
    image: 'https://picsum.photos/seed/headphones-sony/300/300',
    title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    price: 4_200_000,
    originalPrice: 5_500_000,
    discount: 24,
    rating: 5,
    reviewCount: 512,
    soldPercent: 95,
    endTime: new Date(Date.now() + 1_800_000),
  },
};

export const HighDiscount: Story = {
  args: {
    image: 'https://picsum.photos/seed/keyboard-mech/300/300',
    title: 'Keychron Q1 Pro Mechanical Keyboard',
    price: 1_250_000,
    originalPrice: 2_500_000,
    discount: 50,
    rating: 4,
    reviewCount: 156,
    soldPercent: 78,
    endTime: new Date(Date.now() + 7_200_000),
  },
};

export const GridLayout: Story = {
  name: 'Grid (2 cards stacked)',
  decorators: [
    (Story) => (
      <div style={{ width: 600, padding: 24, background: '#f5f5f5', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <DesktopDealCard
        image="https://picsum.photos/seed/deal-gpu/300/300"
        title="MSI GeForce RTX 4060 Ventus 2X 8GB GDDR6"
        price={8_900_000}
        originalPrice={12_000_000}
        discount={26}
        rating={4}
        reviewCount={234}
        soldPercent={68}
        endTime={new Date(Date.now() + 3_600_000 * 3)}
      />
      <DesktopDealCard
        image="https://picsum.photos/seed/deal-laptop/300/300"
        title="ASUS ROG Strix G16 Gaming Laptop 16 inch RTX 4070"
        price={15_200_000}
        originalPrice={19_000_000}
        discount={20}
        rating={4.5}
        reviewCount={87}
        soldPercent={45}
      />
    </>
  ),
};
