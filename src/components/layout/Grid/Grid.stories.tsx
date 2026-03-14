import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid } from './Grid';

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 375, background: '#F5F5F5', padding: 12 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Grid>;

const PlaceholderCard = ({ label, color }: { label: string; color?: string }) => (
  <div style={{ background: color || '#fff', borderRadius: 8, padding: 16, textAlign: 'center', fontSize: 13, color: '#666' }}>
    {label}
  </div>
);

export const TwoColumns: Story = {
  name: '2 Columns',
  args: {
    columns: 2,
    gap: '8px',
    children: (
      <>
        <PlaceholderCard label="Mahsulot 1" />
        <PlaceholderCard label="Mahsulot 2" />
        <PlaceholderCard label="Mahsulot 3" />
        <PlaceholderCard label="Mahsulot 4" />
      </>
    ),
  },
};

export const ThreeColumns: Story = {
  name: '3 Columns',
  args: {
    columns: 3,
    gap: '8px',
    children: (
      <>
        <PlaceholderCard label="1" />
        <PlaceholderCard label="2" />
        <PlaceholderCard label="3" />
        <PlaceholderCard label="4" />
        <PlaceholderCard label="5" />
        <PlaceholderCard label="6" />
      </>
    ),
  },
};

export const FourColumns: Story = {
  name: '4 Columns',
  args: {
    columns: 4,
    gap: '8px',
    children: (
      <>
        <PlaceholderCard label="1" />
        <PlaceholderCard label="2" />
        <PlaceholderCard label="3" />
        <PlaceholderCard label="4" />
        <PlaceholderCard label="5" />
        <PlaceholderCard label="6" />
        <PlaceholderCard label="7" />
        <PlaceholderCard label="8" />
      </>
    ),
  },
};

export const FiveColumns: Story = {
  name: '5 Columns (Categories)',
  args: {
    columns: 5,
    gap: '4px',
    children: (
      <>
        {['Videokarta', 'Protsessor', 'Xotira', 'Monitor', 'Klaviatura', 'Sichqoncha', 'Naushnik', 'SSD', 'Kabel', 'Sumka'].map((name) => (
          <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '8px 0' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: '#FFF5F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="4" width="16" height="16" rx="3" stroke="#FF5000" strokeWidth="1.5" />
              </svg>
            </div>
            <span style={{ fontSize: 11, color: '#666', textAlign: 'center', lineHeight: 1.2 }}>{name}</span>
          </div>
        ))}
      </>
    ),
  },
};

export const ProductGrid: Story = {
  name: 'Product Grid',
  render: () => (
    <Grid columns={2} gap="8px">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} style={{ background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ width: '100%', aspectRatio: '1', background: '#F5F5F5' }} />
          <div style={{ padding: 8 }}>
            <div style={{ fontSize: 13, color: '#1A1A1A', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              Mahsulot nomi #{i}
            </div>
            <div style={{ fontSize: 16, color: '#FF0000', fontWeight: 700 }}>
              {(i * 1_250_000).toLocaleString('ru-RU').replace(/,/g, ' ')} so'm
            </div>
          </div>
        </div>
      ))}
    </Grid>
  ),
};

export const MenuGrid: Story = {
  name: 'Menu Grid (3x2)',
  render: () => (
    <Grid columns={3} gap="12px">
      {[
        { label: 'Buyurtmalar', icon: '1' },
        { label: 'Sevimlilar', icon: '2' },
        { label: 'Kuponlar', icon: '3' },
        { label: 'Manzillar', icon: '4' },
        { label: 'Yordam', icon: '5' },
        { label: 'Sozlamalar', icon: '6' },
      ].map((item) => (
        <div key={item.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: 12, background: '#fff', borderRadius: 8, cursor: 'pointer' }}>
          <div style={{ width: 36, height: 36, borderRadius: 9999, background: '#FFF5F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF5000', fontWeight: 600 }}>
            {item.icon}
          </div>
          <span style={{ fontSize: 12, color: '#666' }}>{item.label}</span>
        </div>
      ))}
    </Grid>
  ),
};
