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

// --- HELPERS ---

const FooterButtons = ({ onClose, saveLabel = 'Save Changes' }: { onClose: () => void; saveLabel?: string }) => (
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
      {saveLabel}
    </button>
  </>
);

function ModalStory({
  title,
  width,
  closable,
  footer,
  children,
  buttonLabel = 'Open Modal',
}: {
  title: string;
  width?: number;
  closable?: boolean;
  footer?: (onClose: () => void) => React.ReactNode;
  children: React.ReactNode;
  buttonLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ padding: 24 }}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 14 }}
      >
        {buttonLabel}
      </button>
      <DesktopModal
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        width={width}
        closable={closable}
        footer={footer ? footer(() => setOpen(false)) : undefined}
      >
        {children}
      </DesktopModal>
    </div>
  );
}

// ─── 1. Default (Edit Product Form) ─────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <ModalStory
      title="Edit Product"
      footer={(onClose) => <FooterButtons onClose={onClose} />}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#333' }}>Product Name</label>
          <input type="text" defaultValue="MSI RTX 4060 Ventus 2X" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14, boxSizing: 'border-box' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#333' }}>Description</label>
          <textarea rows={4} defaultValue="High-performance graphics card with dual-fan cooling system for gaming and creative workloads." style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14, boxSizing: 'border-box', resize: 'vertical' }} />
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#333' }}>Price (UZS)</label>
            <input type="text" defaultValue="12,500,000" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14, boxSizing: 'border-box' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#333' }}>Stock</label>
            <input type="number" defaultValue={24} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14, boxSizing: 'border-box' }} />
          </div>
        </div>
      </div>
    </ModalStory>
  ),
};

// ─── 2. Wide Modal (Comparison Table) ────────────────────────────────────────

export const WideModal: Story = {
  name: 'Wide Modal (900px)',
  render: () => (
    <ModalStory title="Product Comparison" width={900} buttonLabel="Compare Products">
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
            ['CUDA Cores', '3072', '5888', '9728'],
            ['Bus Width', '128-bit', '192-bit', '256-bit'],
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
    </ModalStory>
  ),
};

// ─── 3. Not Closable (Terms & Conditions) ────────────────────────────────────

export const NotClosable: Story = {
  name: 'Non-Closable (Terms & Conditions)',
  render: () => (
    <ModalStory
      title="Terms & Conditions"
      closable={false}
      footer={(onClose) => (
        <button
          type="button"
          onClick={onClose}
          style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: '#FF5000', color: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}
        >
          I Accept
        </button>
      )}
      buttonLabel="View Terms"
    >
      <div style={{ fontSize: 14, lineHeight: 1.7, color: '#666' }}>
        <p>By using GeekShop services, you agree to the following terms and conditions. Please read them carefully before proceeding.</p>
        <p>1. All products purchased through GeekShop are subject to our return policy. Returns must be initiated within 14 days of delivery.</p>
        <p>2. Prices are listed in Uzbekistani So'm (UZS) and include all applicable taxes. Shipping costs are calculated at checkout.</p>
        <p>3. Personal data collected during registration is processed in accordance with our Privacy Policy.</p>
      </div>
    </ModalStory>
  ),
};

// ─── 4. Without Footer ───────────────────────────────────────────────────────

export const WithoutFooter: Story = {
  name: 'Without Footer',
  render: () => (
    <ModalStory title="Quick View" buttonLabel="Quick View">
      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ width: 200, height: 200, background: '#f5f5f5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ color: '#999', fontSize: 12 }}>Product Image</span>
        </div>
        <div>
          <h3 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 600 }}>MSI RTX 4060 Ventus 2X</h3>
          <p style={{ margin: '0 0 4px', fontSize: 14, color: '#666' }}>8GB GDDR6 | 2460 MHz Boost | 115W TDP</p>
          <p style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 700, color: '#FF0000' }}>12,500,000 UZS</p>
          <p style={{ margin: 0, fontSize: 13, color: '#07C160', fontWeight: 500 }}>In Stock (24 units)</p>
        </div>
      </div>
    </ModalStory>
  ),
};

// ─── 5. Without Title ────────────────────────────────────────────────────────

export const WithoutTitle: Story = {
  name: 'Without Title',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 24 }}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 14 }}
        >
          Open (No Title)
        </button>
        <DesktopModal open={open} onClose={() => setOpen(false)}>
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#E8F8EF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M8 16L14 22L24 10" stroke="#07C160" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: 18 }}>Added to Cart!</h3>
            <p style={{ margin: 0, color: '#666', fontSize: 14 }}>MSI RTX 4060 has been added to your shopping cart.</p>
          </div>
        </DesktopModal>
      </div>
    );
  },
};

// ─── 6. Image Gallery ────────────────────────────────────────────────────────

export const ImageGallery: Story = {
  name: 'Image Gallery Modal',
  render: () => (
    <ModalStory title="Review Photos" width={800} buttonLabel="View Photos">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {[
          'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&h=300&fit=crop',
          'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=300&h=300&fit=crop',
          'https://images.unsplash.com/photo-1555618568-bce51e8e11c6?w=300&h=300&fit=crop',
          'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300&h=300&fit=crop',
          'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?w=300&h=300&fit=crop',
          'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop',
        ].map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Review photo ${i + 1}`}
            style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: 8 }}
          />
        ))}
      </div>
    </ModalStory>
  ),
};

// ─── 7. Narrow Modal ─────────────────────────────────────────────────────────

export const NarrowModal: Story = {
  name: 'Narrow Modal (400px)',
  render: () => (
    <ModalStory
      title="Delete Review"
      width={400}
      footer={(onClose) => (
        <>
          <button type="button" onClick={onClose} style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid #eee', background: '#fff', cursor: 'pointer', fontSize: 14 }}>
            Keep
          </button>
          <button type="button" onClick={onClose} style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: '#FF3B30', color: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
            Delete
          </button>
        </>
      )}
      buttonLabel="Delete Review"
    >
      <p style={{ margin: 0, fontSize: 14, color: '#666', lineHeight: 1.6 }}>
        Are you sure you want to delete your review of "MSI RTX 4060 Ventus 2X"? This action cannot be undone.
      </p>
    </ModalStory>
  ),
};

// ─── 8. Long Scrollable Content ──────────────────────────────────────────────

export const LongScrollableContent: Story = {
  name: 'Long Scrollable Content',
  render: () => (
    <ModalStory
      title="Privacy Policy"
      width={640}
      footer={(onClose) => (
        <button type="button" onClick={onClose} style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: '#FF5000', color: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
          I Understand
        </button>
      )}
      buttonLabel="View Privacy Policy"
    >
      <div style={{ fontSize: 14, lineHeight: 1.7, color: '#666' }}>
        <h4 style={{ color: '#333', margin: '0 0 8px' }}>1. Information We Collect</h4>
        <p style={{ margin: '0 0 16px' }}>We collect information you provide directly to us, such as when you create an account, make a purchase, contact customer support, or participate in promotions. This includes your name, email address, phone number, shipping address, and payment information.</p>
        <h4 style={{ color: '#333', margin: '0 0 8px' }}>2. How We Use Your Information</h4>
        <p style={{ margin: '0 0 16px' }}>We use the information we collect to process orders, provide customer support, send promotional communications, improve our services, and personalize your shopping experience.</p>
        <h4 style={{ color: '#333', margin: '0 0 8px' }}>3. Information Sharing</h4>
        <p style={{ margin: '0 0 16px' }}>We do not sell your personal information. We share information with delivery partners to fulfill your orders, payment processors to handle transactions, and service providers who assist in our operations.</p>
        <h4 style={{ color: '#333', margin: '0 0 8px' }}>4. Data Security</h4>
        <p style={{ margin: '0 0 16px' }}>We implement industry-standard security measures to protect your personal information, including encryption of sensitive data, secure server infrastructure, and regular security audits.</p>
        <h4 style={{ color: '#333', margin: '0 0 8px' }}>5. Your Rights</h4>
        <p style={{ margin: '0 0 16px' }}>You have the right to access, update, or delete your personal information at any time. You can manage your data through your account settings or by contacting our support team.</p>
        <h4 style={{ color: '#333', margin: '0 0 8px' }}>6. Cookies and Tracking</h4>
        <p style={{ margin: 0 }}>We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage your cookie preferences in your browser settings.</p>
      </div>
    </ModalStory>
  ),
};

// ─── 9. Multi-Step Form ──────────────────────────────────────────────────────

export const MultiStepForm: Story = {
  name: 'Multi-Step Form',
  render: () => {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(1);

    return (
      <div style={{ padding: 24 }}>
        <button
          type="button"
          onClick={() => { setStep(1); setOpen(true); }}
          style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 14 }}
        >
          Write Review
        </button>
        <DesktopModal
          open={open}
          onClose={() => setOpen(false)}
          title={`Write a Review (Step ${step}/2)`}
          width={560}
          footer={
            <>
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid #eee', background: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 500 }}
                >
                  Back
                </button>
              )}
              <button
                type="button"
                onClick={() => step < 2 ? setStep(step + 1) : setOpen(false)}
                style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: '#FF5000', color: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}
              >
                {step < 2 ? 'Next' : 'Submit Review'}
              </button>
            </>
          }
        >
          {/* Progress bar */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
            {[1, 2].map((s) => (
              <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: s <= step ? '#FF5000' : '#eee' }} />
            ))}
          </div>

          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#333' }}>Rating</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} style={{ fontSize: 28, color: star <= 4 ? '#FFA726' : '#ddd', cursor: 'pointer' }}>&#9733;</span>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#333' }}>Review Title</label>
                <input type="text" placeholder="Summarize your experience" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14, boxSizing: 'border-box' }} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#333' }}>Your Review</label>
                <textarea rows={6} placeholder="Tell others what you think about this product..." style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14, boxSizing: 'border-box', resize: 'vertical' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#333' }}>Add Photos (optional)</label>
                <div style={{ padding: 24, border: '2px dashed #ddd', borderRadius: 8, textAlign: 'center', color: '#999', fontSize: 14 }}>
                  Drag and drop images or click to browse
                </div>
              </div>
            </div>
          )}
        </DesktopModal>
      </div>
    );
  },
};

// ─── 10. Success Confirmation ────────────────────────────────────────────────

export const ConfirmationSuccess: Story = {
  name: 'Success Confirmation',
  render: () => (
    <ModalStory
      title=""
      width={420}
      footer={(onClose) => (
        <button type="button" onClick={onClose} style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: '#07C160', color: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
          Continue Shopping
        </button>
      )}
      buttonLabel="Show Success"
    >
      <div style={{ textAlign: 'center', padding: '24px 0' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#E8F8EF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M10 20L18 28L30 14" stroke="#07C160" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 600 }}>Item Added to Cart!</h3>
        <p style={{ margin: 0, fontSize: 14, color: '#666' }}>NVIDIA GeForce RTX 4090 has been added to your cart. You now have 3 items totaling 38,290,000 UZS.</p>
      </div>
    </ModalStory>
  ),
};

// ─── 11. Required Action (Not Closable, Verification) ────────────────────────

export const RequiredAction: Story = {
  name: 'Required Action (Email Verification)',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 24 }}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 14 }}
        >
          Trigger Verification
        </button>
        <DesktopModal
          open={open}
          onClose={() => setOpen(false)}
          title="Verify Your Email"
          closable={false}
          width={480}
          footer={
            <>
              <button
                type="button"
                style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid #eee', background: '#fff', cursor: 'pointer', fontSize: 14, color: '#666' }}
              >
                Resend Code
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: '#FF5000', color: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}
              >
                Verify
              </button>
            </>
          }
        >
          <div style={{ textAlign: 'center' }}>
            <p style={{ margin: '0 0 16px', fontSize: 14, color: '#666' }}>
              We sent a 6-digit verification code to <strong>a***z@gmail.com</strong>. Enter it below to verify your email address.
            </p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              {Array.from({ length: 6 }, (_, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  style={{ width: 44, height: 52, textAlign: 'center', fontSize: 20, fontWeight: 600, borderRadius: 8, border: '1px solid #ddd', boxSizing: 'border-box' }}
                />
              ))}
            </div>
            <p style={{ margin: '16px 0 0', fontSize: 13, color: '#999' }}>Code expires in 4:59</p>
          </div>
        </DesktopModal>
      </div>
    );
  },
};

// ─── 12. Danger Action (Cancel Order) ────────────────────────────────────────

export const DangerModal: Story = {
  name: 'Danger Action (Cancel Order)',
  render: () => (
    <ModalStory
      title="Cancel Order #GS-2026-0091"
      width={520}
      footer={(onClose) => (
        <>
          <button type="button" onClick={onClose} style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid #eee', background: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>
            Keep Order
          </button>
          <button type="button" onClick={onClose} style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: '#FF3B30', color: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
            Cancel Order
          </button>
        </>
      )}
      buttonLabel="Cancel Order"
    >
      <div>
        <div style={{ padding: 16, background: '#FFF5F5', borderRadius: 8, marginBottom: 16, border: '1px solid #FFE0E0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>ASUS ROG Strix RTX 4080</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#FF0000' }}>42,000,000 UZS</span>
          </div>
          <div style={{ fontSize: 13, color: '#666' }}>Qty: 1 | Black, 16GB GDDR6X</div>
        </div>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#333' }}>Reason for cancellation</label>
        <select style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14, boxSizing: 'border-box', background: '#fff', marginBottom: 12 }}>
          <option>Found a better price elsewhere</option>
          <option>Changed my mind</option>
          <option>Ordered by mistake</option>
          <option>Delivery takes too long</option>
          <option>Other</option>
        </select>
        <p style={{ margin: 0, fontSize: 13, color: '#FF3B30' }}>Refund will be processed within 5-7 business days to your original payment method.</p>
      </div>
    </ModalStory>
  ),
};
