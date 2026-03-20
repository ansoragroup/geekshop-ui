'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, useId } from 'react';
import type { FormHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import styles from './DesktopForm.module.scss';

export type DesktopFormLayout = 'horizontal' | 'vertical';

export interface DesktopFormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  /** Form submit handler */
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  /** Form content */
  children: ReactNode;
  /** Width of labels in horizontal layout */
  labelWidth?: number;
  /** Form layout direction */
  layout?: DesktopFormLayout;
}

export const DesktopForm = forwardRef<HTMLFormElement, DesktopFormProps>(
  (
    {
      onSubmit,
      children,
      labelWidth = 120,
      layout = 'horizontal',
      className = '',
      ...rest
    },
    ref,
  ) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit?.(e);
    };

    const rootClass = cn(styles.root,
      styles[`layout-${layout}`],
      className);

    return (
      <form
        ref={ref}
        className={rootClass}
        onSubmit={handleSubmit}
        noValidate
        style={{ '--label-width': `${labelWidth}px` } as React.CSSProperties}
        {...rest}
      >
        {children}
      </form>
    );
  },
);

DesktopForm.displayName = 'DesktopForm';

// --- DesktopFormItem ---

export interface DesktopFormItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Label text */
  label?: string;
  /** Whether the field is required (shows asterisk) */
  required?: boolean;
  /** Error message */
  error?: string;
  /** Form item content */
  children: ReactNode;
  /** Description/help text below the control */
  description?: string;
}

export const DesktopFormItem = forwardRef<HTMLDivElement, DesktopFormItemProps>(
  (
    {
      label,
      required = false,
      error,
      children,
      description,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const fieldId = `desktop-form-field-${generatedId}`;

    const rootClass = cn(styles.formItem,
      error && styles.hasError,
      className);

    return (
      <div ref={ref} className={rootClass} {...rest}>
        {label && (
          <label className={styles.label} htmlFor={fieldId}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}

        <div className={styles.control}>
          {children}

          {error && (
            <span className={styles.error} id={`${fieldId}-error`} role="alert">
              {error}
            </span>
          )}

          {!error && description && (
            <span className={styles.description} id={`${fieldId}-desc`}>
              {description}
            </span>
          )}
        </div>
      </div>
    );
  },
);

DesktopFormItem.displayName = 'DesktopFormItem';

// --- DesktopFormDivider ---

export interface DesktopFormDividerProps extends HTMLAttributes<HTMLDivElement> {
  /** Divider label/title */
  title?: string;
}

export const DesktopFormDivider = forwardRef<HTMLDivElement, DesktopFormDividerProps>(
  ({ title, className = '', ...rest }, ref) => {
    const rootClass = cn(styles.divider, className);

    return (
      <div ref={ref} className={rootClass} {...rest}>
        {title && <span className={styles.dividerTitle}>{title}</span>}
        <span className={styles.dividerLine} />
      </div>
    );
  },
);

DesktopFormDivider.displayName = 'DesktopFormDivider';
