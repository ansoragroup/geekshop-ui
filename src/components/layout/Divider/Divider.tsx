'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, type HTMLAttributes } from 'react';
import styles from './Divider.module.scss';

export type DividerVariant = 'full' | 'inset' | 'withText';

export interface DividerProps extends HTMLAttributes<HTMLElement> {
  /** Divider variant */
  variant?: DividerVariant;
  /** Text shown in the center (only for withText variant) */
  text?: string;
  /** Whether the divider is vertical */
  vertical?: boolean;
}

export const Divider = forwardRef<HTMLElement, DividerProps>(
  (
    {
      variant = 'full',
      text,
      vertical = false,
      className,
      ...rest
    },
    ref,
  ) => {
  if (vertical) {
    const verticalClass = cn(styles.vertical, className);
    return <span ref={ref as React.Ref<HTMLSpanElement>} className={verticalClass} {...rest} />;
  }

  if (variant === 'withText' && text) {
    const withTextClass = cn(styles.withText, className);
    return (
      <div ref={ref as React.Ref<HTMLDivElement>} className={withTextClass} {...rest}>
        <span className={styles.line} />
        <span className={styles.text}>{text}</span>
        <span className={styles.line} />
      </div>
    );
  }

  const horizontalClass = cn(styles.horizontal, styles[`variant-${variant}`], className);
  return (
    <div ref={ref as React.Ref<HTMLDivElement>} className={horizontalClass} {...rest} />
  );
  },
);

Divider.displayName = 'Divider';
