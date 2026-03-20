import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopTooltip } from './DesktopTooltip';

const meta = {
  title: 'Feedback (Desktop)/DesktopTooltip',
  component: DesktopTooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600, padding: 80, display: 'flex', justifyContent: 'center', background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleButton = ({ label }: { label: string }) => (
  <button
    style={{
      padding: '8px 20px',
      borderRadius: 8,
      border: '1px solid #eee',
      background: '#fff',
      cursor: 'pointer',
      fontSize: 14,
      fontWeight: 500,
    }}
  >
    {label}
  </button>
);

export const Top: Story = {
  args: {
    content: 'Add item to your shopping cart',
    placement: 'top',
    children: <SampleButton label="Add to Cart" />,
  },
};

export const Bottom: Story = {
  args: {
    content: 'View your saved items',
    placement: 'bottom',
    children: <SampleButton label="Wishlist" />,
  },
};

export const Left: Story = {
  args: {
    content: 'Go back to previous page',
    placement: 'left',
    children: <SampleButton label="Back" />,
  },
};

export const Right: Story = {
  args: {
    content: 'Proceed to checkout',
    placement: 'right',
    children: <SampleButton label="Checkout" />,
  },
};

export const LongContent: Story = {
  args: {
    content: 'This product has free shipping for orders over 500,000 UZS. Delivery within 2-3 business days.',
    placement: 'top',
    children: <SampleButton label="Shipping Info" />,
  },
};

export const WithDelay: Story = {
  args: {
    content: 'This tooltip appears after 500ms',
    placement: 'top',
    delay: 500,
    children: <SampleButton label="Hover me (500ms delay)" />,
  },
};

export const IconTrigger: Story = {
  args: {
    content: 'Share this product',
    placement: 'bottom',
    children: (
      <button
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1px solid #eee',
          background: '#fff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-label="Share"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 8h8M8 4l4 4-4 4" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    ),
  },
};

export const AllPlacements: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 40 }}>
      {(['top', 'bottom', 'left', 'right'] as const).map((placement) => (
        <div key={placement} style={{ display: 'flex', justifyContent: 'center' }}>
          <DesktopTooltip content={`Tooltip on ${placement}`} placement={placement}>
            <SampleButton label={placement.charAt(0).toUpperCase() + placement.slice(1)} />
          </DesktopTooltip>
        </div>
      ))}
    </div>
  ),
};
