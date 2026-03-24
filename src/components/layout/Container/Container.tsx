'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import styles from './Container.module.scss';

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  /** Whether to add top padding for navbar */
  hasNavbar?: boolean;
  /** Whether to add bottom padding for tabbar */
  hasTabbar?: boolean;
  /** Whether to add bottom padding for action bar (e.g. ProductDetailPage) */
  hasActionBar?: boolean;
  /** Page content */
  children?: ReactNode;
}

export const Container = forwardRef<HTMLElement, ContainerProps>(
  (
    {
      hasNavbar = false,
      hasTabbar = false,
      hasActionBar = false,
      children,
      className,
      ...rest
    },
    ref,
  ) => {
  const classNames = cn(styles.container,
    hasNavbar && styles.withNavbar,
    hasTabbar && !hasActionBar && styles.withTabbar,
    hasActionBar && !hasTabbar && styles.withActionBar,
    hasActionBar && hasTabbar && styles.withActionBarAndTabbar,
    className);

  return (
    <main ref={ref} className={classNames} {...rest}>
      {children}
    </main>
  );
  },
);

Container.displayName = 'Container';
