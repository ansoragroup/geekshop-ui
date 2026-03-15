import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import styles from './Section.module.scss';

export interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  /** Section title header */
  title?: string;
  /** Custom padding (CSS value) */
  padding?: string;
  /** Section content */
  children?: ReactNode;
}

export const Section = forwardRef<HTMLDivElement, SectionProps>(
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
  const rootClass = [styles.section, className].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={rootClass} {...rest}>
      {title && (
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
        </div>
      )}
      <div className={styles.body} style={bodyStyle}>
        {children}
      </div>
    </div>
  );
  },
);

Section.displayName = 'Section';
