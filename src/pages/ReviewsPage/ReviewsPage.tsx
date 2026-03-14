import React, { useState, useCallback } from 'react';
import {
  NavBar,
  Container,
  TabFilter,
  ReviewCard,
  Rating,
  InfiniteScroll,
  Divider,
} from '../../components';
import styles from './ReviewsPage.module.scss';

/* ---------- Rating distribution ---------- */

const ratingDistribution = [
  { stars: 5, count: 156, percentage: 62 },
  { stars: 4, count: 52, percentage: 21 },
  { stars: 3, count: 25, percentage: 10 },
  { stars: 2, count: 12, percentage: 5 },
  { stars: 1, count: 5, percentage: 2 },
];

const totalReviews = 250;
const averageRating = 4.6;

/* ---------- Reviews data ---------- */

const allReviews = [
  {
    id: '1',
    user: { name: 'Dilshod Rahimov', avatar: 'https://picsum.photos/seed/user-1/64/64' },
    rating: 5,
    variant: '8GB / Qora',
    content: 'Ajoyib videokarta! O\'yinlarda juda yaxshi ishlaydi. RTX 4060 1080p da barcha o\'yinlarni ultra sozlamalarda 60+ FPS da chiqaradi. Harorat ham juda past, 65 darajadan oshmadi.',
    images: [
      'https://picsum.photos/seed/review-img-1/200/200',
      'https://picsum.photos/seed/review-img-2/200/200',
    ],
    date: '14 mart, 2026',
    stars: 5,
    hasPhotos: true,
  },
  {
    id: '2',
    user: { name: 'Nodira Karimova' },
    rating: 4,
    variant: '8GB / Qora',
    content: 'Yaxshi mahsulot, lekin qutisi biroz ezilgan holda keldi. Karta o\'zi a\'lo ishlaydi. Yetkazib berish 2 kun oldi, Toshkent ichida tez yetkazishdi.',
    date: '12 mart, 2026',
    stars: 4,
    hasPhotos: false,
  },
  {
    id: '3',
    user: { name: 'Bekzod Tursunov', avatar: 'https://picsum.photos/seed/user-3/64/64' },
    rating: 5,
    variant: '8GB / Qora',
    content: 'Narxiga ko\'ra eng yaxshi tanlov. Oldingi GTX 1660 dan katta farq bor. DLSS 3 texnologiyasi juda zo\'r ishlaydi.',
    images: [
      'https://picsum.photos/seed/review-img-3/200/200',
      'https://picsum.photos/seed/review-img-4/200/200',
      'https://picsum.photos/seed/review-img-5/200/200',
    ],
    date: '10 mart, 2026',
    stars: 5,
    hasPhotos: true,
  },
  {
    id: '4',
    user: { name: 'Shahlo Abdullayeva' },
    rating: 3,
    variant: '8GB / Qora',
    content: 'O\'rtacha. 4K uchun yetarli emas, lekin 1080p da yaxshi. Ovozi biroz baland.',
    date: '8 mart, 2026',
    stars: 3,
    hasPhotos: false,
  },
  {
    id: '5',
    user: { name: 'Jamshid Aliyev', avatar: 'https://picsum.photos/seed/user-5/64/64' },
    rating: 5,
    content: 'GeekShop dan buyurtma berdim, 1 kunda yetib keldi. Mahsulot original, kafolat ham bor. Juda mamnunman!',
    images: [
      'https://picsum.photos/seed/review-img-6/200/200',
    ],
    date: '5 mart, 2026',
    stars: 5,
    hasPhotos: true,
  },
  {
    id: '6',
    user: { name: 'Malika Ergasheva' },
    rating: 4,
    content: 'Do\'konim uchun sotib oldim. Mijozlar uchun ajoyib tanlov. Narxi ham qulay.',
    date: '3 mart, 2026',
    stars: 4,
    hasPhotos: false,
  },
  {
    id: '7',
    user: { name: 'Otabek Nazarov', avatar: 'https://picsum.photos/seed/user-7/64/64' },
    rating: 2,
    content: 'Kutganimdan past natija ko\'rsatdi. Ehtimol mening kompyuter konfiguratsiyamga mos kelmayapti.',
    date: '1 mart, 2026',
    stars: 2,
    hasPhotos: false,
  },
  {
    id: '8',
    user: { name: 'Zulfiya Raxmatullayeva' },
    rating: 5,
    variant: '8GB / Qora',
    content: 'O\'g\'lim uchun tug\'ilgan kunga sovg\'a qildim. Juda xursand bo\'ldi! Ray tracing effektlari ajoyib ko\'rinadi.',
    images: [
      'https://picsum.photos/seed/review-img-7/200/200',
      'https://picsum.photos/seed/review-img-8/200/200',
    ],
    date: '25 fevral, 2026',
    stars: 5,
    hasPhotos: true,
  },
];

/* ---------- Tab definitions ---------- */

const tabs = [
  { key: 'all', label: 'Barchasi', badge: 250 },
  { key: 'photos', label: 'Rasmli' },
  { key: '5', label: '5 yulduz' },
  { key: '4', label: '4 yulduz' },
  { key: '3', label: '3 yulduz' },
  { key: '2', label: '2 yulduz' },
  { key: '1', label: '1 yulduz' },
];

/* ---------- Star bar chart icon ---------- */

const StarSmall = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFC107" stroke="none">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

/* ---------- Component ---------- */

export const ReviewsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(false);

  const filteredReviews = allReviews.filter((review) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'photos') return review.hasPhotos;
    return review.stars === Number(activeTab);
  });

  const visibleReviews = filteredReviews.slice(0, visibleCount);
  const hasMore = visibleCount < filteredReviews.length;

  const handleLoadMore = useCallback(async () => {
    setLoading(true);
    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    setVisibleCount((prev) => prev + 3);
    setLoading(false);
  }, []);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setVisibleCount(5);
  };

  return (
    <div className={styles.page}>
      <NavBar
        title="Sharhlar"
        showBack
        onBack={() => {}}
      />

      <Container hasNavbar>
        {/* Rating summary */}
        <div className={styles.ratingSummary}>
          <div className={styles.ratingLeft}>
            <span className={styles.ratingBig}>{averageRating}</span>
            <Rating value={averageRating} size="md" showCount={false} />
            <span className={styles.ratingTotal}>{totalReviews} ta baho</span>
          </div>

          <div className={styles.ratingBars}>
            {ratingDistribution.map((item) => (
              <div key={item.stars} className={styles.barRow}>
                <span className={styles.barStars}>
                  {item.stars} <StarSmall />
                </span>
                <div className={styles.barTrack}>
                  <div
                    className={styles.barFill}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className={styles.barCount}>{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* Tab filters */}
        <TabFilter
          tabs={tabs}
          activeTab={activeTab}
          onChange={handleTabChange}
        />

        {/* Reviews list */}
        <InfiniteScroll
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
          loading={loading}
          endContent={<span className={styles.endText}>Barcha sharhlar ko'rsatildi</span>}
        >
          <div className={styles.reviewsList}>
            {visibleReviews.map((review) => (
              <ReviewCard
                key={review.id}
                user={review.user}
                rating={review.rating}
                variant={review.variant}
                content={review.content}
                images={review.images}
                date={review.date}
              />
            ))}
          </div>
        </InfiniteScroll>
      </Container>
    </div>
  );
};

export default ReviewsPage;
