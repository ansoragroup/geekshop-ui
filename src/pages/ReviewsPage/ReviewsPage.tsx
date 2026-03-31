import React, { useState, useCallback } from 'react';
import {
  NavBar,
  Container,
  TabFilter,
  ReviewCard,
  Rating,
  InfiniteScroll,
  Divider,
  useGeekShop,
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
    user: {
      name: 'Dilshod Rahimov',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop',
    },
    rating: 5,
    variant: '8GB / Qora',
    content:
      "Ajoyib videokarta! O'yinlarda juda yaxshi ishlaydi. RTX 4060 1080p da barcha o'yinlarni ultra sozlamalarda 60+ FPS da chiqaradi. Harorat ham juda past, 65 darajadan oshmadi.",
    images: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200&h=200&fit=crop',
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
    content:
      "Yaxshi mahsulot, lekin qutisi biroz ezilgan holda keldi. Karta o'zi a'lo ishlaydi. Yetkazib berish 2 kun oldi, Toshkent ichida tez yetkazishdi.",
    date: '12 mart, 2026',
    stars: 4,
    hasPhotos: false,
  },
  {
    id: '3',
    user: {
      name: 'Bekzod Tursunov',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop',
    },
    rating: 5,
    variant: '8GB / Qora',
    content:
      "Narxiga ko'ra eng yaxshi tanlov. Oldingi GTX 1660 dan katta farq bor. DLSS 3 texnologiyasi juda zo'r ishlaydi.",
    images: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1555618568-bfe052310f39?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&h=200&fit=crop',
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
    content: "O'rtacha. 4K uchun yetarli emas, lekin 1080p da yaxshi. Ovozi biroz baland.",
    date: '8 mart, 2026',
    stars: 3,
    hasPhotos: false,
  },
  {
    id: '5',
    user: {
      name: 'Jamshid Aliyev',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop',
    },
    rating: 5,
    content:
      'GeekShop dan buyurtma berdim, 1 kunda yetib keldi. Mahsulot original, kafolat ham bor. Juda mamnunman!',
    images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200&h=200&fit=crop'],
    date: '5 mart, 2026',
    stars: 5,
    hasPhotos: true,
  },
  {
    id: '6',
    user: { name: 'Malika Ergasheva' },
    rating: 4,
    content: "Do'konim uchun sotib oldim. Mijozlar uchun ajoyib tanlov. Narxi ham qulay.",
    date: '3 mart, 2026',
    stars: 4,
    hasPhotos: false,
  },
  {
    id: '7',
    user: {
      name: 'Otabek Nazarov',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop',
    },
    rating: 2,
    content:
      "Kutganimdan past natija ko'rsatdi. Ehtimol mening kompyuter konfiguratsiyamga mos kelmayapti.",
    date: '1 mart, 2026',
    stars: 2,
    hasPhotos: false,
  },
  {
    id: '8',
    user: { name: 'Zulfiya Raxmatullayeva' },
    rating: 5,
    variant: '8GB / Qora',
    content:
      "O'g'lim uchun tug'ilgan kunga sovg'a qildim. Juda xursand bo'ldi! Ray tracing effektlari ajoyib ko'rinadi.",
    images: [
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=200&h=200&fit=crop',
    ],
    date: '25 fevral, 2026',
    stars: 5,
    hasPhotos: true,
  },
];

/* ---------- Tab definition keys ---------- */

const tabKeys = [
  { key: 'all', labelKey: 'common.all', badge: 250 },
  { key: 'photos', labelKey: 'review.photoTab' },
  { key: '5', labelKey: 'review.starTab', labelParams: { count: 5 } },
  { key: '4', labelKey: 'review.starTab', labelParams: { count: 4 } },
  { key: '3', labelKey: 'review.starTab', labelParams: { count: 3 } },
  { key: '2', labelKey: 'review.starTab', labelParams: { count: 2 } },
  { key: '1', labelKey: 'review.starTab', labelParams: { count: 1 } },
];

/* ---------- Star bar chart icon ---------- */

const StarSmall = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFC107" stroke="none">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

/* ---------- Component ---------- */

export const ReviewsPage: React.FC = () => {
  const { t } = useGeekShop();
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

  const tabs = tabKeys.map((tab) => ({
    key: tab.key,
    label: t(tab.labelKey, tab.labelParams),
    badge: tab.badge,
  }));

  return (
    <div className={styles.page}>
      <NavBar title={t('page.reviews')} showBack onBack={() => {}} />

      <Container hasNavbar>
        {/* Rating summary */}
        <div className={styles.ratingSummary}>
          <div className={styles.ratingLeft}>
            <span className={styles.ratingBig}>{averageRating}</span>
            <Rating value={averageRating} size="md" showCount={false} />
            <span className={styles.ratingTotal}>
              {t('review.ratings', { count: totalReviews })}
            </span>
          </div>

          <div className={styles.ratingBars}>
            {ratingDistribution.map((item) => (
              <div key={item.stars} className={styles.barRow}>
                <span className={styles.barStars}>
                  {item.stars} <StarSmall />
                </span>
                <div className={styles.barTrack}>
                  <div className={styles.barFill} style={{ width: `${item.percentage}%` }} />
                </div>
                <span className={styles.barCount}>{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* Tab filters */}
        <TabFilter tabs={tabs} activeTab={activeTab} onChange={handleTabChange} />

        {/* Reviews list */}
        <InfiniteScroll
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
          loading={loading}
          endContent={<span className={styles.endText}>{t('review.allShown')}</span>}
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
