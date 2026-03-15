import {
  NavBar,
  ProductCard,
  Empty,
  Divider,
  useGeekShop,
} from '../../components';
import { mockProducts } from '../_shared';
import styles from './BrowsingHistoryPage.module.scss';

/* ---------- SVG Icons ---------- */

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

/* ---------- Props ---------- */

export interface BrowsingHistoryPageProps {
  /** Whether the history is empty */
  empty?: boolean;
}

/* ---------- Group products by "date" ---------- */

interface DateGroup {
  label: string;
  products: typeof mockProducts;
}

const todayProducts = mockProducts.slice(0, 4);
const yesterdayProducts = mockProducts.slice(4, 8);
const thisWeekProducts = mockProducts.slice(8, 12);

const dateGroups: DateGroup[] = [
  { label: 'Bugun', products: todayProducts },
  { label: 'Kecha', products: yesterdayProducts },
  { label: 'Shu hafta', products: thisWeekProducts },
];

/* ---------- Component ---------- */

export const BrowsingHistoryPage: React.FC<BrowsingHistoryPageProps> = ({
  empty = false,
}) => {
  const { t } = useGeekShop();

  return (
    <div className={styles.page}>
      <NavBar
        title={t('page.browsingHistory')}
        showBack
        onBack={() => {}}
        rightActions={
          empty
            ? []
            : [
                {
                  key: 'clear',
                  icon: <TrashIcon />,
                  onClick: () => {},
                  ariaLabel: t('history.clearAll'),
                },
              ]
        }
      />

      {empty ? (
        <div className={styles.emptyWrap}>
          <Empty
            title={t('history.empty')}
            description={t('history.emptyDesc')}
            actionText={t('history.goShopping')}
            onAction={() => {}}
          />
        </div>
      ) : (
        <div className={styles.content}>
          {dateGroups.map((group, gi) => (
            <div key={group.label} className={styles.dateGroup}>
              <h3 className={styles.dateLabel}>{group.label}</h3>
              <div className={styles.productGrid}>
                {group.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    image={product.image}
                    title={product.name}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    badge={product.badge as 'new' | 'top' | 'hot' | undefined}
                  />
                ))}
              </div>
              {gi < dateGroups.length - 1 && <Divider />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
