import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopLoading } from './DesktopLoading';

const meta = {
  title: 'Feedback (Desktop)/DesktopLoading',
  component: DesktopLoading,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600, padding: 48, background: '#ffffff', borderRadius: 12, border: '1px solid #eee' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopLoading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
    text: 'Loading...',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    text: 'Loading',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    text: 'Please wait...',
  },
};

export const NoText: Story = {
  args: {
    size: 'md',
  },
};

export const OverlayMode: Story = {
  args: {
    size: 'md',
    text: 'Updating...',
    overlay: true,
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: 600, padding: 24, background: '#fff', borderRadius: 12, border: '1px solid #eee' }}>
        <div style={{ opacity: 0.5 }}>
          <h3 style={{ margin: '0 0 8px', fontSize: 16 }}>Order #GS-2026-0047</h3>
          <p style={{ margin: '0 0 4px', fontSize: 14, color: '#666' }}>MSI RTX 4060 Ventus 2X</p>
          <p style={{ margin: '0 0 4px', fontSize: 14, color: '#666' }}>AMD Ryzen 7 7800X3D</p>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#FF0000' }}>23,700,000 UZS</p>
        </div>
        <Story />
      </div>
    ),
  ],
};

export const AllSizes: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', gap: 48, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <DesktopLoading size="sm" />
        <p style={{ fontSize: 12, color: '#999', marginTop: 8 }}>Small</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DesktopLoading size="md" />
        <p style={{ fontSize: 12, color: '#999', marginTop: 8 }}>Medium</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DesktopLoading size="lg" />
        <p style={{ fontSize: 12, color: '#999', marginTop: 8 }}>Large</p>
      </div>
    </div>
  ),
};
