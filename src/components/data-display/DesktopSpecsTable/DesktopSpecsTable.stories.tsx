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

export const CustomTitle: Story = {
  name: 'Custom Section Title',
  args: {
    title: 'Technical Details',
    specs: [
      { label: 'Processor', value: 'Apple M3 Pro (12-core CPU, 18-core GPU)' },
      { label: 'Memory', value: '36 GB Unified Memory' },
      { label: 'Storage', value: '1TB SSD' },
      { label: 'Display', value: '16.2" Liquid Retina XDR' },
      { label: 'Battery', value: 'Up to 22 hours' },
      { label: 'Ports', value: 'HDMI, SDXC, 3x Thunderbolt 4, MagSafe 3' },
    ],
  },
};

export const TwoSpecs: Story = {
  name: 'Minimal (2 Specs)',
  args: {
    title: 'Quick Info',
    specs: [
      { label: 'Warranty', value: '24 months manufacturer warranty' },
      { label: 'In the Box', value: 'Device, USB-C cable, Quick start guide' },
    ],
    columns: 1,
  },
};

export const LongValues: Story = {
  name: 'Long Spec Values',
  args: {
    title: 'Connectivity & Features',
    specs: [
      { label: 'WiFi', value: 'Wi-Fi 7 (802.11be), tri-band 2.4 GHz / 5 GHz / 6 GHz, HE160, MIMO, 4096-QAM' },
      { label: 'Bluetooth', value: 'Bluetooth 5.4 with LE Audio, Auracast, dual audio streaming support' },
      { label: 'NFC', value: 'Yes, with support for Google Pay, Samsung Pay, and transit cards in 25+ countries' },
      { label: 'Sensors', value: 'Accelerometer, barometer, fingerprint (ultrasonic under-display), gyro, geomagnetic, hall, light, proximity' },
      { label: 'Audio', value: 'Stereo speakers tuned by AKG, Dolby Atmos, 360 Audio with head tracking, Hi-Res Audio certified' },
      { label: 'Video Recording', value: '8K @ 30fps, 4K @ 120fps / 60fps / 30fps, 1080p @ 60fps / 30fps, gyro-EIS + OIS, HDR10+' },
    ],
    columns: 1,
  },
};

export const GroupedLaptopSpecs: Story = {
  name: 'Grouped: Laptop Full Specs',
  args: {
    specs: [],
    title: 'ASUS ROG Strix G16 Specifications',
    groups: [
      {
        title: 'Processor & Memory',
        specs: [
          { label: 'CPU', value: 'Intel Core i9-14900HX' },
          { label: 'CPU Cores / Threads', value: '24 cores / 32 threads' },
          { label: 'RAM', value: '32GB DDR5 5600 MHz' },
          { label: 'Max RAM', value: '64GB (2 SO-DIMM slots)' },
        ],
      },
      {
        title: 'Graphics',
        specs: [
          { label: 'GPU', value: 'NVIDIA RTX 4070 8GB GDDR6' },
          { label: 'MUX Switch', value: 'Yes (Advanced Optimus)' },
          { label: 'TGP', value: '140W' },
        ],
      },
      {
        title: 'Display',
        specs: [
          { label: 'Size', value: '16" (16:10 aspect ratio)' },
          { label: 'Resolution', value: '2560 x 1600 (QHD+)' },
          { label: 'Refresh Rate', value: '240 Hz' },
          { label: 'Panel Type', value: 'IPS, 100% DCI-P3' },
          { label: 'Response Time', value: '3ms' },
        ],
      },
      {
        title: 'Storage & Connectivity',
        specs: [
          { label: 'SSD', value: '1TB NVMe PCIe 4.0' },
          { label: 'Extra M.2 Slot', value: 'Yes (PCIe 4.0)' },
          { label: 'WiFi', value: 'WiFi 6E (802.11ax)' },
          { label: 'Bluetooth', value: '5.3' },
          { label: 'Ports', value: '2x USB-C (Thunderbolt 4), 2x USB-A 3.2, HDMI 2.1, RJ-45, 3.5mm' },
        ],
      },
      {
        title: 'Physical',
        specs: [
          { label: 'Weight', value: '2.5 kg' },
          { label: 'Dimensions', value: '354 x 264 x 22.7 mm' },
          { label: 'Battery', value: '90 Wh' },
          { label: 'Charger', value: '280W barrel plug' },
        ],
      },
    ],
  },
};

export const ApplianceSpecs: Story = {
  name: 'Home Appliance (Washing Machine)',
  args: {
    title: 'Samsung WW90T554DAT Specifications',
    specs: [
      { label: 'Capacity', value: '9 kg' },
      { label: 'Energy Rating', value: 'A+++' },
      { label: 'Spin Speed', value: '1400 RPM' },
      { label: 'Noise Level (Wash)', value: '52 dB' },
      { label: 'Noise Level (Spin)', value: '73 dB' },
      { label: 'Programs', value: '23 wash programs' },
      { label: 'Smart Features', value: 'WiFi, SmartThings app' },
      { label: 'Drum Type', value: 'Diamond Drum' },
      { label: 'Steam Wash', value: 'Yes' },
      { label: 'Quick Wash', value: '15 min' },
      { label: 'Dimensions', value: '600 x 850 x 550 mm' },
      { label: 'Weight', value: '68 kg' },
      { label: 'Color', value: 'Inox (Titanium)' },
      { label: 'Warranty', value: '10 years motor, 2 years parts' },
    ],
    columns: 2,
  },
};

export const SingleColumnGrouped: Story = {
  name: 'Single Column with Groups',
  args: {
    specs: [],
    title: 'Camera Specifications',
    columns: 1,
    groups: [
      {
        title: 'Body',
        specs: [
          { label: 'Type', value: 'Mirrorless interchangeable lens' },
          { label: 'Sensor', value: 'Full-frame CMOS (35.9 x 23.9mm)' },
          { label: 'Megapixels', value: '61.0 MP effective' },
          { label: 'Mount', value: 'Sony E-mount' },
        ],
      },
      {
        title: 'Performance',
        specs: [
          { label: 'ISO Range', value: '100-32000 (expandable to 50-102400)' },
          { label: 'Burst Rate', value: '10 fps (mechanical), 5 fps (e-shutter)' },
          { label: 'AF Points', value: '567 phase-detection + 425 contrast-detection' },
          { label: 'Video', value: '4K 30fps, Full HD 120fps' },
        ],
      },
    ],
  },
};

export const EmptySpecs: Story = {
  name: 'Empty Specs Array',
  args: {
    title: 'Specifications',
    specs: [],
  },
};
