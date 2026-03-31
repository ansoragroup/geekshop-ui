import { useState } from 'react';
import {
  NavBar,
  Container,
  Avatar,
  Input,
  Button,
  Divider,
  BottomSheet,
  Toast,
  useGeekShop,
} from '../../components';
import styles from './EditProfilePage.module.scss';

/* ---------- SVG Icons ---------- */

const CameraIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const GalleryIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="M21 15l-5-5L5 21" />
  </svg>
);

const CameraSheetIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const TrashIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6" />
  </svg>
);

/* ---------- Mock Data ---------- */

interface ProfileFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birthDate: string;
  gender: 'male' | 'female';
}

const filledProfile: ProfileFormData = {
  firstName: 'Jasur',
  lastName: 'Karimov',
  phone: '+998 90 123 45 67',
  email: 'jasur@example.com',
  birthDate: '15.03.1995',
  gender: 'male',
};

const emptyProfile: ProfileFormData = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  birthDate: '',
  gender: 'male',
};

/* ---------- Props ---------- */

export interface EditProfilePageProps {
  /** Show empty state for new user */
  empty?: boolean;
  /** Show validation errors */
  showErrors?: boolean;
  /** Show avatar change bottom sheet */
  showAvatarSheet?: boolean;
}

/* ---------- Component ---------- */

export const EditProfilePage: React.FC<EditProfilePageProps> = ({
  empty = false,
  showErrors = false,
  showAvatarSheet = false,
}) => {
  const { t } = useGeekShop();

  const [form, setForm] = useState<ProfileFormData>(empty ? emptyProfile : filledProfile);
  const [sheetOpen, setSheetOpen] = useState(showAvatarSheet);
  const [toastVisible, setToastVisible] = useState(false);

  const formErrors: Record<string, string> = {
    firstName: t('profile.firstName') + ' — ' + t('common.loading').replace('...', ''),
    lastName: t('profile.lastName') + ' — ' + t('common.loading').replace('...', ''),
    phone: t('profile.phone') + ' — ' + t('common.loading').replace('...', ''),
    email: t('profile.email') + ' — ' + t('common.loading').replace('...', ''),
  };

  const updateField = (field: keyof ProfileFormData) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenderSelect = (gender: 'male' | 'female') => {
    setForm((prev) => ({ ...prev, gender }));
  };

  const handleSave = () => {
    setToastVisible(true);
  };

  const handleAvatarClick = () => {
    setSheetOpen(true);
  };

  return (
    <div className={styles.page}>
      <NavBar title={t('page.editProfile')} showBack onBack={() => {}} />

      <Container hasNavbar>
        {/* Avatar section */}
        <div className={styles.avatarSection}>
          <div
            className={styles.avatarWrap}
            role="button"
            tabIndex={0}
            onClick={handleAvatarClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleAvatarClick();
              }
            }}
            aria-label={t('profile.changePhoto')}
          >
            <Avatar
              name={form.firstName ? `${form.firstName} ${form.lastName}` : 'Foydalanuvchi'}
              size="xl"
              src={
                empty
                  ? undefined
                  : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'
              }
            />
            <span className={styles.cameraBadge}>
              <CameraIcon />
            </span>
          </div>
          <button className={styles.changePhotoBtn} onClick={handleAvatarClick} type="button">
            {t('profile.changePhoto')}
          </button>
        </div>

        <Divider />

        {/* Form section */}
        <div className={styles.formSection}>
          <Input
            label={t('profile.firstName')}
            value={form.firstName}
            placeholder={t('profile.firstName')}
            onChange={updateField('firstName')}
            error={showErrors ? formErrors.firstName : undefined}
            clearable
          />

          <Input
            label={t('profile.lastName')}
            value={form.lastName}
            placeholder={t('profile.lastName')}
            onChange={updateField('lastName')}
            error={showErrors ? formErrors.lastName : undefined}
            clearable
          />

          <Input
            label={t('profile.phone')}
            value={form.phone}
            placeholder="+998 XX XXX XX XX"
            type="tel"
            onChange={updateField('phone')}
            error={showErrors ? formErrors.phone : undefined}
            clearable
          />

          <Input
            label={t('profile.email')}
            value={form.email}
            placeholder="email@example.com"
            type="email"
            onChange={updateField('email')}
            error={showErrors ? formErrors.email : undefined}
            clearable
          />

          <Input
            label={t('profile.birthDate')}
            value={form.birthDate}
            placeholder="KK.OO.YYYY"
            onChange={updateField('birthDate')}
            clearable
          />

          {/* Gender selector */}
          <div className={styles.genderField}>
            <span className={styles.genderLabel}>{t('profile.gender')}</span>
            <div className={styles.genderOptions}>
              <div
                className={`${styles.genderOption} ${
                  form.gender === 'male' ? styles.genderSelected : ''
                }`}
                role="radio"
                aria-checked={form.gender === 'male'}
                tabIndex={0}
                onClick={() => handleGenderSelect('male')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleGenderSelect('male');
                  }
                }}
              >
                <span className={styles.radioCircle}>
                  {form.gender === 'male' && <span className={styles.radioDot} />}
                </span>
                <span>{t('profile.male')}</span>
              </div>
              <div
                className={`${styles.genderOption} ${
                  form.gender === 'female' ? styles.genderSelected : ''
                }`}
                role="radio"
                aria-checked={form.gender === 'female'}
                tabIndex={0}
                onClick={() => handleGenderSelect('female')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleGenderSelect('female');
                  }
                }}
              >
                <span className={styles.radioCircle}>
                  {form.gender === 'female' && <span className={styles.radioDot} />}
                </span>
                <span>{t('profile.female')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className={styles.saveBtnWrap}>
          <Button variant="primary" size="full" block onClick={handleSave}>
            {t('common.save')}
          </Button>
        </div>
      </Container>

      {/* Avatar change bottom sheet */}
      <BottomSheet
        visible={sheetOpen}
        title={t('profile.changePhoto')}
        onClose={() => setSheetOpen(false)}
      >
        <div className={styles.sheetOptions}>
          <div
            className={styles.sheetOption}
            role="button"
            tabIndex={0}
            onClick={() => setSheetOpen(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSheetOpen(false);
              }
            }}
          >
            <CameraSheetIcon />
            <span>{t('profile.takePhoto')}</span>
          </div>
          <div
            className={styles.sheetOption}
            role="button"
            tabIndex={0}
            onClick={() => setSheetOpen(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSheetOpen(false);
              }
            }}
          >
            <GalleryIcon />
            <span>{t('profile.chooseFromGallery')}</span>
          </div>
          <Divider />
          <div
            className={`${styles.sheetOption} ${styles.sheetOptionDanger}`}
            role="button"
            tabIndex={0}
            onClick={() => setSheetOpen(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSheetOpen(false);
              }
            }}
          >
            <TrashIcon />
            <span>{t('profile.removePhoto')}</span>
          </div>
        </div>
      </BottomSheet>

      {/* Toast */}
      <Toast
        visible={toastVisible}
        message={t('profile.saved')}
        type="success"
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
};
