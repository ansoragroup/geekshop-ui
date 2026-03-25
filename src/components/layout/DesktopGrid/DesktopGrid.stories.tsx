import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopGrid } from './DesktopGrid';

const meta = {
  title: 'Layout (Desktop)/DesktopGrid',
  component: DesktopGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    columns: { control: { type: 'text' } },
    gap: { control: { type: 'number', min: 0, max: 48 } },
    minColumnWidth: { control: { type: 'number', min: 100, max: 400 } },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 1200, padding: 24, margin: '0 auto', background: '#F5F5F5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const Card = ({ label, height }: { label: string; height?: number }) => (
  <div
    style={{
      background: '#fff',
      borderRadius: 8,
      padding: 24,
      textAlign: 'center',
      color: '#666',
      fontSize: 14,
      border: '1px solid #eee',
      minHeight: height,
    }}
  >
    {label}
  </div>
);

/* ─── Column Counts ─── */

export const TwoColumns: Story = {
  name: '2 Columns',
  args: {
    columns: 2,
    gap: 24,
    children: (
      <>
        {Array.from({ length: 4 }, (_, i) => (
          <Card key={i} label={`Article ${i + 1}`} />
        ))}
      </>
    ),
  },
};

export const ThreeColumns: Story = {
  name: '3 Columns',
  args: {
    columns: 3,
    gap: 24,
    children: (
      <>
        {Array.from({ length: 6 }, (_, i) => (
          <Card key={i} label={`Card ${i + 1}`} />
        ))}
      </>
    ),
  },
};

export const FourColumns: Story = {
  name: '4 Columns (Default)',
  args: {
    columns: 4,
    gap: 24,
    children: (
      <>
        {Array.from({ length: 8 }, (_, i) => (
          <Card key={i} label={`Product ${i + 1}`} />
        ))}
      </>
    ),
  },
};

export const FiveColumns: Story = {
  name: '5 Columns',
  args: {
    columns: 5,
    gap: 16,
    children: (
      <>
        {Array.from({ length: 10 }, (_, i) => (
          <Card key={i} label={`${i + 1}`} />
        ))}
      </>
    ),
  },
};

export const SixColumns: Story = {
  name: '6 Columns',
  args: {
    columns: 6,
    gap: 12,
    children: (
      <>
        {Array.from({ length: 12 }, (_, i) => (
          <Card key={i} label={`${i + 1}`} />
        ))}
      </>
    ),
  },
};

/* ─── Auto Columns ─── */

export const AutoColumns: Story = {
  name: 'Auto Columns (Responsive)',
  args: {
    columns: 'auto',
    gap: 24,
    minColumnWidth: 240,
    children: (
      <>
        {Array.from({ length: 7 }, (_, i) => (
          <Card key={i} label={`Item ${i + 1}`} />
        ))}
      </>
    ),
  },
};

export const AutoColumnsNarrow: Story = {
  name: 'Auto Columns (Narrow Min)',
  args: {
    columns: 'auto',
    gap: 16,
    minColumnWidth: 150,
    children: (
      <>
        {Array.from({ length: 12 }, (_, i) => (
          <Card key={i} label={`${i + 1}`} />
        ))}
      </>
    ),
  },
};

export const AutoColumnsWide: Story = {
  name: 'Auto Columns (Wide Min)',
  args: {
    columns: 'auto',
    gap: 24,
    minColumnWidth: 350,
    children: (
      <>
        {Array.from({ length: 5 }, (_, i) => (
          <Card key={i} label={`Wide Item ${i + 1}`} />
        ))}
      </>
    ),
  },
};

/* ─── Gap Sizes ─── */

export const NoGap: Story = {
  name: 'No Gap (0px)',
  args: {
    columns: 4,
    gap: 0,
    children: (
      <>
        {Array.from({ length: 8 }, (_, i) => (
          <Card key={i} label={`${i + 1}`} />
        ))}
      </>
    ),
  },
};

export const SmallGap: Story = {
  name: 'Small Gap (8px)',
  args: {
    columns: 4,
    gap: 8,
    children: (
      <>
        {Array.from({ length: 8 }, (_, i) => (
          <Card key={i} label={`${i + 1}`} />
        ))}
      </>
    ),
  },
};

export const LargeGap: Story = {
  name: 'Large Gap (48px)',
  args: {
    columns: 3,
    gap: 48,
    children: (
      <>
        {Array.from({ length: 6 }, (_, i) => (
          <Card key={i} label={`Spaced ${i + 1}`} />
        ))}
      </>
    ),
  },
};

/* ─── Edge Cases ─── */

export const SingleItem: Story = {
  name: 'Single Item',
  args: {
    columns: 4,
    gap: 24,
    children: <Card label="Solo item in a 4-column grid" />,
  },
};

export const IncompleteRow: Story = {
  name: 'Incomplete Last Row',
  args: {
    columns: 4,
    gap: 24,
    children: (
      <>
        {Array.from({ length: 7 }, (_, i) => (
          <Card key={i} label={`Item ${i + 1}`} />
        ))}
      </>
    ),
  },
};

export const UnevenHeights: Story = {
  name: 'Uneven Content Heights',
  args: {
    columns: 4,
    gap: 16,
    children: (
      <>
        <Card label="Short content" height={80} />
        <Card label="This card has significantly more content which makes it taller than others in the row" height={120} />
        <Card label="Medium" height={100} />
        <Card label="Tiny" height={60} />
        <Card label="This is another card with a lot of text content that wraps to multiple lines" height={140} />
        <Card label="Normal" height={80} />
        <Card label="Short" height={60} />
        <Card label="Also normal height here" height={80} />
      </>
    ),
  },
};

/* ─── Realistic: Product Grid ─── */

export const ProductGrid: Story = {
  name: 'Product Grid (4 col)',
  render: () => (
    <DesktopGrid columns={4} gap={16}>
      {[
        { name: 'NVIDIA RTX 4090', price: '12,500,000' },
        { name: 'MacBook Pro 16"', price: '24,000,000' },
        { name: 'Sony WH-1000XM5', price: '3,200,000' },
        { name: 'Samsung 32" 4K', price: '4,800,000' },
        { name: 'Razer Viper V3', price: '1,100,000' },
        { name: 'Corsair K70 RGB', price: '1,600,000' },
        { name: 'iPad Air M2', price: '8,500,000' },
        { name: 'AirPods Pro 3', price: '2,900,000' },
      ].map((product, i) => (
        <div key={i} style={{ background: '#fff', borderRadius: 8, overflow: 'hidden', border: '1px solid #eee' }}>
          <div style={{ width: '100%', aspectRatio: '1', background: '#F5F5F5' }} />
          <div style={{ padding: 12 }}>
            <div style={{ fontSize: 13, color: '#1A1A1A', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {product.name}
            </div>
            <div style={{ fontSize: 16, color: '#FF0000', fontWeight: 700 }}>
              {product.price} UZS
            </div>
          </div>
        </div>
      ))}
    </DesktopGrid>
  ),
};

/* ─── Realistic: Category Icons Grid ─── */

export const CategoryGrid: Story = {
  name: 'Category Icons Grid (6 col)',
  render: () => (
    <DesktopGrid columns={6} gap={16}>
      {['Laptops', 'Phones', 'Monitors', 'Audio', 'Gaming', 'Storage', 'Networking', 'Cameras', 'Wearables', 'Tablets', 'Components', 'Accessories'].map((cat) => (
        <div key={cat} style={{ background: '#fff', borderRadius: 12, padding: 20, textAlign: 'center', border: '1px solid #eee', cursor: 'pointer' }}>
          <div style={{ width: 48, height: 48, background: '#FFF5F0', borderRadius: '50%', margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF5000', fontSize: 20 }}>
            {cat[0]}
          </div>
          <div style={{ fontSize: 13, color: '#1A1A1A' }}>{cat}</div>
        </div>
      ))}
    </DesktopGrid>
  ),
};

/* ─── Full Featured ─── */

export const FullFeatured: Story = {
  name: 'Full Featured (All Props)',
  args: {
    columns: 'auto',
    gap: 20,
    minColumnWidth: 200,
    children: (
      <>
        {Array.from({ length: 9 }, (_, i) => (
          <Card key={i} label={`Auto-sized item ${i + 1}`} />
        ))}
      </>
    ),
  },
};

/* ─── Empty Grid ─── */

export const EmptyGrid: Story = {
  name: 'Empty (No Children)',
  args: {
    columns: 4,
    gap: 24,
    children: undefined,
  },
};
