import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopDialog } from './DesktopDialog';

const meta = {
  title: 'Feedback (Desktop)/DesktopDialog',
  component: DesktopDialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Helper ──────────────────────────────────────────────────────────────────

function DialogStory({
  title,
  confirmText,
  cancelText,
  confirmType,
  buttonLabel,
  buttonColor,
  children,
}: {
  title: string;
  confirmText: string;
  cancelText: string;
  confirmType?: 'primary' | 'danger';
  buttonLabel: string;
  buttonColor?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ padding: 24 }}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          padding: '10px 20px',
          borderRadius: 8,
          border: buttonColor ? `1px solid ${buttonColor}` : '1px solid #ddd',
          color: buttonColor || '#333',
          background: '#fff',
          cursor: 'pointer',
          fontSize: 14,
        }}
      >
        {buttonLabel}
      </button>
      <DesktopDialog
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        confirmText={confirmText}
        cancelText={cancelText}
        confirmType={confirmType}
        onConfirm={() => {
          console.log('Confirmed');
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
      >
        {children}
      </DesktopDialog>
    </div>
  );
}

// ─── 1. Default ──────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <DialogStory
      title="Confirm Action"
      confirmText="Confirm"
      cancelText="Cancel"
      buttonLabel="Open Dialog"
    >
      <p style={{ margin: 0 }}>
        Are you sure you want to proceed with this action? This cannot be undone.
      </p>
    </DialogStory>
  ),
};

// ─── 2. Primary Confirm ─────────────────────────────────────────────────────

export const PrimaryConfirm: Story = {
  name: 'Confirm Type: Primary',
  render: () => (
    <DialogStory
      title="Save Changes"
      confirmText="Save"
      cancelText="Discard"
      confirmType="primary"
      buttonLabel="Save Changes"
    >
      <p style={{ margin: 0 }}>
        You have unsaved changes to your shipping address. Do you want to save them before leaving?
      </p>
    </DialogStory>
  ),
};

// ─── 3. Danger Confirm ───────────────────────────────────────────────────────

export const DangerConfirm: Story = {
  name: 'Confirm Type: Danger',
  render: () => (
    <DialogStory
      title="Delete Order"
      confirmText="Delete"
      cancelText="Keep Order"
      confirmType="danger"
      buttonLabel="Delete Order"
      buttonColor="#FF3B30"
    >
      <p style={{ margin: 0 }}>
        This will permanently delete order #GS-2026-0047 and all associated data. This action cannot
        be reversed.
      </p>
    </DialogStory>
  ),
};

// ─── 4. Clear Cart ───────────────────────────────────────────────────────────

export const ClearCart: Story = {
  name: 'Clear Cart Dialog',
  render: () => (
    <DialogStory
      title="Clear Cart"
      confirmText="Clear All"
      cancelText="Cancel"
      confirmType="danger"
      buttonLabel="Clear Cart"
    >
      <p style={{ margin: 0 }}>Remove all 5 items from your shopping cart?</p>
    </DialogStory>
  ),
};

// ─── 5. Logout ───────────────────────────────────────────────────────────────

export const LogoutConfirmation: Story = {
  render: () => (
    <DialogStory
      title="Sign Out"
      confirmText="Sign Out"
      cancelText="Stay"
      confirmType="primary"
      buttonLabel="Sign Out"
    >
      <p style={{ margin: 0 }}>
        Are you sure you want to sign out? You will need to enter your credentials again to access
        your account.
      </p>
    </DialogStory>
  ),
};

// ─── 6. Delete Account ───────────────────────────────────────────────────────

export const DeleteAccount: Story = {
  name: 'Delete Account (Danger)',
  render: () => (
    <DialogStory
      title="Delete Your Account"
      confirmText="Delete Forever"
      cancelText="Keep My Account"
      confirmType="danger"
      buttonLabel="Delete Account"
      buttonColor="#FF3B30"
    >
      <div>
        <p style={{ margin: '0 0 12px', fontSize: 14, color: '#333' }}>
          This will permanently delete:
        </p>
        <ul
          style={{
            margin: '0 0 12px',
            paddingLeft: 20,
            fontSize: 14,
            color: '#666',
            lineHeight: 1.7,
          }}
        >
          <li>Your profile and all personal data</li>
          <li>Order history (23 orders)</li>
          <li>Saved addresses and payment methods</li>
          <li>Wishlist items (12 products)</li>
          <li>All reviews you have written</li>
        </ul>
        <p style={{ margin: 0, fontSize: 13, color: '#FF3B30', fontWeight: 500 }}>
          This action is irreversible. You cannot recover your account after deletion.
        </p>
      </div>
    </DialogStory>
  ),
};

// ─── 7. Rich Content ─────────────────────────────────────────────────────────

export const RichContent: Story = {
  name: 'Rich Content Body',
  render: () => (
    <DialogStory
      title="Apply Coupon"
      confirmText="Apply Code"
      cancelText="Not Now"
      confirmType="primary"
      buttonLabel="Apply Coupon"
    >
      <div>
        <div
          style={{
            padding: 16,
            background: '#FFF5F0',
            borderRadius: 8,
            marginBottom: 12,
            border: '1px dashed #FF5000',
          }}
        >
          <p style={{ margin: '0 0 4px', fontWeight: 600, fontSize: 16, color: '#FF5000' }}>
            SAVE20
          </p>
          <p style={{ margin: 0, fontSize: 13, color: '#666' }}>
            20% off your entire order. Valid until 31 March 2026.
          </p>
        </div>
        <p style={{ margin: 0, fontSize: 14, color: '#666' }}>
          This coupon will be applied to your cart. You can only use one coupon per order.
        </p>
      </div>
    </DialogStory>
  ),
};

// ─── 8. No Title ─────────────────────────────────────────────────────────────

export const NoTitle: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 24 }}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{
            padding: '10px 20px',
            borderRadius: 8,
            border: '1px solid #ddd',
            background: '#fff',
            cursor: 'pointer',
            fontSize: 14,
          }}
        >
          Open (No Title)
        </button>
        <DesktopDialog
          open={open}
          onClose={() => setOpen(false)}
          confirmText="Yes, Remove"
          cancelText="No"
          confirmType="danger"
          onConfirm={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        >
          <p style={{ margin: 0, fontSize: 15, textAlign: 'center' }}>
            Remove this item from your wishlist?
          </p>
        </DesktopDialog>
      </div>
    );
  },
};

// ─── 9. Custom Button Text ───────────────────────────────────────────────────

export const CustomButtonText: Story = {
  render: () => (
    <DialogStory
      title="Rate Your Experience"
      confirmText="Submit Rating"
      cancelText="Maybe Later"
      confirmType="primary"
      buttonLabel="Rate Experience"
    >
      <p style={{ margin: 0, fontSize: 14, color: '#666' }}>
        How would you rate your recent purchase experience with order #GS-2026-0047?
      </p>
    </DialogStory>
  ),
};

// ─── 10. Remove From Cart ────────────────────────────────────────────────────

export const RemoveFromCart: Story = {
  name: 'Remove Item From Cart',
  render: () => (
    <DialogStory
      title="Remove Item"
      confirmText="Remove"
      cancelText="Keep"
      confirmType="danger"
      buttonLabel="Remove from Cart"
      buttonColor="#FF3B30"
    >
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
        <img
          src="https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=64&h=64&fit=crop"
          alt="Product"
          style={{ width: 64, height: 64, borderRadius: 8, objectFit: 'cover' }}
        />
        <div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>NVIDIA GeForce RTX 4090</div>
          <div style={{ fontSize: 13, color: '#FF0000', marginTop: 2 }}>24,990,000 UZS</div>
        </div>
      </div>
      <p style={{ margin: 0, fontSize: 14, color: '#666' }}>
        Are you sure you want to remove this item from your cart?
      </p>
    </DialogStory>
  ),
};

// ─── 11. Unsaved Changes Warning ─────────────────────────────────────────────

export const UnsavedChanges: Story = {
  name: 'Unsaved Changes Warning',
  render: () => (
    <DialogStory
      title="Unsaved Changes"
      confirmText="Leave Page"
      cancelText="Stay on Page"
      confirmType="danger"
      buttonLabel="Navigate Away"
    >
      <div>
        <p style={{ margin: '0 0 12px', fontSize: 14, color: '#333' }}>
          You have unsaved changes in your product listing:
        </p>
        <div
          style={{
            padding: 12,
            background: '#f9f9f9',
            borderRadius: 8,
            fontSize: 13,
            color: '#666',
            lineHeight: 1.6,
          }}
        >
          <div>
            <strong>Changed fields:</strong>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 6 }}>
            <span>- Product name</span>
            <span>- Price (was 12,500,000 UZS)</span>
            <span>- Description</span>
          </div>
        </div>
        <p style={{ margin: '12px 0 0', fontSize: 13, color: '#FF3B30' }}>
          If you leave now, your changes will be lost.
        </p>
      </div>
    </DialogStory>
  ),
};

// ─── 12. Age Verification ────────────────────────────────────────────────────

export const AgeVerification: Story = {
  render: () => (
    <DialogStory
      title="Age Verification Required"
      confirmText="I Am 18+"
      cancelText="Go Back"
      confirmType="primary"
      buttonLabel="View Restricted Product"
    >
      <div style={{ textAlign: 'center' }}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ marginBottom: 12 }}>
          <circle cx="24" cy="24" r="20" stroke="#FFA726" strokeWidth="2.5" />
          <path d="M24 14v12M24 30v2" stroke="#FFA726" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <p style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 600, color: '#333' }}>
          This product has age restrictions
        </p>
        <p style={{ margin: 0, fontSize: 14, color: '#666' }}>
          You must be at least 18 years old to view and purchase this product. By continuing, you
          confirm that you meet the age requirement.
        </p>
      </div>
    </DialogStory>
  ),
};
