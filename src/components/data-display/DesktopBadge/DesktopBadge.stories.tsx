import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopBadge } from './DesktopBadge';

const meta = {
  title: 'Data Display (Desktop)/DesktopBadge',
  component: DesktopBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 900, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

const IconPlaceholder = () => (
  <div
    style={{
      width: 40,
      height: 40,
      borderRadius: 8,
      background: '#e0e0e0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 4v12M4 10h12" stroke="#999" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </div>
);

const CartIcon = () => (
  <div
    style={{
      width: 40,
      height: 40,
      borderRadius: 8,
      background: '#FFF5F0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M2 2h2l2.5 10h9l2-8H6"
        stroke="#FF5000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8.5" cy="16" r="1.5" fill="#FF5000" />
      <circle cx="14.5" cy="16" r="1.5" fill="#FF5000" />
    </svg>
  </div>
);

const BellIcon = () => (
  <div
    style={{
      width: 40,
      height: 40,
      borderRadius: 8,
      background: '#E8F8EF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 2a5 5 0 00-5 5v3l-1.5 2h13L15 10V7a5 5 0 00-5-5zM8.5 17h3"
        stroke="#07C160"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

// --- TYPE: DOT ---

export const DotDefault: Story = {
  name: 'Dot — Default (Error)',
  args: {
    type: 'dot',
    color: 'error',
    children: <IconPlaceholder />,
  },
};

export const DotAllColors: Story = {
  name: 'Dot — All Colors',
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
      <DesktopBadge type="dot" color="primary">
        <IconPlaceholder />
      </DesktopBadge>
      <DesktopBadge type="dot" color="success">
        <BellIcon />
      </DesktopBadge>
      <DesktopBadge type="dot" color="error">
        <CartIcon />
      </DesktopBadge>
      <DesktopBadge type="dot" color="warning">
        <IconPlaceholder />
      </DesktopBadge>
      <DesktopBadge type="dot" color="info">
        <IconPlaceholder />
      </DesktopBadge>
    </div>
  ),
};

// --- TYPE: COUNT ---

export const CountLow: Story = {
  name: 'Count — Low Number',
  args: {
    type: 'count',
    content: 3,
    color: 'error',
    children: <CartIcon />,
  },
};

export const CountHigh: Story = {
  name: 'Count — High Number',
  args: {
    type: 'count',
    content: 47,
    color: 'error',
    children: <BellIcon />,
  },
};

export const CountOverflow99: Story = {
  name: 'Count — Overflow (99+)',
  args: {
    type: 'count',
    content: 150,
    maxCount: 99,
    color: 'error',
    children: <BellIcon />,
  },
};

export const CountCustomMax: Story = {
  name: 'Count — Custom Max (9+)',
  args: {
    type: 'count',
    content: 25,
    maxCount: 9,
    color: 'primary',
    children: <CartIcon />,
  },
};

export const CountZero: Story = {
  name: 'Count — Zero (Hidden)',
  args: {
    type: 'count',
    content: 0,
    color: 'error',
    children: <IconPlaceholder />,
  },
};

export const CountAllColors: Story = {
  name: 'Count — All Colors',
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
      <DesktopBadge type="count" content={5} color="primary">
        <IconPlaceholder />
      </DesktopBadge>
      <DesktopBadge type="count" content={12} color="success">
        <IconPlaceholder />
      </DesktopBadge>
      <DesktopBadge type="count" content={8} color="error">
        <IconPlaceholder />
      </DesktopBadge>
      <DesktopBadge type="count" content={2} color="warning">
        <IconPlaceholder />
      </DesktopBadge>
      <DesktopBadge type="count" content={99} color="info">
        <IconPlaceholder />
      </DesktopBadge>
    </div>
  ),
};

// --- TYPE: TEXT ---

export const TextNew: Story = {
  name: 'Text — "NEW"',
  args: {
    type: 'text',
    content: 'NEW',
    color: 'primary',
    children: <IconPlaceholder />,
  },
};

export const TextHot: Story = {
  name: 'Text — "HOT"',
  args: {
    type: 'text',
    content: 'HOT',
    color: 'error',
    children: <CartIcon />,
  },
};

export const TextSale: Story = {
  name: 'Text — "Sale"',
  args: {
    type: 'text',
    content: 'Sale',
    color: 'warning',
    children: <BellIcon />,
  },
};

export const TextLong: Story = {
  name: 'Text — Long Label',
  args: {
    type: 'text',
    content: 'Limited Edition',
    color: 'info',
    children: <IconPlaceholder />,
  },
};

// --- POSITIONS ---

export const AllPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 48, alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <DesktopBadge type="count" content={5} color="error" position="top-right">
          <IconPlaceholder />
        </DesktopBadge>
        <p style={{ fontSize: 12, color: '#999', marginTop: 8 }}>top-right</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DesktopBadge type="count" content={5} color="error" position="top-left">
          <IconPlaceholder />
        </DesktopBadge>
        <p style={{ fontSize: 12, color: '#999', marginTop: 8 }}>top-left</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DesktopBadge type="count" content={5} color="error" position="inline">
          <span style={{ fontSize: 14 }}>Messages</span>
        </DesktopBadge>
        <p style={{ fontSize: 12, color: '#999', marginTop: 8 }}>inline</p>
      </div>
    </div>
  ),
};

// --- STANDALONE (no children) ---

export const StandaloneAll: Story = {
  name: 'Standalone (No Children)',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <DesktopBadge type="dot" color="error" />
      <DesktopBadge type="dot" color="success" />
      <DesktopBadge type="dot" color="primary" />
      <DesktopBadge type="count" content={7} color="primary" />
      <DesktopBadge type="count" content={42} color="error" />
      <DesktopBadge type="count" content={999} maxCount={99} color="warning" />
      <DesktopBadge type="text" content="HOT" color="error" />
      <DesktopBadge type="text" content="Sale" color="primary" />
      <DesktopBadge type="text" content="Free Shipping" color="success" />
    </div>
  ),
};

// --- CUSTOM COLOR ---

export const CustomColor: Story = {
  name: 'Custom Background Color',
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
      <DesktopBadge type="count" content={3} customColor="#9C27B0">
        <IconPlaceholder />
      </DesktopBadge>
      <DesktopBadge type="text" content="VIP" customColor="#FFD700">
        <IconPlaceholder />
      </DesktopBadge>
      <DesktopBadge type="dot" customColor="#00BCD4">
        <IconPlaceholder />
      </DesktopBadge>
    </div>
  ),
};

// --- REALISTIC E-COMMERCE ---

export const EcommerceHeader: Story = {
  name: 'E-commerce Header Icons',
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 24,
        alignItems: 'center',
        background: '#fff',
        padding: '12px 24px',
        borderRadius: 12,
      }}
    >
      <DesktopBadge type="count" content={3} color="error">
        <CartIcon />
      </DesktopBadge>
      <DesktopBadge type="count" content={12} color="error">
        <BellIcon />
      </DesktopBadge>
      <DesktopBadge type="dot" color="success">
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            background: '#F0F0FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 3a3 3 0 110 6 3 3 0 010-6zm0 11.2a6.4 6.4 0 01-4.8-2.16 4 4 0 013.36-1.84h2.88a4 4 0 013.36 1.84A6.4 6.4 0 0110 16.2z"
              fill="#6366F1"
            />
          </svg>
        </div>
      </DesktopBadge>
    </div>
  ),
};
