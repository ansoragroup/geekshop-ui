import { type FC, type MouseEventHandler } from 'react';
import styles from './CouponCard.module.scss';

export interface CouponCardProps {
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
}

function formatPrice(value: number): string {
  return value.toLocaleString('uz-UZ').replace(/,/g, ' ');
}

const CouponCard: FC<CouponCardProps> = ({
  discount,
  code,
  expiryDate,
  minAmount,
  color = '#FF5000',
  onUse,
}) => {
  return (
    <div className={styles.couponCard}>
      <div className={styles.leftPart} style={{ background: color }}>
        <div className={styles.discountCircleTop} />
        <div className={styles.discountCircleBottom} />
        <span className={styles.discountText}>{discount}</span>
        {minAmount && (
          <span className={styles.minAmount}>
            {formatPrice(minAmount)} so'm dan
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
          <span className={styles.codeLabel}>Kod:</span>
          <span className={styles.codeValue}>{code}</span>
        </div>
        <span className={styles.expiry}>Muddati: {expiryDate}</span>
        <button className={styles.useButton} onClick={onUse}>
          Foydalanish
        </button>
      </div>
    </div>
  );
};

export default CouponCard;
