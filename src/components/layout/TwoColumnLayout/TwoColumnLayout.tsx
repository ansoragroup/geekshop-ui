import { cn } from '../../../utils/cn';
import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import styles from './TwoColumnLayout.module.scss';

export interface TwoColumnLayoutProps extends HTMLAttributes<HTMLDivElement> {
  /** Sidebar content */
  sidebar: ReactNode;
  /** Sidebar width in pixels or CSS value (default 240) */
  sidebarWidth?: number | string;
  /** Which side the sidebar appears on (default 'left') */
  sidebarPosition?: 'left' | 'right';
  /** Gap between sidebar and main content in pixels (default 24) */
  gap?: number;
  /** Top offset for sticky sidebar behavior (in pixels). When set, sidebar becomes sticky. */
  stickyTop?: number;
  /** Main content */
  children: ReactNode;
}

export const TwoColumnLayout = forwardRef<HTMLDivElement, TwoColumnLayoutProps>(
  (
    {
      sidebar,
      sidebarWidth = 240,
      sidebarPosition = 'left',
      gap = 24,
      stickyTop,
      children,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const rootClass = cn(styles.root,
      sidebarPosition === 'right' && styles.reversed,
      className);

    const sidebarWidthValue =
      typeof sidebarWidth === 'number' ? `${sidebarWidth}px` : sidebarWidth;

    const sidebarStyle: React.CSSProperties = stickyTop !== undefined
      ? { position: 'sticky', top: stickyTop, alignSelf: 'flex-start' }
      : {};

    return (
      <div
        ref={ref}
        className={rootClass}
        style={{
          '--tcl-sidebar-width': sidebarWidthValue,
          '--tcl-gap': `${gap}px`,
          ...style,
        } as React.CSSProperties}
        {...rest}
      >
        <aside className={styles.sidebar} style={sidebarStyle}>
          {sidebar}
        </aside>
        <div className={styles.main}>{children}</div>
      </div>
    );
  },
);

TwoColumnLayout.displayName = 'TwoColumnLayout';
