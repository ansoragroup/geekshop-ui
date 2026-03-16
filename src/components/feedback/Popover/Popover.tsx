import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
  type HTMLAttributes,
} from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import styles from './Popover.module.scss';

export type PopoverPlacement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end';

export type PopoverTrigger = 'click' | 'hover';

export interface PopoverProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  /** Popover content (can be any ReactNode) */
  content: ReactNode;
  /** Placement relative to the trigger */
  placement?: PopoverPlacement;
  /** How to trigger the popover */
  trigger?: PopoverTrigger;
  /** Controlled visibility */
  visible?: boolean;
  /** Callback on visibility change */
  onVisibleChange?: (visible: boolean) => void;
  /** The trigger element */
  children: ReactNode;
  /** Whether to show the arrow */
  arrow?: boolean;
  /** Offset distance from the trigger */
  offset?: number;
  /** Whether clicking outside closes the popover */
  closeOnClickOutside?: boolean;
}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      content,
      placement = 'bottom',
      trigger = 'click',
      visible: visibleProp,
      onVisibleChange,
      children,
      arrow = true,
      offset = 8,
      closeOnClickOutside = true,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const [isVisible, setIsVisible] = useControllableState({
      value: visibleProp,
      defaultValue: false,
      onChange: onVisibleChange,
    });

    const [position, setPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    const getBasePlacement = (p: PopoverPlacement): string => {
      return p.split('-')[0];
    };

    const updatePosition = useCallback(() => {
      if (!triggerRef.current || !popoverRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();

      let top = 0;
      let left = 0;

      const base = getBasePlacement(placement);
      const alignment = placement.includes('-') ? placement.split('-')[1] : 'center';

      // Vertical positioning
      switch (base) {
        case 'top':
          top = -(popoverRect.height + offset);
          break;
        case 'bottom':
          top = triggerRect.height + offset;
          break;
        case 'left':
          top = (triggerRect.height - popoverRect.height) / 2;
          break;
        case 'right':
          top = (triggerRect.height - popoverRect.height) / 2;
          break;
      }

      // Horizontal positioning
      switch (base) {
        case 'top':
        case 'bottom':
          if (alignment === 'start') {
            left = 0;
          } else if (alignment === 'end') {
            left = triggerRect.width - popoverRect.width;
          } else {
            left = (triggerRect.width - popoverRect.width) / 2;
          }
          break;
        case 'left':
          left = -(popoverRect.width + offset);
          break;
        case 'right':
          left = triggerRect.width + offset;
          break;
      }

      setPosition({ top, left });
    }, [placement, offset]);

    useEffect(() => {
      if (isVisible) {
        requestAnimationFrame(updatePosition);
      }
    }, [isVisible, updatePosition]);

    const handleShow = () => setIsVisible(true);
    const handleHide = () => setIsVisible(false);
    const handleToggle = () => setIsVisible(!isVisible);

    const triggerProps: Record<string, unknown> = {};

    if (trigger === 'hover') {
      triggerProps.onMouseEnter = handleShow;
      triggerProps.onMouseLeave = handleHide;
      triggerProps.onFocus = handleShow;
      triggerProps.onBlur = handleHide;
    } else {
      triggerProps.onClick = handleToggle;
    }

    // Close on outside click
    useEffect(() => {
      if (!closeOnClickOutside || !isVisible) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (
          triggerRef.current &&
          !triggerRef.current.contains(e.target as Node) &&
          popoverRef.current &&
          !popoverRef.current.contains(e.target as Node)
        ) {
          setIsVisible(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [closeOnClickOutside, isVisible, setIsVisible]);

    // Close on Escape
    useEffect(() => {
      if (!isVisible) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsVisible(false);
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [isVisible, setIsVisible]);

    const basePlacement = getBasePlacement(placement);

    return (
      <div
        ref={ref}
        className={`${styles.root} ${className}`}
        {...rest}
      >
        <div
          ref={triggerRef}
          className={styles.trigger}
          {...triggerProps}
        >
          {children}
        </div>

        {isVisible && (
          <div
            ref={popoverRef}
            className={`${styles.popover} ${styles[`placement-${basePlacement}`]}`}
            style={{ top: position.top, left: position.left }}
            role="dialog"
            aria-modal="false"
          >
            <div className={styles.content}>{content}</div>
            {arrow && <span className={styles.arrow} aria-hidden="true" />}
          </div>
        )}
      </div>
    );
  }
);

Popover.displayName = 'Popover';
