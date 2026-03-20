import { forwardRef, type HTMLAttributes } from 'react';
import { Avatar } from '../Avatar';
import { Rating } from '../Rating';
import styles from './ReviewCard.module.scss';

export interface ReviewCardUser {
  name: string;
  avatar?: string;
}

export interface ReviewCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Reviewer info */
  user: ReviewCardUser;
  /** Star rating 1-5 */
  rating: number;
  /** Purchased variant/SKU */
  variant?: string;
  /** Review text */
  content: string;
  /** Review images */
  images?: string[];
  /** Review date string */
  date: string;
}

export const ReviewCard = forwardRef<HTMLDivElement, ReviewCardProps>(
  ({ user, rating, variant, content, images, date, className = '', ...rest }, ref) => {
    return (
      <article ref={ref} className={`${styles.root} ${className}`} {...rest}>
        {/* Header: avatar + name + date */}
        <div className={styles.header}>
          <Avatar src={user.avatar} name={user.name} size="sm" />
          <div className={styles.headerInfo}>
            <span className={styles.userName}>{user.name}</span>
            <span className={styles.date}>{date}</span>
          </div>
        </div>

        {/* Rating row */}
        <div className={styles.ratingRow}>
          <Rating value={rating} size="sm" showCount={false} />
        </div>

        {/* Variant purchased */}
        {variant && (
          <div className={styles.variant}>
            Varianti: {variant}
          </div>
        )}

        {/* Review text */}
        <p className={styles.content}>{content}</p>

        {/* Review images */}
        {images && images.length > 0 && (
          <div className={styles.images}>
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Rasm ${i + 1}`}
                className={styles.thumbnail}
                loading="lazy"
                width={72}
                height={72}
              />
            ))}
          </div>
        )}
      </article>
    );
  }
);

ReviewCard.displayName = 'ReviewCard';
