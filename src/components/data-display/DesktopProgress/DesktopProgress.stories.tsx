import { useState, useEffect } from 'react';
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

export const FullFeatured: Story = {
  name: 'Full Featured (All Props)',
  args: {
    value: 72,
    variant: 'warning',
    size: 'lg',
    showLabel: true,
    label: 'Disk Space',
    striped: true,
  },
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <DesktopProgress value={40} size="sm" showLabel label="Small" />
      <DesktopProgress value={60} size="md" showLabel label="Medium" />
      <DesktopProgress value={80} size="lg" showLabel label="Large" />
    </div>
  ),
};

export const AllVariants: Story = {
  name: 'All Color Variants',
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
  name: 'Striped (All Variants)',
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
  name: 'Without Label',
  args: {
    value: 45,
    variant: 'success',
    size: 'md',
  },
};

export const ZeroValue: Story = {
  name: 'Zero Progress (Empty)',
  args: {
    value: 0,
    showLabel: true,
    label: 'Not Started',
  },
};

export const FullValue: Story = {
  name: 'Full Progress (100%)',
  args: {
    value: 100,
    variant: 'success',
    showLabel: true,
    label: 'Complete',
  },
};

export const CustomLabel: Story = {
  name: 'Custom Label (Not Percentage)',
  args: {
    value: 30,
    showLabel: true,
    label: '3 of 10 items packed',
    variant: 'default',
  },
};

export const EcommerceScenarios: Story = {
  name: 'E-commerce Scenarios',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ background: '#fff', padding: 16, borderRadius: 8, border: '1px solid #eee' }}>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: '#666' }}>Order #GS-2026-0047 Fulfillment</p>
        <DesktopProgress value={75} variant="default" showLabel label="Packing" size="md" />
      </div>
      <div style={{ background: '#fff', padding: 16, borderRadius: 8, border: '1px solid #eee' }}>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: '#666' }}>Image Upload</p>
        <DesktopProgress value={45} variant="success" striped showLabel label="Uploading 3 of 7 photos" size="md" />
      </div>
      <div style={{ background: '#fff', padding: 16, borderRadius: 8, border: '1px solid #eee' }}>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: '#666' }}>Profile Completeness</p>
        <DesktopProgress value={60} variant="warning" showLabel label="Add phone number to reach 80%" size="md" />
      </div>
      <div style={{ background: '#fff', padding: 16, borderRadius: 8, border: '1px solid #eee' }}>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: '#666' }}>Warehouse Capacity</p>
        <DesktopProgress value={94} variant="error" showLabel label="Almost Full" size="lg" />
      </div>
    </div>
  ),
};

export const Animated: Story = {
  name: 'Animated Progress',
  render: () => {
    const [value, setValue] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setValue((prev) => {
          if (prev >= 100) return 0;
          return prev + 2;
        });
      }, 100);
      return () => clearInterval(interval);
    }, []);
    return (
      <DesktopProgress
        value={value}
        variant={value < 50 ? 'default' : value < 80 ? 'warning' : 'success'}
        showLabel
        label={value < 100 ? `Downloading... ${value}%` : 'Complete!'}
        size="lg"
        striped={value < 100}
      />
    );
  },
};
