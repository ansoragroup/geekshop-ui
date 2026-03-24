import { useState } from 'react';
import {
  DesktopShell,
  Breadcrumbs,
  DesktopAddressCard,
  DesktopButton,
  DesktopEmpty,
} from '../../components';
import type { DesktopAddress } from '../../components';
import { DefaultTopBar, DefaultHeaderRich, DefaultMegaMenu, DefaultFooter } from '../_shared';
import styles from './DesktopAddressBookPage.module.scss';

const initialAddresses: DesktopAddress[] = [
  {
    id: 'addr-1',
    name: 'Jasur Karimov',
    phone: '+998 90 123 45 67',
    street: "Amir Temur ko'chasi, 15-uy, 42-xonadon",
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
    street: "Mustaqillik ko'chasi, 59-uy, 3-qavat",
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
    street: "Navoiy ko'chasi, 28-uy",
    city: 'Samarqand',
    region: 'Samarqand viloyati',
    postalCode: '140100',
    isDefault: false,
    label: 'Ota-ona',
  },
];

export interface DesktopAddressBookPageProps {
  /** Override addresses */
  addresses?: DesktopAddress[];
}

export const DesktopAddressBookPage: React.FC<DesktopAddressBookPageProps> = ({
  addresses: addressesProp,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [addresses, setAddresses] = useState(addressesProp ?? initialAddresses);

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const header = (
    <div className={styles.headerWrapper}>
      <DefaultHeaderRich searchValue={searchValue} onSearchChange={setSearchValue} />
      <DefaultMegaMenu />
    </div>
  );

  return (
    <DesktopShell
      topBar={<DefaultTopBar />}
      header={header}
      footer={<DefaultFooter />}
    >
      <div className={styles.breadcrumbs}>
        <Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'My Account', href: '#' }, { label: 'Address Book' }]} />
      </div>

      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Address Book</h1>
        <DesktopButton variant="primary" size="md">
          Add New Address
        </DesktopButton>
      </div>

      {addresses.length === 0 ? (
        <DesktopEmpty
          title="No saved addresses"
          description="Add your first address to make checkout faster."
        />
      ) : (
        <div className={styles.addressGrid}>
          {addresses.map((addr) => (
            <DesktopAddressCard
              key={addr.id}
              address={addr}
              onEdit={() => {}}
              onDelete={() => handleDelete(addr.id)}
            />
          ))}
        </div>
      )}
    </DesktopShell>
  );
};
