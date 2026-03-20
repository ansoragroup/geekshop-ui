import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopProgress } from './DesktopProgress';

const meta = {
  title: 'Data Display (Desktop)/DesktopProgress',
  component: DesktopProgress,
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
} satisfies Meta<typeof DesktopProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 65,
    showLabel: true,
    label: 'Storage Used',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <DesktopProgress value={40} size="sm" showLabel label="Small" />
      <DesktopProgress value={60} size="md" showLabel label="Medium" />
      <DesktopProgress value={80} size="lg" showLabel label="Large" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <DesktopProgress value={70} variant="default" showLabel label="Default" />
      <DesktopProgress value={85} variant="success" showLabel label="Upload Complete" />
      <DesktopProgress value={50} variant="warning" showLabel label="Almost Full" />
      <DesktopProgress value={92} variant="error" showLabel label="Critical" />
    </div>
  ),
};

export const Striped: Story = {
  args: {
    value: 55,
    striped: true,
    showLabel: true,
    label: 'Downloading...',
    size: 'lg',
  },
};

export const StripedVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <DesktopProgress value={40} variant="default" striped size="md" showLabel label="Processing" />
      <DesktopProgress value={65} variant="success" striped size="md" showLabel label="Uploading" />
      <DesktopProgress value={78} variant="warning" striped size="md" showLabel label="Storage" />
      <DesktopProgress value={95} variant="error" striped size="md" showLabel label="Disk Space" />
    </div>
  ),
};

export const NoLabel: Story = {
  args: {
    value: 45,
    variant: 'success',
    size: 'md',
  },
};
