import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopAvatar } from './DesktopAvatar';

const meta = {
  title: 'Data Display (Desktop)/DesktopAvatar',
  component: DesktopAvatar,
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
} satisfies Meta<typeof DesktopAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop',
    name: 'Sarah Mitchell',
    size: 'lg',
  },
};

export const FullFeatured: Story = {
  name: 'Full Featured (All Props)',
  args: {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop',
    alt: 'James Wilson avatar',
    name: 'James Wilson',
    size: 'xl',
    showOnline: true,
    online: true,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ textAlign: 'center' }}>
        <DesktopAvatar name="Sarah Mitchell" size="sm" />
        <p style={{ fontSize: 11, color: '#999', marginTop: 4 }}>sm (32px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DesktopAvatar name="Sarah Mitchell" size="md" />
        <p style={{ fontSize: 11, color: '#999', marginTop: 4 }}>md (48px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DesktopAvatar name="Sarah Mitchell" size="lg" />
        <p style={{ fontSize: 11, color: '#999', marginTop: 4 }}>lg (64px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DesktopAvatar name="Sarah Mitchell" size="xl" />
        <p style={{ fontSize: 11, color: '#999', marginTop: 4 }}>xl (80px)</p>
      </div>
    </div>
  ),
};

export const WithImages: Story = {
  name: 'With Images (All Sizes)',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <DesktopAvatar
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop"
        name="Emily Chen"
        size="sm"
      />
      <DesktopAvatar
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop"
        name="James Wilson"
        size="md"
      />
      <DesktopAvatar
        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop"
        name="Anna Petrova"
        size="lg"
      />
      <DesktopAvatar
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop"
        name="Michael Brown"
        size="xl"
      />
    </div>
  ),
};

export const OnlineStatus: Story = {
  name: 'Online — Offline Status',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <div style={{ textAlign: 'center' }}>
        <DesktopAvatar name="Online User" size="lg" showOnline online />
        <p style={{ fontSize: 11, color: '#999', marginTop: 4 }}>Online</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DesktopAvatar name="Offline User" size="lg" showOnline online={false} />
        <p style={{ fontSize: 11, color: '#999', marginTop: 4 }}>Offline</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DesktopAvatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop"
          name="Tech Support"
          size="xl"
          showOnline
          online
        />
        <p style={{ fontSize: 11, color: '#999', marginTop: 4 }}>With Image</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DesktopAvatar name="Away" size="md" showOnline={false} />
        <p style={{ fontSize: 11, color: '#999', marginTop: 4 }}>No indicator</p>
      </div>
    </div>
  ),
};

export const InitialsFallback: Story = {
  name: 'Initials Fallback (Various Names)',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <DesktopAvatar name="Emily Chen" size="lg" />
      <DesktopAvatar name="Robert" size="lg" />
      <DesktopAvatar name="Anna Petrova" size="lg" />
      <DesktopAvatar name="Michael Brown" size="lg" />
      <DesktopAvatar name="K" size="lg" />
      <DesktopAvatar size="lg" />
    </div>
  ),
};

export const BrokenImage: Story = {
  name: 'Broken Image (Fallback to Initials)',
  args: {
    src: 'https://invalid-url.example.com/avatar.jpg',
    name: 'David Park',
    size: 'lg',
  },
};

export const NoName: Story = {
  name: 'No Name (? Fallback)',
  args: {
    size: 'lg',
  },
};

export const CustomAlt: Story = {
  name: 'Custom Alt Text',
  args: {
    src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&h=128&fit=crop',
    alt: 'Customer service representative',
    name: 'Maria Santos',
    size: 'lg',
  },
};
