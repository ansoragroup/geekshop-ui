'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, useState, useCallback, type HTMLAttributes } from 'react';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import { useGeekShop } from '../../../i18n';
import styles from './ShareSheet.module.scss';

export type SharePlatform = 'telegram' | 'whatsapp' | 'twitter' | 'facebook' | 'email' | 'sms';

export interface ShareSheetProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether the share sheet is visible */
  visible: boolean;
  /** Close handler */
  onClose: () => void;
  /** URL to share */
  url: string;
  /** Share title */
  title?: string;
  /** Share description */
  description?: string;
  /** Share image URL */
  image?: string;
  /** Platforms to display (default: all) */
  platforms?: SharePlatform[];
  /** Callback when a platform is clicked */
  onShare?: (platform: string) => void;
  /** Whether to show the copy link button (default: true) */
  showCopyLink?: boolean;
}

const ALL_PLATFORMS: SharePlatform[] = ['telegram', 'whatsapp', 'twitter', 'facebook', 'email', 'sms'];

const PLATFORM_COLORS: Record<SharePlatform, string> = {
  telegram: '#0088CC',
  whatsapp: '#25D366',
  twitter: '#1DA1F2',
  facebook: '#1877F2',
  email: '#666666',
  sms: '#FF5000',
};

function getPlatformIcon(platform: SharePlatform): JSX.Element {
  switch (platform) {
    case 'telegram':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M17.47 14.38c-.29-.15-1.7-.84-1.96-.94-.26-.09-.46-.14-.65.15-.19.29-.74.93-.91 1.12-.17.19-.34.21-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.77-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.59.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.14-.65-1.57-.89-2.15-.24-.57-.48-.49-.65-.5-.17 0-.36-.02-.55-.02-.19 0-.51.07-.77.36-.26.29-1.01.99-1.01 2.41s1.04 2.8 1.18 2.99c.15.19 2.04 3.12 4.94 4.38.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.12.55-.08 1.7-.7 1.94-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.34zM12.05 21.5h-.02c-1.68 0-3.33-.45-4.78-1.3l-.34-.2-3.56.93.95-3.47-.23-.36c-.94-1.49-1.43-3.21-1.43-4.98C2.64 6.88 7.03 2.5 12.07 2.5c2.43 0 4.71.95 6.43 2.67a9.03 9.03 0 012.66 6.42c0 5.24-4.27 9.5-9.11 9.91z" />
        </svg>
      );
    case 'twitter':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M18.24 8.56c-.41.18-.86.31-1.32.36.48-.29.84-.74 1.01-1.28-.44.26-.94.46-1.46.56A2.55 2.55 0 0014.6 7.5c-1.41 0-2.56 1.14-2.56 2.56 0 .2.02.39.07.58a7.27 7.27 0 01-5.27-2.67 2.56 2.56 0 00.79 3.41c-.36-.01-.7-.11-1-.27v.03c0 1.24.88 2.27 2.05 2.5-.21.06-.44.09-.67.09-.16 0-.32-.02-.48-.05a2.56 2.56 0 002.39 1.78A5.13 5.13 0 016.5 16.7a7.23 7.23 0 003.92 1.15c4.7 0 7.27-3.9 7.27-7.27l-.01-.33c.5-.36.93-.81 1.28-1.33-.46.2-.95.34-1.47.4.53-.32.93-.82 1.12-1.42-.5.29-1.05.5-1.63.62-.47-.5-1.13-.81-1.87-.81z" />
        </svg>
      );
    case 'facebook':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M13.4 20.5v-7.57h2.54l.38-2.95h-2.92v-1.9c0-.85.24-1.43 1.46-1.43h1.56V4.01c-.27-.04-1.2-.12-2.27-.12-2.25 0-3.79 1.37-3.79 3.9v2.18H7.82v2.95h2.54V20.5h3.04z" />
        </svg>
      );
    case 'email':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="6" width="16" height="12" rx="2" />
          <path d="M4 8l8 5 8-5" />
        </svg>
      );
    case 'sms':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          <path d="M8 10h.01M12 10h.01M16 10h.01" />
        </svg>
      );
  }
}

function getShareUrl(platform: SharePlatform, url: string, title?: string, description?: string): string {
  const text = [title, description].filter(Boolean).join(' - ');
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text || url);

  switch (platform) {
    case 'telegram':
      return `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
    case 'whatsapp':
      return `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
    case 'twitter':
      return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case 'email':
      return `mailto:?subject=${encodeURIComponent(title || '')}&body=${encodedText}%20${encodedUrl}`;
    case 'sms':
      return `sms:?body=${encodedText}%20${encodedUrl}`;
  }
}

const LinkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 11.5a4 4 0 005.66 0l2.12-2.12a4 4 0 00-5.66-5.66l-1.06 1.06" />
    <path d="M11.5 8.5a4 4 0 00-5.66 0L3.72 10.62a4 4 0 005.66 5.66l1.06-1.06" />
  </svg>
);

export const ShareSheet = forwardRef<HTMLDivElement, ShareSheetProps>(
  (
    {
      visible,
      onClose,
      url,
      title,
      description,
      image: _image,
      platforms = ALL_PLATFORMS,
      onShare,
      showCopyLink = true,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const { t } = useGeekShop();
    const [copied, setCopied] = useState(false);

    const sheetRef = useFocusTrap<HTMLDivElement>(visible, {
      onEscape: onClose,
    });

    const mergedRef = useCallback(
      (node: HTMLDivElement | null) => {
        sheetRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref, sheetRef],
    );

    if (!visible) return null;

    const handleOverlayClick = () => {
      onClose();
    };

    const handleContentClick = (e: React.MouseEvent) => {
      e.stopPropagation();
    };

    const handlePlatformClick = (platform: SharePlatform) => {
      onShare?.(platform);
      const shareUrl = getShareUrl(platform, url, title, description);
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
      onClose();
    };

    const handleCopyLink = async () => {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = url;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    };

    return (
      <div className={cn(styles.overlay, className)} onClick={handleOverlayClick} role="presentation">
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <div
          ref={mergedRef}
          className={styles.sheet}
          onClick={handleContentClick}
          onKeyDown={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={t('shareSheet.title')}
          tabIndex={-1}
          {...rest}
        >
          <div className={styles.dragHandle}>
            <span className={styles.dragBar} />
          </div>

          <div className={styles.header}>
            <span className={styles.title}>{t('shareSheet.title')}</span>
          </div>

          <div className={styles.platforms}>
            {platforms.map((platform) => (
              <button
                key={platform}
                className={styles.platformBtn}
                onClick={() => handlePlatformClick(platform)}
                type="button"
                aria-label={t(`shareSheet.${platform}`)}
              >
                <span
                  className={styles.platformIcon}
                  style={{ backgroundColor: PLATFORM_COLORS[platform] }}
                >
                  {getPlatformIcon(platform)}
                </span>
                <span className={styles.platformName}>{t(`shareSheet.${platform}`)}</span>
              </button>
            ))}
          </div>

          {showCopyLink && (
            <div className={styles.copySection}>
              <button
                className={cn(styles.copyBtn, copied ? styles.copied : '')}
                onClick={handleCopyLink}
                type="button"
              >
                <LinkIcon />
                <span>{copied ? t('shareSheet.copied') : t('shareSheet.copyLink')}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

ShareSheet.displayName = 'ShareSheet';
