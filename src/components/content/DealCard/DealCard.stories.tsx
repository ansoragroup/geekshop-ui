import type { Meta, StoryObj } from '@storybook/react-vite';
import { DealCard } from './DealCard';

const meta = {
  title: 'Content/DealCard',
  component: DealCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '12px', background: '#F5F5F5' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    onClick: { action: 'clicked' },
    soldPercent: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
} satisfies Meta<typeof DealCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    image: 'https://picsum.photos/seed/gpu-rtx4070/300/300',
    title: 'RTX 4070 Ti Super',
    price: 8500000,
    originalPrice: 13000000,
    discount: 35,
    soldPercent: 67,
  },
};

export const AlmostSoldOut: Story = {
  args: {
    image: 'https://picsum.photos/seed/laptop-deal/300/300',
    title: 'ASUS ROG Strix G16',
    price: 15200000,
    originalPrice: 19000000,
    discount: 20,
    soldPercent: 92,
  },
};

export const LowDiscount: Story = {
  args: {
    image: 'https://picsum.photos/seed/mouse-deal/300/300',
    title: 'Logitech G Pro X',
    price: 850000,
    originalPrice: 1000000,
    discount: 15,
    soldPercent: 34,
  },
};

export const NoProgress: Story = {
  args: {
    image: 'https://picsum.photos/seed/ssd-deal/300/300',
    title: 'Samsung 990 Pro 2TB',
    price: 2800000,
    originalPrice: 3500000,
    discount: 20,
    soldPercent: 0,
  },
};

export const HorizontalScroll: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          width: '375px',
          padding: '12px',
          background: '#F5F5F5',
          overflowX: 'auto',
        }}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          <Story />
        </div>
      </div>
    ),
  ],
  render: () => (
    <>
      <DealCard
        image="https://picsum.photos/seed/deal1/300/300"
        title="RTX 4070 Ti Super"
        price={8500000}
        originalPrice={13000000}
        discount={35}
        soldPercent={67}
      />
      <DealCard
        image="https://picsum.photos/seed/deal2/300/300"
        title="ASUS ROG Strix G16"
        price={15200000}
        originalPrice={19000000}
        discount={20}
        soldPercent={92}
      />
      <DealCard
        image="https://picsum.photos/seed/deal3/300/300"
        title="Logitech G Pro X"
        price={850000}
        originalPrice={1000000}
        discount={15}
        soldPercent={34}
      />
      <DealCard
        image="https://picsum.photos/seed/deal4/300/300"
        title="Samsung 990 Pro 2TB"
        price={2800000}
        originalPrice={3500000}
        discount={20}
        soldPercent={55}
      />
    </>
  ),
};
