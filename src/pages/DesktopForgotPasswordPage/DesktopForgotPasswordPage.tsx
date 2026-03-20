import { useState } from 'react';
import {
  DesktopShell,
  TopBar,
  DesktopHeader,
  Footer,
  DesktopButton,
  DesktopInput,
} from '../../components';
import styles from './DesktopForgotPasswordPage.module.scss';

const footerColumns = [
  { title: 'Customer Service', links: [{ label: 'Help Center' }, { label: 'Returns & Refunds' }, { label: 'Shipping Info' }] },
  { title: 'About GeekShop', links: [{ label: 'About Us' }, { label: 'Careers' }, { label: 'Press' }] },
  { title: 'Policies', links: [{ label: 'Privacy Policy' }, { label: 'Terms of Service' }] },
];

export interface DesktopForgotPasswordPageProps {
  /** Show the "email sent" confirmation state */
  initialSubmitted?: boolean;
  /** Pre-fill email */
  initialEmail?: string;
}

export const DesktopForgotPasswordPage: React.FC<DesktopForgotPasswordPageProps> = ({
  initialSubmitted = false,
  initialEmail = '',
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [submitted, setSubmitted] = useState(initialSubmitted);

  return (
    <DesktopShell
      topBar={
        <TopBar
          leftItems={[<span key="w">Welcome to GeekShop!</span>]}
          rightItems={[
            <button key="l" type="button" className={styles.topBarBtn}>EN</button>,
            <button key="c" type="button" className={styles.topBarBtn}>UZS</button>,
          ]}
        />
      }
      header={
        <DesktopHeader
          logo={<span className={styles.logoText}>GeekShop</span>}
          searchPlaceholder="Search products..."
          cartCount={0}
        />
      }
      footer={<Footer columns={footerColumns} copyrightText="© 2026 GeekShop. All rights reserved." />}
    >
      <div className={styles.centerWrap}>
        <div className={styles.card}>
          <div className={styles.logoSection}>
            <span className={styles.logoLarge}>GeekShop</span>
            {!submitted ? (
              <p className={styles.subtitle}>Enter your email to reset your password</p>
            ) : (
              <p className={styles.subtitle}>Check your inbox for a reset link</p>
            )}
          </div>

          {!submitted ? (
            <form className={styles.form} onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              <DesktopInput
                label="Email address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <DesktopButton variant="primary" size="lg" fullWidth type="submit">
                Reset Password
              </DesktopButton>
            </form>
          ) : (
            <div className={styles.successMessage}>
              <div className={styles.successIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#07C160" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <p className={styles.successText}>
                We sent a password reset link to <strong>{email}</strong>. Please check your email and follow the instructions.
              </p>
              <DesktopButton variant="outline" size="lg" fullWidth onClick={() => setSubmitted(false)}>
                Resend Email
              </DesktopButton>
            </div>
          )}

          <p className={styles.switchText}>
            Remember your password?{' '}
            <a href="#" className={styles.switchLink}>Sign In</a>
          </p>
        </div>
      </div>
    </DesktopShell>
  );
};
