import { type FC, type MouseEventHandler } from 'react';
import styles from './SectionHeader.module.scss';

export interface SectionHeaderProps {
  /** Section title */
  title: string;
  /** Item count shown next to "see all" (e.g. "20 ta") */
  count?: number;
  /** Optional SVG icon displayed before the title */
  icon?: React.ReactNode;
  /** Click handler for "View all" link */
  onViewAll?: MouseEventHandler<HTMLButtonElement>;
}

const SectionHeader: FC<SectionHeaderProps> = ({
  title,
  count,
  icon,
  onViewAll,
}) => {
  return (
    <div className={styles.sectionHeader}>
      <div className={styles.left}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <h3 className={styles.title}>{title}</h3>
      </div>

      {onViewAll && (
        <button className={styles.viewAll} onClick={onViewAll}>
          {count !== undefined && (
            <span className={styles.count}>{count} ta</span>
          )}
          <svg
            className={styles.arrow}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 3l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SectionHeader;
