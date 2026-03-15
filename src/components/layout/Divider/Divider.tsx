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
    const verticalClass = [styles.vertical, className].filter(Boolean).join(' ');
    return <span ref={ref as React.Ref<HTMLSpanElement>} className={verticalClass} {...rest} />;
  }

  if (variant === 'withText' && text) {
    const withTextClass = [styles.withText, className].filter(Boolean).join(' ');
    return (
      <div ref={ref as React.Ref<HTMLDivElement>} className={withTextClass} {...rest}>
        <span className={styles.line} />
        <span className={styles.text}>{text}</span>
        <span className={styles.line} />
      </div>
    );
  }

  const horizontalClass = [styles.horizontal, styles[`variant-${variant}`], className].filter(Boolean).join(' ');
  return (
    <div ref={ref as React.Ref<HTMLDivElement>} className={horizontalClass} {...rest} />
  );
  },
);

Divider.displayName = 'Divider';
