'use client';
import { cn } from '../../../utils/cn';
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
import styles from './DesktopPopover.module.scss';

export type DesktopPopoverPlacement = 'top' | 'bottom' | 'left' | 'right';
export type DesktopPopoverTrigger = 'hover' | 'click';

export interface DesktopPopoverProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  /** Popover content */
  content: ReactNode;
  /** Placement relative to the trigger */
  placement?: DesktopPopoverPlacement;
  /** How to trigger the popover */
  trigger?: DesktopPopoverTrigger;
  /** Trigger element */
  children: ReactNode;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
}

export const DesktopPopover = forwardRef<HTMLDivElement, DesktopPopoverProps>(
  (
    {
      content,
      placement = 'bottom',
      trigger = 'hover',
      children,
      open: openProp,
      onOpenChange,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useControllableState({
      value: openProp,
      defaultValue: false,
      onChange: onOpenChange,
    });

    const [position, setPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    const updatePosition = useCallback(() => {
      if (!triggerRef.current || !popoverRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();
      const offset = 10;

      let top = 0;
      let left = 0;

      switch (placement) {
        case 'top':
          top = -(popoverRect.height + offset);
          left = (triggerRect.width - popoverRect.width) / 2;
          break;
        case 'bottom':
          top = triggerRect.height + offset;
          left = (triggerRect.width - popoverRect.width) / 2;
          break;
        case 'left':
          top = (triggerRect.height - popoverRect.height) / 2;
          left = -(popoverRect.width + offset);
          break;
        case 'right':
          top = (triggerRect.height - popoverRect.height) / 2;
          left = triggerRect.width + offset;
          break;
      }

      setPosition({ top, left });
    }, [placement]);

    useEffect(() => {
      if (isOpen) {
        requestAnimationFrame(updatePosition);
      }
    }, [isOpen, updatePosition]);

    // Close on outside click (for click trigger)
    useEffect(() => {
      if (!isOpen || trigger !== 'click') return;

      const handleClickOutside = (e: MouseEvent) => {
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

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, trigger, setIsOpen]);

    // Close on Escape
    useEffect(() => {
      if (!isOpen) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, setIsOpen]);

    const triggerProps: Record<string, unknown> = {};

    if (trigger === 'hover') {
      triggerProps.onMouseEnter = () => setIsOpen(true);
      triggerProps.onMouseLeave = () => setIsOpen(false);
      triggerProps.onFocus = () => setIsOpen(true);
      triggerProps.onBlur = () => setIsOpen(false);
    } else {
      triggerProps.onClick = () => setIsOpen(!isOpen);
    }

    return (
      <div
        ref={ref}
        className={cn(styles.root, className)}
        {...rest}
      >
        <div
          ref={triggerRef}
          className={styles.trigger}
          {...triggerProps}
        >
          {children}
        </div>

        {isOpen && (
          <div
            ref={popoverRef}
            className={cn(styles.popover, styles[`placement-${placement}`])}
            style={{ top: position.top, left: position.left }}
            role="tooltip"
            onMouseEnter={trigger === 'hover' ? () => setIsOpen(true) : undefined}
            onMouseLeave={trigger === 'hover' ? () => setIsOpen(false) : undefined}
          >
            <div className={styles.content}>{content}</div>
            <span className={styles.arrow} aria-hidden="true" />
          </div>
        )}
      </div>
    );
  },
);

DesktopPopover.displayName = 'DesktopPopover';
