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

// ─── Reusable helpers ────────────────────────────────────────────────────────

const TriggerButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      padding: '10px 20px',
      borderRadius: 8,
      border: '1px solid #ddd',
      background: '#fff',
      cursor: 'pointer',
      fontSize: 14,
    }}
  >
    {label}
  </button>
);

const FooterButtons = ({
  onClose,
  primaryLabel = 'Apply',
  secondaryLabel = 'Reset',
}: {
  onClose: () => void;
  primaryLabel?: string;
  secondaryLabel?: string;
}) => (
  <>
    <button
      type="button"
      onClick={onClose}
      style={{
        padding: '10px 20px',
        borderRadius: 8,
        border: '1px solid #eee',
        background: '#fff',
        cursor: 'pointer',
        fontSize: 14,
        fontWeight: 500,
      }}
    >
      {secondaryLabel}
    </button>
    <button
      type="button"
      onClick={onClose}
      style={{
        padding: '10px 20px',
        borderRadius: 8,
        border: 'none',
        background: '#FF5000',
        color: '#fff',
        cursor: 'pointer',
        fontSize: 14,
        fontWeight: 600,
      }}
    >
      {primaryLabel}
    </button>
  </>
);

// ─── 1. Default (Filter Panel) ───────────────────────────────────────────────

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
        <TriggerButton label="Open Drawer" onClick={() => setOpen(true)} />
        <DesktopBottomSheet
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          footer={<FooterButtons onClose={() => setOpen(false)} primaryLabel="Apply Filters" />}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ padding: 16, background: '#f5f5f5', borderRadius: 8 }}>
              <h4 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 600 }}>
                Filter by Category
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['Electronics', 'Phones', 'Laptops', 'Accessories', 'Gaming'].map((cat) => (
                  <span
                    key={cat}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 20,
                      border: '1px solid #ddd',
                      fontSize: 13,
                      cursor: 'pointer',
                    }}
                  >
                    {cat}
                  </span>
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
                  <label
                    key={brand}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      fontSize: 13,
                      cursor: 'pointer',
                    }}
                  >
                    <input type="checkbox" /> {brand}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </DesktopBottomSheet>
      </div>
    );
  },
};

// ─── 2. With Footer (Order Details) ──────────────────────────────────────────

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
        <TriggerButton label="View Order" onClick={() => setOpen(true)} />
        <DesktopBottomSheet
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          footer={
            <FooterButtons
              onClose={() => setOpen(false)}
              primaryLabel="Track Order"
              secondaryLabel="Close"
            />
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p style={{ margin: 0, fontSize: 14, color: '#666' }}>
              Order #GS-2026-0047 placed on 14 Mar 2026
            </p>
            <div style={{ padding: 16, background: '#f5f5f5', borderRadius: 8 }}>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>MSI RTX 4060 Ventus 2X</p>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: '#FF0000', fontWeight: 600 }}>
                12,500,000 UZS
              </p>
            </div>
            <div style={{ padding: 16, background: '#f5f5f5', borderRadius: 8 }}>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>AMD Ryzen 7 7800X3D</p>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: '#FF0000', fontWeight: 600 }}>
                8,200,000 UZS
              </p>
            </div>
          </div>
        </DesktopBottomSheet>
      </div>
    );
  },
};

// ─── 3. Narrow Width ─────────────────────────────────────────────────────────

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
        <TriggerButton label="Open Settings" onClick={() => setOpen(true)} />
        <DesktopBottomSheet {...args} open={open} onClose={() => setOpen(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['Dark Mode', 'Notifications', 'Sound', 'Language'].map((setting) => (
              <div
                key={setting}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: '1px solid #eee',
                }}
              >
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

// ─── 4. Wide Width ───────────────────────────────────────────────────────────

export const WideWidth: Story = {
  name: 'Wide (680px)',
  args: {
    open: false,
    onClose: () => {},
    title: 'Product Comparison',
    width: 680,
    children: null,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 24 }}>
        <TriggerButton label="Compare Products" onClick={() => setOpen(true)} />
        <DesktopBottomSheet {...args} open={open} onClose={() => setOpen(false)}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee' }}>
                <th style={{ textAlign: 'left', padding: '10px 12px', color: '#666' }}>Feature</th>
                <th style={{ textAlign: 'left', padding: '10px 12px' }}>iPhone 16 Pro</th>
                <th style={{ textAlign: 'left', padding: '10px 12px' }}>Galaxy S25 Ultra</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Display', '6.3" ProMotion OLED', '6.9" AMOLED 120Hz'],
                ['Processor', 'A18 Pro', 'Snapdragon 8 Elite'],
                ['RAM', '8GB', '12GB'],
                ['Storage', '256GB / 512GB / 1TB', '256GB / 512GB / 1TB'],
                ['Camera', '48MP + 12MP + 48MP', '200MP + 50MP + 10MP + 50MP'],
                ['Battery', '3,274 mAh', '5,000 mAh'],
                ['Price', '18,500,000 UZS', '22,900,000 UZS'],
              ].map(([feature, ...values]) => (
                <tr key={feature} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600, color: '#666' }}>
                    {feature}
                  </td>
                  {values.map((v, i) => (
                    <td key={i} style={{ padding: '10px 12px' }}>
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </DesktopBottomSheet>
      </div>
    );
  },
};

// ─── 5. Without Title ────────────────────────────────────────────────────────

export const WithoutTitle: Story = {
  args: {
    open: false,
    onClose: () => {},
    width: 440,
    children: null,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 24 }}>
        <TriggerButton label="Open Notification Panel" onClick={() => setOpen(true)} />
        <DesktopBottomSheet {...args} open={open} onClose={() => setOpen(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              {
                icon: '\u{1F4E6}',
                text: 'Your order #GS-2026-0091 has been shipped',
                time: '2 min ago',
                unread: true,
              },
              {
                icon: '\u{1F3F7}',
                text: 'Flash sale starts in 1 hour! Up to 50% off',
                time: '15 min ago',
                unread: true,
              },
              {
                icon: '\u2705',
                text: 'Payment confirmed for order #GS-2026-0088',
                time: '1 hour ago',
                unread: false,
              },
              {
                icon: '\u{1F4AC}',
                text: 'Seller replied to your question about RTX 4080',
                time: '3 hours ago',
                unread: false,
              },
            ].map((n, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 12,
                  padding: '12px',
                  borderRadius: 8,
                  background: n.unread ? '#FFF5F0' : '#f9f9f9',
                }}
              >
                <span style={{ fontSize: 20, lineHeight: 1 }}>{n.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: n.unread ? 600 : 400 }}>{n.text}</div>
                  <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        </DesktopBottomSheet>
      </div>
    );
  },
};

// ─── 6. With Form Content ────────────────────────────────────────────────────

export const WithFormContent: Story = {
  name: 'Edit Address Form',
  args: {
    open: false,
    onClose: () => {},
    title: 'Edit Delivery Address',
    width: 500,
    children: null,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 24 }}>
        <TriggerButton label="Edit Address" onClick={() => setOpen(true)} />
        <DesktopBottomSheet
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          footer={
            <FooterButtons
              onClose={() => setOpen(false)}
              primaryLabel="Save Address"
              secondaryLabel="Cancel"
            />
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <label
                  htmlFor="dbs-fname"
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
                  id="dbs-fname"
                  type="text"
                  defaultValue="Aziz"
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
                  htmlFor="dbs-lname"
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
                  id="dbs-lname"
                  type="text"
                  defaultValue="Karimov"
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
                htmlFor="dbs-phone"
                style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 6,
                  color: '#333',
                }}
              >
                Phone Number
              </label>
              <input
                id="dbs-phone"
                type="tel"
                defaultValue="+998 90 123 45 67"
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
            <div>
              <label
                htmlFor="dbs-city"
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
              <select
                id="dbs-city"
                defaultValue="Tashkent"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: '1px solid #ddd',
                  fontSize: 14,
                  boxSizing: 'border-box',
                  background: '#fff',
                }}
              >
                <option>Tashkent</option>
                <option>Samarkand</option>
                <option>Bukhara</option>
                <option>Namangan</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="dbs-address"
                style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 6,
                  color: '#333',
                }}
              >
                Street Address
              </label>
              <textarea
                id="dbs-address"
                rows={3}
                defaultValue="Amir Temur ko'chasi, 108-uy, 24-xonadon"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: '1px solid #ddd',
                  fontSize: 14,
                  boxSizing: 'border-box',
                  resize: 'vertical',
                }}
              />
            </div>
          </div>
        </DesktopBottomSheet>
      </div>
    );
  },
};

// ─── 7. Long Scrollable Content ──────────────────────────────────────────────

export const LongScrollableContent: Story = {
  args: {
    open: false,
    onClose: () => {},
    title: 'Return Policy',
    width: 520,
    children: null,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 24 }}>
        <TriggerButton label="View Return Policy" onClick={() => setOpen(true)} />
        <DesktopBottomSheet
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          footer={
            <FooterButtons
              onClose={() => setOpen(false)}
              primaryLabel="I Agree"
              secondaryLabel="Cancel"
            />
          }
        >
          <div style={{ fontSize: 14, lineHeight: 1.7, color: '#666' }}>
            <h4 style={{ color: '#333', margin: '0 0 8px' }}>1. General Return Policy</h4>
            <p style={{ margin: '0 0 16px' }}>
              You may return most items within 14 days of delivery for a full refund. Items must be
              unused, in their original packaging, and with all tags and accessories included.
            </p>
            <h4 style={{ color: '#333', margin: '0 0 8px' }}>2. Electronics Return Policy</h4>
            <p style={{ margin: '0 0 16px' }}>
              Electronics (laptops, phones, tablets, GPUs, etc.) may be returned within 7 days of
              delivery if they have a manufacturing defect. The product must not show signs of
              physical damage.
            </p>
            <h4 style={{ color: '#333', margin: '0 0 8px' }}>3. Non-Returnable Items</h4>
            <ul style={{ margin: '0 0 16px', paddingLeft: 20 }}>
              <li>Personal hygiene products (headphones, earbuds)</li>
              <li>Software licenses and digital goods</li>
              <li>Custom-built or modified products</li>
              <li>Items marked as final sale</li>
            </ul>
            <h4 style={{ color: '#333', margin: '0 0 8px' }}>4. Refund Process</h4>
            <p style={{ margin: '0 0 16px' }}>
              Once we receive your returned item, we will inspect it and process your refund within
              5-7 business days. Refunds are issued to the original payment method.
            </p>
            <h4 style={{ color: '#333', margin: '0 0 8px' }}>5. Exchange Policy</h4>
            <p style={{ margin: '0 0 16px' }}>
              If you received a defective or incorrect item, we will ship a replacement at no
              additional cost. Contact our support team to initiate an exchange.
            </p>
            <h4 style={{ color: '#333', margin: '0 0 8px' }}>6. Shipping Costs</h4>
            <p style={{ margin: 0 }}>
              Return shipping is free for defective products. For other returns, a flat fee of
              25,000 UZS will be deducted from your refund to cover return shipping costs.
            </p>
          </div>
        </DesktopBottomSheet>
      </div>
    );
  },
};

// ─── 8. Without Footer ───────────────────────────────────────────────────────

export const WithoutFooter: Story = {
  args: {
    open: false,
    onClose: () => {},
    title: 'Select Delivery Slot',
    width: 440,
    children: null,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState('slot-2');

    const slots = [
      { key: 'slot-1', date: 'Today, 25 Mar', time: '14:00 - 18:00', available: false },
      { key: 'slot-2', date: 'Tomorrow, 26 Mar', time: '10:00 - 14:00', available: true },
      { key: 'slot-3', date: 'Tomorrow, 26 Mar', time: '14:00 - 18:00', available: true },
      { key: 'slot-4', date: 'Thu, 27 Mar', time: '10:00 - 14:00', available: true },
      { key: 'slot-5', date: 'Thu, 27 Mar', time: '14:00 - 18:00', available: true },
      { key: 'slot-6', date: 'Fri, 28 Mar', time: '10:00 - 14:00', available: true },
    ];

    return (
      <div style={{ padding: 24 }}>
        <TriggerButton label="Select Delivery Time" onClick={() => setOpen(true)} />
        <DesktopBottomSheet {...args} open={open} onClose={() => setOpen(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {slots.map((slot) => (
              <div
                key={slot.key}
                onClick={() => slot.available && setSelected(slot.key)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && slot.available) setSelected(slot.key);
                }}
                role="button"
                tabIndex={slot.available ? 0 : -1}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '14px 16px',
                  borderRadius: 8,
                  border: selected === slot.key ? '2px solid #FF5000' : '1px solid #eee',
                  background: !slot.available
                    ? '#f9f9f9'
                    : selected === slot.key
                    ? '#FFF5F0'
                    : '#fff',
                  cursor: slot.available ? 'pointer' : 'not-allowed',
                  opacity: slot.available ? 1 : 0.5,
                }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: '#333' }}>{slot.date}</div>
                  <div style={{ fontSize: 13, color: '#666', marginTop: 2 }}>{slot.time}</div>
                </div>
                {!slot.available && (
                  <span style={{ fontSize: 12, color: '#FF3B30', fontWeight: 500 }}>Full</span>
                )}
                {selected === slot.key && slot.available && (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="9" fill="#FF5000" />
                    <path
                      d="M5 9l3 3 5-5"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </DesktopBottomSheet>
      </div>
    );
  },
};

// ─── 9. Cart Drawer ──────────────────────────────────────────────────────────

export const CartDrawer: Story = {
  args: {
    open: false,
    onClose: () => {},
    title: 'Shopping Cart (3)',
    width: 480,
    children: null,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    const cartItems = [
      {
        name: 'Logitech G PRO X Superlight 2',
        variant: 'White',
        qty: 1,
        price: '1,890,000',
        img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=80&h=80&fit=crop',
      },
      {
        name: 'SteelSeries Arctis Nova Pro',
        variant: 'Black',
        qty: 1,
        price: '4,200,000',
        img: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=80&h=80&fit=crop',
      },
      {
        name: 'Corsair K70 RGB Pro',
        variant: 'Cherry MX Red',
        qty: 2,
        price: '2,350,000',
        img: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=80&h=80&fit=crop',
      },
    ];

    return (
      <div style={{ padding: 24 }}>
        <TriggerButton label="View Cart" onClick={() => setOpen(true)} />
        <DesktopBottomSheet
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          footer={
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <div>
                <div style={{ fontSize: 12, color: '#999' }}>Total</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#FF0000' }}>8,440,000 UZS</div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                style={{
                  padding: '12px 32px',
                  borderRadius: 8,
                  border: 'none',
                  background: '#FF5000',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Checkout
              </button>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {cartItems.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 12,
                  padding: '12px',
                  background: '#f9f9f9',
                  borderRadius: 8,
                }}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 8,
                    objectFit: 'cover',
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.name}
                  </div>
                  <div style={{ fontSize: 12, color: '#999', marginTop: 2 }}>
                    {item.variant} | Qty: {item.qty}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#FF0000', marginTop: 6 }}>
                    {item.price} UZS
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DesktopBottomSheet>
      </div>
    );
  },
};

// ─── 10. Empty State ─────────────────────────────────────────────────────────

export const EmptyState: Story = {
  args: {
    open: false,
    onClose: () => {},
    title: 'Your Wishlist',
    width: 440,
    children: null,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 24 }}>
        <TriggerButton label="View Wishlist" onClick={() => setOpen(true)} />
        <DesktopBottomSheet {...args} open={open} onClose={() => setOpen(false)}>
          <div style={{ textAlign: 'center', padding: '48px 24px' }}>
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              style={{ marginBottom: 16 }}
            >
              <circle cx="32" cy="32" r="28" stroke="#eee" strokeWidth="2" />
              <path
                d="M32 22c-3.5-5-10-5-12 0s2 12 12 18c10-6 14-13 12-18s-8.5-5-12 0z"
                stroke="#ddd"
                strokeWidth="2"
                fill="none"
              />
            </svg>
            <h4 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600, color: '#333' }}>
              Your wishlist is empty
            </h4>
            <p style={{ margin: 0, fontSize: 14, color: '#999' }}>
              Save items you love to find them later.
            </p>
          </div>
        </DesktopBottomSheet>
      </div>
    );
  },
};
