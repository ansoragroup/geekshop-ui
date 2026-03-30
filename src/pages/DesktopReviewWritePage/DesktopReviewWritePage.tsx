import { useState } from 'react';
import {
  DesktopShell,
  DesktopBreadcrumbs,
  DesktopButton,
  DesktopTextArea,
  DesktopImageUploader,
  DesktopRating,
} from '../../components';
import { DefaultTopBar, DefaultHeaderRich, DefaultMegaMenu, DefaultFooter } from '../_shared';
import styles from './DesktopReviewWritePage.module.scss';

const ratingLabels = ['', 'Terrible', 'Poor', 'Average', 'Good', 'Excellent'];

export interface DesktopReviewWritePageProps {
  /** Product name */
  productName?: string;
  /** Product variant */
  productVariant?: string;
  /** Product image URL */
  productImage?: string;
  /** Pre-set rating (1-5) */
  initialRating?: number;
  /** Pre-filled review text */
  initialReview?: string;
}

export const DesktopReviewWritePage: React.FC<DesktopReviewWritePageProps> = ({
  productName = 'MSI GeForce RTX 4060 Ventus 2X 8GB GDDR6',
  productVariant = '8GB / Qora',
  productImage = 'https://picsum.photos/seed/review-product/100/100',
  initialRating = 0,
  initialReview = '',
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [rating, setRating] = useState(initialRating);
  const [review, setReview] = useState(initialReview);

  const header = (
    <div className={styles.headerWrapper}>
      <DefaultHeaderRich searchValue={searchValue} onSearchChange={setSearchValue} />
      <DefaultMegaMenu />
    </div>
  );

  return (
    <DesktopShell topBar={<DefaultTopBar />} header={header} footer={<DefaultFooter />}>
      <div className={styles.breadcrumbs}>
        <DesktopBreadcrumbs
          items={[
            { label: 'Home', href: '#' },
            { label: 'My Orders', href: '#' },
            { label: 'Order #GS-2026-0315-001', href: '#' },
            { label: 'Write Review' },
          ]}
        />
      </div>

      <div className={styles.centerWrap}>
        <div className={styles.card}>
          <h1 className={styles.pageTitle}>Write a Review</h1>

          {/* Product summary */}
          <div className={styles.productSummary}>
            <img src={productImage} alt={productName} className={styles.productImage} />
            <div className={styles.productInfo}>
              <h2 className={styles.productName}>{productName}</h2>
              <p className={styles.productVariant}>{productVariant}</p>
            </div>
          </div>

          {/* Rating */}
          <div className={styles.ratingSection}>
            <h3 className={styles.sectionLabel}>Overall Rating</h3>
            <div className={styles.ratingRow}>
              <DesktopRating value={rating} size={32} onChange={setRating} />
              {rating > 0 && <span className={styles.ratingLabel}>{ratingLabels[rating]}</span>}
            </div>
          </div>

          {/* Review text */}
          <div className={styles.reviewSection}>
            <h3 className={styles.sectionLabel}>Your Review</h3>
            <DesktopTextArea
              placeholder="Share your experience with this product. What did you like? What could be improved?"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={6}
            />
            <p className={styles.charCount}>{review.length}/2000</p>
          </div>

          {/* Photos */}
          <div className={styles.photoSection}>
            <h3 className={styles.sectionLabel}>Add Photos (optional)</h3>
            <DesktopImageUploader maxCount={5} maxSize={10 * 1024 * 1024} onChange={() => {}} />
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <DesktopButton variant="ghost" size="lg">
              Cancel
            </DesktopButton>
            <DesktopButton
              variant="primary"
              size="lg"
              disabled={rating === 0 || review.length < 10}
            >
              Submit Review
            </DesktopButton>
          </div>
        </div>
      </div>
    </DesktopShell>
  );
};
