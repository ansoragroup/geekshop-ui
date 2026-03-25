import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopContainer } from './DesktopContainer';

const meta = {
  title: 'Layout (Desktop)/DesktopContainer',
  component: DesktopContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    maxWidth: { control: { type: 'number', min: 400, max: 1600 } },
    padding: { control: { type: 'number', min: 0, max: 64 } },
    fullWidth: { control: 'boolean' },
  },
} satisfies Meta<typeof DesktopContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

const Placeholder = ({ height = 200, label, bg = '#fff' }: { height?: number; label: string; bg?: string }) => (
  <div
    style={{
      background: bg,
      border: '1px dashed #ccc',
      borderRadius: 8,
      padding: 16,
      height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#666',
      fontSize: 14,
    }}
  >
    {label}
  </div>
);

/* ─── Basic ─── */

export const Default: Story = {
  args: {
    children: <Placeholder label="Centered content (max 1200px, 24px padding)" />,
  },
};

/* ─── Custom Max Width ─── */

export const Narrow: Story = {
  name: 'Narrow (800px)',
  args: {
    maxWidth: 800,
    children: <Placeholder label="Narrower container (max 800px)" />,
  },
};

export const Wide: Story = {
  name: 'Wide (1440px)',
  args: {
    maxWidth: 1440,
    children: <Placeholder label="Wider container (max 1440px)" />,
  },
};

export const VeryNarrow: Story = {
  name: 'Very Narrow (480px)',
  args: {
    maxWidth: 480,
    children: <Placeholder label="Very narrow (480px) for forms and login pages" />,
  },
};

/* ─── Custom Padding ─── */

export const NoPadding: Story = {
  name: 'No Padding (0px)',
  args: {
    padding: 0,
    children: <Placeholder label="Zero padding - content touches edges" />,
  },
};

export const SmallPadding: Story = {
  name: 'Small Padding (12px)',
  args: {
    padding: 12,
    children: <Placeholder label="Small padding (12px)" />,
  },
};

export const LargePadding: Story = {
  name: 'Large Padding (48px)',
  args: {
    padding: 48,
    children: <Placeholder label="Large padding (48px)" />,
  },
};

/* ─── Full Width ─── */

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: <Placeholder label="Full-width background, centered inner content" />,
    style: { background: '#FFF5F0' },
  },
};

export const FullWidthAccent: Story = {
  name: 'Full Width (Primary BG)',
  args: {
    fullWidth: true,
    children: (
      <div style={{ padding: '24px 0', color: '#fff', textAlign: 'center' }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Flash Sale!</h2>
        <p style={{ fontSize: 14, opacity: 0.9 }}>Up to 50% off on selected items. Ends tonight.</p>
      </div>
    ),
    style: { background: '#FF5000' },
  },
};

export const FullWidthDark: Story = {
  name: 'Full Width (Dark BG)',
  args: {
    fullWidth: true,
    children: (
      <div style={{ padding: '32px 0', color: '#fff', textAlign: 'center' }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>Premium Membership</h2>
        <p style={{ fontSize: 14, opacity: 0.7 }}>Free shipping on all orders. Cancel anytime.</p>
      </div>
    ),
    style: { background: '#1A1A1A' },
  },
};

/* ─── Custom Width + Padding ─── */

export const CustomWidthAndPadding: Story = {
  name: 'Custom Width + Padding',
  args: {
    maxWidth: 800,
    padding: 32,
    children: <Placeholder label="800px max-width, 32px padding" />,
  },
};

/* ─── Nested Containers ─── */

export const Nested: Story = {
  name: 'Nested Containers',
  render: () => (
    <DesktopContainer maxWidth={1200} style={{ background: '#F5F5F5', padding: '24px 0' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Placeholder label="Content in 1200px container" height={100} />
        <DesktopContainer maxWidth={800}>
          <Placeholder label="Nested 800px container" height={100} bg="#FFF5F0" />
        </DesktopContainer>
        <DesktopContainer maxWidth={480}>
          <Placeholder label="Nested 480px container" height={100} bg="#F0FFF5" />
        </DesktopContainer>
      </div>
    </DesktopContainer>
  ),
};

/* ─── Full Featured ─── */

export const FullFeatured: Story = {
  name: 'Full Featured (All Props)',
  args: {
    maxWidth: 1000,
    padding: 32,
    fullWidth: true,
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Placeholder label="Section 1 - Full width bg, 1000px content, 32px padding" height={120} />
        <Placeholder label="Section 2" height={80} />
      </div>
    ),
    style: { background: '#FFF5F0' },
  },
};

/* ─── Realistic: Page Sections ─── */

export const PageSections: Story = {
  name: 'Page with Multiple Sections',
  render: () => (
    <div>
      <DesktopContainer fullWidth style={{ background: '#FF5000' }}>
        <div style={{ padding: '40px 0', color: '#fff', textAlign: 'center' }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Welcome to GeekShop</h1>
          <p style={{ fontSize: 16, opacity: 0.9 }}>The best tech marketplace in Central Asia</p>
        </div>
      </DesktopContainer>
      <DesktopContainer maxWidth={1200} style={{ marginTop: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {Array.from({ length: 4 }, (_, i) => (
            <Placeholder key={i} label={`Product ${i + 1}`} height={200} />
          ))}
        </div>
      </DesktopContainer>
      <DesktopContainer fullWidth style={{ background: '#F5F5F5', marginTop: 24 }}>
        <div style={{ padding: '32px 0' }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, textAlign: 'center' }}>Featured Categories</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
            {['Laptops', 'Phones', 'GPUs', 'Audio', 'Monitors', 'Gaming'].map((cat) => (
              <Placeholder key={cat} label={cat} height={100} bg="#fff" />
            ))}
          </div>
        </div>
      </DesktopContainer>
      <DesktopContainer maxWidth={800} style={{ marginTop: 24, marginBottom: 24 }}>
        <Placeholder label="Newsletter signup section (narrower container)" height={120} bg="#FFF5F0" />
      </DesktopContainer>
    </div>
  ),
};

/* ─── All Widths Comparison ─── */

export const AllWidthsComparison: Story = {
  name: 'Width Comparison',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, background: '#F5F5F5', padding: '24px 0' }}>
      <DesktopContainer maxWidth={480}>
        <Placeholder label="480px (Forms, Login)" height={60} />
      </DesktopContainer>
      <DesktopContainer maxWidth={800}>
        <Placeholder label="800px (Blog Posts)" height={60} />
      </DesktopContainer>
      <DesktopContainer maxWidth={1000}>
        <Placeholder label="1000px (Medium Content)" height={60} />
      </DesktopContainer>
      <DesktopContainer maxWidth={1200}>
        <Placeholder label="1200px (Default)" height={60} />
      </DesktopContainer>
      <DesktopContainer maxWidth={1440}>
        <Placeholder label="1440px (Wide Layout)" height={60} />
      </DesktopContainer>
    </div>
  ),
};
