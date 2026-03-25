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

// --- VARIANT: TEXT ---

export const TextSingleLine: Story = {
  name: 'Text — Single Line',
  args: {
    variant: 'text',
    width: '100%',
  },
};

export const TextMultiLine: Story = {
  name: 'Text — Multi Line (4)',
  args: {
    variant: 'text',
    lines: 4,
  },
};

export const TextTwoLines: Story = {
  name: 'Text — Two Lines',
  args: {
    variant: 'text',
    lines: 2,
  },
};

export const TextCustomWidth: Story = {
  name: 'Text — Custom Width (60%)',
  args: {
    variant: 'text',
    width: '60%',
  },
};

// --- VARIANT: CIRCLE ---

export const CircleSmall: Story = {
  name: 'Circle — Small (32px)',
  args: {
    variant: 'circle',
    width: 32,
    height: 32,
  },
};

export const CircleMedium: Story = {
  name: 'Circle — Medium (48px)',
  args: {
    variant: 'circle',
    width: 48,
    height: 48,
  },
};

export const CircleLarge: Story = {
  name: 'Circle — Large (80px)',
  args: {
    variant: 'circle',
    width: 80,
    height: 80,
  },
};

// --- VARIANT: RECT ---

export const RectFullWidth: Story = {
  name: 'Rect — Full Width Banner',
  args: {
    variant: 'rect',
    width: '100%',
    height: 200,
  },
};

export const RectThumbnail: Story = {
  name: 'Rect — Thumbnail (120x120)',
  args: {
    variant: 'rect',
    width: 120,
    height: 120,
  },
};

export const RectWide: Story = {
  name: 'Rect — Wide (100% x 80px)',
  args: {
    variant: 'rect',
    width: '100%',
    height: 80,
  },
};

// --- VARIANT: CARD ---

export const Card: Story = {
  name: 'Card (Product Skeleton)',
  args: {
    variant: 'card',
  },
};

// --- ANIMATION ---

export const WithAnimation: Story = {
  name: 'With Shimmer Animation',
  args: {
    variant: 'text',
    lines: 3,
    animate: true,
  },
};

export const NoAnimation: Story = {
  name: 'No Animation (Static)',
  args: {
    variant: 'text',
    lines: 3,
    animate: false,
  },
};

// --- COMPOSITE LAYOUTS ---

export const ProductListSkeleton: Story = {
  name: 'Composition: Product Grid',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      <DesktopSkeleton variant="card" />
      <DesktopSkeleton variant="card" />
      <DesktopSkeleton variant="card" />
      <DesktopSkeleton variant="card" />
      <DesktopSkeleton variant="card" />
      <DesktopSkeleton variant="card" />
    </div>
  ),
};

export const ProfileSkeleton: Story = {
  name: 'Composition: Profile Section',
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

export const OrderCardSkeleton: Story = {
  name: 'Composition: Order Card',
  render: () => (
    <div style={{ background: '#fff', padding: 20, borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <DesktopSkeleton variant="text" width="35%" />
        <DesktopSkeleton variant="rect" width={80} height={24} />
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <DesktopSkeleton variant="rect" width={56} height={56} />
        <DesktopSkeleton variant="rect" width={56} height={56} />
        <DesktopSkeleton variant="rect" width={56} height={56} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <DesktopSkeleton variant="text" width="25%" />
        <DesktopSkeleton variant="text" width="20%" />
      </div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <DesktopSkeleton variant="rect" width={120} height={36} />
        <DesktopSkeleton variant="rect" width={100} height={36} />
      </div>
    </div>
  ),
};

export const ReviewSkeleton: Story = {
  name: 'Composition: Review Card',
  render: () => (
    <div style={{ background: '#fff', padding: 20, borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <DesktopSkeleton variant="circle" width={40} height={40} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <DesktopSkeleton variant="text" width="30%" />
          <DesktopSkeleton variant="text" width="20%" />
        </div>
        <DesktopSkeleton variant="text" width="15%" />
      </div>
      <DesktopSkeleton variant="text" lines={3} />
      <div style={{ display: 'flex', gap: 8 }}>
        <DesktopSkeleton variant="rect" width={80} height={80} />
        <DesktopSkeleton variant="rect" width={80} height={80} />
        <DesktopSkeleton variant="rect" width={80} height={80} />
      </div>
    </div>
  ),
};

export const TableSkeleton: Story = {
  name: 'Composition: Data Table',
  render: () => (
    <div style={{ background: '#fff', padding: 20, borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <DesktopSkeleton variant="text" width="25%" />
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} style={{ display: 'flex', gap: 16, paddingBottom: 12, borderBottom: '1px solid #f5f5f5' }}>
          <DesktopSkeleton variant="text" width="30%" />
          <DesktopSkeleton variant="text" width="50%" />
          <DesktopSkeleton variant="text" width="20%" />
        </div>
      ))}
    </div>
  ),
};

export const HeroBannerSkeleton: Story = {
  name: 'Composition: Hero Banner',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <DesktopSkeleton variant="rect" width="100%" height={280} />
      <div style={{ display: 'flex', gap: 12 }}>
        <DesktopSkeleton variant="rect" width={80} height={8} />
        <DesktopSkeleton variant="rect" width={8} height={8} />
        <DesktopSkeleton variant="rect" width={8} height={8} />
        <DesktopSkeleton variant="rect" width={8} height={8} />
      </div>
    </div>
  ),
};

// --- ALL VARIANTS OVERVIEW ---

export const AllVariants: Story = {
  name: 'All Variants Overview',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>text (single)</p>
        <DesktopSkeleton variant="text" width="100%" />
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>text (multi-line)</p>
        <DesktopSkeleton variant="text" lines={3} />
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>circle</p>
        <div style={{ display: 'flex', gap: 12 }}>
          <DesktopSkeleton variant="circle" width={32} />
          <DesktopSkeleton variant="circle" width={48} />
          <DesktopSkeleton variant="circle" width={64} />
        </div>
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>rect</p>
        <DesktopSkeleton variant="rect" width="100%" height={120} />
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>card</p>
        <DesktopSkeleton variant="card" />
      </div>
    </div>
  ),
};
