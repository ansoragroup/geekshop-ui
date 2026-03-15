import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import styles from './Badge.module.scss';

export type BadgeType = 'dot' | 'count' | 'text';
export type BadgeColor = 'primary' | 'success' | 'error' | 'warning' | 'info';
export type BadgePosition = 'top-right' | 'top-left' | 'inline';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Badge type: dot, count, or text label */
  type?: BadgeType;
  /** Content to display (number for count, string for text) */
  content?: number | string;
  /** Badge color */
  color?: BadgeColor;
  /** Custom background color override */
  customColor?: string;
  /** Max number before showing "99+" (only for count type) */
  max?: number;
  /** Position relative to child element */
  position?: BadgePosition;
  /** Child element the badge overlays */
  children?: ReactNode;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ type = 'dot', content, color = 'error', customColor, max = 99, position = 'top-right', children, className = '', ...rest }, ref) => {
    const renderContent = () => {
      if (type === 'dot') return null;

      if (type === 'count' && typeof content === 'number') {
        return content > max ? `${max}+` : String(content);
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
          className={`${styles.badge} ${styles[`type-${type}`]} ${styles[`color-${color}`]} ${className}`}
          style={customColor ? { backgroundColor: customColor } : undefined}
          {...rest}
        >
          {badgeContent}
        </span>
      );
    }

    const badgeElement = !isHidden ? (
      <span
        className={`${styles.badge} ${styles[`type-${type}`]} ${styles[`color-${color}`]}`}
        style={customColor ? { backgroundColor: customColor } : undefined}
      >
        {badgeContent}
      </span>
    ) : null;

    return (
      <span ref={ref} className={`${styles.wrapper} ${styles[`position-${position}`]} ${className}`} {...rest}>
        {children}
        {badgeElement}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
