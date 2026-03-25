'use client';
import { forwardRef, useRef, useCallback, useEffect, type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import { useControllableState } from '../../../hooks/useControllableState';
import styles from './Slider.module.scss';

export interface SliderMark {
  value: number;
  label?: string;
}

export interface SliderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  value?: number | [number, number];
  defaultValue?: number | [number, number];
  onChange?: (value: number | [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
  range?: boolean;
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
  marks?: SliderMark[];
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

function snapToStep(val: number, min: number, step: number): number {
  return Math.round((val - min) / step) * step + min;
}

function valueToPercent(val: number, min: number, max: number): number {
  if (max === min) return 0;
  return ((val - min) / (max - min)) * 100;
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onChange,
      min = 0,
      max = 100,
      step = 1,
      range = false,
      disabled = false,
      orientation = 'horizontal',
      marks,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      className,
      ...rest
    },
    ref
  ) => {
    const initialValue = range ? ([min, max] as [number, number]) : min;
    const [value, setValue] = useControllableState<number | [number, number]>({
      value: controlledValue,
      defaultValue: defaultValue ?? initialValue,
      onChange,
    });

    const trackRef = useRef<HTMLDivElement>(null);
    const draggingThumb = useRef<'start' | 'end' | null>(null);

    const isRange = range || Array.isArray(value);
    const startVal = isRange ? (value as [number, number])[0] : min;
    const endVal = isRange ? (value as [number, number])[1] : (value as number);

    const getValueFromPosition = useCallback(
      (clientX: number, clientY: number) => {
        const track = trackRef.current;
        if (!track) return min;
        const rect = track.getBoundingClientRect();
        let percent: number;
        if (orientation === 'vertical') {
          percent = 1 - (clientY - rect.top) / rect.height;
        } else {
          percent = (clientX - rect.left) / rect.width;
        }
        percent = clamp(percent, 0, 1);
        const raw = min + percent * (max - min);
        return clamp(snapToStep(raw, min, step), min, max);
      },
      [min, max, step, orientation]
    );

    const handlePointerDown = useCallback(
      (e: React.PointerEvent, thumb: 'start' | 'end') => {
        if (disabled) return;
        e.preventDefault();
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        draggingThumb.current = thumb;
      },
      [disabled]
    );

    const handlePointerMove = useCallback(
      (e: React.PointerEvent) => {
        if (!draggingThumb.current || disabled) return;
        const newVal = getValueFromPosition(e.clientX, e.clientY);
        if (isRange) {
          const [s, en] = value as [number, number];
          if (draggingThumb.current === 'start') {
            setValue([Math.min(newVal, en), en]);
          } else {
            setValue([s, Math.max(newVal, s)]);
          }
        } else {
          setValue(newVal);
        }
      },
      [disabled, getValueFromPosition, isRange, value, setValue]
    );

    const handlePointerUp = useCallback(() => {
      draggingThumb.current = null;
    }, []);

    const handleTrackClick = useCallback(
      (e: React.MouseEvent) => {
        if (disabled) return;
        const newVal = getValueFromPosition(e.clientX, e.clientY);
        if (isRange) {
          const [s, en] = value as [number, number];
          const distStart = Math.abs(newVal - s);
          const distEnd = Math.abs(newVal - en);
          if (distStart <= distEnd) {
            setValue([newVal, en]);
          } else {
            setValue([s, newVal]);
          }
        } else {
          setValue(newVal);
        }
      },
      [disabled, getValueFromPosition, isRange, value, setValue]
    );

    const handleKeyDown = useCallback(
      (thumb: 'start' | 'end') => (e: React.KeyboardEvent) => {
        if (disabled) return;
        let delta: number;
        switch (e.key) {
          case 'ArrowRight':
          case 'ArrowUp':
            delta = step;
            break;
          case 'ArrowLeft':
          case 'ArrowDown':
            delta = -step;
            break;
          case 'Home':
            delta = min - (thumb === 'start' ? startVal : endVal);
            break;
          case 'End':
            delta = max - (thumb === 'start' ? startVal : endVal);
            break;
          default:
            return;
        }
        e.preventDefault();
        if (isRange) {
          const [s, en] = value as [number, number];
          if (thumb === 'start') {
            const next = clamp(s + delta, min, en);
            setValue([next, en]);
          } else {
            const next = clamp(en + delta, s, max);
            setValue([s, next]);
          }
        } else {
          const cur = value as number;
          setValue(clamp(cur + delta, min, max));
        }
      },
      [disabled, orientation, step, min, max, startVal, endVal, isRange, value, setValue]
    );

    // Touch handling for mobile
    useEffect(() => {
      const track = trackRef.current;
      if (!track || disabled) return;

      const handleTouchMove = (e: TouchEvent) => {
        if (!draggingThumb.current) return;
        e.preventDefault();
      };

      track.addEventListener('touchmove', handleTouchMove, { passive: false });
      return () => {
        track.removeEventListener('touchmove', handleTouchMove);
      };
    }, [disabled]);

    const startPercent = valueToPercent(startVal, min, max);
    const endPercent = valueToPercent(endVal, min, max);

    const isVert = orientation === 'vertical';

    const fillStyle = isRange
      ? isVert
        ? { bottom: `${startPercent}%`, height: `${endPercent - startPercent}%` }
        : { left: `${startPercent}%`, width: `${endPercent - startPercent}%` }
      : isVert
      ? { bottom: '0%', height: `${endPercent}%` }
      : { left: '0%', width: `${endPercent}%` };

    const thumbStartStyle = isVert ? { bottom: `${startPercent}%` } : { left: `${startPercent}%` };
    const thumbEndStyle = isVert ? { bottom: `${endPercent}%` } : { left: `${endPercent}%` };

    return (
      <div
        ref={ref}
        className={cn(
          styles.root,
          isVert && styles.vertical,
          disabled && styles.disabled,
          className
        )}
        {...rest}
      >
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          ref={trackRef}
          className={styles.track}
          onClick={handleTrackClick}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <div className={styles.rail} />
          <div className={styles.fill} style={fillStyle} />

          {isRange && (
            <div
              className={styles.thumbWrapper}
              style={thumbStartStyle}
              role="slider"
              tabIndex={disabled ? -1 : 0}
              aria-valuenow={startVal}
              aria-valuemin={min}
              aria-valuemax={endVal}
              aria-orientation={orientation}
              aria-disabled={disabled}
              aria-label={ariaLabel ? `${ariaLabel} start` : undefined}
              aria-labelledby={ariaLabelledBy}
              onPointerDown={(e) => handlePointerDown(e, 'start')}
              onKeyDown={handleKeyDown('start')}
            >
              <div className={styles.thumb} />
            </div>
          )}

          <div
            className={styles.thumbWrapper}
            style={thumbEndStyle}
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-valuenow={endVal}
            aria-valuemin={isRange ? startVal : min}
            aria-valuemax={max}
            aria-orientation={orientation}
            aria-disabled={disabled}
            aria-label={ariaLabel ? (isRange ? `${ariaLabel} end` : ariaLabel) : undefined}
            aria-labelledby={ariaLabelledBy}
            onPointerDown={(e) => handlePointerDown(e, 'end')}
            onKeyDown={handleKeyDown('end')}
          >
            <div className={styles.thumb} />
          </div>

          {marks &&
            marks.map((mark) => {
              const pct = valueToPercent(mark.value, min, max);
              const markStyle = isVert ? { bottom: `${pct}%` } : { left: `${pct}%` };
              return (
                <div key={mark.value} className={styles.mark} style={markStyle}>
                  <div className={styles.markDot} />
                  {mark.label && <span className={styles.markLabel}>{mark.label}</span>}
                </div>
              );
            })}
        </div>
      </div>
    );
  }
);

Slider.displayName = 'Slider';
