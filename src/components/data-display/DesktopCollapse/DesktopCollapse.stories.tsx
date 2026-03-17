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
        We offer free standard shipping on all orders over 500,000 UZS. Standard delivery takes
        3-5 business days within Tashkent and 5-7 business days for other regions. Express
        shipping is available for an additional fee.
      </DesktopCollapsePanel>
      <DesktopCollapsePanel panelKey="returns" title="Returns & Refunds">
        Products can be returned within 14 days of delivery. Items must be in original packaging
        and unused condition. Refunds are processed within 5-7 business days after receiving
        the returned item.
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px', fontSize: 14 }}>
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
        The Samsung Galaxy S24 Ultra represents the pinnacle of mobile technology, featuring
        a titanium frame, an advanced AI-powered camera system, and the integrated S Pen for
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
        Yes! We accept cash on delivery (COD) for orders under 10,000,000 UZS. You can also pay
        via Payme, Click, or bank transfer before delivery.
      </DesktopCollapsePanel>
      <DesktopCollapsePanel panelKey="q3" title="What if my product arrives damaged?">
        If your product arrives damaged, please contact our support team within 24 hours with
        photos of the damage. We will arrange a free replacement or full refund.
      </DesktopCollapsePanel>
      <DesktopCollapsePanel panelKey="q4" title="Do you offer price matching?">
        We offer price matching for identical products sold by authorized retailers in Uzbekistan.
        Please provide a link or proof of the lower price and we will match it.
      </DesktopCollapsePanel>
    </DesktopCollapse>
  ),
};
