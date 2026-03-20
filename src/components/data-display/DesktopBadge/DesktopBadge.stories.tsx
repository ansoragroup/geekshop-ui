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

export const DotBadge: Story = {
  args: {
    type: 'dot',
    color: 'error',
    children: <IconPlaceholder />,
  },
};

export const CountBadge: Story = {
  args: {
    type: 'count',
    content: 12,
    color: 'error',
    children: <IconPlaceholder />,
  },
};

export const OverflowCount: Story = {
  args: {
    type: 'count',
    content: 150,
    maxCount: 99,
    color: 'error',
    children: <IconPlaceholder />,
  },
};

export const TextBadge: Story = {
  args: {
    type: 'text',
    content: 'NEW',
    color: 'primary',
    children: <IconPlaceholder />,
  },
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
      <DesktopBadge type="count" content={5} color="primary"><IconPlaceholder /></DesktopBadge>
      <DesktopBadge type="count" content={3} color="success"><IconPlaceholder /></DesktopBadge>
      <DesktopBadge type="count" content={8} color="error"><IconPlaceholder /></DesktopBadge>
      <DesktopBadge type="count" content={2} color="warning"><IconPlaceholder /></DesktopBadge>
      <DesktopBadge type="count" content={1} color="info"><IconPlaceholder /></DesktopBadge>
    </div>
  ),
};

export const Standalone: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <DesktopBadge type="dot" color="error" />
      <DesktopBadge type="dot" color="success" />
      <DesktopBadge type="count" content={7} color="primary" />
      <DesktopBadge type="text" content="HOT" color="error" />
      <DesktopBadge type="text" content="Sale" color="primary" />
    </div>
  ),
};

export const Positions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 48, alignItems: 'center' }}>
      <DesktopBadge type="count" content={5} color="error" position="top-right">
        <IconPlaceholder />
      </DesktopBadge>
      <DesktopBadge type="count" content={5} color="error" position="top-left">
        <IconPlaceholder />
      </DesktopBadge>
      <DesktopBadge type="count" content={5} color="error" position="inline">
        <span style={{ fontSize: 14 }}>Messages</span>
      </DesktopBadge>
    </div>
  ),
};
