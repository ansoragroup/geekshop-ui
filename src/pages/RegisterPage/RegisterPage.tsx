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
import styles from './RegisterPage.module.scss';

/* ---------- SVG Icons ---------- */

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const PersonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

/* ---------- Helper: mask phone number ---------- */

function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 9) return `+998 ${phone}`;
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

export interface RegisterPageProps {
  /** If true, shows checkout-to-registration prompt */
  fromCheckout?: boolean;
  /** Current step of the registration flow */
  step?: 'info' | 'verify' | 'success';
}

/* ---------- Component ---------- */

export const RegisterPage: React.FC<RegisterPageProps> = ({
  fromCheckout = false,
  step: initialStep = 'info',
}) => {
  const { t } = useGeekShop();
  const [step, setStep] = useState(initialStep);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpEndTime, setOtpEndTime] = useState(() => new Date(Date.now() + 60_000));

  const handleRegister = useCallback(() => {
    const digits = phone.replace(/\D/g, '');
    if (name.trim().length >= 2 && digits.length >= 9) {
      setOtpEndTime(new Date(Date.now() + 60_000));
      setOtpError('');
      setStep('verify');
    }
  }, [name, phone]);

  const handleOtpComplete = useCallback((code: string) => {
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
  const phoneDigits = phone.replace(/\D/g, '');
  const canSubmit = name.trim().length >= 2 && phoneDigits.length >= 9;

  // Success step
  if (step === 'success') {
    return (
      <div className={styles.page}>
        <div className={styles.successContent}>
          <Result
            status="success"
            title={t('auth.success')}
            description={t('auth.registered')}
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
      <NavBar
        title={step === 'info' ? t('auth.register') : ''}
        showBack
        onBack={() => {
          if (step === 'verify') {
            setStep('info');
          }
        }}
      />

      <div className={styles.content}>
        {/* Info step */}
        {step === 'info' && (
          <>
            {fromCheckout && (
              <p className={styles.checkoutPrompt}>
                {t('auth.registerPrompt')}
              </p>
            )}

            <div className={styles.form}>
              {/* Name input */}
              <Input
                label={t('auth.nameLabel')}
                placeholder={t('auth.enterName')}
                leftIcon={<PersonIcon />}
                value={name}
                onChange={setName}
              />

              {/* Phone input */}
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
                onClick={handleRegister}
                disabled={!canSubmit}
              >
                {t('auth.register')}
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

            {/* Login link */}
            <div className={styles.loginLink}>
              <span className={styles.loginText}>{t('auth.haveAccount')}</span>
              <button
                type="button"
                className={styles.loginBtn}
                onClick={() => {}}
              >
                {t('auth.login')}
              </button>
            </div>
          </>
        )}

        {/* Verify step (OTP) */}
        {step === 'verify' && (
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
