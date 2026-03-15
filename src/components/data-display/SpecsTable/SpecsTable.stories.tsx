import type { Meta, StoryObj } from '@storybook/react-vite';
import { SpecsTable } from './SpecsTable';

const meta = {
  title: 'Data Display/SpecsTable',
  component: SpecsTable,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 16, background: '#F5F5F5', borderRadius: 12, width: 390 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SpecsTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- GPU specs ---
export const GPUSpecs: Story = {
  name: 'RTX 4060 Specs',
  args: {
    specs: [
      { label: 'Brend', value: 'MSI' },
      { label: 'Model', value: 'GeForce RTX 4060 VENTUS 2X 8G OC' },
      { label: 'GPU', value: 'NVIDIA AD107' },
      { label: 'Xotira', value: '8GB GDDR6' },
      { label: 'Shina kengligi', value: '128-bit' },
      { label: 'Boost Clock', value: '2490 MHz' },
      { label: 'TDP', value: '115W' },
      { label: 'Ulanish', value: 'PCIe 4.0 x8' },
      { label: 'Chiqishlar', value: '3x DisplayPort 1.4a, 1x HDMI 2.1' },
      { label: 'Kafolat', value: '3 yil' },
    ],
  },
};

// --- Product delivery info ---
export const DeliveryInfo: Story = {
  name: 'Delivery & Stock Info',
  args: {
    specs: [
      { label: 'Yetkazib berish', value: '1-3 kunda' },
      { label: 'Stok', value: '12 dona' },
      { label: 'Brend', value: 'MSI' },
      { label: 'Kafolat', value: '3 yil' },
      { label: 'Sotuvchi', value: 'GeekShop.uz' },
      { label: "To'lov", value: "Naqd, Click, Payme, Uzum" },
    ],
  },
};

// --- CPU specs ---
export const CPUSpecs: Story = {
  name: 'Ryzen 7 7800X3D Specs',
  args: {
    specs: [
      { label: 'Brend', value: 'AMD' },
      { label: 'Model', value: 'Ryzen 7 7800X3D' },
      { label: 'Yadro / Iplar', value: '8 / 16' },
      { label: 'Asosiy chastota', value: '4.2 GHz' },
      { label: 'Boost chastota', value: '5.0 GHz' },
      { label: 'Kesh (L3)', value: '96 MB (3D V-Cache)' },
      { label: 'TDP', value: '120W' },
      { label: 'Soket', value: 'AM5' },
      { label: 'Jarayon texnologiyasi', value: '5nm' },
    ],
  },
};

// --- RAM specs ---
export const RAMSpecs: Story = {
  name: 'DDR5 RAM Specs',
  args: {
    specs: [
      { label: 'Brend', value: 'Kingston' },
      { label: 'Model', value: 'FURY Beast DDR5' },
      { label: 'Sig\'imi', value: '32GB (2x16GB)' },
      { label: 'Tezlik', value: '6000 MHz' },
      { label: 'Turi', value: 'DDR5' },
      { label: 'CAS Latency', value: 'CL30' },
      { label: 'Kuchlanish', value: '1.35V' },
      { label: 'XMP 3.0', value: 'Ha' },
    ],
  },
};
