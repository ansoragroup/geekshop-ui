import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopShell } from './DesktopShell';

const meta = {
  title: 'Layout (Desktop)/DesktopShell',
  component: DesktopShell,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopShell>;

export default meta;
type Story = StoryObj<typeof meta>;

const TopBarContent = () => (
  <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
    <span>Toshkent shahar | Yetkazib berish: 1-3 kun</span>
    <div style={{ display: 'flex', gap: 16 }}>
      <span>Sotuvchi markazi</span>
      <span>Yordam</span>
    </div>
  </div>
);

const HeaderContent = () => (
  <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', gap: 24 }}>
    <div style={{ fontWeight: 700, fontSize: 20, color: '#FF5000' }}>GeekShop</div>
    <div style={{ flex: 1, height: 40, background: '#F5F5F5', borderRadius: 20, display: 'flex', alignItems: 'center', padding: '0 16px', color: '#999', fontSize: 14 }}>
      Mahsulot qidirish...
    </div>
    <div style={{ display: 'flex', gap: 24, fontSize: 13, color: '#666' }}>
      <span>Savat</span>
      <span>Profil</span>
    </div>
  </div>
);

const SidebarContent = () => (
  <div style={{ background: '#fff', borderRadius: 8, padding: 16 }}>
    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>Kategoriyalar</div>
    {['Videokartalar', 'Protsessorlar', 'Monitorlar', 'Noutbuklar', 'Xotira (RAM)', 'SSD/HDD'].map((cat) => (
      <div key={cat} style={{ padding: '8px 0', fontSize: 13, color: '#666', borderBottom: '1px solid #f0f0f0', cursor: 'pointer' }}>
        {cat}
      </div>
    ))}
  </div>
);

const MainContent = () => (
  <div>
    <div style={{ background: '#fff', borderRadius: 8, padding: 24, marginBottom: 16 }}>
      <h2 style={{ fontSize: 20, marginBottom: 12 }}>Tavsiya etamiz</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ background: '#F5F5F5', borderRadius: 8, aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
            Mahsulot {i}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const FooterContent = () => (
  <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '32px 24px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, fontSize: 13 }}>
    <div>
      <div style={{ fontWeight: 600, marginBottom: 12 }}>GeekShop</div>
      <div style={{ opacity: 0.7, lineHeight: 1.6 }}>Kompyuter va texnologiya do'koni</div>
    </div>
    <div>
      <div style={{ fontWeight: 600, marginBottom: 12 }}>Yordam</div>
      <div style={{ opacity: 0.7, lineHeight: 1.6 }}>Yetkazib berish{'\n'}Qaytarish{'\n'}FAQ</div>
    </div>
    <div>
      <div style={{ fontWeight: 600, marginBottom: 12 }}>Kompaniya</div>
      <div style={{ opacity: 0.7, lineHeight: 1.6 }}>Biz haqimizda{'\n'}Bog'lanish</div>
    </div>
    <div>
      <div style={{ fontWeight: 600, marginBottom: 12 }}>Ijtimoiy tarmoqlar</div>
      <div style={{ opacity: 0.7, lineHeight: 1.6 }}>Telegram{'\n'}Instagram</div>
    </div>
  </div>
);

export const Default: Story = {
  args: {
    topBar: <TopBarContent />,
    header: <HeaderContent />,
    sidebar: <SidebarContent />,
    footer: <FooterContent />,
    children: <MainContent />,
  },
};

export const WithoutSidebar: Story = {
  args: {
    topBar: <TopBarContent />,
    header: <HeaderContent />,
    footer: <FooterContent />,
    children: <MainContent />,
  },
};

export const SidebarRight: Story = {
  args: {
    topBar: <TopBarContent />,
    header: <HeaderContent />,
    sidebar: <SidebarContent />,
    sidebarPosition: 'right',
    footer: <FooterContent />,
    children: <MainContent />,
  },
};

export const Minimal: Story = {
  args: {
    header: <HeaderContent />,
    children: <MainContent />,
  },
};
