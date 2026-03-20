import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopQRCode } from './DesktopQRCode';

const meta = {
  title: 'Data Display (Desktop)/DesktopQRCode',
  component: DesktopQRCode,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    onDownload: { action: 'download clicked' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 900, padding: 24, background: '#f5f5f5', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopQRCode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'https://geekshop.uz/order/GS-2026-0047',
    size: 200,
    label: 'Scan to track your order',
  },
};

export const WithDownload: Story = {
  args: {
    value: 'https://geekshop.uz/product/msi-rtx-4060',
    size: 200,
    label: 'Share this product',
    downloadable: true,
  },
};

export const Large: Story = {
  args: {
    value: 'https://geekshop.uz/store/invitation',
    size: 280,
    label: 'Invite friends & earn rewards',
    downloadable: true,
    level: 'H',
  },
};

export const Small: Story = {
  args: {
    value: 'https://geekshop.uz/pay/12345',
    size: 140,
    level: 'L',
  },
};

export const NoLabel: Story = {
  args: {
    value: 'https://geekshop.uz/order/receipt/9876',
    size: 180,
  },
};

export const MultipleCodes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
      <DesktopQRCode
        value="https://geekshop.uz/app/ios"
        size={160}
        label="iOS App"
        downloadable
      />
      <DesktopQRCode
        value="https://geekshop.uz/app/android"
        size={160}
        label="Android App"
        downloadable
      />
      <DesktopQRCode
        value="https://geekshop.uz/app/huawei"
        size={160}
        label="AppGallery"
        downloadable
      />
    </div>
  ),
};
