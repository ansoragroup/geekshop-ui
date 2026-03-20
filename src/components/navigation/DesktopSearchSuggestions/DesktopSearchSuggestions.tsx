'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, type HTMLAttributes } from 'react';
import styles from './DesktopSearchSuggestions.module.scss';

export interface DesktopSearchSuggestionItem {
  /** Unique identifier */
  id: string;
  /** Suggestion text */
  text: string;
  /** Optional product thumbnail URL */
  thumbnail?: string;
}

export interface DesktopSearchSuggestionGroup {
  /** Group type identifier */
  type: 'recent' | 'trending' | 'products';
  /** Display label for the group */
  label: string;
  /** Items in this group */
  items: DesktopSearchSuggestionItem[];
}

export interface DesktopSearchSuggestionsProps extends HTMLAttributes<HTMLDivElement> {
  /** Grouped suggestions */
  suggestions: DesktopSearchSuggestionGroup[];
  /** Callback when a suggestion is selected */
  onSelect?: (item: DesktopSearchSuggestionItem) => void;
  /** Callback when recent searches are cleared */
  onClear?: () => void;
  /** Current query for highlight matching */
  query?: string;
}

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const TrendingIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

function highlightMatch(text: string, query: string) {
  if (!query || !query.trim()) return <span>{text}</span>;

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase().trim();
  const index = lowerText.indexOf(lowerQuery);

  if (index === -1) return <span>{text}</span>;

  const before = text.slice(0, index);
  const match = text.slice(index, index + lowerQuery.length);
  const after = text.slice(index + lowerQuery.length);

  return (
    <span>
      {before}
      <span className={styles.highlight}>{match}</span>
      {after}
    </span>
  );
}

function getGroupIcon(type: string) {
  switch (type) {
    case 'recent':
      return <ClockIcon />;
    case 'trending':
      return <TrendingIcon />;
    default:
      return <SearchIcon />;
  }
}

export const DesktopSearchSuggestions = forwardRef<HTMLDivElement, DesktopSearchSuggestionsProps>(
  (
    {
      suggestions,
      onSelect,
      onClear,
      query = '',
      className = '',
      ...rest
    },
    ref,
  ) => {
    const hasContent = suggestions.some((g) => g.items.length > 0);
    if (!hasContent) return null;

    return (
      <div ref={ref} className={cn(styles.panel, className)} role="listbox" {...rest}>
        {suggestions.map((group) => {
          if (group.items.length === 0) return null;

          return (
            <div key={group.type} className={styles.group}>
              <div className={styles.groupHeader}>
                <span className={styles.groupLabel}>{group.label}</span>
                {group.type === 'recent' && onClear && (
                  <button
                    className={styles.clearBtn}
                    onClick={onClear}
                    type="button"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className={styles.items}>
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    className={styles.item}
                    role="option"
                    aria-selected={false}
                    onClick={() => onSelect?.(item)}
                    type="button"
                  >
                    {item.thumbnail ? (
                      <img
                        className={styles.thumbnail}
                        src={item.thumbnail}
                        alt=""
                        loading="lazy"
                      />
                    ) : (
                      <span className={styles.icon}>
                        {getGroupIcon(group.type)}
                      </span>
                    )}
                    <span className={styles.text}>
                      {highlightMatch(item.text, query)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  },
);

DesktopSearchSuggestions.displayName = 'DesktopSearchSuggestions';
