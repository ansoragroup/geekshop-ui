import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useDialog, useModal } from './useDialog';

describe('useDialog', () => {
  it('defaults to closed', () => {
    const { result } = renderHook(() => useDialog());
    expect(result.current.isOpen).toBe(false);
  });

  it('respects defaultOpen', () => {
    const { result } = renderHook(() => useDialog({ defaultOpen: true }));
    expect(result.current.isOpen).toBe(true);
  });

  it('open() sets isOpen to true', () => {
    const { result } = renderHook(() => useDialog());
    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);
  });

  it('close() sets isOpen to false', () => {
    const { result } = renderHook(() => useDialog({ defaultOpen: true }));
    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
  });

  // Controlled mode
  it('controlled: uses provided isOpen', () => {
    const { result } = renderHook(() => useDialog({ isOpen: true }));
    expect(result.current.isOpen).toBe(true);
  });

  it('controlled: calls onOpenChange', () => {
    const onOpenChange = vi.fn();
    const { result } = renderHook(() => useDialog({ isOpen: false, onOpenChange }));
    act(() => result.current.open());
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  // overlayProps
  it('overlayProps has role=presentation', () => {
    const { result } = renderHook(() => useDialog());
    expect(result.current.overlayProps.role).toBe('presentation');
  });

  it('overlayProps.onClick calls close when closeOnOverlayClick is true', () => {
    const onOpenChange = vi.fn();
    const { result } = renderHook(() =>
      useDialog({ defaultOpen: true, onOpenChange, closeOnOverlayClick: true })
    );
    act(() => result.current.overlayProps.onClick());
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('overlayProps.onClick does not close when closeOnOverlayClick is false', () => {
    const onOpenChange = vi.fn();
    const { result } = renderHook(() =>
      useDialog({ defaultOpen: true, onOpenChange, closeOnOverlayClick: false })
    );
    act(() => result.current.overlayProps.onClick());
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  // dialogProps
  it('dialogProps has role=dialog by default', () => {
    const { result } = renderHook(() => useDialog());
    expect(result.current.dialogProps.role).toBe('dialog');
  });

  it('dialogProps has role=alertdialog when specified', () => {
    const { result } = renderHook(() => useDialog({ role: 'alertdialog' }));
    expect(result.current.dialogProps.role).toBe('alertdialog');
  });

  it('dialogProps has aria-modal=true', () => {
    const { result } = renderHook(() => useDialog());
    expect(result.current.dialogProps['aria-modal']).toBe('true');
  });

  it('dialogProps has tabIndex=-1', () => {
    const { result } = renderHook(() => useDialog());
    expect(result.current.dialogProps.tabIndex).toBe(-1);
  });

  it('dialogProps includes aria-labelledby when titleId is provided', () => {
    const { result } = renderHook(() => useDialog({ titleId: 'my-title' }));
    expect(result.current.dialogProps['aria-labelledby']).toBe('my-title');
  });

  it('dialogProps does not include aria-labelledby when titleId is not provided', () => {
    const { result } = renderHook(() => useDialog());
    expect(result.current.dialogProps['aria-labelledby']).toBeUndefined();
  });

  it('dialogProps.onClick stops propagation', () => {
    const { result } = renderHook(() => useDialog());
    const event = { stopPropagation: vi.fn() } as unknown as React.MouseEvent;
    result.current.dialogProps.onClick(event);
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('dialogProps.onKeyDown stops propagation', () => {
    const { result } = renderHook(() => useDialog());
    const event = { stopPropagation: vi.fn() } as unknown as React.KeyboardEvent;
    result.current.dialogProps.onKeyDown(event);
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('dialogProps has a ref', () => {
    const { result } = renderHook(() => useDialog());
    expect(result.current.dialogProps.ref).toBeDefined();
  });

  // closeButtonProps
  it('closeButtonProps has aria-label=Close', () => {
    const { result } = renderHook(() => useDialog());
    expect(result.current.closeButtonProps['aria-label']).toBe('Close');
  });

  it('closeButtonProps has type=button', () => {
    const { result } = renderHook(() => useDialog());
    expect(result.current.closeButtonProps.type).toBe('button');
  });

  it('closeButtonProps.onClick calls close', () => {
    const onOpenChange = vi.fn();
    const { result } = renderHook(() => useDialog({ defaultOpen: true, onOpenChange }));
    act(() => result.current.closeButtonProps.onClick());
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  // useModal alias
  it('useModal is an alias for useDialog', () => {
    expect(useModal).toBe(useDialog);
  });

  // Edge: default options
  it('works with no options', () => {
    const { result } = renderHook(() => useDialog());
    expect(result.current.isOpen).toBe(false);
    expect(result.current.dialogProps.role).toBe('dialog');
  });
});
