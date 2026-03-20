import { cn } from '../../../utils/cn';
'use client';
import { forwardRef, useRef, useImperativeHandle, useId, useCallback, useEffect } from 'react';
import type { TextareaHTMLAttributes } from 'react';
import styles from './TextArea.module.scss';

export interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  /** Label text above textarea */
  label?: string;
  /** Error message shown below textarea */
  error?: string;
  /** Helper text shown below textarea */
  helperText?: string;
  /** Maximum character length */
  maxLength?: number;
  /** Show character count */
  showCount?: boolean;
  /** Auto-resize textarea to fit content */
  autoResize?: boolean;
  /** Change handler (receives string value) */
  onChange?: (value: string) => void;
  /** Native change handler (receives event) */
  onNativeChange?: TextareaHTMLAttributes<HTMLTextAreaElement>cn('onChange'];
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      error,
      helperText,
      maxLength,
      showCount = false,
      autoResize = false,
      onChange,
      onNativeChange,
      disabled = false,
      value = '',
      id: externalId,
      className,
      rows = 4,
      ...rest
    },
    ref,
  ) => {
    const internalRef = useRef<HTMLTextAreaElement>(null);
    useImperativeHandle(ref, () => internalRef.current!, []);

    const generatedId = useId();
    const textareaId = externalId ?? generatedId;

    const adjustHeight = useCallback(() => {
      const textarea = internalRef.current;
      if (!textarea || !autoResize) return;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }, [autoResize]);

    useEffect(() => {
      adjustHeight();
    }, [value, adjustHeight]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e.target.value);
      onNativeChange?.(e);
      adjustHeight();
    };

    const currentLength = typeof value === 'string' ? value.length : 0;

    const rootClass = [
      styles.root,
      error && styles.hasError,
      disabled && styles.disabled,
      className,);

    const showFooter = !!(showCount && maxLength) || !!error || !!helperText;

    return (
      <div className={rootClass}>
        {label && (
          <label className={styles.label} htmlFor={textareaId}>
            {label}
          </label>
        )}

        <div className={styles.textareaWrap}>
          <textarea
            ref={internalRef}
            id={textareaId}
            className={styles.textarea}
            value={value}
            disabled={disabled}
            maxLength={maxLength}
            rows={rows}
            onChange={handleChange}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${textareaId}-error`
                : helperText
                  ? `${textareaId}-helper`
                  : undefined
            }
            {...rest}
          />
        </div>

        {showFooter && (
          <div className={styles.footer}>
            <span className={styles.footerText}>
              {error && (
                <span className={styles.error} id={`${textareaId}-error`} role="alert">
                  {error}
                </span>
              )}
              {!error && helperText && (
                <span className={styles.helper} id={`${textareaId}-helper`}>
                  {helperText}
                </span>
              )}
            </span>
            {showCount && maxLength && (
              <span className={styles.count}>
                {currentLength}/{maxLength}
              </span>
            )}
          </div>
        )}
      </div>
    );
  },
);

TextArea.displayName = 'TextArea';
