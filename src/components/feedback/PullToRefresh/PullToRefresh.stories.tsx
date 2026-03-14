import type { Meta, StoryObj } from '@storybook/react-vite';
import { PullToRefresh } from './PullToRefresh';

const meta = {
  title: 'Feedback/PullToRefresh',
  component: PullToRefresh,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'GeekShop Light' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 420, margin: '0 auto', height: 500 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PullToRefresh>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockItems = [
  'Logitech G PRO X Superlight 2',
  'NVIDIA GeForce RTX 4090',
  'HyperX Alloy Origins 65',
  'Corsair Vengeance DDR5 32GB',
  'Samsung 990 PRO 2TB NVMe',
  'ASUS ROG Swift PG27AQDM',
  'SteelSeries Arctis Nova Pro',
  'Razer DeathAdder V3 Pro',
];

const ListContent = () => (
  <div style={{ background: '#fff' }}>
    {mockItems.map((item, i) => (
      <div
        key={i}
        style={{
          padding: '16px',
          borderBottom: '1px solid #eee',
          fontSize: 14,
          color: '#1a1a1a',
        }}
      >
        {item}
      </div>
    ))}
  </div>
);

const fakeRefresh = () =>
  new Promise<void>((resolve) => setTimeout(resolve, 2000));

export const Default: Story = {
  args: {
    onRefresh: fakeRefresh,
    children: null,
  },
  render: (args) => (
    <PullToRefresh {...args}>
      <ListContent />
    </PullToRefresh>
  ),
};

export const CustomContent: Story = {
  args: {
    onRefresh: fakeRefresh,
    refreshingContent: (
      <span style={{ fontSize: 12, color: '#FF5000' }}>Yangilanmoqda...</span>
    ),
    pullingContent: (
      <span style={{ fontSize: 12, color: '#999' }}>Yangilash uchun torting</span>
    ),
    children: null,
  },
  render: (args) => (
    <PullToRefresh {...args}>
      <ListContent />
    </PullToRefresh>
  ),
};

export const Disabled: Story = {
  args: {
    onRefresh: fakeRefresh,
    disabled: true,
    children: null,
  },
  render: (args) => (
    <PullToRefresh {...args}>
      <ListContent />
    </PullToRefresh>
  ),
};
