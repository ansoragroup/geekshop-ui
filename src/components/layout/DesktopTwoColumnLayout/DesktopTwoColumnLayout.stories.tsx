import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopTwoColumnLayout } from './DesktopTwoColumnLayout';

const meta = {
  title: 'Layout (Desktop)/DesktopTwoColumnLayout',
  component: DesktopTwoColumnLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 1200, padding: 24, margin: '0 auto', background: '#F5F5F5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopTwoColumnLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

const SidebarContent = () => (
  <div style={{ background: '#fff', borderRadius: 8, padding: 16 }}>
    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>Filtrlar</div>
    {['Narx', 'Brend', 'Rang', "O'lcham", 'Reyting'].map((filter) => (
      <div
        key={filter}
        style={{
          padding: '10px 0',
          fontSize: 13,
          color: '#666',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        {filter}
      </div>
    ))}
  </div>
);

const MainContent = ({ count = 8 }: { count?: number }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
    {Array.from({ length: count }, (_, i) => (
      <div
        key={i}
        style={{
          background: '#fff',
          borderRadius: 8,
          overflow: 'hidden',
          border: '1px solid #eee',
        }}
      >
        <div
          style={{
            width: '100%',
            aspectRatio: '1',
            background: '#F5F5F5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#999',
          }}
        >
          {i + 1}
        </div>
        <div style={{ padding: 12 }}>
          <div style={{ fontSize: 13, color: '#1A1A1A', marginBottom: 4 }}>Mahsulot #{i + 1}</div>
          <div style={{ fontSize: 14, color: '#FF0000', fontWeight: 700 }}>
            {((i + 1) * 500_000).toLocaleString('ru-RU').replace(/,/g, ' ')} so'm
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const Default: Story = {
  args: {
    sidebar: <SidebarContent />,
    children: <MainContent />,
  },
};

export const SidebarRight: Story = {
  args: {
    sidebar: <SidebarContent />,
    sidebarPosition: 'right',
    children: <MainContent />,
  },
};

export const CustomWidths: Story = {
  args: {
    sidebar: <SidebarContent />,
    sidebarWidth: 300,
    gap: 32,
    children: <MainContent count={6} />,
  },
};

export const StickySidebar: Story = {
  args: {
    sidebar: <SidebarContent />,
    stickyTop: 24,
    children: <MainContent count={20} />,
  },
};

const CategorySidebar = () => (
  <div style={{ background: '#fff', borderRadius: 8, padding: 16 }}>
    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>Kategoriyalar</div>
    {[
      'Noutbuklar',
      'Videokartalar',
      'Protsessorlar',
      'Monitorlar',
      'Klaviaturalar',
      'Sichqonchalar',
      'Quloqchinlar',
      'SSD & HDD',
    ].map((cat) => (
      <div
        key={cat}
        style={{
          padding: '10px 0',
          fontSize: 13,
          color: '#666',
          borderBottom: '1px solid #f0f0f0',
          cursor: 'pointer',
        }}
      >
        {cat}
      </div>
    ))}
  </div>
);

const AccountSidebar = () => (
  <div style={{ background: '#fff', borderRadius: 8, padding: 16 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: '#FF5000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 700,
          fontSize: 18,
        }}
      >
        A
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: 14 }}>Alisher Navro'zov</div>
        <div style={{ fontSize: 12, color: '#999' }}>alisher@email.com</div>
      </div>
    </div>
    {[
      'Buyurtmalar',
      'Manzillar',
      "To'lov usullari",
      'Kuponlar',
      'Sevimlilar',
      'Sozlamalar',
      'Chiqish',
    ].map((item, i) => (
      <div
        key={item}
        style={{
          padding: '10px 0',
          fontSize: 13,
          color: i === 6 ? '#FF3B30' : '#666',
          borderBottom: '1px solid #f0f0f0',
          cursor: 'pointer',
        }}
      >
        {item}
      </div>
    ))}
  </div>
);

const OrderContent = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    {[
      {
        id: '#GS-20261001',
        date: '24.03.2026',
        status: 'Yetkazildi',
        statusColor: '#07C160',
        total: '8 900 000',
      },
      {
        id: '#GS-20260998',
        date: '22.03.2026',
        status: "Yo'lda",
        statusColor: '#1890FF',
        total: '2 400 000',
      },
      {
        id: '#GS-20260945',
        date: '18.03.2026',
        status: 'Bekor qilindi',
        statusColor: '#FF3B30',
        total: '15 200 000',
      },
    ].map((order) => (
      <div
        key={order.id}
        style={{ background: '#fff', borderRadius: 8, padding: 16, border: '1px solid #eee' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontWeight: 600, fontSize: 14 }}>{order.id}</span>
          <span style={{ fontSize: 12, color: '#999' }}>{order.date}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: order.statusColor, fontWeight: 500 }}>
            {order.status}
          </span>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A' }}>
            {order.total} so'm
          </span>
        </div>
      </div>
    ))}
  </div>
);

export const NarrowSidebar: Story = {
  name: 'Narrow Sidebar (180px)',
  args: {
    sidebar: <CategorySidebar />,
    sidebarWidth: 180,
    gap: 16,
    children: <MainContent count={9} />,
  },
};

export const WideSidebar: Story = {
  name: 'Wide Sidebar (360px)',
  args: {
    sidebar: <AccountSidebar />,
    sidebarWidth: 360,
    gap: 32,
    children: <OrderContent />,
  },
};

export const PercentageSidebar: Story = {
  name: 'Percentage Width (25%)',
  args: {
    sidebar: <SidebarContent />,
    sidebarWidth: '25%',
    gap: 24,
    children: <MainContent count={6} />,
  },
};

export const NoGap: Story = {
  name: 'Edge: Zero Gap',
  args: {
    sidebar: <SidebarContent />,
    gap: 0,
    children: <MainContent count={6} />,
  },
};

export const LargeGap: Story = {
  name: 'Large Gap (48px)',
  args: {
    sidebar: <SidebarContent />,
    gap: 48,
    children: <MainContent count={6} />,
  },
};

export const AccountPage: Story = {
  name: 'Realistic: Account Page',
  args: {
    sidebar: <AccountSidebar />,
    sidebarWidth: 280,
    stickyTop: 24,
    children: <OrderContent />,
  },
};

export const CategoryPageRight: Story = {
  name: 'Realistic: Category Page (Sidebar Right)',
  args: {
    sidebar: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <SidebarContent />
        <div style={{ background: '#fff', borderRadius: 8, padding: 16 }}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>Narx oralig'i</div>
          <div style={{ display: 'flex', gap: 8, fontSize: 13 }}>
            <input
              type="text"
              placeholder="dan"
              style={{
                flex: 1,
                padding: '6px 8px',
                border: '1px solid #eee',
                borderRadius: 4,
                fontSize: 13,
              }}
            />
            <input
              type="text"
              placeholder="gacha"
              style={{
                flex: 1,
                padding: '6px 8px',
                border: '1px solid #eee',
                borderRadius: 4,
                fontSize: 13,
              }}
            />
          </div>
        </div>
      </div>
    ),
    sidebarPosition: 'right',
    sidebarWidth: 260,
    stickyTop: 24,
    children: <MainContent count={12} />,
  },
};

export const StickyWithOffset: Story = {
  name: 'Sticky Sidebar (80px offset for header)',
  args: {
    sidebar: <SidebarContent />,
    stickyTop: 80,
    children: <MainContent count={16} />,
  },
};
