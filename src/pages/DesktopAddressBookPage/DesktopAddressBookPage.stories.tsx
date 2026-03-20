import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopAddressBookPage } from './DesktopAddressBookPage';

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
  name: 'Single Address',
  args: {
    addresses: [
      {
        id: 'addr-1',
        name: 'Dilshod Rahimov',
        phone: '+998 94 555 66 77',
        street: "Registon maydoni, 3-uy",
        city: 'Samarqand',
        region: 'Samarqand viloyati',
        postalCode: '140100',
        isDefault: true,
        label: 'Uy',
      },
    ],
  },
};
