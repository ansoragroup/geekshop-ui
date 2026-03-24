import { useState } from 'react';
import {
  DesktopShell,
  DesktopButton,
  DesktopInput,
  DesktopCheckbox,
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
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────

export interface DesktopLoginPageProps {
  /** Error message to display */
  error?: string;
  /** Show loading state */
  loading?: boolean;
  /** Pre-fill email */
  initialEmail?: string;
}

export const DesktopLoginPage: React.FC<DesktopLoginPageProps> = ({
  error,
  loading = false,
  initialEmail = '',
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

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
            <p className={styles.subtitle}>Sign in to your account</p>
          </div>

          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            {error && (
              <div style={{ padding: '12px 16px', background: '#FFF1F0', border: '1px solid #FFA39E', borderRadius: 8, color: '#CF1322', fontSize: 14, marginBottom: 4 }}>
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
              <a href="#" className={styles.forgotLink}>Forgot password?</a>
            </div>

            <DesktopButton variant="primary" size="lg" fullWidth type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </DesktopButton>
          </form>

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
            <a href="#" className={styles.switchLink}>Register</a>
          </p>
        </div>
      </div>
    </DesktopShell>
  );
};
