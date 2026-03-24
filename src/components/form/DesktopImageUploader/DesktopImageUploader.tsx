'use client';
import { useGeekShop } from '../../../i18n';
import { cn } from '../../../utils/cn';
import { forwardRef, useRef, useCallback, useState } from 'react';
import type { HTMLAttributes } from 'react';
import styles from './DesktopImageUploader.module.scss';

export interface DesktopImageFile {
  /** Image URL (can be blob or remote) */
  url: string;
  /** File name */
  name: string;
}

export interface DesktopImageUploaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current images (controlled) */
  value?: DesktopImageFile[];
  /** Change handler */
  onChange?: (files: DesktopImageFile[]) => void;
  /** Max number of images */
  maxCount?: number;
  /** Max file size in bytes */
  maxSize?: number;
  /** Accepted file types */
  accept?: string;
  /** Allow multiple file selection */
  multiple?: boolean;
  /** Whether the uploader is disabled */
  disabled?: boolean;
}

const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const UploadIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="var(--gs-text-tertiary, #999)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 21l-5-5-5 5" />
    <path d="M16 16v10" />
    <path d="M27.4 23.4A5 5 0 0024 14h-1.3A8 8 0 104 18.3" />
    <path d="M21 21l-5-5-5 5" />
  </svg>
);

const DeleteIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="7" fill="rgba(0,0,0,0.55)" />
    <path d="M4.5 4.5l5 5M9.5 4.5l-5 5" stroke="var(--gs-bg-card, #fff)" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

export const DesktopImageUploader = forwardRef<HTMLDivElement, DesktopImageUploaderProps>(
  (
    {
      value = [],
      onChange,
      maxCount = 5,
      maxSize = 5 * 1024 * 1024,
      accept = 'image/*',
      multiple = true,
      disabled = false,
      className = '',
      ...rest
    },
    ref,
  ) => {
  const { t } = useGeekShop();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const canAddMore = value.length < maxCount;

    const handleFiles = useCallback(
      (fileList: FileList) => {
        const remainingSlots = maxCount - value.length;
        const filesToProcess = Array.from(fileList).slice(0, remainingSlots);

        const newFiles: DesktopImageFile[] = [];
        for (const file of filesToProcess) {
          if (file.size > maxSize) continue;
          const url = URL.createObjectURL(file);
          newFiles.push({ url, name: file.name });
        }

        if (newFiles.length > 0) {
          onChange?.([...value, ...newFiles]);
        }
      },
      [value, maxCount, maxSize, onChange],
    );

    const handleClick = useCallback(() => {
      if (disabled || !canAddMore) return;
      fileInputRef.current?.click();
    }, [disabled, canAddMore]);

    const handleFileChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        handleFiles(files);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      },
      [handleFiles],
    );

    const handleDelete = useCallback(
      (index: number) => {
        if (disabled) return;
        onChange?.(value.filter((_, i) => i !== index));
      },
      [disabled, value, onChange],
    );

    const handleDragEnter = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (disabled || !canAddMore) return;
        setIsDragging(true);
      },
      [disabled, canAddMore],
    );

    const handleDragLeave = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    }, []);

    const handleDrop = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (disabled || !canAddMore) return;
        const files = e.dataTransfer.files;
        if (files.length > 0) {
          handleFiles(files);
        }
      },
      [disabled, canAddMore, handleFiles],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      },
      [handleClick],
    );

    const rootClass = cn(
      styles.root,
      disabled && styles.disabled,
      className);

    return (
      <div ref={ref} className={rootClass} {...rest}>
        {/* Drop zone */}
        {canAddMore && !disabled && (
          <div
            className={cn(styles.dropzone, isDragging ? styles.dragging : '')}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            role="button"
            tabIndex={0}
            aria-label={t('aria.uploadImages')}
          >
            <UploadIcon />
            <span className={styles.dropzoneText}>
              Drag and drop images here, or click to browse
            </span>
            <span className={styles.dropzoneHint}>
              {value.length}/{maxCount} images
            </span>
          </div>
        )}

        {/* Preview grid */}
        {value.length > 0 && (
          <div className={styles.grid}>
            {value.map((file, index) => (
              <div key={`${file.url}-${index}`} className={styles.imageItem}>
                <img
                  src={file.url}
                  alt={file.name}
                  className={styles.image}
                  loading="lazy"
                />
                {!disabled && (
                  <button
                    type="button"
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(index)}
                    aria-label={`Remove ${file.name}`}
                  >
                    <DeleteIcon />
                  </button>
                )}
                <span className={styles.imageName}>{file.name}</span>
              </div>
            ))}

            {/* Small add button in grid */}
            {canAddMore && !disabled && (
              <div
                className={styles.addBtn}
                role="button"
                tabIndex={0}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                aria-label={t('aria.addMoreImages')}
              >
                <PlusIcon />
              </div>
            )}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple && maxCount - value.length > 1}
          className={styles.fileInput}
          onChange={handleFileChange}
          disabled={disabled}
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>
    );
  },
);

DesktopImageUploader.displayName = 'DesktopImageUploader';
