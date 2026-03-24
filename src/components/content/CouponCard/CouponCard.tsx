'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, type MouseEventHandler, type HTMLAttributes, type CSSProperties } from 'react';
import { useGeekShop } from '../../../i18n';
import styles from './CouponCard.module.scss';

export interface CouponCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Discount text (e.g. "-10%", "-15%", "50 000") */
  discount: string;
  /** Coupon code */
  code: string;
  /** Expiry date string */
  expiryDate: string;
  /** Minimum order amount in so'm */
  minAmount?: number;
  /** Background color for the left discount area */
  color?: string;
  /** Click handler for the "Foydalanish" button */
  onUse?: MouseEventHandler<HTMLButtonElement>;
  /** Link URL — when provided, renders as <a> */
  href?: string;
  /** Link target */
  target?: string;
}

export const CouponCard = forwardRef<HTMLDivElement, CouponCardProps>(
  (
    {
      discount,
      code,
      expiryDate,
      minAmount,
      color = 'var(--gs-color-primary, #FF5000)',
      onUse,
      href,
      target,
      className,
      ...rest
    },
    ref,
  ) => {
  const { t, formatPrice } = useGeekShop();
  const Wrapper = href ? 'a' : 'div';
  const linkProps = href ? { href, target } : {};

  return (
    <Wrapper ref={ref as React.Ref<HTMLDivElement & HTMLAnchorElement>} className={cn(styles.couponCard, className)} {...linkProps} {...rest}>
      <div className={styles.leftPart} style={{ '--gs-coupon-bg': color } as CSSProperties}>
        <div className={styles.discountCircleTop} />
        <div className={styles.discountCircleBottom} />
        <span className={styles.discountText}>{discount}</span>
        {minAmount && (
          <span className={styles.minAmount}>
            {t('coupon.minAmount', { amount: formatPrice(minAmount) })}
          </span>
        )}
      </div>

      <div className={styles.divider}>
        <div className={styles.cutoutTop} />
        <div className={styles.dashedLine} />
        <div className={styles.cutoutBottom} />
      </div>

      <div className={styles.rightPart}>
        <div className={styles.codeRow}>
          <span className={styles.codeLabel}>{t('coupon.code')}</span>
          <span className={styles.codeValue}>{code}</span>
        </div>
        <span className={styles.expiry}>{t('coupon.expiry', { date: expiryDate })}</span>
        <button className={styles.useButton} onClick={onUse}>
          {t('coupon.use')}
        </button>
      </div>
    </Wrapper>
  );
  },
);

CouponCard.displayName = 'CouponCard';
