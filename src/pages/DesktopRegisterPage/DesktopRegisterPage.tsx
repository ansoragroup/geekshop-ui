'use client';
import { useState, useEffect, useCallback } from 'react';
import {
  DesktopShell,
  DesktopButton,
  DesktopInput,
  DesktopCheckbox,
  DesktopOTPInput,
} from '../../components';
import { DefaultTopBar, DefaultHeader, DefaultFooter } from '../_shared';
import styles from './DesktopRegisterPage.module.scss';

// ─── Icons ──────────────────────────────────────────────────────────────────

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.68 2.34a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.74.32 1.53.55 2.34.68A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────

export type RegisterTab = 'phone' | 'email';
export type RegisterPhoneStep = 'form' | 'otp';

export interface DesktopRegisterPageProps {
  /** Field-level errors */
  errors?: Record<string, string>;
  /** Show loading state */
  loading?: boolean;
  /** Pre-fill values */
  initialValues?: { name?: string; email?: string; phone?: string };
  /** Default active tab */
  defaultTab?: RegisterTab;
  /** Force phone step (for stories) */
  initialPhoneStep?: RegisterPhoneStep;
  /** Pre-fill OTP value */
  initialOtp?: string;
  /** Countdown seconds remaining */
  initialCountdown?: number;
}

export const DesktopRegisterPage: React.FC<DesktopRegisterPageProps> = ({
  errors = {},
  loading = false,
  initialValues = {},
  defaultTab = 'phone',
  initialPhoneStep = 'form',
  initialOtp = '',
  initialCountdown,
}) => {
  const [activeTab, setActiveTab] = useState<RegisterTab>(defaultTab);
  // Email tab state
  const [emailName, setEmailName] = useState(initialValues.name ?? '');
  const [email, setEmail] = useState(initialValues.email ?? '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  // Phone tab state
  const [phoneName, setPhoneName] = useState(initialValues.name ?? '');
  const [phone, setPhone] = useState(initialValues.phone ?? '');
  const [phoneStep, setPhoneStep] = useState<RegisterPhoneStep>(initialPhoneStep);
  const [otpValue, setOtpValue] = useState(initialOtp);
  const [countdown, setCountdown] = useState(initialCountdown ?? 0);
  const [otpError, setOtpError] = useState('');
  const [phoneAgreeTerms, setPhoneAgreeTerms] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const formatPhone = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 9);
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
    if (digits.length <= 7) return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
    return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 7)} ${digits.slice(7, 9)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 9);
    setPhone(formatPhone(raw));
  };

  const handleSendCode = useCallback(() => {
    if (phone.replace(/\D/g, '').length < 9 || !phoneName.trim()) return;
    setPhoneStep('otp');
    setCountdown(59);
    setOtpValue('');
    setOtpError('');
  }, [phone, phoneName]);

  const handleResendCode = useCallback(() => {
    setCountdown(59);
    setOtpValue('');
    setOtpError('');
  }, []);

  const handleChangeNumber = useCallback(() => {
    setPhoneStep('form');
    setOtpValue('');
    setOtpError('');
    setCountdown(0);
  }, []);

  const handleOtpComplete = useCallback((_code: string) => {
    // In a real app, verify OTP and create account
  }, []);

  return (
    <DesktopShell
      topBar={<DefaultTopBar />}
      header={<DefaultHeader />}
      footer={<DefaultFooter />}
    >
      <div className={styles.centerWrap}>
        <div className={styles.card}>
          <div className={styles.logoSection}>
            <span className={styles.logoLarge}>GeekShop</span>
            <p className={styles.subtitle}>Create your account</p>
          </div>

          {/* Tab switcher */}
          <div className={styles.tabBar} role="tablist">
            <button
              role="tab"
              aria-selected={activeTab === 'phone'}
              className={`${styles.tab} ${activeTab === 'phone' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('phone')}
              type="button"
            >
              <PhoneIcon />
              Phone
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'email'}
              className={`${styles.tab} ${activeTab === 'email' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('email')}
              type="button"
            >
              <MailIcon />
              Email
            </button>
          </div>

          {/* ── Phone Tab ── */}
          {activeTab === 'phone' && (
            <div className={styles.form} role="tabpanel" aria-label="Phone registration">
              {phoneStep === 'form' && (
                <>
                  <DesktopInput
                    label="Full name"
                    placeholder="Jasur Karimov"
                    value={phoneName}
                    onChange={(e) => setPhoneName(e.target.value)}
                    error={errors.name}
                    disabled={loading}
                  />
                  <div className={styles.phoneInputWrapper}>
                    <span className={styles.phonePrefix}>+998</span>
                    <DesktopInput
                      label="Phone number"
                      type="tel"
                      placeholder="90 123 45 67"
                      value={phone}
                      onChange={handlePhoneChange}
                      error={errors.phone}
                      disabled={loading}
                    />
                  </div>
                  <DesktopCheckbox
                    label="I agree to the Terms of Service and Privacy Policy"
                    checked={phoneAgreeTerms}
                    onChange={setPhoneAgreeTerms}
                  />
                  <DesktopButton
                    variant="primary"
                    size="lg"
                    fullWidth
                    disabled={loading || phone.replace(/\D/g, '').length < 9 || !phoneName.trim() || !phoneAgreeTerms}
                    onClick={handleSendCode}
                  >
                    {loading ? 'Sending...' : 'Send Code'}
                  </DesktopButton>
                </>
              )}

              {phoneStep === 'otp' && (
                <>
                  <div className={styles.otpInfo}>
                    <p className={styles.otpSentText}>
                      Code sent to <strong>+998 {phone}</strong>
                    </p>
                    <button
                      type="button"
                      className={styles.changeNumberLink}
                      onClick={handleChangeNumber}
                    >
                      Change number
                    </button>
                  </div>

                  <DesktopOTPInput
                    length={6}
                    value={otpValue}
                    onChange={setOtpValue}
                    onComplete={handleOtpComplete}
                    error={!!otpError}
                    errorMessage={otpError}
                    autoFocus
                    disabled={loading}
                  />

                  <div className={styles.resendRow}>
                    {countdown > 0 ? (
                      <span className={styles.resendTimer}>Resend in {countdown}s</span>
                    ) : (
                      <button
                        type="button"
                        className={styles.resendLink}
                        onClick={handleResendCode}
                      >
                        Resend code
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* ── Email Tab ── */}
          {activeTab === 'email' && (
            <form className={styles.form} onSubmit={(e) => e.preventDefault()} role="tabpanel" aria-label="Email registration">
              <DesktopInput
                label="Full name"
                placeholder="Nodira Azimova"
                value={emailName}
                onChange={(e) => setEmailName(e.target.value)}
                error={errors.name}
                disabled={loading}
              />
              <DesktopInput
                label="Email address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                disabled={loading}
              />
              <DesktopInput
                label="Password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                disabled={loading}
              />
              <DesktopInput
                label="Confirm password"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
                disabled={loading}
              />

              <DesktopCheckbox
                label="I agree to the Terms of Service and Privacy Policy"
                checked={agreeTerms}
                onChange={setAgreeTerms}
              />

              <DesktopButton variant="primary" size="lg" fullWidth type="submit" disabled={loading}>
                {loading ? 'Creating account...' : 'Create Account'}
              </DesktopButton>
            </form>
          )}

          <p className={styles.switchText}>
            Already have an account?{' '}
            <a href="#" className={styles.switchLink}>Sign In</a>
          </p>
        </div>
      </div>
    </DesktopShell>
  );
};
