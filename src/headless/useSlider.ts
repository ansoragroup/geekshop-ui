import { useCallback, useId, useRef, useState } from 'react';
import { useControllableState } from '../hooks/useControllableState';

export interface UseSliderOptions {
  /** Controlled value (number for single, [number, number] for range) */
  value?: number | [number, number];
  /** Default value (uncontrolled) */
  defaultValue?: number | [number, number];
  /** Callback when value changes */
  onChange?: (value: number | [number, number]) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Custom value text formatter */
  getValueText?: (value: number) => string;
  /** Whether this is a range slider (inferred from defaultValue/value if array) */
  range?: boolean;
}

export interface UseSliderReturn {
  trackProps: {
    role: 'presentation';
    ref: (el: HTMLElement | null) => void;
    onPointerDown: (e: React.PointerEvent) => void;
  };
  thumbProps: {
    role: 'slider';
    tabIndex: 0 | -1;
    'aria-valuemin': number;
    'aria-valuemax': number;
    'aria-valuenow': number;
    'aria-valuetext': string;
    'aria-orientation': 'horizontal' | 'vertical';
    'aria-disabled'?: boolean;
    id: string;
    ref: (el: HTMLElement | null) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    onFocus: () => void;
    onBlur: () => void;
    onPointerDown: (e: React.PointerEvent) => void;
  };
  thumbsProps: [UseSliderReturn['thumbProps'], UseSliderReturn['thumbProps']];
  value: number | [number, number];
  setValue: (v: number | [number, number]) => void;
  isFocused: boolean;
  getPercentage: (v: number) => number;
}

function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

function roundToStep(val: number, step: number, min: number): number {
  const steps = Math.round((val - min) / step);
  return min + steps * step;
}

export function useSlider(options: UseSliderOptions = {}): UseSliderReturn {
  const {
    value: controlledValue,
    defaultValue,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    orientation = 'horizontal',
    disabled = false,
    getValueText,
    range: rangeProp,
  } = options;

  const isRange = rangeProp ?? (Array.isArray(controlledValue) || Array.isArray(defaultValue));

  const resolvedDefault = defaultValue ?? (isRange ? [min, max] : min);

  const [value, setValue] = useControllableState<number | [number, number]>({
    value: controlledValue,
    defaultValue: resolvedDefault,
    onChange,
  });

  const [isFocused, setIsFocused] = useState(false);
  const [activeThumbIndex, setActiveThumbIndex] = useState<number>(0);
  const trackRef = useRef<HTMLElement | null>(null);
  const thumbRefs = useRef<Map<number, HTMLElement>>(new Map());

  const baseId = useId();

  const getSingleValue = useCallback((): number => {
    return Array.isArray(value) ? value[0] : value;
  }, [value]);

  const getRangeValues = useCallback((): [number, number] => {
    return Array.isArray(value) ? value : [value, max];
  }, [value, max]);

  const getPercentage = useCallback(
    (v: number): number => {
      if (max === min) return 0;
      return ((v - min) / (max - min)) * 100;
    },
    [min, max]
  );

  const getValueFromPosition = useCallback(
    (clientX: number, clientY: number): number => {
      if (!trackRef.current) return min;
      const rect = trackRef.current.getBoundingClientRect();
      let ratio: number;
      if (orientation === 'horizontal') {
        ratio = (clientX - rect.left) / rect.width;
      } else {
        ratio = 1 - (clientY - rect.top) / rect.height;
      }
      ratio = clamp(ratio, 0, 1);
      const rawValue = min + ratio * (max - min);
      return clamp(roundToStep(rawValue, step, min), min, max);
    },
    [min, max, step, orientation]
  );

  const updateValue = useCallback(
    (newVal: number, thumbIndex: number) => {
      if (disabled) return;
      if (isRange) {
        const vals = getRangeValues();
        const next: [number, number] = [...vals];
        next[thumbIndex] = newVal;
        // Ensure min <= max
        if (thumbIndex === 0 && next[0] > next[1]) next[0] = next[1];
        if (thumbIndex === 1 && next[1] < next[0]) next[1] = next[0];
        setValue(next);
      } else {
        setValue(newVal);
      }
    },
    [disabled, isRange, getRangeValues, setValue]
  );

  const handleTrackPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return;
      const newVal = getValueFromPosition(e.clientX, e.clientY);

      if (isRange) {
        const vals = getRangeValues();
        // Find closest thumb
        const dist0 = Math.abs(vals[0] - newVal);
        const dist1 = Math.abs(vals[1] - newVal);
        const index = dist0 <= dist1 ? 0 : 1;
        setActiveThumbIndex(index);
        updateValue(newVal, index);
        thumbRefs.current.get(index)?.focus();
      } else {
        updateValue(newVal, 0);
        thumbRefs.current.get(0)?.focus();
      }
    },
    [disabled, getValueFromPosition, isRange, getRangeValues, updateValue]
  );

  const makeThumbKeyDown = useCallback(
    (thumbIndex: number) => (e: React.KeyboardEvent) => {
      if (disabled) return;
      const currentVal = isRange ? getRangeValues()[thumbIndex] : getSingleValue();

      const incrementKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowUp';
      const decrementKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowDown';

      let newVal: number;
      switch (e.key) {
        case incrementKey: {
          e.preventDefault();
          newVal = clamp(currentVal + step, min, max);
          break;
        }
        case decrementKey: {
          e.preventDefault();
          newVal = clamp(currentVal - step, min, max);
          break;
        }
        case 'Home': {
          e.preventDefault();
          newVal = min;
          break;
        }
        case 'End': {
          e.preventDefault();
          newVal = max;
          break;
        }
        default:
          return;
      }

      updateValue(newVal, thumbIndex);
    },
    [disabled, isRange, getRangeValues, getSingleValue, orientation, step, min, max, updateValue]
  );

  const makeThumbPointerDown = useCallback(
    (thumbIndex: number) => (e: React.PointerEvent) => {
      if (disabled) return;
      e.stopPropagation();
      setActiveThumbIndex(thumbIndex);

      const handlePointerMove = (moveE: PointerEvent) => {
        const newVal = getValueFromPosition(moveE.clientX, moveE.clientY);
        updateValue(newVal, thumbIndex);
      };

      const handlePointerUp = () => {
        document.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerup', handlePointerUp);
      };

      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
    },
    [disabled, getValueFromPosition, updateValue]
  );

  const makeThumbProps = useCallback(
    (thumbIndex: number) => {
      const currentVal = isRange ? getRangeValues()[thumbIndex] : getSingleValue();
      const valueText = getValueText ? getValueText(currentVal) : String(currentVal);

      return {
        role: 'slider' as const,
        tabIndex: (disabled ? -1 : 0) as 0 | -1,
        'aria-valuemin': min,
        'aria-valuemax': max,
        'aria-valuenow': currentVal,
        'aria-valuetext': valueText,
        'aria-orientation': orientation,
        ...(disabled ? { 'aria-disabled': true as const } : {}),
        id: `${baseId}-thumb-${thumbIndex}`,
        ref: (el: HTMLElement | null) => {
          if (el) {
            thumbRefs.current.set(thumbIndex, el);
          } else {
            thumbRefs.current.delete(thumbIndex);
          }
        },
        onKeyDown: makeThumbKeyDown(thumbIndex),
        onFocus: () => {
          setIsFocused(true);
          setActiveThumbIndex(thumbIndex);
        },
        onBlur: () => setIsFocused(false),
        onPointerDown: makeThumbPointerDown(thumbIndex),
      };
    },
    [
      isRange,
      getRangeValues,
      getSingleValue,
      getValueText,
      min,
      max,
      orientation,
      disabled,
      baseId,
      makeThumbKeyDown,
      makeThumbPointerDown,
    ]
  );

  const trackProps = {
    role: 'presentation' as const,
    ref: (el: HTMLElement | null) => {
      trackRef.current = el;
    },
    onPointerDown: handleTrackPointerDown,
  };

  const thumbProps = makeThumbProps(activeThumbIndex);

  const thumbsProps: [UseSliderReturn['thumbProps'], UseSliderReturn['thumbProps']] = [
    makeThumbProps(0),
    makeThumbProps(1),
  ];

  return {
    trackProps,
    thumbProps,
    thumbsProps,
    value,
    setValue,
    isFocused,
    getPercentage,
  };
}
