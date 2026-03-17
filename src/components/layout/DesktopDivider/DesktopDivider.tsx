import { forwardRef, type HTMLAttributes } from 'react';
import styles from './DesktopDivider.module.scss';

export interface DesktopDividerProps extends HTMLAttributes<HTMLDivElement> {
  /** Direction of the divider */
  direction?: 'horizontal' | 'vertical';
  /** Optional centered label text */
  label?: string;
  /** Visual variant */
  variant?: 'solid' | 'dashed';
  /** Custom color (CSS value) */
  color?: string;
}

export const DesktopDivider = forwardRef<HTMLDivElement, DesktopDividerProps>(
  (
    {
      direction = 'horizontal',
      label,
      variant = 'solid',
      color,
      className = '',
      style,
      ...rest
    },
    ref,
  ) => {
    const colorStyle = color ? { ...style, '--divider-color': color } as React.CSSProperties : style;

    if (direction === 'vertical') {
      return (
        <div
          ref={ref}
          className={`${styles.vertical} ${styles[variant]} ${className}`}
          style={colorStyle}
          role="separator"
          aria-orientation="vertical"
          {...rest}
        />
      );
    }

    if (label) {
      return (
        <div
          ref={ref}
          className={`${styles.withLabel} ${styles[variant]} ${className}`}
          style={colorStyle}
          role="separator"
          {...rest}
        >
          <span className={styles.line} />
          <span className={styles.label}>{label}</span>
          <span className={styles.line} />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={`${styles.horizontal} ${styles[variant]} ${className}`}
        style={colorStyle}
        role="separator"
        {...rest}
      />
    );
  },
);

DesktopDivider.displayName = 'DesktopDivider';
