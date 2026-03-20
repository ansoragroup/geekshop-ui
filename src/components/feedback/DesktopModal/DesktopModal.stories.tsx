import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopModal } from './DesktopModal';

const meta = {
  title: 'Feedback (Desktop)/DesktopModal',
  component: DesktopModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const FooterButtons = ({ onClose }: { onClose: () => void }) => (
  <>
    <button
      type="button"
      onClick={onClose}
      style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid #eee', background: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 500 }}
    >
      Cancel
    </button>
    <button
      type="button"
      onClick={onClose}
      style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: '#FF5000', color: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}
    >
      Save Changes
    </button>
  </>
);

export const Default: Story = {
  args: {
    open: false,
    onClose: () => {},
    title: 'Edit Product',
    width: 640,
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
          Open Modal
        </button>
        <DesktopModal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          footer={<FooterButtons onClose={() => setOpen(false)} />}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label htmlFor="modal-product-name" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#333' }}>Product Name</label>
              <input id="modal-product-name" type="text" defaultValue="MSI RTX 4060 Ventus 2X" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label htmlFor="modal-description" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#333' }}>Description</label>
              <textarea id="modal-description" rows={4} defaultValue="High-performance graphics card with dual-fan cooling..." style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14, boxSizing: 'border-box', resize: 'vertical' }} />
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <label htmlFor="modal-price" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#333' }}>Price (UZS)</label>
                <input id="modal-price" type="text" defaultValue="12,500,000" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14, boxSizing: 'border-box' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label htmlFor="modal-stock" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#333' }}>Stock</label>
                <input id="modal-stock" type="number" defaultValue={24} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14, boxSizing: 'border-box' }} />
              </div>
            </div>
          </div>
        </DesktopModal>
      </div>
    );
  },
};

export const WideModal: Story = {
  args: {
    open: false,
    onClose: () => {},
    title: 'Product Comparison',
    width: 900,
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
          Compare Products
        </button>
        <DesktopModal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee' }}>
                <th style={{ textAlign: 'left', padding: '10px 12px', color: '#666' }}>Feature</th>
                <th style={{ textAlign: 'left', padding: '10px 12px' }}>RTX 4060</th>
                <th style={{ textAlign: 'left', padding: '10px 12px' }}>RTX 4070</th>
                <th style={{ textAlign: 'left', padding: '10px 12px' }}>RTX 4080</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['VRAM', '8GB', '12GB', '16GB'],
                ['Base Clock', '1830 MHz', '1920 MHz', '2205 MHz'],
                ['TDP', '115W', '200W', '320W'],
                ['Price', '12.5M UZS', '22M UZS', '42M UZS'],
              ].map(([feature, ...values]) => (
                <tr key={feature} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600, color: '#666' }}>{feature}</td>
                  {values.map((v, i) => (
                    <td key={i} style={{ padding: '10px 12px' }}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </DesktopModal>
      </div>
    );
  },
};

export const NotClosable: Story = {
  args: {
    open: false,
    onClose: () => {},
    title: 'Terms & Conditions',
    closable: false,
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
          View Terms
        </button>
        <DesktopModal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          footer={
            <button
              type="button"
              onClick={() => setOpen(false)}
              style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: '#FF5000', color: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}
            >
              I Accept
            </button>
          }
        >
          <div style={{ fontSize: 14, lineHeight: 1.7, color: '#666' }}>
            <p>By using GeekShop services, you agree to the following terms and conditions...</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
          </div>
        </DesktopModal>
      </div>
    );
  },
};
