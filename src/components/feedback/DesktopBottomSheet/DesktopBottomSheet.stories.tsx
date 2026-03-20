import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopBottomSheet } from './DesktopBottomSheet';

const meta = {
  title: 'Feedback (Desktop)/DesktopBottomSheet',
  component: DesktopBottomSheet,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopBottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleContent = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <div style={{ padding: 16, background: '#f5f5f5', borderRadius: 8 }}>
      <h4 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 600 }}>Filter by Category</h4>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {['Electronics', 'Phones', 'Laptops', 'Accessories', 'Gaming'].map((cat) => (
          <span key={cat} style={{ padding: '6px 12px', borderRadius: 20, border: '1px solid #ddd', fontSize: 13, cursor: 'pointer' }}>{cat}</span>
        ))}
      </div>
    </div>
    <div style={{ padding: 16, background: '#f5f5f5', borderRadius: 8 }}>
      <h4 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 600 }}>Price Range</h4>
      <p style={{ margin: 0, fontSize: 13, color: '#666' }}>500,000 - 50,000,000 UZS</p>
    </div>
    <div style={{ padding: 16, background: '#f5f5f5', borderRadius: 8 }}>
      <h4 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 600 }}>Brand</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {['Apple', 'Samsung', 'Xiaomi', 'Huawei', 'Sony', 'LG', 'Lenovo'].map((brand) => (
          <label key={brand} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
            <input type="checkbox" /> {brand}
          </label>
        ))}
      </div>
    </div>
  </div>
);

const FooterButtons = ({ onClose }: { onClose: () => void }) => (
  <>
    <button
      type="button"
      onClick={onClose}
      style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid #eee', background: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 500 }}
    >
      Reset
    </button>
    <button
      type="button"
      onClick={onClose}
      style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: '#FF5000', color: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}
    >
      Apply Filters
    </button>
  </>
);

export const Default: Story = {
  args: {
    open: false,
    onClose: () => {},
    title: 'Filters',
    children: null,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 24 }}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 14 }}
        >
          Open Drawer
        </button>
        <DesktopBottomSheet
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          footer={<FooterButtons onClose={() => setOpen(false)} />}
        >
          <SampleContent />
        </DesktopBottomSheet>
      </div>
    );
  },
};

export const WithFooter: Story = {
  args: {
    open: false,
    onClose: () => {},
    title: 'Order Details',
    width: 520,
    children: null,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 24 }}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 14 }}
        >
          View Order
        </button>
        <DesktopBottomSheet
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          footer={<FooterButtons onClose={() => setOpen(false)} />}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p style={{ margin: 0, fontSize: 14, color: '#666' }}>Order #GS-2026-0047 placed on 14 Mar 2026</p>
            <div style={{ padding: 16, background: '#f5f5f5', borderRadius: 8 }}>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>MSI RTX 4060 Ventus 2X</p>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: '#FF0000', fontWeight: 600 }}>12,500,000 UZS</p>
            </div>
            <div style={{ padding: 16, background: '#f5f5f5', borderRadius: 8 }}>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>AMD Ryzen 7 7800X3D</p>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: '#FF0000', fontWeight: 600 }}>8,200,000 UZS</p>
            </div>
          </div>
        </DesktopBottomSheet>
      </div>
    );
  },
};

export const NarrowWidth: Story = {
  args: {
    open: false,
    onClose: () => {},
    title: 'Quick Settings',
    width: 360,
    children: null,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 24 }}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 14 }}
        >
          Open Settings
        </button>
        <DesktopBottomSheet
          {...args}
          open={open}
          onClose={() => setOpen(false)}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['Dark Mode', 'Notifications', 'Sound', 'Language'].map((setting) => (
              <div key={setting} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #eee' }}>
                <span style={{ fontSize: 14 }}>{setting}</span>
                <span style={{ fontSize: 12, color: '#999' }}>On</span>
              </div>
            ))}
          </div>
        </DesktopBottomSheet>
      </div>
    );
  },
};
