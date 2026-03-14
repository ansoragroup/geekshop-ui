import styles from './SearchBar.module.scss';

export interface SearchBarProps {
  /** Current input value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Triggered when user submits/presses enter */
  onSearch?: (value: string) => void;
  /** Camera button handler */
  onCamera?: () => void;
  /** Placeholder text */
  placeholder?: string;
  /** Visual variant */
  variant?: 'default' | 'filled';
  /** Whether the search bar is inside a NavBar (compact mode) */
  compact?: boolean;
  /** Whether the input is read-only (acts as a link/button) */
  readOnly?: boolean;
  /** Click handler when in readOnly mode */
  onClick?: () => void;
}

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const CameraIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

export function SearchBar({
  value = '',
  onChange,
  onSearch,
  onCamera,
  placeholder = 'Mahsulot qidirish...',
  variant = 'default',
  compact = false,
  readOnly = false,
  onClick,
}: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch?.(value);
    }
  };

  const wrapperClass = [
    styles.searchBar,
    styles[variant],
    compact ? styles.compact : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClass} onClick={readOnly ? onClick : undefined} role={readOnly ? 'button' : undefined} tabIndex={readOnly ? 0 : undefined}>
      <span className={styles.searchIcon}>
        <SearchIcon />
      </span>

      {readOnly ? (
        <span className={styles.placeholderText}>{placeholder}</span>
      ) : (
        <input
          className={styles.input}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange?.(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      )}

      {onCamera && (
        <button className={styles.cameraBtn} onClick={(e) => { e.stopPropagation(); onCamera(); }} aria-label="Kamera bilan qidirish">
          <CameraIcon />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
