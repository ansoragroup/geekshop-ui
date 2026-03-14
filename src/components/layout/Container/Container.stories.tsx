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
