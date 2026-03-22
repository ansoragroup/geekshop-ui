'use client';
import { useGeekShop } from '../../../i18n';
import { cn } from '../../../utils/cn';
import { forwardRef, useState, useCallback, useRef, type HTMLAttributes, type KeyboardEvent, type MouseEvent as ReactMouseEvent } from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import styles from './DesktopProductImageGallery.module.scss';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DesktopProductImageGalleryProps extends HTMLAttributes<HTMLDivElement> {
  /** Array of product image URLs */
  images: string[];
  /** Controlled selected index */
  currentIndex?: number;
  /** Callback when selected index changes */
  onIndexChange?: (index: number) => void;
  /** Zoom magnification level (default 2) */
  zoomScale?: number;
}

// ─── Component ───────────────────────────────────────────────────────────────

export const DesktopProductImageGallery = forwardRef<HTMLDivElement, DesktopProductImageGalleryProps>(
  (
    {
      images,
      currentIndex,
      onIndexChange,
      zoomScale = 2,
      className = '',
      ...rest
    },
    ref,
  ) => {
  const { t } = useGeekShop();
    const [activeIndex, setActiveIndex] = useControllableState({
      value: currentIndex,
      defaultValue: 0,
      onChange: onIndexChange,
    });

    const [isZooming, setIsZooming] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const mainImageRef = useRef<HTMLDivElement>(null);
    const thumbnailsRef = useRef<HTMLDivElement>(null);

    const safeImages = images.length > 0 ? images : [''];

    // ─── Thumbnail Navigation ──────────────────────────────────────────────

    const handleThumbnailClick = useCallback(
      (index: number) => {
        setActiveIndex(index);
      },
      [setActiveIndex],
    );

    const handleThumbnailKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setActiveIndex((prev: number) => (prev < safeImages.length - 1 ? prev + 1 : 0));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setActiveIndex((prev: number) => (prev > 0 ? prev - 1 : safeImages.length - 1));
        }
      },
      [setActiveIndex, safeImages.length],
    );

    // ─── Zoom Handling ─────────────────────────────────────────────────────

    const handleMouseMove = useCallback(
      (e: ReactMouseEvent<HTMLDivElement>) => {
        if (!mainImageRef.current) return;

        const rect = mainImageRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setZoomPosition({ x, y });
      },
      [],
    );

    const handleMouseEnter = useCallback(() => {
      setIsZooming(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
      setIsZooming(false);
    }, []);

    return (
      <div
        ref={ref}
        className={cn(styles.root, className)}
        {...rest}
      >
        {/* Thumbnail strip */}
        <div
          className={styles.thumbnails}
          ref={thumbnailsRef}
          role="tablist"
          aria-label={t('aria.productThumbnails')}
          onKeyDown={handleThumbnailKeyDown}
        >
          {safeImages.map((src, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`View image ${index + 1} of ${safeImages.length}`}
              className={cn(styles.thumbnail, index === activeIndex ? styles.thumbnailActive : '')}
              onClick={() => handleThumbnailClick(index)}
              tabIndex={index === activeIndex ? 0 : -1}
            >
              <img
                src={src}
                alt={`Product thumbnail ${index + 1}`}
                className={styles.thumbnailImage}
                loading="lazy"
              />
            </button>
          ))}
        </div>

        {/* Main image */}
        <div
          className={styles.mainImageContainer}
          ref={mainImageRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={safeImages[activeIndex]}
            alt={`Product image ${activeIndex + 1} of ${safeImages.length}`}
            className={styles.mainImage}
            draggable={false}
          />

          {/* Zoom lens indicator */}
          {isZooming && (
            <div
              className={styles.zoomLens}
              style={{
                left: `${zoomPosition.x}%`,
                top: `${zoomPosition.y}%`,
              }}
              aria-hidden="true"
            />
          )}
        </div>

        {/* Zoom preview */}
        {isZooming && (
          <div className={styles.zoomPreview} aria-hidden="true">
            <img
              src={safeImages[activeIndex]}
              alt=""
              className={styles.zoomImage}
              style={{
                transform: `scale(${zoomScale})`,
                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
              }}
            />
          </div>
        )}
      </div>
    );
  },
);

DesktopProductImageGallery.displayName = 'DesktopProductImageGallery';
