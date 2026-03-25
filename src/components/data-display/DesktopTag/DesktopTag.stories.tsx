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

export const FullFeatured: Story = {
  name: 'Full Featured (All Props)',
  args: {
    children: 'New Arrival',
    color: 'primary',
    variant: 'solid',
    size: 'md',
    closable: true,
  },
};

export const SolidColors: Story = {
  name: 'Variant: Solid (All Colors)',
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
  name: 'Variant: Outline (All Colors)',
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

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <DesktopTag size="sm" color="primary">Small</DesktopTag>
      <DesktopTag size="md" color="primary">Medium</DesktopTag>
      <DesktopTag size="lg" color="primary">Large</DesktopTag>
    </div>
  ),
};

export const AllSizesOutline: Story = {
  name: 'All Sizes (Outline)',
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <DesktopTag size="sm" color="success" variant="outline">Small</DesktopTag>
      <DesktopTag size="md" color="success" variant="outline">Medium</DesktopTag>
      <DesktopTag size="lg" color="success" variant="outline">Large</DesktopTag>
    </div>
  ),
};

export const Closable: Story = {
  name: 'Closable Tags',
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <DesktopTag color="primary" closable>React</DesktopTag>
      <DesktopTag color="success" closable>TypeScript</DesktopTag>
      <DesktopTag color="warning" closable>SCSS</DesktopTag>
      <DesktopTag color="error" closable>Vite</DesktopTag>
      <DesktopTag color="default" closable variant="outline">Storybook</DesktopTag>
    </div>
  ),
};

export const Clickable: Story = {
  name: 'Clickable Tags',
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <DesktopTag color="default" variant="outline" onClick={() => console.log('GPU')}>GPU</DesktopTag>
      <DesktopTag color="default" variant="outline" onClick={() => console.log('RAM')}>RAM</DesktopTag>
      <DesktopTag color="default" variant="outline" onClick={() => console.log('SSD')}>SSD</DesktopTag>
      <DesktopTag color="primary" onClick={() => console.log('Selected')}>Selected</DesktopTag>
    </div>
  ),
};

export const ProductTags: Story = {
  name: 'E-commerce Product Tags',
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <DesktopTag color="error" variant="solid" size="sm">-25% OFF</DesktopTag>
      <DesktopTag color="success" variant="outline" size="sm">Free Shipping</DesktopTag>
      <DesktopTag color="primary" variant="solid" size="sm">New Arrival</DesktopTag>
      <DesktopTag color="warning" variant="outline" size="sm">Limited Edition</DesktopTag>
      <DesktopTag color="default" variant="outline" size="sm">GPU</DesktopTag>
      <DesktopTag color="default" variant="outline" size="sm">Gaming</DesktopTag>
      <DesktopTag color="default" variant="outline" size="sm">RTX 4060</DesktopTag>
    </div>
  ),
};

export const OrderStatusTags: Story = {
  name: 'Order Status Tags',
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <DesktopTag color="warning">Pending</DesktopTag>
      <DesktopTag color="primary">Processing</DesktopTag>
      <DesktopTag color="primary" variant="outline">Shipping</DesktopTag>
      <DesktopTag color="success">Delivered</DesktopTag>
      <DesktopTag color="error">Cancelled</DesktopTag>
      <DesktopTag color="default">Returned</DesktopTag>
    </div>
  ),
};

export const LongText: Story = {
  name: 'Long Text Content',
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <DesktopTag color="primary" size="sm">Extended Manufacturer Warranty</DesktopTag>
      <DesktopTag color="success" size="md" closable>International Free Shipping Available</DesktopTag>
      <DesktopTag color="default" variant="outline">Samsung Galaxy S24 Ultra 256GB Titanium Black</DesktopTag>
    </div>
  ),
};
