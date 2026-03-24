'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import styles from './Section.module.scss';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Section title header */
  title?: string;
  /** Custom padding (CSS value) */
  padding?: string;
  /** Section content */
  children?: ReactNode;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      title,
      padding,
      children,
      className,
      ...rest
    },
    ref,
  ) => {
  const bodyStyle = padding ? { padding } : undefined;
  const rootClass = cn(styles.section, className);

  return (
    <section ref={ref} className={rootClass} aria-label={title} {...rest}>
      {title && (
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
        </div>
      )}
      <div className={styles.body} style={bodyStyle}>
        {children}
      </div>
    </section>
  );
  },
);

Section.displayName = 'Section';
