import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopDivider } from './DesktopDivider';

const meta = {
  title: 'Layout (Desktop)/DesktopDivider',
  component: DesktopDivider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    direction: { control: 'radio', options: ['horizontal', 'vertical'] },
    variant: { control: 'radio', options: ['solid', 'dashed'] },
    color: { control: 'color' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 900, padding: 24, background: '#fff' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopDivider>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Basic Horizontal ─── */

export const Default: Story = {};

export const Solid: Story = {
  name: 'Solid (Default)',
  args: {
    variant: 'solid',
  },
};

export const Dashed: Story = {
  args: {
    variant: 'dashed',
  },
};

/* ─── With Label ─── */

export const WithLabel: Story = {
  args: {
    label: 'OR',
  },
};

export const DashedWithLabel: Story = {
  name: 'Dashed with Label',
  args: {
    variant: 'dashed',
    label: 'More options',
  },
};

export const LongLabel: Story = {
  args: {
    label: 'Continue with social accounts',
  },
};

/* ─── Custom Colors ─── */

export const CustomColorPrimary: Story = {
  name: 'Custom Color (Primary)',
  args: {
    color: '#FF5000',
    label: 'Primary divider',
  },
};

export const CustomColorSuccess: Story = {
  name: 'Custom Color (Success)',
  args: {
    color: '#07C160',
    label: 'Approved',
  },
};

export const CustomColorError: Story = {
  name: 'Custom Color (Error)',
  args: {
    color: '#FF3B30',
  },
};

export const CustomColorInfo: Story = {
  name: 'Custom Color (Info)',
  args: {
    color: '#1890FF',
    label: 'Information',
  },
};

/* ─── Vertical ─── */

export const Vertical: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          width: 900,
          padding: 24,
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          height: 48,
        }}
      >
        <span style={{ fontSize: 14, color: '#666' }}>Section A</span>
        <Story />
        <span style={{ fontSize: 14, color: '#666' }}>Section B</span>
      </div>
    ),
  ],
  args: {
    direction: 'vertical',
  },
};

export const VerticalDashed: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          width: 900,
          padding: 24,
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          height: 48,
        }}
      >
        <span style={{ fontSize: 14, color: '#666' }}>Left</span>
        <Story />
        <span style={{ fontSize: 14, color: '#666' }}>Right</span>
      </div>
    ),
  ],
  args: {
    direction: 'vertical',
    variant: 'dashed',
  },
};

export const VerticalColored: Story = {
  name: 'Vertical with Custom Color',
  decorators: [
    (Story) => (
      <div
        style={{
          width: 900,
          padding: 24,
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          height: 48,
        }}
      >
        <span style={{ fontSize: 14, color: '#666' }}>Price</span>
        <Story />
        <span style={{ fontSize: 14, color: '#666' }}>Discount</span>
      </div>
    ),
  ],
  args: {
    direction: 'vertical',
    color: '#FF5000',
  },
};

/* ─── Multiple Vertical Dividers ─── */

export const MultipleVertical: Story = {
  name: 'Multiple Vertical (Breadcrumb Style)',
  decorators: [
    (Story) => (
      <div style={{ width: 900, padding: 24, background: '#fff' }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 24 }}>
      <span style={{ fontSize: 14, color: '#1A1A1A' }}>Electronics</span>
      <DesktopDivider direction="vertical" />
      <span style={{ fontSize: 14, color: '#1A1A1A' }}>Computers</span>
      <DesktopDivider direction="vertical" />
      <span style={{ fontSize: 14, color: '#1A1A1A' }}>Laptops</span>
      <DesktopDivider direction="vertical" />
      <span style={{ fontSize: 14, color: '#FF5000', fontWeight: 600 }}>MacBook Pro</span>
    </div>
  ),
};

/* ─── All Variants Overview ─── */

export const AllVariantsOverview: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div
          style={{
            fontSize: 12,
            color: '#999',
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          Solid
        </div>
        <DesktopDivider variant="solid" />
      </div>
      <div>
        <div
          style={{
            fontSize: 12,
            color: '#999',
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          Dashed
        </div>
        <DesktopDivider variant="dashed" />
      </div>
      <div>
        <div
          style={{
            fontSize: 12,
            color: '#999',
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          With Label (Solid)
        </div>
        <DesktopDivider label="OR" />
      </div>
      <div>
        <div
          style={{
            fontSize: 12,
            color: '#999',
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          With Label (Dashed)
        </div>
        <DesktopDivider variant="dashed" label="OR" />
      </div>
      <div>
        <div
          style={{
            fontSize: 12,
            color: '#999',
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          Primary Color
        </div>
        <DesktopDivider color="#FF5000" />
      </div>
      <div>
        <div
          style={{
            fontSize: 12,
            color: '#999',
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          Primary + Label
        </div>
        <DesktopDivider color="#FF5000" label="GeekShop" />
      </div>
    </div>
  ),
};

/* ─── Full Featured ─── */

export const FullFeatured: Story = {
  name: 'Full Featured (All Props)',
  args: {
    direction: 'horizontal',
    variant: 'solid',
    label: 'Section Break',
    color: '#FF5000',
  },
};

/* ─── Realistic: Login Form ─── */

export const LoginFormDivider: Story = {
  name: 'Login Form (OR Divider)',
  render: () => (
    <div
      style={{ maxWidth: 360, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      <div
        style={{
          height: 44,
          background: '#0088CC',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        Continue with Telegram
      </div>
      <DesktopDivider label="OR" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          type="email"
          placeholder="Email address"
          style={{
            width: '100%',
            height: 44,
            padding: '0 12px',
            border: '1.5px solid #eee',
            borderRadius: 8,
            fontSize: 14,
            boxSizing: 'border-box',
          }}
        />
        <input
          type="password"
          placeholder="Password"
          style={{
            width: '100%',
            height: 44,
            padding: '0 12px',
            border: '1.5px solid #eee',
            borderRadius: 8,
            fontSize: 14,
            boxSizing: 'border-box',
          }}
        />
        <div
          style={{
            height: 44,
            background: '#FF5000',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          Log In
        </div>
      </div>
    </div>
  ),
};

/* ─── Realistic: Product Detail Sections ─── */

export const ProductDetailSections: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Product Description</h3>
        <p style={{ fontSize: 14, color: '#666', lineHeight: 1.6 }}>
          The NVIDIA GeForce RTX 4090 is the ultimate gaming GPU, powered by the NVIDIA Ada Lovelace
          architecture.
        </p>
      </div>
      <DesktopDivider />
      <div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Specifications</h3>
        <p style={{ fontSize: 14, color: '#666', lineHeight: 1.6 }}>
          Memory: 24GB GDDR6X | Boost Clock: 2520 MHz | CUDA Cores: 16384
        </p>
      </div>
      <DesktopDivider variant="dashed" />
      <div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Customer Reviews</h3>
        <p style={{ fontSize: 14, color: '#666' }}>4.8/5 based on 342 reviews</p>
      </div>
    </div>
  ),
};

/* ─── Inline Stats ─── */

export const InlineStats: Story = {
  name: 'Inline Stats with Vertical Dividers',
  decorators: [
    (Story) => (
      <div style={{ width: 900, padding: 24, background: '#fff' }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '16px 0' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: '#1A1A1A' }}>1,247</div>
        <div style={{ fontSize: 12, color: '#999' }}>Products</div>
      </div>
      <DesktopDivider direction="vertical" />
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: '#1A1A1A' }}>98%</div>
        <div style={{ fontSize: 12, color: '#999' }}>Satisfaction</div>
      </div>
      <DesktopDivider direction="vertical" />
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: '#1A1A1A' }}>24h</div>
        <div style={{ fontSize: 12, color: '#999' }}>Delivery</div>
      </div>
      <DesktopDivider direction="vertical" />
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: '#FF5000' }}>Free</div>
        <div style={{ fontSize: 12, color: '#999' }}>Shipping</div>
      </div>
    </div>
  ),
};
