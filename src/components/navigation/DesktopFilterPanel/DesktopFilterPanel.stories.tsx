import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopFilterPanel, type DesktopFilterGroup } from './DesktopFilterPanel';

const meta = {
  title: 'Navigation (Desktop)/DesktopFilterPanel',
  component: DesktopFilterPanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopFilterPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleGroups: DesktopFilterGroup[] = [
  {
    key: 'brand',
    title: 'Brand',
    type: 'checkbox',
    options: [
      { value: 'asus', label: 'ASUS', count: 42 },
      { value: 'msi', label: 'MSI', count: 38 },
      { value: 'gigabyte', label: 'Gigabyte', count: 25 },
      { value: 'evga', label: 'EVGA', count: 18 },
      { value: 'zotac', label: 'Zotac', count: 12 },
    ],
  },
  {
    key: 'price',
    title: 'Price Range',
    type: 'priceRange',
  },
  {
    key: 'memory',
    title: 'Memory (VRAM)',
    type: 'checkbox',
    options: [
      { value: '8gb', label: '8 GB', count: 24 },
      { value: '12gb', label: '12 GB', count: 31 },
      { value: '16gb', label: '16 GB', count: 18 },
      { value: '24gb', label: '24 GB', count: 8 },
    ],
  },
  {
    key: 'chipset',
    title: 'Chipset',
    type: 'checkbox',
    options: [
      { value: 'rtx4090', label: 'RTX 4090', count: 12 },
      { value: 'rtx4080', label: 'RTX 4080', count: 15 },
      { value: 'rtx4070ti', label: 'RTX 4070 Ti', count: 20 },
      { value: 'rx7900xtx', label: 'RX 7900 XTX', count: 8 },
      { value: 'rx7800xt', label: 'RX 7800 XT', count: 10 },
    ],
  },
];

export const Default: Story = {
  args: {
    groups: sampleGroups,
  },
};

export const WithPreselectedValues: Story = {
  args: {
    groups: sampleGroups,
    values: {
      brand: ['asus', 'msi'],
      memory: ['12gb'],
      price: { min: '1000000', max: '15000000' },
    },
  },
};

export const SingleGroup: Story = {
  args: {
    groups: [
      {
        key: 'category',
        title: 'Category',
        type: 'checkbox',
        options: [
          { value: 'gpu', label: 'Graphics Cards', count: 156 },
          { value: 'cpu', label: 'Processors', count: 98 },
          { value: 'ram', label: 'Memory', count: 72 },
          { value: 'ssd', label: 'Storage', count: 145 },
          { value: 'mobo', label: 'Motherboards', count: 64 },
        ],
      },
    ],
  },
};

export const PriceOnly: Story = {
  args: {
    groups: [
      { key: 'price', title: 'Price Range (UZS)', type: 'priceRange' },
    ],
  },
};
