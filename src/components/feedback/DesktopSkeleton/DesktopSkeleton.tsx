import { forwardRef, type CSSProperties, type HTMLAttributes } from 'react';
import styles from './DesktopSkeleton.module.scss';

export type DesktopSkeletonVariant = 'text' | 'circle' | 'rect' | 'card';

export interface DesktopSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Skeleton shape variant */
  variant?: DesktopSkeletonVariant;
  /** Width (CSS value) */
  width?: string | number;
  /** Height (CSS value) */
  height?: string | number;
  /** Number of text lines (only for variant="text") */
  lines?: number;
  /** Whether to animate the shimmer effect */
  animate?: boolean;
}

export const DesktopSkeleton = forwardRef<HTMLDivElement, DesktopSkeletonProps>(
  (
    {
      variant = 'text',
      width,
      height,
      lines = 1,
      animate = true,
      className = '',
      style,
      ...rest
    },
    ref,
  ) => {
    const getStyle = (): CSSProperties => {
      const s: CSSProperties = { ...style };
      if (width) s.width = typeof width === 'number' ? `${width}px` : width;
      if (height) s.height = typeof height === 'number' ? `${height}px` : height;
      return s;
    };

    const animClass = animate ? styles.shimmer : '';

    // Multi-line text
    if (variant === 'text' && lines > 1) {
      return (
        <div ref={ref} className={`${styles.textGroup} ${className}`} role="status" aria-label="Loading" {...rest}>
          {Array.from({ length: lines }, (_, i) => (
            <div
              key={i}
              className={`${styles.skeleton} ${styles.text} ${animClass}`}
              style={i === lines - 1 ? { width: '60%' } : undefined}
            />
          ))}
        </div>
      );
    }

    // Card variant — composite skeleton
    if (variant === 'card') {
      return (
        <div
          ref={ref}
          className={`${styles.card} ${className}`}
          style={getStyle()}
          role="status"
          aria-label="Loading"
          {...rest}
        >
          <div className={`${styles.skeleton} ${styles.cardImage} ${animClass}`} />
          <div className={styles.cardBody}>
            <div className={`${styles.skeleton} ${styles.text} ${animClass}`} style={{ width: '40%' }} />
            <div className={`${styles.skeleton} ${styles.text} ${animClass}`} />
            <div className={`${styles.skeleton} ${styles.text} ${animClass}`} style={{ width: '70%' }} />
            <div className={`${styles.skeleton} ${styles.text} ${styles.textLg} ${animClass}`} style={{ width: '30%' }} />
          </div>
        </div>
      );
    }

    // Circle
    if (variant === 'circle') {
      const size = width || height || 48;
      return (
        <div
          ref={ref}
          className={`${styles.skeleton} ${styles.circle} ${animClass} ${className}`}
          style={{ width: typeof size === 'number' ? `${size}px` : size, height: typeof size === 'number' ? `${size}px` : size, ...style }}
          role="status"
          aria-label="Loading"
          {...rest}
        />
      );
    }

    // Rect / single text line
    return (
      <div
        ref={ref}
        className={`${styles.skeleton} ${styles[variant]} ${animClass} ${className}`}
        style={getStyle()}
        role="status"
        aria-label="Loading"
        {...rest}
      />
    );
  },
);

DesktopSkeleton.displayName = 'DesktopSkeleton';
