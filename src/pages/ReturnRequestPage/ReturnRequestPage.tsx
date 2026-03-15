import { useState } from 'react';
import {
  NavBar,
  Steps,
  Checkbox,
  RadioGroup,
  Radio,
  TextArea,
  Button,
  Divider,
  SpecsTable,
  useGeekShop,
} from '../../components';
import { mockOrderItems } from '../_shared';
import styles from './ReturnRequestPage.module.scss';

/* ---------- SVG Icons ---------- */

const CameraIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

/* ---------- Props ---------- */

export interface ReturnRequestPageProps {
  /** Current step (0-indexed) */
  step?: number;
}

/* ---------- Return reasons ---------- */

const returnReasons = [
  { value: 'defective', label: 'Nosoz / buzilgan mahsulot' },
  { value: 'wrong_item', label: 'Noto\'g\'ri mahsulot yuborilgan' },
  { value: 'not_as_described', label: 'Tavsifga mos kelmaydi' },
  { value: 'size_issue', label: 'O\'lcham to\'g\'ri emas' },
  { value: 'changed_mind', label: 'Fikrimni o\'zgartirdim' },
  { value: 'other', label: 'Boshqa sabab' },
];

/* ---------- Component ---------- */

export const ReturnRequestPage: React.FC<ReturnRequestPageProps> = ({
  step: initialStep = 0,
}) => {
  const { t, formatPrice } = useGeekShop();
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [uploadedPhotos] = useState<string[]>([]);

  const items = mockOrderItems.slice(0, 3);

  const handleItemToggle = (itemId: string) => {
    setSelectedItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return selectedItems.size > 0;
      case 1: return reason !== '';
      case 2: return true;
      case 3: return true;
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const selectedItemsList = items.filter((i) => selectedItems.has(i.id));
  const refundTotal = selectedItemsList.reduce(
    (sum, i) => sum + i.price * i.quantity, 0,
  );

  const stepItems = [
    { title: t('return.selectItems') },
    { title: t('return.selectReason') },
    { title: t('return.uploadPhotos') },
    { title: t('return.confirm') },
  ];

  return (
    <div className={styles.page}>
      <NavBar
        title={t('page.returnRequest')}
        showBack
        onBack={currentStep > 0 ? handleBack : () => {}}
      />

      {/* Steps indicator */}
      <div className={styles.stepsWrap}>
        <Steps current={currentStep} items={stepItems} direction="horizontal" size="sm" />
      </div>

      <div className={styles.content}>
        {/* Step 0: Select items */}
        {currentStep === 0 && (
          <div className={styles.step}>
            <h3 className={styles.stepTitle}>{t('return.selectItemsDesc')}</h3>
            <div className={styles.itemList}>
              {items.map((item) => (
                <div key={item.id} className={styles.returnItem}>
                  <Checkbox
                    checked={selectedItems.has(item.id)}
                    onChange={() => handleItemToggle(item.id)}
                  />
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.itemImage}
                  />
                  <div className={styles.itemInfo}>
                    <div className={styles.itemName}>{item.name}</div>
                    {item.variant && (
                      <div className={styles.itemVariant}>{item.variant}</div>
                    )}
                    <div className={styles.itemPrice}>
                      {formatPrice(item.price)} x {item.quantity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Select reason */}
        {currentStep === 1 && (
          <div className={styles.step}>
            <h3 className={styles.stepTitle}>{t('return.whyReturn')}</h3>
            <RadioGroup
              value={reason}
              onChange={setReason}
              name="return-reason"
              direction="vertical"
            >
              {returnReasons.map((r) => (
                <Radio key={r.value} value={r.value}>
                  {r.label}
                </Radio>
              ))}
            </RadioGroup>
          </div>
        )}

        {/* Step 2: Upload photos + description */}
        {currentStep === 2 && (
          <div className={styles.step}>
            <h3 className={styles.stepTitle}>{t('return.addEvidence')}</h3>

            {/* Photo upload area */}
            <div className={styles.uploadArea}>
              <button type="button" className={styles.uploadBtn} onClick={() => {}}>
                <CameraIcon />
                <span className={styles.uploadText}>{t('return.addPhotos')}</span>
              </button>
              {uploadedPhotos.map((photo, i) => (
                <div key={i} className={styles.uploadedPhoto}>
                  <img src={photo} alt={`Upload ${i + 1}`} />
                </div>
              ))}
            </div>

            <div className={styles.textAreaWrap}>
              <TextArea
                label={t('return.descriptionLabel')}
                placeholder={t('return.descriptionPlaceholder')}
                value={description}
                onChange={setDescription}
                maxLength={500}
                showCount
                rows={4}
              />
            </div>
          </div>
        )}

        {/* Step 3: Confirm & submit */}
        {currentStep === 3 && (
          <div className={styles.step}>
            <h3 className={styles.stepTitle}>{t('return.reviewSummary')}</h3>

            {/* Selected items summary */}
            <div className={styles.summarySection}>
              <h4 className={styles.summaryLabel}>{t('return.selectedItems')}</h4>
              {selectedItemsList.map((item) => (
                <div key={item.id} className={styles.summaryItem}>
                  <span className={styles.summaryItemName}>{item.name}</span>
                  <span className={styles.summaryItemPrice}>
                    {formatPrice(item.price)}
                  </span>
                </div>
              ))}
            </div>

            <Divider />

            <div className={styles.summaryDetails}>
              <SpecsTable
                specs={[
                  {
                    label: t('return.reason'),
                    value: returnReasons.find((r) => r.value === reason)?.label || '-',
                  },
                  {
                    label: t('return.photos'),
                    value: `${uploadedPhotos.length} ${t('return.photosCount')}`,
                  },
                  {
                    label: t('return.refundAmount'),
                    value: formatPrice(refundTotal),
                  },
                ]}
              />
            </div>

            {description && (
              <>
                <Divider />
                <div className={styles.summaryDesc}>
                  <h4 className={styles.summaryLabel}>{t('return.description')}</h4>
                  <p className={styles.descText}>{description}</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Bottom action */}
      <div className={styles.bottomAction}>
        {currentStep < 3 ? (
          <Button
            variant="primary"
            size="lg"
            block
            onClick={handleNext}
            disabled={!canProceed()}
          >
            {t('common.continue')}
          </Button>
        ) : (
          <Button
            variant="primary"
            size="lg"
            block
            onClick={() => {}}
          >
            {t('return.submit')}
          </Button>
        )}
      </div>
    </div>
  );
};
