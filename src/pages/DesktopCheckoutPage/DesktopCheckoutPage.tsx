'use client';
import { useState, useEffect, useCallback } from 'react';
import {
  DesktopShell,
  DesktopHeaderRich,
  Breadcrumbs,
  TwoColumnLayout,
  DesktopSteps,
  DesktopAddressCard,
  DesktopPaymentMethodCard,
  DesktopOrderSummary,
  DesktopButton,
  DesktopInput,
  DesktopOTPInput,
  Button,
} from '../../components';
import type {
  DesktopAddress,
  DesktopPaymentMethod,
} from '../../components';
import { mockCartItems, DefaultTopBar, DefaultMegaMenu, DefaultFooter, defaultHeaderCategories, defaultPromoLinks } from '../_shared';
import styles from './DesktopCheckoutPage.module.scss';

// ─── Static data ──────────────────────────────────────────────────────────────

const addresses: DesktopAddress[] = [
  {
    id: 'addr-1',
    name: 'Jasur Karimov',
    phone: '+998 90 123 45 67',
    street: "Amir Temur ko'chasi, 15-uy, 42-xonadon",
    city: 'Toshkent',
    region: 'Toshkent shahri',
    postalCode: '100000',
    isDefault: true,
    label: 'Uy',
  },
  {
    id: 'addr-2',
    name: 'Jasur Karimov',
    phone: '+998 90 123 45 67',
    street: "Mustaqillik ko'chasi, 59-uy, 3-qavat",
    city: 'Toshkent',
    region: 'Chilonzor tumani',
    postalCode: '100115',
    isDefault: false,
    label: 'Ish',
  },
  {
    id: 'addr-3',
    name: 'Anvar Karimov',
    phone: '+998 71 234 56 78',
    street: "Navoiy ko'chasi, 28-uy",
    city: 'Toshkent',
    region: 'Yakkasaroy tumani',
    postalCode: '100028',
    isDefault: false,
    label: 'Ota-ona',
  },
];

const paymentMethods: DesktopPaymentMethod[] = [
  { id: 'pm-1', type: 'uzcard', label: 'UzCard', lastFour: '4523', expiryDate: '09/27', isDefault: true },
  { id: 'pm-2', type: 'humo', label: 'Humo', lastFour: '8901', expiryDate: '03/28', isDefault: false },
  { id: 'pm-3', type: 'payme', label: 'Payme', isDefault: false },
  { id: 'pm-4', type: 'cash', label: 'Naqd pul', isDefault: false },
];


const checkoutSteps = [
  { title: 'Shipping' },
  { title: 'Payment' },
  { title: 'Review' },
];

// ─── Guest OTP State Type ────────────────────────────────────────────────────

type GuestStep = 'prompt' | 'phone' | 'otp' | 'done';

// ─── Component ────────────────────────────────────────────────────────────────

export interface DesktopCheckoutPageProps {
  /** Initial step index (0=Shipping, 1=Payment, 2=Review) */
  initialStep?: number;
  /** Render with empty cart */
  emptyCart?: boolean;
  /** Whether user is authenticated */
  isAuthenticated?: boolean;
  /** Force guest flow step (for stories) */
  initialGuestStep?: GuestStep;
  /** Pre-fill guest phone */
  initialGuestPhone?: string;
  /** Pre-fill guest OTP */
  initialGuestOtp?: string;
  /** Guest OTP countdown */
  initialGuestCountdown?: number;
}

export const DesktopCheckoutPage: React.FC<DesktopCheckoutPageProps> = ({
  initialStep = 0,
  emptyCart = false,
  isAuthenticated = true,
  initialGuestStep = 'prompt',
  initialGuestPhone = '',
  initialGuestOtp = '',
  initialGuestCountdown,
}) => {
  const [currentStep] = useState(initialStep);
  const [searchValue, setSearchValue] = useState('');
  const [selectedAddress, setSelectedAddress] = useState<string>(addresses[0].id);
  const [selectedPayment, setSelectedPayment] = useState<string>(paymentMethods[0].id);

  // Guest OTP state
  const [guestStep, setGuestStep] = useState<GuestStep>(isAuthenticated ? 'done' : initialGuestStep);
  const [guestPhone, setGuestPhone] = useState(initialGuestPhone);
  const [guestOtp, setGuestOtp] = useState(initialGuestOtp);
  const [guestCountdown, setGuestCountdown] = useState(initialGuestCountdown ?? 0);
  const [guestOtpError, setGuestOtpError] = useState('');

  // Guest countdown timer
  useEffect(() => {
    if (guestCountdown <= 0) return;
    const timer = setInterval(() => {
      setGuestCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [guestCountdown]);

  const formatPhone = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 9);
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
    if (digits.length <= 7) return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
    return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 7)} ${digits.slice(7, 9)}`;
  };

  const handleGuestPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 9);
    setGuestPhone(formatPhone(raw));
  };

  const handleGuestSendCode = useCallback(() => {
    if (guestPhone.replace(/\D/g, '').length < 9) return;
    setGuestStep('otp');
    setGuestCountdown(59);
    setGuestOtp('');
    setGuestOtpError('');
  }, [guestPhone]);

  const handleGuestResend = useCallback(() => {
    setGuestCountdown(59);
    setGuestOtp('');
    setGuestOtpError('');
  }, []);

  const handleGuestOtpComplete = useCallback((_code: string) => {
    // In real app: verify OTP, create guest session, continue checkout
    setGuestStep('done');
  }, []);

  const selectedCartItems = emptyCart ? [] : mockCartItems.filter((item) => item.selected);
  const subtotal = selectedCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const header = (
    <div className={styles.headerWrapper}>
      <DesktopHeaderRich
        logo={<span className={styles.logoText}>GeekShop</span>}
        searchPlaceholder="Search for GPUs, laptops, monitors..."
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        cartCount={selectedCartItems.length}
        wishlistCount={2}
        categories={defaultHeaderCategories}
        promoLinks={defaultPromoLinks}
        location="Tashkent"
      />
      <DefaultMegaMenu />
    </div>
  );

  const orderSummary = (
    <DesktopOrderSummary
      subtotal={subtotal}
      shipping={shipping}
      total={total}
      itemCount={selectedCartItems.length}
      ctaText="Place Order"
      onCheckout={() => {}}
      trustBadges={[
        { icon: 'shipping', text: 'Free shipping on orders over 5,000,000 UZS' },
        { icon: 'secure', text: 'Secure checkout' },
        { icon: 'returns', text: '14-day returns' },
      ]}
    />
  );

  return (
    <DesktopShell
      topBar={<DefaultTopBar />}
      header={header}
      footer={<DefaultFooter />}
    >
      {/* Breadcrumbs */}
      <div className={styles.breadcrumbs}>
        <Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'Cart', href: '#' }, { label: 'Checkout' }]} />
      </div>

      {/* Guest auth banner */}
      {guestStep !== 'done' && !emptyCart && (
        <div className={styles.guestBanner}>
          {guestStep === 'prompt' && (
            <div className={styles.guestPrompt}>
              <div className={styles.guestPromptLeft}>
                <p className={styles.guestPromptTitle}>Already have an account?</p>
                <p className={styles.guestPromptSubtitle}>Sign in for faster checkout and order tracking</p>
              </div>
              <div className={styles.guestPromptActions}>
                <DesktopButton variant="primary" size="md" onClick={() => setGuestStep('phone')}>
                  Sign In
                </DesktopButton>
                <DesktopButton variant="secondary" size="md" onClick={() => setGuestStep('phone')}>
                  Continue as Guest
                </DesktopButton>
              </div>
            </div>
          )}

          {guestStep === 'phone' && (
            <div className={styles.guestPhoneForm}>
              <p className={styles.guestFormTitle}>Enter your phone number</p>
              <div className={styles.guestPhoneRow}>
                <span className={styles.guestPhonePrefix}>+998</span>
                <DesktopInput
                  type="tel"
                  placeholder="90 123 45 67"
                  value={guestPhone}
                  onChange={handleGuestPhoneChange}
                />
                <DesktopButton
                  variant="primary"
                  size="md"
                  disabled={guestPhone.replace(/\D/g, '').length < 9}
                  onClick={handleGuestSendCode}
                >
                  Send Code
                </DesktopButton>
              </div>
            </div>
          )}

          {guestStep === 'otp' && (
            <div className={styles.guestOtpForm}>
              <div className={styles.guestOtpHeader}>
                <p className={styles.guestFormTitle}>
                  Verification code sent to <strong>+998 {guestPhone}</strong>
                </p>
                <button
                  type="button"
                  className={styles.guestChangeLink}
                  onClick={() => setGuestStep('phone')}
                >
                  Change
                </button>
              </div>
              <DesktopOTPInput
                length={6}
                value={guestOtp}
                onChange={setGuestOtp}
                onComplete={handleGuestOtpComplete}
                error={!!guestOtpError}
                errorMessage={guestOtpError}
                autoFocus
              />
              <div className={styles.guestResendRow}>
                {guestCountdown > 0 ? (
                  <span className={styles.guestResendTimer}>Resend in {guestCountdown}s</span>
                ) : (
                  <button
                    type="button"
                    className={styles.guestResendLink}
                    onClick={handleGuestResend}
                  >
                    Resend code
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Checkout steps */}
      <div className={styles.stepsWrapper}>
        <DesktopSteps current={currentStep} items={checkoutSteps} />
      </div>

      {emptyCart ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon} aria-hidden="true">🛒</div>
          <h2 className={styles.emptyTitle}>Your cart is empty</h2>
          <p className={styles.emptyText}>Add items to your cart before checking out.</p>
          <Button variant="primary" size="lg">Continue Shopping</Button>
        </div>
      ) : (
        <TwoColumnLayout
          sidebar={orderSummary}
          sidebarWidth={380}
          sidebarPosition="right"
          gap={24}
          stickyTop={24}
        >
          {/* Shipping Address Section */}
          {currentStep === 0 && (
            <section className={styles.formSection} aria-labelledby="shipping-heading">
              <h2 id="shipping-heading" className={styles.formSectionTitle}>Shipping Address</h2>
              <div className={styles.addressList}>
                {addresses.map((addr) => (
                  <DesktopAddressCard
                    key={addr.id}
                    address={addr}
                    selected={selectedAddress === addr.id}
                    selectable
                    onSelect={() => setSelectedAddress(addr.id)}
                  />
                ))}
              </div>
              <Button variant="outline" size="md" className={styles.addButton}>
                + Add New Address
              </Button>
            </section>
          )}

          {/* Payment Method Section */}
          {currentStep <= 1 && (
            <section className={styles.formSection} aria-labelledby="payment-heading">
              <h2 id="payment-heading" className={styles.formSectionTitle}>Payment Method</h2>
              <div className={styles.paymentList}>
                {paymentMethods.map((method) => (
                  <DesktopPaymentMethodCard
                    key={method.id}
                    method={method}
                    selected={selectedPayment === method.id}
                    selectable
                    onSelect={() => setSelectedPayment(method.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Review Section */}
          {currentStep === 2 && (
            <section className={styles.formSection} aria-labelledby="review-heading">
              <h2 id="review-heading" className={styles.formSectionTitle}>Order Review</h2>
              <div className={styles.reviewSummary}>
                <div className={styles.reviewBlock}>
                  <h3 className={styles.reviewBlockTitle}>Shipping to</h3>
                  <p className={styles.reviewBlockText}>
                    {addresses[0].name} — {addresses[0].street}, {addresses[0].city}
                  </p>
                </div>
                <div className={styles.reviewBlock}>
                  <h3 className={styles.reviewBlockTitle}>Payment</h3>
                  <p className={styles.reviewBlockText}>
                    {paymentMethods[0].label} {paymentMethods[0].lastFour ? `•••• ${paymentMethods[0].lastFour}` : ''}
                  </p>
                </div>
                <div className={styles.reviewBlock}>
                  <h3 className={styles.reviewBlockTitle}>Items ({selectedCartItems.length})</h3>
                  {selectedCartItems.map((item) => (
                    <p key={item.id} className={styles.reviewBlockText}>
                      {item.name} × {item.quantity}
                    </p>
                  ))}
                </div>
              </div>
            </section>
          )}
        </TwoColumnLayout>
      )}
    </DesktopShell>
  );
};
