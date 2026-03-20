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
import styles from './DesktopTooltip.module.scss';

export type DesktopTooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface DesktopTooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  /** Tooltip text content */
  content: string;
  /** Tooltip placement relative to trigger */
  placement?: DesktopTooltipPlacement;
  /** The trigger element */
  children: ReactNode;
  /** Delay before showing tooltip in ms */
  delay?: number;
}

export const DesktopTooltip = forwardRef<HTMLDivElement, DesktopTooltipProps>(
  ({ content, placement = 'top', children, delay = 200, className = '', ...rest }, ref) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

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
      if (visible) {
        requestAnimationFrame(updatePosition);
      }
    }, [visible, updatePosition]);

    // Close on Escape
    useEffect(() => {
      if (!visible) return;
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setVisible(false);
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [visible]);

    const handleShow = () => {
      timerRef.current = setTimeout(() => setVisible(true), delay);
    };

    const handleHide = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setVisible(false);
    };

    return (
      <div ref={ref} className={cn(styles.root, className)} {...rest}>
        <div
          ref={triggerRef}
          className={styles.trigger}
          onMouseEnter={handleShow}
          onMouseLeave={handleHide}
          onFocus={handleShow}
          onBlur={handleHide}
        >
          {children}
        </div>

        {visible && (
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
  },
);

DesktopTooltip.displayName = 'DesktopTooltip';
