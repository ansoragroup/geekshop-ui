import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopAddressBookPage } from './DesktopAddressBookPage';
import type { DesktopAddress } from '../../components';

const meta = {
  title: 'Pages (Desktop)/DesktopAddressBookPage',
  component: DesktopAddressBookPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopAddressBookPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  name: 'No Addresses',
  args: {
    addresses: [],
  },
};

export const SingleAddress: Story = {
  args: {
    addresses: [
      {
        id: 'addr-1',
        name: 'Dilshod Rahimov',
        phone: '+998 94 555 66 77',
        street: 'Registon maydoni, 3-uy',
        city: 'Samarqand',
        region: 'Samarqand viloyati',
        postalCode: '140100',
        isDefault: true,
        label: 'Uy',
      },
    ] satisfies DesktopAddress[],
  },
};

export const ManyAddresses: Story = {
  name: 'Many Addresses (6)',
  args: {
    addresses: [
      {
        id: 'addr-1',
        name: 'Jasur Karimov',
        phone: '+998 90 123 45 67',
        street: "Amir Temur ko'chasi, 15-uy, 42-xonadon",
        city: 'Toshkent',
        region: 'Toshkent shahri',
        postalCode: '100000',
        isDefault: true,
        label: 'Uy',
      },
      {
        id: 'addr-2',
        name: 'Jasur Karimov',
        phone: '+998 90 123 45 67',
        street: "Mustaqillik ko'chasi, 59-uy, 3-qavat",
        city: 'Toshkent',
        region: 'Chilonzor tumani',
        postalCode: '100115',
        isDefault: false,
        label: 'Ish',
      },
      {
        id: 'addr-3',
        name: 'Anvar Karimov',
        phone: '+998 71 234 56 78',
        street: "Navoiy ko'chasi, 28-uy",
        city: 'Samarqand',
        region: 'Samarqand viloyati',
        postalCode: '140100',
        isDefault: false,
        label: 'Ota-ona',
      },
      {
        id: 'addr-4',
        name: 'Jasur Karimov',
        phone: '+998 90 123 45 67',
        street: "Minor ko'chasi, 7-uy",
        city: 'Toshkent',
        region: 'Mirzo Ulugbek tumani',
        postalCode: '100060',
        isDefault: false,
        label: 'Ombor',
      },
      {
        id: 'addr-5',
        name: 'Fotima Karimova',
        phone: '+998 93 876 54 32',
        street: "Istiqlol ko'chasi, 12-A",
        city: 'Buxoro',
        region: 'Buxoro viloyati',
        postalCode: '200100',
        isDefault: false,
        label: 'Opa',
      },
      {
        id: 'addr-6',
        name: 'Jasur Karimov',
        phone: '+998 90 123 45 67',
        street: 'Tashkent City Mall, 3-qavat, A-302',
        city: 'Toshkent',
        region: 'Sergeli tumani',
        postalCode: '100204',
        isDefault: false,
        label: 'Ofis',
      },
    ] satisfies DesktopAddress[],
  },
};

export const DifferentCities: Story = {
  args: {
    addresses: [
      {
        id: 'addr-1',
        name: 'Bekzod Tursunov',
        phone: '+998 91 456 78 90',
        street: "Navoiy ko'chasi, 42-uy",
        city: 'Samarqand',
        region: 'Samarqand viloyati',
        postalCode: '140100',
        isDefault: true,
        label: 'Uy',
      },
      {
        id: 'addr-2',
        name: 'Sardor Tursunov',
        phone: '+998 93 111 22 33',
        street: 'Buyuk Ipak Yoli, 88-uy',
        city: 'Namangan',
        region: 'Namangan viloyati',
        postalCode: '160000',
        isDefault: false,
        label: 'Aka',
      },
      {
        id: 'addr-3',
        name: 'Zuhra Tursunova',
        phone: '+998 95 444 55 66',
        street: "Al-Xorazmiy ko'chasi, 5-uy",
        city: 'Urganch',
        region: 'Xorazm viloyati',
        postalCode: '220100',
        isDefault: false,
        label: 'Buvi',
      },
    ] satisfies DesktopAddress[],
  },
};
