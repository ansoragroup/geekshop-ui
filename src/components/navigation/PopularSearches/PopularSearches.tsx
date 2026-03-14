import styles from './PopularSearches.module.scss';

export interface PopularSearch {
  /** Rank position (1-based) */
  rank: number;
  /** Search term text */
  text: string;
}

export interface PopularSearchesProps {
  /** List of popular search terms with rankings */
  searches: PopularSearch[];
  /** Callback when a search tag is selected */
  onSelect?: (search: PopularSearch) => void;
  /** Section title */
  title?: string;
}

const FireIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2C8.5 7 4 9 4 14a8 8 0 0016 0c0-5-4.5-7-8-12z"
      fill="#FF5000"
    />
    <path
      d="M12 9c-1.5 2.5-3 3.5-3 6a3 3 0 006 0c0-2.5-1.5-3.5-3-6z"
      fill="#FFB088"
    />
  </svg>
);

export function PopularSearches({
  searches,
  onSelect,
  title = 'Ommabop qidiruvlar',
}: PopularSearchesProps) {
  if (searches.length === 0) return null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <FireIcon />
        <span className={styles.title}>{title}</span>
      </div>

      <div className={styles.tags}>
        {searches.map((search) => {
          const isTop3 = search.rank <= 3;
          return (
            <button
              key={search.rank}
              className={`${styles.tag} ${isTop3 ? styles.top : ''}`}
              onClick={() => onSelect?.(search)}
            >
              <span className={`${styles.rank} ${isTop3 ? styles.rankTop : ''}`}>
                #{search.rank}
              </span>
              <span className={styles.text}>{search.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default PopularSearches;
