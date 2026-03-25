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
  argTypes: {
    variant: { control: 'select', options: ['bar', 'text', 'badge'] },
    showCount: { control: 'boolean' },
    urgencyThreshold: { control: { type: 'range', min: 1, max: 20, step: 1 } },
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

// ─── Default (bar, 85% sold) ─────────────────────────────────────────────────

export const Default: Story = {
  args: {
    total: 100,
    sold: 85,
    variant: 'bar',
  },
};

// ─── Full Featured ───────────────────────────────────────────────────────────

export const FullFeatured: Story = {
  name: 'Full Featured (all props)',
  args: {
    total: 50,
    sold: 47,
    variant: 'bar',
    showCount: true,
    urgencyThreshold: 5,
  },
};

// ─── Bar: Normal Stock ───────────────────────────────────────────────────────

export const BarNormal: Story = {
  name: 'Bar: Normal Stock (50%)',
  args: {
    total: 100,
    sold: 50,
    variant: 'bar',
  },
};

// ─── Bar: Low Stock ──────────────────────────────────────────────────────────

export const BarLowStock: Story = {
  name: 'Bar: Low Stock (3 left)',
  args: {
    total: 20,
    sold: 17,
    variant: 'bar',
    urgencyThreshold: 5,
  },
};

// ─── Bar: Almost Sold Out ────────────────────────────────────────────────────

export const BarAlmostSoldOut: Story = {
  name: 'Bar: Almost Sold Out (1 left)',
  args: {
    total: 50,
    sold: 49,
    variant: 'bar',
    urgencyThreshold: 5,
  },
};

// ─── Bar: Sold Out ───────────────────────────────────────────────────────────

export const BarSoldOut: Story = {
  name: 'Bar: Sold Out',
  args: {
    total: 30,
    sold: 30,
    variant: 'bar',
  },
};

// ─── Bar: No Count ───────────────────────────────────────────────────────────

export const BarNoCount: Story = {
  name: 'Bar: Without Count Text',
  args: {
    total: 100,
    sold: 70,
    variant: 'bar',
    showCount: false,
  },
};

// ─── Bar: Just Started ───────────────────────────────────────────────────────

export const BarJustStarted: Story = {
  name: 'Bar: Just Started (5% sold)',
  args: {
    total: 100,
    sold: 5,
    variant: 'bar',
  },
};

// ─── Text: Normal ────────────────────────────────────────────────────────────

export const TextNormal: Story = {
  name: 'Text: Normal Stock',
  args: {
    total: 100,
    sold: 50,
    variant: 'text',
  },
};

// ─── Text: Urgent ────────────────────────────────────────────────────────────

export const TextUrgent: Story = {
  name: 'Text: Urgent (2 left)',
  args: {
    total: 30,
    sold: 28,
    variant: 'text',
    urgencyThreshold: 5,
  },
};

// ─── Text: Sold Out ──────────────────────────────────────────────────────────

export const TextSoldOut: Story = {
  name: 'Text: Sold Out',
  args: {
    total: 10,
    sold: 10,
    variant: 'text',
  },
};

// ─── Badge: Low Stock ────────────────────────────────────────────────────────

export const BadgeLowStock: Story = {
  name: 'Badge: Low Stock',
  args: {
    total: 15,
    sold: 12,
    variant: 'badge',
    urgencyThreshold: 5,
  },
};

// ─── Badge: Sold Out ─────────────────────────────────────────────────────────

export const BadgeSoldOut: Story = {
  name: 'Badge: Sold Out',
  args: {
    total: 10,
    sold: 10,
    variant: 'badge',
  },
};

// ─── Custom Urgency Threshold ────────────────────────────────────────────────

export const CustomThreshold: Story = {
  name: 'Custom Urgency Threshold (10)',
  args: {
    total: 50,
    sold: 42,
    variant: 'bar',
    urgencyThreshold: 10,
  },
};

// ─── Large Stock Numbers ─────────────────────────────────────────────────────

export const LargeNumbers: Story = {
  name: 'Edge: Large Numbers',
  args: {
    total: 10000,
    sold: 9500,
    variant: 'bar',
    urgencyThreshold: 500,
  },
};

// ─── All Variants Comparison ─────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants Comparison',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h4 style={{ marginBottom: 8, fontSize: 14, fontWeight: 600 }}>Bar - 85% sold</h4>
        <StockIndicator total={100} sold={85} variant="bar" />
      </div>
      <div>
        <h4 style={{ marginBottom: 8, fontSize: 14, fontWeight: 600 }}>Bar - Only 3 left (urgent)</h4>
        <StockIndicator total={20} sold={17} variant="bar" />
      </div>
      <div>
        <h4 style={{ marginBottom: 8, fontSize: 14, fontWeight: 600 }}>Bar - Sold out</h4>
        <StockIndicator total={30} sold={30} variant="bar" />
      </div>
      <div>
        <h4 style={{ marginBottom: 8, fontSize: 14, fontWeight: 600 }}>Text - Urgent</h4>
        <StockIndicator total={30} sold={28} variant="text" />
      </div>
      <div>
        <h4 style={{ marginBottom: 8, fontSize: 14, fontWeight: 600 }}>Text - Normal</h4>
        <StockIndicator total={100} sold={40} variant="text" />
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <StockIndicator total={15} sold={12} variant="badge" />
        <StockIndicator total={10} sold={10} variant="badge" />
      </div>
    </div>
  ),
};
