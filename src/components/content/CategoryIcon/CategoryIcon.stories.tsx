import type { Meta, StoryObj } from '@storybook/react-vite';
import { CategoryIcon } from './CategoryIcon';
import { CategoryIconRow } from './CategoryIconRow';

/* Inline SVG icons for PC parts categories */
const LaptopIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 16V7a2 2 0 00-2-2H6a2 2 0 00-2 2v9m16 0H4m16 0l1.28 2.55a1 1 0 01-.9 1.45H3.62a1 1 0 01-.9-1.45L4 16" />
  </svg>
);

const GpuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" rx="1" />
    <path d="M4 9h2M4 15h2M18 9h2M18 15h2" />
  </svg>
);

const MonitorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);

const KeyboardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10" />
  </svg>
);

const MouseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="2" width="12" height="20" rx="6" />
    <path d="M12 2v6" />
  </svg>
);

const HeadphoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0118 0v6" />
    <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
  </svg>
);

const SsdIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <path d="M7 12h2M13 12h4" />
  </svg>
);

const RamIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="1" />
    <path d="M6 6v-2M10 6v-2M14 6v-2M18 6v-2M6 18v2M10 18v2M14 18v2M18 18v2" />
  </svg>
);

const ChairIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 18v3M17 18v3M5 10V6a2 2 0 012-2h10a2 2 0 012 2v4" />
    <rect x="4" y="10" width="16" height="8" rx="2" />
  </svg>
);

const CpuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
  </svg>
);

// Single icon meta
const meta = {
  title: 'Content/CategoryIcon',
  component: CategoryIcon,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    onClick: { action: 'clicked' },
    color: { control: 'color' },
  },
} satisfies Meta<typeof CategoryIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <LaptopIcon />,
    label: 'Noutbuklar',
    color: '#FF5000',
  },
};

export const GPU: Story = {
  args: {
    icon: <GpuIcon />,
    label: 'Videokartalar',
    color: '#07C160',
  },
};

export const Monitor: Story = {
  args: {
    icon: <MonitorIcon />,
    label: 'Monitorlar',
    color: '#1890FF',
  },
};

// Row story
export const ScrollableRow: StoryObj<typeof CategoryIconRow> = {
  decorators: [
    (Story) => (
      <div style={{ width: '375px', padding: '0 12px', background: '#FFF', borderRadius: '12px' }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <CategoryIconRow
      items={[
        { icon: <LaptopIcon />, label: 'Noutbuklar', color: '#FF5000' },
        { icon: <GpuIcon />, label: 'GPU', color: '#07C160' },
        { icon: <MonitorIcon />, label: 'Monitorlar', color: '#1890FF' },
        { icon: <KeyboardIcon />, label: 'Klaviatura', color: '#722ED1' },
        { icon: <MouseIcon />, label: 'Sichqoncha', color: '#FA8C16' },
        { icon: <HeadphoneIcon />, label: 'Quloqchin', color: '#F5222D' },
        { icon: <SsdIcon />, label: 'SSD', color: '#13C2C2' },
        { icon: <RamIcon />, label: 'RAM', color: '#EB2F96' },
        { icon: <ChairIcon />, label: 'Kreslo', color: '#52C41A' },
        { icon: <CpuIcon />, label: 'Protsessor', color: '#2F54EB' },
      ]}
    />
  ),
};
