import { useState } from 'react';
import {
  DesktopShell,
  DesktopBreadcrumbs,
  DesktopPaymentMethodCard,
  DesktopButton,
  DesktopEmpty,
} from '../../components';
import type { DesktopPaymentMethod } from '../../components';
import { DefaultTopBar, DefaultHeaderRich, DefaultMegaMenu, DefaultFooter } from '../_shared';
import styles from './DesktopPaymentMethodsPage.module.scss';

const initialMethods: DesktopPaymentMethod[] = [
  {
    id: 'pm-1',
    type: 'uzcard',
    label: 'UzCard',
    lastFour: '4523',
    expiryDate: '09/27',
    isDefault: true,
  },
  {
    id: 'pm-2',
    type: 'humo',
    label: 'Humo',
    lastFour: '8901',
    expiryDate: '03/28',
    isDefault: false,
  },
  { id: 'pm-3', type: 'payme', label: 'Payme', isDefault: false },
  { id: 'pm-4', type: 'cash', label: 'Naqd pul', isDefault: false },
];

export interface DesktopPaymentMethodsPageProps {
  /** Override payment methods */
  initialPaymentMethods?: DesktopPaymentMethod[];
}

export const DesktopPaymentMethodsPage: React.FC<DesktopPaymentMethodsPageProps> = ({
  initialPaymentMethods,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [methods, setMethods] = useState(initialPaymentMethods ?? initialMethods);

  const handleDelete = (id: string) => {
    setMethods((prev) => prev.filter((m) => m.id !== id));
  };

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
            { label: 'My Account', href: '#' },
            { label: 'Payment Methods' },
          ]}
        />
      </div>

      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Payment Methods</h1>
        <DesktopButton variant="primary" size="md">
          Add Payment Method
        </DesktopButton>
      </div>

      {methods.length === 0 ? (
        <DesktopEmpty
          title="No payment methods"
          description="Add a card or wallet to make checkout faster."
        />
      ) : (
        <div className={styles.methodsList}>
          {methods.map((method) => (
            <DesktopPaymentMethodCard
              key={method.id}
              method={method}
              onDelete={() => handleDelete(method.id)}
            />
          ))}
        </div>
      )}
    </DesktopShell>
  );
};
