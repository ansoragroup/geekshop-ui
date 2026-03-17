import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopSpecsTable } from './DesktopSpecsTable';

const meta = {
  title: 'Data Display (Desktop)/DesktopSpecsTable',
  component: DesktopSpecsTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 800, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopSpecsTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const gpuSpecs = [
  { label: 'Brand', value: 'MSI' },
  { label: 'GPU', value: 'GeForce RTX 4060' },
  { label: 'Memory', value: '8GB GDDR6' },
  { label: 'Clock Speed', value: '2460 MHz' },
  { label: 'Interface', value: 'PCIe 4.0 x16' },
  { label: 'TDP', value: '115W' },
  { label: 'Ports', value: '3x DisplayPort + 1x HDMI 2.1' },
  { label: 'Cooling', value: 'Dual Fan (Ventus 2X)' },
];

export const Default: Story = {
  args: {
    specs: gpuSpecs,
  },
};

export const Grouped: Story = {
  args: {
    specs: [],
    title: 'Product Specifications',
    groups: [
      {
        title: 'General',
        specs: [
          { label: 'Brand', value: 'MSI' },
          { label: 'Model', value: 'Ventus 2X OC' },
          { label: 'Release Year', value: '2023' },
          { label: 'Warranty', value: '3 Years' },
        ],
      },
      {
        title: 'Performance',
        specs: [
          { label: 'GPU', value: 'GeForce RTX 4060' },
          { label: 'Architecture', value: 'Ada Lovelace' },
          { label: 'CUDA Cores', value: '3072' },
          { label: 'Base Clock', value: '1830 MHz' },
          { label: 'Boost Clock', value: '2460 MHz' },
        ],
      },
      {
        title: 'Memory',
        specs: [
          { label: 'Type', value: 'GDDR6' },
          { label: 'Size', value: '8GB' },
          { label: 'Bus Width', value: '128-bit' },
          { label: 'Bandwidth', value: '272 GB/s' },
        ],
      },
    ],
  },
};

export const SingleColumn: Story = {
  args: {
    specs: gpuSpecs,
    columns: 1,
    title: 'Key Specifications',
  },
};

export const ManySpecs: Story = {
  args: {
    specs: [
      { label: 'Brand', value: 'Samsung' },
      { label: 'Model', value: 'Galaxy S24 Ultra' },
      { label: 'OS', value: 'Android 14 (One UI 6.1)' },
      { label: 'Chipset', value: 'Snapdragon 8 Gen 3' },
      { label: 'CPU', value: 'Octa-core (1x3.39 GHz + 3x3.1 GHz + 4x2.2 GHz)' },
      { label: 'GPU', value: 'Adreno 750' },
      { label: 'RAM', value: '12GB' },
      { label: 'Storage', value: '256GB / 512GB / 1TB' },
      { label: 'Display', value: '6.8" Dynamic AMOLED 2X' },
      { label: 'Resolution', value: '3120 x 1440 (QHD+)' },
      { label: 'Refresh Rate', value: '120Hz adaptive' },
      { label: 'Main Camera', value: '200MP f/1.7 OIS' },
      { label: 'Ultrawide', value: '12MP f/2.2' },
      { label: 'Telephoto 1', value: '50MP f/2.4 (5x optical)' },
      { label: 'Telephoto 2', value: '10MP f/2.4 (3x optical)' },
      { label: 'Front Camera', value: '12MP f/2.2' },
      { label: 'Battery', value: '5000 mAh' },
      { label: 'Charging', value: '45W wired, 15W wireless' },
      { label: 'S Pen', value: 'Included, Bluetooth' },
      { label: 'Weight', value: '232g' },
      { label: 'Dimensions', value: '162.3 x 79 x 8.6 mm' },
      { label: 'Colors', value: 'Titanium Black, Gray, Violet, Yellow' },
      { label: 'Water Resistance', value: 'IP68' },
      { label: 'NFC', value: 'Yes' },
    ],
    title: 'Full Specifications',
  },
};
