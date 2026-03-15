import type { Meta, StoryObj } from '@storybook/react-vite';
import { OrderStatusBar, DEFAULT_ORDER_STATUSES } from './OrderStatusBar';

const meta = {
  title: 'Data Display/OrderStatusBar',
  component: OrderStatusBar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 16, background: '#F5F5F5', borderRadius: 12, width: 390 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OrderStatusBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Default (no counts) ---
export const Default: Story = {
  args: {
    statuses: DEFAULT_ORDER_STATUSES,
    onTap: (i: number) => alert(`Tapped status ${i}`),
  },
};

// --- With counts ---
export const WithCounts: Story = {
  args: {
    statuses: DEFAULT_ORDER_STATUSES.map((s, i) => ({
      ...s,
      count: [2, 1, 3, 5, 0][i],
    })),
    onTap: (i: number) => alert(`Tapped status ${i}`),
  },
};

// --- High counts (99+) ---
export const HighCounts: Story = {
  args: {
    statuses: DEFAULT_ORDER_STATUSES.map((s, i) => ({
      ...s,
      count: [0, 0, 150, 99, 0][i],
    })),
  },
};

// --- Profile page context ---
export const InProfilePage: Story = {
  name: 'Profile Page Context',
  render: () => (
    <div style={{ background: '#F5F5F5', borderRadius: 12, overflow: 'hidden' }}>
      {/* Profile header */}
      <div style={{
        background: 'linear-gradient(180deg, #FF5000 0%, #FF8A56 100%)',
        padding: '24px 16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <div style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: 20,
          fontWeight: 600,
        }}>
          SU
        </div>
        <div>
          <div style={{ color: '#fff', fontSize: 18, fontWeight: 600 }}>Sardor Usmonov</div>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>+998 90 123 45 67</div>
        </div>
      </div>

      {/* Section title */}
      <div style={{ padding: '16px 16px 8px', fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>
        Mening buyurtmalarim
      </div>

      {/* Order status bar */}
      <div style={{ padding: '0 16px 16px' }}>
        <OrderStatusBar
          statuses={DEFAULT_ORDER_STATUSES.map((s, i) => ({
            ...s,
            count: [2, 1, 3, 5, 0][i],
          }))}
        />
      </div>
    </div>
  ),
};
