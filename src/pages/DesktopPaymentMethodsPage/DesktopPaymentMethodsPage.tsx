import { useState } from 'react';
import {
  DesktopShell,
  TopBar,
  DesktopHeaderRich,
  MegaMenu,
  Footer,
  Breadcrumbs,
  DesktopPaymentMethodCard,
  DesktopButton,
  DesktopEmpty,
} from '../../components';
import type {
  MegaMenuCategory,
  CategoryItem,
  PromoLink,
  DesktopPaymentMethod,
} from '../../components';
import styles from './DesktopPaymentMethodsPage.module.scss';

const footerColumns = [
  { title: 'Customer Service', links: [{ label: 'Help Center' }, { label: 'Returns & Refunds' }] },
  { title: 'About GeekShop', links: [{ label: 'About Us' }, { label: 'Careers' }] },
  { title: 'Policies', links: [{ label: 'Privacy Policy' }, { label: 'Terms of Service' }] },
];

const megaMenuCategories: MegaMenuCategory[] = [
  { label: 'Graphics Cards' },
  { label: 'Processors' },
  { label: 'Monitors' },
  { label: 'Laptops' },
];

const headerCategories: CategoryItem[] = [
  { id: '1', label: 'Smartphones', icon: '' },
  { id: '2', label: 'Laptops', icon: '' },
];

const promoLinks: PromoLink[] = [
  { id: '1', label: 'Delivery & Returns' },
  { id: '2', label: 'Premium', highlight: true },
];

const initialMethods: DesktopPaymentMethod[] = [
  { id: 'pm-1', type: 'uzcard', label: 'UzCard', lastFour: '4523', expiryDate: '09/27', isDefault: true },
  { id: 'pm-2', type: 'humo', label: 'Humo', lastFour: '8901', expiryDate: '03/28', isDefault: false },
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
      <DesktopHeaderRich
        logo={<span className={styles.logoText}>GeekShop</span>}
        searchPlaceholder="Search products..."
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        cartCount={3}
        wishlistCount={5}
        categories={headerCategories}
        promoLinks={promoLinks}
        location="Tashkent"
      />
      <MegaMenu categories={megaMenuCategories} navItems={[{ label: 'Flash Deals' }, { label: 'New Arrivals' }]} />
    </div>
  );

  return (
    <DesktopShell
      topBar={
        <TopBar
          leftItems={[<span key="w">Welcome to GeekShop!</span>]}
          rightItems={[
            <button key="l" type="button" className={styles.topBarBtn}>EN</button>,
            <button key="c" type="button" className={styles.topBarBtn}>UZS</button>,
          ]}
        />
      }
      header={header}
      footer={<Footer columns={footerColumns} copyrightText="© 2026 GeekShop. All rights reserved." />}
    >
      <div className={styles.breadcrumbs}>
        <Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'My Account', href: '#' }, { label: 'Payment Methods' }]} />
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
