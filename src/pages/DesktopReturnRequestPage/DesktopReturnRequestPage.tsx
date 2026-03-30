'use client';
import { useState } from 'react';
import {
  DesktopShell,
  DesktopBreadcrumbs,
  DesktopButton,
  DesktopSelect,
  DesktopTextArea,
  DesktopImageUploader,
  DesktopQuantityStepper,
} from '../../components';
import type { DesktopImageFile } from '../../components';
import {
  DefaultTopBar,
  DefaultHeaderRich,
  DefaultMegaMenu,
  DefaultFooter,
  formatPriceUZS,
} from '../_shared';
import styles from './DesktopReturnRequestPage.module.scss';

// ─── Static data ──────────────────────────────────────────────────────────────

const returnReasons = [
  { value: 'defective', label: 'Defective / Broken' },
  { value: 'wrong-item', label: 'Wrong item received' },
  { value: 'changed-mind', label: 'Changed my mind' },
  { value: 'not-as-described', label: 'Not as described' },
  { value: 'other', label: 'Other' },
];

const defaultItem = {
  id: '1',
  image: 'https://picsum.photos/seed/ret-monitor/160/160',
  name: 'LG UltraGear 27" 4K 160Hz Monitor',
  price: 8_500_000,
  maxQuantity: 1,
};

// ─── Component ────────────────────────────────────────────────────────────────

export interface DesktopReturnRequestPageProps {
  orderId?: string;
  item?: typeof defaultItem;
  /** Pre-selected return reason */
  initialReason?: string;
  /** Pre-filled description */
  initialDescription?: string;
  /** Pre-uploaded photos */
  initialPhotos?: DesktopImageFile[];
  /** Refund method: 'original' | 'store-credit' */
  initialRefundMethod?: 'original' | 'store-credit';
}

export const DesktopReturnRequestPage: React.FC<DesktopReturnRequestPageProps> = ({
  orderId = 'GS-2024-5678',
  item: propItem,
  initialReason = '',
  initialDescription = '',
  initialPhotos,
  initialRefundMethod = 'original',
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [reason, setReason] = useState(initialReason);
  const [description, setDescription] = useState(initialDescription);
  const [photos, setPhotos] = useState<DesktopImageFile[]>(initialPhotos ?? []);
  const [refundMethod, setRefundMethod] = useState<'original' | 'store-credit'>(
    initialRefundMethod
  );
  const [quantity, setQuantity] = useState(1);

  const displayItem = propItem ?? defaultItem;
  const refundAmount = displayItem.price * quantity;

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
            { label: `#${orderId}`, href: '#' },
            { label: 'Return Request' },
          ]}
        />
      </div>

      <h1 className={styles.pageTitle}>Return Request</h1>

      <div className={styles.contentGrid}>
        {/* Left column — form */}
        <div className={styles.mainColumn}>
          {/* Item being returned */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Item to Return</h2>
            <div className={styles.returnItem}>
              <img src={displayItem.image} alt={displayItem.name} className={styles.itemImage} />
              <div className={styles.itemDetails}>
                <span className={styles.itemName}>{displayItem.name}</span>
                <span className={styles.itemPrice}>{formatPriceUZS(displayItem.price)}</span>
                <div className={styles.quantityRow}>
                  <span className={styles.quantityLabel}>Return quantity:</span>
                  <DesktopQuantityStepper
                    value={quantity}
                    min={1}
                    max={displayItem.maxQuantity}
                    onChange={setQuantity}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Return reason */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Return Reason</h2>
            <DesktopSelect
              value={reason}
              onChange={(val) => setReason(typeof val === 'string' ? val : val[0] ?? '')}
              placeholder="Select a reason"
              options={returnReasons}
            />
            <div className={styles.fieldGap} />
            <DesktopTextArea
              value={description}
              onChange={setDescription}
              placeholder="Describe the issue in detail..."
              rows={4}
            />
          </div>

          {/* Photo upload */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Upload Photos (Evidence)</h2>
            <p className={styles.uploadHint}>
              Upload photos showing the defect or issue. This helps speed up the return process.
            </p>
            <DesktopImageUploader value={photos} onChange={setPhotos} maxCount={5} />
          </div>

          {/* Refund method */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Refund Method</h2>
            <div className={styles.refundOptions}>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control -- label wraps radio with text in nested spans */}
              <label htmlFor="refund-original" className={styles.refundOption}>
                <input
                  id="refund-original"
                  type="radio"
                  name="refund-method"
                  value="original"
                  checked={refundMethod === 'original'}
                  onChange={() => setRefundMethod('original')}
                  className={styles.radioInput}
                />
                <div className={styles.refundContent}>
                  <span className={styles.refundLabel}>Original Payment Method</span>
                  <span className={styles.refundDesc}>
                    Refund to the card or account used for purchase
                  </span>
                </div>
              </label>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control -- label wraps radio with text in nested spans */}
              <label htmlFor="refund-store-credit" className={styles.refundOption}>
                <input
                  id="refund-store-credit"
                  type="radio"
                  name="refund-method"
                  value="store-credit"
                  checked={refundMethod === 'store-credit'}
                  onChange={() => setRefundMethod('store-credit')}
                  className={styles.radioInput}
                />
                <div className={styles.refundContent}>
                  <span className={styles.refundLabel}>Store Credit</span>
                  <span className={styles.refundDesc}>
                    Receive store credit for faster processing
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right column — summary + CTA */}
        <div className={styles.sideColumn}>
          <div className={styles.summaryCard}>
            <h2 className={styles.cardTitle}>Refund Summary</h2>
            <div className={styles.summaryRow}>
              <span>Item price</span>
              <span>{formatPriceUZS(displayItem.price)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Quantity</span>
              <span>{quantity}</span>
            </div>
            <div className={styles.summaryDivider} />
            <div className={styles.summaryTotal}>
              <span>Refund amount</span>
              <span>{formatPriceUZS(refundAmount)}</span>
            </div>
            <p className={styles.refundNote}>
              {refundMethod === 'store-credit'
                ? 'Store credit will be applied within 24 hours'
                : 'Refund will be processed within 5-7 business days'}
            </p>
          </div>

          <DesktopButton variant="primary" size="lg" fullWidth disabled={!reason}>
            Submit Return Request
          </DesktopButton>
        </div>
      </div>
    </DesktopShell>
  );
};
