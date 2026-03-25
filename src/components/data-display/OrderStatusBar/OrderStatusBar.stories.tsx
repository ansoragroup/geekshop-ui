import { useState, useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { OrderStatusBar, DEFAULT_ORDER_STATUSES, type OrderStatusItem } from './OrderStatusBar';

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

// --- All Zero Counts ---
export const AllZeroCounts: Story = {
  name: 'All Zero Counts (No Badges)',
  args: {
    statuses: DEFAULT_ORDER_STATUSES.map((s) => ({
      ...s,
      count: 0,
    })),
  },
};

// --- All High Counts ---
export const AllHighCounts: Story = {
  name: 'All Statuses With 99+ Badges',
  args: {
    statuses: DEFAULT_ORDER_STATUSES.map((s) => ({
      ...s,
      count: 100 + Math.floor(Math.random() * 200),
    })),
  },
};

// --- Single Status Badge ---
export const SingleStatusBadge: Story = {
  name: 'Only One Status Has Badge',
  args: {
    statuses: DEFAULT_ORDER_STATUSES.map((s, i) => ({
      ...s,
      count: i === 2 ? 7 : 0,
    })),
  },
};

// --- Interactive: Tap Updates Count ---
export const InteractiveTapUpdates: Story = {
  name: 'Interactive: Tap Clears Badge',
  render: () => {
    const [counts, setCounts] = useState([3, 2, 5, 1, 4]);

    const handleTap = useCallback((index: number) => {
      setCounts((prev) => prev.map((c, i) => (i === index ? 0 : c)));
    }, []);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <OrderStatusBar
          statuses={DEFAULT_ORDER_STATUSES.map((s, i) => ({
            ...s,
            count: counts[i],
          }))}
          onTap={handleTap}
        />
        <div style={{ fontSize: 11, color: '#999', textAlign: 'center' }}>
          Tap a status icon to clear its badge count
        </div>
        <button
          type="button"
          onClick={() => setCounts([3, 2, 5, 1, 4])}
          style={{
            padding: '6px 12px',
            background: '#fff',
            border: '1px solid #ddd',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 12,
            alignSelf: 'center',
          }}
        >
          Reset Counts
        </button>
      </div>
    );
  },
};

// --- Custom Icons ---
export const CustomIcons: Story = {
  name: 'Custom Status Items',
  args: {
    statuses: [
      {
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
        ),
        label: 'Pending',
        count: 3,
      },
      {
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        ),
        label: 'Confirmed',
        count: 1,
      },
      {
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="15" height="13" rx="1" />
            <path d="M16 8h4l3 5v4h-7V8z" />
            <circle cx="5.5" cy="18.5" r="2.5" />
            <circle cx="18.5" cy="18.5" r="2.5" />
          </svg>
        ),
        label: 'Shipping',
        count: 8,
      },
    ] satisfies OrderStatusItem[],
  },
};

// --- Minimal: Three Statuses ---
export const ThreeStatuses: Story = {
  name: 'Three Statuses Only',
  args: {
    statuses: DEFAULT_ORDER_STATUSES.slice(0, 3).map((s, i) => ({
      ...s,
      count: [1, 0, 2][i],
    })),
  },
};

// --- Mixed Badge Values ---
export const MixedBadgeValues: Story = {
  name: 'Mixed Badge Values (1, 50, 99, 100, 0)',
  args: {
    statuses: DEFAULT_ORDER_STATUSES.map((s, i) => ({
      ...s,
      count: [1, 50, 99, 100, 0][i],
    })),
  },
};

// --- New User (Empty Orders) ---
export const NewUserEmpty: Story = {
  name: 'New User: No Orders Yet',
  render: () => (
    <div style={{ background: '#fff', borderRadius: 12, padding: 16 }}>
      <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A', marginBottom: 12 }}>
        My Orders
      </div>
      <OrderStatusBar
        statuses={DEFAULT_ORDER_STATUSES.map((s) => ({
          ...s,
          count: 0,
        }))}
      />
      <div style={{
        textAlign: 'center',
        padding: '20px 0 8px',
        fontSize: 13,
        color: '#999',
      }}>
        You have no orders yet. Start shopping!
      </div>
    </div>
  ),
};
