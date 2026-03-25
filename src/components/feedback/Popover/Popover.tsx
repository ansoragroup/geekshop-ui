'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import { usePopover } from '../../../headless/usePopover';
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
    ref
  ) => {
    const basePlacement = placement.split('-')[0] as 'top' | 'bottom' | 'left' | 'right';

    const popover = usePopover({
      isOpen: visibleProp,
      onOpenChange: onVisibleChange,
      placement: basePlacement,
      offset,
      closeOnClickOutside,
      closeOnEscape: true,
      triggerMode: trigger,
    });

    const { isOpen, floatingStyle } = popover;
    const {
      ref: triggerRefCb,
      onClick: triggerOnClick,
      onMouseEnter: triggerOnMouseEnter,
      onMouseLeave: triggerOnMouseLeave,
      onFocus: triggerOnFocus,
      onBlur: triggerOnBlur,
    } = popover.triggerProps;
    const {
      ref: popoverRefCb,
      role: popoverRole,
      'aria-modal': popoverAriaModal,
      onMouseEnter: popoverOnMouseEnter,
      onMouseLeave: popoverOnMouseLeave,
    } = popover.popoverProps;

    const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerOnClick?.();
      }
    };

    return (
      <div ref={ref} className={cn(styles.root, className)} {...rest}>
        <div
          ref={triggerRefCb as React.Ref<HTMLDivElement>}
          className={styles.trigger}
          role="button"
          tabIndex={0}
          onClick={triggerOnClick}
          onKeyDown={handleTriggerKeyDown}
          onMouseEnter={triggerOnMouseEnter}
          onMouseLeave={triggerOnMouseLeave}
          onFocus={triggerOnFocus}
          onBlur={triggerOnBlur}
        >
          {children}
        </div>

        {isOpen && (
          <div
            ref={popoverRefCb as React.Ref<HTMLDivElement>}
            className={cn(styles.popover, styles[`placement-${basePlacement}`])}
            style={{ top: floatingStyle.top as number, left: floatingStyle.left as number }}
            role={popoverRole}
            aria-modal={popoverAriaModal}
            onMouseEnter={popoverOnMouseEnter}
            onMouseLeave={popoverOnMouseLeave}
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
