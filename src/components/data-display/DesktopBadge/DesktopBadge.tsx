'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import styles from './DesktopBadge.module.scss';

export type DesktopBadgeType = 'dot' | 'count' | 'text';
export type DesktopBadgeColor = 'primary' | 'success' | 'error' | 'warning' | 'info';
export type DesktopBadgePosition = 'top-right' | 'top-left' | 'inline';

export interface DesktopBadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'content' | 'color'> {
  /** Badge type: dot, count, or text label */
  type?: DesktopBadgeType;
  /** Content to display (number for count, string for text) */
  content?: number | string;
  /** Badge color */
  color?: DesktopBadgeColor;
  /** Custom background color override */
  customColor?: string;
  /** Max number before showing "99+" (only for count type) */
  maxCount?: number;
  /** Position relative to child element */
  position?: DesktopBadgePosition;
  /** Child element the badge overlays */
  children?: ReactNode;
}

export const DesktopBadge = forwardRef<HTMLSpanElement, DesktopBadgeProps>(
  (
    {
      type = 'dot',
      content,
      color = 'error',
      customColor,
      maxCount = 99,
      position = 'top-right',
      children,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const renderContent = () => {
      if (type === 'dot') return null;

      if (type === 'count' && typeof content === 'number') {
        return content > maxCount ? `${maxCount}+` : String(content);
      }

      return String(content ?? '');
    };

    const badgeContent = renderContent();
    const isHidden = type === 'count' && (typeof content !== 'number' || content <= 0);

    if (isHidden && !children) return null;

    if (!children) {
      if (isHidden) return null;
      return (
        <span
          ref={ref}
          className={cn(styles.badge, styles[`type-${type}`], styles[`color-${color}`], className)}
          style={customColor ? { backgroundColor: customColor } : undefined}
          {...rest}
        >
          {badgeContent}
        </span>
      );
    }

    const badgeElement = !isHidden ? (
      <span
        className={cn(styles.badge, styles[`type-${type}`], styles[`color-${color}`])}
        style={customColor ? { backgroundColor: customColor } : undefined}
      >
        {badgeContent}
      </span>
    ) : null;

    return (
      <span
        ref={ref}
        className={cn(styles.wrapper, styles[`position-${position}`], className)}
        {...rest}
      >
        {children}
        {badgeElement}
      </span>
    );
  },
);

DesktopBadge.displayName = 'DesktopBadge';
