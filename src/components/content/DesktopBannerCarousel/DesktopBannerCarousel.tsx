import { cn } from '../../../utils/cn';
'use client';
import {
  forwardRef,
  useState,
  useEffect,
  useCallback,
  useRef,
  type HTMLAttributes,
  type ReactNode,
  type CSSProperties,
} from 'react';
import styles from './DesktopBannerCarousel.module.scss';

export interface BannerSlide {
  /** Main title text */
  title: string;
  /** Subtitle text below title */
  subtitle?: string;
  /** CTA button text */
  ctaText?: string;
  /** CTA link */
  ctaHref?: string;
  /** CSS gradient for background */
  bgGradient?: string;
  /** Background image URL */
  bgImage?: string;
  /** Text color override (default: white) */
  textColor?: string;
}

export interface DesktopBannerCarouselProps extends HTMLAttributes<HTMLDivElement> {
  /** Array of banner slides */
  slides: BannerSlidecn(];
  /** Auto-rotation interval in ms (default: 5000) */
  interval?: number;
  /** First side panel slot (e.g. login card) */
  sidePanel?: ReactNode;
  /** Second side panel slot (e.g. new arrivals) */
  sidePanel2?: ReactNode;
  /** Carousel height in px (default: 400) */
  height?: number;
}

const ChevronLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 6 15 12 9 18" />
  </svg>
);

export const DesktopBannerCarousel = forwardRef<HTMLDivElement, DesktopBannerCarouselProps>(
  (
    {
      slides,
      interval = 5000,
      sidePanel,
      sidePanel2,
      height = 400,
      className,
      ...rest
    },
    ref,
  ) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const reducedMotion = useRef(false);

    useEffect(() => {
      if (typeof window !== 'undefined') {
        reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      }
    }, []);

    const slideCount = slides.length;

    const goTo = useCallback(
      (index: number) => {
        setActiveIndex(((index % slideCount) + slideCount) % slideCount);
      },
      [slideCount],
    );

    const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
    const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

    // Auto-rotation
    useEffect(() => {
      if (isPaused || reducedMotion.current || slideCount <= 1) return;

      timerRef.current = setInterval(goNext, interval);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }, [isPaused, interval, goNext, slideCount]);

    const handleMouseEnter = () => {
      setIsPaused(true);
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsPaused(false);
      setIsHovered(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
    };

    const currentSlide = slides[activeIndex];
    if (!currentSlide) return null;

    const hasSidePanels = sidePanel || sidePanel2;
    const rootClass = [styles.root, className);

    return (
      <div ref={ref} className={rootClass} {...rest}>
        <div className={styles.layout} style={{ '--carousel-height': `${height}px` } as CSSProperties}>
          {/* Main Carousel */}
          <div
            className={styles.carousel}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onKeyDown={handleKeyDown}
            role="region"
            aria-label="Banner carousel"
            aria-roledescription="carousel"
            tabIndex={0}
          >
            {/* Slides */}
            <div className={styles.slidesContainer}>
              {slides.map((slide, index) => {
                const isActive = index === activeIndex;
                return (
                  <div
                    key={index}
                    className={cn(styles.slide, isActive ? styles.slideActive : styles.slideInactive)}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`Slide ${index + 1} of ${slideCount}`}
                    aria-hidden={!isActive}
                    style={{
                      '--slide-bg': slide.bgGradient || 'linear-gradient(135deg, #FF5000 0%, #FF7A33 100%)',
                      '--slide-text-color': slide.textColor || '#FFFFFF',
                    } as CSSProperties}
                  >
                    {slide.bgImage && (
                      <img
                        className={styles.bgImage}
                        src={slide.bgImage}
                        alt=""
                        aria-hidden="true"
                      />
                    )}
                    <div className={styles.slideContent}>
                      <h2 className={styles.slideTitle}>{slide.title}</h2>
                      {slide.subtitle && (
                        <p className={styles.slideSubtitle}>{slide.subtitle}</p>
                      )}
                      {slide.ctaText && (
                        <a
                          className={styles.ctaButton}
                          href={slide.ctaHref || '#'}
                          tabIndex={isActive ? 0 : -1}
                        >
                          {slide.ctaText}
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Arrows (visible on hover) */}
            {slideCount > 1 && (
              <>
                <button
                  className={cn(styles.arrow, styles.arrowLeft, isHovered ? styles.arrowVisible : '')}
                  onClick={goPrev}
                  aria-label="Previous slide"
                  type="button"
                  tabIndex={-1}
                >
                  <ChevronLeft />
                </button>
                <button
                  className={cn(styles.arrow, styles.arrowRight, isHovered ? styles.arrowVisible : '')}
                  onClick={goNext}
                  aria-label="Next slide"
                  type="button"
                  tabIndex={-1}
                >
                  <ChevronRight />
                </button>
              </>
            )}

            {/* Dot Indicators */}
            {slideCount > 1 && (
              <div className={styles.dots} role="tablist" aria-label="Slide navigation">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    className={cn(styles.dot, index === activeIndex ? styles.dotActive : '')}
                    onClick={() => goTo(index)}
                    role="tab"
                    aria-selected={index === activeIndex}
                    aria-label={`Go to slide ${index + 1}`}
                    type="button"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Side Panels */}
          {hasSidePanels && (
            <div className={styles.sidePanels}>
              {sidePanel && (
                <div className={styles.sidePanel}>{sidePanel}</div>
              )}
              {sidePanel2 && (
                <div className={styles.sidePanel}>{sidePanel2}</div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  },
);

DesktopBannerCarousel.displayName = 'DesktopBannerCarousel';
