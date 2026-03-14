import styles from './Divider.module.scss';

export type DividerVariant = 'full' | 'inset' | 'withText';

export interface DividerProps {
  /** Divider variant */
  variant?: DividerVariant;
  /** Text shown in the center (only for withText variant) */
  text?: string;
  /** Whether the divider is vertical */
  vertical?: boolean;
}

export function Divider({
  variant = 'full',
  text,
  vertical = false,
}: DividerProps) {
  if (vertical) {
    return <span className={styles.vertical} />;
  }

  if (variant === 'withText' && text) {
    return (
      <div className={styles.withText}>
        <span className={styles.line} />
        <span className={styles.text}>{text}</span>
        <span className={styles.line} />
      </div>
    );
  }

  return (
    <div className={`${styles.horizontal} ${styles[`variant-${variant}`]}`} />
  );
}

export default Divider;
