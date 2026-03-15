import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import styles from './Container.module.scss';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether to add top padding for navbar */
  hasNavbar?: boolean;
  /** Whether to add bottom padding for tabbar */
  hasTabbar?: boolean;
  /** Page content */
  children?: ReactNode;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      hasNavbar = false,
      hasTabbar = false,
      children,
      className,
      ...rest
    },
    ref,
  ) => {
  const classNames = [
    styles.container,
    hasNavbar && styles.withNavbar,
    hasTabbar && styles.withTabbar,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classNames} {...rest}>
      {children}
    </div>
  );
  },
);

Container.displayName = 'Container';
