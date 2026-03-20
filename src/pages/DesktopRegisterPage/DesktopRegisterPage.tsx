import { useState } from 'react';
import {
  DesktopShell,
  TopBar,
  DesktopHeader,
  Footer,
  DesktopButton,
  DesktopInput,
  DesktopCheckbox,
} from '../../components';
import styles from './DesktopRegisterPage.module.scss';

// ─── Static data ──────────────────────────────────────────────────────────────

const footerColumns = [
  { title: 'Customer Service', links: [{ label: 'Help Center' }, { label: 'Returns & Refunds' }, { label: 'Shipping Info' }] },
  { title: 'About GeekShop', links: [{ label: 'About Us' }, { label: 'Careers' }, { label: 'Press' }] },
  { title: 'Policies', links: [{ label: 'Privacy Policy' }, { label: 'Terms of Service' }] },
];

// ─── Component ────────────────────────────────────────────────────────────────

export interface DesktopRegisterPageProps {
  /** Field-level errors */
  errors?: Record<string, string>;
  /** Show loading state */
  loading?: boolean;
  /** Pre-fill values */
  initialValues?: { name?: string; email?: string; phone?: string };
}

export const DesktopRegisterPage: React.FC<DesktopRegisterPageProps> = ({
  errors = {},
  loading = false,
  initialValues = {},
}) => {
  const [name, setName] = useState(initialValues.name ?? '');
  const [email, setEmail] = useState(initialValues.email ?? '');
  const [phone, setPhone] = useState(initialValues.phone ?? '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

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
            <p className={styles.subtitle}>Create your account</p>
          </div>

          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <DesktopInput
              label="Full name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              label="Phone number"
              type="tel"
              placeholder="+998 90 123 45 67"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={errors.phone}
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

          <p className={styles.switchText}>
            Already have an account?{' '}
            <a href="#" className={styles.switchLink}>Sign In</a>
          </p>
        </div>
      </div>
    </DesktopShell>
  );
};
