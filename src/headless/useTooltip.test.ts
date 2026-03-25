import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { useTooltip } from './useTooltip';

describe('useTooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('defaults to not visible', () => {
    const { result } = renderHook(() => useTooltip());
    expect(result.current.isVisible).toBe(false);
  });

  it('respects defaultVisible', () => {
    const { result } = renderHook(() => useTooltip({ defaultVisible: true }));
    expect(result.current.isVisible).toBe(true);
  });

  it('show() makes tooltip visible', () => {
    const { result } = renderHook(() => useTooltip());
    act(() => result.current.show());
    expect(result.current.isVisible).toBe(true);
  });

  it('hide() hides the tooltip', () => {
    const { result } = renderHook(() => useTooltip({ defaultVisible: true }));
    act(() => result.current.hide());
    expect(result.current.isVisible).toBe(false);
  });

  // Controlled mode
  it('controlled: uses provided isVisible', () => {
    const { result } = renderHook(() => useTooltip({ isVisible: true }));
    expect(result.current.isVisible).toBe(true);
  });

  it('controlled: calls onVisibleChange', () => {
    const onVisibleChange = vi.fn();
    const { result } = renderHook(() => useTooltip({ isVisible: false, onVisibleChange }));
    act(() => result.current.show());
    expect(onVisibleChange).toHaveBeenCalledWith(true);
  });

  // Delays
  it('show delay defers visibility', () => {
    const { result } = renderHook(() => useTooltip({ showDelay: 200 }));
    act(() => result.current.show());
    expect(result.current.isVisible).toBe(false);
    act(() => vi.advanceTimersByTime(200));
    expect(result.current.isVisible).toBe(true);
  });

  it('hide delay defers hiding', () => {
    const { result } = renderHook(() => useTooltip({ defaultVisible: true, hideDelay: 200 }));
    act(() => result.current.hide());
    expect(result.current.isVisible).toBe(true);
    act(() => vi.advanceTimersByTime(200));
    expect(result.current.isVisible).toBe(false);
  });

  it('showing during hide delay cancels hide', () => {
    const { result } = renderHook(() => useTooltip({ defaultVisible: true, hideDelay: 200 }));
    act(() => result.current.hide());
    act(() => vi.advanceTimersByTime(100));
    act(() => result.current.show());
    act(() => vi.advanceTimersByTime(200));
    expect(result.current.isVisible).toBe(true);
  });

  it('hiding during show delay cancels show', () => {
    const { result } = renderHook(() => useTooltip({ showDelay: 200 }));
    act(() => result.current.show());
    act(() => vi.advanceTimersByTime(100));
    act(() => result.current.hide());
    act(() => vi.advanceTimersByTime(200));
    expect(result.current.isVisible).toBe(false);
  });

  // Disabled
  it('show does nothing when disabled', () => {
    const { result } = renderHook(() => useTooltip({ disabled: true }));
    act(() => result.current.show());
    expect(result.current.isVisible).toBe(false);
  });

  // triggerProps
  it('triggerProps has aria-describedby when visible', () => {
    const { result } = renderHook(() => useTooltip({ defaultVisible: true }));
    expect(result.current.triggerProps['aria-describedby']).toBeDefined();
  });

  it('triggerProps has aria-describedby=undefined when not visible', () => {
    const { result } = renderHook(() => useTooltip());
    expect(result.current.triggerProps['aria-describedby']).toBeUndefined();
  });

  it('triggerProps.onMouseEnter shows tooltip', () => {
    const { result } = renderHook(() => useTooltip());
    act(() => result.current.triggerProps.onMouseEnter());
    expect(result.current.isVisible).toBe(true);
  });

  it('triggerProps.onMouseLeave hides tooltip', () => {
    const { result } = renderHook(() => useTooltip({ defaultVisible: true }));
    act(() => result.current.triggerProps.onMouseLeave());
    expect(result.current.isVisible).toBe(false);
  });

  it('triggerProps.onFocus shows tooltip', () => {
    const { result } = renderHook(() => useTooltip());
    act(() => result.current.triggerProps.onFocus());
    expect(result.current.isVisible).toBe(true);
  });

  it('triggerProps.onBlur hides tooltip', () => {
    const { result } = renderHook(() => useTooltip({ defaultVisible: true }));
    act(() => result.current.triggerProps.onBlur());
    expect(result.current.isVisible).toBe(false);
  });

  it('triggerProps.onKeyDown hides on Escape when visible', () => {
    const { result } = renderHook(() => useTooltip({ defaultVisible: true }));
    act(() => {
      result.current.triggerProps.onKeyDown({
        key: 'Escape',
      } as React.KeyboardEvent);
    });
    expect(result.current.isVisible).toBe(false);
  });

  it('triggerProps.onKeyDown does not hide on Escape when not visible', () => {
    const onVisibleChange = vi.fn();
    const { result } = renderHook(() => useTooltip({ onVisibleChange }));
    act(() => {
      result.current.triggerProps.onKeyDown({
        key: 'Escape',
      } as React.KeyboardEvent);
    });
    expect(onVisibleChange).not.toHaveBeenCalled();
  });

  it('triggerProps.onKeyDown does nothing for other keys', () => {
    const onVisibleChange = vi.fn();
    const { result } = renderHook(() => useTooltip({ defaultVisible: true, onVisibleChange }));
    act(() => {
      result.current.triggerProps.onKeyDown({
        key: 'Enter',
      } as React.KeyboardEvent);
    });
    expect(onVisibleChange).not.toHaveBeenCalled();
  });

  it('triggerProps has ref callback', () => {
    const { result } = renderHook(() => useTooltip());
    expect(typeof result.current.triggerProps.ref).toBe('function');
  });

  it('triggerProps ref handles null', () => {
    const { result } = renderHook(() => useTooltip());
    result.current.triggerProps.ref(null);
  });

  // tooltipProps
  it('tooltipProps has role=tooltip', () => {
    const { result } = renderHook(() => useTooltip());
    expect(result.current.tooltipProps.role).toBe('tooltip');
  });

  it('tooltipProps has id', () => {
    const { result } = renderHook(() => useTooltip());
    expect(result.current.tooltipProps.id).toBeDefined();
  });

  it('tooltipProps.id matches triggerProps aria-describedby when visible', () => {
    const { result } = renderHook(() => useTooltip({ defaultVisible: true }));
    expect(result.current.triggerProps['aria-describedby']).toBe(result.current.tooltipProps.id);
  });

  it('tooltipProps has ref callback', () => {
    const { result } = renderHook(() => useTooltip());
    expect(typeof result.current.tooltipProps.ref).toBe('function');
  });

  // floatingStyle
  it('floatingStyle has position: absolute', () => {
    const { result } = renderHook(() => useTooltip());
    expect(result.current.floatingStyle.position).toBe('absolute');
  });

  // Edge: placement variations
  it('works with top placement', () => {
    const { result } = renderHook(() => useTooltip({ placement: 'top' }));
    expect(result.current.floatingStyle.position).toBe('absolute');
  });

  it('works with bottom placement', () => {
    const { result } = renderHook(() => useTooltip({ placement: 'bottom' }));
    expect(result.current.floatingStyle.position).toBe('absolute');
  });

  it('works with left placement', () => {
    const { result } = renderHook(() => useTooltip({ placement: 'left' }));
    expect(result.current.floatingStyle.position).toBe('absolute');
  });

  it('works with right placement', () => {
    const { result } = renderHook(() => useTooltip({ placement: 'right' }));
    expect(result.current.floatingStyle.position).toBe('absolute');
  });
});
