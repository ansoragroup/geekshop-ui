import { useState } from 'react';
import {
  NavBar,
  Container,
  Input,
  Button,
  Checkbox,
  Divider,
  Toast,
  useGeekShop,
} from '../../components';
import { mockAddresses } from '../_shared';
import styles from './AddressFormPage.module.scss';

/* ---------- Icons ---------- */

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const WorkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
  </svg>
);

const PinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

/* ---------- Types ---------- */

type AddressLabel = 'home' | 'work' | 'other';

interface FormData {
  label: AddressLabel;
  name: string;
  phone: string;
  street: string;
  apartment: string;
  city: string;
  region: string;
  postalCode: string;
  isDefault: boolean;
}

interface FormErrors {
  name?: string;
  phone?: string;
  street?: string;
  city?: string;
  region?: string;
}

/* ---------- Props ---------- */

export interface AddressFormPageProps {
  /** Form mode: 'add' for new address, 'edit' to pre-fill with existing */
  mode?: 'add' | 'edit';
  /** Address ID to edit (loads from mock data when mode='edit') */
  addressId?: number;
  /** Show validation errors */
  showErrors?: boolean;
}

/* ---------- Component ---------- */

export const AddressFormPage: React.FC<AddressFormPageProps> = ({
  mode = 'add',
  addressId,
  showErrors = false,
}) => {
  const { t } = useGeekShop();

  // Pre-fill form for edit mode
  const editAddress = mode === 'edit' ? mockAddresses[addressId ?? 0] : null;

  const [form, setForm] = useState<FormData>(() => {
    if (editAddress) {
      return {
        label: editAddress.label === 'Uy' ? 'home' : editAddress.label === 'Ish' ? 'work' : 'other',
        name: editAddress.name,
        phone: editAddress.phone,
        street: editAddress.street.split(',')[0] + ', ' + editAddress.street.split(',')[1]?.trim().split('-')[0] + '-uy',
        apartment: editAddress.street.includes('xonadon') ? '42' : '',
        city: editAddress.city,
        region: editAddress.region,
        postalCode: editAddress.postalCode,
        isDefault: editAddress.isDefault,
      };
    }
    return {
      label: 'home',
      name: '',
      phone: '',
      street: '',
      apartment: '',
      city: '',
      region: '',
      postalCode: '',
      isDefault: false,
    };
  });

  const [errors, setErrors] = useState<FormErrors>(() => {
    if (showErrors) {
      return {
        name: 'Ismingizni kiriting',
        phone: 'Telefon raqamni kiriting',
        street: 'Manzilni kiriting',
      };
    }
    return {};
  });

  const [toastVisible, setToastVisible] = useState(false);

  const labelOptions: { key: AddressLabel; icon: React.ReactNode; labelKey: string }[] = [
    { key: 'home', icon: <HomeIcon />, labelKey: 'address.labelHome' },
    { key: 'work', icon: <WorkIcon />, labelKey: 'address.labelWork' },
    { key: 'other', icon: <PinIcon />, labelKey: 'address.labelOther' },
  ];

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (field in errors) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof FormErrors];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Ismingizni kiriting';
    if (!form.phone.trim()) newErrors.phone = 'Telefon raqamni kiriting';
    if (!form.street.trim()) newErrors.street = 'Manzilni kiriting';
    if (!form.city.trim()) newErrors.city = 'Shaharni kiriting';
    if (!form.region.trim()) newErrors.region = 'Viloyatni kiriting';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      setToastVisible(true);
    }
  };

  const pageTitle = mode === 'edit' ? t('page.editAddress') : t('page.addAddress');

  return (
    <div className={styles.page}>
      <NavBar title={pageTitle} showBack onBack={() => {}} />

      <Container hasNavbar>
        <div className={styles.formContent}>
          {/* Address Label Selector */}
          <div className={styles.section}>
            <span className={styles.sectionLabel}>{t('address.label')}</span>
            <div className={styles.labelSelector}>
              {labelOptions.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  className={`${styles.labelPill} ${form.label === option.key ? styles.labelPillActive : ''}`}
                  onClick={() => updateField('label', option.key)}
                >
                  <span className={styles.labelPillIcon}>{option.icon}</span>
                  <span>{t(option.labelKey)}</span>
                </button>
              ))}
            </div>
          </div>

          <Divider />

          {/* Form Fields */}
          <div className={styles.fields}>
            <Input
              label={t('address.name')}
              value={form.name}
              onChange={(v) => updateField('name', v)}
              placeholder="Jasur Karimov"
              error={errors.name}
              clearable
            />

            <Input
              label={t('address.phone')}
              value={form.phone}
              onChange={(v) => updateField('phone', v)}
              placeholder="+998 90 123 45 67"
              type="tel"
              error={errors.phone}
              clearable
            />

            <Input
              label={t('address.street')}
              value={form.street}
              onChange={(v) => updateField('street', v)}
              placeholder="Amir Temur ko'chasi, 15-uy"
              error={errors.street}
              clearable
            />

            <Input
              label={t('address.apartment')}
              value={form.apartment}
              onChange={(v) => updateField('apartment', v)}
              placeholder="42"
              clearable
            />

            <Input
              label={t('address.city')}
              value={form.city}
              onChange={(v) => updateField('city', v)}
              placeholder="Toshkent"
              error={errors.city}
              clearable
            />

            <Input
              label={t('address.region')}
              value={form.region}
              onChange={(v) => updateField('region', v)}
              placeholder="Toshkent shahri"
              error={errors.region}
              clearable
            />

            <Input
              label={t('address.postalCode')}
              value={form.postalCode}
              onChange={(v) => updateField('postalCode', v)}
              placeholder="100000"
              type="text"
              inputMode="numeric"
              clearable
            />
          </div>

          {/* Default checkbox */}
          <div className={styles.defaultCheck}>
            <Checkbox
              checked={form.isDefault}
              onChange={(checked) => updateField('isDefault', checked)}
              label={t('address.setDefault')}
            />
          </div>

          {/* Save button */}
          <div className={styles.saveWrap}>
            <Button
              variant="primary"
              size="full"
              block
              onClick={handleSave}
            >
              {t('common.save')}
            </Button>
          </div>
        </div>
      </Container>

      {/* Success toast */}
      <Toast
        visible={toastVisible}
        message={t('address.saved')}
        type="success"
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
};
