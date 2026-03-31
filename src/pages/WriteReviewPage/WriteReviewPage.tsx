import { useState, useRef } from 'react';
import { NavBar, Container, Rating, Button, Divider, Toast, useGeekShop } from '../../components';
import styles from './WriteReviewPage.module.scss';

/* ---------- SVG Icons ---------- */

const PlusIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="2" y1="2" x2="12" y2="12" />
    <line x1="12" y1="2" x2="2" y2="12" />
  </svg>
);

/* ---------- Mock Data ---------- */

const mockProduct = {
  name: 'MSI GeForce RTX 4060 Ventus 2X 8GB GDDR6',
  variant: '8GB / Qora',
  image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=80&h=80&fit=crop',
};

const mockImages = [
  'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200&h=200&fit=crop',
];

const MAX_TEXT_LENGTH = 500;
const MAX_IMAGES = 5;

/* ---------- Props ---------- */

export interface WriteReviewPageProps {
  /** Pre-selected rating (1-5) */
  rating?: number;
  /** Whether the textarea has content */
  hasText?: boolean;
  /** Whether images are attached */
  hasImages?: boolean;
  /** Show validation errors */
  showValidation?: boolean;
}

/* ---------- Component ---------- */

export const WriteReviewPage: React.FC<WriteReviewPageProps> = ({
  rating: initialRating = 0,
  hasText = false,
  hasImages = false,
  showValidation = false,
}) => {
  const { t } = useGeekShop();
  const [rating, setRating] = useState(initialRating);
  const [reviewText, setReviewText] = useState(
    hasText
      ? "Juda yaxshi videokarta! O'yinlarda zo'r ishlaydi, harorat past, shovqin kam. Tavsiya qilaman."
      : ''
  );
  const [images, setImages] = useState<string[]>(hasImages ? mockImages : []);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isRatingError = showValidation && rating === 0;
  const canSubmit = rating > 0;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_TEXT_LENGTH) {
      setReviewText(value);
    }
  };

  const handleAddImage = () => {
    if (images.length >= MAX_IMAGES) {
      setToastMessage(t('review.maxImagesError', { max: MAX_IMAGES }));
      setToastType('error');
      setToastVisible(true);
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // In a real app, we'd upload the file. Here we generate a fake URL
    const remaining = MAX_IMAGES - images.length;
    const newFiles = Array.from(files).slice(0, remaining);
    const newUrls = newFiles.map(
      (_, i) =>
        `https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200&h=200&fit=crop&q=${Date.now()}-${i}`
    );
    setImages((prev) => [...prev, ...newUrls]);
    e.target.value = '';
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!canSubmit) {
      setToastMessage(t('review.ratingValidation'));
      setToastType('error');
      setToastVisible(true);
      return;
    }
    setToastMessage(t('review.submitted'));
    setToastType('success');
    setToastVisible(true);
  };

  return (
    <div className={styles.page}>
      <NavBar title={t('page.writeReview')} showBack onBack={() => {}} />

      <Container hasNavbar>
        {/* Product info */}
        <div className={styles.productCard}>
          <img
            src={mockProduct.image}
            alt={mockProduct.name}
            className={styles.productImage}
            width={56}
            height={56}
          />
          <div className={styles.productInfo}>
            <span className={styles.productName}>{mockProduct.name}</span>
            <span className={styles.productVariant}>{mockProduct.variant}</span>
          </div>
        </div>

        <Divider />

        {/* Rating section */}
        <div className={styles.ratingSection}>
          <h3 className={styles.sectionTitle}>{t('review.rateProduct')}</h3>
          <div className={styles.ratingWrap}>
            <Rating value={rating} onChange={setRating} interactive size="lg" showCount={false} />
          </div>
          {isRatingError && (
            <span className={styles.errorText} role="alert">
              {t('review.ratingError')}
            </span>
          )}
        </div>

        <Divider />

        {/* Review text section */}
        <div className={styles.textSection}>
          <h3 className={styles.sectionTitle}>{t('review.yourReview')}</h3>
          <div className={styles.textareaWrap}>
            <textarea
              className={styles.textarea}
              placeholder={t('review.reviewPlaceholder')}
              value={reviewText}
              onChange={handleTextChange}
              rows={5}
              maxLength={MAX_TEXT_LENGTH}
              aria-label={t('review.yourReview')}
            />
            <span className={styles.charCount}>
              {reviewText.length}/{MAX_TEXT_LENGTH}
            </span>
          </div>
        </div>

        <Divider />

        {/* Image upload section */}
        <div className={styles.imageSection}>
          <h3 className={styles.sectionTitle}>{t('review.addPhotos')}</h3>
          <div className={styles.imageGrid}>
            {images.map((src, index) => (
              <div key={src} className={styles.imageThumbnail}>
                <img src={src} alt={`Rasm ${index + 1}`} className={styles.thumbImg} />
                <button
                  className={styles.removeImageBtn}
                  onClick={() => handleRemoveImage(index)}
                  type="button"
                  aria-label={`${index + 1}-rasmni o'chirish`}
                >
                  <CloseIcon />
                </button>
              </div>
            ))}
            {images.length < MAX_IMAGES && (
              <div
                className={styles.addImageBtn}
                role="button"
                tabIndex={0}
                onClick={handleAddImage}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleAddImage();
                  }
                }}
                aria-label={t('review.addPhotos')}
              >
                <PlusIcon />
              </div>
            )}
          </div>
          <span className={styles.imageHint}>{t('review.imageHint', { max: MAX_IMAGES })}</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className={styles.fileInput}
            onChange={handleFileChange}
            aria-hidden="true"
            tabIndex={-1}
          />
        </div>

        <Divider />

        {/* Submit button */}
        <div className={styles.submitWrap}>
          <Button
            variant="primary"
            size="full"
            block
            onClick={handleSubmit}
            disabled={!canSubmit && !showValidation}
          >
            {t('review.submit')}
          </Button>
        </div>
      </Container>

      {/* Toast */}
      <Toast
        visible={toastVisible}
        message={toastMessage}
        type={toastType}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
};
