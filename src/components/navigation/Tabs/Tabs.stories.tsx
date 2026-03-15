import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs';

const meta = {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 390, padding: 24, background: '#fff', borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        key: 'all',
        label: 'Barchasi',
        children: (
          <div style={{ padding: 12, color: '#666', fontSize: 14 }}>
            Barcha mahsulotlar ro'yxati shu yerda ko'rsatiladi.
          </div>
        ),
      },
      {
        key: 'new',
        label: 'Yangi',
        children: (
          <div style={{ padding: 12, color: '#666', fontSize: 14 }}>
            Eng yangi mahsulotlar.
          </div>
        ),
      },
      {
        key: 'popular',
        label: 'Mashhur',
        children: (
          <div style={{ padding: 12, color: '#666', fontSize: 14 }}>
            Eng ko'p sotilgan mahsulotlar.
          </div>
        ),
      },
    ],
  },
};

export const CardVariant: Story = {
  args: {
    variant: 'card',
    items: [
      {
        key: 'products',
        label: 'Mahsulotlar',
        children: (
          <div style={{ padding: 12, color: '#666', fontSize: 14 }}>
            Mahsulotlar kontenti
          </div>
        ),
      },
      {
        key: 'reviews',
        label: 'Sharhlar',
        children: (
          <div style={{ padding: 12, color: '#666', fontSize: 14 }}>
            Sharhlar kontenti
          </div>
        ),
      },
      {
        key: 'details',
        label: "Ma'lumot",
        children: (
          <div style={{ padding: 12, color: '#666', fontSize: 14 }}>
            Batafsil ma'lumot
          </div>
        ),
      },
    ],
  },
};

export const WithBadges: Story = {
  args: {
    items: [
      {
        key: 'all',
        label: 'Barchasi',
        badge: 128,
        children: <div style={{ padding: 12, fontSize: 14, color: '#666' }}>Barcha buyurtmalar</div>,
      },
      {
        key: 'pending',
        label: 'Kutilmoqda',
        badge: 3,
        children: <div style={{ padding: 12, fontSize: 14, color: '#666' }}>Kutilayotgan buyurtmalar</div>,
      },
      {
        key: 'shipped',
        label: 'Yuborildi',
        badge: 5,
        children: <div style={{ padding: 12, fontSize: 14, color: '#666' }}>Yuborilgan buyurtmalar</div>,
      },
      {
        key: 'completed',
        label: 'Yetkazildi',
        children: <div style={{ padding: 12, fontSize: 14, color: '#666' }}>Yetkazilgan buyurtmalar</div>,
      },
    ],
  },
};

export const WithDisabled: Story = {
  args: {
    items: [
      {
        key: 'active',
        label: 'Faol',
        children: <div style={{ padding: 12, fontSize: 14, color: '#666' }}>Faol kontentlar</div>,
      },
      {
        key: 'draft',
        label: 'Qoralama',
        disabled: true,
        children: <div style={{ padding: 12, fontSize: 14, color: '#666' }}>Qoralamalar</div>,
      },
      {
        key: 'archived',
        label: 'Arxiv',
        children: <div style={{ padding: 12, fontSize: 14, color: '#666' }}>Arxivlangan kontentlar</div>,
      },
    ],
  },
};

export const Controlled: Story = {
  render: () => {
    const [active, setActive] = useState('tab1');
    return (
      <div>
        <div style={{ marginBottom: 12, fontSize: 12, color: '#999' }}>
          Active: {active}
        </div>
        <Tabs
          activeKey={active}
          onChange={setActive}
          items={[
            { key: 'tab1', label: 'Birinchi', children: <div style={{ padding: 12 }}>Tab 1 kontenti</div> },
            { key: 'tab2', label: 'Ikkinchi', children: <div style={{ padding: 12 }}>Tab 2 kontenti</div> },
            { key: 'tab3', label: 'Uchinchi', children: <div style={{ padding: 12 }}>Tab 3 kontenti</div> },
          ]}
        />
      </div>
    );
  },
};

export const ManyTabs: Story = {
  args: {
    items: Array.from({ length: 8 }, (_, i) => ({
      key: `tab${i}`,
      label: `Tab ${i + 1}`,
      children: (
        <div style={{ padding: 12, fontSize: 14, color: '#666' }}>
          Tab {i + 1} kontenti
        </div>
      ),
    })),
  },
};
