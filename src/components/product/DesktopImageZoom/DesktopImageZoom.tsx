'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, useState, useRef, useCallback, useEffect } from 'react';
import styles from './DesktopImageZoom.module.scss';

export interface DesktopImageZoomProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of image URLs */
  images: string[];
  /** Currently selected image index */
  selectedIndex?: number;
  /** Callback when thumbnail is selected */
  onSelect?: (index: number) => void;
  /** Zoom magnification level */
  zoomLevel?: number;
  /** Alt text prefix for images */
  altPrefix?: string;
}

function DesktopImageZoomInner(
  {
    images,
    selectedIndex: controlledIndex,
    onSelect,
    zoomLevel = 2.5,
    altPrefix = 'Product image',
    className,
    ...rest
  }: DesktopImageZoomProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const [internalIndex, setInternalIndex] = useState(0);
  const selectedIndex = controlledIndex ?? internalIndex;

  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback(
    (index: number) => {
      setInternalIndex(index);
      onSelect?.(index);
    },
    [onSelect],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomPos({ x, y });
    },
    [],
  );

  const handleMouseEnter = useCallback(() => setIsZooming(true), []);
  const handleMouseLeave = useCallback(() => setIsZooming(false), []);

  const handleMainClick = useCallback(() => setLightboxOpen(true), []);
  const handleCloseLightbox = useCallback(() => setLightboxOpen(false), []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setLightboxOpen(true);
      }
    },
    [],
  );

  // Close lightbox on Escape
  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxOpen]);

  // Navigate thumbnails with arrow keys
  const handleThumbnailKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const next = Math.min(index + 1, images.length - 1);
        handleSelect(next);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = Math.max(index - 1, 0);
        handleSelect(prev);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleSelect(index);
      }
    },
    [images.length, handleSelect],
  );

  const currentImage = images[selectedIndex] ?? images[0];

  return (
    <>
      <div ref={ref} className={cn(styles.root, className)} {...rest}>
        {/* Main image area */}
        <div
          ref={mainRef}
          className={cn(styles.mainImage, isZooming ? styles.zooming : '')}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleMainClick}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          aria-label={`${altPrefix} ${selectedIndex + 1} of ${images.length}. Click to open fullscreen.`}
        >
          <img
            src={currentImage}
            alt={`${altPrefix} ${selectedIndex + 1}`}
            className={styles.image}
            draggable={false}
          />
        </div>

        {/* Zoom panel — shown to the right on hover */}
        {isZooming && (
          <div className={styles.zoomPanel} aria-hidden="true">
            <div
              className={styles.zoomContent}
              style={{
                backgroundImage: `url(${currentImage})`,
                backgroundSize: `${zoomLevel * 100}%`,
                backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
              }}
            />
          </div>
        )}

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className={styles.thumbnails} role="listbox" aria-label="Product image thumbnails">
            {images.map((img, i) => (
              <button
                key={i}
                type="button"
                className={cn(styles.thumbnail, i === selectedIndex ? styles.thumbnailActive : '')}
                onClick={() => handleSelect(i)}
                onKeyDown={(e) => handleThumbnailKeyDown(e, i)}
                onMouseEnter={() => handleSelect(i)}
                role="option"
                aria-selected={i === selectedIndex}
                aria-label={`${altPrefix} ${i + 1}`}
                tabIndex={i === selectedIndex ? 0 : -1}
              >
                <img src={img} alt="" className={styles.thumbnailImg} loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox overlay */}
      {lightboxOpen && (
        <div
          className={styles.lightbox}
          onClick={handleCloseLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen product image"
        >
          <button
            type="button"
            className={styles.lightboxClose}
            onClick={handleCloseLightbox}
            aria-label="Close fullscreen"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <img
            src={currentImage}
            alt={`${altPrefix} ${selectedIndex + 1} fullscreen`}
            className={styles.lightboxImage}
            onClick={(e) => e.stopPropagation()}
          />
          {/* Lightbox thumbnails */}
          {images.length > 1 && (
            <div className={styles.lightboxThumbnails} onClick={(e) => e.stopPropagation()}>
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  className={cn(styles.lightboxThumb, i === selectedIndex ? styles.lightboxThumbActive : '')}
                  onClick={() => handleSelect(i)}
                  aria-label={`${altPrefix} ${i + 1}`}
                >
                  <img src={img} alt="" className={styles.lightboxThumbImg} />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export const DesktopImageZoom = forwardRef(DesktopImageZoomInner);
DesktopImageZoom.displayName = 'DesktopImageZoom';
