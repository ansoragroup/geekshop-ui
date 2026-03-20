import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopTag } from './DesktopTag';

const meta = {
  title: 'Data Display (Desktop)/DesktopTag',
  component: DesktopTag,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    onClick: { action: 'clicked' },
    onClose: { action: 'close clicked' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 900, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Electronics',
    color: 'primary',
    variant: 'solid',
  },
};

export const SolidColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <DesktopTag color="primary">Primary</DesktopTag>
      <DesktopTag color="success">In Stock</DesktopTag>
      <DesktopTag color="warning">Low Stock</DesktopTag>
      <DesktopTag color="error">Out of Stock</DesktopTag>
      <DesktopTag color="default">Default</DesktopTag>
    </div>
  ),
};

export const OutlineColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <DesktopTag color="primary" variant="outline">Primary</DesktopTag>
      <DesktopTag color="success" variant="outline">Verified</DesktopTag>
      <DesktopTag color="warning" variant="outline">Pending</DesktopTag>
      <DesktopTag color="error" variant="outline">Rejected</DesktopTag>
      <DesktopTag color="default" variant="outline">Default</DesktopTag>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <DesktopTag size="sm" color="primary">Small</DesktopTag>
      <DesktopTag size="md" color="primary">Medium</DesktopTag>
      <DesktopTag size="lg" color="primary">Large</DesktopTag>
    </div>
  ),
};

export const Closable: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <DesktopTag color="primary" closable>React</DesktopTag>
      <DesktopTag color="success" closable>TypeScript</DesktopTag>
      <DesktopTag color="warning" closable>SCSS</DesktopTag>
      <DesktopTag color="default" closable variant="outline">Storybook</DesktopTag>
    </div>
  ),
};

export const ProductTags: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <DesktopTag color="error" variant="solid" size="sm">-25% OFF</DesktopTag>
      <DesktopTag color="success" variant="outline" size="sm">Free Shipping</DesktopTag>
      <DesktopTag color="primary" variant="solid" size="sm">New Arrival</DesktopTag>
      <DesktopTag color="warning" variant="outline" size="sm">Limited</DesktopTag>
      <DesktopTag color="default" variant="outline" size="sm">GPU</DesktopTag>
      <DesktopTag color="default" variant="outline" size="sm">Gaming</DesktopTag>
    </div>
  ),
};
