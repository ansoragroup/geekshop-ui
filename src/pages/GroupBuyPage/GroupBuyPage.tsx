import { useState } from 'react';
import {
  NavBar,
  Container,
  TabFilter,
  GroupBuyCard,
  Badge,
  SocialProof,
  useGeekShop,
} from '../../components';
import type { GroupBuyProduct } from '../../components';
import { mockProducts } from '../_shared';
import styles from './GroupBuyPage.module.scss';

/* ---------- Icons ---------- */

const FireIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF5000" stroke="none">
    <path d="M12 23c-4.97 0-9-3.58-9-8 0-3.19 2.13-6.1 3.5-7.5.42-.42 1.12-.13 1.12.46 0 1.84.85 3.14 1.88 3.14.56 0 .72-.52.72-1.1 0-2.35 1.9-5 4.78-5 .53 0 .88.48.68.97-.43 1.04-.68 2.13-.68 3.03 0 2.28 1.5 3 2.5 3 .78 0 1.5-.56 1.5-1.5 0-.56.62-.89 1.05-.56C21.25 12.5 21 14.86 21 15c0 4.42-4.03 8-9 8z" />
  </svg>
);

/* ---------- Filter tabs ---------- */

const filterTabKeys = [
  { key: 'all', labelKey: 'groupBuy.allFilter' },
  { key: 'ending', labelKey: 'groupBuy.endingFilter' },
  { key: 'new', labelKey: 'groupBuy.newFilter' },
  { key: 'cheap', labelKey: 'groupBuy.cheapFilter' },
];

/* ---------- Group buy data ---------- */

const groupBuyItems: Array<{
  product: GroupBuyProduct;
  groupSize: number;
  currentMembers: number;
  timeLeft: number;
  memberAvatars: string[];
}> = [
  {
    product: {
      name: mockProducts[0].name,
      image: mockProducts[0].image,
      price: 4_800_000,
      originalPrice: mockProducts[0].price,
    },
    groupSize: 3,
    currentMembers: 2,
    timeLeft: 4 * 3600 + 23 * 60,
    memberAvatars: [
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop',
    ],
  },
  {
    product: {
      name: 'Apple AirPods Pro 2 USB-C',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      price: 1_200_000,
      originalPrice: 1_500_000,
    },
    groupSize: 3,
    currentMembers: 1,
    timeLeft: 2 * 3600 + 10 * 60,
    memberAvatars: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop',
    ],
  },
  {
    product: {
      name: mockProducts[2].name,
      image: mockProducts[2].image,
      price: 1_900_000,
      originalPrice: mockProducts[2].price,
    },
    groupSize: 5,
    currentMembers: 4,
    timeLeft: 1 * 3600 + 5 * 60,
    memberAvatars: [
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop',
    ],
  },
  {
    product: {
      name: mockProducts[4].name,
      image: mockProducts[4].image,
      price: 4_200_000,
      originalPrice: mockProducts[4].price,
    },
    groupSize: 4,
    currentMembers: 1,
    timeLeft: 8 * 3600 + 45 * 60,
    memberAvatars: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop',
    ],
  },
  {
    product: {
      name: mockProducts[5].name,
      image: mockProducts[5].image,
      price: 1_600_000,
      originalPrice: mockProducts[5].price,
    },
    groupSize: 3,
    currentMembers: 2,
    timeLeft: 5 * 3600 + 30 * 60,
    memberAvatars: [
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop',
    ],
  },
];

const TOTAL_GROUPS = 156;

/* ---------- Component ---------- */

export interface GroupBuyPageProps {
  /** Default filter */
  filter?: 'active' | 'ending' | 'new';
}

export const GroupBuyPage: React.FC<GroupBuyPageProps> = ({ filter }) => {
  const { t } = useGeekShop();
  const [activeTab, setActiveTab] = useState(
    filter === 'ending' ? 'ending' : filter === 'new' ? 'new' : 'all'
  );

  const tabs = filterTabKeys.map((f) => ({
    key: f.key,
    label: t(f.labelKey),
  }));

  return (
    <div className={styles.page}>
      {/* NavBar */}
      <NavBar title={t('page.groupBuy')} showBack onBack={() => {}} />

      {/* Announcement banner */}
      <Container>
        <div className={styles.announceBanner}>
          <FireIcon />
          <span className={styles.announceText}>
            {t('groupBuy.todayGroups', { count: TOTAL_GROUPS })}
          </span>
          <Badge type="text" content="HOT" color="primary" position="inline" />
        </div>
      </Container>

      {/* Tab filter */}
      <div className={styles.tabsWrap}>
        <TabFilter tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pill" />
      </div>

      {/* Group buy cards */}
      <div className={styles.content}>
        {groupBuyItems.map((item, index) => (
          <GroupBuyCard
            key={index}
            product={item.product}
            groupSize={item.groupSize}
            currentMembers={item.currentMembers}
            timeLeft={item.timeLeft}
            memberAvatars={item.memberAvatars}
            onJoinGroup={() => {}}
            onBuyAlone={() => {}}
          />
        ))}

        {/* Social proof at bottom */}
        <div className={styles.socialProofWrap}>
          <SocialProof
            count={2340}
            period="bugun"
            variant="text"
            avatars={[
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop',
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop',
              'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop',
              'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop',
            ]}
          />
        </div>
      </div>
    </div>
  );
};
