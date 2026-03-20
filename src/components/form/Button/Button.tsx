import { cn } from '../../../utils/cn';
import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'full';

export type ButtonOwnProps<C extends React.ElementType = 'button'> = {
  /** Render as a different element or component */
  as?: C;
  /** Button variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Show loading spinner */
  loading?: boolean;
  /** Full-width block button */
  block?: boolean;
  /** Button content */
  children?: ReactNode;
};

export type ButtonProps<C extends React.ElementType = 'button'> = ButtonOwnProps<C> &
  Omit<React.ComponentPropsWithRef<C>, keyof ButtonOwnProps<C>>;

const LoadingSpinner = () => (
  <svg className={styles.spinner} width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" opacity="0.3" />
    <path d="M8 2a6 6 0 0 1 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Using a type assertion wrapper to support generics with forwardRef
type ButtonComponent = <C extends React.ElementType = 'button'>(
  props: ButtonProps<C>,
) => React.ReactElement | null;

export const Button: ButtonComponent = forwardRef(
  <C extends React.ElementType = 'button'>(
    {
      as,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      block = false,
      children,
      className,
      ...rest
    }: ButtonProps<C>,
    ref: React.Ref<Element>,
  ) => {
    const Component = as || 'button';

    const classNames = cn(styles.button,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      block && styles.block,
      loading && styles.loading,
      disabled && styles.disabled,
      className);

    // Only pass button-specific props when rendering as a <button>
    const buttonSpecificProps =
      Component === 'button'
        ? { disabled: disabled || loading, type: (rest as Record<string, unknown>).type ?? 'button' }
        : {};

    // Remove 'type' from rest when handled above
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { type: _type, ...restWithoutType } = rest as Record<string, unknown> & { type?: unknown };
    const spreadProps = Component === 'button' ? restWithoutType : rest;

    return (
      <Component
        ref={ref}
        className={classNames}
        {...spreadProps}
        {...buttonSpecificProps}
      >
        {loading && <LoadingSpinner />}
        <span className={loading ? styles.contentHidden : styles.content}>
          {children}
        </span>
      </Component>
    );
  },
) as unknown as ButtonComponent;

(Button as { displayName?: string }).displayName = 'Button';
