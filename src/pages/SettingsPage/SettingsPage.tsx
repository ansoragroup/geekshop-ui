import { useState } from 'react';
import {
  NavBar,
  Container,
  Section,
  Divider,
  Checkbox,
  Button,
  Popup,
  useGeekShop,
} from '../../components';
import { LanguageSwitcher } from '../../components/navigation/LanguageSwitcher';
import { CurrencySwitcher } from '../../components/navigation/CurrencySwitcher';
import styles from './SettingsPage.module.scss';

/* ---------- SVG Icons ---------- */

const ChevronRight = () => (
  <svg className={styles.chevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

/* ---------- Menu Item ---------- */

interface MenuItemProps {
  label: string;
  trailing?: React.ReactNode;
  onClick?: () => void;
}

function MenuItem({ label, trailing, onClick }: MenuItemProps) {
  return (
    <div
      className={styles.menuItem}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label={label}
    >
      <span className={styles.menuLabel}>{label}</span>
      <span className={styles.menuTrailing}>
        {trailing}
        <ChevronRight />
      </span>
    </div>
  );
}

/* ---------- Info Row ---------- */

interface InfoRowProps {
  label: string;
  value: string;
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className={styles.infoRow}>
      <span className={styles.infoLabel}>{label}</span>
      <span className={styles.infoValue}>{value}</span>
    </div>
  );
}

/* ---------- Props ---------- */

export interface SettingsPageProps {
  /** Show the delete account confirmation dialog */
  showDeleteConfirm?: boolean;
}

/* ---------- Component ---------- */

export const SettingsPage: React.FC<SettingsPageProps> = ({
  showDeleteConfirm = false,
}) => {
  const { t } = useGeekShop();

  // Notification toggles
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promoAlerts, setPromoAlerts] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);

  // Delete account popup
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(showDeleteConfirm);

  return (
    <div className={styles.page}>
      <NavBar title={t('page.settings')} showBack onBack={() => {}} />

      <Container hasNavbar>
        {/* Notifications Section */}
        <Section title={t('settings.notifications')}>
          <div className={styles.checkboxGroup}>
            <Checkbox
              checked={orderUpdates}
              label={t('settings.orderUpdates')}
              onChange={setOrderUpdates}
            />
            <Checkbox
              checked={promoAlerts}
              label={t('settings.promoAlerts')}
              onChange={setPromoAlerts}
            />
            <Checkbox
              checked={emailNotifications}
              label={t('settings.emailNotifications')}
              onChange={setEmailNotifications}
            />
            <Checkbox
              checked={pushNotifications}
              label={t('settings.pushNotifications')}
              onChange={setPushNotifications}
            />
          </div>
        </Section>

        <div className={styles.sectionGap} />

        {/* Language Section */}
        <Section title={t('settings.language')}>
          <div className={styles.switcherWrap}>
            <LanguageSwitcher variant="inline" />
          </div>
        </Section>

        <div className={styles.sectionGap} />

        {/* Currency Section */}
        <Section title={t('settings.currency')}>
          <div className={styles.switcherWrap}>
            <CurrencySwitcher variant="inline" />
          </div>
        </Section>

        <div className={styles.sectionGap} />

        {/* Account Section */}
        <Section title={t('settings.account')}>
          <MenuItem
            label={t('settings.changePassword')}
            onClick={() => {}}
          />
          <Divider variant="inset" />
          <MenuItem
            label={t('settings.deleteAccount')}
            onClick={() => setDeleteConfirmVisible(true)}
          />
        </Section>

        <div className={styles.sectionGap} />

        {/* About Section */}
        <Section title={t('settings.about')}>
          <InfoRow label={t('settings.version')} value="1.0.0" />
          <Divider variant="inset" />
          <MenuItem
            label={t('settings.terms')}
            onClick={() => {}}
          />
          <Divider variant="inset" />
          <MenuItem
            label={t('settings.privacy')}
            onClick={() => {}}
          />
        </Section>

        <div className={styles.sectionGap} />

        {/* Logout Button */}
        <div className={styles.logoutSection}>
          <Button variant="secondary" size="full" block onClick={() => {}}>
            {t('settings.logout')}
          </Button>
        </div>
      </Container>

      {/* Delete Account Confirmation Popup */}
      <Popup
        visible={deleteConfirmVisible}
        title={t('settings.deleteAccountConfirm')}
        onClose={() => setDeleteConfirmVisible(false)}
      >
        <div className={styles.deleteConfirm}>
          <p className={styles.deleteWarning}>
            {t('settings.deleteAccountWarning')}
          </p>
          <div className={styles.deleteActions}>
            <Button
              variant="secondary"
              size="md"
              onClick={() => setDeleteConfirmVisible(false)}
            >
              {t('common.cancel')}
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => setDeleteConfirmVisible(false)}
              className={styles.deleteBtn}
            >
              {t('common.confirm')}
            </Button>
          </div>
        </div>
      </Popup>
    </div>
  );
};
