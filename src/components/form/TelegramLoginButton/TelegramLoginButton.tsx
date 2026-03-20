import { cn } from '../../../utils/cn';
'use client';
import { forwardRef, useCallback, useEffect, useRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { useGeekShop } from '../../../i18n';
import styles from './TelegramLoginButton.module.scss';

export interface TelegramAuthData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

export interface TelegramLoginButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'children'> {
  /** Telegram bot username (e.g., "GeekShopBot") */
  botUsername: string;
  /** Callback when user authorizes via Telegram */
  onAuth?: (data: TelegramAuthData) => void;
  /** Redirect URL instead of callback */
  callbackUrl?: string;
  /** Render mode: custom styled button or official Telegram widget */
  variant?: 'button' | 'widget';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Show Telegram avatar after auth */
  showAvatar?: boolean;
  /** Custom button label (overrides translation) */
  label?: string;
  /** Disable the button */
  disabled?: boolean;
}

const TelegramIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
  </svg>
);

export const TelegramLoginButton = forwardRef<HTMLButtonElement, TelegramLoginButtonProps>(
  (
    {
      botUsername,
      onAuth: _onAuth,
      callbackUrl,
      variant = 'button',
      size = 'md',
      showAvatar: _showAvatar,
      label,
      disabled = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const { t } = useGeekShop();
    const widgetContainerRef = useRef<HTMLDivElement>(null);

    const handleClick = useCallback(() => {
      if (disabled) return;

      const sessionId = Math.random().toString(36).substring(2, 10);

      if (callbackUrl) {
        window.open(
          `https://oauth.telegram.org/auth?bot_id=${botUsername}&origin=${encodeURIComponent(callbackUrl)}`,
          '_blank',
          'noopener,noreferrer',
        );
      } else {
        window.open(
          `https://t.me/${botUsername}?start=auth_${sessionId}`,
          '_blank',
          'noopener,noreferrer',
        );
      }
    }, cn(botUsername, callbackUrl, disabled]);

    // Widget variant: load Telegram's official widget script
    useEffect(() => {
      if (variant !== 'widget' || !widgetContainerRef.current) return;

      const script = document.createElement('script');
      script.src = 'https://telegram.org/js/telegram-widget.js?22';
      script.setAttribute('data-telegram-login', botUsername);
      script.setAttribute('data-size', size === 'sm' ? 'small' : size === 'lg' ? 'large' : 'medium');
      script.setAttribute('data-request-access', 'write');
      script.async = true;

      if (callbackUrl) {
        script.setAttribute('data-auth-url', callbackUrl);
      }

      widgetContainerRef.current.innerHTML = '';
      widgetContainerRef.current.appendChild(script);
    }, [variant, botUsername, size, callbackUrl]);

    if (variant === 'widget') {
      return (
        <div
          ref={widgetContainerRef}
          className={[styles.widgetContainer, className)}
          data-testid="telegram-widget"
        />
      );
    }

    const buttonLabel = label ?? t('auth.loginViaTelegram');

    const buttonClass = cn(styles.button,
      styles[`size-${size}`],
      disabled && styles.disabled,
      className,);

    return (
      <button
        ref={ref}
        type="button"
        className={buttonClass}
        onClick={handleClick}
        disabled={disabled}
        aria-label={buttonLabel}
        {...rest}
      >
        <TelegramIcon />
        <span className={styles.label}>{buttonLabel}</span>
      </button>
    );
  },
);

TelegramLoginButton.displayName = 'TelegramLoginButton';
