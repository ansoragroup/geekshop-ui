import { forwardRef, useState, useRef, useEffect } from 'react';
import type { ImgHTMLAttributes } from 'react';
import styles from './ImageLazy.module.scss';

export interface ImageLazyProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'placeholder'> {
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

export const ImageLazy = forwardRef<HTMLImageElement, ImageLazyProps>(
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
    const [activeSrc, setActiveSrc] = useState(src);
    const containerRef = useRef<HTMLDivElement>(null);

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
        { rootMargin: '200px' },
      );

      observer.observe(node);
      return () => observer.disconnect();
    }, []);

    // When src prop changes, reset to new source
    useEffect(() => {
      setActiveSrc(src);
      setLoaded(false);
      setError(false);
      // eslint-disable-next-line react-hooks/set-state-in-effect
    }, [src]);

    const handleLoad = () => setLoaded(true);

    const handleError = () => {
      setError(true);
      if (fallback) {
        setActiveSrc(fallback);
      }
    };

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

        {error && !fallback && (
          <div className={styles.errorState}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
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

ImageLazy.displayName = 'ImageLazy';
