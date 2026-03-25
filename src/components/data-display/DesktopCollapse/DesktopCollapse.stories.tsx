import { useState, useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopCollapse, DesktopCollapsePanel } from './DesktopCollapse';

const meta = {
  title: 'Data Display (Desktop)/DesktopCollapse',
  component: DesktopCollapse,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 700, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopCollapse>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DesktopCollapse defaultActiveKey="shipping">
      <DesktopCollapsePanel panelKey="shipping" title="Shipping Information">
        We offer free standard shipping on all orders over 500,000 UZS. Standard delivery takes 3-5
        business days within Tashkent and 5-7 business days for other regions. Express shipping is
        available for an additional fee.
      </DesktopCollapsePanel>
      <DesktopCollapsePanel panelKey="returns" title="Returns & Refunds">
        Products can be returned within 14 days of delivery. Items must be in original packaging and
        unused condition. Refunds are processed within 5-7 business days after receiving the
        returned item.
      </DesktopCollapsePanel>
      <DesktopCollapsePanel panelKey="warranty" title="Warranty">
        All products come with manufacturer warranty. Electronics have a minimum 12-month warranty.
        Extended warranty options are available at checkout for selected products.
      </DesktopCollapsePanel>
    </DesktopCollapse>
  ),
};

export const Accordion: Story = {
  render: () => (
    <DesktopCollapse accordion defaultActiveKey="specs">
      <DesktopCollapsePanel panelKey="specs" title="Specifications" extra="8 items">
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px', fontSize: 14 }}
        >
          <span style={{ color: '#999' }}>Processor</span>
          <span>Snapdragon 8 Gen 3</span>
          <span style={{ color: '#999' }}>RAM</span>
          <span>12 GB</span>
          <span style={{ color: '#999' }}>Storage</span>
          <span>256 GB</span>
          <span style={{ color: '#999' }}>Display</span>
          <span>6.8&quot; AMOLED 120Hz</span>
        </div>
      </DesktopCollapsePanel>
      <DesktopCollapsePanel panelKey="description" title="Product Description" extra="Details">
        The Samsung Galaxy S24 Ultra represents the pinnacle of mobile technology, featuring a
        titanium frame, an advanced AI-powered camera system, and the integrated S Pen for
        productivity on the go.
      </DesktopCollapsePanel>
      <DesktopCollapsePanel panelKey="reviews" title="Customer Reviews" extra="24 reviews">
        Highly rated by customers with an average of 4.7 out of 5 stars. Users praise the camera
        quality, battery life, and S Pen functionality.
      </DesktopCollapsePanel>
    </DesktopCollapse>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <DesktopCollapse defaultActiveKey="active">
      <DesktopCollapsePanel panelKey="active" title="Active Panel">
        This panel is open and interactive.
      </DesktopCollapsePanel>
      <DesktopCollapsePanel panelKey="disabled" title="Disabled Panel" disabled>
        You should not be able to see this content.
      </DesktopCollapsePanel>
      <DesktopCollapsePanel panelKey="another" title="Another Active Panel">
        This panel can be toggled normally.
      </DesktopCollapsePanel>
    </DesktopCollapse>
  ),
};

export const FAQ: Story = {
  render: () => (
    <DesktopCollapse accordion>
      <DesktopCollapsePanel panelKey="q1" title="How long does delivery take?">
        Standard delivery within Tashkent takes 1-2 business days. For other cities in Uzbekistan,
        delivery typically takes 3-5 business days. Express same-day delivery is available in
        Tashkent for orders placed before 12:00 PM.
      </DesktopCollapsePanel>
      <DesktopCollapsePanel panelKey="q2" title="Can I pay on delivery?">
        Yes! We accept cash on delivery (COD) for orders under 10,000,000 UZS. You can also pay via
        Payme, Click, or bank transfer before delivery.
      </DesktopCollapsePanel>
      <DesktopCollapsePanel panelKey="q3" title="What if my product arrives damaged?">
        If your product arrives damaged, please contact our support team within 24 hours with photos
        of the damage. We will arrange a free replacement or full refund.
      </DesktopCollapsePanel>
      <DesktopCollapsePanel panelKey="q4" title="Do you offer price matching?">
        We offer price matching for identical products sold by authorized retailers in Uzbekistan.
        Please provide a link or proof of the lower price and we will match it.
      </DesktopCollapsePanel>
    </DesktopCollapse>
  ),
};

export const AllPanelsExpanded: Story = {
  render: () => (
    <DesktopCollapse defaultActiveKey={['overview', 'camera', 'battery', 'display']}>
      <DesktopCollapsePanel panelKey="overview" title="Overview">
        The iPhone 16 Pro Max features Apple&apos;s latest A18 Pro chip, delivering unprecedented
        performance for mobile gaming and AI workloads. Available in Natural Titanium, White
        Titanium, Black Titanium, and Desert Titanium.
      </DesktopCollapsePanel>
      <DesktopCollapsePanel panelKey="camera" title="Camera System">
        48MP main camera with second-generation quad-pixel sensor, 12MP ultra-wide with autofocus,
        and 12MP 5x telephoto. Supports ProRAW, ProRes, and Spatial Video capture.
      </DesktopCollapsePanel>
      <DesktopCollapsePanel panelKey="battery" title="Battery & Charging">
        Up to 33 hours video playback. Supports MagSafe wireless charging up to 25W, Qi2 wireless
        charging, and USB-C wired charging up to 45W.
      </DesktopCollapsePanel>
      <DesktopCollapsePanel panelKey="display" title="Display">
        6.9-inch Super Retina XDR display with ProMotion (120Hz). Always-On display technology. Peak
        brightness of 2000 nits outdoors. Dynamic Island for live activities.
      </DesktopCollapsePanel>
    </DesktopCollapse>
  ),
};

export const AllPanelsCollapsed: Story = {
  render: () => (
    <DesktopCollapse>
      <DesktopCollapsePanel panelKey="p1" title="Payment Methods">
        We accept Visa, Mastercard, Payme, Click, Uzum Pay, and bank transfers.
      </DesktopCollapsePanel>
      <DesktopCollapsePanel panelKey="p2" title="Installment Plans">
        Available through Alif Nasiya, Uzum Nasiya, and direct bank installments for 3, 6, or 12
        months.
      </DesktopCollapsePanel>
      <DesktopCollapsePanel panelKey="p3" title="International Shipping">
        We ship to Kazakhstan, Kyrgyzstan, Tajikistan, and Turkmenistan. Delivery takes 7-14
        business days.
      </DesktopCollapsePanel>
    </DesktopCollapse>
  ),
};

export const WithExtraContent: Story = {
  name: 'Extra Content in Headers',
  render: () => (
    <DesktopCollapse defaultActiveKey="storage">
      <DesktopCollapsePanel
        panelKey="storage"
        title="Storage Options"
        extra={<span style={{ fontSize: 12, color: '#07C160', fontWeight: 600 }}>In Stock</span>}
      >
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['128GB', '256GB', '512GB', '1TB'].map((size) => (
            <span
              key={size}
              style={{
                padding: '6px 14px',
                borderRadius: 6,
                border: '1px solid #eee',
                fontSize: 13,
              }}
            >
              {size}
            </span>
          ))}
        </div>
      </DesktopCollapsePanel>
      <DesktopCollapsePanel
        panelKey="color"
        title="Color Variants"
        extra={<span style={{ fontSize: 12, color: '#FF5000', fontWeight: 600 }}>5 colors</span>}
      >
        <div style={{ display: 'flex', gap: 12 }}>
          {[
            { name: 'Midnight Black', hex: '#1A1A1A' },
            { name: 'Titanium Blue', hex: '#4A6FA5' },
            { name: 'Cream White', hex: '#F5F0E8' },
            { name: 'Lavender', hex: '#C8A8E9' },
            { name: 'Mint Green', hex: '#98D4BB' },
          ].map((c) => (
            <div
              key={c.name}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: c.hex,
                  border: '1px solid #ddd',
                }}
              />
              <span style={{ fontSize: 11, color: '#666' }}>{c.name}</span>
            </div>
          ))}
        </div>
      </DesktopCollapsePanel>
      <DesktopCollapsePanel
        panelKey="warranty"
        title="Warranty Information"
        extra={<span style={{ fontSize: 12, color: '#999' }}>24 months</span>}
      >
        Official manufacturer warranty covering hardware defects. Does not cover physical damage,
        water damage, or unauthorized modifications.
      </DesktopCollapsePanel>
    </DesktopCollapse>
  ),
};

export const SinglePanel: Story = {
  name: 'Single Panel Only',
  render: () => (
    <DesktopCollapse defaultActiveKey="terms">
      <DesktopCollapsePanel panelKey="terms" title="Terms & Conditions">
        By purchasing from GeekShop.uz, you agree to our terms of service. All products are subject
        to availability. Prices may change without prior notice. Promotional offers cannot be
        combined with other discounts unless explicitly stated. For the full terms and conditions,
        please visit our website at geekshop.uz/terms.
      </DesktopCollapsePanel>
    </DesktopCollapse>
  ),
};

export const ManyPanels: Story = {
  name: 'Many Panels (10)',
  render: () => (
    <DesktopCollapse accordion defaultActiveKey="cat-1">
      {[
        {
          key: 'cat-1',
          title: 'Smartphones',
          content:
            'Latest models from Samsung, Apple, Xiaomi, OnePlus, and Google. Prices range from 2,000,000 to 20,000,000 UZS.',
        },
        {
          key: 'cat-2',
          title: 'Laptops',
          content:
            'Gaming laptops, ultrabooks, and business notebooks from ASUS, Lenovo, Dell, HP, and MSI. Free delivery on orders above 5,000,000 UZS.',
        },
        {
          key: 'cat-3',
          title: 'Graphics Cards',
          content:
            'NVIDIA RTX 40-series and AMD RX 7000-series. All cards tested before shipping. Warranty from 2 to 5 years.',
        },
        {
          key: 'cat-4',
          title: 'Monitors',
          content:
            '4K, QHD, and Full HD displays for gaming and productivity. Curved and flat panel options from Samsung, LG, and Dell.',
        },
        {
          key: 'cat-5',
          title: 'Peripherals',
          content:
            'Mechanical keyboards, gaming mice, headsets, and webcams. Brands include Logitech, Razer, SteelSeries, and HyperX.',
        },
        {
          key: 'cat-6',
          title: 'Networking',
          content:
            'WiFi 7 routers, mesh systems, and ethernet switches. Free setup assistance for enterprise customers.',
        },
        {
          key: 'cat-7',
          title: 'Storage',
          content:
            'NVMe SSDs, SATA SSDs, external drives, and NAS solutions. Capacity from 256GB to 20TB.',
        },
        {
          key: 'cat-8',
          title: 'Audio',
          content:
            'TWS earbuds, over-ear headphones, portable speakers, and soundbars. Sony, Bose, JBL, and Marshall.',
        },
        {
          key: 'cat-9',
          title: 'Smart Home',
          content:
            'Smart bulbs, security cameras, robot vacuums, and voice assistants. Compatible with Yandex Alice, Google Home, and Apple HomeKit.',
        },
        {
          key: 'cat-10',
          title: 'Accessories',
          content:
            'Phone cases, chargers, cables, screen protectors, and power banks. Bulk discounts available for resellers.',
        },
      ].map((item) => (
        <DesktopCollapsePanel key={item.key} panelKey={item.key} title={item.title}>
          {item.content}
        </DesktopCollapsePanel>
      ))}
    </DesktopCollapse>
  ),
};

export const ControlledState: Story = {
  name: 'Interactive: Controlled State',
  render: () => {
    const [activeKeys, setActiveKeys] = useState<string[]>(['sec-1']);

    const handleChange = useCallback((keys: string[]) => {
      setActiveKeys(keys);
    }, []);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            type="button"
            onClick={() => setActiveKeys(['sec-1', 'sec-2', 'sec-3'])}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: '1px solid #ddd',
              background: '#fff',
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            Expand All
          </button>
          <button
            type="button"
            onClick={() => setActiveKeys([])}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: '1px solid #ddd',
              background: '#fff',
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            Collapse All
          </button>
        </div>
        <div style={{ fontSize: 12, color: '#666' }}>Active keys: [{activeKeys.join(', ')}]</div>
        <DesktopCollapse activeKey={activeKeys} onChange={handleChange}>
          <DesktopCollapsePanel panelKey="sec-1" title="Product Overview">
            The ASUS ROG Strix B650E-F motherboard supports AMD AM5 processors with DDR5 memory,
            PCIe 5.0, and WiFi 6E built in.
          </DesktopCollapsePanel>
          <DesktopCollapsePanel panelKey="sec-2" title="Compatibility Check">
            Compatible with Ryzen 7000 and 9000 series processors. Supports up to 128GB DDR5 at
            6400+ MHz (OC). Four M.2 slots with heatsinks included.
          </DesktopCollapsePanel>
          <DesktopCollapsePanel panelKey="sec-3" title="What's in the Box">
            Motherboard, I/O shield (pre-installed), SATA cables (4x), M.2 screws, WiFi antenna,
            driver USB stick, quick start guide, ROG stickers.
          </DesktopCollapsePanel>
        </DesktopCollapse>
      </div>
    );
  },
};

export const RichContentPanels: Story = {
  name: 'Rich Content Inside Panels',
  render: () => (
    <DesktopCollapse defaultActiveKey="dims">
      <DesktopCollapsePanel panelKey="dims" title="Dimensions & Weight">
        <table style={{ width: '100%', fontSize: 14, borderCollapse: 'collapse' }}>
          <tbody>
            {[
              ['Height', '163.0 mm'],
              ['Width', '77.6 mm'],
              ['Depth', '8.25 mm'],
              ['Weight', '227 g'],
            ].map(([label, value]) => (
              <tr key={label} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '8px 0', color: '#999' }}>{label}</td>
                <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 500 }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </DesktopCollapsePanel>
      <DesktopCollapsePanel panelKey="rating" title="Customer Ratings Summary">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: 36, fontWeight: 700, color: '#FF5000' }}>4.7</div>
          <div style={{ flex: 1 }}>
            {[
              { stars: 5, percent: 68 },
              { stars: 4, percent: 20 },
              { stars: 3, percent: 7 },
              { stars: 2, percent: 3 },
              { stars: 1, percent: 2 },
            ].map((row) => (
              <div
                key={row.stars}
                style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}
              >
                <span style={{ fontSize: 12, color: '#999', width: 10 }}>{row.stars}</span>
                <div style={{ flex: 1, height: 6, background: '#f0f0f0', borderRadius: 3 }}>
                  <div
                    style={{
                      width: `${row.percent}%`,
                      height: '100%',
                      background: '#FF5000',
                      borderRadius: 3,
                    }}
                  />
                </div>
                <span style={{ fontSize: 12, color: '#999', width: 30 }}>{row.percent}%</span>
              </div>
            ))}
          </div>
        </div>
      </DesktopCollapsePanel>
      <DesktopCollapsePanel panelKey="delivery" title="Delivery Estimate">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#666' }}>Tashkent</span>
            <span style={{ color: '#07C160', fontWeight: 600 }}>1-2 days (Free)</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#666' }}>Samarkand, Bukhara</span>
            <span style={{ fontWeight: 500 }}>3-4 days (25,000 UZS)</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#666' }}>Other regions</span>
            <span style={{ fontWeight: 500 }}>5-7 days (40,000 UZS)</span>
          </div>
        </div>
      </DesktopCollapsePanel>
    </DesktopCollapse>
  ),
};

export const LongTitlePanels: Story = {
  name: 'Long Panel Titles',
  render: () => (
    <DesktopCollapse>
      <DesktopCollapsePanel
        panelKey="long1"
        title="Detailed Technical Specifications for Samsung Galaxy S24 Ultra 5G (SM-S928B/DS) International Version"
      >
        Includes all technical specifications for the international unlocked variant.
      </DesktopCollapsePanel>
      <DesktopCollapsePanel
        panelKey="long2"
        title="Warranty Terms, Conditions, and Coverage Details for Electronics Purchased Through GeekShop.uz Marketplace"
        extra="Important"
      >
        Standard 12-month warranty with option to extend to 24 or 36 months at checkout.
      </DesktopCollapsePanel>
      <DesktopCollapsePanel
        panelKey="long3"
        title="Frequently Asked Questions About International Shipping, Customs Duties, and Import Regulations for Uzbekistan"
      >
        All customs duties are included in the final price. No additional fees upon delivery.
      </DesktopCollapsePanel>
    </DesktopCollapse>
  ),
};
