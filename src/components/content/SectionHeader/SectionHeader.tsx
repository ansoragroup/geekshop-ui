'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, type ElementType, type MouseEventHandler } from 'react';
import { useGeekShop } from '../../../i18n';
import styles from './SectionHeader.module.scss';

export interface SectionHeaderOwnProps {
  /** Section title */
  title: string;
  /** Item count shown next to "see all" (e.g. "20 ta") */
  count?: number;
  /** Optional SVG icon displayed before the title */
  icon?: React.ReactNode;
  /** Click handler for "View all" link */
  onViewAll?: MouseEventHandler<HTMLButtonElement>;
}

export type SectionHeaderProps<C extends ElementType = 'div'> = SectionHeaderOwnProps & {
  as?: C;
} & Omit<React.ComponentPropsWithoutRef<C>, keyof SectionHeaderOwnProps | 'as'>;

function SectionHeaderInner<C extends ElementType = 'div'>(
  {
    as,
    title,
    count,
    icon,
    onViewAll,
    className,
    ...rest
  }: SectionHeaderProps<C>,
  ref: React.Ref<Element>,
) {
  const Component = as || 'div';
  const { t } = useGeekShop();

  return (
    <Component ref={ref} className={cn(styles.sectionHeader, className)} {...rest}>
      <div className={styles.left}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <h3 className={styles.title}>{title}</h3>
      </div>

      {onViewAll && (
        <button className={styles.viewAll} onClick={onViewAll}>
          {count !== undefined && (
            <span className={styles.count}>{t('content.count', { count })}</span>
          )}
          <svg
            className={styles.arrow}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 3l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </Component>
  );
}

export const SectionHeader = forwardRef(SectionHeaderInner) as <C extends ElementType = 'div'>(
  props: SectionHeaderProps<C> & { ref?: React.Ref<Element> }
) => JSX.Element;

(SectionHeader as { displayName?: string }).displayName = 'SectionHeader';
