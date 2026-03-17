import { forwardRef, useState, type HTMLAttributes } from 'react';
import styles from './DesktopShareSheet.module.scss';

export type DesktopSharePlatform = 'link' | 'facebook' | 'twitter' | 'telegram' | 'whatsapp';

export interface DesktopShareSheetProps extends HTMLAttributes<HTMLDivElement> {
  /** Platforms to display */
  platforms?: DesktopSharePlatform[];
  /** URL to share */
  url: string;
  /** Share title */
  title?: string;
  /** Callback when a platform is clicked */
  onShare?: (platform: DesktopSharePlatform) => void;
}

const PLATFORM_COLORS: Record<DesktopSharePlatform, string> = {
  link: '#666666',
  facebook: '#1877F2',
  twitter: '#1DA1F2',
  telegram: '#0088CC',
  whatsapp: '#25D366',
};

const PLATFORM_LABELS: Record<DesktopSharePlatform, string> = {
  link: 'Copy Link',
  facebook: 'Facebook',
  twitter: 'Twitter',
  telegram: 'Telegram',
  whatsapp: 'WhatsApp',
};

function getPlatformIcon(platform: DesktopSharePlatform): JSX.Element {
  switch (platform) {
    case 'link':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 11.5a4 4 0 005.66 0l2.12-2.12a4 4 0 00-5.66-5.66l-1.06 1.06" />
          <path d="M11.5 8.5a4 4 0 00-5.66 0L3.72 10.62a4 4 0 005.66 5.66l1.06-1.06" />
        </svg>
      );
    case 'facebook':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M11.17 17.08v-6.3h2.12l.32-2.46h-2.44V6.73c0-.71.2-1.2 1.22-1.2h1.3V3.34c-.22-.03-1-.1-1.89-.1-1.87 0-3.16 1.15-3.16 3.25v1.82H6.52v2.46h2.12v6.3h2.53z" />
        </svg>
      );
    case 'twitter':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M15.2 7.13c-.34.15-.72.26-1.1.3.4-.24.7-.62.84-1.07-.37.22-.78.38-1.22.47A1.93 1.93 0 0012.32 6c-1.18 0-2.13.96-2.13 2.13 0 .17.02.33.06.48a6.06 6.06 0 01-4.4-2.23 2.13 2.13 0 00.66 2.84c-.3-.01-.58-.09-.83-.23v.03c0 1.03.73 1.89 1.71 2.09a2.1 2.1 0 01-.96.04 2.13 2.13 0 001.99 1.48A4.27 4.27 0 015.42 14a6.03 6.03 0 003.27.96c3.92 0 6.06-3.25 6.06-6.06l-.01-.28c.42-.3.78-.67 1.07-1.1-.38.17-.79.28-1.22.33.44-.26.78-.68.94-1.18-.42.25-.88.42-1.36.52a2.1 2.1 0 00-1.56-.69z" />
        </svg>
      );
    case 'telegram':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M8.15 15.54l.23-3.52 6.4-5.77c.28-.26-.06-.38-.43-.16L6.45 11.08 3.03 10c-.73-.21-.74-.72.17-1.08l13.31-5.13c.61-.28 1.19.15.96 1.08l-2.27 10.67c-.16.76-.62.94-1.25.59l-3.45-2.54-1.66 1.6c-.19.2-.35.35-.69.35z" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M14.56 11.98c-.24-.12-1.42-.7-1.63-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.93-1.19-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.01-.37.11-.49.11-.11.24-.28.37-.43.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.43-.06-.12-.54-1.31-.74-1.79-.2-.47-.4-.41-.54-.42-.14 0-.3-.02-.46-.02-.16 0-.43.06-.64.3-.22.24-.84.82-.84 2.01s.87 2.33.99 2.5c.12.16 1.7 2.6 4.12 3.65.57.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28zM10.04 17.92h-.02c-1.4 0-2.77-.38-3.98-1.08l-.29-.17-2.97.78.79-2.89-.19-.3c-.78-1.24-1.19-2.67-1.19-4.15.01-4.36 3.56-7.9 7.87-7.9 2.02 0 3.93.79 5.36 2.23a7.52 7.52 0 012.22 5.35c0 4.37-3.56 7.93-7.6 8.13z" />
        </svg>
      );
  }
}

function getShareUrl(platform: DesktopSharePlatform, url: string, title?: string): string {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title || url);

  switch (platform) {
    case 'link':
      return url;
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case 'twitter':
      return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    case 'telegram':
      return `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;
    case 'whatsapp':
      return `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
  }
}

const ALL_PLATFORMS: DesktopSharePlatform[] = ['link', 'facebook', 'twitter', 'telegram', 'whatsapp'];

export const DesktopShareSheet = forwardRef<HTMLDivElement, DesktopShareSheetProps>(
  ({ platforms = ALL_PLATFORMS, url, title, onShare, className = '', ...rest }, ref) => {
    const [copied, setCopied] = useState(false);

    const handleClick = async (platform: DesktopSharePlatform) => {
      onShare?.(platform);

      if (platform === 'link') {
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          // Fallback
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
        return;
      }

      const shareUrl = getShareUrl(platform, url, title);
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    };

    return (
      <div ref={ref} className={`${styles.root} ${className}`} role="group" aria-label="Share" {...rest}>
        {platforms.map((platform) => (
          <button
            key={platform}
            className={styles.platformBtn}
            onClick={() => handleClick(platform)}
            type="button"
            aria-label={platform === 'link' && copied ? 'Copied!' : PLATFORM_LABELS[platform]}
          >
            <span
              className={`${styles.iconCircle} ${platform === 'link' && copied ? styles.copied : ''}`}
              style={{ backgroundColor: platform === 'link' && copied ? '#07C160' : PLATFORM_COLORS[platform] }}
            >
              {platform === 'link' && copied ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 10l4 4 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                getPlatformIcon(platform)
              )}
            </span>
            <span className={styles.label}>
              {platform === 'link' && copied ? 'Copied!' : PLATFORM_LABELS[platform]}
            </span>
          </button>
        ))}
      </div>
    );
  },
);

DesktopShareSheet.displayName = 'DesktopShareSheet';
