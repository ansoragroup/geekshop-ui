import { forwardRef, useState, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import styles from './NoticeBar.module.scss';

export interface NoticeBarProps {
  /** Notice text content */
  content: string;
  /** Display mode */
  mode?: 'scroll' | 'static' | 'closeable';
  /** Icon element displayed before the text */
  icon?: ReactNode;
  /** Scroll speed in pixels per second (default 50) */
  speed?: number;
  /** Delay before scroll starts in ms (default 1000) */
  delay?: number;
  /** Text color override */
  color?: string;
  /** Background color override */
  backgroundColor?: string;
  /** Called when close button is clicked (closeable mode) */
  onClose?: () => void;
  /** Additional CSS class */
  className?: string;
}

const DefaultIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M2.5 2L5.5 8L2.5 14H4L13.5 8L4 2H2.5Z" />
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <path
      d="M4 4L10 10M10 4L4 10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export const NoticeBar = forwardRef<HTMLDivElement, NoticeBarProps>(
  (
    {
      content,
      mode = 'scroll',
      icon,
      speed = 50,
      delay = 1000,
      color,
      backgroundColor,
      onClose,
      className,
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(true);
    const textRef = useRef<HTMLSpanElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [animationDuration, setAnimationDuration] = useState<number | null>(null);

    useEffect(() => {
      if (mode !== 'scroll') return;

      // Calculate duration based on text width and speed
      const calculateDuration = () => {
        if (textRef.current) {
          const textWidth = textRef.current.scrollWidth;
          const duration = textWidth / speed;
          setAnimationDuration(duration);
        }
      };

      // Wait for text to render
      const timer = setTimeout(calculateDuration, 50);
      return () => clearTimeout(timer);
    }, [content, speed, mode]);

    const handleClose = () => {
      setVisible(false);
      onClose?.();
    };

    if (!visible) return null;

    const isScroll = mode === 'scroll';
    const isCloseable = mode === 'closeable';

    const customStyle = {
      '--notice-color': color,
      '--notice-bg': backgroundColor,
      ...(isScroll && animationDuration
        ? {
            '--notice-duration': `${animationDuration}s`,
            '--notice-delay': `${delay}ms`,
          }
        : {}),
    } as React.CSSProperties;

    const wrapperClasses = [
      styles.noticeBar,
      isScroll ? styles.scroll : styles.static,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={wrapperClasses}
        style={customStyle}
        role={isScroll ? 'marquee' : 'alert'}
        aria-live={isScroll ? undefined : 'polite'}
      >
        <span className={styles.icon}>{icon || <DefaultIcon />}</span>

        <div className={styles.textWrapper} ref={wrapperRef}>
          {isScroll ? (
            <span
              ref={textRef}
              className={styles.scrollText}
              aria-label={content}
            >
              {content}
            </span>
          ) : (
            <span className={styles.staticText}>{content}</span>
          )}
        </div>

        {isCloseable && (
          <button
            type="button"
            className={styles.closeBtn}
            onClick={handleClose}
            aria-label="Yopish"
          >
            <CloseIcon />
          </button>
        )}
      </div>
    );
  },
);

NoticeBar.displayName = 'NoticeBar';
