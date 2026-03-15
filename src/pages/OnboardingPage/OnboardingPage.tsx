import { useState, useRef, useCallback } from 'react';
import { Button, useGeekShop } from '../../components';
import styles from './OnboardingPage.module.scss';

/* ---------- Slide data ---------- */

interface SlideData {
  titleKey: string;
  descKey: string;
  emoji: string;
  bgColor: string;
}

const slides: SlideData[] = [
  {
    titleKey: 'onboarding.slide1Title',
    descKey: 'onboarding.slide1Desc',
    emoji: '\uD83D\uDCE6',
    bgColor: '#FFF5F0',
  },
  {
    titleKey: 'onboarding.slide2Title',
    descKey: 'onboarding.slide2Desc',
    emoji: '\uD83D\uDCB0',
    bgColor: '#F0F8FF',
  },
  {
    titleKey: 'onboarding.slide3Title',
    descKey: 'onboarding.slide3Desc',
    emoji: '\uD83D\uDEE1\uFE0F',
    bgColor: '#F0FFF4',
  },
];

/* ---------- Props ---------- */

export interface OnboardingPageProps {
  /** Initial slide index (0-based) */
  initialSlide?: number;
  /** Called when user taps Skip */
  onSkip?: () => void;
  /** Called when user taps "Get Started" on the last slide */
  onComplete?: () => void;
}

/* ---------- Constants ---------- */

const SWIPE_THRESHOLD = 50;

/* ---------- Component ---------- */

export const OnboardingPage: React.FC<OnboardingPageProps> = ({
  initialSlide = 0,
  onSkip,
  onComplete,
}) => {
  const { t } = useGeekShop();
  const [currentSlide, setCurrentSlide] = useState(
    Math.min(Math.max(initialSlide, 0), slides.length - 1),
  );
  const touchStartX = useRef<number | null>(null);

  const isLastSlide = currentSlide === slides.length - 1;

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(Math.min(Math.max(index, 0), slides.length - 1));
  }, []);

  const handleNext = useCallback(() => {
    if (isLastSlide) {
      onComplete?.();
    } else {
      goToSlide(currentSlide + 1);
    }
  }, [isLastSlide, currentSlide, goToSlide, onComplete]);

  const handleSkip = useCallback(() => {
    onSkip?.();
  }, [onSkip]);

  /* -- Swipe gesture handlers -- */

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      const deltaX = e.changedTouches[0].clientX - touchStartX.current;
      touchStartX.current = null;

      if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;

      if (deltaX < 0 && currentSlide < slides.length - 1) {
        // Swipe left → next
        goToSlide(currentSlide + 1);
      } else if (deltaX > 0 && currentSlide > 0) {
        // Swipe right → prev
        goToSlide(currentSlide - 1);
      }
    },
    [currentSlide, goToSlide],
  );

  return (
    <div className={styles.page}>
      {/* Slides */}
      <div
        className={styles.slidesViewport}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={styles.slidesTrack}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div className={styles.slide} key={index}>
              <div
                className={styles.illustration}
                style={{ backgroundColor: slide.bgColor }}
                aria-hidden="true"
              >
                {slide.emoji}
              </div>
              <h2 className={styles.slideTitle}>{t(slide.titleKey)}</h2>
              <p className={styles.slideDesc}>{t(slide.descKey)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom controls */}
      <div className={styles.bottomSection}>
        {/* Dot pagination */}
        <div className={styles.dots} role="tablist" aria-label="Slide navigation">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ''}`}
              onClick={() => goToSlide(index)}
              role="tab"
              aria-selected={index === currentSlide}
              aria-label={`Slide ${index + 1}`}
              type="button"
            />
          ))}
        </div>

        {/* Next / Get Started button */}
        <div className={styles.ctaButton}>
          <Button variant="primary" size="lg" block onClick={handleNext}>
            {isLastSlide ? t('onboarding.getStarted') : t('onboarding.next')}
          </Button>
        </div>

        {/* Skip button */}
        <button
          className={styles.skipButton}
          onClick={handleSkip}
          type="button"
        >
          {t('onboarding.skip')}
        </button>
      </div>
    </div>
  );
};
