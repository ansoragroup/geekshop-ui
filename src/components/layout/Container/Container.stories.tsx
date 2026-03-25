import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container } from './Container';

const meta = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleContent = () => (
  <div style={{ padding: 12 }}>
    <div style={{ background: '#fff', borderRadius: 12, padding: 16, marginBottom: 8 }}>
      <h3 style={{ fontSize: 16, marginBottom: 8 }}>Bosh sahifa</h3>
      <p style={{ fontSize: 14, color: '#666' }}>Bu sahifa kontenti sifatida namuna matn</p>
    </div>
    <div style={{ background: '#fff', borderRadius: 12, padding: 16, marginBottom: 8 }}>
      <h3 style={{ fontSize: 16, marginBottom: 8 }}>Mahsulotlar</h3>
      <p style={{ fontSize: 14, color: '#666' }}>Mahsulotlar ro'yxati bu yerda ko'rinadi</p>
    </div>
  </div>
);

export const Default: Story = {
  args: {
    children: <SampleContent />,
  },
};

export const WithNavbar: Story = {
  render: () => (
    <div style={{ position: 'relative' }}>
      {/* Simulated Navbar */}
      <div style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', width: 375, height: 44, background: '#FF5000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600, fontSize: 16, zIndex: 500 }}>
        GeekShop.uz
      </div>
      <Container hasNavbar>
        <SampleContent />
      </Container>
    </div>
  ),
};

export const WithTabbar: Story = {
  render: () => (
    <div style={{ position: 'relative' }}>
      <Container hasTabbar>
        <SampleContent />
      </Container>
      {/* Simulated TabBar */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 375, height: 50, background: '#fff', borderTop: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 12, color: '#999', zIndex: 500 }}>
        <span>Bosh sahifa</span>
        <span>Kategoriyalar</span>
        <span>Savat</span>
        <span>Profil</span>
      </div>
    </div>
  ),
};

export const FullPage: Story = {
  name: 'Full Page (Navbar + TabBar)',
  render: () => (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', width: 375, height: 44, background: '#FF5000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600, fontSize: 16, zIndex: 500 }}>
        GeekShop.uz
      </div>
      <Container hasNavbar hasTabbar>
        <SampleContent />
        <SampleContent />
        <SampleContent />
      </Container>
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 375, height: 50, background: '#fff', borderTop: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 12, color: '#999', zIndex: 500 }}>
        <span>Bosh sahifa</span>
        <span>Kategoriyalar</span>
        <span>Savat</span>
        <span>Profil</span>
      </div>
    </div>
  ),
};

export const WithActionBar: Story = {
  render: () => (
    <div style={{ position: 'relative' }}>
      <Container hasActionBar>
        <SampleContent />
        <SampleContent />
      </Container>
      {/* Simulated ActionBar */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 375, minHeight: 56, background: '#fff', borderTop: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', zIndex: 500, boxSizing: 'border-box' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#FF0000' }}>5 990 000 so'm</div>
        <button style={{ background: '#FF5000', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>Savatga</button>
      </div>
    </div>
  ),
};

export const WithNavbarAndActionBar: Story = {
  name: 'Navbar + Action Bar',
  render: () => (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', width: 375, height: 44, background: '#FF5000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600, fontSize: 16, zIndex: 500 }}>
        Mahsulot
      </div>
      <Container hasNavbar hasActionBar>
        <SampleContent />
        <SampleContent />
        <SampleContent />
      </Container>
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 375, minHeight: 56, background: '#fff', borderTop: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', zIndex: 500, boxSizing: 'border-box' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#FF0000' }}>8 900 000 so'm</div>
        <button style={{ background: '#FF5000', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>Sotib olish</button>
      </div>
    </div>
  ),
};

export const ActionBarAndTabbar: Story = {
  name: 'Action Bar + TabBar (Both)',
  render: () => (
    <div style={{ position: 'relative' }}>
      <Container hasActionBar hasTabbar>
        <SampleContent />
        <SampleContent />
        <SampleContent />
        <SampleContent />
      </Container>
      <div style={{ position: 'fixed', bottom: 50, left: '50%', transform: 'translateX(-50%)', width: 375, minHeight: 56, background: '#fff', borderTop: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', zIndex: 500, boxSizing: 'border-box' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#FF0000' }}>3 200 000 so'm</div>
        <button style={{ background: '#FF5000', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>Savatga</button>
      </div>
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 375, height: 50, background: '#fff', borderTop: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 12, color: '#999', zIndex: 500 }}>
        <span>Bosh sahifa</span>
        <span>Kategoriyalar</span>
        <span>Savat</span>
        <span>Profil</span>
      </div>
    </div>
  ),
};

export const EmptyContent: Story = {
  name: 'Edge: Empty Content',
  args: {
    children: (
      <div style={{ padding: 40, textAlign: 'center', color: '#999', fontSize: 14 }}>
        Hech narsa topilmadi
      </div>
    ),
  },
};

export const LongScrollableContent: Story = {
  render: () => (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', width: 375, height: 44, background: '#FF5000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600, fontSize: 16, zIndex: 500 }}>
        Katalog
      </div>
      <Container hasNavbar hasTabbar>
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} style={{ padding: 12 }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 16, marginBottom: 8 }}>
              <h3 style={{ fontSize: 16, marginBottom: 8 }}>Bo'lim #{i + 1}</h3>
              <p style={{ fontSize: 14, color: '#666' }}>Mahsulotlar ro'yxatining {i + 1}-qismi</p>
            </div>
          </div>
        ))}
      </Container>
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 375, height: 50, background: '#fff', borderTop: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 12, color: '#999', zIndex: 500 }}>
        <span>Bosh sahifa</span>
        <span>Kategoriyalar</span>
        <span>Savat</span>
        <span>Profil</span>
      </div>
    </div>
  ),
};

export const CustomClassName: Story = {
  name: 'With Custom className',
  args: {
    children: <SampleContent />,
    style: { background: '#FFF5F0', minHeight: 400 },
  },
};

export const AllPropsCombined: Story = {
  name: 'All Props: Navbar + ActionBar + TabBar',
  render: () => (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', width: 375, height: 44, background: '#1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600, fontSize: 16, zIndex: 500 }}>
        GeekShop Premium
      </div>
      <Container hasNavbar hasActionBar hasTabbar>
        <SampleContent />
        <SampleContent />
      </Container>
      <div style={{ position: 'fixed', bottom: 50, left: '50%', transform: 'translateX(-50%)', width: 375, minHeight: 56, background: '#fff', borderTop: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 16px', zIndex: 500, boxSizing: 'border-box' }}>
        <button style={{ flex: 1, background: '#FF5000', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>Buyurtma berish</button>
      </div>
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 375, height: 50, background: '#fff', borderTop: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 12, color: '#999', zIndex: 500 }}>
        <span>Bosh sahifa</span>
        <span>Kategoriyalar</span>
        <span>Savat</span>
        <span>Profil</span>
      </div>
    </div>
  ),
};
