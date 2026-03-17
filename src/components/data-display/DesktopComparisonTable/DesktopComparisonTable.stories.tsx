import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopComparisonTable } from './DesktopComparisonTable';

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

const gpuProducts = [
  {
    id: 'rtx4060',
    name: 'MSI RTX 4060 Ventus 2X',
    image: 'https://picsum.photos/seed/gpu1/200/200',
    price: 5_400_000,
  },
  {
    id: 'rtx4070',
    name: 'ASUS RTX 4070 Dual OC',
    image: 'https://picsum.photos/seed/gpu2/200/200',
    price: 8_200_000,
  },
  {
    id: 'rx7800',
    name: 'Sapphire RX 7800 XT Pulse',
    image: 'https://picsum.photos/seed/gpu3/200/200',
    price: 7_100_000,
  },
];

const gpuSpecs = [
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
