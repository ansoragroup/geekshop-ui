import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { TabFilter } from './TabFilter';
import type { TabFilterProps } from './TabFilter';

const meta = {
  title: 'Navigation/TabFilter',
  component: TabFilter,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'iPhone13' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '360px', background: '#F5F5F5', padding: '16px 0' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TabFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

function InteractiveTabFilter(props: Partial<TabFilterProps> & { initialTab?: string }) {
  const { initialTab = '', tabs = [], ...rest } = props;
  const [active, setActive] = useState(initialTab || (tabs[0]?.key ?? ''));
  return <TabFilter tabs={tabs} activeTab={active} onChange={setActive} {...rest} />;
}

const categoryTabs = [
  { key: 'all', label: 'Barchasi' },
  { key: 'gpu', label: 'Videokartalar' },
  { key: 'cpu', label: 'Protsessorlar' },
  { key: 'ram', label: 'Xotira' },
  { key: 'ssd', label: 'Disklar' },
  { key: 'motherboard', label: 'Ona platalar' },
  { key: 'psu', label: 'Quvvat bloklari' },
  { key: 'case', label: 'Korpuslar' },
];

export const PillDefault: Story = {
  render: () => <InteractiveTabFilter tabs={categoryTabs} variant="pill" />,
};

export const PillGPUSelected: Story = {
  render: () => <InteractiveTabFilter tabs={categoryTabs} variant="pill" initialTab="gpu" />,
};

export const UnderlineDefault: Story = {
  render: () => (
    <InteractiveTabFilter
      tabs={[
        { key: 'all', label: 'Barchasi' },
        { key: 'new', label: 'Yangi' },
        { key: 'popular', label: 'Mashhur' },
        { key: 'sale', label: 'Chegirma' },
      ]}
      variant="underline"
    />
  ),
};

export const WithBadges: Story = {
  render: () => (
    <InteractiveTabFilter
      tabs={[
        { key: 'all', label: 'Barchasi', badge: 156 },
        { key: 'pending', label: 'Kutilmoqda', badge: 3 },
        { key: 'shipped', label: 'Yetkazilmoqda', badge: 2 },
        { key: 'delivered', label: 'Yetkazildi', badge: 12 },
        { key: 'cancelled', label: 'Bekor qilindi' },
      ]}
      variant="pill"
    />
  ),
};

export const UnderlineWithBadges: Story = {
  render: () => (
    <InteractiveTabFilter
      tabs={[
        { key: 'all', label: 'Barchasi' },
        { key: 'pending', label: 'Kutilmoqda', badge: 3 },
        { key: 'shipped', label: 'Yetkazilmoqda', badge: 2 },
        { key: 'delivered', label: 'Yetkazildi', badge: 12 },
        { key: 'cancelled', label: 'Bekor qilindi' },
      ]}
      variant="underline"
      initialTab="pending"
    />
  ),
};

export const BrandFilter: Story = {
  render: () => (
    <InteractiveTabFilter
      tabs={[
        { key: 'all', label: 'Barchasi' },
        { key: 'nvidia', label: 'NVIDIA' },
        { key: 'amd', label: 'AMD' },
        { key: 'intel', label: 'Intel' },
        { key: 'msi', label: 'MSI' },
        { key: 'asus', label: 'ASUS' },
        { key: 'gigabyte', label: 'Gigabyte' },
      ]}
      variant="pill"
    />
  ),
};

export const FewTabs: Story = {
  render: () => (
    <InteractiveTabFilter
      tabs={[
        { key: 'new', label: 'Yangi' },
        { key: 'used', label: 'Ishlatilgan' },
      ]}
      variant="pill"
    />
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ fontSize: 12, color: '#999', padding: '0 16px', marginBottom: 8 }}>Pill variant — Category filter</p>
        <InteractiveTabFilter tabs={categoryTabs} variant="pill" />
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#999', padding: '0 16px', marginBottom: 8 }}>Underline variant — Sort options</p>
        <InteractiveTabFilter
          tabs={[
            { key: 'all', label: 'Barchasi' },
            { key: 'new', label: 'Yangi' },
            { key: 'popular', label: 'Mashhur' },
            { key: 'sale', label: 'Chegirma' },
          ]}
          variant="underline"
        />
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#999', padding: '0 16px', marginBottom: 8 }}>Pill variant — With badges</p>
        <InteractiveTabFilter
          tabs={[
            { key: 'all', label: 'Barchasi', badge: 156 },
            { key: 'pending', label: 'Kutilmoqda', badge: 3 },
            { key: 'shipped', label: 'Yetkazilmoqda', badge: 2 },
            { key: 'delivered', label: 'Yetkazildi', badge: 12 },
          ]}
          variant="pill"
        />
      </div>
    </div>
  ),
};
