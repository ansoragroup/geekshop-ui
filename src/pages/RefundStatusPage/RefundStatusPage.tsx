import {
  NavBar,
  Result,
  Steps,
  SpecsTable,
  Button,
  Divider,
  useGeekShop,
} from '../../components';
import styles from './RefundStatusPage.module.scss';

/* ---------- Props ---------- */

export interface RefundStatusPageProps {
  /** Current refund status */
  status?: 'processing' | 'approved' | 'refunded' | 'rejected';
}

/* ---------- Component ---------- */

const statusConfig = {
  processing: { result: 'info' as const, title: 'refund.processing', desc: 'refund.processingDesc' },
  approved: { result: 'success' as const, title: 'refund.approved', desc: 'refund.approvedDesc' },
  refunded: { result: 'success' as const, title: 'refund.refunded', desc: 'refund.refundedDesc' },
  rejected: { result: 'error' as const, title: 'refund.rejected', desc: 'refund.rejectedDesc' },
};

export const RefundStatusPage: React.FC<RefundStatusPageProps> = ({
  status = 'processing',
}) => {
  const { t, formatPrice } = useGeekShop();
  const config = statusConfig[status];

  const refundAmount = 5_200_000;

  const timelineSteps = [
    { title: t('refund.stepRequested'), description: '14 mart, 2026 — 10:30' },
    { title: t('refund.stepReviewed'), description: status !== 'processing' ? '15 mart, 2026 — 14:00' : undefined },
    { title: t('refund.stepApproved'), description: status === 'refunded' || status === 'approved' ? '15 mart, 2026 — 16:00' : undefined },
    { title: t('refund.stepRefunded'), description: status === 'refunded' ? '16 mart, 2026 — 09:00' : undefined },
  ];

  const currentTimelineStep = (() => {
    switch (status) {
      case 'processing': return 0;
      case 'approved': return 2;
      case 'refunded': return 3;
      case 'rejected': return 1;
    }
  })();

  return (
    <div className={styles.page}>
      <NavBar title={t('page.refundStatus')} showBack onBack={() => {}} />

      <div className={styles.content}>
        {/* Result header */}
        <div className={styles.resultSection}>
          <Result
            status={config.result}
            title={t(config.title)}
            description={t(config.desc)}
          />
        </div>

        {/* Refund amount */}
        <div className={styles.amountCard}>
          <div className={styles.amountLabel}>{t('refund.amount')}</div>
          <div className={styles.amountValue}>{formatPrice(refundAmount)}</div>
          <div className={styles.amountCurrency}>{t('common.currency')}</div>
        </div>

        <Divider />

        {/* Timeline */}
        <div className={styles.timelineSection}>
          <h3 className={styles.sectionTitle}>{t('refund.timeline')}</h3>
          <Steps
            current={currentTimelineStep}
            items={timelineSteps}
            direction="vertical"
          />
        </div>

        <Divider />

        {/* Order info */}
        <div className={styles.orderInfo}>
          <h3 className={styles.sectionTitle}>{t('refund.orderInfo')}</h3>
          <SpecsTable
            specs={[
              { label: t('order.orderId'), value: 'GS-2026031401' },
              { label: t('order.date'), value: '14 mart, 2026' },
              { label: t('refund.method'), value: 'UzCard **** 4523' },
              { label: t('refund.itemCount'), value: '1' },
            ]}
          />
        </div>

        {/* Contact support */}
        <div className={styles.actionSection}>
          <Button variant="secondary" size="lg" block onClick={() => {}}>
            {t('refund.contactSupport')}
          </Button>
        </div>
      </div>
    </div>
  );
};
