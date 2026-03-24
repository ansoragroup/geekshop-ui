/**
 * Shared shell components for Desktop page compositions.
 *
 * Instead of each page defining its own DesktopTopBar, DesktopMegaMenuBar,
 * DesktopFooterSection, etc., pages import them from here.
 */

import {
  TopBar,
  MegaMenu,
  Footer,
  DesktopHeader,
  DesktopHeaderRich,
} from '../../components';
import type { MegaMenuCategory, CategoryItem, PromoLink } from '../../components';

// ─── Shared data ──────────────────────────────────────────────────────────────

export const defaultMegaMenuCategories: MegaMenuCategory[] = [
  { label: 'Graphics Cards', subcategories: [{ label: 'NVIDIA RTX 40' }, { label: 'AMD Radeon RX' }] },
  { label: 'Processors', subcategories: [{ label: 'AMD Ryzen 7000' }, { label: 'Intel 14th Gen' }] },
  { label: 'Monitors', subcategories: [{ label: '4K Monitors' }, { label: '2K 165Hz' }] },
  { label: 'Laptops', subcategories: [{ label: 'Gaming' }, { label: 'Ultrabook' }] },
  { label: 'Memory (RAM)' },
  { label: 'Storage' },
  { label: 'Peripherals' },
];

export const defaultFooterColumns = [
  { title: 'Customer Service', links: [{ label: 'Help Center' }, { label: 'Returns & Refunds' }, { label: 'Shipping Info' }] },
  { title: 'About GeekShop', links: [{ label: 'About Us' }, { label: 'Careers' }, { label: 'Press' }] },
  { title: 'Policies', links: [{ label: 'Privacy Policy' }, { label: 'Terms of Service' }, { label: 'Cookie Policy' }] },
  { title: 'Connect', links: [{ label: 'Telegram' }, { label: 'Instagram' }, { label: 'Facebook' }] },
];

export const defaultHeaderCategories: CategoryItem[] = [
  { label: 'Graphics Cards', icon: 'gpu' },
  { label: 'Processors', icon: 'cpu' },
  { label: 'Monitors', icon: 'monitor' },
  { label: 'Laptops', icon: 'laptop' },
  { label: 'Memory', icon: 'ram' },
  { label: 'Storage', icon: 'storage' },
];

export const defaultPromoLinks: PromoLink[] = [
  { label: 'Flash Deals', badge: 'HOT' },
  { label: 'New Arrivals' },
  { label: 'Top Brands' },
  { label: 'PC Builder' },
];

export const defaultMegaMenuNavItems = [
  { label: 'Flash Deals' },
  { label: 'New Arrivals' },
  { label: 'Top Brands' },
];

// ─── Shared shell components ──────────────────────────────────────────────────

const topBarBtnStyle = { background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 'inherit' } as const;

export const DefaultTopBar = () => (
  <TopBar
    leftItems={[
      <span key="w">Welcome to GeekShop!</span>,
      <span key="s">Seller Center</span>,
      <span key="h">Help</span>,
    ]}
    rightItems={[
      <button key="l" type="button" style={topBarBtnStyle}>EN</button>,
      <button key="c" type="button" style={topBarBtnStyle}>UZS</button>,
    ]}
  />
);

export const DefaultMegaMenu = () => (
  <MegaMenu
    categories={defaultMegaMenuCategories}
    navItems={defaultMegaMenuNavItems}
  />
);

export const DefaultFooter = () => (
  <Footer
    columns={defaultFooterColumns}
    copyrightText={'\u00A9 2026 GeekShop. All rights reserved.'}
  />
);

const logoStyle = { fontWeight: 700, fontSize: 20, color: '#FF5000' } as const;

export const DefaultHeader = () => (
  <DesktopHeader
    logo={<span style={logoStyle}>GeekShop</span>}
    searchPlaceholder="Search products..."
    cartCount={3}
    wishlistCount={5}
  />
);

export interface DefaultHeaderRichProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export const DefaultHeaderRich: React.FC<DefaultHeaderRichProps> = ({
  searchValue,
  onSearchChange,
}) => (
  <DesktopHeaderRich
    logo={<span style={logoStyle}>GeekShop</span>}
    searchPlaceholder="Search for GPUs, laptops, monitors..."
    searchValue={searchValue}
    onSearchChange={onSearchChange}
    cartCount={3}
    wishlistCount={5}
    categories={defaultHeaderCategories}
    promoLinks={defaultPromoLinks}
    location="Tashkent"
  />
);

/**
 * Standard header + mega menu combo used by most pages.
 */
export const DefaultHeaderWithMegaMenu: React.FC<DefaultHeaderRichProps> = (props) => (
  <div>
    <DefaultHeaderRich {...props} />
    <DefaultMegaMenu />
  </div>
);
