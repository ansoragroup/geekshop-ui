import type { ReactNode } from 'react';
import styles from './Container.module.scss';

export interface ContainerProps {
  /** Whether to add top padding for navbar */
  hasNavbar?: boolean;
  /** Whether to add bottom padding for tabbar */
  hasTabbar?: boolean;
  /** Page content */
  children?: ReactNode;
}

export function Container({
  hasNavbar = false,
  hasTabbar = false,
  children,
}: ContainerProps) {
  const classNames = [
    styles.container,
    hasNavbar && styles.withNavbar,
    hasTabbar && styles.withTabbar,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      {children}
    </div>
  );
}

export default Container;
