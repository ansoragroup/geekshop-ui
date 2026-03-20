import { cn } from '../../../utils/cn';
import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import styles from './DesktopShell.module.scss';

export interface DesktopShellProps extends HTMLAttributes<HTMLDivElement> {
  /** Top bar (e.g. utility links, contact info). Renders above header, full width, 32px height. */
  topBar?: ReactNode;
  /** Header area (e.g. logo, search, user actions). Full-width bg, content centered at 1200px. */
  header?: ReactNode;
  /** Footer area. Full-width bg, content centered. */
  footer?: ReactNode;
  /** Sidebar content. Rendered alongside main content. */
  sidebar?: ReactNode;
  /** Which side the sidebar appears on */
  sidebarPosition?: 'left' | 'right';
  /** Main page content */
  children: ReactNode;
}

export const DesktopShell = forwardRef<HTMLDivElement, DesktopShellProps>(
  (
    {
      topBar,
      header,
      footer,
      sidebar,
      sidebarPosition = 'left',
      children,
      className,
      ...rest
    },
    ref,
  ) => {
    const rootClass = cn(styles.root, className);

    const bodyClass = cn(styles.body,
      sidebar && styles.hasSidebar,
      sidebar && sidebarPosition === 'right' && styles.sidebarRight,);

    return (
      <div ref={ref} className={rootClass} {...rest}>
        {topBar && <div className={styles.topBar}>{topBar}</div>}
        {header && <div className={styles.header}>{header}</div>}
        <div className={styles.bodyWrapper}>
          <div className={bodyClass}>
            {sidebar && <aside className={styles.sidebar}>{sidebar}</aside>}
            <main className={styles.main}>{children}</main>
          </div>
        </div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    );
  },
);

DesktopShell.displayName = 'DesktopShell';
