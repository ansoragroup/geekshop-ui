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

// --- Smartphone specs ---
export const SmartphoneSpecs: Story = {
  name: 'Samsung Galaxy S24 Ultra',
  args: {
    specs: [
      { label: 'Brend', value: 'Samsung' },
      { label: 'Model', value: 'Galaxy S24 Ultra' },
      { label: 'Ekran', value: '6.8" Dynamic AMOLED 2X' },
      { label: 'Protsessor', value: 'Snapdragon 8 Gen 3' },
      { label: 'RAM', value: '12 GB' },
      { label: 'Xotira', value: '256 GB / 512 GB / 1 TB' },
      { label: 'Asosiy kamera', value: '200 MP f/1.7 OIS' },
      { label: 'Batareya', value: '5000 mAh' },
      { label: 'Quvvatlash', value: '45W simli, 15W simsiz' },
      { label: 'S Pen', value: 'Ha, Bluetooth' },
      { label: 'Suv himoyasi', value: 'IP68' },
      { label: 'Og\'irligi', value: '232 g' },
    ],
  },
};

// --- Two specs (minimal) ---
export const MinimalSpecs: Story = {
  name: 'Minimal (2 Specs)',
  args: {
    specs: [
      { label: 'Kafolat', value: '12 oy' },
      { label: 'Yetkazib berish', value: 'Bepul (Toshkent)' },
    ],
  },
};

// --- Long values ---
export const LongValues: Story = {
  name: 'Long Spec Values',
  args: {
    specs: [
      { label: 'WiFi', value: 'Wi-Fi 7 (802.11be), tri-band 2.4 GHz / 5 GHz / 6 GHz, HE160, MIMO' },
      { label: 'Bluetooth', value: 'Bluetooth 5.4 with LE Audio, Auracast, dual audio streaming' },
      { label: 'Sensorlar', value: "Akselerometr, barometr, barmoq izi (ultrasonik), giroskop, magnit, yaqinlik, yorug'lik" },
      { label: 'Portlar', value: '2x USB-C (Thunderbolt 4), 2x USB-A 3.2, HDMI 2.1, RJ-45, 3.5mm audio' },
      { label: 'Video yozish', value: "8K @ 30fps, 4K @ 120fps / 60fps / 30fps, 1080p @ 60fps / 30fps, HDR10+" },
    ],
  },
};

// --- Laptop specs ---
export const LaptopSpecs: Story = {
  name: 'ASUS ROG Laptop Specs',
  args: {
    specs: [
      { label: 'Brend', value: 'ASUS' },
      { label: 'Seriya', value: 'ROG Strix G16' },
      { label: 'Protsessor', value: 'Intel Core i9-14900HX (24 yadro)' },
      { label: 'GPU', value: 'NVIDIA RTX 4070 8GB GDDR6' },
      { label: 'RAM', value: '32GB DDR5 5600 MHz' },
      { label: 'SSD', value: '1TB NVMe PCIe 4.0' },
      { label: 'Ekran', value: '16" QHD+ 240Hz IPS' },
      { label: 'WiFi', value: 'WiFi 6E (802.11ax)' },
      { label: 'Batareya', value: '90 Wh' },
      { label: 'Og\'irligi', value: '2.5 kg' },
      { label: "O'lchamlari", value: '354 x 264 x 22.7 mm' },
    ],
  },
};

// --- Monitor specs ---
export const MonitorSpecs: Story = {
  name: 'Dell 4K Monitor',
  args: {
    specs: [
      { label: 'Brend', value: 'Dell' },
      { label: 'Model', value: 'UltraSharp U2723QE' },
      { label: "Ekran o'lchami", value: '27"' },
      { label: 'Rezolutsiya', value: '3840 x 2160 (4K UHD)' },
      { label: 'Panel turi', value: 'IPS Black' },
      { label: 'Yangilanish tezligi', value: '60 Hz' },
      { label: 'Javob vaqti', value: '5ms (GtG)' },
      { label: 'Rang gamuti', value: '98% DCI-P3' },
      { label: 'HDR', value: 'HDR 400' },
      { label: 'Portlar', value: 'USB-C (90W PD), HDMI 2.0, DP 1.4, USB-A hub' },
      { label: 'Balandlik sozlash', value: 'Ha (150mm)' },
    ],
  },
};

// --- Single spec ---
export const SingleSpec: Story = {
  name: 'Single Spec Row',
  args: {
    specs: [
      { label: 'Kafolat', value: '24 oy rasmiy kafolat' },
    ],
  },
};

// --- Appliance specs ---
export const ApplianceSpecs: Story = {
  name: 'Washing Machine Specs (UZ)',
  args: {
    specs: [
      { label: 'Brend', value: 'Samsung' },
      { label: 'Model', value: 'WW90T554DAT' },
      { label: "Sig'imi", value: '9 kg' },
      { label: 'Energiya sinfi', value: 'A+++' },
      { label: 'Centrifuga tezligi', value: '1400 RPM' },
      { label: "Shovqin (yuvish)", value: '52 dB' },
      { label: "Shovqin (centrifuga)", value: '73 dB' },
      { label: 'Dasturlar soni', value: '23 ta yuvish dasturi' },
      { label: 'Smart funksiyalar', value: 'WiFi, SmartThings ilova' },
      { label: 'Bug\' yuvish', value: 'Ha' },
      { label: 'Tezkor yuvish', value: '15 daqiqa' },
      { label: "O'lchamlari", value: '600 x 850 x 550 mm' },
      { label: 'Og\'irligi', value: '68 kg' },
      { label: 'Rangi', value: 'Inox (Titanium)' },
    ],
  },
};
