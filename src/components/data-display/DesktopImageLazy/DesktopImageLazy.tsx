import { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import type { ImgHTMLAttributes } from 'react';
import styles from './DesktopImageLazy.module.scss';

export interface DesktopImageLazyProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'placeholder'> {
  /** Image source URL */
  src: string;
  /** Alt text for the image */
  alt: string;
  /** Low-res placeholder URL or solid color (e.g. "#f0f0f0") */
  placeholder?: string;
  /** CSS aspect-ratio value, e.g. "1/1", "4/3", "16/9" */
  aspectRatio?: string;
  /** How the image fills its container */
  objectFit?: 'cover' | 'contain' | 'fill';
  /** Fallback image URL shown on load error */
  fallback?: string;
  /** Border radius in px */
  radius?: number;
  /** Additional CSS class */
  className?: string;
}

export const DesktopImageLazy = forwardRef<HTMLImageElement, DesktopImageLazyProps>(
  (
    {
      src,
      alt,
      placeholder,
      aspectRatio,
      objectFit = 'cover',
      fallback,
      radius,
      className = '',
      style,
      ...rest
    },
    ref,
  ) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [inView, setInView] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [trackedSrc, setTrackedSrc] = useState(src);

    if (trackedSrc !== src) {
      setTrackedSrc(src);
      setLoaded(false);
      setError(false);
    }

    useEffect(() => {
      const node = containerRef.current;
      if (!node) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(node);
          }
        },
        { rootMargin: '300px' },
      );

      observer.observe(node);
      return () => observer.disconnect();
    }, []);

    const handleLoad = useCallback(() => setLoaded(true), []);

    const handleError = useCallback(() => {
      setError(true);
    }, []);

    const activeSrc = error && fallback ? fallback : src;

    const isPlaceholderColor =
      placeholder && (placeholder.startsWith('#') || placeholder.startsWith('rgb'));

    const containerStyle: React.CSSProperties = {
      ...(aspectRatio ? { aspectRatio } : {}),
      ...(radius != null ? { borderRadius: `${radius}px` } : {}),
      ...style,
    };

    return (
      <div
        ref={containerRef}
        className={`${styles.container} ${className}`}
        style={containerStyle}
      >
        {placeholder && (
          isPlaceholderColor ? (
            <div
              className={`${styles.placeholder} ${loaded ? styles.placeholderHidden : ''}`}
              style={{ backgroundColor: placeholder }}
            />
          ) : (
            <img
              className={`${styles.placeholder} ${loaded ? styles.placeholderHidden : ''}`}
              src={placeholder}
              alt=""
              aria-hidden="true"
            />
          )
        )}

        {!placeholder && !loaded && !error && (
          <div className={styles.shimmer}>
            <div className={styles.shimmerWave} />
          </div>
        )}

        {error && !fallback && (
          <div className={styles.errorState}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span className={styles.errorText}>Failed to load image</span>
          </div>
        )}

        {inView && !(error && !fallback) && (
          <img
            ref={ref}
            className={`${styles.image} ${loaded ? styles.imageLoaded : ''}`}
            src={activeSrc}
            alt={alt}
            style={{ objectFit }}
            onLoad={handleLoad}
            onError={handleError}
            {...rest}
          />
        )}
      </div>
    );
  },
);

DesktopImageLazy.displayName = 'DesktopImageLazy';
