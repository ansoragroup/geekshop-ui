'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, type ReactNode, type HTMLAttributes, type KeyboardEvent } from 'react';
import styles from './Cell.module.scss';

export interface CellProps extends HTMLAttributes<HTMLDivElement> {
  /** Cell title (primary text) */
  title: string;
  /** Optional description below title */
  description?: string;
  /** Optional value displayed on the right */
  value?: string | ReactNode;
  /** Optional icon on the left */
  icon?: ReactNode;
  /** Show chevron right arrow */
  arrow?: boolean;
  /** Make the cell interactive (cursor pointer, active state) */
  clickable?: boolean;
  /** Show bottom border divider */
  divider?: boolean;
}

const ChevronRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M6 3L11 8L6 13"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Cell = forwardRef<HTMLDivElement, CellProps>(
  (
    {
      title,
      description,
      value,
      icon,
      arrow = false,
      clickable = false,
      divider = false,
      onClick,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const isInteractive = clickable || !!onClick;

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
      }
      rest.onKeyDown?.(e);
    };

    return (
      <div
        ref={ref}
        className={cn(styles.root, isInteractive ? styles.interactive : '', divider ? styles.divider : '', className)}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {icon && (
          <span className={styles.icon} aria-hidden="true">
            {icon}
          </span>
        )}

        <div className={styles.content}>
          <span className={styles.title}>{title}</span>
          {description && (
            <span className={styles.description}>{description}</span>
          )}
        </div>

        {value != null && (
          <span className={styles.value}>
            {value}
          </span>
        )}

        {arrow && (
          <span className={styles.arrow} aria-hidden="true">
            <ChevronRight />
          </span>
        )}
      </div>
    );
  },
);

Cell.displayName = 'Cell';
