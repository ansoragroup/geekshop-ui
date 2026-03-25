import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useSlider } from './useSlider';

function createKeyboardEvent(key: string): React.KeyboardEvent {
  return { key, preventDefault: vi.fn() } as unknown as React.KeyboardEvent;
}

function createPointerEvent(clientX: number, clientY: number): React.PointerEvent {
  return {
    clientX,
    clientY,
    stopPropagation: vi.fn(),
  } as unknown as React.PointerEvent;
}

describe('useSlider', () => {
  it('defaults to min value', () => {
    const { result } = renderHook(() => useSlider());
    expect(result.current.value).toBe(0);
  });

  it('respects defaultValue', () => {
    const { result } = renderHook(() => useSlider({ defaultValue: 50 }));
    expect(result.current.value).toBe(50);
  });

  it('respects custom min/max', () => {
    const { result } = renderHook(() => useSlider({ min: 10, max: 20, defaultValue: 15 }));
    expect(result.current.value).toBe(15);
  });

  it('setValue updates value', () => {
    const { result } = renderHook(() => useSlider());
    act(() => result.current.setValue(42));
    expect(result.current.value).toBe(42);
  });

  // Controlled mode
  it('controlled: uses provided value', () => {
    const { result } = renderHook(() => useSlider({ value: 75 }));
    expect(result.current.value).toBe(75);
  });

  it('controlled: calls onChange', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useSlider({ value: 50, onChange }));
    act(() => result.current.setValue(60));
    expect(onChange).toHaveBeenCalledWith(60);
  });

  // Range mode
  it('range: defaults to [min, max]', () => {
    const { result } = renderHook(() => useSlider({ range: true }));
    expect(result.current.value).toEqual([0, 100]);
  });

  it('range: respects defaultValue array', () => {
    const { result } = renderHook(() => useSlider({ defaultValue: [20, 80] }));
    expect(result.current.value).toEqual([20, 80]);
  });

  it('infers range from defaultValue array', () => {
    const { result } = renderHook(() => useSlider({ defaultValue: [10, 90] }));
    expect(Array.isArray(result.current.value)).toBe(true);
  });

  // thumbProps
  it('thumbProps has role=slider', () => {
    const { result } = renderHook(() => useSlider());
    expect(result.current.thumbProps.role).toBe('slider');
  });

  it('thumbProps has correct aria-valuemin/max/now', () => {
    const { result } = renderHook(() => useSlider({ min: 0, max: 100, defaultValue: 50 }));
    expect(result.current.thumbProps['aria-valuemin']).toBe(0);
    expect(result.current.thumbProps['aria-valuemax']).toBe(100);
    expect(result.current.thumbProps['aria-valuenow']).toBe(50);
  });

  it('thumbProps has aria-valuetext', () => {
    const { result } = renderHook(() => useSlider({ defaultValue: 50 }));
    expect(result.current.thumbProps['aria-valuetext']).toBe('50');
  });

  it('thumbProps uses custom getValueText', () => {
    const { result } = renderHook(() =>
      useSlider({ defaultValue: 50, getValueText: (v) => `${v}%` })
    );
    expect(result.current.thumbProps['aria-valuetext']).toBe('50%');
  });

  it('thumbProps has aria-orientation', () => {
    const { result } = renderHook(() => useSlider({ orientation: 'vertical' }));
    expect(result.current.thumbProps['aria-orientation']).toBe('vertical');
  });

  it('thumbProps has tabIndex=0', () => {
    const { result } = renderHook(() => useSlider());
    expect(result.current.thumbProps.tabIndex).toBe(0);
  });

  it('thumbProps has tabIndex=-1 when disabled', () => {
    const { result } = renderHook(() => useSlider({ disabled: true }));
    expect(result.current.thumbProps.tabIndex).toBe(-1);
  });

  it('thumbProps has aria-disabled when disabled', () => {
    const { result } = renderHook(() => useSlider({ disabled: true }));
    expect(result.current.thumbProps['aria-disabled']).toBe(true);
  });

  it('thumbProps has id', () => {
    const { result } = renderHook(() => useSlider());
    expect(result.current.thumbProps.id).toBeDefined();
  });

  it('thumbProps has ref callback', () => {
    const { result } = renderHook(() => useSlider());
    expect(typeof result.current.thumbProps.ref).toBe('function');
  });

  // thumbsProps for range
  it('thumbsProps returns two thumbs', () => {
    const { result } = renderHook(() => useSlider({ range: true }));
    expect(result.current.thumbsProps).toHaveLength(2);
    expect(result.current.thumbsProps[0].role).toBe('slider');
    expect(result.current.thumbsProps[1].role).toBe('slider');
  });

  // trackProps
  it('trackProps has role=presentation', () => {
    const { result } = renderHook(() => useSlider());
    expect(result.current.trackProps.role).toBe('presentation');
  });

  it('trackProps has ref callback', () => {
    const { result } = renderHook(() => useSlider());
    expect(typeof result.current.trackProps.ref).toBe('function');
  });

  // Keyboard navigation - horizontal
  it('ArrowRight increments by step', () => {
    const { result } = renderHook(() => useSlider({ defaultValue: 50, step: 10 }));
    act(() => {
      result.current.thumbProps.onKeyDown(createKeyboardEvent('ArrowRight'));
    });
    expect(result.current.value).toBe(60);
  });

  it('ArrowLeft decrements by step', () => {
    const { result } = renderHook(() => useSlider({ defaultValue: 50, step: 10 }));
    act(() => {
      result.current.thumbProps.onKeyDown(createKeyboardEvent('ArrowLeft'));
    });
    expect(result.current.value).toBe(40);
  });

  it('Home sets to min', () => {
    const { result } = renderHook(() => useSlider({ defaultValue: 50 }));
    act(() => {
      result.current.thumbProps.onKeyDown(createKeyboardEvent('Home'));
    });
    expect(result.current.value).toBe(0);
  });

  it('End sets to max', () => {
    const { result } = renderHook(() => useSlider({ defaultValue: 50 }));
    act(() => {
      result.current.thumbProps.onKeyDown(createKeyboardEvent('End'));
    });
    expect(result.current.value).toBe(100);
  });

  it('does not exceed max', () => {
    const { result } = renderHook(() => useSlider({ defaultValue: 95, step: 10 }));
    act(() => {
      result.current.thumbProps.onKeyDown(createKeyboardEvent('ArrowRight'));
    });
    expect(result.current.value).toBe(100);
  });

  it('does not go below min', () => {
    const { result } = renderHook(() => useSlider({ defaultValue: 5, step: 10 }));
    act(() => {
      result.current.thumbProps.onKeyDown(createKeyboardEvent('ArrowLeft'));
    });
    expect(result.current.value).toBe(0);
  });

  // Keyboard navigation - vertical
  it('ArrowUp increments in vertical mode', () => {
    const { result } = renderHook(() =>
      useSlider({ defaultValue: 50, step: 10, orientation: 'vertical' })
    );
    act(() => {
      result.current.thumbProps.onKeyDown(createKeyboardEvent('ArrowUp'));
    });
    expect(result.current.value).toBe(60);
  });

  it('ArrowDown decrements in vertical mode', () => {
    const { result } = renderHook(() =>
      useSlider({ defaultValue: 50, step: 10, orientation: 'vertical' })
    );
    act(() => {
      result.current.thumbProps.onKeyDown(createKeyboardEvent('ArrowDown'));
    });
    expect(result.current.value).toBe(40);
  });

  // Keyboard disabled
  it('keyboard does nothing when disabled', () => {
    const { result } = renderHook(() => useSlider({ defaultValue: 50, disabled: true }));
    act(() => {
      result.current.thumbProps.onKeyDown(createKeyboardEvent('ArrowRight'));
    });
    expect(result.current.value).toBe(50);
  });

  // Unrecognized key
  it('unrecognized key does nothing', () => {
    const { result } = renderHook(() => useSlider({ defaultValue: 50 }));
    act(() => {
      result.current.thumbProps.onKeyDown(createKeyboardEvent('Tab'));
    });
    expect(result.current.value).toBe(50);
  });

  // Focus state
  it('isFocused starts as false', () => {
    const { result } = renderHook(() => useSlider());
    expect(result.current.isFocused).toBe(false);
  });

  it('onFocus sets isFocused to true', () => {
    const { result } = renderHook(() => useSlider());
    act(() => result.current.thumbProps.onFocus());
    expect(result.current.isFocused).toBe(true);
  });

  it('onBlur sets isFocused to false', () => {
    const { result } = renderHook(() => useSlider());
    act(() => result.current.thumbProps.onFocus());
    act(() => result.current.thumbProps.onBlur());
    expect(result.current.isFocused).toBe(false);
  });

  // getPercentage
  it('getPercentage returns correct percentage', () => {
    const { result } = renderHook(() => useSlider({ min: 0, max: 100 }));
    expect(result.current.getPercentage(50)).toBe(50);
    expect(result.current.getPercentage(0)).toBe(0);
    expect(result.current.getPercentage(100)).toBe(100);
  });

  it('getPercentage handles equal min/max', () => {
    const { result } = renderHook(() => useSlider({ min: 50, max: 50 }));
    expect(result.current.getPercentage(50)).toBe(0);
  });

  // Pointer interactions
  it('thumb onPointerDown stops propagation', () => {
    const { result } = renderHook(() => useSlider({ defaultValue: 50 }));
    const event = createPointerEvent(100, 100);
    act(() => {
      result.current.thumbProps.onPointerDown(event);
    });
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('thumb onPointerDown does nothing when disabled', () => {
    const { result } = renderHook(() => useSlider({ defaultValue: 50, disabled: true }));
    const event = createPointerEvent(100, 100);
    act(() => {
      result.current.thumbProps.onPointerDown(event);
    });
    expect(event.stopPropagation).not.toHaveBeenCalled();
  });

  it('trackProps ref handles null', () => {
    const { result } = renderHook(() => useSlider());
    result.current.trackProps.ref(null);
  });

  it('thumbProps ref handles null', () => {
    const { result } = renderHook(() => useSlider());
    result.current.thumbProps.ref(null);
  });
});
