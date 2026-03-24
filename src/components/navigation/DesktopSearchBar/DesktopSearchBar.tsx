'use client';
import { useGeekShop } from '../../../i18n';
import { cn } from '../../../utils/cn';
import { forwardRef, useCallback, useEffect, useRef, useState, type HTMLAttributes } from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import styles from './DesktopSearchBar.module.scss';

export interface DesktopSearchBarCategory {
  /** Unique value */
  value: string;
  /** Display label */
  label: string;
}

export interface DesktopSearchBarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current input value */
  value?: string;
  /** Default value for uncontrolled usage */
  defaultValue?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Submit handler (enter or button click) */
  onSubmit?: (value: string) => void;
  /** Clear handler */
  onClear?: () => void;
  /** Placeholder text */
  placeholder?: string;
  /** Optional category dropdown items */
  categories?: DesktopSearchBarCategory[];
  /** Currently selected category */
  selectedCategory?: string;
  /** Category change handler */
  onCategoryChange?: (value: string) => void;
  /** Image search handler — called with URL string or File object */
  onImageSearch?: (source: string | File) => void;
  /** Whether to show the image search button */
  showImageSearch?: boolean;
}

/* ---------- Inline SVG Icons ---------- */

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const ClearIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M15 9l-6 6" />
    <path d="M9 9l6 6" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const CameraIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const ImageIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const LinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
  </svg>
);

/* ---------- Image Search Popover ---------- */

interface ImageSearchPopoverProps {
  onSearch: (source: string | File) => void;
  onClose: () => void;
}

const ImageSearchPopover: React.FC<ImageSearchPopoverProps> = ({ onSearch, onClose }) => {
  const { t } = useGeekShop();
  const [urlValue, setUrlValue] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const handleUrlSubmit = () => {
    if (urlValue.trim()) {
      onSearch(urlValue.trim());
    }
  };

  const handleUrlKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUrlSubmit();
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
    onSearch(file);
  }, [onSearch]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  return (
    <div className={styles.imageSearchPopover} role="dialog" aria-label={t('aria.imageSearch')}>
      {/* Header */}
      <div className={styles.popoverHeader}>
        <span className={styles.popoverTitle}>{t('product.imageSearch')}</span>
        <button
          type="button"
          className={styles.popoverClose}
          onClick={onClose}
          aria-label={t('aria.closeImageSearch')}
        >
          <CloseIcon />
        </button>
      </div>

      {/* URL input */}
      <div className={styles.urlSection}>
        <div className={styles.urlInputWrapper}>
          <span className={styles.urlIcon}><LinkIcon /></span>
          <input
            className={styles.urlInput}
            type="url"
            placeholder={t('product.imageSearchUrl')}
            value={urlValue}
            onChange={(e) => setUrlValue(e.target.value)}
            onKeyDown={handleUrlKeyDown}
            // eslint-disable-next-line jsx-a11y/no-autofocus -- Popover opened by user action, focus is expected UX
            autoFocus
          />
          {urlValue && (
            <button
              type="button"
              className={styles.urlSearchBtn}
              onClick={handleUrlSubmit}
            >
              {t('product.imageSearchBtn')}
            </button>
          )}
        </div>
      </div>

      {/* Divider with "or" */}
      <div className={styles.popoverDivider}>
        <span className={styles.dividerLine} />
        <span className={styles.dividerText}>{t('product.imageSearchDrop').split(' ')[0]}</span>
        <span className={styles.dividerLine} />
      </div>

      {/* Drop zone */}
      <div
        ref={dropZoneRef}
        className={cn(styles.dropZone, isDragging && styles.dropZoneActive)}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInputRef.current?.click(); } }}
        role="button"
        tabIndex={0}
        aria-label={t('aria.imageDropZone')}
      >
        {preview ? (
          <img src={preview} alt="" className={styles.previewImg} />
        ) : (
          <>
            <span className={styles.dropIcon}><ImageIcon /></span>
            <span className={styles.dropText}>{t('product.imageSearchDrop')}</span>
          </>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className={styles.fileInput}
          onChange={handleFileInput}
          tabIndex={-1}
        />
      </div>
    </div>
  );
};

/* ---------- Main Component ---------- */

export const DesktopSearchBar = forwardRef<HTMLDivElement, DesktopSearchBarProps>(
  (
    {
      value: valueProp,
      defaultValue = '',
      onChange,
      onSubmit,
      onClear,
      placeholder = 'Search products...',
      categories,
      selectedCategory,
      onCategoryChange,
      onImageSearch,
      showImageSearch = true,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const { t } = useGeekShop();
    const inputRef = useRef<HTMLInputElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const cameraButtonRef = useRef<HTMLButtonElement>(null);
    const [imageSearchOpen, setImageSearchOpen] = useState(false);

    const [value, setValue] = useControllableState({
      value: valueProp,
      defaultValue,
      onChange,
    });

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onSubmit?.(value);
      }
    };

    const handleClear = () => {
      setValue('');
      onClear?.();
      inputRef.current?.focus();
    };

    const handleSubmit = () => {
      onSubmit?.(value);
    };

    const handleImageSearch = useCallback((source: string | File) => {
      onImageSearch?.(source);
      setImageSearchOpen(false);
    }, [onImageSearch]);

    // Close popover on outside click
    useEffect(() => {
      if (!imageSearchOpen) return;
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Node;
        if (
          popoverRef.current && !popoverRef.current.contains(target) &&
          cameraButtonRef.current && !cameraButtonRef.current.contains(target)
        ) {
          setImageSearchOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [imageSearchOpen]);

    // Close on Escape
    useEffect(() => {
      if (!imageSearchOpen) return;
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setImageSearchOpen(false);
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [imageSearchOpen]);

    return (
      <div ref={ref} className={cn(styles.wrapper, className)} {...rest}>
        <div className={styles.searchBar}>
          {/* Category selector */}
          {categories && categories.length > 0 && (
            <>
              <div className={styles.categorySelect}>
                <select
                  className={styles.select}
                  value={selectedCategory}
                  onChange={(e) => onCategoryChange?.(e.target.value)}
                  aria-label={t('aria.searchCategory')}
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                <span className={styles.selectArrow}>
                  <ChevronDownIcon />
                </span>
              </div>
              <span className={styles.separator} />
            </>
          )}

          {/* Search icon */}
          <span className={styles.searchIcon}>
            <SearchIcon />
          </span>

          {/* Input */}
          <input
            ref={inputRef}
            className={styles.input}
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label={t('aria.search')}
          />

          {/* Clear button */}
          {value && (
            <button
              className={styles.clearBtn}
              onClick={handleClear}
              aria-label={t('aria.clearSearch')}
              type="button"
            >
              <ClearIcon />
            </button>
          )}

          {/* Image search button */}
          {showImageSearch && onImageSearch && (
            <>
              <span className={styles.separator} />
              <button
                ref={cameraButtonRef}
                className={cn(styles.cameraBtn, imageSearchOpen && styles.cameraBtnActive)}
                onClick={() => setImageSearchOpen((prev) => !prev)}
                aria-label={t('aria.imageSearch')}
                aria-expanded={imageSearchOpen}
                type="button"
              >
                <CameraIcon />
              </button>
            </>
          )}

          {/* Submit button */}
          <button
            className={styles.submitBtn}
            onClick={handleSubmit}
            aria-label={t('aria.search')}
            type="button"
          >
            Search
          </button>
        </div>

        {/* Image search popover */}
        {imageSearchOpen && onImageSearch && (
          <div ref={popoverRef} className={styles.popoverAnchor}>
            <ImageSearchPopover
              onSearch={handleImageSearch}
              onClose={() => setImageSearchOpen(false)}
            />
          </div>
        )}
      </div>
    );
  },
);

DesktopSearchBar.displayName = 'DesktopSearchBar';
