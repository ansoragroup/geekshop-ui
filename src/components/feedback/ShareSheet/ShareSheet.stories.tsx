import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ShareSheet } from './ShareSheet';
import { Button } from '../../form/Button';

const meta = {
  title: 'Feedback/ShareSheet',
  component: ShareSheet,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 390, height: 600, position: 'relative', background: '#F5F5F5', padding: 24, borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ShareSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <>
        <Button onClick={() => setVisible(true)}>Ulashish</Button>
        <ShareSheet
          visible={visible}
          onClose={() => setVisible(false)}
          url="https://geekshop.uz/product/iphone-15-pro-max"
          title="iPhone 15 Pro Max"
          description="256GB Titanium - 14 990 000 so'm"
        />
      </>
    );
  },
};

export const TelegramOnly: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <>
        <Button onClick={() => setVisible(true)}>Telegram orqali ulashish</Button>
        <ShareSheet
          visible={visible}
          onClose={() => setVisible(false)}
          url="https://geekshop.uz/product/rtx-4090"
          title="NVIDIA RTX 4090"
          platforms={['telegram']}
        />
      </>
    );
  },
};

export const WithoutCopyLink: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <>
        <Button onClick={() => setVisible(true)}>Ulashish (copy link yo'q)</Button>
        <ShareSheet
          visible={visible}
          onClose={() => setVisible(false)}
          url="https://geekshop.uz/product/macbook-air-m3"
          title="MacBook Air M3"
          showCopyLink={false}
        />
      </>
    );
  },
};

export const MessagingPlatforms: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <>
        <Button onClick={() => setVisible(true)}>Xabar orqali ulashish</Button>
        <ShareSheet
          visible={visible}
          onClose={() => setVisible(false)}
          url="https://geekshop.uz/deal/flash-sale"
          title="Chaqmoq aksiya!"
          description="50% gacha chegirma"
          platforms={['telegram', 'whatsapp', 'sms']}
        />
      </>
    );
  },
};

export const WithShareCallback: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    const [lastPlatform, setLastPlatform] = useState('');
    return (
      <>
        <Button onClick={() => setVisible(true)}>Ulashish (callback)</Button>
        {lastPlatform && <p style={{ marginTop: 8, fontSize: 12 }}>Oxirgi: {lastPlatform}</p>}
        <ShareSheet
          visible={visible}
          onClose={() => setVisible(false)}
          url="https://geekshop.uz/coupon/GEEK50"
          title="GeekShop kupon"
          description="50 000 so'm chegirma"
          onShare={(platform) => setLastPlatform(platform)}
        />
      </>
    );
  },
};

export const AllPlatforms: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <>
        <Button onClick={() => setVisible(true)}>Barcha platformalar</Button>
        <ShareSheet
          visible={visible}
          onClose={() => setVisible(false)}
          url="https://geekshop.uz/product/samsung-galaxy-s24-ultra"
          title="Samsung Galaxy S24 Ultra"
          description="12/512GB - 16 990 000 so'm"
          platforms={['telegram', 'whatsapp', 'twitter', 'facebook', 'email', 'sms']}
        />
      </>
    );
  },
};
