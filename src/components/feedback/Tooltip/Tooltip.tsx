import { cn } from '../../../utils/cn';
'use client';
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
import styles from './Tooltip.module.scss';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
export type TooltipTrigger = 'click' | 'hover';

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  /** Tooltip content */
  content: string | ReactNode;
  /** Tooltip placement */
  placement?: TooltipPlacement;
  /** Trigger type */
  trigger?: TooltipTrigger;
  /** Controlled visibility */
  visible?: boolean;
  /** Callback on visibility change */
  onVisibleChange?: (visible: boolean) => void;
  /** The reference element */
  children: ReactNode;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      placement = 'top',
      trigger = 'hover',
      visible: visibleProp,
      onVisibleChange,
      children,
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
    const tooltipRef = useRef<HTMLDivElement>(null);

    const updatePosition = useCallback(() => {
      if (!triggerRef.current || !tooltipRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const gap = 8;

      let top = 0;
      let left = 0;

      switch (placement) {
        case 'top':
          top = -(tooltipRect.height + gap);
          left = (triggerRect.width - tooltipRect.width) / 2;
          break;
        case 'bottom':
          top = triggerRect.height + gap;
          left = (triggerRect.width - tooltipRect.width) / 2;
          break;
        case 'left':
          top = (triggerRect.height - tooltipRect.height) / 2;
          left = -(tooltipRect.width + gap);
          break;
        case 'right':
          top = (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.width + gap;
          break;
      }

      setPosition({ top, left });
    }, [placement]);

    useEffect(() => {
      if (isVisible) {
        // Delay to ensure tooltip is rendered before measuring
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

    // Close on outside click for click trigger
    useEffect(() => {
      if (trigger !== 'click' || !isVisible) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (
          triggerRef.current &&
          !triggerRef.current.contains(e.target as Node) &&
          tooltipRef.current &&
          !tooltipRef.current.contains(e.target as Node)
        ) {
          setIsVisible(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [trigger, isVisible, setIsVisible]);

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

        {isVisible && (
          <div
            ref={tooltipRef}
            className={cn(styles.tooltip, styles[`placement-${placement}`])}
            style={{ top: position.top, left: position.left }}
            role="tooltip"
          >
            <div className={styles.content}>{content}</div>
            <span className={styles.arrow} aria-hidden="true" />
          </div>
        )}
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';
