import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, expect, userEvent, within } from 'storybook/test';
import { DesktopButton } from './DesktopButton';

const CartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="14" r="1" />
    <circle cx="13" cy="14" r="1" />
    <path d="M1 1h2.5l1.8 9h8.4l1.3-6H5" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="7" cy="7" r="5" />
    <path d="M11 11l3 3" />
  </svg>
);

const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 14s-5.5-3.5-5.5-7A3.5 3.5 0 018 4a3.5 3.5 0 015.5 3c0 3.5-5.5 7-5.5 7z" />
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 4h12M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1M6 7v5M10 7v5" />
    <path d="M3 4l1 9a2 2 0 002 2h4a2 2 0 002-2l1-9" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2v9M4 7l4 4 4-4M2 13h12" />
  </svg>
);

const meta = {
  title: 'Forms (Desktop)/DesktopButton',
  component: DesktopButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    variant: { control: 'radio', options: ['primary', 'secondary', 'outline', 'ghost', 'danger'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    iconPosition: { control: 'radio', options: ['left', 'right'] },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 500, padding: 24, background: '#fff' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Basic ─── */

export const Default: Story = {
  args: {
    children: 'Add to Cart',
    onClick: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Add to Cart' });
    await expect(button).toBeEnabled();
    await userEvent.click(button);
  },
};

/* ─── All Variants ─── */

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <DesktopButton variant="primary">Primary</DesktopButton>
      <DesktopButton variant="secondary">Secondary</DesktopButton>
      <DesktopButton variant="outline">Outline</DesktopButton>
      <DesktopButton variant="ghost">Ghost</DesktopButton>
      <DesktopButton variant="danger">Danger</DesktopButton>
    </div>
  ),
};

/* ─── All Sizes ─── */

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <DesktopButton size="sm">Small</DesktopButton>
      <DesktopButton size="md">Medium</DesktopButton>
      <DesktopButton size="lg">Large</DesktopButton>
    </div>
  ),
};

/* ─── Size x Variant Matrix ─── */

export const SizeVariantMatrix: Story = {
  name: 'Size x Variant Matrix',
  render: () => {
    const variants = ['primary', 'secondary', 'outline', 'ghost', 'danger'] as const;
    const sizes = ['sm', 'md', 'lg'] as const;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {sizes.map((size) => (
          <div key={size}>
            <div style={{ fontSize: 12, color: '#999', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>{size}</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              {variants.map((variant) => (
                <DesktopButton key={`${size}-${variant}`} size={size} variant={variant}>
                  {variant.charAt(0).toUpperCase() + variant.slice(1)}
                </DesktopButton>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

/* ─── Icons ─── */

export const WithIconLeft: Story = {
  args: {
    children: 'Add to Cart',
    icon: <CartIcon />,
    iconPosition: 'left',
  },
};

export const WithIconRight: Story = {
  args: {
    children: 'Search Products',
    icon: <SearchIcon />,
    iconPosition: 'right',
    variant: 'outline',
  },
};

export const IconVariants: Story = {
  name: 'Icons with Every Variant',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <DesktopButton variant="primary" icon={<CartIcon />}>Add to Cart</DesktopButton>
      <DesktopButton variant="secondary" icon={<HeartIcon />}>Save to Wishlist</DesktopButton>
      <DesktopButton variant="outline" icon={<DownloadIcon />}>Download Invoice</DesktopButton>
      <DesktopButton variant="ghost" icon={<SearchIcon />}>Quick Search</DesktopButton>
      <DesktopButton variant="danger" icon={<TrashIcon />}>Delete Account</DesktopButton>
    </div>
  ),
};

/* ─── Loading States ─── */

export const Loading: Story = {
  args: {
    children: 'Processing Payment...',
    loading: true,
    variant: 'primary',
    size: 'lg',
  },
};

export const LoadingAllVariants: Story = {
  name: 'Loading All Variants',
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <DesktopButton variant="primary" loading>Primary</DesktopButton>
      <DesktopButton variant="secondary" loading>Secondary</DesktopButton>
      <DesktopButton variant="outline" loading>Outline</DesktopButton>
      <DesktopButton variant="ghost" loading>Ghost</DesktopButton>
      <DesktopButton variant="danger" loading>Danger</DesktopButton>
    </div>
  ),
};

export const LoadingAllSizes: Story = {
  name: 'Loading All Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <DesktopButton size="sm" loading>Small</DesktopButton>
      <DesktopButton size="md" loading>Medium</DesktopButton>
      <DesktopButton size="lg" loading>Large</DesktopButton>
    </div>
  ),
};

/* ─── Disabled States ─── */

export const Disabled: Story = {
  args: {
    children: 'Out of Stock',
    disabled: true,
  },
};

export const DisabledAllVariants: Story = {
  name: 'Disabled All Variants',
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <DesktopButton variant="primary" disabled>Primary</DesktopButton>
      <DesktopButton variant="secondary" disabled>Secondary</DesktopButton>
      <DesktopButton variant="outline" disabled>Outline</DesktopButton>
      <DesktopButton variant="ghost" disabled>Ghost</DesktopButton>
      <DesktopButton variant="danger" disabled>Danger</DesktopButton>
    </div>
  ),
};

/* ─── Full Width ─── */

export const FullWidth: Story = {
  args: {
    children: 'Checkout Now',
    fullWidth: true,
    size: 'lg',
  },
};

export const FullWidthAllVariants: Story = {
  name: 'Full Width All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <DesktopButton variant="primary" fullWidth size="lg">Proceed to Checkout</DesktopButton>
      <DesktopButton variant="secondary" fullWidth size="lg">Continue Shopping</DesktopButton>
      <DesktopButton variant="outline" fullWidth>View Order Details</DesktopButton>
      <DesktopButton variant="ghost" fullWidth>Cancel Order</DesktopButton>
      <DesktopButton variant="danger" fullWidth>Delete All Items</DesktopButton>
    </div>
  ),
};

/* ─── FullFeatured ─── */

export const FullFeatured: Story = {
  name: 'Full Featured (All Props)',
  args: {
    children: 'Confirm Purchase',
    variant: 'primary',
    size: 'lg',
    icon: <CartIcon />,
    iconPosition: 'left',
    fullWidth: true,
    loading: false,
    disabled: false,
    onClick: fn(),
  },
};

/* ─── Edge Cases ─── */

export const LongLabel: Story = {
  name: 'Long Label (Overflow)',
  render: () => (
    <div style={{ width: 200 }}>
      <DesktopButton fullWidth size="sm">
        Subscribe to Premium Membership Plan with Annual Billing
      </DesktopButton>
    </div>
  ),
};

export const IconOnly: Story = {
  name: 'Icon Only (No Text)',
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <DesktopButton variant="primary" size="sm" icon={<HeartIcon />} aria-label="Add to wishlist" />
      <DesktopButton variant="outline" size="md" icon={<CartIcon />} aria-label="Add to cart" />
      <DesktopButton variant="ghost" size="lg" icon={<SearchIcon />} aria-label="Search" />
      <DesktopButton variant="danger" size="md" icon={<TrashIcon />} aria-label="Delete" />
    </div>
  ),
};

/* ─── Realistic Compositions ─── */

export const ProductActionBar: Story = {
  name: 'Product Action Bar',
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <DesktopButton variant="outline" icon={<HeartIcon />} aria-label="Save to wishlist" />
      <DesktopButton variant="secondary" icon={<CartIcon />}>Add to Cart</DesktopButton>
      <DesktopButton variant="primary" size="lg">Buy Now</DesktopButton>
    </div>
  ),
};

export const DialogFooter: Story = {
  name: 'Dialog Footer Actions',
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, paddingTop: 16, borderTop: '1px solid #eee' }}>
      <DesktopButton variant="ghost">Cancel</DesktopButton>
      <DesktopButton variant="outline">Save as Draft</DesktopButton>
      <DesktopButton variant="primary">Confirm Order</DesktopButton>
    </div>
  ),
};

export const DangerConfirmation: Story = {
  name: 'Danger Confirmation Dialog',
  render: () => (
    <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #eee', maxWidth: 400 }}>
      <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: '#1A1A1A' }}>Delete this product?</div>
      <div style={{ fontSize: 14, color: '#666', marginBottom: 20, lineHeight: 1.5 }}>
        This action cannot be undone. The product and all its variants will be permanently removed from your store.
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
        <DesktopButton variant="outline">Keep Product</DesktopButton>
        <DesktopButton variant="danger" icon={<TrashIcon />}>Delete Permanently</DesktopButton>
      </div>
    </div>
  ),
};

export const SubmitButton: Story = {
  name: 'Submit Button (type=submit)',
  args: {
    children: 'Place Order',
    type: 'submit',
    variant: 'primary',
    size: 'lg',
    fullWidth: true,
    icon: <CartIcon />,
  },
};
