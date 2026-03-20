import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopSkeleton } from './DesktopSkeleton';

const meta = {
  title: 'Feedback (Desktop)/DesktopSkeleton',
  component: DesktopSkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextLine: Story = {
  args: {
    variant: 'text',
    width: '100%',
  },
};

export const TextMultiLine: Story = {
  args: {
    variant: 'text',
    lines: 4,
  },
};

export const Circle: Story = {
  args: {
    variant: 'circle',
    width: 64,
    height: 64,
  },
};

export const Rectangle: Story = {
  args: {
    variant: 'rect',
    width: '100%',
    height: 200,
  },
};

export const Card: Story = {
  args: {
    variant: 'card',
  },
};

export const NoAnimation: Story = {
  args: {
    variant: 'text',
    lines: 3,
    animate: false,
  },
};

export const ProductListSkeleton: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      <DesktopSkeleton variant="card" />
      <DesktopSkeleton variant="card" />
      <DesktopSkeleton variant="card" />
    </div>
  ),
};

export const ProfileSkeleton: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: '#fff', padding: 24, borderRadius: 12 }}>
      <DesktopSkeleton variant="circle" width={56} height={56} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <DesktopSkeleton variant="text" width="40%" />
        <DesktopSkeleton variant="text" width="60%" />
        <DesktopSkeleton variant="text" lines={2} />
      </div>
    </div>
  ),
};
