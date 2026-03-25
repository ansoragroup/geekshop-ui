import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { CategorySidebarLegacy } from './CategorySidebarLegacy';
import type { CategorySidebarLegacyProps } from './CategorySidebarLegacy';

const meta = {
  title: 'Navigation/CategorySidebarLegacy',
  component: CategorySidebarLegacy,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'White' },
  },
} satisfies Meta<typeof CategorySidebarLegacy>;

export default meta;
type Story = StoryObj<typeof meta>;

function InteractiveSidebar(props: Partial<CategorySidebarLegacyProps> & { initialKey?: string }) {
  const { initialKey = 'gpu', ...rest } = props;
  const [active, setActive] = useState(initialKey);
  return <CategorySidebarLegacy activeKey={active} onChange={setActive} {...rest} />;
}

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', width: '390px', height: '600px', background: '#FFF' }}>
      <InteractiveSidebar />
      <div style={{ flex: 1, padding: 16, background: '#FFF' }}>
        <p style={{ fontSize: 14, color: '#666' }}>Product list area</p>
      </div>
    </div>
  ),
};

export const GpuActive: Story = {
  render: () => (
    <div style={{ display: 'flex', width: '390px', height: '600px' }}>
      <InteractiveSidebar initialKey="gpu" />
      <div style={{ flex: 1, padding: 16, background: '#FFF' }}>
        <p style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A' }}>Videokartalar</p>
        <p style={{ fontSize: 12, color: '#999', marginTop: 8 }}>
          RTX 4090, RTX 4080, RX 7900 XTX...
        </p>
      </div>
    </div>
  ),
};

export const CpuActive: Story = {
  render: () => (
    <div style={{ display: 'flex', width: '390px', height: '600px' }}>
      <InteractiveSidebar initialKey="cpu" />
      <div style={{ flex: 1, padding: 16, background: '#FFF' }}>
        <p style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A' }}>Protsessorlar</p>
        <p style={{ fontSize: 12, color: '#999', marginTop: 8 }}>Intel Core i9, AMD Ryzen 9...</p>
      </div>
    </div>
  ),
};

export const StorageActive: Story = {
  render: () => (
    <div style={{ display: 'flex', width: '390px', height: '600px' }}>
      <InteractiveSidebar initialKey="storage" />
      <div style={{ flex: 1, padding: 16, background: '#FFF' }}>
        <p style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A' }}>SSD/HDD</p>
        <p style={{ fontSize: 12, color: '#999', marginTop: 8 }}>
          Samsung 990 Pro, WD Black SN850X...
        </p>
      </div>
    </div>
  ),
};

export const WithNavBar: Story = {
  render: () => (
    <div style={{ width: '390px', height: '600px', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          height: 44,
          background: '#FFF',
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          fontWeight: 600,
          fontSize: 16,
          color: '#1A1A1A',
          flexShrink: 0,
        }}
      >
        Kategoriyalar
      </div>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <InteractiveSidebar />
        <div style={{ flex: 1, padding: 16, background: '#FFF', overflowY: 'auto' }}>
          <p style={{ fontSize: 14, color: '#666' }}>Subcategories and product list appear here</p>
        </div>
      </div>
    </div>
  ),
};
