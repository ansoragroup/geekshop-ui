import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopPopup } from './DesktopPopup';

const meta = {
  title: 'Feedback (Desktop)/DesktopPopup',
  component: DesktopPopup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── 1. Default (Confirm Action) ─────────────────────────────────────────────

export const Default: Story = {
  args: {
    open: true,
    title: 'Confirm Action',
    width: 480,
    children: (
      <div>
        <p style={{ margin: '0 0 16px', color: '#666', fontSize: 14, lineHeight: 1.5 }}>
          Are you sure you want to remove this item from your cart? This action cannot be undone.
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button
            type="button"
            style={{
              padding: '8px 20px',
              borderRadius: 8,
              border: '1px solid #eee',
              background: '#fff',
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            style={{
              padding: '8px 20px',
              borderRadius: 8,
              border: 'none',
              background: '#FF5000',
              color: '#fff',
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            Remove
          </button>
        </div>
      </div>
    ),
  },
};

// ─── 2. Full Featured (Order Summary) ────────────────────────────────────────

export const FullFeatured: Story = {
  name: 'Full Featured (All Props)',
  args: {
    open: true,
    title: 'Order Summary',
    width: 520,
    closable: true,
    children: (
      <div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
            <span style={{ color: '#666' }}>MSI RTX 4060 Ventus 2X</span>
            <span style={{ fontWeight: 600 }}>12,500,000 UZS</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
            <span style={{ color: '#666' }}>AMD Ryzen 7 7800X3D</span>
            <span style={{ fontWeight: 600 }}>8,200,000 UZS</span>
          </div>
          <div
            style={{
              borderTop: '1px solid #eee',
              paddingTop: 12,
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 14,
            }}
          >
            <span style={{ color: '#666' }}>Shipping</span>
            <span style={{ fontWeight: 600, color: '#07C160' }}>Free</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16 }}>
            <span style={{ fontWeight: 700 }}>Total</span>
            <span style={{ fontWeight: 700, color: '#FF0000' }}>20,700,000 UZS</span>
          </div>
        </div>
        <button
          type="button"
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: 8,
            border: 'none',
            background: '#FF5000',
            color: '#fff',
            cursor: 'pointer',
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          Proceed to Payment
        </button>
      </div>
    ),
  },
};

// ─── 3. Without Title (Success) ──────────────────────────────────────────────

export const WithoutTitle: Story = {
  args: {
    open: true,
    width: 400,
    children: (
      <div style={{ textAlign: 'center', padding: '24px 0' }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: '#E8F8EF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M8 16L14 22L24 10"
              stroke="#07C160"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 600 }}>Order Placed!</h3>
        <p style={{ margin: 0, color: '#666', fontSize: 14 }}>
          Your order #GS-2026-0082 has been confirmed.
        </p>
      </div>
    ),
  },
};

// ─── 4. Interactive (Toggle) ─────────────────────────────────────────────────

export const Interactive: Story = {
  name: 'Interactive (Toggle)',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <button
          onClick={() => setOpen(true)}
          style={{
            padding: '10px 24px',
            borderRadius: 8,
            border: 'none',
            background: '#FF5000',
            color: '#fff',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          Open Popup
        </button>
        <DesktopPopup open={open} onClose={() => setOpen(false)} title="Desktop Popup" width={500}>
          <p style={{ margin: 0, color: '#666', fontSize: 14, lineHeight: 1.6 }}>
            This is a desktop popup with a centered overlay, close button in the top-right corner,
            and semi-transparent backdrop. Click outside or press Escape to close.
          </p>
        </DesktopPopup>
      </div>
    );
  },
};

// ─── 5. Non-Closable (Processing) ────────────────────────────────────────────

export const NonClosable: Story = {
  name: 'Non-Closable (Processing)',
  args: {
    open: true,
    closable: false,
    title: 'Processing Payment',
    width: 400,
    children: (
      <div style={{ textAlign: 'center', padding: '16px 0' }}>
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          style={{ animation: 'spin 1s linear infinite' }}
        >
          <circle cx="20" cy="20" r="16" stroke="#eee" strokeWidth="3" />
          <path
            d="M20 4a16 16 0 0 1 16 16"
            stroke="#FF5000"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        <p style={{ margin: '16px 0 0', color: '#666', fontSize: 14 }}>
          Please wait while we process your payment...
        </p>
      </div>
    ),
  },
};

// ─── 6. Narrow Width ─────────────────────────────────────────────────────────

export const NarrowWidth: Story = {
  name: 'Narrow (320px)',
  args: {
    open: true,
    title: 'Quick Tip',
    width: 320,
    children: (
      <p style={{ margin: 0, color: '#666', fontSize: 14, lineHeight: 1.6 }}>
        Use code <strong>SAVE10</strong> at checkout to get 10% off your first order.
      </p>
    ),
  },
};

// ─── 7. Wide Width ───────────────────────────────────────────────────────────

export const WideWidth: Story = {
  name: 'Wide (720px)',
  args: {
    open: true,
    title: 'Product Comparison',
    width: 720,
    children: (
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #eee' }}>
            <th style={{ textAlign: 'left', padding: '10px 12px', color: '#666' }}>Feature</th>
            <th style={{ textAlign: 'left', padding: '10px 12px' }}>RTX 4060</th>
            <th style={{ textAlign: 'left', padding: '10px 12px' }}>RTX 4070</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['VRAM', '8GB GDDR6', '12GB GDDR6X'],
            ['Base Clock', '1830 MHz', '1920 MHz'],
            ['TDP', '115W', '200W'],
            ['Price', '12.5M UZS', '22M UZS'],
          ].map(([feature, ...values]) => (
            <tr key={feature} style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '10px 12px', fontWeight: 600, color: '#666' }}>{feature}</td>
              {values.map((v, i) => (
                <td key={i} style={{ padding: '10px 12px' }}>
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    ),
  },
};

// ─── 8. Form Content (Address) ───────────────────────────────────────────────

export const FormContent: Story = {
  name: 'Form Inside Popup',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <button
          onClick={() => setOpen(true)}
          style={{
            padding: '10px 24px',
            borderRadius: 8,
            border: '1px solid #ddd',
            background: '#fff',
            cursor: 'pointer',
            fontSize: 14,
          }}
        >
          Add Address
        </button>
        <DesktopPopup
          open={open}
          onClose={() => setOpen(false)}
          title="Add Delivery Address"
          width={520}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <label
                  htmlFor="dp-fname"
                  style={{
                    display: 'block',
                    fontSize: 13,
                    fontWeight: 600,
                    marginBottom: 6,
                    color: '#333',
                  }}
                >
                  First Name
                </label>
                <input
                  id="dp-fname"
                  type="text"
                  placeholder="John"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: '1px solid #ddd',
                    fontSize: 14,
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label
                  htmlFor="dp-lname"
                  style={{
                    display: 'block',
                    fontSize: 13,
                    fontWeight: 600,
                    marginBottom: 6,
                    color: '#333',
                  }}
                >
                  Last Name
                </label>
                <input
                  id="dp-lname"
                  type="text"
                  placeholder="Doe"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: '1px solid #ddd',
                    fontSize: 14,
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="dp-address"
                style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 6,
                  color: '#333',
                }}
              >
                Address
              </label>
              <input
                id="dp-address"
                type="text"
                placeholder="123 Main Street"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: '1px solid #ddd',
                  fontSize: 14,
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ flex: 2 }}>
                <label
                  htmlFor="dp-city"
                  style={{
                    display: 'block',
                    fontSize: 13,
                    fontWeight: 600,
                    marginBottom: 6,
                    color: '#333',
                  }}
                >
                  City
                </label>
                <input
                  id="dp-city"
                  type="text"
                  placeholder="Tashkent"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: '1px solid #ddd',
                    fontSize: 14,
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label
                  htmlFor="dp-zip"
                  style={{
                    display: 'block',
                    fontSize: 13,
                    fontWeight: 600,
                    marginBottom: 6,
                    color: '#333',
                  }}
                >
                  Zip Code
                </label>
                <input
                  id="dp-zip"
                  type="text"
                  placeholder="100000"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: '1px solid #ddd',
                    fontSize: 14,
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 8,
                border: 'none',
                background: '#FF5000',
                color: '#fff',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600,
                marginTop: 4,
              }}
            >
              Save Address
            </button>
          </div>
        </DesktopPopup>
      </div>
    );
  },
};

// ─── 9. Error State ──────────────────────────────────────────────────────────

export const ErrorState: Story = {
  name: 'Error State Content',
  args: {
    open: true,
    title: 'Payment Failed',
    width: 420,
    children: (
      <div style={{ textAlign: 'center', padding: '8px 0' }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: '#FFF0F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
          }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path
              d="M8 8l12 12M20 8l-12 12"
              stroke="#FF3B30"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <p style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 600 }}>Transaction Declined</p>
        <p style={{ margin: '0 0 16px', color: '#666', fontSize: 14, lineHeight: 1.5 }}>
          Your card ending in 4242 was declined. Please check your card details or try a different
          payment method.
        </p>
        <button
          type="button"
          style={{
            padding: '10px 24px',
            borderRadius: 8,
            border: 'none',
            background: '#FF5000',
            color: '#fff',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          Try Again
        </button>
      </div>
    ),
  },
};

// ─── 10. Image Gallery ───────────────────────────────────────────────────────

export const ImageGallery: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const images = [
      'https://images.unsplash.com/photo-1587831990691-b10bea7e5e39?w=300&h=220&fit=crop',
      'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=300&h=220&fit=crop',
      'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=300&h=220&fit=crop',
      'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=300&h=220&fit=crop',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=300&h=220&fit=crop',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=220&fit=crop',
    ];
    return (
      <div>
        <button
          onClick={() => setOpen(true)}
          style={{
            padding: '10px 24px',
            borderRadius: 8,
            border: 'none',
            background: '#FF5000',
            color: '#fff',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          View All Photos
        </button>
        <DesktopPopup
          open={open}
          onClose={() => setOpen(false)}
          title="Product Photos (6)"
          width={680}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Product ${i + 1}`}
                style={{
                  width: '100%',
                  borderRadius: 8,
                  objectFit: 'cover',
                  aspectRatio: '4/3',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        </DesktopPopup>
      </div>
    );
  },
};

// ─── 11. String Width (CSS value) ────────────────────────────────────────────

export const StringWidth: Story = {
  name: 'Width as CSS String (50vw)',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <button
          onClick={() => setOpen(true)}
          style={{
            padding: '10px 24px',
            borderRadius: 8,
            border: 'none',
            background: '#FF5000',
            color: '#fff',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          Open 50vw Popup
        </button>
        <DesktopPopup
          open={open}
          onClose={() => setOpen(false)}
          title="Responsive Width"
          width="50vw"
        >
          <div>
            <p style={{ margin: '0 0 16px', fontSize: 14, color: '#666', lineHeight: 1.6 }}>
              This popup uses a CSS string width of <code>50vw</code> instead of a pixel value. It
              will always take up half the viewport width regardless of screen size.
            </p>
            <div style={{ padding: 16, background: '#f5f5f5', borderRadius: 8 }}>
              <div style={{ fontSize: 13, color: '#999', marginBottom: 4 }}>Current width:</div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>50% of viewport</div>
            </div>
          </div>
        </DesktopPopup>
      </div>
    );
  },
};

// ─── 12. Long Scrollable FAQ ─────────────────────────────────────────────────

export const LongContent: Story = {
  name: 'Long Scrollable Content',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <button
          onClick={() => setOpen(true)}
          style={{
            padding: '10px 24px',
            borderRadius: 8,
            border: 'none',
            background: '#FF5000',
            color: '#fff',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          View FAQ
        </button>
        <DesktopPopup
          open={open}
          onClose={() => setOpen(false)}
          title="Frequently Asked Questions"
          width={560}
        >
          <div style={{ fontSize: 14, lineHeight: 1.7, color: '#666' }}>
            {[
              {
                q: 'How long does shipping take?',
                a: 'Standard delivery takes 3-5 business days within Uzbekistan. Express delivery (1-2 days) is available for an additional 25,000 UZS.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept Uzcard, Humo, Visa, Mastercard, bank transfers, and installment payments through our partner banks.',
              },
              {
                q: 'Can I return a product?',
                a: 'Yes, you can return most products within 14 days of delivery. Electronics have a 7-day return window. Items must be unused and in original packaging.',
              },
              {
                q: 'Do you offer installment payments?',
                a: 'Yes! We partner with Anor Bank, Ipoteka Bank, and Kapitalbank to offer 3, 6, and 12-month installment plans on eligible products.',
              },
              {
                q: 'How do I track my order?',
                a: 'After your order ships, you will receive a tracking number via SMS and email. You can also track orders in real-time from your account dashboard.',
              },
              {
                q: 'Is there a warranty on products?',
                a: 'All products come with manufacturer warranty (1-3 years depending on the product). GeekShop provides an additional 30-day satisfaction guarantee.',
              },
            ].map((faq, i) => (
              <div key={i} style={{ marginBottom: 20 }}>
                <h4 style={{ color: '#333', margin: '0 0 6px', fontSize: 14 }}>{faq.q}</h4>
                <p style={{ margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </DesktopPopup>
      </div>
    );
  },
};
