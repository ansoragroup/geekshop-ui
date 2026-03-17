import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DesktopShareSheet } from './DesktopShareSheet';

const meta = {
  title: 'Feedback (Desktop)/DesktopShareSheet',
  component: DesktopShareSheet,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600, padding: 24, background: '#fff', borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopShareSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    url: 'https://geekshop.uz/product/rtx-4060',
    title: 'MSI GeForce RTX 4060 VENTUS 2X BLACK 8G OC',
    onShare: fn(),
  },
};

export const SelectedPlatforms: Story = {
  args: {
    platforms: ['link', 'telegram', 'whatsapp'],
    url: 'https://geekshop.uz/product/galaxy-s24',
    title: 'Samsung Galaxy S24 Ultra',
    onShare: fn(),
  },
};

export const LinkOnly: Story = {
  args: {
    platforms: ['link'],
    url: 'https://geekshop.uz/deals/flash-sale',
    onShare: fn(),
  },
};

export const AllPlatforms: Story = {
  args: {
    platforms: ['link', 'facebook', 'twitter', 'telegram', 'whatsapp'],
    url: 'https://geekshop.uz/product/iphone-16-pro',
    title: 'Apple iPhone 16 Pro 256GB - Best Price in Uzbekistan',
    onShare: fn(),
  },
};
