import { useState } from 'react';
import {
  NavBar,
  Container,
  AddressCard,
  Button,
  Empty,
  Popup,
  Toast,
  useGeekShop,
} from '../../components';
import type { Address } from '../../components';
import styles from './AddressListPage.module.scss';

/* ---------- SVG Icons ---------- */

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="9" y1="3" x2="9" y2="15" />
    <line x1="3" y1="9" x2="15" y2="9" />
  </svg>
);

/* ---------- Mock Data ---------- */

const mockAddresses: Address[] = [
  {
    id: 'addr-1',
    name: 'Jasur Karimov',
    phone: '+998 90 123 45 67',
    street: 'Amir Temur ko\'chasi, 15-uy, 42-xonadon',
    city: 'Toshkent',
    region: 'Toshkent shahri',
    postalCode: '100000',
    isDefault: true,
    label: 'Uy',
  },
  {
    id: 'addr-2',
    name: 'Jasur Karimov',
    phone: '+998 90 123 45 67',
    street: 'Mustaqillik ko\'chasi, 59-uy, 3-qavat',
    city: 'Toshkent',
    region: 'Chilonzor tumani',
    postalCode: '100115',
    isDefault: false,
    label: 'Ish',
  },
  {
    id: 'addr-3',
    name: 'Anvar Karimov',
    phone: '+998 71 234 56 78',
    street: 'Navoiy ko\'chasi, 28-uy',
    city: 'Toshkent',
    region: 'Yakkasaroy tumani',
    postalCode: '100028',
    isDefault: false,
    label: 'Ota-ona',
  },
];

/* ---------- Props ---------- */

export interface AddressListPageProps {
  /** Show empty state with no addresses */
  empty?: boolean;
  /** Show delete confirmation popup */
  showDeleteConfirm?: boolean;
}

/* ---------- Component ---------- */

export const AddressListPage: React.FC<AddressListPageProps> = ({
  empty = false,
  showDeleteConfirm = false,
}) => {
  const { t } = useGeekShop();

  const [addresses, setAddresses] = useState<Address[]>(empty ? [] : mockAddresses);
  const [deleteTarget, setDeleteTarget] = useState<Address | null>(
    showDeleteConfirm ? mockAddresses[1] : null,
  );
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleEdit = (_address: Address) => {
    // navigation would happen here
  };

  const handleDeleteRequest = (address: Address) => {
    setDeleteTarget(address);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      setAddresses((prev) => prev.filter((a) => a.id !== deleteTarget.id));
      setToastMessage(`"${deleteTarget.label}" ${t('address.deletedToast')}`);
      setToastVisible(true);
    }
    setDeleteTarget(null);
  };

  const handleDeleteCancel = () => {
    setDeleteTarget(null);
  };

  return (
    <div className={styles.page}>
      <NavBar title={t('address.myAddresses')} showBack onBack={() => {}}>
      </NavBar>

      <Container hasNavbar>
        {addresses.length === 0 ? (
          <div className={styles.emptyWrap}>
            <Empty
              title={t('address.emptyTitle')}
              description={t('address.emptyDescription')}
              actionText={t('address.addShort')}
              onAction={() => {}}
            />
          </div>
        ) : (
          <div className={styles.addressList}>
            {addresses.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                editable
                deletable
                onEdit={handleEdit}
                onDelete={handleDeleteRequest}
              />
            ))}
          </div>
        )}

        {addresses.length > 0 && (
          <div className={styles.addBtnWrap}>
            <Button
              variant="secondary"
              size="full"
              block
              onClick={() => {}}
            >
              <span className={styles.addBtnContent}>
                <PlusIcon />
                {t('address.add')}
              </span>
            </Button>
          </div>
        )}
      </Container>

      {/* Delete confirmation popup */}
      <Popup
        visible={deleteTarget !== null}
        position="center"
        title={t('address.deleteTitle')}
        closable
        onClose={handleDeleteCancel}
      >
        <div className={styles.deleteConfirm}>
          <p className={styles.deleteText}>
            &quot;{deleteTarget?.label}&quot; {t('address.deleteBody')}
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
