import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
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

// ─── Shared data & helpers ───────────────────────────────────────────────────

const fakeRefresh = () =>
  new Promise<void>((resolve) => setTimeout(resolve, 2000));

const fastRefresh = () =>
  new Promise<void>((resolve) => setTimeout(resolve, 500));

const slowRefresh = () =>
  new Promise<void>((resolve) => setTimeout(resolve, 5000));

const productItems = [
  { name: 'Logitech G PRO X Superlight 2', price: '1 890 000', rating: 4.8 },
  { name: 'NVIDIA GeForce RTX 4090', price: '24 990 000', rating: 4.9 },
  { name: 'HyperX Alloy Origins 65', price: '890 000', rating: 4.5 },
  { name: 'Corsair Vengeance DDR5 32GB', price: '1 450 000', rating: 4.7 },
  { name: 'Samsung 990 PRO 2TB NVMe', price: '2 890 000', rating: 4.6 },
  { name: 'ASUS ROG Swift PG27AQDM', price: '15 200 000', rating: 4.9 },
  { name: 'SteelSeries Arctis Nova Pro', price: '4 200 000', rating: 4.4 },
  { name: 'Razer DeathAdder V3 Pro', price: '1 290 000', rating: 4.7 },
];

const ProductList = () => (
  <div style={{ background: '#fff' }}>
    {productItems.map((item, i) => (
      <div
        key={i}
        style={{
          padding: '16px',
          borderBottom: '1px solid #eee',
          fontSize: 14,
          color: '#1a1a1a',
        }}
      >
        <div style={{ fontWeight: 500 }}>{item.name}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          <span style={{ color: '#FF0000', fontWeight: 600 }}>{item.price} so'm</span>
          <span style={{ color: '#999', fontSize: 12 }}>&#9733; {item.rating}</span>
        </div>
      </div>
    ))}
  </div>
);

const SimpleList = () => (
  <div style={{ background: '#fff' }}>
    {[
      'Logitech G PRO X Superlight 2',
      'NVIDIA GeForce RTX 4090',
      'HyperX Alloy Origins 65',
      'Corsair Vengeance DDR5 32GB',
      'Samsung 990 PRO 2TB NVMe',
      'ASUS ROG Swift PG27AQDM',
      'SteelSeries Arctis Nova Pro',
      'Razer DeathAdder V3 Pro',
    ].map((item, i) => (
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

// ─── 1. Default ──────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    onRefresh: fakeRefresh,
    children: null,
  },
  render: (args) => (
    <PullToRefresh {...args}>
      <SimpleList />
    </PullToRefresh>
  ),
};

// ─── 2. Custom Content (Uzbek) ───────────────────────────────────────────────

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
      <SimpleList />
    </PullToRefresh>
  ),
};

// ─── 3. Disabled ─────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: {
    onRefresh: fakeRefresh,
    disabled: true,
    children: null,
  },
  render: (args) => (
    <PullToRefresh {...args}>
      <div style={{ background: '#fff', padding: 16, textAlign: 'center', color: '#999', fontSize: 13, marginBottom: 8 }}>
        Pull-to-refresh is disabled
      </div>
      <SimpleList />
    </PullToRefresh>
  ),
};

// ─── 4. Custom Threshold (Low) ───────────────────────────────────────────────

export const LowThreshold: Story = {
  name: 'Low Threshold (40px)',
  args: {
    onRefresh: fakeRefresh,
    threshold: 40,
    maxPull: 80,
    children: null,
  },
  render: (args) => (
    <PullToRefresh {...args}>
      <div style={{ background: '#FFF5F0', padding: 12, textAlign: 'center', fontSize: 12, color: '#FF5000' }}>
        Easy trigger: only 40px pull needed
      </div>
      <SimpleList />
    </PullToRefresh>
  ),
};

// ─── 5. Custom Threshold (High) ──────────────────────────────────────────────

export const HighThreshold: Story = {
  name: 'High Threshold (150px)',
  args: {
    onRefresh: fakeRefresh,
    threshold: 150,
    maxPull: 200,
    children: null,
  },
  render: (args) => (
    <PullToRefresh {...args}>
      <div style={{ background: '#F0F5FF', padding: 12, textAlign: 'center', fontSize: 12, color: '#1890FF' }}>
        Hard trigger: 150px pull needed
      </div>
      <SimpleList />
    </PullToRefresh>
  ),
};

// ─── 6. Fast Refresh ─────────────────────────────────────────────────────────

export const FastRefresh: Story = {
  name: 'Fast Refresh (500ms)',
  args: {
    onRefresh: fastRefresh,
    children: null,
  },
  render: (args) => (
    <PullToRefresh {...args}>
      <div style={{ background: '#E8F8EF', padding: 12, textAlign: 'center', fontSize: 12, color: '#07C160' }}>
        Quick refresh: completes in 500ms
      </div>
      <SimpleList />
    </PullToRefresh>
  ),
};

// ─── 7. Slow Refresh ─────────────────────────────────────────────────────────

export const SlowRefresh: Story = {
  name: 'Slow Refresh (5s)',
  args: {
    onRefresh: slowRefresh,
    refreshingContent: (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
          <circle cx="12" cy="12" r="10" stroke="#eee" strokeWidth="2.5" />
          <path d="M12 2a10 10 0 0 1 10 10" stroke="#FF5000" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: 12, color: '#666' }}>Loading data...</span>
      </div>
    ),
    children: null,
  },
  render: (args) => (
    <PullToRefresh {...args}>
      <div style={{ background: '#FFF5F0', padding: 12, textAlign: 'center', fontSize: 12, color: '#FF5000' }}>
        Slow refresh: takes 5 seconds to complete
      </div>
      <SimpleList />
    </PullToRefresh>
  ),
};

// ─── 8. Product Card List ────────────────────────────────────────────────────

export const ProductCardList: Story = {
  name: 'E-commerce Product List',
  args: {
    onRefresh: fakeRefresh,
    children: null,
  },
  render: (args) => (
    <PullToRefresh {...args}>
      <ProductList />
    </PullToRefresh>
  ),
};

// ─── 9. With Dynamic Data ────────────────────────────────────────────────────

export const WithDynamicData: Story = {
  name: 'Dynamic Data Reload',
  render: () => {
    const [items, setItems] = useState([
      { name: 'RTX 4090 Founders Edition', price: '24 990 000' },
      { name: 'Ryzen 9 7950X', price: '7 490 000' },
      { name: 'Samsung 990 PRO 2TB', price: '2 890 000' },
    ]);

    const [refreshCount, setRefreshCount] = useState(0);

    const newProducts = [
      { name: 'Intel Core i9-14900K', price: '6 800 000' },
      { name: 'Corsair Dominator DDR5 64GB', price: '3 200 000' },
      { name: 'ASUS ROG Thor 1200W PSU', price: '4 500 000' },
      { name: 'Lian Li O11D XL', price: '2 100 000' },
      { name: 'Noctua NH-D15S', price: '950 000' },
    ];

    const handleRefresh = async () => {
      await new Promise<void>((resolve) => setTimeout(resolve, 1500));
      const newItem = newProducts[refreshCount % newProducts.length];
      setItems((prev) => [newItem, ...prev]);
      setRefreshCount((c) => c + 1);
    };

    return (
      <PullToRefresh onRefresh={handleRefresh}>
        <div style={{ background: '#E8F8EF', padding: 10, textAlign: 'center', fontSize: 12, color: '#07C160' }}>
          Pull to add a new product. Refreshed {refreshCount} times.
        </div>
        <div style={{ background: '#fff' }}>
          {items.map((item, i) => (
            <div key={`${item.name}-${i}`} style={{ padding: 16, borderBottom: '1px solid #eee', fontSize: 14 }}>
              <div style={{ fontWeight: 500 }}>{item.name}</div>
              <div style={{ color: '#FF0000', fontWeight: 600, marginTop: 4 }}>{item.price} so'm</div>
            </div>
          ))}
        </div>
      </PullToRefresh>
    );
  },
};

// ─── 10. Custom Refreshing Indicator ─────────────────────────────────────────

export const CustomIndicators: Story = {
  name: 'Custom Pull & Refresh Indicators',
  args: {
    onRefresh: fakeRefresh,
    pullingContent: (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 4V14M10 14L6 10M10 14L14 10" stroke="#FF5000" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: 11, color: '#FF5000', fontWeight: 500 }}>Pull down</span>
      </div>
    ),
    refreshingContent: (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <div style={{ width: 20, height: 20, border: '2px solid #eee', borderTopColor: '#FF5000', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <span style={{ fontSize: 11, color: '#FF5000', fontWeight: 500 }}>Refreshing...</span>
      </div>
    ),
    children: null,
  },
  render: (args) => (
    <PullToRefresh {...args}>
      <SimpleList />
    </PullToRefresh>
  ),
};

// ─── 11. Order List ──────────────────────────────────────────────────────────

export const OrderList: Story = {
  name: 'Order History List',
  args: {
    onRefresh: fakeRefresh,
    children: null,
  },
  render: (args) => {
    const orders = [
      { id: 'GS-2026-0093', date: '25 Mar 2026', status: 'Delivered', statusColor: '#07C160', total: '24 990 000' },
      { id: 'GS-2026-0088', date: '20 Mar 2026', status: 'Shipping', statusColor: '#1890FF', total: '7 490 000' },
      { id: 'GS-2026-0075', date: '15 Mar 2026', status: 'Processing', statusColor: '#FFA726', total: '12 500 000' },
      { id: 'GS-2026-0061', date: '8 Mar 2026', status: 'Delivered', statusColor: '#07C160', total: '2 890 000' },
      { id: 'GS-2026-0044', date: '1 Mar 2026', status: 'Cancelled', statusColor: '#FF3B30', total: '15 200 000' },
    ];

    return (
      <PullToRefresh {...args}>
        <div style={{ background: '#fff' }}>
          {orders.map((order) => (
            <div key={order.id} style={{ padding: 16, borderBottom: '1px solid #eee' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>#{order.id}</span>
                <span style={{ fontSize: 12, color: order.statusColor, fontWeight: 500 }}>{order.status}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: '#999' }}>{order.date}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#FF0000' }}>{order.total} so'm</span>
              </div>
            </div>
          ))}
        </div>
      </PullToRefresh>
    );
  },
};

// ─── 12. Chat Messages ───────────────────────────────────────────────────────

export const ChatMessages: Story = {
  name: 'Chat Message History',
  args: {
    onRefresh: fakeRefresh,
    refreshingContent: (
      <span style={{ fontSize: 12, color: '#999' }}>Loading older messages...</span>
    ),
    children: null,
  },
  render: (args) => {
    const messages = [
      { sender: 'GeekShop Support', text: 'Hello! How can I help you today?', time: '10:32', isMe: false },
      { sender: 'You', text: 'Hi, I have a question about my order #GS-2026-0088', time: '10:33', isMe: true },
      { sender: 'GeekShop Support', text: 'Sure! Let me check the status of your order.', time: '10:33', isMe: false },
      { sender: 'GeekShop Support', text: 'Your order is currently being shipped. Expected delivery: 27 March 2026.', time: '10:35', isMe: false },
      { sender: 'You', text: 'Great, thank you! Can I change the delivery address?', time: '10:36', isMe: true },
      { sender: 'GeekShop Support', text: 'Unfortunately, the package has already been dispatched. Address changes are only possible before shipping.', time: '10:37', isMe: false },
    ];

    return (
      <PullToRefresh {...args}>
        <div style={{ background: '#f5f5f5', padding: 12, display: 'flex', flexDirection: 'column', gap: 8, minHeight: 400 }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.isMe ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '75%',
                padding: '10px 14px',
                borderRadius: msg.isMe ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                background: msg.isMe ? '#FF5000' : '#fff',
                color: msg.isMe ? '#fff' : '#333',
                fontSize: 14,
                lineHeight: 1.5,
              }}>
                <div>{msg.text}</div>
                <div style={{ fontSize: 11, opacity: 0.7, marginTop: 4, textAlign: 'right' }}>{msg.time}</div>
              </div>
            </div>
          ))}
        </div>
      </PullToRefresh>
    );
  },
};
