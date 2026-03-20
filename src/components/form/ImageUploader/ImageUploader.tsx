import { cn } from '../../../utils/cn';
'use client';
import { forwardRef, useRef, useCallback } from 'react';
import type { HTMLAttributes } from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import { useGeekShop } from '../../../i18n';
import styles from './ImageUploader.module.scss';

export interface ImageUploaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Uploaded image URLs (controlled) */
  value?: stringcn(];
  /** Default image URLs (uncontrolled) */
  defaultValue?: string[];
  /** Change handler */
  onChange?: (urls: string[]) => void;
  /** Maximum number of images */
  maxCount?: number;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Accepted file types */
  accept?: string;
  /** Whether the uploader is disabled */
  disabled?: boolean;
  /** Number of columns in the grid */
  columns?: number;
  /** Upload handler - receives File, should return URL */
  onUpload?: (file: File) => Promise<string>;
  /** Whether images can be deleted */
  deletable?: boolean;
  /** Called when a file exceeds maxSize */
  onSizeError?: (file: File) => void;
}

const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const DeleteIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <circle cx="6" cy="6" r="6" fill="rgba(0,0,0,0.5)" />
    <path d="M4 4l4 4M8 4l-4 4" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

export const ImageUploader = forwardRef<HTMLDivElement, ImageUploaderProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onChange,
      maxCount = 5,
      maxSize = 5 * 1024 * 1024,
      accept = 'image/*',
      disabled = false,
      columns = 3,
      onUpload,
      deletable = true,
      onSizeError,
      className,
      ...rest
    },
    ref,
  ) => {
    const { t } = useGeekShop();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [images, setImages] = useControllableState<string[]>({
      value: controlledValue,
      defaultValue: defaultValue ?? [],
      onChange,
    });

    const canAddMore = images.length < maxCount;

    const handleAddClick = useCallback(() => {
      if (disabled || !canAddMore) return;
      fileInputRef.current?.click();
    }, [disabled, canAddMore]);

    const handleFileChange = useCallback(
      async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const remainingSlots = maxCount - images.length;
        const filesToProcess = Array.from(files).slice(0, remainingSlots);

        for (const file of filesToProcess) {
          if (file.size > maxSize) {
            onSizeError?.(file);
            continue;
          }

          if (onUpload) {
            try {
              const url = await onUpload(file);
              setImages((prev: string[]) => [...prev, url]);
            } catch {
              // Upload failed - silently skip
            }
          } else {
            // No upload handler: use local object URL
            const url = URL.createObjectURL(file);
            setImages((prev: string[]) => [...prev, url]);
          }
        }

        // Reset input so the same file can be selected again
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      },
      [images.length, maxCount, maxSize, onUpload, onSizeError, setImages],
    );

    const handleDelete = useCallback(
      (index: number) => {
        if (disabled) return;
        setImages((prev: string[]) => prev.filter((_, i) => i !== index));
      },
      [disabled, setImages],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleAddClick();
        }
      },
      [handleAddClick],
    );

    const rootClass = [
      styles.root,
      disabled && styles.disabled,
      className,);

    return (
      <div
        ref={ref}
        className={rootClass}
        style={{ '--image-columns': columns } as React.CSSProperties}
        {...rest}
      >
        <div className={styles.grid}>
          {images.map((url, index) => (
            <div key={`${url}-${index}`} className={styles.imageItem}>
              <img
                src={url}
                alt={`${t('imageUploader.add')} ${index + 1}`}
                className={styles.image}
                loading="lazy"
              />
              {deletable && !disabled && (
                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(index)}
                  aria-label={t('imageUploader.delete')}
                >
                  <DeleteIcon />
                </button>
              )}
            </div>
          ))}

          {canAddMore && !disabled && (
            <div
              className={styles.addBtn}
              role="button"
              tabIndex={0}
              onClick={handleAddClick}
              onKeyDown={handleKeyDown}
              aria-label={t('imageUploader.add')}
            >
              <PlusIcon />
              <span className={styles.addText}>
                {images.length}/{maxCount}
              </span>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={maxCount - images.length > 1}
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

ImageUploader.displayName = 'ImageUploader';
