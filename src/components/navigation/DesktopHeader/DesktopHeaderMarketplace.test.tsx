import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DesktopHeaderMarketplace, DesktopHeaderAliExpress } from './DesktopHeaderMarketplace';

// Mock heavy child components to keep unit tests fast
vi.mock('../DesktopSearchAutocomplete', () => ({
  DesktopSearchAutocomplete: (props: Record<string, unknown>) => (
    <div data-testid="search-autocomplete" data-placeholder={props.placeholder} />
  ),
}));
vi.mock('../MegaMenu', () => ({
  MegaMenu: (props: Record<string, unknown>) => (
    <div data-testid="mega-menu" data-trigger-label={props.triggerLabel} />
  ),
}));

const categories = [
  { label: 'Electronics', subcategories: [{ label: 'Phones' }] },
  { label: 'Clothing' },
];

describe('DesktopHeaderMarketplace', () => {
  // ─── Render tests ───────────────────────────────────────────────────

  it('renders as a header element', () => {
    render(<DesktopHeaderMarketplace />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders with required props only (no crash)', () => {
    const { container } = render(<DesktopHeaderMarketplace />);
    expect(container.querySelector('header')).toBeInTheDocument();
  });

  it('renders custom logo', () => {
    render(<DesktopHeaderMarketplace logo={<img alt="MyLogo" />} />);
    expect(screen.getByAltText('MyLogo')).toBeInTheDocument();
  });

  it('renders MegaMenu when categories are provided', () => {
    render(<DesktopHeaderMarketplace categories={categories} />);
    expect(screen.getByTestId('mega-menu')).toBeInTheDocument();
    expect(screen.queryByTestId('mega-menu')).toHaveAttribute('data-trigger-label', 'Catalog');
  });

  it('renders fallback catalog button when no categories', () => {
    render(<DesktopHeaderMarketplace />);
    const btn = screen.getByLabelText('Catalog');
    expect(btn).toBeInTheDocument();
    expect(btn.tagName).toBe('BUTTON');
  });

  it('renders search autocomplete with placeholder', () => {
    render(<DesktopHeaderMarketplace searchPlaceholder="Find something..." />);
    expect(screen.getByTestId('search-autocomplete')).toHaveAttribute(
      'data-placeholder',
      'Find something...'
    );
  });

  it('renders default action buttons (Orders, Cart, Sign in)', () => {
    render(<DesktopHeaderMarketplace />);
    expect(screen.getByLabelText('Orders')).toBeInTheDocument();
    expect(screen.getByLabelText('Cart')).toBeInTheDocument();
    expect(screen.getByLabelText('Sign in')).toBeInTheDocument();
  });

  it('renders custom actions when actions prop is provided', () => {
    render(<DesktopHeaderMarketplace actions={<button>Custom</button>} />);
    expect(screen.getByText('Custom')).toBeInTheDocument();
    expect(screen.queryByLabelText('Orders')).not.toBeInTheDocument();
  });

  // ─── Cart badge ─────────────────────────────────────────────────────

  it('renders cart badge with count', () => {
    render(<DesktopHeaderMarketplace cartCount={7} />);
    expect(screen.getByText('7')).toBeInTheDocument();
  });

  it('caps cart badge at 99+', () => {
    render(<DesktopHeaderMarketplace cartCount={150} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('does not render cart badge when count is 0', () => {
    render(<DesktopHeaderMarketplace cartCount={0} />);
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('sets correct aria-label on cart button with count', () => {
    render(<DesktopHeaderMarketplace cartCount={3} />);
    expect(
      screen.getByLabelText('Cart ({count})'?.replace('{count}', '3') || 'Cart (3)')
    ).toBeInTheDocument();
  });

  // ─── Labels / i18n ──────────────────────────────────────────────────

  it('uses default English labels', () => {
    render(<DesktopHeaderMarketplace />);
    expect(screen.getByText('Orders')).toBeInTheDocument();
    expect(screen.getByText('Cart')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('applies custom labels', () => {
    render(
      <DesktopHeaderMarketplace
        labels={{
          catalog: 'Katalog',
          orders: 'Buyurtmalar',
          cart: 'Savat',
          signIn: 'Kirish',
        }}
      />
    );
    expect(screen.getByText('Buyurtmalar')).toBeInTheDocument();
    expect(screen.getByText('Savat')).toBeInTheDocument();
    expect(screen.getByText('Kirish')).toBeInTheDocument();
    expect(screen.getByLabelText('Katalog')).toBeInTheDocument();
  });

  // ─── Callback tests ────────────────────────────────────────────────

  it('calls onCartClick', () => {
    const handler = vi.fn();
    render(<DesktopHeaderMarketplace onCartClick={handler} />);
    fireEvent.click(screen.getByLabelText('Cart'));
    expect(handler).toHaveBeenCalledOnce();
  });

  it('calls onOrdersClick', () => {
    const handler = vi.fn();
    render(<DesktopHeaderMarketplace onOrdersClick={handler} />);
    fireEvent.click(screen.getByLabelText('Orders'));
    expect(handler).toHaveBeenCalledOnce();
  });

  it('calls onUserClick', () => {
    const handler = vi.fn();
    render(<DesktopHeaderMarketplace onUserClick={handler} />);
    fireEvent.click(screen.getByLabelText('Sign in'));
    expect(handler).toHaveBeenCalledOnce();
  });

  it('calls onLogoClick when logo is clicked', () => {
    const handler = vi.fn();
    render(<DesktopHeaderMarketplace logo={<span>Logo</span>} onLogoClick={handler} />);
    fireEvent.click(screen.getByText('Logo'));
    expect(handler).toHaveBeenCalledOnce();
  });

  it('calls onCatalogClick on fallback button', () => {
    const handler = vi.fn();
    render(<DesktopHeaderMarketplace onCatalogClick={handler} />);
    fireEvent.click(screen.getByLabelText('Catalog'));
    expect(handler).toHaveBeenCalledOnce();
  });

  // ─── Keyboard accessibility ─────────────────────────────────────────

  it('logo is keyboard accessible (Enter)', () => {
    const handler = vi.fn();
    render(<DesktopHeaderMarketplace logo={<span>Logo</span>} onLogoClick={handler} />);
    const logo = screen.getByText('Logo').closest('[role="button"]')!;
    expect(logo).toHaveAttribute('tabIndex', '0');
    fireEvent.keyDown(logo, { key: 'Enter' });
    expect(handler).toHaveBeenCalledOnce();
  });

  it('logo is keyboard accessible (Space)', () => {
    const handler = vi.fn();
    render(<DesktopHeaderMarketplace logo={<span>Logo</span>} onLogoClick={handler} />);
    const logo = screen.getByText('Logo').closest('[role="button"]')!;
    fireEvent.keyDown(logo, { key: ' ' });
    expect(handler).toHaveBeenCalledOnce();
  });

  it('logo has no role/tabIndex when onLogoClick is not provided', () => {
    render(<DesktopHeaderMarketplace logo={<span>Logo</span>} />);
    const logo = screen.getByText('Logo').parentElement!;
    expect(logo).not.toHaveAttribute('role');
    expect(logo).not.toHaveAttribute('tabIndex');
  });

  // ─── Actions nav has aria-label ─────────────────────────────────────

  it('actions nav has aria-label', () => {
    render(<DesktopHeaderMarketplace />);
    expect(screen.getByRole('navigation', { name: 'User actions' })).toBeInTheDocument();
  });

  // ─── Promo row ──────────────────────────────────────────────────────

  it('renders promo tags', () => {
    render(
      <DesktopHeaderMarketplace promoTags={[{ label: 'Flash Sale' }, { label: 'New Arrivals' }]} />
    );
    expect(screen.getByText('Flash Sale')).toBeInTheDocument();
    expect(screen.getByText('New Arrivals')).toBeInTheDocument();
  });

  it('renders quick links', () => {
    render(<DesktopHeaderMarketplace quickLinks={[{ label: 'Help Center', href: '/help' }]} />);
    expect(screen.getByText('Help Center')).toBeInTheDocument();
  });

  it('renders location button with aria-label', () => {
    render(<DesktopHeaderMarketplace location="Tashkent" />);
    expect(screen.getByText('Tashkent')).toBeInTheDocument();
    expect(screen.getByLabelText('Location: Tashkent')).toBeInTheDocument();
  });

  it('calls onLocationClick', () => {
    const handler = vi.fn();
    render(<DesktopHeaderMarketplace location="Samarkand" onLocationClick={handler} />);
    fireEvent.click(screen.getByLabelText('Location: Samarkand'));
    expect(handler).toHaveBeenCalledOnce();
  });

  it('renders language and currency meta', () => {
    render(<DesktopHeaderMarketplace location="X" language="RU" currency="UZS" />);
    expect(screen.getByText('RU')).toBeInTheDocument();
    expect(screen.getByText('UZS')).toBeInTheDocument();
  });

  it('does not render promo row when no promo data', () => {
    const { container } = render(<DesktopHeaderMarketplace />);
    // No promo row means no location/language/currency meta
    expect(container.querySelectorAll('[class*="promoRow"]').length).toBe(0);
  });

  // ─── Prop spreading & className ─────────────────────────────────────

  it('applies custom className', () => {
    const { container } = render(<DesktopHeaderMarketplace className="custom-cls" />);
    expect(container.querySelector('header')?.className).toContain('custom-cls');
  });

  it('spreads rest props onto root element', () => {
    render(<DesktopHeaderMarketplace data-testid="marketplace-header" />);
    expect(screen.getByTestId('marketplace-header')).toBeInTheDocument();
  });

  // ─── Deprecated alias ───────────────────────────────────────────────

  it('exports DesktopHeaderAliExpress as alias', () => {
    expect(DesktopHeaderAliExpress).toBe(DesktopHeaderMarketplace);
  });

  // ─── displayName ────────────────────────────────────────────────────

  it('has correct displayName', () => {
    expect(DesktopHeaderMarketplace.displayName).toBe('DesktopHeaderMarketplace');
  });
});
