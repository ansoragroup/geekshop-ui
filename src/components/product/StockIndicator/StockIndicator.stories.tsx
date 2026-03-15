import type { Meta, StoryObj } from '@storybook/react-vite';
import { StockIndicator } from './StockIndicator';

const meta = {
  title: 'Product/StockIndicator',
  component: StockIndicator,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'GeekShop Light' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 390, margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StockIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    total: 100,
    sold: 85,
    variant: 'bar',
  },
};

export const LowStock: Story = {
  args: {
    total: 20,
    sold: 17,
    variant: 'bar',
    urgencyThreshold: 5,
  },
};

export const AlmostSoldOut: Story = {
  args: {
    total: 50,
    sold: 49,
    variant: 'bar',
    urgencyThreshold: 5,
  },
};

export const TextVariant: Story = {
  args: {
    total: 30,
    sold: 27,
    variant: 'text',
  },
};

export const TextNotUrgent: Story = {
  args: {
    total: 100,
    sold: 50,
    variant: 'text',
  },
};

export const BadgeVariant: Story = {
  args: {
    total: 15,
    sold: 12,
    variant: 'badge',
  },
};

export const BadgeSoldOut: Story = {
  args: {
    total: 10,
    sold: 10,
    variant: 'badge',
  },
};

export const AllVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
    <div>
      <h4 style={{ marginBottom: 8 }}>Bar - 85% sold</h4>
      <StockIndicator total={100} sold={85} variant="bar" />
    </div>
    <div>
      <h4 style={{ marginBottom: 8 }}>Bar - Only 3 left (urgent)</h4>
      <StockIndicator total={20} sold={17} variant="bar" />
    </div>
    <div>
      <h4 style={{ marginBottom: 8 }}>Text - Urgent</h4>
      <StockIndicator total={30} sold={28} variant="text" />
    </div>
    <div>
      <h4 style={{ marginBottom: 8 }}>Text - Normal</h4>
      <StockIndicator total={100} sold={40} variant="text" />
    </div>
    <div style={{ display: 'flex', gap: 8 }}>
      <StockIndicator total={15} sold={12} variant="badge" />
      <StockIndicator total={10} sold={10} variant="badge" />
    </div>
  </div>
);
