import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopCategoryIcon } from './DesktopCategoryIcon';

const LaptopIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="2" y1="20" x2="22" y2="20" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const HeadphonesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0118 0v6" />
    <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
  </svg>
);

const GpuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="2" x2="9" y2="4" />
    <line x1="15" y1="2" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="22" />
    <line x1="15" y1="20" x2="15" y2="22" />
  </svg>
);

const KeyboardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
    <path d="M6 8h.001M10 8h.001M14 8h.001M18 8h.001M8 12h.001M12 12h.001M16 12h.001M7 16h10" />
  </svg>
);

const MonitorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const CameraIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const GamepadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="12" x2="10" y2="12" />
    <line x1="8" y1="10" x2="8" y2="14" />
    <line x1="15" y1="13" x2="15.01" y2="13" />
    <line x1="18" y1="11" x2="18.01" y2="11" />
    <rect x="2" y="6" width="20" height="12" rx="2" />
  </svg>
);

const meta = {
  title: 'Content (Desktop)/DesktopCategoryIcon',
  component: DesktopCategoryIcon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    onClick: { action: 'clicked' },
    color: { control: 'color' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 900, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopCategoryIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    icon: <LaptopIcon />,
    label: 'Laptops',
    color: '#FF5000',
  },
};

// ─── Full Featured ───────────────────────────────────────────────────────────

export const FullFeatured: Story = {
  name: 'Full Featured (all props)',
  args: {
    icon: <PhoneIcon />,
    label: 'Smartphones',
    color: '#1890FF',
    badgeCount: 24,
  },
};

// ─── With Badge Count ────────────────────────────────────────────────────────

export const WithBadge: Story = {
  args: {
    icon: <GpuIcon />,
    label: 'GPUs',
    color: '#07C160',
    badgeCount: 42,
  },
};

// ─── Large Badge Count ───────────────────────────────────────────────────────

export const LargeBadgeCount: Story = {
  name: 'Badge Count > 99',
  args: {
    icon: <HeadphonesIcon />,
    label: 'Audio',
    color: '#722ED1',
    badgeCount: 156,
  },
};

// ─── No Badge ────────────────────────────────────────────────────────────────

export const NoBadge: Story = {
  args: {
    icon: <KeyboardIcon />,
    label: 'Keyboards',
    color: '#FFA726',
  },
};

// ─── Category Row (8 icons) ──────────────────────────────────────────────────

export const CategoryRow: Story = {
  name: 'Category Row (8 icons)',
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <DesktopCategoryIcon icon={<LaptopIcon />} label="Laptops" color="#FF5000" badgeCount={156} />
      <DesktopCategoryIcon icon={<PhoneIcon />} label="Phones" color="#1890FF" badgeCount={89} />
      <DesktopCategoryIcon icon={<HeadphonesIcon />} label="Audio" color="#722ED1" />
      <DesktopCategoryIcon icon={<GpuIcon />} label="GPUs" color="#07C160" badgeCount={12} />
      <DesktopCategoryIcon icon={<KeyboardIcon />} label="Keyboards" color="#FFA726" />
      <DesktopCategoryIcon icon={<MonitorIcon />} label="Monitors" color="#FF3B30" badgeCount={45} />
      <DesktopCategoryIcon icon={<CameraIcon />} label="Cameras" color="#1890FF" badgeCount={8} />
      <DesktopCategoryIcon icon={<GamepadIcon />} label="Gaming" color="#07C160" badgeCount={67} />
    </div>
  ),
};

// ─── Custom Colors ───────────────────────────────────────────────────────────

export const CustomColors: Story = {
  name: 'Various Custom Colors',
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <DesktopCategoryIcon icon={<LaptopIcon />} label="Orange" color="#FF5000" />
      <DesktopCategoryIcon icon={<PhoneIcon />} label="Blue" color="#1890FF" />
      <DesktopCategoryIcon icon={<HeadphonesIcon />} label="Purple" color="#722ED1" />
      <DesktopCategoryIcon icon={<GpuIcon />} label="Green" color="#07C160" />
      <DesktopCategoryIcon icon={<MonitorIcon />} label="Red" color="#FF3B30" />
      <DesktopCategoryIcon icon={<CameraIcon />} label="Teal" color="#13C2C2" />
    </div>
  ),
};

// ─── As Link ─────────────────────────────────────────────────────────────────

export const AsLink: Story = {
  name: 'Polymorphic: as="a"',
  args: {
    as: 'a',
    href: '#laptops',
    icon: <LaptopIcon />,
    label: 'Laptops',
    color: '#FF5000',
    badgeCount: 156,
  },
};

// ─── Long Label ──────────────────────────────────────────────────────────────

export const LongLabel: Story = {
  name: 'Edge: Long Label',
  args: {
    icon: <GamepadIcon />,
    label: 'Gaming Accessories & Peripherals',
    color: '#FF5000',
    badgeCount: 5,
  },
};
