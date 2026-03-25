import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { CategorySidebar } from './CategorySidebar';
import type { CategorySidebarProps } from './CategorySidebar';

const meta = {
  title: 'Navigation/CategorySidebar',
  component: CategorySidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'White' },
  },
} satisfies Meta<typeof CategorySidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

function InteractiveSidebar(props: Partial<CategorySidebarProps> & { initialKey?: string }) {
  const { initialKey = 'gpu', ...rest } = props;
  const [active, setActive] = useState(initialKey);
  return <CategorySidebar activeKey={active} onChange={setActive} {...rest} />;
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
      {/* Simulated nav bar */}
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

/* ---------- Rich / Fully-Featured demo data ---------- */

const subcategories: Record<string, { name: string; count: number; hot?: boolean }[]> = {
  gpu: [
    { name: 'NVIDIA RTX 40xx', count: 48, hot: true },
    { name: 'NVIDIA RTX 50xx', count: 12, hot: true },
    { name: 'AMD Radeon RX 7xxx', count: 31 },
    { name: 'Intel Arc', count: 9 },
    { name: 'Workstation (Quadro)', count: 6 },
    { name: 'Aksessuar & Kulerlar', count: 14 },
  ],
  cpu: [
    { name: 'Intel Core i9 / i7', count: 22, hot: true },
    { name: 'Intel Core i5 / i3', count: 35 },
    { name: 'AMD Ryzen 9 / 7', count: 19, hot: true },
    { name: 'AMD Ryzen 5 / 3', count: 28 },
    { name: 'Server (Xeon / EPYC)', count: 8 },
  ],
  monitor: [
    { name: '4K UHD (27–32")', count: 41, hot: true },
    { name: 'Gaming 144Hz+', count: 36, hot: true },
    { name: 'Ultrawide 34"+', count: 15 },
    { name: 'Portable / USB-C', count: 7 },
    { name: 'Professional (IPS/OLED)', count: 12 },
  ],
  laptop: [
    { name: 'Gaming noutbuklar', count: 29, hot: true },
    { name: 'Ultrabook / Yengil', count: 44 },
    { name: 'MacBook', count: 18, hot: true },
    { name: 'Business / ThinkPad', count: 21 },
    { name: 'Budget (< 5M UZS)', count: 33 },
  ],
  ram: [
    { name: 'DDR5 (Desktop)', count: 38 },
    { name: 'DDR4 (Desktop)', count: 52 },
    { name: 'DDR5 (Laptop)', count: 16 },
    { name: 'DDR4 (Laptop)', count: 24 },
    { name: 'ECC / Server RAM', count: 7 },
  ],
  storage: [
    { name: 'NVMe M.2 SSD', count: 45, hot: true },
    { name: 'SATA SSD', count: 32 },
    { name: 'HDD (3.5")', count: 18 },
    { name: 'Portable SSD', count: 22 },
    { name: 'MicroSD / Flash', count: 15 },
  ],
  motherboard: [
    { name: 'Intel LGA 1700', count: 26 },
    { name: 'Intel LGA 1851', count: 11, hot: true },
    { name: 'AMD AM5', count: 19, hot: true },
    { name: 'AMD AM4', count: 31 },
    { name: 'Mini-ITX / SFF', count: 8 },
  ],
  periphery: [
    { name: 'Klaviaturalar', count: 56 },
    { name: 'Sichqonchalar', count: 43 },
    { name: 'Naushniklar', count: 38, hot: true },
    { name: 'Veb-kameralar', count: 12 },
    { name: 'Gamepadlar', count: 17 },
    { name: 'Miksofonlar', count: 9 },
  ],
};

const productImages: Record<string, string[]> = {
  gpu: [
    'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=160&h=160&fit=crop',
    'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=160&h=160&fit=crop',
    'https://images.unsplash.com/photo-1555618254-5e7c55d1a0b3?w=160&h=160&fit=crop',
  ],
  cpu: [
    'https://images.unsplash.com/photo-1555618568-bfe052310f39?w=160&h=160&fit=crop',
    'https://images.unsplash.com/photo-1592664474505-51c4993f3ddb?w=160&h=160&fit=crop',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=160&h=160&fit=crop',
  ],
  monitor: [
    'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=160&h=160&fit=crop',
    'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=160&h=160&fit=crop',
    'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=160&h=160&fit=crop',
  ],
  laptop: [
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=160&h=160&fit=crop',
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=160&h=160&fit=crop',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=160&h=160&fit=crop',
  ],
};

const topProducts: Record<string, { name: string; price: string; badge?: string }[]> = {
  gpu: [
    { name: 'RTX 4090 FE 24GB', price: '28 900 000', badge: 'TOP' },
    { name: 'RTX 4070 Ti Super', price: '12 500 000', badge: 'SALE' },
    { name: 'RX 7900 XTX 24GB', price: '15 200 000' },
  ],
  cpu: [
    { name: 'Core i9-14900K', price: '8 200 000', badge: 'TOP' },
    { name: 'Ryzen 9 7950X3D', price: '9 100 000', badge: 'TOP' },
    { name: 'Ryzen 7 7800X3D', price: '5 400 000', badge: 'SALE' },
  ],
  monitor: [
    { name: 'Samsung Odyssey G9 49"', price: '16 800 000', badge: 'TOP' },
    { name: 'LG 27GP950 4K 144Hz', price: '9 600 000' },
    { name: 'ASUS ROG PG27AQDM', price: '14 200 000', badge: 'SALE' },
  ],
  laptop: [
    { name: 'MacBook Pro 16" M3 Max', price: '42 000 000', badge: 'TOP' },
    { name: 'ROG Strix G16 RTX 4070', price: '18 900 000' },
    { name: 'ThinkPad X1 Carbon', price: '22 500 000' },
  ],
};

function FullFeaturedDemo() {
  const [active, setActive] = useState('gpu');
  const subs = subcategories[active] ?? subcategories.gpu;
  const images = productImages[active] ?? productImages.gpu;
  const products = topProducts[active] ?? topProducts.gpu;
  const categoryLabel =
    {
      gpu: 'Videokartalar',
      cpu: 'Protsessorlar',
      monitor: 'Monitorlar',
      laptop: 'Noutbuklar',
      ram: 'Operativ xotira',
      storage: 'SSD/HDD',
      motherboard: 'Ona platalar',
      periphery: 'Periferiya',
    }[active] ?? active;

  return (
    <div
      style={{
        width: 390,
        height: 780,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        background: '#F5F5F5',
      }}
    >
      {/* AppBar */}
      <div
        style={{
          height: 44,
          background: '#FFF',
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          gap: 8,
          borderBottom: '1px solid #EEE',
          flexShrink: 0,
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1A1A1A"
          strokeWidth="2"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        <span style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A', flex: 1 }}>
          Kategoriyalar
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1A1A1A"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      </div>

      {/* Main area: sidebar + content */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <CategorySidebar activeKey={active} onChange={setActive} />

        {/* Content panel */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
          {/* Category header */}
          <div style={{ marginBottom: 12 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', margin: 0 }}>
              {categoryLabel}
            </h2>
            <span style={{ fontSize: 12, color: '#999' }}>
              {subs.reduce((s, c) => s + c.count, 0)} ta mahsulot
            </span>
          </div>

          {/* Subcategory chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
            {subs.map((sub) => (
              <span
                key={sub.name}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  padding: '6px 10px',
                  borderRadius: 16,
                  fontSize: 12,
                  fontWeight: 500,
                  background: '#FFF',
                  border: '1px solid #EEE',
                  color: '#333',
                  cursor: 'pointer',
                }}
              >
                {sub.name}
                <span style={{ fontSize: 10, color: '#999' }}>{sub.count}</span>
                {sub.hot && (
                  <span
                    style={{
                      fontSize: 9,
                      color: '#FFF',
                      background: '#FF3B30',
                      borderRadius: 4,
                      padding: '1px 4px',
                      fontWeight: 600,
                    }}
                  >
                    HOT
                  </span>
                )}
              </span>
            ))}
          </div>

          {/* Banner */}
          <div
            style={{
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              background: 'linear-gradient(135deg, #FF5000 0%, #FF7A33 100%)',
              color: '#FFF',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>🔥 Flash Sale</div>
            <div style={{ fontSize: 11, opacity: 0.9 }}>
              Tanlangan {categoryLabel.toLowerCase()} — 30% gacha chegirma!
            </div>
            <div
              style={{
                position: 'absolute',
                right: -10,
                top: -10,
                width: 60,
                height: 60,
                borderRadius: 30,
                background: 'rgba(255,255,255,0.15)',
              }}
            />
          </div>

          {/* Top products mini-grid */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', marginBottom: 8 }}>
              Top mahsulotlar
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {products.map((p, i) => (
                <div
                  key={p.name}
                  style={{
                    background: '#FFF',
                    borderRadius: 8,
                    padding: 8,
                    position: 'relative',
                    border: '1px solid #EEE',
                  }}
                >
                  {p.badge && (
                    <span
                      style={{
                        position: 'absolute',
                        top: 4,
                        left: 4,
                        fontSize: 9,
                        fontWeight: 700,
                        padding: '2px 5px',
                        borderRadius: 4,
                        background: p.badge === 'TOP' ? '#FF5000' : '#FF3B30',
                        color: '#FFF',
                      }}
                    >
                      {p.badge}
                    </span>
                  )}
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '1',
                      borderRadius: 6,
                      marginBottom: 6,
                      background: '#F5F5F5',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={images[i]}
                      alt={p.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: '#333',
                      lineHeight: 1.3,
                      minHeight: 26,
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical' as const,
                    }}
                  >
                    {p.name}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#FF0000', marginTop: 4 }}>
                    {p.price} <span style={{ fontSize: 10, fontWeight: 400 }}>so'm</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All subcategories list */}
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', marginBottom: 8 }}>
              Barcha bo'limlar
            </div>
            {subs.map((sub) => (
              <div
                key={sub.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  background: '#FFF',
                  borderRadius: 8,
                  marginBottom: 4,
                  cursor: 'pointer',
                  border: '1px solid #EEE',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 13, color: '#333' }}>{sub.name}</span>
                  {sub.hot && (
                    <span
                      style={{
                        fontSize: 9,
                        color: '#FF5000',
                        fontWeight: 600,
                        background: '#FFF5F0',
                        padding: '2px 6px',
                        borderRadius: 4,
                      }}
                    >
                      🔥
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 12, color: '#999' }}>{sub.count}</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#CCC"
                    strokeWidth="2"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const FullFeatured: Story = {
  name: 'Full Featured (Rich)',
  render: () => <FullFeaturedDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Complete category browsing experience with subcategory chips, flash sale banner, product mini-grid, and full subcategory list. Tap categories to switch — content updates dynamically.',
      },
    },
  },
};
