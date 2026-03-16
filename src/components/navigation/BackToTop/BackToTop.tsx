import { forwardRef, useState, useEffect, useCallback, type HTMLAttributes } from 'react';
import styles from './BackToTop.module.scss';

export interface BackToTopProps extends HTMLAttributes<HTMLButtonElement> {
  /** Scroll distance in pixels before the button appears (default: 300) */
  threshold?: number;
  /** Whether to use smooth scrolling (default: true) */
  smooth?: boolean;
}

/* ---------- Inline SVG Icon ---------- */

const ArrowUpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);

export const BackToTop = forwardRef<HTMLButtonElement, BackToTopProps>(
  ({ threshold = 300, smooth = true, className, onClick, ...rest }, ref) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setVisible(window.scrollY > threshold);
      };

      // Check initial position
      handleScroll();

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }, [threshold]);

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        window.scrollTo({
          top: 0,
          behavior: smooth ? 'smooth' : 'instant',
        });
        onClick?.(e);
      },
      [smooth, onClick],
    );

    const rootClass = [
      styles.backToTop,
      visible ? styles.visible : styles.hidden,
      className,
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        className={rootClass}
        onClick={handleClick}
        aria-label="Back to top"
        type="button"
        {...rest}
      >
        <ArrowUpIcon />
      </button>
    );
  },
);

BackToTop.displayName = 'BackToTop';
