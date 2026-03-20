import { cn } from '../../../utils/cn';
import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import styles from './DesktopContainer.module.scss';

export interface DesktopContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Maximum width of the centered content area (default 1200) */
  maxWidth?: number;
  /** Horizontal padding of the content area (default 24) */
  padding?: number;
  /** When true, background spans full viewport width while content is centered */
  fullWidth?: boolean;
  /** Container content */
  children?: ReactNode;
}

export const DesktopContainer = forwardRef<HTMLDivElement, DesktopContainerProps>(
  (
    {
      maxWidth = 1200,
      padding = 24,
      fullWidth = false,
      children,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const rootClass = cn(styles.root,
      fullWidth && styles.fullWidth,
      className);

    return (
      <div
        ref={ref}
        className={rootClass}
        style={{
          '--dc-max-width': `${maxWidth}px`,
          '--dc-padding': `${padding}px`,
          ...style,
        } as React.CSSProperties}
        {...rest}
      >
        {fullWidth ? (
          <div className={styles.inner}>{children}</div>
        ) : (
          children
        )}
      </div>
    );
  },
);

DesktopContainer.displayName = 'DesktopContainer';
