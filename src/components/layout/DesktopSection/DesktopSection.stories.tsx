import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopSection } from './DesktopSection';

const meta = {
  title: 'Layout (Desktop)/DesktopSection',
  component: DesktopSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    background: { control: 'radio', options: ['default', 'card', 'primary'] },
    padding: { control: 'radio', options: ['none', 'sm', 'md', 'lg'] },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 900, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleGrid = ({ count = 3 }: { count?: number }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${count}, 1fr)`, gap: 16 }}>
    {Array.from({ length: count }, (_, i) => (
      <div
        key={i}
        style={{
          background: '#f5f5f5',
          borderRadius: 8,
          padding: 24,
          textAlign: 'center',
          color: '#666',
          fontSize: 14,
        }}
      >
        Item {i + 1}
      </div>
    ))}
  </div>
);

/* ─── Basic ─── */

export const Default: Story = {
  args: {
    title: 'Recommended Products',
    children: <SampleGrid />,
  },
};

/* ─── Background Variants ─── */

export const DefaultBackground: Story = {
  name: 'Background: Default (Transparent)',
  args: {
    title: 'Default Background',
    background: 'default',
    children: <SampleGrid />,
  },
};

export const CardBackground: Story = {
  name: 'Background: Card (White)',
  args: {
    title: 'Featured Deals',
    background: 'card',
    children: <SampleGrid />,
  },
};

export const PrimaryBackground: Story = {
  name: 'Background: Primary (Orange)',
  args: {
    title: 'Flash Sale',
    background: 'primary',
    children: <SampleGrid />,
  },
};

export const AllBackgrounds: Story = {
  name: 'All Backgrounds Comparison',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <DesktopSection title="Default Background" background="default">
        <SampleGrid />
      </DesktopSection>
      <DesktopSection title="Card Background" background="card">
        <SampleGrid />
      </DesktopSection>
      <DesktopSection title="Primary Background" background="primary">
        <SampleGrid />
      </DesktopSection>
    </div>
  ),
};

/* ─── Padding Variants ─── */

export const NoPadding: Story = {
  name: 'Padding: None',
  args: {
    title: 'Full Width Content',
    padding: 'none',
    background: 'card',
    children: (
      <div
        style={{
          height: 120,
          background: '#e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#666',
        }}
      >
        Edge-to-edge content, no internal padding
      </div>
    ),
  },
};

export const SmallPadding: Story = {
  name: 'Padding: Small',
  args: {
    title: 'Compact Section',
    padding: 'sm',
    background: 'card',
    children: <SampleGrid />,
  },
};

export const MediumPadding: Story = {
  name: 'Padding: Medium (Default)',
  args: {
    title: 'Standard Section',
    padding: 'md',
    background: 'card',
    children: <SampleGrid />,
  },
};

export const LargePadding: Story = {
  name: 'Padding: Large',
  args: {
    title: 'Spacious Section',
    padding: 'lg',
    background: 'card',
    children: <SampleGrid />,
  },
};

export const AllPaddings: Story = {
  name: 'All Paddings Comparison',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <DesktopSection title="None" padding="none" background="card">
        <div
          style={{
            height: 60,
            background: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            color: '#666',
          }}
        >
          padding: none
        </div>
      </DesktopSection>
      <DesktopSection title="Small" padding="sm" background="card">
        <div
          style={{
            height: 60,
            background: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            color: '#666',
          }}
        >
          padding: sm
        </div>
      </DesktopSection>
      <DesktopSection title="Medium" padding="md" background="card">
        <div
          style={{
            height: 60,
            background: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            color: '#666',
          }}
        >
          padding: md
        </div>
      </DesktopSection>
      <DesktopSection title="Large" padding="lg" background="card">
        <div
          style={{
            height: 60,
            background: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            color: '#666',
          }}
        >
          padding: lg
        </div>
      </DesktopSection>
    </div>
  ),
};

/* ─── Without Title ─── */

export const NoTitle: Story = {
  name: 'Without Title',
  args: {
    background: 'card',
    children: (
      <div style={{ padding: 16, textAlign: 'center', color: '#666', fontSize: 14 }}>
        A section without a title -- just content wrapped in a styled container.
      </div>
    ),
  },
};

/* ─── Full Featured ─── */

export const FullFeatured: Story = {
  name: 'Full Featured (All Props)',
  args: {
    title: 'Trending Products',
    background: 'card',
    padding: 'lg',
    children: <SampleGrid count={4} />,
  },
};

/* ─── Realistic: Multiple Sections ─── */

export const StackedSections: Story = {
  name: 'Stacked Sections (Page Layout)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <DesktopSection title="Flash Sale" background="primary" padding="lg">
        <SampleGrid count={4} />
      </DesktopSection>
      <DesktopSection title="New Arrivals" background="card" padding="md">
        <SampleGrid count={4} />
      </DesktopSection>
      <DesktopSection title="Popular Categories" background="card" padding="md">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
          {['Laptops', 'Phones', 'GPUs', 'Audio', 'Monitors', 'Gaming'].map((cat) => (
            <div
              key={cat}
              style={{
                background: '#f5f5f5',
                borderRadius: 8,
                padding: 16,
                textAlign: 'center',
                fontSize: 13,
                color: '#666',
              }}
            >
              {cat}
            </div>
          ))}
        </div>
      </DesktopSection>
      <DesktopSection title="Top Sellers This Week" background="default" padding="md">
        <SampleGrid count={5} />
      </DesktopSection>
    </div>
  ),
};

/* ─── Edge Cases ─── */

export const LongTitle: Story = {
  args: {
    title: 'Products You Might Like Based on Your Recent Browsing History and Purchase Patterns',
    background: 'card',
    children: <SampleGrid />,
  },
};

export const EmptySection: Story = {
  name: 'Empty (No Children)',
  args: {
    title: 'Empty Section',
    background: 'card',
    padding: 'md',
  },
};

export const RichContent: Story = {
  name: 'Rich Content Inside',
  args: {
    title: 'Product Showcase',
    background: 'card',
    padding: 'lg',
    children: (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {[
          { name: 'RTX 4090', price: '12,500,000 UZS' },
          { name: 'MacBook Pro', price: '24,000,000 UZS' },
          { name: 'Sony WH-1000', price: '3,200,000 UZS' },
          { name: 'iPad Air M2', price: '8,500,000 UZS' },
        ].map((product) => (
          <div
            key={product.name}
            style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #eee' }}
          >
            <div style={{ aspectRatio: '1', background: '#f0f0f0' }} />
            <div style={{ padding: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#1A1A1A', marginBottom: 4 }}>
                {product.name}
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#FF0000' }}>{product.price}</div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
};
