import { useState, useMemo } from 'react';
import {
  NavBar,
  Container,
  PaymentMethodCard,
  Button,
  Empty,
  Popup,
  Toast,
  useGeekShop,
} from '../../components';
import type { PaymentMethod, PaymentType } from '../../components';
import { mockPaymentMethods } from '../_shared';
import styles from './PaymentMethodsPage.module.scss';

/* ---------- SVG Icons ---------- */

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="9" y1="3" x2="9" y2="15" />
    <line x1="3" y1="9" x2="15" y2="9" />
  </svg>
);

const WalletEmptyIcon = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
    <circle cx="60" cy="60" r="50" fill="#F5F5F5" />
    <rect x="30" y="42" width="60" height="40" rx="6" stroke="#CCCCCC" strokeWidth="3" fill="none" />
    <path d="M30 54h60" stroke="#CCCCCC" strokeWidth="3" />
    <circle cx="80" cy="66" r="4" fill="#D4D4D4" />
    <path d="M44 42V38a6 6 0 016-6h24a6 6 0 016 6v4" stroke="#D4D4D4" strokeWidth="2" />
  </svg>
);

/* ---------- Group helpers ---------- */

const CARD_TYPES: PaymentType[] = ['uzcard', 'humo', 'visa', 'mastercard'];
const WALLET_TYPES: PaymentType[] = ['payme', 'click'];

function groupPaymentMethods(methods: PaymentMethod[]) {
  const cards = methods.filter((m) => CARD_TYPES.includes(m.type));
  const wallets = methods.filter((m) => WALLET_TYPES.includes(m.type));
  const cash = methods.filter((m) => m.type === 'cash');
  return { cards, wallets, cash };
}

/* ---------- Props ---------- */

export interface PaymentMethodsPageProps {
  /** Show empty state with no payment methods */
  empty?: boolean;
  /** Show delete confirmation popup */
  showDeleteConfirm?: boolean;
}

/* ---------- Component ---------- */

export const PaymentMethodsPage: React.FC<PaymentMethodsPageProps> = ({
  empty = false,
  showDeleteConfirm = false,
}) => {
  const { t } = useGeekShop();

  const [methods, setMethods] = useState<PaymentMethod[]>(
    empty ? [] : mockPaymentMethods,
  );
  const [deleteTarget, setDeleteTarget] = useState<PaymentMethod | null>(
    showDeleteConfirm ? mockPaymentMethods[1] : null,
  );
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const { cards, wallets, cash } = useMemo(
    () => groupPaymentMethods(methods),
    [methods],
  );

  const handleDeleteRequest = (method: PaymentMethod) => {
    setDeleteTarget(method);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      setMethods((prev) => prev.filter((m) => m.id !== deleteTarget.id));
      setToastMessage(t('common.cardDeleted'));
      setToastVisible(true);
    }
    setDeleteTarget(null);
  };

  const handleDeleteCancel = () => {
    setDeleteTarget(null);
  };

  const hasAny = methods.length > 0;

  return (
    <div className={styles.page}>
      <NavBar title={t('common.back')} showBack onBack={() => {}}>
        <span className={styles.navTitle}>{t('page.paymentMethods')}</span>
      </NavBar>

      <Container hasNavbar>
        {!hasAny ? (
          <div className={styles.emptyWrap}>
            <Empty
              icon={<WalletEmptyIcon />}
              title={t('payment.empty')}
              description={t('payment.emptyDescription')}
              actionText={t('common.addCard')}
              onAction={() => {}}
            />
          </div>
        ) : (
          <>
            {/* Cards section */}
            {cards.length > 0 && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>{t('payment.cards')}</h3>
                <div className={styles.methodList}>
                  {cards.map((method) => (
                    <PaymentMethodCard
                      key={method.id}
                      method={method}
                      onDelete={handleDeleteRequest}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Wallets section */}
            {wallets.length > 0 && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>{t('payment.wallets')}</h3>
                <div className={styles.methodList}>
                  {wallets.map((method) => (
                    <PaymentMethodCard
                      key={method.id}
                      method={method}
                      onDelete={handleDeleteRequest}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Cash section */}
            {cash.length > 0 && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>{t('payment.cashSection')}</h3>
                <div className={styles.methodList}>
                  {cash.map((method) => (
                    <PaymentMethodCard
                      key={method.id}
                      method={method}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Add card button */}
            <div className={styles.addBtnWrap}>
              <Button
                variant="secondary"
                size="full"
                block
                onClick={() => {}}
              >
                <span className={styles.addBtnContent}>
                  <PlusIcon />
                  {t('common.addCard')}
                </span>
              </Button>
            </div>
          </>
        )}
      </Container>

      {/* Delete confirmation popup */}
      <Popup
        visible={deleteTarget !== null}
        position="center"
        title={t('payment.deleteConfirm')}
        closable
        onClose={handleDeleteCancel}
      >
        <div className={styles.deleteConfirm}>
          <p className={styles.deleteText}>
            {t('payment.deleteWarning', { label: deleteTarget?.label ?? '' })}
          </p>
          <div className={styles.deleteActions}>
            <Button variant="secondary" size="md" onClick={handleDeleteCancel}>
              {t('common.cancel')}
            </Button>
            <Button variant="danger" size="md" onClick={handleDeleteConfirm}>
              {t('common.delete')}
            </Button>
          </div>
        </div>
      </Popup>

      {/* Toast */}
      <Toast
        visible={toastVisible}
        message={toastMessage}
        type="success"
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
};
