import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
  title: 'Data Display/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['dot', 'count', 'text'] },
    color: { control: 'select', options: ['primary', 'success', 'error', 'warning', 'info'] },
    position: { control: 'select', options: ['top-right', 'top-left', 'inline'] },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 24, background: '#fff', borderRadius: 12, display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

/* Box placeholder for overlay demos */
const Box = ({ children }: { children?: React.ReactNode }) => (
  <div style={{ width: 40, height: 40, borderRadius: 8, background: '#F0F0F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#999' }}>
    {children}
  </div>
);

// --- Dot badge ---
export const Dot: Story = {
  render: () => (
    <Badge type="dot" color="error">
      <Box>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.8">
          <path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.73 21a2 2 0 01-3.46 0" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Box>
    </Badge>
  ),
};

// --- Count badge ---
export const Count: Story = {
  args: {
    type: 'count',
    content: 5,
    color: 'error',
  },
  render: (args) => (
    <Badge {...args}>
      <Box>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.8">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Box>
    </Badge>
  ),
};

// --- Count overflow ---
export const CountOverflow: Story = {
  render: () => (
    <Badge type="count" content={150} max={99} color="error">
      <Box>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      </Box>
    </Badge>
  ),
};

// --- Text badges (Taobao-style labels) ---
export const TextBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Badge type="text" content="HOT" color="error" />
      <Badge type="text" content="NEW" color="primary" />
      <Badge type="text" content="TOP" color="warning" />
      <Badge type="text" content="Mavjud" color="success" />
      <Badge type="text" content="-15%" color="error" />
    </div>
  ),
};

// --- All colors (dot) ---
export const AllColorsDot: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      {(['primary', 'success', 'error', 'warning', 'info'] as const).map((c) => (
        <Badge key={c} type="dot" color={c}>
          <Box>{c.slice(0, 3)}</Box>
        </Badge>
      ))}
    </div>
  ),
};

// --- All colors (count) ---
export const AllColorsCount: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      {(['primary', 'success', 'error', 'warning', 'info'] as const).map((c, i) => (
        <Badge key={c} type="count" content={(i + 1) * 3} color={c}>
          <Box>{c.slice(0, 3)}</Box>
        </Badge>
      ))}
    </div>
  ),
};

// --- Position top-left ---
export const TopLeft: Story = {
  render: () => (
    <Badge type="count" content={3} color="error" position="top-left">
      <Box>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.8">
          <circle cx="12" cy="12" r="10" />
        </svg>
      </Box>
    </Badge>
  ),
};

// --- Custom color ---
export const CustomColor: Story = {
  render: () => (
    <Badge type="text" content="GeekShop" customColor="#7B2FF7">
      <Box>GS</Box>
    </Badge>
  ),
};

// --- On product image (realistic) ---
export const OnProductImage: Story = {
  name: 'Product Image Overlay',
  render: () => (
    <div style={{ position: 'relative', width: 160 }}>
      <Badge type="text" content="HOT" color="error" position="top-left">
        <img
          src="https://picsum.photos/seed/rtx4060/160/160"
          alt="RTX 4060"
          style={{ width: 160, height: 160, borderRadius: 12, objectFit: 'cover' }}
        />
      </Badge>
    </div>
  ),
};
