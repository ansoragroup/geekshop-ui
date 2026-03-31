import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComparisonTable } from './ComparisonTable';
import type { ComparisonProduct, ComparisonSpec } from './ComparisonTable';

const meta = {
  title: 'Data Display/ComparisonTable',
  component: ComparisonTable,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 390, padding: 16, background: '#F5F5F5', borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ComparisonTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleProducts: ComparisonProduct[] = [
  {
    id: 'p1',
    name: 'iPhone 15 Pro',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=128&h=128&fit=crop',
    price: 14990000,
  },
  {
    id: 'p2',
    name: 'Samsung Galaxy S24',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=128&h=128&fit=crop',
    price: 12990000,
  },
];

const sampleSpecs: ComparisonSpec[] = [
  { key: 'screen', label: 'Ekran', values: { p1: '6.1"', p2: '6.2"' } },
  { key: 'ram', label: 'RAM', values: { p1: 8, p2: 8 }, unit: 'GB', higherIsBetter: true },
  {
    key: 'storage',
    label: 'Xotira',
    values: { p1: 256, p2: 256 },
    unit: 'GB',
    higherIsBetter: true,
  },
  {
    key: 'battery',
    label: 'Batareya',
    values: { p1: 3274, p2: 4000 },
    unit: 'mAh',
    higherIsBetter: true,
  },
  { key: 'camera', label: 'Kamera', values: { p1: 48, p2: 50 }, unit: 'MP', higherIsBetter: true },
  { key: 'nfc', label: 'NFC', values: { p1: true, p2: true } },
  { key: '5g', label: '5G', values: { p1: true, p2: true } },
];

export const Default: Story = {
  args: {
    products: sampleProducts,
    specs: sampleSpecs,
  },
};

export const WithHighlights: Story = {
  args: {
    products: sampleProducts,
    specs: sampleSpecs,
    highlightDifferences: true,
  },
};

export const WithStickyHeader: Story = {
  args: {
    products: sampleProducts,
    specs: sampleSpecs,
    stickyHeader: true,
    highlightDifferences: true,
  },
};

export const ThreeProducts: Story = {
  args: {
    products: [
      ...sampleProducts,
      {
        id: 'p3',
        name: 'Pixel 8 Pro',
        image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=128&h=128&fit=crop',
        price: 9990000,
      },
    ],
    specs: [
      { key: 'screen', label: 'Ekran', values: { p1: '6.1"', p2: '6.2"', p3: '6.7"' } },
      {
        key: 'ram',
        label: 'RAM',
        values: { p1: 8, p2: 8, p3: 12 },
        unit: 'GB',
        higherIsBetter: true,
      },
      {
        key: 'storage',
        label: 'Xotira',
        values: { p1: 256, p2: 256, p3: 128 },
        unit: 'GB',
        higherIsBetter: true,
      },
      {
        key: 'battery',
        label: 'Batareya',
        values: { p1: 3274, p2: 4000, p3: 5050 },
        unit: 'mAh',
        higherIsBetter: true,
      },
      {
        key: 'camera',
        label: 'Kamera',
        values: { p1: 48, p2: 50, p3: 50 },
        unit: 'MP',
        higherIsBetter: true,
      },
      {
        key: 'weight',
        label: 'Vazn',
        values: { p1: 187, p2: 168, p3: 213 },
        unit: 'g',
        higherIsBetter: false,
      },
    ],
    highlightDifferences: true,
  },
};

export const WithRemoveButtons: Story = {
  args: {
    products: sampleProducts.map((p) => ({
      ...p,
      onRemove: () => console.log(`Remove ${p.name}`),
    })),
    specs: sampleSpecs,
    highlightDifferences: true,
  },
};

export const GPUComparison: Story = {
  args: {
    products: [
      {
        id: 'rtx4090',
        name: 'RTX 4090',
        image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=128&h=128&fit=crop',
        price: 22990000,
      },
      {
        id: 'rtx4080',
        name: 'RTX 4080',
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=128&h=128&fit=crop',
        price: 15990000,
      },
    ],
    specs: [
      {
        key: 'vram',
        label: 'VRAM',
        values: { rtx4090: 24, rtx4080: 16 },
        unit: 'GB',
        higherIsBetter: true,
      },
      {
        key: 'cores',
        label: 'CUDA Cores',
        values: { rtx4090: 16384, rtx4080: 9728 },
        higherIsBetter: true,
      },
      {
        key: 'clock',
        label: 'Boost Clock',
        values: { rtx4090: 2520, rtx4080: 2505 },
        unit: 'MHz',
        higherIsBetter: true,
      },
      {
        key: 'tdp',
        label: 'TDP',
        values: { rtx4090: 450, rtx4080: 320 },
        unit: 'W',
        higherIsBetter: false,
      },
      { key: 'bus', label: 'Bus', values: { rtx4090: '384-bit', rtx4080: '256-bit' } },
      { key: 'ray', label: 'RT Cores', values: { rtx4090: true, rtx4080: true } },
      { key: 'dlss3', label: 'DLSS 3', values: { rtx4090: true, rtx4080: true } },
    ],
    highlightDifferences: true,
  },
};
