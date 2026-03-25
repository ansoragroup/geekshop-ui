import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useControllableState } from '../hooks/useControllableState';

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface UsePopoverOptions {
  /** Controlled open state */
  isOpen?: boolean;
  /** Default open state */
  defaultOpen?: boolean;
  /** Callback on open change */
  onOpenChange?: (isOpen: boolean) => void;
  /** Placement relative to trigger */
  placement?: PopoverPlacement;
  /** Offset from trigger in px */
  offset?: number;
  /** Close on click outside */
  closeOnClickOutside?: boolean;
  /** Close on Escape key */
  closeOnEscape?: boolean;
  /** Trigger mode */
  triggerMode?: 'click' | 'hover';
  /** Show delay for hover mode (ms) */
  showDelay?: number;
  /** Hide delay for hover mode (ms) */
  hideDelay?: number;
}

export interface UsePopoverReturn {
  triggerProps: {
    'aria-haspopup': 'dialog';
    'aria-expanded': boolean;
    'aria-controls': string;
    ref: (el: HTMLElement | null) => void;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
  };
  popoverProps: {
    id: string;
    role: 'dialog';
    'aria-modal': 'false';
    ref: (el: HTMLElement | null) => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
  };
  floatingStyle: React.CSSProperties;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export function usePopover(options: UsePopoverOptions = {}): UsePopoverReturn {
  const {
    isOpen: controlledOpen,
    defaultOpen,
    onOpenChange,
    placement = 'bottom',
    offset: offsetPx = 8,
    closeOnClickOutside = true,
    closeOnEscape = true,
    triggerMode = 'click',
    showDelay = 0,
    hideDelay = 0,
  } = options;

  const popoverId = useId();
  const triggerRef = useRef<HTMLElement | null>(null);
  const popoverRef = useRef<HTMLElement | null>(null);
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isOpen, setIsOpen] = useControllableState<boolean>({
    value: controlledOpen,
    defaultValue: defaultOpen ?? false,
    onChange: onOpenChange,
  });

  const [floatingStyle, setFloatingStyle] = useState<React.CSSProperties>({
    position: 'absolute',
    top: 0,
    left: 0,
  });

  const clearTimers = useCallback(() => {
    if (showTimerRef.current) {
      clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
    }
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  }, []);

  const open = useCallback(() => {
    clearTimers();
    if (triggerMode === 'hover' && showDelay > 0) {
      showTimerRef.current = setTimeout(() => setIsOpen(true), showDelay);
    } else {
      setIsOpen(true);
    }
  }, [clearTimers, triggerMode, showDelay, setIsOpen]);

  const close = useCallback(() => {
    clearTimers();
    if (triggerMode === 'hover' && hideDelay > 0) {
      hideTimerRef.current = setTimeout(() => setIsOpen(false), hideDelay);
    } else {
      setIsOpen(false);
    }
  }, [clearTimers, triggerMode, hideDelay, setIsOpen]);

  const toggle = useCallback(() => {
    if (isOpen) close();
    else open();
  }, [isOpen, close, open]);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !popoverRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();

    let top = 0;
    let left = 0;

    switch (placement) {
      case 'top':
        top = -(popoverRect.height + offsetPx);
        left = (triggerRect.width - popoverRect.width) / 2;
        break;
      case 'bottom':
        top = triggerRect.height + offsetPx;
        left = (triggerRect.width - popoverRect.width) / 2;
        break;
      case 'left':
        top = (triggerRect.height - popoverRect.height) / 2;
        left = -(popoverRect.width + offsetPx);
        break;
      case 'right':
        top = (triggerRect.height - popoverRect.height) / 2;
        left = triggerRect.width + offsetPx;
        break;
    }

    setFloatingStyle({
      position: 'absolute',
      top,
      left,
    });
  }, [placement, offsetPx]);

  // Update position when popover opens
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(updatePosition);
    }
  }, [isOpen, updatePosition]);

  // Close on outside click
  useEffect(() => {
    if (!closeOnClickOutside || !isOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        popoverRef.current &&
        !popoverRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [closeOnClickOutside, isOpen, setIsOpen]);

  // Close on Escape
  useEffect(() => {
    if (!closeOnEscape || !isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [closeOnEscape, isOpen, setIsOpen]);

  // Cleanup timers
  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const triggerProps: UsePopoverReturn['triggerProps'] = {
    'aria-haspopup': 'dialog' as const,
    'aria-expanded': isOpen,
    'aria-controls': popoverId,
    ref: (el: HTMLElement | null) => {
      triggerRef.current = el;
    },
  };

  if (triggerMode === 'click') {
    triggerProps.onClick = toggle;
  } else {
    triggerProps.onMouseEnter = open;
    triggerProps.onMouseLeave = close;
    triggerProps.onFocus = open;
    triggerProps.onBlur = close;
  }

  const popoverProps: UsePopoverReturn['popoverProps'] = {
    id: popoverId,
    role: 'dialog' as const,
    'aria-modal': 'false' as const,
    ref: (el: HTMLElement | null) => {
      popoverRef.current = el;
    },
  };

  if (triggerMode === 'hover') {
    popoverProps.onMouseEnter = () => clearTimers();
    popoverProps.onMouseLeave = close;
  }

  return {
    triggerProps,
    popoverProps,
    floatingStyle,
    isOpen,
    open,
    close,
    toggle,
  };
}
