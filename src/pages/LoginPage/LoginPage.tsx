import { useState, useMemo, useCallback } from 'react';
import {
  NavBar,
  Input,
  Button,
  Result,
  useGeekShop,
} from '../../components';
import { OTPInput } from '../../components/form/OTPInput';
import { TelegramLoginButton } from '../../components/form/TelegramLoginButton';
import { useCountdown } from '../../hooks/useCountdown';
import styles from './LoginPage.module.scss';

/* ---------- SVG Icons ---------- */

const LogoIcon = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
    <rect width="56" height="56" rx="16" fill="#FF5000" />
    <text x="28" y="36" textAnchor="middle" fill="#FFF" fontWeight="700" fontSize="22" fontFamily="system-ui">G</text>
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

/* ---------- Helper: mask phone number ---------- */

function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 9) return `+998 ${phone}`;
  // Show first 2 and last 2, mask the rest
  return `+998 ${digits.slice(0, 2)} *** ** ${digits.slice(-2)}`;
}

/* ---------- OTP Timer component ---------- */

const OTPTimer: React.FC<{
  endTime: Date;
  onResend: () => void;
  label: string;
  resendLabel: string;
  resendInLabel: string;
}> = ({ endTime, onResend, label, resendLabel, resendInLabel }) => {
  const countdown = useCountdown(endTime);

  if (countdown.isExpired) {
    return (
      <div className={styles.resendRow}>
        <span className={styles.resendText}>{label}</span>
        <button
          type="button"
          className={styles.resendLink}
          onClick={onResend}
        >
          {resendLabel}
        </button>
      </div>
    );
  }

  const seconds = countdown.minutes * 60 + countdown.seconds;
  const formatted = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

  return (
    <div className={styles.resendRow}>
      <span className={styles.resendText}>{label}</span>
      <span className={styles.resendTimer}>
        {resendInLabel.replace('{seconds}', formatted)}
      </span>
    </div>
  );
};

/* ---------- Props ---------- */

export interface LoginPageProps {
  /** Current step of the login flow */
  step?: 'phone' | 'otp' | 'success';
  /** Login method */
  method?: 'phone' | 'telegram';
}

/* ---------- Component ---------- */

export const LoginPage: React.FC<LoginPageProps> = ({
  step: initialStep = 'phone',
}) => {
  const { t } = useGeekShop();
  const [step, setStep] = useState(initialStep);
  const [phone, setPhone] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpEndTime, setOtpEndTime] = useState(() => new Date(Date.now() + 60_000));

  const handleSendOtp = useCallback(() => {
    if (phone.replace(/\D/g, '').length >= 9) {
      setOtpEndTime(new Date(Date.now() + 60_000));
      setOtpError('');
      setStep('otp');
    }
  }, [phone]);

  const handleOtpComplete = useCallback((code: string) => {
    // Simulate verification -- in real app, call API
    if (code === '000000') {
      setOtpError(t('auth.invalidCode'));
    } else {
      setStep('success');
    }
  }, [t]);

  const handleResend = useCallback(() => {
    setOtpEndTime(new Date(Date.now() + 60_000));
    setOtpError('');
  }, []);

  const maskedPhone = useMemo(() => maskPhone(phone), [phone]);

  // Success step
  if (step === 'success') {
    return (
      <div className={styles.page}>
        <div className={styles.successContent}>
          <Result
            status="success"
            title={t('auth.success')}
            description={t('auth.loggedIn')}
            actions={
              <Button variant="primary" size="lg" block onClick={() => {}}>
                {t('auth.startShopping')}
              </Button>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* OTP step: show back button */}
      {step === 'otp' && (
        <NavBar
          title=""
          showBack
          onBack={() => setStep('phone')}
        />
      )}

      <div className={styles.content}>
        {/* Phone step */}
        {step === 'phone' && (
          <>
            {/* Logo & Welcome */}
            <div className={styles.header}>
              <LogoIcon />
              <h1 className={styles.title}>{t('auth.welcome')}</h1>
              <p className={styles.subtitle}>{t('auth.phonePrompt')}</p>
            </div>

            {/* Phone input */}
            <div className={styles.form}>
              <div className={styles.phoneRow}>
                <div className={styles.countryCode}>
                  <span className={styles.flag}>&#x1F1FA;&#x1F1FF;</span>
                  <span className={styles.code}>+998</span>
                </div>
                <div className={styles.phoneInput}>
                  <Input
                    leftIcon={<PhoneIcon />}
                    placeholder={t('auth.phonePlaceholder')}
                    label={t('auth.phoneLabel')}
                    type="tel"
                    value={phone}
                    onChange={setPhone}
                  />
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                block
                onClick={handleSendOtp}
                disabled={phone.replace(/\D/g, '').length < 9}
              >
                {t('auth.sendCode')}
              </Button>
            </div>

            {/* Divider */}
            <div className={styles.dividerSection}>
              <div className={styles.dividerLine} />
              <span className={styles.dividerText}>{t('auth.or')}</span>
              <div className={styles.dividerLine} />
            </div>

            {/* Telegram Login */}
            <TelegramLoginButton botUsername="GeekShopBot" size="lg" />

            {/* Terms */}
            <p className={styles.terms}>{t('auth.termsAgreement')}</p>
          </>
        )}

        {/* OTP step */}
        {step === 'otp' && (
          <div className={styles.otpSection}>
            <h2 className={styles.otpTitle}>{t('auth.enterCode')}</h2>
            <p className={styles.otpSubtitle}>
              {t('auth.codeSentTo').replace('{phone}', maskedPhone)}
            </p>

            <OTPInput
              autoFocus // eslint-disable-line jsx-a11y/no-autofocus
              error={!!otpError}
              errorMessage={otpError}
              onComplete={handleOtpComplete}
              onChange={() => setOtpError('')}
            />

            <OTPTimer
              endTime={otpEndTime}
              onResend={handleResend}
              label={t('auth.codeNotReceived')}
              resendLabel={t('auth.resend')}
              resendInLabel={t('auth.resendIn')}
            />

            <Button
              variant="primary"
              size="lg"
              block
              onClick={() => {}}
              disabled
            >
              {t('auth.verify')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
