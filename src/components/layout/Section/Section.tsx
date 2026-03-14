import type { ReactNode } from 'react';
import styles from './Section.module.scss';

export interface SectionProps {
  /** Section title header */
  title?: string;
  /** Custom padding (CSS value) */
  padding?: string;
  /** Section content */
  children?: ReactNode;
}

export function Section({
  title,
  padding,
  children,
}: SectionProps) {
  const bodyStyle = padding ? { padding } : undefined;

  return (
    <div className={styles.section}>
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
}

export default Section;
