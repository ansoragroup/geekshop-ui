import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { usePopover } from './usePopover';

describe('usePopover', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('defaults to closed', () => {
    const { result } = renderHook(() => usePopover());
    expect(result.current.isOpen).toBe(false);
  });

  it('respects defaultOpen', () => {
    const { result } = renderHook(() => usePopover({ defaultOpen: true }));
    expect(result.current.isOpen).toBe(true);
  });

  it('open() opens the popover', () => {
    const { result } = renderHook(() => usePopover());
    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);
  });

  it('close() closes the popover', () => {
    const { result } = renderHook(() => usePopover({ defaultOpen: true }));
    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
  });

  it('toggle() toggles the popover', () => {
    const { result } = renderHook(() => usePopover());
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(false);
  });

  // Controlled mode
  it('controlled: uses provided isOpen', () => {
    const { result } = renderHook(() => usePopover({ isOpen: true }));
    expect(result.current.isOpen).toBe(true);
  });

  it('controlled: calls onOpenChange', () => {
    const onOpenChange = vi.fn();
    const { result } = renderHook(() => usePopover({ isOpen: false, onOpenChange }));
    act(() => result.current.open());
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  // triggerProps
  it('triggerProps has aria-haspopup=dialog', () => {
    const { result } = renderHook(() => usePopover());
    expect(result.current.triggerProps['aria-haspopup']).toBe('dialog');
  });

  it('triggerProps has aria-expanded', () => {
    const { result } = renderHook(() => usePopover());
    expect(result.current.triggerProps['aria-expanded']).toBe(false);
    act(() => result.current.open());
    expect(result.current.triggerProps['aria-expanded']).toBe(true);
  });

  it('triggerProps has aria-controls pointing to popover', () => {
    const { result } = renderHook(() => usePopover());
    expect(result.current.triggerProps['aria-controls']).toBe(result.current.popoverProps.id);
  });

  it('triggerProps has ref callback', () => {
    const { result } = renderHook(() => usePopover());
    expect(typeof result.current.triggerProps.ref).toBe('function');
  });

  it('triggerProps ref handles null', () => {
    const { result } = renderHook(() => usePopover());
    result.current.triggerProps.ref(null);
  });

  // Click mode
  it('click mode: triggerProps.onClick toggles', () => {
    const { result } = renderHook(() => usePopover({ triggerMode: 'click' }));
    expect(result.current.triggerProps.onClick).toBeDefined();
    act(() => result.current.triggerProps.onClick?.());
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.triggerProps.onClick?.());
    expect(result.current.isOpen).toBe(false);
  });

  it('click mode: no hover handlers', () => {
    const { result } = renderHook(() => usePopover({ triggerMode: 'click' }));
    expect(result.current.triggerProps.onMouseEnter).toBeUndefined();
    expect(result.current.triggerProps.onMouseLeave).toBeUndefined();
  });

  // Hover mode
  it('hover mode: triggerProps.onMouseEnter opens', () => {
    const { result } = renderHook(() => usePopover({ triggerMode: 'hover' }));
    expect(result.current.triggerProps.onMouseEnter).toBeDefined();
    act(() => result.current.triggerProps.onMouseEnter?.());
    expect(result.current.isOpen).toBe(true);
  });

  it('hover mode: triggerProps.onMouseLeave closes', () => {
    const { result } = renderHook(() => usePopover({ triggerMode: 'hover', defaultOpen: true }));
    act(() => result.current.triggerProps.onMouseLeave?.());
    expect(result.current.isOpen).toBe(false);
  });

  it('hover mode: triggerProps.onFocus opens', () => {
    const { result } = renderHook(() => usePopover({ triggerMode: 'hover' }));
    act(() => result.current.triggerProps.onFocus?.());
    expect(result.current.isOpen).toBe(true);
  });

  it('hover mode: triggerProps.onBlur closes', () => {
    const { result } = renderHook(() => usePopover({ triggerMode: 'hover', defaultOpen: true }));
    act(() => result.current.triggerProps.onBlur?.());
    expect(result.current.isOpen).toBe(false);
  });

  it('hover mode: no onClick', () => {
    const { result } = renderHook(() => usePopover({ triggerMode: 'hover' }));
    expect(result.current.triggerProps.onClick).toBeUndefined();
  });

  // Hover delays
  it('hover mode with showDelay', () => {
    const { result } = renderHook(() => usePopover({ triggerMode: 'hover', showDelay: 200 }));
    act(() => result.current.open());
    expect(result.current.isOpen).toBe(false);
    act(() => vi.advanceTimersByTime(200));
    expect(result.current.isOpen).toBe(true);
  });

  it('hover mode with hideDelay', () => {
    const { result } = renderHook(() =>
      usePopover({ triggerMode: 'hover', hideDelay: 200, defaultOpen: true })
    );
    act(() => result.current.close());
    expect(result.current.isOpen).toBe(true);
    act(() => vi.advanceTimersByTime(200));
    expect(result.current.isOpen).toBe(false);
  });

  // popoverProps
  it('popoverProps has role=dialog', () => {
    const { result } = renderHook(() => usePopover());
    expect(result.current.popoverProps.role).toBe('dialog');
  });

  it('popoverProps has aria-modal=false', () => {
    const { result } = renderHook(() => usePopover());
    expect(result.current.popoverProps['aria-modal']).toBe('false');
  });

  it('popoverProps has id', () => {
    const { result } = renderHook(() => usePopover());
    expect(result.current.popoverProps.id).toBeDefined();
  });

  it('popoverProps has ref callback', () => {
    const { result } = renderHook(() => usePopover());
    expect(typeof result.current.popoverProps.ref).toBe('function');
  });

  it('popoverProps ref handles null', () => {
    const { result } = renderHook(() => usePopover());
    result.current.popoverProps.ref(null);
  });

  it('hover mode: popoverProps has onMouseEnter/Leave', () => {
    const { result } = renderHook(() => usePopover({ triggerMode: 'hover' }));
    expect(result.current.popoverProps.onMouseEnter).toBeDefined();
    expect(result.current.popoverProps.onMouseLeave).toBeDefined();
  });

  it('click mode: popoverProps has no hover handlers', () => {
    const { result } = renderHook(() => usePopover({ triggerMode: 'click' }));
    expect(result.current.popoverProps.onMouseEnter).toBeUndefined();
    expect(result.current.popoverProps.onMouseLeave).toBeUndefined();
  });

  it('hover mode: popoverProps.onMouseEnter cancels hide', () => {
    const { result } = renderHook(() =>
      usePopover({ triggerMode: 'hover', hideDelay: 200, defaultOpen: true })
    );
    act(() => result.current.close());
    act(() => vi.advanceTimersByTime(100));
    act(() => result.current.popoverProps.onMouseEnter?.());
    act(() => vi.advanceTimersByTime(200));
    expect(result.current.isOpen).toBe(true);
  });

  it('hover mode: popoverProps.onMouseLeave closes', () => {
    const { result } = renderHook(() => usePopover({ triggerMode: 'hover', defaultOpen: true }));
    act(() => result.current.popoverProps.onMouseLeave?.());
    expect(result.current.isOpen).toBe(false);
  });

  // floatingStyle
  it('floatingStyle has position: absolute', () => {
    const { result } = renderHook(() => usePopover());
    expect(result.current.floatingStyle.position).toBe('absolute');
  });

  // Escape key closes
  it('Escape key closes popover', () => {
    const { result } = renderHook(() => usePopover({ defaultOpen: true }));
    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });
    expect(result.current.isOpen).toBe(false);
  });

  it('Escape does nothing when closed', () => {
    const onOpenChange = vi.fn();
    renderHook(() => usePopover({ onOpenChange }));
    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('closeOnEscape=false disables Escape close', () => {
    const { result } = renderHook(() => usePopover({ defaultOpen: true, closeOnEscape: false }));
    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });
    expect(result.current.isOpen).toBe(true);
  });

  // Outside click (requires real DOM refs — test the listener registration)
  it('registers mousedown listener when open', () => {
    const addSpy = vi.spyOn(document, 'addEventListener');
    const { result } = renderHook(() => usePopover({ defaultOpen: true }));
    // Force effect to run
    expect(result.current.isOpen).toBe(true);
    expect(addSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
    addSpy.mockRestore();
  });

  it('removes mousedown listener when closed', () => {
    const removeSpy = vi.spyOn(document, 'removeEventListener');
    const { result } = renderHook(() => usePopover({ defaultOpen: true }));
    act(() => result.current.close());
    expect(removeSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
    removeSpy.mockRestore();
  });

  it('closeOnClickOutside=false disables outside click close', () => {
    const { result } = renderHook(() =>
      usePopover({ defaultOpen: true, closeOnClickOutside: false })
    );
    act(() => {
      document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    });
    expect(result.current.isOpen).toBe(true);
  });

  // Placement variations
  it('works with top placement', () => {
    const { result } = renderHook(() => usePopover({ placement: 'top' }));
    expect(result.current.floatingStyle.position).toBe('absolute');
  });

  it('works with left placement', () => {
    const { result } = renderHook(() => usePopover({ placement: 'left' }));
    expect(result.current.floatingStyle.position).toBe('absolute');
  });

  it('works with right placement', () => {
    const { result } = renderHook(() => usePopover({ placement: 'right' }));
    expect(result.current.floatingStyle.position).toBe('absolute');
  });

  it('works with bottom placement (default)', () => {
    const { result } = renderHook(() => usePopover());
    expect(result.current.floatingStyle.position).toBe('absolute');
  });

  // Timer cleanup
  it('cleans up timers on unmount', () => {
    const { result, unmount } = renderHook(() =>
      usePopover({ triggerMode: 'hover', showDelay: 200 })
    );
    act(() => result.current.open());
    unmount();
    // Should not throw
    act(() => vi.advanceTimersByTime(300));
  });
});
