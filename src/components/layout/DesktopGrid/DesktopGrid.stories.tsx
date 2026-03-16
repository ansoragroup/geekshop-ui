import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopGrid } from './DesktopGrid';

const meta = {
  title: 'Layout/DesktopGrid',
  component: DesktopGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
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

const Card = ({ label }: { label: string }) => (
  <div
    style={{
      background: '#fff',
      borderRadius: 8,
      padding: 24,
      textAlign: 'center',
      color: '#666',
      fontSize: 14,
      border: '1px solid #eee',
    }}
  >
    {label}
  </div>
);

export const FourColumns: Story = {
  name: '4 Columns (Default)',
  args: {
    columns: 4,
    gap: 24,
    children: (
      <>
        {Array.from({ length: 8 }, (_, i) => (
          <Card key={i} label={`Mahsulot ${i + 1}`} />
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
          <Card key={i} label={`Mahsulot ${i + 1}`} />
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

export const AutoColumns: Story = {
  name: 'Auto Columns (responsive)',
  args: {
    columns: 'auto',
    gap: 24,
    minColumnWidth: 240,
    children: (
      <>
        {Array.from({ length: 7 }, (_, i) => (
          <Card key={i} label={`Mahsulot ${i + 1}`} />
        ))}
      </>
    ),
  },
};

export const ProductGrid: Story = {
  name: 'Product Grid (4 col)',
  render: () => (
    <DesktopGrid columns={4} gap={16}>
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} style={{ background: '#fff', borderRadius: 8, overflow: 'hidden', border: '1px solid #eee' }}>
          <div style={{ width: '100%', aspectRatio: '1', background: '#F5F5F5' }} />
          <div style={{ padding: 12 }}>
            <div style={{ fontSize: 13, color: '#1A1A1A', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              Mahsulot nomi #{i + 1}
            </div>
            <div style={{ fontSize: 16, color: '#FF0000', fontWeight: 700 }}>
              {((i + 1) * 1_250_000).toLocaleString('ru-RU').replace(/,/g, ' ')} so'm
            </div>
          </div>
        </div>
      ))}
    </DesktopGrid>
  ),
};
