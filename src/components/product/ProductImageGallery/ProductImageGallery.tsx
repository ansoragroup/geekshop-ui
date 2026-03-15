import { forwardRef, useState, useRef, useCallback, useEffect, type HTMLAttributes } from 'react';
import styles from './ProductImageGallery.module.scss';

export interface ProductImageGalleryProps extends HTMLAttributes<HTMLDivElement> {
  /** Array of image URLs */
  images: string[];
  /** Controlled current index */
  currentIndex?: number;
  /** Index change callback */
  onIndexChange?: (index: number) => void;
  /** Back button click */
  onBack?: () => void;
  /** Share button click */
  onShare?: () => void;
  /** Favorite button click */
  onFavorite?: () => void;
  /** Whether product is favorited */
  isFavorited?: boolean;
}

/* ---- Inline SVG icons ---- */

function BackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 8L11 4M11 4L7 8M11 4V14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 13V17C4 18.1046 4.89543 19 6 19H16C17.1046 19 18 18.1046 18 17V13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11 19S3 14.5 3 8.5C3 5.46243 5.46243 3 8.5 3C9.97258 3 11.3026 3.58626 12.2929 4.53553L11 5.82843L9.70711 4.53553C8.69742 3.58626 7.36742 3 5.895 3"
        fill="none"
      />
      <path
        d="M11 19C11 19 19 14.5 19 8.5C19 5.46243 16.5376 3 13.5 3C12.0274 3 10.6974 3.58626 9.70711 4.53553L11 5.82843L12.2929 4.53553C13.3026 3.58626 14.6326 3 16.105 3"
        fill="none"
      />
      <path
        d="M11 19S3 14.5 3 8.5C3 5.46243 5.46243 3 8.5 3C10.0321 3 11.4136 3.63214 12.4142 4.63604L11 6.05025L9.58579 4.63604C8.58189 3.63214 7.19643 3 5.66421 3"
        fill={filled ? '#FF3B30' : 'none'}
      />
      <path
        d="M11 19C11 19 3 14 3 8.5C3 5.46 5.46 3 8.5 3C9.96 3 11.29 3.59 12.29 4.54L11 6L9.71 4.54C10.7 3.59 12.03 3 13.5 3C16.54 3 19 5.46 19 8.5C19 14 11 19 11 19Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={filled ? '#FF3B30' : 'none'}
      />
    </svg>
  );
}

export const ProductImageGallery = forwardRef<HTMLDivElement, ProductImageGalleryProps>(
  (
    {
      images,
      currentIndex: controlledIndex,
      onIndexChange,
      onBack,
      onShare,
      onFavorite,
      isFavorited = false,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const [internalIndex, setInternalIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    const isScrollingRef = useRef(false);

    const currentIndex = controlledIndex ?? internalIndex;
    const totalImages = images.length;

    const goToIndex = useCallback(
      (index: number) => {
        const clamped = Math.max(0, Math.min(index, totalImages - 1));
        setInternalIndex(clamped);
        onIndexChange?.(clamped);

        if (scrollRef.current) {
          const containerWidth = scrollRef.current.clientWidth;
          isScrollingRef.current = true;
          scrollRef.current.scrollTo({
            left: clamped * containerWidth,
            behavior: 'smooth',
          });
          // Allow scroll handler to resume after animation
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 350);
        }
      },
      [totalImages, onIndexChange],
    );

    // Keep scroll position in sync with controlled index
    useEffect(() => {
      if (controlledIndex !== undefined && scrollRef.current) {
        const containerWidth = scrollRef.current.clientWidth;
        isScrollingRef.current = true;
        scrollRef.current.scrollTo({
          left: controlledIndex * containerWidth,
          behavior: 'smooth',
        });
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 350);
      }
    }, [controlledIndex]);

    const handleScroll = () => {
      if (isScrollingRef.current || !scrollRef.current) return;
      const { scrollLeft, clientWidth } = scrollRef.current;
      const newIndex = Math.round(scrollLeft / clientWidth);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < totalImages) {
        setInternalIndex(newIndex);
        onIndexChange?.(newIndex);
      }
    };

    return (
      <div ref={ref} className={`${styles.root} ${className}`} {...rest}>
        {/* Top overlay controls */}
        <div className={styles.topBar}>
          <button className={styles.iconButton} onClick={onBack} type="button" aria-label="Orqaga">
            <BackIcon />
          </button>
          <div className={styles.topBarRight}>
            <button className={styles.iconButton} onClick={onShare} type="button" aria-label="Ulashish">
              <ShareIcon />
            </button>
            <button
              className={`${styles.iconButton} ${isFavorited ? styles.favorited : ''}`}
              onClick={onFavorite}
              type="button"
              aria-label="Sevimli"
            >
              <HeartIcon filled={isFavorited} />
            </button>
          </div>
        </div>

        {/* Swipeable image area */}
        <div className={styles.scrollContainer} ref={scrollRef} onScroll={handleScroll}>
          {images.map((src, i) => (
            <div key={i} className={styles.slide}>
              <img src={src} alt={`Product image ${i + 1}`} className={styles.image} />
            </div>
          ))}
        </div>

        {/* Counter badge */}
        {totalImages > 1 && (
          <span className={styles.counter}>
            {currentIndex + 1}/{totalImages}
          </span>
        )}

        {/* Dots indicator */}
        {totalImages > 1 && (
          <div className={styles.dots}>
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.dot} ${i === currentIndex ? styles.dotActive : ''}`}
                onClick={() => goToIndex(i)}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  },
);

ProductImageGallery.displayName = 'ProductImageGallery';
