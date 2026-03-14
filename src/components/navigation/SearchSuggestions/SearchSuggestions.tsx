import styles from './SearchSuggestions.module.scss';

export interface SearchSuggestion {
  /** Unique identifier */
  id: string;
  /** Suggestion text */
  text: string;
}

export interface SearchSuggestionsProps {
  /** Current search query (used for highlight matching) */
  query: string;
  /** List of suggestions to display */
  suggestions: SearchSuggestion[];
  /** Callback when a suggestion is selected */
  onSelect?: (suggestion: SearchSuggestion) => void;
}

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="M12 5l-7 7 7 7" />
  </svg>
);

function highlightMatch(text: string, query: string) {
  if (!query.trim()) return <span>{text}</span>;

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

export function SearchSuggestions({
  query,
  suggestions,
  onSelect,
}: SearchSuggestionsProps) {
  if (suggestions.length === 0) return null;

  return (
    <div className={styles.suggestions} role="listbox">
      {suggestions.map((suggestion, index) => (
        <button
          key={suggestion.id}
          className={styles.item}
          role="option"
          aria-selected={false}
          onClick={() => onSelect?.(suggestion)}
        >
          <span className={styles.searchIcon}>
            <SearchIcon />
          </span>
          <span className={styles.text}>
            {highlightMatch(suggestion.text, query)}
          </span>
          <span className={styles.arrowIcon}>
            <ArrowIcon />
          </span>
          {index < suggestions.length - 1 && <span className={styles.divider} />}
        </button>
      ))}
    </div>
  );
}

export default SearchSuggestions;
