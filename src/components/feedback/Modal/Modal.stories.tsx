import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Modal } from './Modal';

const meta = {
  title: 'Feedback/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const CancelButton = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    style={{
      padding: '8px 20px',
      borderRadius: 8,
      border: '1px solid #eee',
      background: '#fff',
      cursor: 'pointer',
      fontSize: 14,
      minHeight: 36,
    }}
  >
    Cancel
  </button>
);

const ConfirmButton = ({
  onClick,
  label = 'Confirm',
}: {
  onClick?: () => void;
  label?: string;
}) => (
  <button
    onClick={onClick}
    style={{
      padding: '8px 20px',
      borderRadius: 8,
      border: 'none',
      background: '#FF5000',
      color: '#fff',
      cursor: 'pointer',
      fontSize: 14,
      fontWeight: 600,
      minHeight: 36,
    }}
  >
    {label}
  </button>
);

export const Default: Story = {
  args: {
    open: true,
    title: 'Confirm Order',
    onClose: fn(),
    children: (
      <div>
        <p style={{ color: '#666', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
          You are about to place an order for <strong>NVIDIA GeForce RTX 4090</strong>. The total
          amount is <strong style={{ color: '#FF0000' }}>24 990 000 sum</strong>.
        </p>
        <p style={{ color: '#999', fontSize: 13, marginTop: 12 }}>
          Your order will be shipped within 1-3 business days.
        </p>
      </div>
    ),
    footer: (
      <div style={{ display: 'flex', gap: 8 }}>
        <CancelButton />
        <ConfirmButton label="Place Order" />
      </div>
    ),
  },
};

export const WithoutFooter: Story = {
  args: {
    open: true,
    title: 'Product Specifications',
    onClose: fn(),
    width: 560,
    children: (
      <div style={{ fontSize: 14, color: '#333' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {[
              ['GPU', 'NVIDIA GeForce RTX 4090'],
              ['Memory', '24 GB GDDR6X'],
              ['Boost Clock', '2.52 GHz'],
              ['Memory Interface', '384-bit'],
              ['TDP', '450W'],
              ['Connectors', '1x 16-pin'],
            ].map(([label, value]) => (
              <tr key={label} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px 0', color: '#999', width: '40%' }}>{label}</td>
                <td style={{ padding: '10px 0', fontWeight: 500 }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
};

export const Narrow: Story = {
  args: {
    open: true,
    title: 'Delete Item',
    onClose: fn(),
    width: 360,
    children: (
      <p style={{ color: '#666', fontSize: 14, lineHeight: 1.6, margin: 0, textAlign: 'center' }}>
        Are you sure you want to remove this item from your cart? This action cannot be undone.
      </p>
    ),
    footer: (
      <div style={{ display: 'flex', gap: 8, width: '100%' }}>
        <CancelButton />
        <button
          style={{
            flex: 1,
            padding: '8px 20px',
            borderRadius: 8,
            border: 'none',
            background: '#FF3B30',
            color: '#fff',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 600,
            minHeight: 36,
          }}
        >
          Delete
        </button>
      </div>
    ),
  },
};

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <button
          onClick={() => setOpen(true)}
          style={{
            padding: '10px 24px',
            background: '#FF5000',
            color: '#fff',
            borderRadius: 8,
            border: 'none',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          Open Modal
        </button>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Add to Cart"
          footer={
            <div style={{ display: 'flex', gap: 8 }}>
              <CancelButton onClick={() => setOpen(false)} />
              <ConfirmButton onClick={() => setOpen(false)} label="Add to Cart" />
            </div>
          }
        >
          <div style={{ fontSize: 14, color: '#666', lineHeight: 1.6 }}>
            <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  background: '#F5F5F5',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#999',
                  fontSize: 12,
                }}
              >
                Image
              </div>
              <div>
                <div style={{ fontWeight: 600, color: '#1A1A1A', marginBottom: 4 }}>
                  AMD Ryzen 9 7950X
                </div>
                <div style={{ color: '#FF0000', fontWeight: 700, fontSize: 16 }}>8 990 000 sum</div>
              </div>
            </div>
            <p style={{ margin: 0 }}>16 cores, 32 threads, 5.7 GHz boost clock. AM5 platform.</p>
          </div>
        </Modal>
      </div>
    );
  },
};

export const CloseTest: Story = {
  args: {
    open: true,
    title: 'Test Modal',
    onClose: fn(),
    children: <p>Modal test content</p>,
    footer: <ConfirmButton />,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Verify the dialog is visible
    const dialog = canvas.getByRole('dialog');
    await expect(dialog).toBeInTheDocument();
    await expect(dialog).toHaveAttribute('aria-modal', 'true');

    // Find and click the close button (aria-label is t('aria.close') — Uzbek: "Yopish")
    const closeButton = canvas.getByRole('button', { name: /yopish/i });
    await expect(closeButton).toBeInTheDocument();
    await userEvent.click(closeButton);

    // Verify onClose was called
    await expect(args.onClose).toHaveBeenCalledTimes(1);
  },
};
