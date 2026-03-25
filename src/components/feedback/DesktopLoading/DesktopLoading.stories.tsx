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

// --- DEFAULT ---

export const Default: Story = {
  args: {
    size: 'md',
    text: 'Loading...',
  },
};

// --- FULL FEATURED ---

export const FullFeatured: Story = {
  name: 'Full Featured (All Props)',
  args: {
    size: 'lg',
    text: 'Loading your order details...',
    overlay: false,
    fullscreen: false,
  },
};

// --- SIZES ---

export const Small: Story = {
  args: {
    size: 'sm',
    text: 'Loading',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    text: 'Please wait...',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    text: 'Preparing your content...',
  },
};

export const AllSizes: Story = {
  name: 'All Sizes Comparison',
  render: () => (
    <div style={{ display: 'flex', gap: 48, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <DesktopLoading size="sm" />
        <p style={{ fontSize: 12, color: '#999', marginTop: 8 }}>Small (24px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DesktopLoading size="md" />
        <p style={{ fontSize: 12, color: '#999', marginTop: 8 }}>Medium (40px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DesktopLoading size="lg" />
        <p style={{ fontSize: 12, color: '#999', marginTop: 8 }}>Large (56px)</p>
      </div>
    </div>
  ),
};

// --- WITHOUT TEXT ---

export const NoText: Story = {
  name: 'No Text (Spinner Only)',
  args: {
    size: 'md',
  },
};

export const AllSizesNoText: Story = {
  name: 'All Sizes Without Text',
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center', justifyContent: 'center' }}>
      <DesktopLoading size="sm" />
      <DesktopLoading size="md" />
      <DesktopLoading size="lg" />
    </div>
  ),
};

// --- WITH CUSTOM TEXT ---

export const TextVariations: Story = {
  name: 'Text Variations',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center' }}>
      <DesktopLoading size="md" text="Loading products..." />
      <DesktopLoading size="md" text="Processing payment..." />
      <DesktopLoading size="md" text="Searching 10,000+ items..." />
      <DesktopLoading size="sm" text="Syncing" />
    </div>
  ),
};

// --- OVERLAY MODE ---

export const OverlayMode: Story = {
  name: 'Overlay Mode',
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

export const OverlayLargeContent: Story = {
  name: 'Overlay Over Rich Content',
  args: {
    size: 'lg',
    text: 'Refreshing data...',
    overlay: true,
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: 600, background: '#fff', borderRadius: 12, border: '1px solid #eee', overflow: 'hidden' }}>
        <div style={{ opacity: 0.4, padding: 24 }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 18 }}>Product Specifications</h3>
          {[
            ['Brand', 'MSI'],
            ['GPU', 'GeForce RTX 4060'],
            ['Memory', '8GB GDDR6'],
            ['Clock Speed', '2460 MHz'],
            ['Interface', 'PCIe 4.0 x16'],
            ['TDP', '115W'],
          ].map(([label, value]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f5f5f5', fontSize: 14 }}>
              <span style={{ color: '#666' }}>{label}</span>
              <span style={{ fontWeight: 500 }}>{value}</span>
            </div>
          ))}
        </div>
        <Story />
      </div>
    ),
  ],
};

// --- FULLSCREEN MODE ---

export const FullscreenMode: Story = {
  name: 'Fullscreen Mode',
  args: {
    size: 'lg',
    text: 'Loading GeekShop...',
    fullscreen: true,
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [],
};

// --- INLINE USAGE ---

export const InlineInButton: Story = {
  name: 'Inline in Button Context',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <button
        type="button"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 24px',
          borderRadius: 8,
          border: 'none',
          background: '#FF5000',
          color: '#fff',
          cursor: 'not-allowed',
          fontSize: 14,
          fontWeight: 600,
          opacity: 0.7,
        }}
        disabled
      >
        <DesktopLoading size="sm" />
        Processing...
      </button>
      <button
        type="button"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 24px',
          borderRadius: 8,
          border: '1px solid #ddd',
          background: '#fff',
          color: '#666',
          cursor: 'not-allowed',
          fontSize: 14,
          opacity: 0.7,
        }}
        disabled
      >
        <DesktopLoading size="sm" />
        Saving...
      </button>
    </div>
  ),
};

// --- E-COMMERCE SCENARIOS ---

export const ScenarioProductLoading: Story = {
  name: 'Scenario: Product Page Loading',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: 40 }}>
      <DesktopLoading size="lg" text="Loading product details..." />
    </div>
  ),
};

export const ScenarioCheckout: Story = {
  name: 'Scenario: Checkout Processing',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: 40 }}>
      <DesktopLoading size="md" text="Verifying your payment method..." />
    </div>
  ),
};
