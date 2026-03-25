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
import styles from './DesktopLoginPage.module.scss';

// ─── SVG Icons ──────────────────────────────────────────────────────────────

const TelegramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.28-.02-.12.03-2.02 1.28-5.69 3.77-.54.37-1.03.55-1.47.54-.48-.01-1.4-.27-2.09-.49-.84-.28-1.51-.42-1.45-.89.03-.25.38-.5 1.04-.78 4.07-1.77 6.79-2.94 8.15-3.5 3.88-1.62 4.69-1.9 5.21-1.91.12 0 .37.03.54.17.14.12.18.28.2.45-.01.06.01.24 0 .37z" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.68 2.34a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.74.32 1.53.55 2.34.68A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────

export type LoginTab = 'phone' | 'email';
export type PhoneStep = 'input' | 'otp';

export interface DesktopLoginPageProps {
  /** Error message to display */
  error?: string;
  /** Show loading state */
  loading?: boolean;
  /** Pre-fill email */
  initialEmail?: string;
  /** Default active tab */
  defaultTab?: LoginTab;
  /** Force phone step (for stories) */
  initialPhoneStep?: PhoneStep;
  /** Pre-fill phone number */
  initialPhone?: string;
  /** Pre-fill OTP value */
  initialOtp?: string;
  /** Countdown seconds remaining (for OTP resend timer) */
  initialCountdown?: number;
}

export const DesktopLoginPage: React.FC<DesktopLoginPageProps> = ({
  error,
  loading = false,
  initialEmail = '',
  defaultTab = 'phone',
  initialPhoneStep = 'input',
  initialPhone = '',
  initialOtp = '',
  initialCountdown,
}) => {
  const [activeTab, setActiveTab] = useState<LoginTab>(defaultTab);
  // Email tab state
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  // Phone tab state
  const [phone, setPhone] = useState(initialPhone);
  const [phoneStep, setPhoneStep] = useState<PhoneStep>(initialPhoneStep);
  const [otpValue, setOtpValue] = useState(initialOtp);
  const [countdown, setCountdown] = useState(initialCountdown ?? 0);
  const [otpError, setOtpError] = useState('');

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

  const handleSendCode = useCallback(() => {
    if (phone.replace(/\D/g, '').length < 9) return;
    setPhoneStep('otp');
    setCountdown(59);
    setOtpValue('');
    setOtpError('');
  }, [phone]);

  const handleResendCode = useCallback(() => {
    setCountdown(59);
    setOtpValue('');
    setOtpError('');
  }, []);

  const handleChangeNumber = useCallback(() => {
    setPhoneStep('input');
    setOtpValue('');
    setOtpError('');
    setCountdown(0);
  }, []);

  const handleOtpComplete = useCallback((_code: string) => {
    // In a real app, this would verify the OTP via API
    // For demo, we just show the loading state concept
  }, []);

  const formatPhone = (val: string) => {
    // Only keep digits after +998
    const digits = val.replace(/\D/g, '');
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
    if (digits.length <= 7) return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
    return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 7)} ${digits.slice(
      7,
      9
    )}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 9);
    setPhone(formatPhone(raw));
  };

  return (
    <DesktopShell topBar={<DefaultTopBar />} header={<DefaultHeader />} footer={<DefaultFooter />}>
      <div className={styles.centerWrap}>
        <div className={styles.card}>
          <div className={styles.logoSection}>
            <span className={styles.logoLarge}>GeekShop</span>
            <p className={styles.subtitle}>Sign in to your account</p>
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
            <div className={styles.form} role="tabpanel" aria-label="Phone login">
              {error && (
                <div className={styles.errorBanner} role="alert">
                  {error}
                </div>
              )}

              {phoneStep === 'input' && (
                <>
                  <div className={styles.phoneInputWrapper}>
                    <span className={styles.phonePrefix}>+998</span>
                    <DesktopInput
                      label="Phone number"
                      type="tel"
                      placeholder="90 123 45 67"
                      value={phone}
                      onChange={handlePhoneChange}
                      disabled={loading}
                    />
                  </div>
                  <DesktopButton
                    variant="primary"
                    size="lg"
                    fullWidth
                    disabled={loading || phone.replace(/\D/g, '').length < 9}
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
            <form
              className={styles.form}
              onSubmit={(e) => e.preventDefault()}
              role="tabpanel"
              aria-label="Email login"
            >
              {error && (
                <div className={styles.errorBanner} role="alert">
                  {error}
                </div>
              )}
              <DesktopInput
                label="Email address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <DesktopInput
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />

              <div className={styles.options}>
                <DesktopCheckbox
                  label="Remember me"
                  checked={rememberMe}
                  onChange={setRememberMe}
                />
                <button type="button" className={styles.forgotLink}>
                  Forgot password?
                </button>
              </div>

              <DesktopButton variant="primary" size="lg" fullWidth type="submit" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </DesktopButton>
            </form>
          )}

          <div className={styles.divider}>
            <span className={styles.dividerText}>or continue with</span>
          </div>

          <div className={styles.socialButtons}>
            <DesktopButton variant="outline" size="lg" fullWidth icon={<TelegramIcon />}>
              Telegram
            </DesktopButton>
            <DesktopButton variant="outline" size="lg" fullWidth icon={<GoogleIcon />}>
              Google
            </DesktopButton>
          </div>

          <p className={styles.switchText}>
            Don&apos;t have an account?{' '}
            <button type="button" className={styles.switchLink}>
              Register
            </button>
          </p>
        </div>
      </div>
    </DesktopShell>
  );
};
