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

/* ─── Shared building blocks ─── */

const TopBarContent = () => (
  <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
    <span>Tashkent | Delivery: 1-3 days</span>
    <div style={{ display: 'flex', gap: 16 }}>
      <span>Seller Center</span>
      <span>Help</span>
      <span>EN | RU | UZ</span>
    </div>
  </div>
);

const HeaderContent = () => (
  <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', gap: 24 }}>
    <div style={{ fontWeight: 700, fontSize: 20, color: '#FF5000' }}>GeekShop</div>
    <div style={{ flex: 1, height: 40, background: '#F5F5F5', borderRadius: 20, display: 'flex', alignItems: 'center', padding: '0 16px', color: '#999', fontSize: 14 }}>
      Search products...
    </div>
    <div style={{ display: 'flex', gap: 24, fontSize: 13, color: '#666' }}>
      <span>Cart (3)</span>
      <span>Profile</span>
    </div>
  </div>
);

const SidebarContent = () => (
  <div style={{ background: '#fff', borderRadius: 8, padding: 16 }}>
    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>Categories</div>
    {['GPUs', 'CPUs', 'Monitors', 'Laptops', 'RAM', 'SSD/HDD', 'Keyboards', 'Mice'].map((cat) => (
      <div key={cat} style={{ padding: '8px 0', fontSize: 13, color: '#666', borderBottom: '1px solid #f0f0f0', cursor: 'pointer' }}>
        {cat}
      </div>
    ))}
  </div>
);

const FilterSidebar = () => (
  <div style={{ background: '#fff', borderRadius: 8, padding: 16 }}>
    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>Filters</div>
    {['Price Range', 'Brand', 'Rating', 'Availability', 'Seller'].map((filter) => (
      <div key={filter} style={{ padding: '10px 0', fontSize: 13, color: '#666', borderBottom: '1px solid #f0f0f0' }}>
        {filter}
        <div style={{ width: '100%', height: 24, background: '#f5f5f5', borderRadius: 4, marginTop: 6 }} />
      </div>
    ))}
  </div>
);

const MainContent = () => (
  <div>
    <div style={{ background: '#fff', borderRadius: 8, padding: 24, marginBottom: 16 }}>
      <h2 style={{ fontSize: 20, marginBottom: 12 }}>Recommended for You</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {['RTX 4090', 'MacBook Pro', 'Sony WH-1000', 'iPad Air'].map((item) => (
          <div key={item} style={{ background: '#F5F5F5', borderRadius: 8, aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontSize: 13 }}>
            {item}
          </div>
        ))}
      </div>
    </div>
    <div style={{ background: '#fff', borderRadius: 8, padding: 24 }}>
      <h2 style={{ fontSize: 20, marginBottom: 12 }}>New Arrivals</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {['Razer Viper', 'Samsung T7', 'Corsair K70', 'LG 27"'].map((item) => (
          <div key={item} style={{ background: '#F5F5F5', borderRadius: 8, aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontSize: 13 }}>
            {item}
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
      <div style={{ opacity: 0.7, lineHeight: 1.6 }}>Computer & Tech Store</div>
    </div>
    <div>
      <div style={{ fontWeight: 600, marginBottom: 12 }}>Help</div>
      <div style={{ opacity: 0.7, lineHeight: 1.6 }}>Delivery | Returns | FAQ</div>
    </div>
    <div>
      <div style={{ fontWeight: 600, marginBottom: 12 }}>Company</div>
      <div style={{ opacity: 0.7, lineHeight: 1.6 }}>About | Contact</div>
    </div>
    <div>
      <div style={{ fontWeight: 600, marginBottom: 12 }}>Social</div>
      <div style={{ opacity: 0.7, lineHeight: 1.6 }}>Telegram | Instagram</div>
    </div>
  </div>
);

/* ─── Stories ─── */

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
  name: 'Without Sidebar',
  args: {
    topBar: <TopBarContent />,
    header: <HeaderContent />,
    footer: <FooterContent />,
    children: <MainContent />,
  },
};

export const SidebarRight: Story = {
  name: 'Sidebar on Right',
  args: {
    topBar: <TopBarContent />,
    header: <HeaderContent />,
    sidebar: <FilterSidebar />,
    sidebarPosition: 'right',
    footer: <FooterContent />,
    children: <MainContent />,
  },
};

export const Minimal: Story = {
  name: 'Header + Content Only',
  args: {
    header: <HeaderContent />,
    children: <MainContent />,
  },
};

export const WithoutTopBar: Story = {
  name: 'Without Top Bar',
  args: {
    header: <HeaderContent />,
    sidebar: <SidebarContent />,
    footer: <FooterContent />,
    children: <MainContent />,
  },
};

export const WithoutFooter: Story = {
  name: 'Without Footer',
  args: {
    topBar: <TopBarContent />,
    header: <HeaderContent />,
    sidebar: <SidebarContent />,
    children: <MainContent />,
  },
};

export const ContentOnly: Story = {
  name: 'Content Only (Bare Shell)',
  args: {
    children: <MainContent />,
  },
};

/* ─── Full Featured ─── */

export const FullFeatured: Story = {
  name: 'Full Featured (All Props)',
  args: {
    topBar: <TopBarContent />,
    header: <HeaderContent />,
    sidebar: <SidebarContent />,
    sidebarPosition: 'left',
    footer: <FooterContent />,
    children: <MainContent />,
  },
};

/* ─── Realistic: Category Page ─── */

export const CategoryPageLayout: Story = {
  name: 'Category Page (Filters Right)',
  args: {
    topBar: <TopBarContent />,
    header: <HeaderContent />,
    sidebar: <FilterSidebar />,
    sidebarPosition: 'right',
    footer: <FooterContent />,
    children: (
      <div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 24, marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h1 style={{ fontSize: 22, fontWeight: 700 }}>Graphics Cards</h1>
            <span style={{ fontSize: 13, color: '#666' }}>245 products</span>
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {['All', 'NVIDIA', 'AMD', 'Under $500', 'In Stock'].map((tag) => (
              <span key={tag} style={{ fontSize: 12, padding: '4px 12px', borderRadius: 16, background: tag === 'All' ? '#FF5000' : '#f0f0f0', color: tag === 'All' ? '#fff' : '#666' }}>
                {tag}
              </span>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {Array.from({ length: 9 }, (_, i) => (
              <div key={i} style={{ background: '#F5F5F5', borderRadius: 8, aspectRatio: '3/4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: 13 }}>
                GPU #{i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
};

/* ─── Realistic: Product Detail Page ─── */

export const ProductDetailLayout: Story = {
  name: 'Product Detail Page (No Sidebar)',
  args: {
    topBar: <TopBarContent />,
    header: <HeaderContent />,
    footer: <FooterContent />,
    children: (
      <div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 24, marginBottom: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <div style={{ background: '#F5F5F5', borderRadius: 8, aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
              Product Image
            </div>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>NVIDIA GeForce RTX 4090</h1>
              <div style={{ fontSize: 14, color: '#666', marginBottom: 16 }}>By ASUS | SKU: RTX4090-24G</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#FF0000', marginBottom: 8 }}>12,500,000 UZS</div>
              <div style={{ fontSize: 14, color: '#999', textDecoration: 'line-through', marginBottom: 24 }}>15,000,000 UZS</div>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ flex: 1, height: 48, background: '#FF5000', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>
                  Buy Now
                </div>
                <div style={{ width: 48, height: 48, border: '2px solid #eee', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#666' }}>
                  ♡
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
};
