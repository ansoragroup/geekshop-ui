import { useCallback, useId, useRef, useState, useEffect } from 'react';

export interface UseTooltipOptions {
  /** Placement of the tooltip relative to the trigger */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** Delay before showing (ms) */
  showDelay?: number;
  /** Delay before hiding (ms) */
  hideDelay?: number;
  /** Offset from trigger (px) */
  offset?: number;
  /** Controlled visibility */
  isVisible?: boolean;
  /** Default visibility */
  defaultVisible?: boolean;
  /** Callback on visibility change */
  onVisibleChange?: (visible: boolean) => void;
  /** Whether the tooltip is disabled */
  disabled?: boolean;
}

export interface UseTooltipReturn {
  triggerProps: {
    'aria-describedby': string | undefined;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onFocus: () => void;
    onBlur: () => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    ref: (el: HTMLElement | null) => void;
  };
  tooltipProps: {
    id: string;
    role: 'tooltip';
    ref: (el: HTMLElement | null) => void;
  };
  floatingStyle: React.CSSProperties;
  isVisible: boolean;
  show: () => void;
  hide: () => void;
}

export function useTooltip(options: UseTooltipOptions = {}): UseTooltipReturn {
  const {
    placement = 'top',
    showDelay = 0,
    hideDelay = 0,
    offset = 8,
    isVisible: controlledVisible,
    defaultVisible,
    onVisibleChange,
    disabled = false,
  } = options;

  const tooltipId = useId();

  // Simple controlled/uncontrolled without useControllableState since tooltip
  // visibility is often managed locally
  const isControlled = controlledVisible !== undefined;
  const [internalVisible, setInternalVisible] = useState(defaultVisible ?? false);
  const isVisible = isControlled ? controlledVisible : internalVisible;

  const setVisible = useCallback(
    (v: boolean) => {
      if (!isControlled) {
        setInternalVisible(v);
      }
      onVisibleChange?.(v);
    },
    [isControlled, onVisibleChange]
  );

  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLElement | null>(null);

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

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    let top = 0;
    let left = 0;

    switch (placement) {
      case 'top':
        top = -(tooltipRect.height + offset);
        left = (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = triggerRect.height + offset;
        left = (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = (triggerRect.height - tooltipRect.height) / 2;
        left = -(tooltipRect.width + offset);
        break;
      case 'right':
        top = (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.width + offset;
        break;
    }

    setFloatingStyle({
      position: 'absolute',
      top,
      left,
    });
  }, [placement, offset]);

  const show = useCallback(() => {
    if (disabled) return;
    clearTimers();
    if (showDelay > 0) {
      showTimerRef.current = setTimeout(() => {
        setVisible(true);
      }, showDelay);
    } else {
      setVisible(true);
    }
  }, [disabled, clearTimers, showDelay, setVisible]);

  const hide = useCallback(() => {
    clearTimers();
    if (hideDelay > 0) {
      hideTimerRef.current = setTimeout(() => {
        setVisible(false);
      }, hideDelay);
    } else {
      setVisible(false);
    }
  }, [clearTimers, hideDelay, setVisible]);

  // Update position when tooltip becomes visible
  useEffect(() => {
    if (isVisible) {
      requestAnimationFrame(updatePosition);
    }
  }, [isVisible, updatePosition]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const triggerProps = {
    'aria-describedby': isVisible ? tooltipId : undefined,
    onMouseEnter: show,
    onMouseLeave: hide,
    onFocus: show,
    onBlur: hide,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        hide();
      }
    },
    ref: (el: HTMLElement | null) => {
      triggerRef.current = el;
    },
  };

  const tooltipProps = {
    id: tooltipId,
    role: 'tooltip' as const,
    ref: (el: HTMLElement | null) => {
      tooltipRef.current = el;
    },
  };

  return {
    triggerProps,
    tooltipProps,
    floatingStyle,
    isVisible,
    show,
    hide,
  };
}
