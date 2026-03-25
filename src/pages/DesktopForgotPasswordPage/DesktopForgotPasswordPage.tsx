import { useState } from 'react';
import { DesktopShell, DesktopButton, DesktopInput } from '../../components';
import { DefaultTopBar, DefaultHeader, DefaultFooter } from '../_shared';
import styles from './DesktopForgotPasswordPage.module.scss';

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
    <DesktopShell topBar={<DefaultTopBar />} header={<DefaultHeader />} footer={<DefaultFooter />}>
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
            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <DesktopInput
                label="Email address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={setEmail}
              />

              <DesktopButton variant="primary" size="lg" fullWidth type="submit">
                Reset Password
              </DesktopButton>
            </form>
          ) : (
            <div className={styles.successMessage}>
              <div className={styles.successIcon}>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#07C160"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <p className={styles.successText}>
                We sent a password reset link to <strong>{email}</strong>. Please check your email
                and follow the instructions.
              </p>
              <DesktopButton
                variant="outline"
                size="lg"
                fullWidth
                onClick={() => setSubmitted(false)}
              >
                Resend Email
              </DesktopButton>
            </div>
          )}

          <p className={styles.switchText}>
            Remember your password?{' '}
            <button type="button" className={styles.switchLink}>
              Sign In
            </button>
          </p>
        </div>
      </div>
    </DesktopShell>
  );
};
