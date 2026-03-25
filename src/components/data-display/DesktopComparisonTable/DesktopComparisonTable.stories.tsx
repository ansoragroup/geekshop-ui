import { useState, useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopComparisonTable, type DesktopComparisonProduct, type DesktopComparisonSpec } from './DesktopComparisonTable';

const meta = {
  title: 'Data Display (Desktop)/DesktopComparisonTable',
  component: DesktopComparisonTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    onRemoveProduct: { action: 'remove product' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 1000, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopComparisonTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const gpuProducts: DesktopComparisonProduct[] = [
  {
    id: 'rtx4060',
    name: 'MSI RTX 4060 Ventus 2X',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200&h=200&fit=crop',
    price: 5_400_000,
  },
  {
    id: 'rtx4070',
    name: 'ASUS RTX 4070 Dual OC',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200&h=200&fit=crop',
    price: 8_200_000,
  },
  {
    id: 'rx7800',
    name: 'Sapphire RX 7800 XT Pulse',
    image: 'https://images.unsplash.com/photo-1555618568-bce51e8e11c6?w=200&h=200&fit=crop',
    price: 7_100_000,
  },
];

const gpuSpecs: DesktopComparisonSpec[] = [
  {
    key: 'vram',
    label: 'VRAM',
    values: { rtx4060: '8 GB', rtx4070: '12 GB', rx7800: '16 GB' },
    unit: 'GDDR6',
    higherIsBetter: true,
  },
  {
    key: 'clock',
    label: 'Boost Clock',
    values: { rtx4060: 2460, rtx4070: 2505, rx7800: 2430 },
    unit: 'MHz',
    higherIsBetter: true,
  },
  {
    key: 'tdp',
    label: 'TDP',
    values: { rtx4060: 115, rtx4070: 200, rx7800: 263 },
    unit: 'W',
    higherIsBetter: false,
  },
  {
    key: 'bus',
    label: 'Memory Bus',
    values: { rtx4060: '128-bit', rtx4070: '192-bit', rx7800: '256-bit' },
  },
  {
    key: 'raytracing',
    label: 'Ray Tracing',
    values: { rtx4060: true, rtx4070: true, rx7800: true },
  },
  {
    key: 'dlss',
    label: 'DLSS / FSR',
    values: { rtx4060: 'DLSS 3', rtx4070: 'DLSS 3', rx7800: 'FSR 3' },
  },
  {
    key: 'length',
    label: 'Card Length',
    values: { rtx4060: 235, rtx4070: 302, rx7800: 260 },
    unit: 'mm',
    higherIsBetter: false,
  },
  {
    key: 'fans',
    label: 'Fans',
    values: { rtx4060: 2, rtx4070: 2, rx7800: 2 },
  },
];

export const Default: Story = {
  args: {
    products: gpuProducts,
    specs: gpuSpecs,
    highlightDifferences: true,
  },
};

export const WithRemoveButton: Story = {
  args: {
    products: gpuProducts,
    specs: gpuSpecs,
    highlightDifferences: true,
  },
};

export const TwoProducts: Story = {
  args: {
    products: gpuProducts.slice(0, 2),
    specs: gpuSpecs,
    highlightDifferences: true,
  },
};

export const NoHighlight: Story = {
  args: {
    products: gpuProducts,
    specs: gpuSpecs,
    highlightDifferences: false,
  },
};

export const SmartphoneComparison: Story = {
  name: 'Smartphones: Samsung vs Apple vs Xiaomi',
  args: {
    products: [
      { id: 's24', name: 'Samsung Galaxy S24 Ultra', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=200&h=200&fit=crop', price: 14_990_000 },
      { id: 'ip16', name: 'iPhone 16 Pro Max', image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop', price: 16_500_000 },
      { id: 'x14', name: 'Xiaomi 14 Ultra', image: 'https://images.unsplash.com/photo-1598327106026-d9521da673d1?w=200&h=200&fit=crop', price: 10_900_000 },
    ],
    specs: [
      { key: 'display', label: 'Display Size', values: { s24: '6.8"', ip16: '6.9"', x14: '6.73"' } },
      { key: 'chip', label: 'Chipset', values: { s24: 'Snapdragon 8 Gen 3', ip16: 'A18 Pro', x14: 'Snapdragon 8 Gen 3' } },
      { key: 'ram', label: 'RAM', values: { s24: 12, ip16: 8, x14: 16 }, unit: 'GB', higherIsBetter: true },
      { key: 'storage', label: 'Base Storage', values: { s24: 256, ip16: 256, x14: 256 }, unit: 'GB' },
      { key: 'main_cam', label: 'Main Camera', values: { s24: 200, ip16: 48, x14: 50 }, unit: 'MP', higherIsBetter: true },
      { key: 'battery', label: 'Battery', values: { s24: 5000, ip16: 4685, x14: 5300 }, unit: 'mAh', higherIsBetter: true },
      { key: 'charging', label: 'Fast Charge', values: { s24: 45, ip16: 27, x14: 90 }, unit: 'W', higherIsBetter: true },
      { key: 'weight', label: 'Weight', values: { s24: 232, ip16: 227, x14: 220 }, unit: 'g', higherIsBetter: false },
      { key: 'waterproof', label: 'Water Resistant', values: { s24: true, ip16: true, x14: true } },
      { key: 'spen', label: 'Stylus Support', values: { s24: true, ip16: false, x14: false } },
      { key: 'os', label: 'Operating System', values: { s24: 'Android 14', ip16: 'iOS 18', x14: 'Android 14' } },
    ],
    highlightDifferences: true,
  },
};

export const LaptopComparison: Story = {
  name: 'Laptops: Gaming vs Ultrabook',
  args: {
    products: [
      { id: 'rog', name: 'ASUS ROG Strix G16', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=200&h=200&fit=crop', price: 18_500_000 },
      { id: 'xps', name: 'Dell XPS 15', image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=200&h=200&fit=crop', price: 21_000_000 },
    ],
    specs: [
      { key: 'cpu', label: 'Processor', values: { rog: 'i7-14700HX', xps: 'i7-13700H' } },
      { key: 'gpu', label: 'Graphics', values: { rog: 'RTX 4070 8GB', xps: 'RTX 4060 6GB' } },
      { key: 'ram', label: 'RAM', values: { rog: 32, xps: 16 }, unit: 'GB', higherIsBetter: true },
      { key: 'ssd', label: 'SSD', values: { rog: 1024, xps: 512 }, unit: 'GB', higherIsBetter: true },
      { key: 'display', label: 'Display', values: { rog: '16" QHD 240Hz', xps: '15.6" OLED 60Hz' } },
      { key: 'weight', label: 'Weight', values: { rog: 2.5, xps: 1.86 }, unit: 'kg', higherIsBetter: false },
      { key: 'battery', label: 'Battery Life', values: { rog: 4, xps: 13 }, unit: 'hrs', higherIsBetter: true },
      { key: 'thunderbolt', label: 'Thunderbolt 4', values: { rog: false, xps: true } },
    ],
    highlightDifferences: true,
  },
};

export const FourProducts: Story = {
  name: 'Four Products (Wide Table)',
  args: {
    products: [
      { id: 'm1', name: 'LG 27GP850-B', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200&h=200&fit=crop', price: 5_800_000 },
      { id: 'm2', name: 'Samsung Odyssey G7', image: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=200&h=200&fit=crop', price: 7_200_000 },
      { id: 'm3', name: 'Dell S2722DGM', image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=200&h=200&fit=crop', price: 4_500_000 },
      { id: 'm4', name: 'ASUS VG28UQL1A', image: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=200&h=200&fit=crop', price: 8_900_000 },
    ],
    specs: [
      { key: 'size', label: 'Screen Size', values: { m1: '27"', m2: '27"', m3: '27"', m4: '28"' } },
      { key: 'res', label: 'Resolution', values: { m1: '2560x1440', m2: '2560x1440', m3: '2560x1440', m4: '3840x2160' } },
      { key: 'refresh', label: 'Refresh Rate', values: { m1: 165, m2: 240, m3: 165, m4: 144 }, unit: 'Hz', higherIsBetter: true },
      { key: 'panel', label: 'Panel Type', values: { m1: 'Nano IPS', m2: 'VA', m3: 'VA', m4: 'IPS' } },
      { key: 'response', label: 'Response Time', values: { m1: 1, m2: 1, m3: 1, m4: 1 }, unit: 'ms', higherIsBetter: false },
      { key: 'hdr', label: 'HDR', values: { m1: 'HDR 400', m2: 'HDR 600', m3: 'HDR 400', m4: 'HDR 400' } },
      { key: 'curved', label: 'Curved', values: { m1: false, m2: true, m3: true, m4: false } },
      { key: 'gsync', label: 'G-Sync Compatible', values: { m1: true, m2: true, m3: true, m4: true } },
    ],
    highlightDifferences: true,
  },
};

export const BooleanOnlySpecs: Story = {
  name: 'Boolean-Only Feature Check',
  args: {
    products: [
      { id: 'basic', name: 'GeekShop Basic Plan', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=200&fit=crop', price: 0 },
      { id: 'plus', name: 'GeekShop Plus', image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=200&h=200&fit=crop', price: 99_000 },
      { id: 'pro', name: 'GeekShop Pro', image: 'https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=200&h=200&fit=crop', price: 299_000 },
    ],
    specs: [
      { key: 'free_delivery', label: 'Free Delivery', values: { basic: false, plus: true, pro: true } },
      { key: 'priority', label: 'Priority Support', values: { basic: false, plus: false, pro: true } },
      { key: 'returns', label: 'Extended Returns (30 days)', values: { basic: false, plus: true, pro: true } },
      { key: 'exclusive', label: 'Exclusive Deals', values: { basic: false, plus: true, pro: true } },
      { key: 'early_access', label: 'Early Access to Sales', values: { basic: false, plus: false, pro: true } },
      { key: 'cashback', label: 'Cashback Rewards', values: { basic: false, plus: true, pro: true } },
      { key: 'insurance', label: 'Product Insurance', values: { basic: false, plus: false, pro: true } },
    ],
    highlightDifferences: false,
  },
};

export const MissingValues: Story = {
  name: 'Missing — Partial Data',
  args: {
    products: [
      { id: 'a', name: 'Headphones A', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop', price: 1_200_000 },
      { id: 'b', name: 'Headphones B', image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=200&h=200&fit=crop', price: 2_800_000 },
      { id: 'c', name: 'Headphones C', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&h=200&fit=crop', price: 4_200_000 },
    ],
    specs: [
      { key: 'type', label: 'Type', values: { a: 'In-ear', b: 'Over-ear', c: 'Over-ear' } },
      { key: 'driver', label: 'Driver Size', values: { a: '11mm', b: '40mm' } },
      { key: 'anc', label: 'Active Noise Cancellation', values: { a: false, b: true, c: true } },
      { key: 'battery', label: 'Battery Life', values: { a: 6, c: 30 }, unit: 'hrs', higherIsBetter: true },
      { key: 'bluetooth', label: 'Bluetooth', values: { a: '5.3', b: '5.2', c: '5.3' } },
      { key: 'weight', label: 'Weight', values: { b: 250, c: 254 }, unit: 'g', higherIsBetter: false },
      { key: 'codec', label: 'Hi-Res Codec', values: { b: 'LDAC', c: 'LDAC + aptX Adaptive' } },
    ],
    highlightDifferences: true,
  },
};

export const InteractiveRemoveProducts: Story = {
  name: 'Interactive: Remove Products',
  render: () => {
    const allProducts: DesktopComparisonProduct[] = [
      { id: 'tv1', name: 'Samsung QN85B 65"', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop', price: 12_500_000 },
      { id: 'tv2', name: 'LG C3 OLED 65"', image: 'https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=200&h=200&fit=crop', price: 15_800_000 },
      { id: 'tv3', name: 'Sony A80L OLED 65"', image: 'https://images.unsplash.com/photo-1558888401-3cc1de77652d?w=200&h=200&fit=crop', price: 18_200_000 },
    ];

    const specs: DesktopComparisonSpec[] = [
      { key: 'tech', label: 'Panel Technology', values: { tv1: 'Neo QLED', tv2: 'OLED', tv3: 'OLED' } },
      { key: 'res', label: 'Resolution', values: { tv1: '4K', tv2: '4K', tv3: '4K' } },
      { key: 'refresh', label: 'Refresh Rate', values: { tv1: 120, tv2: 120, tv3: 120 }, unit: 'Hz' },
      { key: 'hdr', label: 'HDR Format', values: { tv1: 'HDR10+', tv2: 'Dolby Vision', tv3: 'Dolby Vision' } },
      { key: 'smart', label: 'Smart Platform', values: { tv1: 'Tizen', tv2: 'webOS', tv3: 'Google TV' } },
      { key: 'hdmi', label: 'HDMI 2.1 Ports', values: { tv1: 4, tv2: 4, tv3: 2 }, higherIsBetter: true },
      { key: 'speakers', label: 'Speaker Output', values: { tv1: 60, tv2: 40, tv3: 50 }, unit: 'W', higherIsBetter: true },
    ];

    const [products, setProducts] = useState(allProducts);

    const handleRemove = useCallback((id: string) => {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }, []);

    const handleReset = useCallback(() => {
      setProducts(allProducts);
    }, []);

    if (products.length === 0) {
      return (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <p style={{ color: '#999', marginBottom: 16 }}>All products removed from comparison.</p>
          <button
            type="button"
            onClick={handleReset}
            style={{ padding: '8px 16px', background: '#FF5000', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}
          >
            Reset Comparison
          </button>
        </div>
      );
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <DesktopComparisonTable
          products={products}
          specs={specs}
          highlightDifferences
          onRemoveProduct={handleRemove}
        />
        <button
          type="button"
          onClick={handleReset}
          style={{ padding: '6px 12px', background: '#fff', border: '1px solid #ddd', borderRadius: 6, cursor: 'pointer', fontSize: 13, alignSelf: 'flex-start' }}
        >
          Reset All Products
        </button>
      </div>
    );
  },
};

export const SingleProduct: Story = {
  name: 'Single Product (Edge Case)',
  args: {
    products: [
      { id: 'solo', name: 'Logitech MX Master 3S', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop', price: 1_350_000 },
    ],
    specs: [
      { key: 'sensor', label: 'Sensor', values: { solo: '8000 DPI' } },
      { key: 'battery', label: 'Battery', values: { solo: '70 days' } },
      { key: 'connection', label: 'Connection', values: { solo: 'Bluetooth + USB-C' } },
      { key: 'weight', label: 'Weight', values: { solo: '141g' } },
      { key: 'buttons', label: 'Buttons', values: { solo: '7' } },
    ],
    highlightDifferences: false,
  },
};

export const ManySpecRows: Story = {
  name: 'Many Spec Rows (15+)',
  args: {
    products: [
      { id: 'p1', name: 'AMD Ryzen 9 7950X', image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=200&h=200&fit=crop', price: 7_200_000 },
      { id: 'p2', name: 'Intel Core i9-14900K', image: 'https://images.unsplash.com/photo-1591799265444-d66432b91588?w=200&h=200&fit=crop', price: 7_800_000 },
    ],
    specs: [
      { key: 'cores', label: 'Cores', values: { p1: 16, p2: 24 }, higherIsBetter: true },
      { key: 'threads', label: 'Threads', values: { p1: 32, p2: 32 } },
      { key: 'base', label: 'Base Clock', values: { p1: 4.5, p2: 3.2 }, unit: 'GHz', higherIsBetter: true },
      { key: 'boost', label: 'Boost Clock', values: { p1: 5.7, p2: 6.0 }, unit: 'GHz', higherIsBetter: true },
      { key: 'l2', label: 'L2 Cache', values: { p1: 16, p2: 32 }, unit: 'MB', higherIsBetter: true },
      { key: 'l3', label: 'L3 Cache', values: { p1: 64, p2: 36 }, unit: 'MB', higherIsBetter: true },
      { key: 'tdp', label: 'TDP', values: { p1: 170, p2: 253 }, unit: 'W', higherIsBetter: false },
      { key: 'socket', label: 'Socket', values: { p1: 'AM5', p2: 'LGA 1700' } },
      { key: 'process', label: 'Process Node', values: { p1: 5, p2: 10 }, unit: 'nm', higherIsBetter: false },
      { key: 'igpu', label: 'Integrated GPU', values: { p1: true, p2: true } },
      { key: 'pcie', label: 'PCIe Version', values: { p1: '5.0', p2: '5.0' } },
      { key: 'ddr5', label: 'DDR5 Support', values: { p1: true, p2: true } },
      { key: 'ddr4', label: 'DDR4 Support', values: { p1: false, p2: true } },
      { key: 'max_mem', label: 'Max Memory', values: { p1: 128, p2: 192 }, unit: 'GB', higherIsBetter: true },
      { key: 'mem_speed', label: 'Max Memory Speed', values: { p1: 5200, p2: 5600 }, unit: 'MHz', higherIsBetter: true },
      { key: 'ecc', label: 'ECC Support', values: { p1: true, p2: true } },
    ],
    highlightDifferences: true,
  },
};
