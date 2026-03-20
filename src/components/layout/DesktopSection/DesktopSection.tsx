import { cn } from '../../../utils/cn';
import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import styles from './DesktopSection.module.scss';

export interface DesktopSectionProps extends HTMLAttributes<HTMLElement> {
  /** Section title */
  title?: string;
  /** Section content */
  children?: ReactNode;
  /** Background style */
  background?: 'default' | 'card' | 'primary';
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const DesktopSection = forwardRef<HTMLElement, DesktopSectionProps>(
  (
    {
      title,
      children,
      background = 'default',
      padding = 'md',
      className = '',
      ...rest
    },
    ref,
  ) => {
    const rootClass = cn(styles.section,
      styles[`bg-${background}`],
      styles[`padding-${padding}`],
      className,);

    return (
      <section ref={ref} className={rootClass} aria-label={title} {...rest}>
        {title && (
          <div className={styles.header}>
            <h3 className={styles.title}>{title}</h3>
          </div>
        )}
        <div className={styles.body}>{children}</div>
      </section>
    );
  },
);

DesktopSection.displayName = 'DesktopSection';
