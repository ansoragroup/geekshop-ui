import { forwardRef, useRef, useState, useCallback } from 'react';
import type { ReactNode, TouchEvent } from 'react';
import styles from './Swipe.module.scss';

export interface SwipeAction {
  key: string;
  label: string;
  color?: string;
  backgroundColor?: string;
  onClick: () => void;
}

export interface SwipeProps {
  /** Content to display inside the swipe container */
  children: ReactNode;
  /** Actions revealed when swiping right (content moves right) */
  leftActions?: SwipeAction[];
  /** Actions revealed when swiping left (content moves left) */
  rightActions?: SwipeAction[];
  /** Distance in px to trigger snap-open (default 80) */
  threshold?: number;
  /** Disable swipe interaction */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
}

export const Swipe = forwardRef<HTMLDivElement, SwipeProps>(
  (
    {
      children,
      leftActions = [],
      rightActions = [],
      threshold = 80,
      disabled = false,
      className,
    },
    ref,
  ) => {
    const [translateX, setTranslateX] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const startXRef = useRef(0);
    const startYRef = useRef(0);
    const currentOffsetRef = useRef(0);
    const isDraggingRef = useRef(false);
    const directionLockedRef = useRef<'horizontal' | 'vertical' | null>(null);

    const leftWidth = leftActions.length * 72;
    const rightWidth = rightActions.length * 72;

    const handleTouchStart = useCallback(
      (e: TouchEvent) => {
        if (disabled) return;
        startXRef.current = e.touches[0].clientX;
        startYRef.current = e.touches[0].clientY;
        isDraggingRef.current = true;
        directionLockedRef.current = null;
        setIsTransitioning(false);
      },
      [disabled],
    );

    const handleTouchMove = useCallback(
      (e: TouchEvent) => {
        if (!isDraggingRef.current || disabled) return;

        const diffX = e.touches[0].clientX - startXRef.current;
        const diffY = e.touches[0].clientY - startYRef.current;

        // Lock direction on first significant movement
        if (directionLockedRef.current === null) {
          if (Math.abs(diffX) > 5 || Math.abs(diffY) > 5) {
            directionLockedRef.current =
              Math.abs(diffX) > Math.abs(diffY) ? 'horizontal' : 'vertical';
          }
          return;
        }

        if (directionLockedRef.current === 'vertical') return;

        const raw = diffX + currentOffsetRef.current;

        // Clamp: allow left swipe up to rightWidth, right swipe up to leftWidth
        const maxRight = leftActions.length > 0 ? leftWidth : 0;
        const maxLeft = rightActions.length > 0 ? -rightWidth : 0;
        const bounded = Math.max(maxLeft, Math.min(maxRight, raw));

        setTranslateX(bounded);
      },
      [disabled, leftActions.length, rightActions.length, leftWidth, rightWidth],
    );

    const handleTouchEnd = useCallback(() => {
      if (!isDraggingRef.current || disabled) return;
      isDraggingRef.current = false;
      setIsTransitioning(true);

      let snapped: number;

      if (translateX < 0) {
        // Swiped left -> reveal right actions
        snapped = translateX < -threshold ? -rightWidth : 0;
      } else if (translateX > 0) {
        // Swiped right -> reveal left actions
        snapped = translateX > threshold ? leftWidth : 0;
      } else {
        snapped = 0;
      }

      setTranslateX(snapped);
      currentOffsetRef.current = snapped;
    }, [disabled, translateX, threshold, leftWidth, rightWidth]);

    const handleActionClick = useCallback(
      (action: SwipeAction) => {
        setIsTransitioning(true);
        setTranslateX(0);
        currentOffsetRef.current = 0;
        action.onClick();
      },
      [],
    );

    const wrapperClasses = [styles.wrapper, className].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        className={wrapperClasses}
        role="group"
        aria-roledescription="swipeable"
      >
        {/* Left actions (revealed when swiping right) */}
        {leftActions.length > 0 && (
          <div
            className={styles.actionsLeft}
            style={{ width: leftWidth }}
            aria-hidden={translateX <= 0}
          >
            {leftActions.map((action) => (
              <button
                key={action.key}
                type="button"
                className={styles.actionBtn}
                style={{
                  color: action.color || '#fff',
                  backgroundColor: action.backgroundColor || '#1890FF',
                }}
                onClick={() => handleActionClick(action)}
                tabIndex={translateX > 0 ? 0 : -1}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}

        {/* Right actions (revealed when swiping left) */}
        {rightActions.length > 0 && (
          <div
            className={styles.actionsRight}
            style={{ width: rightWidth }}
            aria-hidden={translateX >= 0}
          >
            {rightActions.map((action) => (
              <button
                key={action.key}
                type="button"
                className={styles.actionBtn}
                style={{
                  color: action.color || '#fff',
                  backgroundColor: action.backgroundColor || '#FF3B30',
                }}
                onClick={() => handleActionClick(action)}
                tabIndex={translateX < 0 ? 0 : -1}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}

        {/* Main content */}
        <div
          className={`${styles.content} ${isTransitioning ? styles.transitioning : ''}`}
          style={{ transform: `translateX(${translateX}px)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {children}
        </div>
      </div>
    );
  },
);

Swipe.displayName = 'Swipe';
